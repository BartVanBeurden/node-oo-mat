# oo-mat

2D Vector / 3D Matrix library

## Installation

    npm install oo-mat
	
## Vector2D

[Source](https://github.com/BartVanBeurden/node-oo-mat/blob/master/lib/Vector2D.js)

### Memory Layout

[0, 1] == [x, y]

### Functions

Vector2D.create()  
Vector2D.setVector(out, v)  
Vector2D.setScalar(out, x, y)  
Vector2D.add(out, v, w)  
Vector2D.subtract(out, v, w)  
Vector2D.multiplyScalar(out, v, c)  
Vector2D.multiplyVector(out, v, w) == Vector2D.dot(out, v, w)  
Vector2D.length2(v) => Number  
Vector2D.length(v) => Number  
Vector2D.distance2(v, w) => Number  
Vector2D.distance(v, w) => Number  
Vector2D.normalize(out, v)
Vector2D.offsetTowardsAngle(out, vertex, distance, angle)
Vector2D.offsetTowardsVertex(out, vertex, distance, target)

## Matrix3D

[Source](https://github.com/BartVanBeurden/node-oo-mat/blob/master/lib/Matrix3D.js)

### Memory Layout

[0, 1, 2]    [a, b, c]
[3, 4, 5] == [d, e, f]
[6, 7, 8]    [g, h, i]

### Functions

Matrix3D.create()  
Matrix3D.createIdentity()  
Matrix3D.setMatrix(out, m)  
Matrix3D.setScalar(out, a, b, c, d, e, f, g, h, i)  
Matrix3D.setZero(out)  
Matrix3D.setIdentity(out)  
Matrix3D.add(out, m, n)  
Matrix3D.subtract(out, m, n)  
Matrix3D.multiplyScalar(out, m, c)  
Matrix3D.multiplyVector2D(out, m, v)  
Matrix3D.multiplyVector3D(out, m, v)  
Matrix3D.multiplyMatrix3D(out, m, v)  
Matrix3D.setTranslation(out, x, y)  
Matrix3D.setTranslationVector(out, v)  
Matrix3D.translate(out, m, x, y)  
Matrix3D.setRotation(out, angle)  
Matrix3D.rotate(out, m, angle)  
Matrix3D.setScaling(out, x, y)  
Matrix3D.scale(out, m, x, y)  

## Line2D

[Source](https://github.com/BartVanBeurden/node-oo-mat/blob/master/lib/Line2D.js)

### Functions

Line2D.containsVertex(v, w, target) => Boolean  
Line2D.intersect(out, v1, w1, v2, w2) => Boolean  
Line2D.intersectAxisX(out, v, w, y) => Boolean  
Line2D.intersectAxisY(out, v, w, x) => Boolean  
Line2D.perpendicular(v1, w1, v2, out)  
Line2D.distance2ToVertex(v, w, target) => Number  
Line2D.distanceToVertex(v, w, target) => Number  
Line2D.segmentLength(v, w) => Number  
Line2D.segmentContainsVertex(v, w, target) => Boolean  
Line2D.segmentIntersect(out, v1, w1, v2, w2) => Boolean  
Line2D.segmentDistance2ToVertex(v, w, target) => Number  
Line2D.segmentDistanceToVertex(v, w, target) => Number  
