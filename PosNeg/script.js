// Author: Sarah Quick
// Positivity/Negativity of Group of Words Visualization

// Resources:
// D3 API: https://github.com/d3/d3/blob/master/API.md
// D3 Sankey Plugin API: https://github.com/d3/d3-sankey
// sankey.js that works with d3 v4: https://gist.github.com/d3noob/013054e8d7807dff76247b81b0e29030#file-sankey-js-L294
// Sankey Example and Explanations: http://www.d3noob.org/2013/02/sankey-diagrams-description-of-d3js-code.html

function calcPositivy(pos, neg) {
    return (pos / (pos + neg));
}

function calcNegativity(pos, neg) {
    return (neg / (pos + neg));
}

function isPos(p,n) {
    pos = calcPositivy(p, n);
    neg = calcNegativity(p, n);
    
    if (pos > neg) {
        return true;
    }
    else
        return false;
}

function isNeg(p,n) {
    pos = calcPositivy(p, n);
    neg = calcNegativity(p, n);
    
    if (pos < neg) {
        return true;
    }
    else
        return false;
}

function isNeutral(p,n) {
    pos = calcPositivy(p, n);
    neg = calcNegativity(p, n);
    
    if (pos === neg) {
        return true;
    }
    else
        return false;
}

function getNodeColor(x) {
    if(x === "Positive")
        //return "#0033cc";
        return "#009900";
    else if (x === "Negative")
        return "#cc0000";
    else if (x === "Total Words")
        return "purple";
    else 
        return "black";
}

function getLinkColor(x) {
    if(x === 1)
        //return "#0033cc";
        return "#009900";
    else if (x === 2)
        return "#cc0000";
    else
        return "black";
}

function getResultTextColor(x) {
     if(x === "Positive")
        //return "#0033cc";
        return "#009900";
    else if (x === "Negative")
        return "#cc0000";
    else if (x === "Neutral")
        //return "#009900";
        return "#0033cc";
    else 
        return "black";
}


/*
function isPos(data) {
    pos = calcPositivy(data.positive, data.negative);
    neg = calcNegativity(data.positive, data.negative);
    
    if (pos > neg) {
        return true;
    }
    else
        return false;
}

function isNeg(data) {
    pos = calcPositivy(data.positive, data.negative);
    neg = calcNegativity(data.positive, data.negative);
    
    if (pos < neg) {
        return true;
    }
    else
        return false;
}

function isNeutral(data) {
    pos = calcPositivy(data.positive, data.negative);
    neg = calcNegativity(data.positive, data.negative);
    
    if (pos === neg) {
        return true;
    }
    else
        return false;
}
*/

var margin = {
    top: 25,
    bottom: 150,
    left: 400,
    right: 50
};

var width = window.innerWidth - margin.left - margin.right;

var height = window.innerHeight - margin.top - margin.bottom;

var svg = d3.select('body').append('svg')
    .attr("class", "San")
    .attr('width', window.innerWidth)
    .attr('height', window.innerHeight)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var sankey = d3.sankey()
    .nodeWidth(20)
    .nodePadding(15)
    .size([width/2, height/2]);

var path = sankey.link();

d3.json("test.json", function(graph) {
    
    pos_val = graph.links[0].value;
    neg_val = graph.links[1].value;
    console.log(graph.links[0].value);
    console.log(graph.links[1].value);
    
    if(isPos(pos_val, neg_val) === true) {
        document.getElementById('Result').innerHTML = 'POSITIVE';
        document.getElementById("Result").style.color = getResultTextColor("Positive");
        console.log("Positive");
    }
    else if(isNeg(pos_val, neg_val) === true) {
        document.getElementById('Result').innerHTML = 'NEGATIVE';
        document.getElementById("Result").style.color = getResultTextColor("Negative");
        console.log("Negative");
    }
    else if (isNeutral(pos_val, neg_val) === true) {
        document.getElementById('Result').innerHTML = 'NEUTRAL';
        document.getElementById("Result").style.color = getResultTextColor("Neutral");
        console.log("Neutral");
    }
    else {
        console.log("Null");
        return null;
    }
    
    // Assign data in json file to respective graph elements
    sankey.nodes(graph.nodes);
    sankey.links(graph.links);
    
    // Allow program more chances to find optimal placement for nodes
    sankey.layout(32);
    
    // Create Links and append to svg
    var link = svg.append('g').selectAll(".link")
        .data(graph.links)
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", path)
        // Calculate width of link to be 1 or the number, whichever is larger (no strokes < 1)
        .style("stroke-width", function(d) { return Math.max(1, d.dy); })
        .style("stroke", function(d) {
            console.log(d.target.node);
            return getLinkColor(d.target.node);
        });
    
    // Create group and class for nodes
    var node = svg.append("g").selectAll(".node")
        .data(graph.nodes)
        .enter()
        .append("g")
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")"; });
    
    node.append("rect")
        .attr("height", function(d) {
            return d.dy; })
        .attr("width", sankey.nodeWidth())
        .style("fill", function(d) {
            return getNodeColor(d.name);
        })
        .style("stroke", "black");
    
    node.append("text")
        .attr("x", -5)
        .attr("y", function(d) {
            return d.dy / 2;})
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .text(function(d) {
            return d.name + ": \n" + d.value; })
        .filter(function(d) {
            return d.x < width / 2; })
        .attr("x", 6 + sankey.nodeWidth())
        .attr("text-anchor", "start");
});