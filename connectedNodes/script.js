// Author: Sarah Quick
// Conected Nodes
// References: https://bl.ocks.org/d3indepth/181b398d5305cefcd10186617cb9250c

var width = 700, height = 400
var nodes = [{}, {}, {}, {}, {}]

var simulation = d3.forceSimulation(nodes)
  .force('charge', d3.forceManyBody().strength(-20))
  .force('center', d3.forceCenter(width / 2, height / 2))
  .on('tick', ticked);

function ticked() {
  var u = d3.select('svg')
    .selectAll('circle')
    .data(nodes)

  u.enter()
    .append('circle')
    .attr('r', 10)
    .merge(u)
    .attr('cx', function(d) {
      return d.x
    })
    .attr('cy', function(d) {
      return d.y
    })

   u.append("text")
   	//.merge(u)
   	.attr("x", 300)
   	.attr("y", 300)
   	/*
    .attr('x', function(d) {
      return d.x
    })
    .attr('y', function(d) {
      return d.y
    })
    */
    .text("hi")



  u.exit().remove()
}

/*

var i = 0;
var offset = 5;


function Link(link, subject1, subject2) {
	this.link = link;
	this.subject1 = subject1;
	this.subject2 = subject2;
}

function Subject(subject) {
	this.subject = subject;
}


var data = [
  {"link": "link1.com", "sub1": "pancreas", "sub2": "heart"},
  {"link": "link2.com", "sub1": "liver", "sub2": "appendix"},
  {"link": "link3.com", "sub1": "lungs", "sub2": "stomach"},
  {"link": "link4.com", "sub1": "small instestine", "sub2": "large intestine"}
]

// Margins
var margin = {
	top: 50,
	right: 100,
	bottom: 100,
	left: 150
};

// SVG Canvas
var svg = d3.select('body'). append('svg')
	.attr("class", "ConnNodes")
	.attr('width', window.innerWidth - 100)
	.attr('height', window.innerHeight - 50)
	.attr("id", "svg")
	.attr("pointer-events", "all")
	.attr("viewbox", "0 0" + (window.innerWidth - 100) + (window.innerHeight - 50))
	.attr("perspectiveApectRatio", "xMinYMid");

// Set width & height
var width = window.innerWidth - margin.left - margin.right;
var height = window.innerHeight - margin.top - margin.bottom;

//var testPoints = [{},{},{},{},{}];
var testPoints = [5,10,7,8,4];

// Add scales if needed

// Create SVG Group
var g = svg.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

//var force  = d3.layout.force().charge(-120).linkDistance(30).size([width, height]);
var color = d3.scaleOrdinal(d3.schemeCategory20b);

var simulation = d3.forceSimulation(nodes)
  .force('charge', d3.forceManyBody().strength(-20))
  //.force('center', d3.forceCenter(width / 2, height / 2))
  .force('center', d3.forceCenter(500, 300))
  .force('collision', d3.forceCollide().radius(30))
  .on('tick', ticked);

var nodes = simulation.nodes();
    //links = simulation.force('link', d3.forceLink().links(links))


function ticked() {
  //var u = d3.select('svg')

  //console.log(testPoints[0]);

  svg.selectAll('circle')
    .data(testPoints)

  svg.enter()
    .append('circle')
    .attr('r', 5)

    //.attr('cx', 500 + i*offset)
    //.attr('cx', 300 + i*offset)

    //.attr('cx', 500)
    //.attr('cy', 300)
    
    .attr('cx', function(d) {
      console.log(d);
      return (d.id * 200);
    })
    .attr('cy', function(d) {
      return (d.id * 100)
    })
    .merge(svg)


  	svg.exit().remove()
}

*/
