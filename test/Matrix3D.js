// dependencies
var assert = require("assert");
var Vector2D = require("../index.js").Vector2D;
var Matrix3D = require("../index.js").Matrix3D;

// test suite
module.exports = function() {
	// helpers
	var EPSILON = 2.0E-6;
	
	var vec = function(a, b) {
		return Vector2D.setScalar(Vector2D.create(), a, b);
	};
	
	var mat = function(a, b, c, d, e, f, g, h, i) {
		return Matrix3D.setScalar(Matrix3D.create(), a, b, c, d, e, f, g, h, i);
	};

	var assertEqual = function(a, b) {
		for (var i = 0, len = a.length; i < len; i++)
			if (a[i] != b[i]) throw new Error("Expected a["+i+"] == b["+i+"] but found a["+i+"] == " + a[i] + " and b["+i+"] == " + b[i]);
	};
	
	var assertEqualish = function(a, b) {
		for (var i = 0, len = a.length; i < len; i++)
			if (Math.abs(a[i] - b[i]) > EPSILON) throw new Error("Expected a["+i+"] == b["+i+"] but found a["+i+"] == " + a[i] + " and b["+i+"] == " + b[i]);
	};
	
	// Matrix3D.create()
	describe(".create()", function() {
		it("should create a zero matrix", function() {
			assertEqual(Matrix3D.create(), [0, 0, 0, 0, 0, 0, 0, 0, 0]);
		});
	});
	
	// Matrix3D.setMatrix()
	describe(".setMatrix()", function() {
		it("should copy a matrix", function() {
			var m = [1, 2, 3, 4, 5, 6, 7, 8, 9];
			var z = [0, 0, 0, 0, 0, 0, 0, 0, 0];
			assertEqual(Matrix3D.setMatrix(Matrix3D.create(), m), m);
			assertEqual(Matrix3D.setMatrix(Matrix3D.create(), z), z);
		});
	});
	
	// Matrix3D.setScalar()
	describe(".setScalar()", function() {
		it("should set scalar values", function() {
			assertEqual(Matrix3D.setScalar(Matrix3D.create(),
				 1, 2, 3, 4, 5, 6, 7, 8, 9),
				[1, 2, 3, 4, 5, 6, 7, 8, 9]);
			assertEqual(Matrix3D.setScalar(Matrix3D.create(),
				 0, 0, 0, 0, 0, 0, 0, 0, 0),
				[0, 0, 0, 0, 0, 0, 0, 0, 0]);
		});
	});
	
	// Matrix3D.setZero()
	describe(".setZero()", function() {
		it("should set matrix to zero", function() {
			assertEqual(Matrix3D.setZero(mat(
				 1, 2, 3, 4, 5, 6, 7, 8, 9)),
				[0, 0, 0, 0, 0, 0, 0, 0, 0]);
			assertEqual(Matrix3D.setZero(Matrix3D.create()),
				[0, 0, 0, 0, 0, 0, 0, 0, 0]);
		});
	});
	
	// Matrix3D.setIdentity()
	describe(".setIdentity()", function() {
		it("should set matrix to identity", function() {
			assertEqual(Matrix3D.setIdentity(mat(
				 1, 2, 3, 4, 5, 6, 7, 8, 9)),
				[1, 0, 0, 0, 1, 0, 0, 0, 1]);
		});
	});
	
	// Matrix3D.add()
	describe(".add()", function() {
		it("should add 2 matrices", function() {
			var m = [1, 2, 3, 4, 5, 6, 7, 8, 9];
			var n = [5, 9, 4, 1, 8, 3, 6, 2, 7];
			assertEqual(Matrix3D.add(Matrix3D.create(), m, n),
				[6, 11, 7, 5, 13, 9, 13, 10, 16]);
		});
	});
	
	// Matrix3D.subtract()
	describe(".subtract()", function() {
		it("should subtract 2 matrices", function() {
			var m = [1, 2, 3, 4, 5, 6, 7, 8, 9];
			var n = [5, 9, 4, 1, 8, 3, 6, 2, 7];
			assertEqual(Matrix3D.subtract(Matrix3D.create(), m, n),
				[-4, -7, -1, 3, -3, 3, 1, 6, 2]);
			assertEqual(Matrix3D.subtract(Matrix3D.create(), m, m),
				[0, 0, 0, 0, 0, 0, 0, 0, 0]);
		});
	});
	
	// Matrix3D.multiplyScalar()
	describe(".multiplyScalar()", function() {
		it("should multiply with scalar", function() {
			var m = [3, 4, 5, 2, 3, 4, 1, 2, 3];
			var n = Matrix3D.multiplyScalar(Matrix3D.create(), m, 2);
			assertEqual(n, [6, 8, 10, 4, 6, 8, 2, 4, 6]);
			assertEqual(Matrix3D.multiplyScalar(Matrix3D.create(), n, 0.5), m);
		});
	});
	
	// Matrix3D.multiplyVector2D()
	describe(".multiplyVector2D()", function() {
		it("should multiply with vector 2D", function() {
			var m = [1, 2, 3, 4, 5, 6, 7, 8, 9];
			assertEqual(Matrix3D.multiplyVector2D(
				Vector2D.create(), m, [2, 3]), [11, 29]);
		});
	});
	
	// Matrix3D.multiplyVector3D()
	describe(".multiplyVector3D()", function() {
		it("should multiply with vector 3D", function() {
			var m = [1, 2, 3, 4, 5, 6, 7, 8, 9];
			assertEqual(Matrix3D.multiplyVector3D(
				[0, 0, 0], m, [2, 3, 4]), [20, 47, 74]);
		});
	});
	
	// Matrix3D.multiplyMatrix3D()
	describe(".multiplyMatrix3D()", function() {
		it("should multiply with matrix 3D", function() {
			var m = [5, 1, 2, 3, 9, 4, 8, 6, 7];
			var n = [6, 1, 2, 4, 5, 8, 7, 9, 3];
			var out = [48, 28, 24, 82, 84, 90, 121, 101, 85];
			assertEqual(Matrix3D.multiplyMatrix3D(Matrix3D.create(), m, n), out);
		});
		it("should multiply itself with matrix 3D (left)", function() {
			var m = [5, 1, 2, 3, 9, 4, 8, 6, 7];
			var n = [6, 1, 2, 4, 5, 8, 7, 9, 3];
			var out = [48, 28, 24, 82, 84, 90, 121, 101, 85];
			assertEqual(Matrix3D.multiplyMatrix3D(m, m, n), out);
		});
		it("should multiply itself with matrix 3D (right)", function() {
			var m = [5, 1, 2, 3, 9, 4, 8, 6, 7];
			var n = [6, 1, 2, 4, 5, 8, 7, 9, 3];
			var out = [48, 28, 24, 82, 84, 90, 121, 101, 85];
			assertEqual(Matrix3D.multiplyMatrix3D(n, m, n), out);
		});
	});
	
	// Matrix3D.setTranslation()
	describe(".setTranslation()", function() {
		it("should set to translation matrix", function() {
			var out = [1, 0, 3, 0, 1, 5, 0, 0, 1];
			assertEqual(Matrix3D.setTranslation(
				Matrix3D.create(), 3, 5), out);
		});
		it("should translate vector", function() {
			var m = Matrix3D.setTranslation(Matrix3D.create(), 3, 5);
			var out = Matrix3D.multiplyVector2D([0, 0], m, [2, 4]);
			assertEqual(out, [5, 9]);
		});
	});
	
	// Matrix3D.setTranslationVector()
	describe(".setTranslationVector()", function() {
		it("should set to translation matrix", function() {
			var out = [1, 0, 3, 0, 1, 5, 0, 0, 1];
			assertEqual(Matrix3D.setTranslationVector(
				Matrix3D.create(), [3, 5]), out);
		});
		it("should translate vector", function() {
			var m = Matrix3D.setTranslationVector(Matrix3D.create(), [3, 5]);
			var out = Matrix3D.multiplyVector2D([0, 0], m, [2, 4]);
			assertEqual(out, [5, 9]);
		});
	});
	
	// Matrix3D.translate()
	describe(".translate()", function() {
		it("should translate matrix", function() {
			var m = [5, 1, 2, 3, 9, 4, 8, 6, 7];
			var out = Matrix3D.translate(Matrix3D.create(), m, 3, 5);
			var trans = Matrix3D.setTranslation(Matrix3D.create(), 3, 5);
			var expected = Matrix3D.multiplyMatrix3D(Matrix3D.create(), m, trans);
			assertEqualish(out, expected);
		});
		it("should translate itself", function() {
			var m = [5, 1, 2, 3, 9, 4, 8, 6, 7];
			var trans = Matrix3D.setTranslation(Matrix3D.create(), 3, 5);
			var expected = Matrix3D.multiplyMatrix3D(Matrix3D.create(), m, trans);
			var out = Matrix3D.translate(m, m, 3, 5);
			assertEqualish(out, expected);
		});
	});
	
	// Matrix3D.setRotation()
	describe(".setRotation()", function() {
		it("should set to rotation matrix", function() {
			var out = [0, -1, 0, 1, 0, 0, 0, 0, 1];
			assertEqualish(Matrix3D.setRotation(Matrix3D.create(), Math.PI / 2), out);
		});
		it("should rotate vector", function() {
			var m = Matrix3D.setRotation(Matrix3D.create(), Math.PI / 2);
			var out = Matrix3D.multiplyVector2D([0, 0], m, [2, 4]);
			assertEqualish(out, [-4, 2]);
		});
	});
	
	// Matrix3D.rotate()
	describe(".rotate()", function() {
		it("should rotate matrix", function() {
			var m = [5, 1, 2, 3, 9, 4, 8, 6, 7];
			var out = Matrix3D.rotate(Matrix3D.create(), m, Math.PI / 3);
			var rotate = Matrix3D.setRotation(Matrix3D.create(), Math.PI / 3);
			var expected = Matrix3D.multiplyMatrix3D(Matrix3D.create(), m, rotate);
			assertEqualish(out, expected);
		});
		it("should rotate itself", function() {
			var m = [5, 1, 2, 3, 9, 4, 8, 6, 7];
			var rotate = Matrix3D.setRotation(Matrix3D.create(), Math.PI / 3);
			var expected = Matrix3D.multiplyMatrix3D(Matrix3D.create(), m, rotate);
			var out = Matrix3D.rotate(m, m, Math.PI / 3);
			assertEqualish(out, expected);
		});
	});
	
	// Matrix3D.setScaling()
	describe(".setScaling()", function() {
		it("should set to scaling matrix", function() {
			var out = [2, 0, 0, 0, 0.5, 0, 0, 0, 1];
			assertEqualish(Matrix3D.setScaling(Matrix3D.create(), 2, 1/2), out);
		});
		it("should scale vector", function() {
			var m = Matrix3D.setScaling(Matrix3D.create(), 2, 1/2);
			var out = Matrix3D.multiplyVector2D([0, 0], m, [2, 4]);
			assertEqualish(out, [4, 2]);
		});
	});
	
	// Matrix3D.scale()
	describe(".scale()", function() {
		it("should scale matrix", function() {
			var m = [5, 1, 2, 3, 9, 4, 8, 6, 7];
			var out = Matrix3D.scale(Matrix3D.create(), m, 3, 5);
			var scale = Matrix3D.setScaling(Matrix3D.create(), 3, 5);
			var expected = Matrix3D.multiplyMatrix3D(Matrix3D.create(), m, scale);
			assertEqualish(out, expected);
		});
		it("should scale itself", function() {
			var m = [5, 1, 2, 3, 9, 4, 8, 6, 7];
			var scale = Matrix3D.setScaling(Matrix3D.create(), 3, 5);
			var expected = Matrix3D.multiplyMatrix3D(Matrix3D.create(), m, scale);
			var out = Matrix3D.scale(m, m, 3, 5);
			assertEqualish(out, expected);
		});
	});
};