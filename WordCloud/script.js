// Author: Sarah Quick
// Word Cloud Visualization

// Resources:
// d3 API: https://github.com/d3/d3/blob/master/API.md
// Original d3-cloud code: https://github.com/jasondavies/d3-cloud/blob/master/index.js
// d3 v4 d3.layout.cloud.js code and Word Cloud Example: https://bl.ocks.org/abrahamdu/e1481e86dd4e9d553cc2d7d359b91e68
// Word Cloud Example: http://bl.ocks.org/ericcoopey/6382449#d3.layout.cloud.js
// Word Cloud Example: https://bl.ocks.org/jyucsiro/767539a876836e920e38bc80d2031ba7

var margin = {
    top: 100,
    bottom: 150,
    left: 500,
    right: 0
};
/*
var width = window.innerWidth - margin.left - margin.right;

var height = window.innerHeight - margin.top - margin.bottom;
*/
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var color = d3.scaleOrdinal(d3.schemeCategory20b);

d3.json("test2.json", function(data) {
    
    var wordCountMap = {};
    
    data[1]["tf-idf"].forEach(function(datum) {
        console.log(datum.word);
        console.log(datum.freq);
        
        wordCountMap[datum.word] = parseInt(datum.freq);
    })
    
    drawWordcloud(wordCountMap);
    
});

function drawWordcloud(wordCountMap) {
    var word_entries = d3.entries(wordCountMap);
    
    var xScale = d3.scaleLinear()
           .domain([0, d3.max(word_entries, function(d) {
              return d.value;
            })
           ])
           .range([10,100]);
    
     d3.layout.cloud().size([width, height])
          .words(word_entries)
          .fontSize(function(d) { return xScale(+d.value); })
          .text(function(d) { return d.key; })
          .rotate(function() { return ~~(Math.random()); })
          .font("Impact")
          .on("end", draw)
          .start();
    
    function draw(words) {
        d3.select('body').append('svg')
            .attr("class", "WC")
            .attr('width', window.innerWidth)
            .attr('height', window.innerHeight)
            .append('g')
            //.attr('transform', 'translate(' + 700 + ',' + 400 + ')')
            .attr("transform", "translate(" + margin.left + "," + (margin.top + 100) + ")")
            .selectAll("text")
            .data(words)
            .enter().append("text")
              .style("font-size", function(d) { return xScale(d.value) + "px"; })
              .style("font-family", "Impact")
              .style("fill", function(d, i) { return color(i); })
              .attr("text-anchor", "middle")
              .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
              })
              .text(function(d) { return d.key; });
        }
    
    d3.layout.cloud().stop();
}