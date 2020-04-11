var Vector2D = /** @class */ (function () {
    function Vector2D(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector2D.random = function (randomNumberGenerator) {
        // static function for a random vector
        if (randomNumberGenerator) {
            return new Vector2D(randomNumberGenerator(), randomNumberGenerator());
        }
        return new Vector2D(Math.random(), Math.random());
    };
    Vector2D.prototype.set = function (v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    };
    Vector2D.prototype.add = function (v) {
        // add 'v' to this vector
        this.x += v.x;
        this.y += v.y;
        return this;
    };
    Vector2D.prototype.sub = function (v) {
        // substract 'v' from this vector (direction from this to 'v' vector)
        this.x -= v.x;
        this.y -= v.y;
        return this;
    };
    Vector2D.prototype.mult = function (factor) {
        // multiply this vector by constant 'factor'
        this.x *= factor;
        this.y *= factor;
        return this;
    };
    Vector2D.prototype.div = function (factor) {
        // divide this vector by constant 'factor'
        if (!factor) {
            return new Vector2D(0, 0);
        }
        this.x /= factor;
        this.y /= factor;
        return this;
    };
    Vector2D.prototype.normalize = function () {
        // convert to unit vector, vector with length of 1 (distance between origin and this vector)
        // NOTE: unsafe normalize (if length is zero)!
        return this.div(this.length());
    };
    Vector2D.prototype.length = function () {
        // lenght of this vector (Pythagorean theorem)
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    Vector2D.prototype.dot = function (v) {
        // dot product between this and 'v' vector
        return this.x * v.x + this.y * v.y;
    };
    Vector2D.prototype.negate = function () {
        // opposite from this vector
        return new Vector2D(-this.x, -this.y);
    };
    return Vector2D;
}());
export { Vector2D };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVjdG9yMmQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wYW5kZW1pYy1zaW11bGF0b3ItbGliLyIsInNvdXJjZXMiOlsibGliL21vZGVscy92ZWN0b3IyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNFLGtCQUFtQixDQUFTLEVBQVMsQ0FBUztRQUEzQixNQUFDLEdBQUQsQ0FBQyxDQUFRO1FBQVMsTUFBQyxHQUFELENBQUMsQ0FBUTtJQUM5QyxDQUFDO0lBRU0sZUFBTSxHQUFiLFVBQWMscUJBQWlEO1FBQzdELHNDQUFzQztRQUN0QyxJQUFJLHFCQUFxQixFQUFFO1lBQ3pCLE9BQU8sSUFBSSxRQUFRLENBQUMscUJBQXFCLEVBQUUsRUFBRSxxQkFBcUIsRUFBRSxDQUFDLENBQUM7U0FDdkU7UUFDRCxPQUFPLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsc0JBQUcsR0FBSCxVQUFJLENBQVc7UUFDYixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDYixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxzQkFBRyxHQUFILFVBQUksQ0FBVztRQUNiLHlCQUF5QjtRQUN6QixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZCxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxzQkFBRyxHQUFILFVBQUksQ0FBVztRQUNiLHFFQUFxRTtRQUNyRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZCxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCx1QkFBSSxHQUFKLFVBQUssTUFBYztRQUNqQiw0Q0FBNEM7UUFDNUMsSUFBSSxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUM7UUFDakIsSUFBSSxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUM7UUFDakIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsc0JBQUcsR0FBSCxVQUFJLE1BQWM7UUFDaEIsMENBQTBDO1FBQzFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxPQUFPLElBQUksUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMzQjtRQUNELElBQUksQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDO1FBQ2pCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELDRCQUFTLEdBQVQ7UUFDRSw0RkFBNEY7UUFDNUYsOENBQThDO1FBQzlDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQseUJBQU0sR0FBTjtRQUNFLDhDQUE4QztRQUM5QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxzQkFBRyxHQUFILFVBQUksQ0FBVztRQUNiLDBDQUEwQztRQUMxQyxPQUFPLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELHlCQUFNLEdBQU47UUFDRSw0QkFBNEI7UUFDNUIsT0FBTyxJQUFJLFFBQVEsQ0FDakIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUNQLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FDUixDQUFDO0lBQ0osQ0FBQztJQUNILGVBQUM7QUFBRCxDQUFDLEFBeEVELElBd0VDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFZlY3RvcjJEIHtcbiAgY29uc3RydWN0b3IocHVibGljIHg6IG51bWJlciwgcHVibGljIHk6IG51bWJlcikge1xuICB9XG5cbiAgc3RhdGljIHJhbmRvbShyYW5kb21OdW1iZXJHZW5lcmF0b3I6ICgoKSA9PiBudW1iZXIpIHwgdW5kZWZpbmVkKTogVmVjdG9yMkQge1xuICAgIC8vIHN0YXRpYyBmdW5jdGlvbiBmb3IgYSByYW5kb20gdmVjdG9yXG4gICAgaWYgKHJhbmRvbU51bWJlckdlbmVyYXRvcikge1xuICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyRChyYW5kb21OdW1iZXJHZW5lcmF0b3IoKSwgcmFuZG9tTnVtYmVyR2VuZXJhdG9yKCkpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFZlY3RvcjJEKE1hdGgucmFuZG9tKCksIE1hdGgucmFuZG9tKCkpO1xuICB9XG5cbiAgc2V0KHY6IFZlY3RvcjJEKTogVmVjdG9yMkQge1xuICAgIHRoaXMueCA9IHYueDtcbiAgICB0aGlzLnkgPSB2Lnk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBhZGQodjogVmVjdG9yMkQpOiBWZWN0b3IyRCB7XG4gICAgLy8gYWRkICd2JyB0byB0aGlzIHZlY3RvclxuICAgIHRoaXMueCArPSB2Lng7XG4gICAgdGhpcy55ICs9IHYueTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHN1Yih2OiBWZWN0b3IyRCk6IFZlY3RvcjJEIHtcbiAgICAvLyBzdWJzdHJhY3QgJ3YnIGZyb20gdGhpcyB2ZWN0b3IgKGRpcmVjdGlvbiBmcm9tIHRoaXMgdG8gJ3YnIHZlY3RvcilcbiAgICB0aGlzLnggLT0gdi54O1xuICAgIHRoaXMueSAtPSB2Lnk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBtdWx0KGZhY3RvcjogbnVtYmVyKTogVmVjdG9yMkQge1xuICAgIC8vIG11bHRpcGx5IHRoaXMgdmVjdG9yIGJ5IGNvbnN0YW50ICdmYWN0b3InXG4gICAgdGhpcy54ICo9IGZhY3RvcjtcbiAgICB0aGlzLnkgKj0gZmFjdG9yO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZGl2KGZhY3RvcjogbnVtYmVyKTogVmVjdG9yMkQge1xuICAgIC8vIGRpdmlkZSB0aGlzIHZlY3RvciBieSBjb25zdGFudCAnZmFjdG9yJ1xuICAgIGlmICghZmFjdG9yKSB7XG4gICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKDAsIDApO1xuICAgIH1cbiAgICB0aGlzLnggLz0gZmFjdG9yO1xuICAgIHRoaXMueSAvPSBmYWN0b3I7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBub3JtYWxpemUoKTogVmVjdG9yMkQge1xuICAgIC8vIGNvbnZlcnQgdG8gdW5pdCB2ZWN0b3IsIHZlY3RvciB3aXRoIGxlbmd0aCBvZiAxIChkaXN0YW5jZSBiZXR3ZWVuIG9yaWdpbiBhbmQgdGhpcyB2ZWN0b3IpXG4gICAgLy8gTk9URTogdW5zYWZlIG5vcm1hbGl6ZSAoaWYgbGVuZ3RoIGlzIHplcm8pIVxuICAgIHJldHVybiB0aGlzLmRpdih0aGlzLmxlbmd0aCgpKTtcbiAgfVxuXG4gIGxlbmd0aCgpOiBudW1iZXIge1xuICAgIC8vIGxlbmdodCBvZiB0aGlzIHZlY3RvciAoUHl0aGFnb3JlYW4gdGhlb3JlbSlcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueSk7XG4gIH1cblxuICBkb3QodjogVmVjdG9yMkQpOiBudW1iZXIge1xuICAgIC8vIGRvdCBwcm9kdWN0IGJldHdlZW4gdGhpcyBhbmQgJ3YnIHZlY3RvclxuICAgIHJldHVybiB0aGlzLnggKiB2LnggKyB0aGlzLnkgKiB2Lnk7XG4gIH1cblxuICBuZWdhdGUoKTogVmVjdG9yMkQge1xuICAgIC8vIG9wcG9zaXRlIGZyb20gdGhpcyB2ZWN0b3JcbiAgICByZXR1cm4gbmV3IFZlY3RvcjJEKFxuICAgICAgLXRoaXMueCxcbiAgICAgIC10aGlzLnlcbiAgICApO1xuICB9XG59XG4iXX0=