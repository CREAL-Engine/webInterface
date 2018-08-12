// Author: Sarah Quick
// Conected Nodes
// References: https://bl.ocks.org/d3indepth/181b398d5305cefcd10186617cb9250c
/*
// Test Data
//var node1 = {"type": type, "label": label, "link": link};
var heart = {type: "subject", label: "heart", link: "n/a", conn_nodes: []};
var pancreas = {type: "subject", label: "pancrease", link: "n/a", conn_nodes: []};
var lungs = {type: "subject", label: "lungs", link: "n/a", conn_nodes: []};
var stomach = {type: "subject", label: "stomach", link: "n/a", conn_nodes: []};
var kidneys = {type: "subject", label: "kidneys", link: "n/a", conn_nodes: []};

var h2p = {type: "link", label: "heart_to_pancrease", link: "www.heart2panc.com", conn_node1: [heart,pancreas]};
var l2s = {type: "link", label: "lungs_to_stomach", link: "wwww.lungs2stomach.com", conn_node1: [lungs,stomach]};
var s2k = {type: "link", label: "stomach_to_kidneys", link: "www/stomach2kidney.com", conn_node1: [stomach,kidneys]};

*/

//var nodes = [{}, {}, {}, {}, {}];
var nodes = [{id:"heart"},{id:"pancreas"},{id:"lungs"},{id:"stomach"},{id:"kidneys"}];
//var nodes = [heart, pancreas, lungs, stomach, kidneys];
var articles = [{id:"heart",type:"node"},
                {id:"pancreas",type:"node"},
                {id:"lungs",type:"node"},
                {id:"stomach",type:"node"},
                {id:"kidneys",type:"node"},
                {id:"www.a.com",type:"article"},
                {id:"www.b.com",type:"article"},
                {id:"www.c.com",type:"article"},
                {id:"www.d.com",type:"article"},
                {id:"www.e.com",type:"article"}];

var width = 700, height = 400;

var simulation = d3.forceSimulation(articles)
  .force('charge', d3.forceManyBody().strength(-10))
  .force('center', d3.forceCenter(width / 2, height / 2))
  .on('tick', ticked);

var svg = d3.select('svg');

function ticked() {
    
    var n = svg.selectAll('circle')
        .data(articles);

        n.enter()
            .append('circle')
            .attr('r', 5)
            .merge(n)
            .attr('cx', function(d) {
              return d.x
            })
            .attr('cy', function(d) {
              return d.y
            });

    var txt = svg.selectAll('text')
        .data(articles);

        txt.enter()
            .append('text')
            .merge(txt)
            .attr('x', function(d) {
              return d.x
            })
            .attr('y', function(d) {
              return d.y
            })
            .text(function(d) {
                return d.id;
            });
    
    var a = svg.selectAll('rect')
        .data(articles);
    
        a.enter()
            .append('rect')
            .attr('width', 20)
            .attr('height', 10)
            .merge(a)
            //.attr('x', 300)
            //.attr('y', 300);
            .attr('x', function(d) {
              console.log(d.x);
              return d.x;
            })
            .attr('y', function(d) {
              return d.y
            });
    
    a.exit().remove();
    txt.exit().remove();
    n.exit().remove();
}
/*

function myNodeClass(graph) {

    // Add node to graph
    this.addNode = function (type, label, link, conn_nodes) {
        // Add node to nodes array
        nodes.push({"type": type, "label": label, "link": link, "conn_nodes": []});
        // Run update function to 
        // update();
    };

    // Remove node from graph
    this.removeNode = function (label) {

    };

    this.findNode = {
      // search through node array for node w/ type subject and label
    }

    this.addLink (subject1, link_title, link, subject2) {

      // Update connecting nodes for subjects
      subject1.conn_nodes.push(subject2);
      subject2.conn_nodes.push(subject1);

      // If link does not exist, create new link
      if(findNode(link_title) == 0) {
        this.addNode("link", link_title, link, [subject1,subject2]);
      }
      // if link does exisit, update old link
      else {
        nodes[findNodeIndex(link_title)].
        // update link
      }

    };

    this.findLink() {
      // search through node array for node w/ type link and label
    }


}


*/


















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
