/**
	2D Line Library
	@author Bart Van Beurden
	@date 7 oktober 2014
**/

// dependencies
var Vector2D = require("./Vector2D.js");
var EPSILON = 1E-6;

var Line2D = module.exports = {};

/**
	Calculate the length of a line segment
	@param {v} First segment point
	@param {w} Second segment point
**/
Line2D.segmentLength = Vector2D.distance;

/**
	Test if line contains vertex
	@param {v} First point on line
	@param {w} Second point on line
	@param {p} Vertex to be tested
	@returns {Boolean} true if line contains vertex
**/
Line2D.containsVertex = function(v, w, p) {
	var x1 = v[0], y1 = v[1];
	var x2 = w[0], y2 = w[1];
	
	// vertical line
	if (x1 == x2) return p[0] == x1;
	
	// horizontal line
	if (y1 == y2) return p[1] == y1;
	
	// sloped line
	var m = (y2 - y1) / (x2 - x1);
	return Math.abs(m * (p[0] - x1) + y1 - p[1]) < EPSILON;
};

/**
	Test if line segment contains vertex
	@param {v} First segment bounding point
	@param {w} Second segment bounding point
	@param {p} Vertex to be tested
**/
Line2D.segmentContainsVertex = function(v, w, p) {
	var x = p[0], y = p[1];
	var x1 = v[0], y1 = v[1];
	var x2 = w[0], y2 = w[1];
	
	// vertical segment
	if (x1 == x2) {
		if (x != x1) return false;
		if (y1 < y2) return y >= y1 && y <= y2;
		return y >= y2 && y <= y1;
		
	// horizontal segment
	} else if (y1 == y2) {
		if (y != y1) return false;
		if (x1 < x2) return x >= x1 && x <= x2;
		return x >= x2 && x <= x1;
		
	// sloped segment
	} else {
		var m = (y2 - y1) / (x2 - x1);
		// check if vertex on line
		if (Math.abs(m * (p[0] - x1) + y1 - p[1]) >= EPSILON) return false;
		// check if vertex within segment bounds
		if (x1 < x2) return x >= x1 && x <= x2;
		return x >= x2 && x <= x1;
	}
};

/**
	Compute where 2 lines intersect
	@param {out} Vector2D to write intersection to
	@param {v1} Line 1 Vertex 1
	@param {w1} Line 1 Vertex 2
	@param {v2} Line 2 Vertex 1
	@param {w2} Line 2 Vertex 2
	@returns {out} Intersecting point, or false if lines do not intersect
**/
Line2D.intersect = function(out, v1, w1, v2, w2) {
	var x1 = v1[0], y1 = v1[1];
	var x2 = v2[0], y2 = v2[1];
	
	var m1 = (w1[1] - y1) / (w1[0] - x1);
	var m2 = (w2[1] - y2) / (w2[0] - x2);
	var m = m1 - m2;
	
	// parallel lines
	if (m == 0 || m != m) return false; // m != m when NaN
	
	// intersecting lines
	out[0] = (x1 * m1 - x2 * m2 + y2 - y1) / (m);
	out[1] = (out[0] - x1) * m1 + y1;
	
	return out;
};

/**
	Compute where line intersects with axis parallel to X
	@param {out} Vector2D to write intersection to
	@param {v} Vertex 1
	@param {w} Vertex 2
	@param {y} Constant Y coordinate
**/
Line2D.intersectAxisX = function(out, v, w, y) {
	var x1 = v[0], y1 = v[1];
	var x2 = w[0], y2 = w[1];
	if (y1 == y2) return false;
	var m = (y2 - y1) / (x2 - x1);
	out[0] = x1 + (y - y1) / m;
	out[1] = y;
	return out;
	// PROBLEM: what if (v, w) IS the axis? i.e. ALL points intersect
};

/**
	Compute where line intersects with axis parallel to Y
	@param {out}Vector2D to write intersection to
	@param {v} Vertex 1
	@param {w} Vertex 2
	@param {x} Constant X coordinate
**/
Line2D.intersectAxisY = function(out, v, w, x) {
	var x1 = v[0], y1 = v[1];
	var x2 = w[0], y2 = w[1];
	if (x1 == x2) return false;
	var m = (y2 - y1) / (x2 - x1);
	out[0] = x;
	out[1] = (x - x1) * m + y1;
	return out;
	// PROBLEM: what if (v, w) IS the axis? i.e. ALL points intersect
};

/**
	Compute where 2 segments intersect
	@param {out} Vector2D to write intersection to
	@param {v1} Segment 1 Vertex 1
	@param {w1} Segment 1 Vertex 2
	@param {v2} Segment 2 Vertex 1
	@param {w2} Segment 2 Vertex 2
	@returns {out} or false if no intersection
**/
Line2D.segmentIntersect = (function() {
	var temp = Vector2D.create();
	
	return function(out, v1, w1, v2, w2) {
		if (!Line2D.intersect(temp, v1, w1, v2, w2)) return false;
		var x = temp[0];
		var y = temp[1];
		
		// check if vertex within segment 1 bounds
		var vx = v1[0], wx = w1[0];
		var minX = vx < wx ? vx : wx;
		var maxX = vx < wx ? wx : vx;
		if (x < minX || x > maxX) return false;
		
		// check if vertex within segment 2 bounds
		var vx = v2[0], wx = w2[0];
		var minX = vx < wx ? vx : wx;
		var maxX = vx < wx ? wx : vx;
		if (x < minX || x > maxX) return false;
		
		out[0] = temp[0];
		out[1] = temp[1];
		return out;
	};
})();

/**
	Compute perpendicular to a line
	@param {v1} Segment 1 Vertex 1
	@param {w1} Segment 1 Vertex 2
	@param {v2} Segment 2 Vertex 1
	@param {out} Segment 2 Vertex 2 such that (v1, w1) perpendicular to (v2, w2)
**/
Line2D.perpendicular = function(v1, w1, v2, w2) {
	var x1 = v1[0], y1 = v1[1];
	var x2 = v2[0], y2 = v2[1];
	var m1 = (w1[1] - y1) / (w1[0] - x1);
	
	if (m1 == 0) {
		w2[0] = x2;
		w2[1] = y2 + 1;
	} else if (m1 != m1) { // NaN
		w2[0] = x2 + 1;
		w2[1] = y2;
	} else {
		w2[0] = x2 + 1;
		w2[1] = y2 - (1 / m1);
	}
	
	return w2;
};
