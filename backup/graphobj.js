function myGraph(el) {

// Add and remove elements on the graph object
this.addNode = function (id,color,name) {
    nodes.push({"id":id,"color":color,"name":name});
    update();
	};

this.addLinkBox = function (mainId,targetId,name) {
    linkBoxes.push({"mainId":mainId,"targetId":targetId,"name":name});
    update();
	};


this.removeNode = function (id) {
    var i = 0;
    var n = findNode(id);
    while (i < links.length) {
        if ((links[i]['source'] == n)||(links[i]['target'] == n))
        {
            links.splice(i,1);
        }
        else i++;
    }
    nodes.splice(findNodeIndex(id),1);
    update();
};

this.removeLink = function (source,target){
    for(var i=0;i<links.length;i++)
    {
        if(links[i].source.id == source && links[i].target.id == target)
        {
            links.splice(i,1);
            break;
        }
    }
    update();
};

this.removeallLinks = function(){
    links.splice(0,links.length);
    update();
};

this.removeAllNodes = function(){
    nodes.splice(0,links.length);
    update();
};

this.addLink = function (source, target, value) {
    links.push({"source":findNode(source),"target":findNode(target),"value":value});
    update();
};

var findNode = function(id) {
    for (var i in nodes) {
        if (nodes[i]["id"] === id) return nodes[i];};
};

var findNodeIndex = function(id) {
    for (var i=0;i<nodes.length;i++) {
        if (nodes[i].id==id){
            return i;
        }
        };
};

// set up the D3 visualisation in the specified element
var w = 640 ,
    h = 480 ;
    var width =w, height = h;
var vis = d3.select(el)
    .append("svg:svg")
    .attr("width", w)
    .attr("height", h)
    .attr("id","svg")
    .attr("pointer-events", "all")
    .attr("viewBox","0 0 "+w+" "+h)
    .attr("perserveAspectRatio","xMinYMid")
    .append('svg:g');

var force  = d3.layout.force().charge(-120).linkDistance(30).size([width, height]);
var color = d3.scale.category20();
var nodes = force.nodes(),
	linkBoxes = force.nodes(),
    links = force.links();

var update = function () {
      var link = vis.selectAll("line")
        .data(links, function(d) {
            return d.source.id + "-" + d.target.id; 
            });

    link.enter().append("line")
        .attr("id",function(d){return d.source.id + "-" + d.target.id;})
        .attr("class","link");
    link.append("title")
    .text(function(d){
        return d.value;
    });
    link.exit().remove();

    var node = vis.selectAll("g.node")
        .data(nodes, function(d) { 
            return d.id;});

    var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .style("fill", function(d) { return color(d.color); })
        .call(force.drag);

    nodeEnter.append("svg:rect")
    .attr("class", "node")
    //~ .attr("r", 7)
    .attr("height", 32)
    .attr("width", 32)
    .attr("id",function(d) { return "Node;"+d.id;})
    .attr("class","nodeStrokeClass")
    .attr("onclick","window.open('canvasThing.html', 'newwindow', 'width=720, height=480')");
//~ onclick="alert('click!')"

    nodeEnter.append("text")
      .attr("font-size", "20px")
      .attr("fill", "#000000")
		.attr("font-family", "sans-serif")
		.text( function(d){return d.name;});

    node.exit().remove();
    force.on("tick", function() {

        node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y         + ")"; });

        link.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });
    });

    // Restart the force layout.
    force
    .gravity(.05)
    .distance(50)
    .linkDistance( 50 )
    .size([w, h])
    .start();
};


// Make it all go
update();
}

