// Author: Sarah Quick
// Plot Visualization

// Resources:
// d3 API: https://github.com/d3/d3/blob/master/API.md
// d3 v4 Bar Graph Ex: https://bl.ocks.org/d3noob/bdf28027e0ce70bd132edc64f1dd7ea4
// d3 v4 Bar Graph Ex: https://bl.ocks.org/alanvillalobos/14e9f0d80ea6b0d8083ba95a9d571d13
// d3 v4 Bar Graph Ex: https://bl.ocks.org/mbostock/3885304
// Converting Map to Object code: UC Davis TA Max Gomov, ECS163 js class example
// d3 Scatter Plot Ex: https://bl.ocks.org/d3noob/6f082f0e3b820b6bf68b78f2f7786084

// Set Margins
var margin = {
    top: 25,
    bottom: 150,
    left: 400,
    right: 50
};

// Set width and height
var width = window.innerWidth - margin.left - margin.right;

var height = window.innerHeight - margin.top - margin.bottom;

// Create SVG canvas
var svg = d3.select('body').append('svg')
    .attr("class", "Plot")
    .attr('width', window.innerWidth)
    .attr('height', window.innerHeight)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// Create x and y scales
var x = d3.scaleLinear()
    .range([0, height]);

var y = d3.scaleLinear()
    .range([height, 0]);

// Read in json data
d3.json("test2.json", function(data) {
    
    var ldasMap = {};
    
    var ldas = Object.keys(data[1]);
    var numKeys = ldas.length;
    var i = 0;
    var currKey;
    
    //console.log(data[1]["lda1"].x);
    
    for(i = 0; i < numKeys; i++) {
        currKey = ldas[i];
        ldasMap[currKey] = [parseFloat(data[1][currKey].x), parseFloat(data[1][currKey].y)];
        //console.log(ldasMap);
    }
    
    console.log(ldasMap);
    
    var ldasArr = [];
    Object.keys(ldasMap).forEach(function(key) 
    {
        ldasArr.push({
            lda: key,
            x: ldasMap[key][0],
            y: ldasMap[key][1]
        });
    });
    
    console.log(ldasArr);
    
    var xVals = [];
    var yVals = [];
    var j;
    
    for(j = 0; j < ldasArr.length; j++) {
        xVals.push(ldasArr[j].x);
        yVals.push(ldasArr[j].y);
    };
    
    console.log("xVals = " + xVals);
    console.log("yVals = " + yVals);
 
    var xMax = findArrMax(xVals);
    var yMax = findArrMax(yVals);
    
    console.log("xMax = " + xMax);
    console.log("yMax = " + yMax);
    
    var xyMax = Math.max(xMax, yMax);

    console.log("xyMax = " + xyMax);
    
    // Set domains
    x.domain([0, Math.max(xMax, yMax)]);
    y.domain([0, Math.max(xMax, yMax)]);
    
    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y));
    
    // Add the scatterplot
    svg.selectAll("dot")
        .data(ldasArr)
    .enter().append("circle")
        .attr("r", 5)
        .attr("fill", "slateblue")
        .attr("cx", function(d) { return x(d.x); })
        .attr("cy", function(d) { return y(d.y); });
        
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