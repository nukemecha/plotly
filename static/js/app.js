
d3.json("data/samples.json").then(function(data) {

    dobj = data;
       
    // setup dropdown - #selDataset
    d3.select("#selDataset")
        .selectAll("option")
        .data(data.names)
        .enter()
        .append("option")
        .text(d => d)
        .attr("value", d => d);

    // if we change the value update the plots
    d3.select("#selDataset").on("change", updatePlots);
     
    // initial on load plot    
    updatePlots();

});

var dobj;
var mid;
var md;
var samp;

function updatePlots() {
    
    console.log("updatePlots called.")
    mid = d3.select("#selDataset").property("value");
    console.log(mid)
    
    samp = dobj.samples.filter(d => d.id === mid.toString());
    console.log(samp)

    md = dobj.metadata.filter(d => d.id == mid);
    console.log(md)
 
 
    // data box
    d3.select(".panel-body")
     .selectAll("html")
     .data(md)
     .enter()
     .append("html")
     .html(d => {
         return `id : ${d.id}` + '<br>' + 
         `ethnicity: ${d.ethnicity}` + '<br>' + 
         `gender: ${d.gender}` + '<br>' +
         `age: ${d.age}` + '<br>' +
         `location: ${d.location}` + '<br>' +
         `bbtype: ${d.bbtype}` + '<br>' +
         `wfreq: ${d.wfreq}` + '<br>';
     });

 
     /************ Bar Chart ******************/
    
    // sample values are already sorted in descending order
    var sliced = samp[0].sample_values.slice(0,10).reverse();
    console.log(sliced);

    // now we need respective otu_ids and labels for our sliced sample values
    var sliced_otu_ids = samp[0].otu_ids.slice(0,10);
    var sliced_otu_labels = samp[0].otu_labels.slice(0,10);

    // our barplot data for plotly

    var bar_data = [{
        type: 'bar',
        x: sliced, // sample values 
        y: sliced_otu_ids.toString(),  // otu_ids 
        text: sliced_otu_labels,
        orientation: 'h'
    }];
    
    //plot it

    Plotly.newPlot('bar', bar_data);


    /*********** Bubble chart *****************/

    var bubble_data = [{
        x: samp[0].otu_ids, // otu_ids
        y: samp[0].sample_values,  // sample vals
        text: samp[0].otu_labels, // otu labels
        mode: 'markers',
        marker: {
            color: samp[0].otu_ids,
            size: samp[0].sample_values  // sample vals
        }
    }];

    Plotly.newPlot('bubble', bubble_data);

   

}


