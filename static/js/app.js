// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    var metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    var result = metadata.filter(meta => meta.id == sample)[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    var panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(result).forEach(([key, value]) => {
      panel.append("h6").text(`${key}: ${value}`);
    });
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    var samples = data.samples;


    // Filter the samples for the object with the desired sample number
    var result = samples.filter(sampleObj => sampleObj.id == sample)[0];

    // Get the otu_ids, otu_labels, and sample_values
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    // Build a Bubble Chart
    var bubbleData = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "YlGnBu"
      }
    }];
    
    var bubbleLayout = {
      title: `Bubble Chart for Sample ${sample}`,
      xaxis: { title: "OTU IDs" },
      yaxis: { title: "Sample Values" },
      showlegend: false
      
    }; 

    // Render the Bubble Chart
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    var top10Values = sample_values.slice(0, 10).reverse();
    var top10OtuIds = otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
    var top10OtuLabels = otu_labels.slice(0, 10).reverse();

    var barData = [{
      x: top10Values,
      y: top10OtuIds,
      text: top10OtuLabels,
      type: "bar",
      orientation: "h"
    }];

    var barLayout = {
      title: `Top 10 OTUs for Sample ${sample}`,
      xaxis: { title: "Sample Values" },
      yaxis: { title: "OTU IDs" }
    };

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    Plotly.newPlot("bar", barData, barLayout);
  });
}

    // Render the Bar Chart


// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    var sampleNames = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    var dropdown = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    sampleNames.forEach((sample) => {
      dropdown.append("option")
        .text(sample)
        .property("value", sample);
    });

    // Get the first sample from the list
    var firstSample = sampleNames[0];


    // Build charts and metadata panel with the first sample
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected

}

// Initialize the dashboard
init();
