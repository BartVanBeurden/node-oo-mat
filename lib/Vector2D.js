/**
	2D Vector Library
	@author Bart Van Beurden
	@date 6 oktober 2014
	
	Memory layout:
		[0, 1] == [a, b]
**/

// dependencies

var Vector2D = module.exports = {};

/**
	Create 2D Vector
**/
Vector2D.create = Float32Array
	? function() { return new Float32Array(2); }
	: function() { return [0, 0]; }
	
/**
	Set vector quanta
	@param {out}
	@param {v} Vector to copy
**/
Vector2D.setVector = function(out, v) {
	out[0] = v[0];
	out[1] = v[1];
	return out;
};

/**
	Set vector quanta
	@param {out}
	@param {x} X scalar value
	@param {y} Y scalar value
**/
Vector2D.setScalar = function(out, x, y) {
	out[0] = x;
	out[1] = y;
	return out;
};

/**
	Add 2 vectors
	@param {out}
	@param {v} Left vector
	@param {w} Right vector
**/
Vector2D.add = function(out, v, w) {
	out[0] = v[0] + w[0];
	out[1] = v[1] + w[1];
	return out;
};

/**
	Subtract 2 vectors
	@param {out}
	@param {v} Left vector
	@param {w} Right vector
**/
Vector2D.subtract = function(out, v, w) {
	out[0] = v[0] - w[0];
	out[1] = v[1] - w[1];
	return out;
};

/**
	Multiply vector with scalars
	@param {out}
	@param {v} Vector to multiply
	@param {c} Y scalar to multiply with
**/
Vector2D.multiplyScalar = function(out, v, c) {
	out[0] = v[0] * c;
	out[1] = v[1] * c;
	return out;
};

/**
	Multiply vectors (dot product)
	@param {v} Left vector
	@param {w} Right vector
**/
Vector2D.multiplyVector = 
Vector2D.dot = function(v, w) {
	return v[0] * w[0] + v[1] * w[1];
};

/**
	Calculate square length of vector
	@param {v}
**/
Vector2D.length2 = function(v) {
	return v[0] * v[0] + v[1] * v[1];
};

/**
	Calculate length of vector
	@param {v}
**/
Vector2D.length = function(v) {
	return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
};

/**
	Calculate square distance between vectors
	@param {v} Left vector
	@param {w} Right vector
**/
Vector2D.distance2 = function(v, w) {
	var x = w[0] - v[0];
	var y = w[1] - v[1];
	return x * x + y * y;
};

/**
	Calculate distance between vectors
	@param {v} Left vector
	@param {w} Right vector
**/
Vector2D.distance = function(v, w) {
	var x = w[0] - v[0];
	var y = w[1] - v[1];
	return Math.sqrt(x * x + y * y);
};

/**
	Normalize vector
	@param {out}
	@param {v}
**/
Vector2D.normalize = function(out, v) {
	var len = 1 / Vector2D.length(v);
	out[0] = v[0] * len;
	out[1] = v[1] * len;
	return out;
};

/**
	Offset towards angle
	@param {out}
	@param {vertex} Vertex to offset
	@param {distance} Distance to offset
	@param {angle} Angle to offset towards
**/
Vector2D.offsetTowardsAngle = function(out, vertex, distance, angle) {
	var cos = Math.cos(angle);
	var sin = Math.sin(angle);
	
	out[0] = vertex[0] + distance * cos;
	out[1] = vertex[1] + distance * sin;
	return out;
};

/**
	Offset towards point
	@param {out}
	@param {vertex} Vertex to offset
	@param {distance} Distance to offset
	@param {target} Vertex to offset towards
**/
Vector2D.offsetTowardsPoint = 
Vector2D.offsetTowardsVertex = function(out, vertex, distance, target) {
	var x = target[0] - vertex[0];
	var y = target[1] - vertex[1];
	var len = Math.sqrt(x * x + y * y);
	var cos = x / len;
	var sin = y / len;
	
	out[0] = vertex[0] + distance * cos;
	out[1] = vertex[1] + distance * sin;
	return out;
};
