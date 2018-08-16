// Author: Sarah Quick
// Histogram Visualization

// Resources:
// d3 API: https://github.com/d3/d3/blob/master/API.md
// d3 v4 Bar Graph Ex: https://bl.ocks.org/d3noob/bdf28027e0ce70bd132edc64f1dd7ea4
// d3 v4 Bar Graph Ex: https://bl.ocks.org/alanvillalobos/14e9f0d80ea6b0d8083ba95a9d571d13
// d3 v4 Bar Graph Ex: https://bl.ocks.org/mbostock/3885304
// Converting Map to Object code: UC Davis TA Max Gomov, ECS163 js class example

// Set Margins
var margin = {
    top: 25,
    bottom: 150,
    left: 400,
    right: 50
};

// Set width and height
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

// Create svg canvas
var svg = d3.select('body').append('svg')
    .attr("class", "Hist")
    .attr('width', window.innerWidth)
    .attr('height', window.innerHeight);

// create group for bars
var g = svg.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// Create x and y scales
var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
var y = d3.scaleLinear().rangeRound([height,0]);


d3.json("test2.json", function(data) {
    
    // Format data into map w/ keys=words and values=freqs
    var wordCountMap = {};
    data[1]["tf-idf"].forEach(function(datum) {
        wordCountMap[datum.word] = parseInt(datum.freq);
    })
    
    // Reformat data into object for adding bars
    var wordCount = [];
    Object.keys(wordCountMap).forEach(function(key) 
    {
        wordCount.push({
            word: key,
            freq: wordCountMap[key]
        });
    });
    
    // Find max possible freq value for max y value
    var valMax = findArrMax(Object.values(wordCountMap));
    
    // Set domains for x and y scales
    x.domain(Object.keys(wordCountMap));
    y.domain([0,valMax]);
    
    // Add bars
    g.selectAll(".bar")
        .data(wordCount)
        .enter().append("rect")
        .attr("x", function(d) {return x(d.word);})
        .attr("width", x.bandwidth())
        .attr("y", function(d) {return y(d.freq);})
        .attr("height", function(d) {return height - y(d.freq);})
        .attr('fill', 'slateblue');
    
  // Add x-axis
  svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + (height + 25) + ")")
      .call(d3.axisBottom(x));
    
  // Add y-axis
  svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(d3.axisLeft(y));

    
});

function findArrMax(arr) {
    var i;
    var currMax = arr[0];
    
    for(i = 1; i < arr.length; i++) {
        if(currMax < arr[i]) {
            currMax = arr[i];
        }
    }
    return currMax;
}