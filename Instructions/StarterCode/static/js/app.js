// add options to dropdown
var dropDown = d3.select("#selDataset");
d3.json("samples.json").then(data =>{
    var dropNames = data.names;
    dropDown.selectAll("option").data(dropNames).enter().append("option").text(function (d) {
        return d;
    });
    
})

// event 
dropDown.on("change",handleChange);

// event handler
function handleChange () {
    d3.json("samples.json").then(data =>{
        var targetValue = dropDown.property("value");
        for (var z = 0;z<data.names.length;z++) {
                if (targetValue === data.names[z]) {
                    plotBar();
                    addDemographic();
                    plotBubble();
                    plotGauge();
                }
            }
    })
};

// plots bar chart
function plotBar () {
    d3.json("samples.json").then(data =>{
        var targetValue = dropDown.property("value");
        for (var z = 0;z<data.names.length;z++) {
                if (targetValue === data.names[z]) {

                    var sampleIds = data.samples[z].otu_ids;
                    var sampleValues = data.samples[z].sample_values;
                    var sampleLabels = data.samples[z].otu_labels;

                    var idList = [];
                    var samplesList = [];
                    var labelsList = [];

                    for (var i = 0; i<10; i++) {
                        idList.push("OTU ID "+sampleIds[i]);
                        samplesList.push(sampleValues[i]);
                        labelsList.push(sampleLabels[i]);

                    var trace1 = {
                        type: "bar",
                        y: idList,
                        x: samplesList,
                        text: labelsList,
                        orientation: "h"
                        };
                    
                        var barData = [trace1];
                    
                        var layout = {
                            title:"Sample Values per ID",
                        };
                    
                        Plotly.newPlot("bar",barData,layout);

                    };
                }
            }
    })
};

// plots bubble chart
function plotBubble () {
    d3.json("samples.json").then(data =>{
        var targetValue = dropDown.property("value");
        for (var z = 0;z<data.names.length;z++) {
                if (targetValue === data.names[z]) {
                    var sampleIds = data.samples[z].otu_ids;
                    var sampleValues = data.samples[z].sample_values;
                    var sampleLabels = data.samples[z].otu_labels;

                    var idList2 = [];
                    var samplesList2 = [];
                    var labelsList2 = [];
                    
                    for (var k = 0; k<data.samples[z].sample_values.length; k++) {

                        idList2.push(sampleIds[k]);
                        samplesList2.push(sampleValues[k]);
                        labelsList2.push(sampleLabels[k]);
                
                    };

                    console.log(idList2);

                    var trace2 = {
                    mode: "markers",
                    x: idList2,
                    y: samplesList2,
                    text: labelsList2,
                    marker:{
                        color: idList2,
                        size: samplesList2,
                        sizemode: "area"
                            }
                    };
                    
                    var layout2 = {
                        title:"Sample Values per ID",
                    };

                    var bubbleData = [trace2];
                    Plotly.newPlot("bubble",bubbleData,layout2);
                }
            }
    })
};

// adds demographics data
function addDemographic () {
    d3.json("samples.json").then(data =>{
        var targetValue = dropDown.property("value");
        for (var z = 0;z<data.names.length;z++) {
            if (targetValue === data.names[z]) {
                d3.select("#sample-metadata").html(
                `<ul>
                <li>ID: ${data.metadata[z].id} </li>
                <li>Ethnicity: ${data.metadata[z].ethnicity} </li>
                <li>Gender: ${data.metadata[z].gender} </li>
                <li>Age: ${data.metadata[z].age} </li>
                <li>Location: ${data.metadata[z].location} </li>
                <li>BBType: ${data.metadata[z].bbtype} </li>
                <li> Wfreq: ${data.metadata[z].wfreq} </li>
                </ul>`
                );
            }
        };      
    })
};

//adds gauge chart
function plotGauge () {
    console.log("hi");

    d3.json("samples.json").then(data =>{
        var targetValue = dropDown.property("value");
        for (var z = 0;z<data.names.length;z++) {
            if (targetValue === data.names[z]) {

            var trace3 = {
                value: data.metadata[z].wfreq,
                title: { text: "Wfreq" },
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
                    bar: { color: "white" },
                    bgcolor: "white",
                    borderwidth: 2,
                    bordercolor: "gray",
                    steps: [
                      { range: [0, 1], color: "red" },
                      { range: [1, 2], color: "orange" },
                      { range: [2, 3], color: "yellow" },
                      { range: [3, 4], color: "green" },
                      { range: [4, 5], color: "blue" },
                      { range: [5, 6], color: "indigo" },
                      { range: [6, 7], color: "violet" },
                      { range: [7, 8], color: "purple" },
                      { range: [8, 9], color: "pink" }
                    ],
                }
            };
            
            var dataGauge = [trace3];
            Plotly.newPlot("gauge",dataGauge);
            }
        }
    })
};