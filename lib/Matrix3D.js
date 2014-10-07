/**
	3D Matrix Library
	@author Bart Van Beurden
	@date 6 oktober 2014
	
	Memory layout:
		[0, 1, 2]   [a, b, c]
		[3, 4, 5] = [d, e, f]
		[6, 7, 8]   [g, h, i]
**/

// dependencies

var Matrix3D = module.exports = {};

/**
	Create a 3D Matrix
**/
Matrix3D.create = Float32Array
	? function() { return new Float32Array(9); }
	: function() { return [0, 0, 0, 0, 0, 0, 0, 0, 0]; };
	
/**
	Create a 3D Identity Matrix
**/
Matrix3D.createIdentity = function() {
	return Matrix3D.setIdentity(Matrix3D.create());
};

/**
	Set Matrix quanta
	@param {out}
	@param {m} Matrix to copy
**/
Matrix3D.setMatrix = function(out, m) {
	out[0] = m[0];
	out[1] = m[1];
	out[2] = m[2];
	out[3] = m[3];
	out[4] = m[4];
	out[5] = m[5];
	out[6] = m[6];
	out[7] = m[7];
	out[8] = m[8];
	return out;
};

/**
	Set Matrix quanta
	@param {out}
	@param ... scalar values
**/
Matrix3D.setScalar = function(out, a, b, c, d, e, f, g, h, i) {
	out[0] = a;
	out[1] = b;
	out[2] = c;
	out[3] = d;
	out[4] = e;
	out[5] = f;
	out[6] = g;
	out[7] = h;
	out[8] = i;
	return out;
};

/**
	Reset Matrix to zero
	@param {out}
**/
Matrix3D.setZero = function(out) {
	out[0] = 
	out[1] = 
	out[2] = 
	out[3] = 
	out[4] = 
	out[5] = 
	out[6] = 
	out[7] = 
	out[8] = 0;
	return out;
};

/**
	Reset Matrix to identity
	@param {out}
**/
Matrix3D.setIdentity = function(out) {
	out[0] = 
	out[4] = 
	out[8] = 1;
	out[1] = 
	out[2] = 
	out[3] = 
	out[5] = 
	out[6] = 
	out[7] = 0;
	return out;
};

/**
	Add 2 matrices
	@param {out}
	@param {m} Left matrix
	@param {n} Right matrix
**/
Matrix3D.add = function(out, m, n) {
	out[0] = m[0] + n[0];
	out[1] = m[1] + n[1];
	out[2] = m[2] + n[2];
	out[3] = m[3] + n[3];
	out[4] = m[4] + n[4];
	out[5] = m[5] + n[5];
	out[6] = m[6] + n[6];
	out[7] = m[7] + n[7];
	out[8] = m[8] + n[8];
	return out;
};

/**
	Subtract 2 matrices
	@param {out}
	@param {m} Left matrix
	@param {n} Right matrix
**/
Matrix3D.subtract = function(out, m, n) {
	out[0] = m[0] - n[0];
	out[1] = m[1] - n[1];
	out[2] = m[2] - n[2];
	out[3] = m[3] - n[3];
	out[4] = m[4] - n[4];
	out[5] = m[5] - n[5];
	out[6] = m[6] - n[6];
	out[7] = m[7] - n[7];
	out[8] = m[8] - n[8];
	return out;
};

/**
	Multiply matrix with scalar value
	@param {out}
	@param {m} Matrix to multiply
	@param {c} Scalar to multiply
**/
Matrix3D.multiplyScalar = function(out, m, c) {
	out[0] = m[0] * c;
	out[1] = m[1] * c;
	out[2] = m[2] * c;
	out[3] = m[3] * c;
	out[4] = m[4] * c;
	out[5] = m[5] * c;
	out[6] = m[6] * c;
	out[7] = m[7] * c;
	out[8] = m[8] * c;
	return out;
};

/**
	Multiply matrix with 2D vector
	@param {out}
	@param {m} Matrix to multiply
	@param {v} 2D Vector to multiply
**/
Matrix3D.multiplyVector2D = function(out, m, v) {
	var x = v[0];
	var y = v[1];
	
	out[0] = m[0] * x + m[1] * y + m[2];
	out[1] = m[3] * x + m[4] * y + m[5];
	return out;
};

/**
	Multiply matrix with 3D vector
	@param {out}
	@param {m} Matrix to multiply
	@param {v} 2D Vector to multiply
**/
Matrix3D.multiplyVector3D = function(out, m, v) {
	var x = v[0];
	var y = v[1];
	var z = v[2];
	
	out[0] = m[0] * x + m[1] * y + m[2] * z;
	out[1] = m[3] * x + m[4] * y + m[5] * z;
	out[2] = m[6] * x + m[7] * y + m[8] * z;
	return out;
};

/**
	Multply matrix with matrix
	@param {out}
	@param {m} Left matrix
	@param {n} Right matrix
**/
Matrix3D.multiplyMatrix3D = function(out, m, n) {
	var m0 = m[0], m1 = m[1], m2 = m[2];
	var m3 = m[3], m4 = m[4], m5 = m[5];
	var m6 = m[6], m7 = m[7], m8 = m[8];
	
	var n0 = n[0], n1 = n[1], n2 = n[2];
	var n3 = n[3], n4 = n[4], n5 = n[5];
	var n6 = n[6], n7 = n[7], n8 = n[8];
	
	out[0] = m0 * n0 + m1 * n3 + m2 * n6;
	out[1] = m0 * n1 + m1 * n4 + m2 * n7;
	out[2] = m0 * n2 + m1 * n5 + m2 * n8;
	
	out[3] = m3 * n0 + m4 * n3 + m5 * n6;
	out[4] = m3 * n1 + m4 * n4 + m5 * n7;
	out[5] = m3 * n2 + m4 * n5 + m5 * n8;
	
	out[6] = m6 * n0 + m7 * n3 + m8 * n6;
	out[7] = m6 * n1 + m7 * n4 + m8 * n7;
	out[8] = m6 * n2 + m7 * n5 + m8 * n8;
	
	return out;
};

/**
	Set matrix to translation matrix
	@param {out}
	@param {x} X translation
	@param {y} Y translation
**/
Matrix3D.setTranslation = function(out, x, y) {
	out[0] = 
	out[4] = 
	out[8] = 1;
	out[1] =
	out[3] =
	out[6] = 
	out[7] = 0;
	out[2] = x;
	out[5] = y;
	return out;
};

/**
	Set matrix to translation matrix
	@param {out}
	@param {v} 2D Translation vector
**/
Matrix3D.setTranslationVector = function(out, v) {
	out[0] = 
	out[4] = 
	out[8] = 1;
	out[1] =
	out[3] =
	out[6] = 
	out[7] = 0;
	out[2] = v[0];
	out[5] = v[1];
	return out;
};

/**
	Translate matrix
	@param {out}
	@param {m} Matrix to be translated
	@param {x} X translation
	@param {y} Y translation
**/
Matrix3D.translate = function(out, m, x, y) {
	var m0 = m[0], m1 = m[1];
	var m3 = m[3], m4 = m[4];
	var m6 = m[6], m7 = m[7];
	
	out[0] = m0;
	out[1] = m1;
	out[2] = m0 * x + m1 * y + m[2];
	out[3] = m3;
	out[4] = m4;
	out[5] = m3 * x + m4 * y + m[5];
	out[6] = m6;
	out[7] = m7;
	out[8] = m6 * x + m7 * y + m[8];
	
	return out;
};

/**
	Set rotation matrix
	@param {out}
	@param {angle}
**/
Matrix3D.setRotation = function(out, angle) {
	var cos = Math.cos(angle);
	var sin = Math.sin(angle);
	
	out[0] = cos;
	out[1] = -sin;
	out[2] = 0;
	out[3] = sin;
	out[4] = cos;
	out[5] = 0;
	out[6] = 0;
	out[7] = 0;
	out[8] = 1;
	
	return out;
};

/**
	Rotate matrix
	@param {out}
	@param {m}
	@param {angle}
**/
Matrix3D.rotate = function(out, m, angle) {
	var cos = Math.cos(angle);
	var sin = Math.sin(angle);
	
	var m0 = m[0], m1 = m[1];
	var m3 = m[3], m4 = m[4];
	var m6 = m[6], m7 = m[7];
	
	out[0] = m0 * cos + m1 * sin;
	out[1] = m1 * cos - m0 * sin;
	out[2] = m[2];
	out[3] = m3 * cos + m4 * sin;
	out[4] = m4 * cos - m3 * sin;
	out[5] = m[5];
	out[6] = m6 * cos + m7 * sin;
	out[7] = m7 * cos - m6 * sin;
	out[8] = m[8];
	
	return out;
};

/**
	Set scaling matrix
	@param {out}
	@param {x} X scale
	@param {y} Y scale
**/
Matrix3D.setScaling = function(out, x, y) {
	out[0] = x;
	out[4] = y;
	out[8] = 1;
	out[1] = 
	out[2] = 
	out[3] = 
	out[5] = 
	out[6] = 
	out[7] = 0;
	return out;
};

/**
	Scale matrix
	@param {out}
	@param {m} Matrix to be scaled
	@param {x} X scale
	@param {y} Y scale
**/
Matrix3D.scale = function(out, m, x, y) {
	out[0] = m[0] * x;
	out[1] = m[1] * y;
	out[2] = m[2];
	out[3] = m[3] * x;
	out[4] = m[4] * y;
	out[5] = m[5];
	out[6] = m[6] * x;
	out[7] = m[7] * y;
	out[8] = m[8];
	return out;
};
