// dependencies
var assert = require("assert");
var Vector2D = require("../index.js").Vector2D;

// test suite
module.exports = function() {
	// helpers
	var EPSILON = 1E-6;
	
	var vec = function(a, b) {
		return Vector2D.setScalar(Vector2D.create(), a, b);
	};

	var assertEqual = function(a, b) {
		if (a[0] != b[0]) throw new Error("Expected a[0] == b[0] but found a[0] == " + a[0] + " and b[0] == " + b[0]);
		if (a[1] != b[1]) throw new Error("Expected a[1] == b[1] but found a[1] == " + a[1] + " and b[1] == " + b[1]);
	};
	
	var assertEqualish = function(a, b) {
		if (a[0] - b[0] > EPSILON) throw new Error("Expected a[0] == b[0] but found a[0] == " + a[0] + " and b[0] == " + b[0]);
		if (a[1] - b[1] > EPSILON) throw new Error("Expected a[1] == b[1] but found a[1] == " + a[1] + " and b[1] == " + b[1]);
	};
	
	// Vector2D.create()
	describe(".create()", function() {
		it("should create a zero vector", function() {
			assertEqual(Vector2D.create(), [0, 0]);
		});
	});
	
	// Vector2D.setVector()
	describe(".setVector()", function() {
		it("should copy a vector", function() {
			assertEqual(Vector2D.setVector(Vector2D.create(), [3, 4]), [3, 4]);
			assertEqual(Vector2D.setVector(Vector2D.create(), [0, 0]), [0, 0]);
		});
	});
	
	// Vector2D.setScalar()
	describe(".setScalar()", function() {
		it("should set scalars", function() {
			assertEqual(Vector2D.setScalar(Vector2D.create(), 3, 4), [3, 4]);
			assertEqual(Vector2D.setScalar(Vector2D.create(), 0, 0), [0, 0]);
		});
	});
	
	// Vector2D.add()
	describe(".add()", function() {
		it("should add vectors", function() {
			assertEqual(Vector2D.add(vec(0, 0), vec(2, 4), vec(3, 5)), [5, 9]);
			assertEqual(Vector2D.add(vec(0, 0), vec(3, 1), vec(-5, -5)), [-2, -4]);
		});
		it("should add to itself", function() {
			var v = vec(4, -1);
			var w = vec(6, 2);
			assertEqual(Vector2D.add(v, v, vec(5, 1)), [9, 0]);
			assertEqual(Vector2D.add(w, vec(5, 1), w), [11, 3]);
		});
	});
	
	// Vector2D.subtract()
	describe(".subtract()", function() {
		it("should subtract vectors", function() {
			assertEqual(Vector2D.subtract(vec(0, 0), vec(2, 4), vec(3, 5)), vec(-1, -1));
			assertEqual(Vector2D.subtract(vec(0, 0), vec(3, 1), vec(-5, -5)), vec(8, 6));
		});
		it("should subtract from itself", function() {
			var v = vec(4, -1);
			var w = vec(6, 2);
			assertEqual(Vector2D.subtract(v, v, vec(5, 1)), [-1, -2]);
			assertEqual(Vector2D.subtract(w, vec(5, 1), w), [-1, -1]);
		});
	});
	
	// Vector2D.multiplyScalar
	describe(".multiplyScalar()", function() {
		it("should multiply with scalar", function() {
			assertEqual(Vector2D.multiplyScalar(vec(0, 0), vec(3, 1), 2), [6, 2]);
		});
		it("should multiply itself with scalar", function() {
			var v = vec(4, 1);
			assertEqual(Vector2D.multiplyScalar(v, v, 3), [12, 3]);
		});
	});
	
	// Vector2D.multiplyVector
	describe(".multiplyVector()", function() {
		it("should multiply with vector", function() {
			assert.equal(Vector2D.multiplyVector(vec(2, 4), vec(1, 3)), 14);
			assert.equal(Vector2D.multiplyVector(vec(-1, 2), vec(3, -2)), -7);
		});
	});
	
	// Vector2D.length2
	describe(".length2()", function() {
		it("should be square length", function() {
			assert.equal(Vector2D.length2(vec(2, 3)), 13);
			assert.equal(Vector2D.length2(vec(3, -2)), 13);
		});
	});
	
	// Vector2D.length
	describe(".length()", function() {
		it("should be length", function() {
			assert.equal(Vector2D.length(vec(4, 3)), 5);
			assert.equal(Vector2D.length(vec(3, -4)), 5);
		});
	});
	
	// Vector2D.distance2
	describe(".distance2()", function() {
		it("should be square distance", function() {
			assert.equal(Vector2D.distance2(vec(4, 3), vec(-4, -3)), 100);
		});
	});
	
	// Vector2D.distance
	describe(".distance()", function() {
		it("should be distance", function() {
			assert.equal(Vector2D.distance(vec(4, 3), vec(-4, -3)), 10);
		});
	});
	
	// Vector2D.normalize
	describe(".normalize()", function() {
		var s1 = 1 / Math.sqrt(2);
		it("should normalize", function() {
			assertEqualish(Vector2D.normalize(vec(0, 0), vec(0, 2)), [0, 1]);
			assertEqualish(Vector2D.normalize(vec(0, 0), vec(3, 0)), [1, 0]);
			assertEqualish(Vector2D.normalize(vec(0, 0), vec(2, 2)), [s1, s1]);
		});
		it("should normalize itself", function() {
			var v0 = vec(0, 2);
			var v1 = vec(2, 0);
			var v2 = vec(2, 2);
			assertEqualish(Vector2D.normalize(v0, v0), [0, 1]);
			assertEqualish(Vector2D.normalize(v1, v1), [1, 0]);
			assertEqualish(Vector2D.normalize(v2, v2), [s1, s1]);
		});
		it("should normalize null vector", function() {
			var v = Vector2D.normalize(vec(0, 0), vec(0, 0));
			assert.notEqual(v[0], v[0]); // NaN
			assert.notEqual(v[1], v[1]); // NaN
		});
	});
	
	// Vector2D.offsetTowardsAngle
	describe(".offsetTowardsAngle", function() {
		it("should offset vertex towards angle", function() {
			assertEqual(Vector2D.offsetTowardsAngle(
				vec(0, 0), vec(3, 4), 2, -Math.PI/2), [3, 2]);
			assertEqual(Vector2D.offsetTowardsAngle(
				vec(0, 0), vec(2, 3), Math.sqrt(2), Math.PI / 4), [3, 4]);
		});
	});
	
	// Vector2D.offsetTowardsPoint
	describe(".offsetTowardsPoint", function() {
		it("should offset vertex towards vertex", function() {
			assertEqual(Vector2D.offsetTowardsVertex(
				vec(0, 0), vec(3, 4), 2, vec(3, 1)), [3, 2]);
			assertEqual(Vector2D.offsetTowardsVertex(
				vec(0, 0), vec(3, 4), 2, vec(3, 5)), [3, 6]);
			assertEqual(Vector2D.offsetTowardsVertex(
				vec(0, 0), vec(3, 4), 2, vec(0, 4)), [1, 4]);
			assertEqual(Vector2D.offsetTowardsVertex(
				vec(0, 0), vec(3, 4), 2, vec(6, 4)), [5, 4]);
			assertEqual(Vector2D.offsetTowardsVertex(
				vec(0, 0), vec(2, 3), Math.sqrt(2), vec(3, 4)), [3, 4]);
		});
	});

};