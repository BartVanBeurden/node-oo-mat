// dependencies
var assert = require("assert");
var Vector2D = require("../index.js").Vector2D;
var Line2D = require("../index.js").Line2D;

// test suite
module.exports = function() {
	// helpers
	var EPSILON = 1E-6;
	
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
	
	// .containsVertex()
	describe(".containsVertex()", function() {
		it("should contain vertex", function() {
			var v = vec(1, 1), w = vec(9, 5), p = vec(3, 2);
			assert.equal(Line2D.containsVertex(v, w, p), true);
		});
		it("should not contain vertex", function() {
			var v = vec(1, 1), w = vec(9, 5), p = vec(3, 2.1);
			assert.equal(Line2D.containsVertex(v, w, p), false);
		});
		it("horizontal line should contain vertex", function() {
			var v = vec(2, 4), w = vec(5, 4), p = vec(6, 4);
			assert.equal(Line2D.containsVertex(v, w, p), true);
		});
		it("vertical line should contain vertex", function() {
			var v = vec(4, 2), w = vec(4, 5), p = vec(4, 6);
			assert.equal(Line2D.containsVertex(v, w, p), true);
		});
	});
	
	// .segmentContainsVertex()
	describe(".segmentContainsVertex()", function() {
		it("should contain vertex", function() {
			var v = vec(1, 1), w = vec(9, 5), p = vec(3, 2);
			assert.equal(Line2D.segmentContainsVertex(v, w, p), true);
		});
		it("should not contain vertex", function() {
			var v = vec(1, 1), w = vec(9, 5), p = vec(-1, 0);
			assert.equal(Line2D.segmentContainsVertex(v, w, p), false);
		});
		it("horizontal line should contain vertex", function() {
			var v = vec(2, 4), w = vec(5, 4), p = vec(4, 4);
			assert.equal(Line2D.segmentContainsVertex(v, w, p), true);
		});
		it("horizontal line should not contain vertex", function() {
			var v = vec(2, 4), w = vec(5, 4), p = vec(6, 4);
			assert.equal(Line2D.segmentContainsVertex(v, w, p), false);
		});
		it("vertical line should contain vertex", function() {
			var v = vec(4, 2), w = vec(4, 5), p = vec(4, 3);
			assert.equal(Line2D.segmentContainsVertex(v, w, p), true);
		});
		it("vertical line should not contain vertex", function() {
			var v = vec(4, 2), w = vec(4, 5), p = vec(4, 6);
			assert.equal(Line2D.segmentContainsVertex(v, w, p), false);
		});
	});
	
	// .intersect()
	describe(".intersect()", function() {
		it("should find the intersecting point", function() {
			var out = Vector2D.create();
			var result = Line2D.intersect(out, 
				[1, 1], [2, 1], [0, -3], [3, 3]);
			if (!result) throw "returned false";
			assertEqualish(out, [2, 1]);
		});
		it("should return false on parallel lines", function() {
			assert.equal(Line2D.intersect(Vector2D.create(),
				[0, 0], [1, 1], [0, 1], [1, 2]), false);
		});
	});
	
	// .intersectAxisX()
	describe(".intersectAxisX()", function() {
		it("should find the intersecting point", function() {
			assertEqualish(Line2D.intersectAxisX(Vector2D.create(),
				[1, 2], [2, 4], 3), [1.5, 3]);
		});
		it("should return false on parallel lines", function() {
			assert.equal(Line2D.intersectAxisX(Vector2D.create(),
				[1, 1], [2, 1], 5), false);
		});
	});
	
	// .intersectAxisY()
	describe(".intersectAxisY()", function() {
		it("should find the intersecting point", function() {
			assertEqualish(Line2D.intersectAxisY(Vector2D.create(),
				[1, 2], [2, 4], 3), [3, 6]);
		});
		it("should return false on parallel lines", function() {
			assert.equal(Line2D.intersectAxisY(Vector2D.create(), 
				[1, 1], [1, 2], 5), false);
		});
	});
	
	// .segmentIntersect()
	describe(".segmentIntersect()", function() {
		it("should intersect with segments", function() {
			var out = Vector2D.create();
			var result = Line2D.segmentIntersect(out, [1, 1], [5, 5], [1, 5], [5, 1]);
			if (!result) throw "returned false";
			assertEqualish(out, [3, 3]);
		});
		it("should not intersect with parallels", function() {
			var out = Vector2D.create();
			assert.equal(Line2D.segmentIntersect(out, [1, 1], [1, 3], [4, 1], [4, 3]), false);
		});
		it("should not intersect outside bounds", function() {
			var out = Vector2D.create();
			assert.equal(Line2D.segmentIntersect(out, [1, 1], [5, 5], [1, 5], [2, 4]), false);
		});
	});
	
	// .perpendicular()
	describe(".perpendicular()", function() {
		it("should find the perpendicular point", function() {
			var out = Vector2D.create();
			var result = Line2D.perpendicular([1, 1], [5, 5], [1, 5], out);
			assert.equal(Line2D.containsVertex([1, 5], out, [5, 1]), true);
		});
		it("should find the perpendicular point to X axis", function() {
			var out = Vector2D.create();
			var result = Line2D.perpendicular([1, 5], [5, 5], [3, 2], out);
			assert.equal(out[0], 3);
		});
		it("should find the perpendicular point to Y axis", function() {
			var out = Vector2D.create();
			var result = Line2D.perpendicular([1, 1], [1, 5], [3, 2], out);
			assert.equal(out[1], 2);
		});
	});
	
};