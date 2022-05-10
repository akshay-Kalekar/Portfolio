(() => {
  "use strict";
  const t = 100,
    e = 1e3,
    n = 1001,
    i = 1002,
    r = 1003,
    s = 1006,
    o = 1008,
    a = 1012,
    l = 1014,
    c = 1015,
    h = 1016,
    u = 1020,
    d = 1022,
    p = 1023,
    f = 1026,
    m = 1027,
    g = 2300,
    v = 2301,
    _ = 2302,
    y = 2400,
    x = 2401,
    b = 2402,
    w = 3e3,
    M = 7680,
    S = 35044,
    E = 35048,
    T = "300 es";
  function A() {}
  Object.assign(A.prototype, {
    addEventListener: function (t, e) {
      void 0 === this._listeners && (this._listeners = {});
      const n = this._listeners;
      void 0 === n[t] && (n[t] = []), -1 === n[t].indexOf(e) && n[t].push(e);
    },
    hasEventListener: function (t, e) {
      if (void 0 === this._listeners) return !1;
      const n = this._listeners;
      return void 0 !== n[t] && -1 !== n[t].indexOf(e);
    },
    removeEventListener: function (t, e) {
      if (void 0 === this._listeners) return;
      const n = this._listeners[t];
      if (void 0 !== n) {
        const t = n.indexOf(e);
        -1 !== t && n.splice(t, 1);
      }
    },
    dispatchEvent: function (t) {
      if (void 0 === this._listeners) return;
      const e = this._listeners[t.type];
      if (void 0 !== e) {
        t.target = this;
        const n = e.slice(0);
        for (let e = 0, i = n.length; e < i; e++) n[e].call(this, t);
      }
    },
  });
  const L = [];
  for (let t = 0; t < 256; t++) L[t] = (t < 16 ? "0" : "") + t.toString(16);
  let C = 1234567;
  const R = {
    DEG2RAD: Math.PI / 180,
    RAD2DEG: 180 / Math.PI,
    generateUUID: function () {
      const t = (4294967295 * Math.random()) | 0,
        e = (4294967295 * Math.random()) | 0,
        n = (4294967295 * Math.random()) | 0,
        i = (4294967295 * Math.random()) | 0;
      return (
        L[255 & t] +
        L[(t >> 8) & 255] +
        L[(t >> 16) & 255] +
        L[(t >> 24) & 255] +
        "-" +
        L[255 & e] +
        L[(e >> 8) & 255] +
        "-" +
        L[((e >> 16) & 15) | 64] +
        L[(e >> 24) & 255] +
        "-" +
        L[(63 & n) | 128] +
        L[(n >> 8) & 255] +
        "-" +
        L[(n >> 16) & 255] +
        L[(n >> 24) & 255] +
        L[255 & i] +
        L[(i >> 8) & 255] +
        L[(i >> 16) & 255] +
        L[(i >> 24) & 255]
      ).toUpperCase();
    },
    clamp: function (t, e, n) {
      return Math.max(e, Math.min(n, t));
    },
    euclideanModulo: function (t, e) {
      return ((t % e) + e) % e;
    },
    mapLinear: function (t, e, n, i, r) {
      return i + ((t - e) * (r - i)) / (n - e);
    },
    lerp: function (t, e, n) {
      return (1 - n) * t + n * e;
    },
    damp: function (t, e, n, i) {
      return R.lerp(t, e, 1 - Math.exp(-n * i));
    },
    pingpong: function (t, e = 1) {
      return e - Math.abs(R.euclideanModulo(t, 2 * e) - e);
    },
    smoothstep: function (t, e, n) {
      return t <= e
        ? 0
        : t >= n
        ? 1
        : (t = (t - e) / (n - e)) * t * (3 - 2 * t);
    },
    smootherstep: function (t, e, n) {
      return t <= e
        ? 0
        : t >= n
        ? 1
        : (t = (t - e) / (n - e)) * t * t * (t * (6 * t - 15) + 10);
    },
    randInt: function (t, e) {
      return t + Math.floor(Math.random() * (e - t + 1));
    },
    randFloat: function (t, e) {
      return t + Math.random() * (e - t);
    },
    randFloatSpread: function (t) {
      return t * (0.5 - Math.random());
    },
    seededRandom: function (t) {
      return (
        void 0 !== t && (C = t % 2147483647),
        (C = (16807 * C) % 2147483647),
        (C - 1) / 2147483646
      );
    },
    degToRad: function (t) {
      return t * R.DEG2RAD;
    },
    radToDeg: function (t) {
      return t * R.RAD2DEG;
    },
    isPowerOfTwo: function (t) {
      return 0 == (t & (t - 1)) && 0 !== t;
    },
    ceilPowerOfTwo: function (t) {
      return Math.pow(2, Math.ceil(Math.log(t) / Math.LN2));
    },
    floorPowerOfTwo: function (t) {
      return Math.pow(2, Math.floor(Math.log(t) / Math.LN2));
    },
    setQuaternionFromProperEuler: function (t, e, n, i, r) {
      const s = Math.cos,
        o = Math.sin,
        a = s(n / 2),
        l = o(n / 2),
        c = s((e + i) / 2),
        h = o((e + i) / 2),
        u = s((e - i) / 2),
        d = o((e - i) / 2),
        p = s((i - e) / 2),
        f = o((i - e) / 2);
      switch (r) {
        case "XYX":
          t.set(a * h, l * u, l * d, a * c);
          break;
        case "YZY":
          t.set(l * d, a * h, l * u, a * c);
          break;
        case "ZXZ":
          t.set(l * u, l * d, a * h, a * c);
          break;
        case "XZX":
          t.set(a * h, l * f, l * p, a * c);
          break;
        case "YXY":
          t.set(l * p, a * h, l * f, a * c);
          break;
        case "ZYZ":
          t.set(l * f, l * p, a * h, a * c);
          break;
        default:
          console.warn(
            "THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " +
              r
          );
      }
    },
  };
  class P {
    constructor(t = 0, e = 0) {
      (this.x = t), (this.y = e);
    }
    get width() {
      return this.x;
    }
    set width(t) {
      this.x = t;
    }
    get height() {
      return this.y;
    }
    set height(t) {
      this.y = t;
    }
    set(t, e) {
      return (this.x = t), (this.y = e), this;
    }
    setScalar(t) {
      return (this.x = t), (this.y = t), this;
    }
    setX(t) {
      return (this.x = t), this;
    }
    setY(t) {
      return (this.y = t), this;
    }
    setComponent(t, e) {
      switch (t) {
        case 0:
          this.x = e;
          break;
        case 1:
          this.y = e;
          break;
        default:
          throw new Error("index is out of range: " + t);
      }
      return this;
    }
    getComponent(t) {
      switch (t) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        default:
          throw new Error("index is out of range: " + t);
      }
    }
    clone() {
      return new this.constructor(this.x, this.y);
    }
    copy(t) {
      return (this.x = t.x), (this.y = t.y), this;
    }
    add(t, e) {
      return void 0 !== e
        ? (console.warn(
            "THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."
          ),
          this.addVectors(t, e))
        : ((this.x += t.x), (this.y += t.y), this);
    }
    addScalar(t) {
      return (this.x += t), (this.y += t), this;
    }
    addVectors(t, e) {
      return (this.x = t.x + e.x), (this.y = t.y + e.y), this;
    }
    addScaledVector(t, e) {
      return (this.x += t.x * e), (this.y += t.y * e), this;
    }
    sub(t, e) {
      return void 0 !== e
        ? (console.warn(
            "THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."
          ),
          this.subVectors(t, e))
        : ((this.x -= t.x), (this.y -= t.y), this);
    }
    subScalar(t) {
      return (this.x -= t), (this.y -= t), this;
    }
    subVectors(t, e) {
      return (this.x = t.x - e.x), (this.y = t.y - e.y), this;
    }
    multiply(t) {
      return (this.x *= t.x), (this.y *= t.y), this;
    }
    multiplyScalar(t) {
      return (this.x *= t), (this.y *= t), this;
    }
    divide(t) {
      return (this.x /= t.x), (this.y /= t.y), this;
    }
    divideScalar(t) {
      return this.multiplyScalar(1 / t);
    }
    applyMatrix3(t) {
      const e = this.x,
        n = this.y,
        i = t.elements;
      return (
        (this.x = i[0] * e + i[3] * n + i[6]),
        (this.y = i[1] * e + i[4] * n + i[7]),
        this
      );
    }
    min(t) {
      return (
        (this.x = Math.min(this.x, t.x)), (this.y = Math.min(this.y, t.y)), this
      );
    }
    max(t) {
      return (
        (this.x = Math.max(this.x, t.x)), (this.y = Math.max(this.y, t.y)), this
      );
    }
    clamp(t, e) {
      return (
        (this.x = Math.max(t.x, Math.min(e.x, this.x))),
        (this.y = Math.max(t.y, Math.min(e.y, this.y))),
        this
      );
    }
    clampScalar(t, e) {
      return (
        (this.x = Math.max(t, Math.min(e, this.x))),
        (this.y = Math.max(t, Math.min(e, this.y))),
        this
      );
    }
    clampLength(t, e) {
      const n = this.length();
      return this.divideScalar(n || 1).multiplyScalar(
        Math.max(t, Math.min(e, n))
      );
    }
    floor() {
      return (this.x = Math.floor(this.x)), (this.y = Math.floor(this.y)), this;
    }
    ceil() {
      return (this.x = Math.ceil(this.x)), (this.y = Math.ceil(this.y)), this;
    }
    round() {
      return (this.x = Math.round(this.x)), (this.y = Math.round(this.y)), this;
    }
    roundToZero() {
      return (
        (this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x)),
        (this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y)),
        this
      );
    }
    negate() {
      return (this.x = -this.x), (this.y = -this.y), this;
    }
    dot(t) {
      return this.x * t.x + this.y * t.y;
    }
    cross(t) {
      return this.x * t.y - this.y * t.x;
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y;
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y);
    }
    normalize() {
      return this.divideScalar(this.length() || 1);
    }
    angle() {
      return Math.atan2(-this.y, -this.x) + Math.PI;
    }
    distanceTo(t) {
      return Math.sqrt(this.distanceToSquared(t));
    }
    distanceToSquared(t) {
      const e = this.x - t.x,
        n = this.y - t.y;
      return e * e + n * n;
    }
    manhattanDistanceTo(t) {
      return Math.abs(this.x - t.x) + Math.abs(this.y - t.y);
    }
    setLength(t) {
      return this.normalize().multiplyScalar(t);
    }
    lerp(t, e) {
      return (
        (this.x += (t.x - this.x) * e), (this.y += (t.y - this.y) * e), this
      );
    }
    lerpVectors(t, e, n) {
      return (
        (this.x = t.x + (e.x - t.x) * n), (this.y = t.y + (e.y - t.y) * n), this
      );
    }
    equals(t) {
      return t.x === this.x && t.y === this.y;
    }
    fromArray(t, e = 0) {
      return (this.x = t[e]), (this.y = t[e + 1]), this;
    }
    toArray(t = [], e = 0) {
      return (t[e] = this.x), (t[e + 1] = this.y), t;
    }
    fromBufferAttribute(t, e, n) {
      return (
        void 0 !== n &&
          console.warn(
            "THREE.Vector2: offset has been removed from .fromBufferAttribute()."
          ),
        (this.x = t.getX(e)),
        (this.y = t.getY(e)),
        this
      );
    }
    rotateAround(t, e) {
      const n = Math.cos(e),
        i = Math.sin(e),
        r = this.x - t.x,
        s = this.y - t.y;
      return (
        (this.x = r * n - s * i + t.x), (this.y = r * i + s * n + t.y), this
      );
    }
    random() {
      return (this.x = Math.random()), (this.y = Math.random()), this;
    }
  }
  P.prototype.isVector2 = !0;
  class D {
    constructor() {
      (this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1]),
        arguments.length > 0 &&
          console.error(
            "THREE.Matrix3: the constructor no longer reads arguments. use .set() instead."
          );
    }
    set(t, e, n, i, r, s, o, a, l) {
      const c = this.elements;
      return (
        (c[0] = t),
        (c[1] = i),
        (c[2] = o),
        (c[3] = e),
        (c[4] = r),
        (c[5] = a),
        (c[6] = n),
        (c[7] = s),
        (c[8] = l),
        this
      );
    }
    identity() {
      return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
    }
    copy(t) {
      const e = this.elements,
        n = t.elements;
      return (
        (e[0] = n[0]),
        (e[1] = n[1]),
        (e[2] = n[2]),
        (e[3] = n[3]),
        (e[4] = n[4]),
        (e[5] = n[5]),
        (e[6] = n[6]),
        (e[7] = n[7]),
        (e[8] = n[8]),
        this
      );
    }
    extractBasis(t, e, n) {
      return (
        t.setFromMatrix3Column(this, 0),
        e.setFromMatrix3Column(this, 1),
        n.setFromMatrix3Column(this, 2),
        this
      );
    }
    setFromMatrix4(t) {
      const e = t.elements;
      return (
        this.set(e[0], e[4], e[8], e[1], e[5], e[9], e[2], e[6], e[10]), this
      );
    }
    multiply(t) {
      return this.multiplyMatrices(this, t);
    }
    premultiply(t) {
      return this.multiplyMatrices(t, this);
    }
    multiplyMatrices(t, e) {
      const n = t.elements,
        i = e.elements,
        r = this.elements,
        s = n[0],
        o = n[3],
        a = n[6],
        l = n[1],
        c = n[4],
        h = n[7],
        u = n[2],
        d = n[5],
        p = n[8],
        f = i[0],
        m = i[3],
        g = i[6],
        v = i[1],
        _ = i[4],
        y = i[7],
        x = i[2],
        b = i[5],
        w = i[8];
      return (
        (r[0] = s * f + o * v + a * x),
        (r[3] = s * m + o * _ + a * b),
        (r[6] = s * g + o * y + a * w),
        (r[1] = l * f + c * v + h * x),
        (r[4] = l * m + c * _ + h * b),
        (r[7] = l * g + c * y + h * w),
        (r[2] = u * f + d * v + p * x),
        (r[5] = u * m + d * _ + p * b),
        (r[8] = u * g + d * y + p * w),
        this
      );
    }
    multiplyScalar(t) {
      const e = this.elements;
      return (
        (e[0] *= t),
        (e[3] *= t),
        (e[6] *= t),
        (e[1] *= t),
        (e[4] *= t),
        (e[7] *= t),
        (e[2] *= t),
        (e[5] *= t),
        (e[8] *= t),
        this
      );
    }
    determinant() {
      const t = this.elements,
        e = t[0],
        n = t[1],
        i = t[2],
        r = t[3],
        s = t[4],
        o = t[5],
        a = t[6],
        l = t[7],
        c = t[8];
      return (
        e * s * c - e * o * l - n * r * c + n * o * a + i * r * l - i * s * a
      );
    }
    invert() {
      const t = this.elements,
        e = t[0],
        n = t[1],
        i = t[2],
        r = t[3],
        s = t[4],
        o = t[5],
        a = t[6],
        l = t[7],
        c = t[8],
        h = c * s - o * l,
        u = o * a - c * r,
        d = l * r - s * a,
        p = e * h + n * u + i * d;
      if (0 === p) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
      const f = 1 / p;
      return (
        (t[0] = h * f),
        (t[1] = (i * l - c * n) * f),
        (t[2] = (o * n - i * s) * f),
        (t[3] = u * f),
        (t[4] = (c * e - i * a) * f),
        (t[5] = (i * r - o * e) * f),
        (t[6] = d * f),
        (t[7] = (n * a - l * e) * f),
        (t[8] = (s * e - n * r) * f),
        this
      );
    }
    transpose() {
      let t;
      const e = this.elements;
      return (
        (t = e[1]),
        (e[1] = e[3]),
        (e[3] = t),
        (t = e[2]),
        (e[2] = e[6]),
        (e[6] = t),
        (t = e[5]),
        (e[5] = e[7]),
        (e[7] = t),
        this
      );
    }
    getNormalMatrix(t) {
      return this.setFromMatrix4(t).invert().transpose();
    }
    transposeIntoArray(t) {
      const e = this.elements;
      return (
        (t[0] = e[0]),
        (t[1] = e[3]),
        (t[2] = e[6]),
        (t[3] = e[1]),
        (t[4] = e[4]),
        (t[5] = e[7]),
        (t[6] = e[2]),
        (t[7] = e[5]),
        (t[8] = e[8]),
        this
      );
    }
    setUvTransform(t, e, n, i, r, s, o) {
      const a = Math.cos(r),
        l = Math.sin(r);
      return (
        this.set(
          n * a,
          n * l,
          -n * (a * s + l * o) + s + t,
          -i * l,
          i * a,
          -i * (-l * s + a * o) + o + e,
          0,
          0,
          1
        ),
        this
      );
    }
    scale(t, e) {
      const n = this.elements;
      return (
        (n[0] *= t),
        (n[3] *= t),
        (n[6] *= t),
        (n[1] *= e),
        (n[4] *= e),
        (n[7] *= e),
        this
      );
    }
    rotate(t) {
      const e = Math.cos(t),
        n = Math.sin(t),
        i = this.elements,
        r = i[0],
        s = i[3],
        o = i[6],
        a = i[1],
        l = i[4],
        c = i[7];
      return (
        (i[0] = e * r + n * a),
        (i[3] = e * s + n * l),
        (i[6] = e * o + n * c),
        (i[1] = -n * r + e * a),
        (i[4] = -n * s + e * l),
        (i[7] = -n * o + e * c),
        this
      );
    }
    translate(t, e) {
      const n = this.elements;
      return (
        (n[0] += t * n[2]),
        (n[3] += t * n[5]),
        (n[6] += t * n[8]),
        (n[1] += e * n[2]),
        (n[4] += e * n[5]),
        (n[7] += e * n[8]),
        this
      );
    }
    equals(t) {
      const e = this.elements,
        n = t.elements;
      for (let t = 0; t < 9; t++) if (e[t] !== n[t]) return !1;
      return !0;
    }
    fromArray(t, e = 0) {
      for (let n = 0; n < 9; n++) this.elements[n] = t[n + e];
      return this;
    }
    toArray(t = [], e = 0) {
      const n = this.elements;
      return (
        (t[e] = n[0]),
        (t[e + 1] = n[1]),
        (t[e + 2] = n[2]),
        (t[e + 3] = n[3]),
        (t[e + 4] = n[4]),
        (t[e + 5] = n[5]),
        (t[e + 6] = n[6]),
        (t[e + 7] = n[7]),
        (t[e + 8] = n[8]),
        t
      );
    }
    clone() {
      return new this.constructor().fromArray(this.elements);
    }
  }
  let I;
  D.prototype.isMatrix3 = !0;
  const N = {
    getDataURL: function (t) {
      if (/^data:/i.test(t.src)) return t.src;
      if ("undefined" == typeof HTMLCanvasElement) return t.src;
      let e;
      if (t instanceof HTMLCanvasElement) e = t;
      else {
        void 0 === I &&
          (I = document.createElementNS(
            "http://www.w3.org/1999/xhtml",
            "canvas"
          )),
          (I.width = t.width),
          (I.height = t.height);
        const n = I.getContext("2d");
        t instanceof ImageData
          ? n.putImageData(t, 0, 0)
          : n.drawImage(t, 0, 0, t.width, t.height),
          (e = I);
      }
      return e.width > 2048 || e.height > 2048
        ? e.toDataURL("image/jpeg", 0.6)
        : e.toDataURL("image/png");
    },
  };
  let O = 0;
  class z extends A {
    constructor(
      t = z.DEFAULT_IMAGE,
      e = z.DEFAULT_MAPPING,
      n = 1001,
      i = 1001,
      r = 1006,
      s = 1008,
      o = 1023,
      a = 1009,
      l = 1,
      c = 3e3
    ) {
      super(),
        Object.defineProperty(this, "id", { value: O++ }),
        (this.uuid = R.generateUUID()),
        (this.name = ""),
        (this.image = t),
        (this.mipmaps = []),
        (this.mapping = e),
        (this.wrapS = n),
        (this.wrapT = i),
        (this.magFilter = r),
        (this.minFilter = s),
        (this.anisotropy = l),
        (this.format = o),
        (this.internalFormat = null),
        (this.type = a),
        (this.offset = new P(0, 0)),
        (this.repeat = new P(1, 1)),
        (this.center = new P(0, 0)),
        (this.rotation = 0),
        (this.matrixAutoUpdate = !0),
        (this.matrix = new D()),
        (this.generateMipmaps = !0),
        (this.premultiplyAlpha = !1),
        (this.flipY = !0),
        (this.unpackAlignment = 4),
        (this.encoding = c),
        (this.version = 0),
        (this.onUpdate = null);
    }
    updateMatrix() {
      this.matrix.setUvTransform(
        this.offset.x,
        this.offset.y,
        this.repeat.x,
        this.repeat.y,
        this.rotation,
        this.center.x,
        this.center.y
      );
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      return (
        (this.name = t.name),
        (this.image = t.image),
        (this.mipmaps = t.mipmaps.slice(0)),
        (this.mapping = t.mapping),
        (this.wrapS = t.wrapS),
        (this.wrapT = t.wrapT),
        (this.magFilter = t.magFilter),
        (this.minFilter = t.minFilter),
        (this.anisotropy = t.anisotropy),
        (this.format = t.format),
        (this.internalFormat = t.internalFormat),
        (this.type = t.type),
        this.offset.copy(t.offset),
        this.repeat.copy(t.repeat),
        this.center.copy(t.center),
        (this.rotation = t.rotation),
        (this.matrixAutoUpdate = t.matrixAutoUpdate),
        this.matrix.copy(t.matrix),
        (this.generateMipmaps = t.generateMipmaps),
        (this.premultiplyAlpha = t.premultiplyAlpha),
        (this.flipY = t.flipY),
        (this.unpackAlignment = t.unpackAlignment),
        (this.encoding = t.encoding),
        this
      );
    }
    toJSON(t) {
      const e = void 0 === t || "string" == typeof t;
      if (!e && void 0 !== t.textures[this.uuid]) return t.textures[this.uuid];
      const n = {
        metadata: {
          version: 4.5,
          type: "Texture",
          generator: "Texture.toJSON",
        },
        uuid: this.uuid,
        name: this.name,
        mapping: this.mapping,
        repeat: [this.repeat.x, this.repeat.y],
        offset: [this.offset.x, this.offset.y],
        center: [this.center.x, this.center.y],
        rotation: this.rotation,
        wrap: [this.wrapS, this.wrapT],
        format: this.format,
        type: this.type,
        encoding: this.encoding,
        minFilter: this.minFilter,
        magFilter: this.magFilter,
        anisotropy: this.anisotropy,
        flipY: this.flipY,
        premultiplyAlpha: this.premultiplyAlpha,
        unpackAlignment: this.unpackAlignment,
      };
      if (void 0 !== this.image) {
        const i = this.image;
        if (
          (void 0 === i.uuid && (i.uuid = R.generateUUID()),
          !e && void 0 === t.images[i.uuid])
        ) {
          let e;
          if (Array.isArray(i)) {
            e = [];
            for (let t = 0, n = i.length; t < n; t++)
              i[t].isDataTexture ? e.push(B(i[t].image)) : e.push(B(i[t]));
          } else e = B(i);
          t.images[i.uuid] = { uuid: i.uuid, url: e };
        }
        n.image = i.uuid;
      }
      return e || (t.textures[this.uuid] = n), n;
    }
    dispose() {
      this.dispatchEvent({ type: "dispose" });
    }
    transformUv(t) {
      if (300 !== this.mapping) return t;
      if ((t.applyMatrix3(this.matrix), t.x < 0 || t.x > 1))
        switch (this.wrapS) {
          case e:
            t.x = t.x - Math.floor(t.x);
            break;
          case n:
            t.x = t.x < 0 ? 0 : 1;
            break;
          case i:
            1 === Math.abs(Math.floor(t.x) % 2)
              ? (t.x = Math.ceil(t.x) - t.x)
              : (t.x = t.x - Math.floor(t.x));
        }
      if (t.y < 0 || t.y > 1)
        switch (this.wrapT) {
          case e:
            t.y = t.y - Math.floor(t.y);
            break;
          case n:
            t.y = t.y < 0 ? 0 : 1;
            break;
          case i:
            1 === Math.abs(Math.floor(t.y) % 2)
              ? (t.y = Math.ceil(t.y) - t.y)
              : (t.y = t.y - Math.floor(t.y));
        }
      return this.flipY && (t.y = 1 - t.y), t;
    }
    set needsUpdate(t) {
      !0 === t && this.version++;
    }
  }
  function B(t) {
    return ("undefined" != typeof HTMLImageElement &&
      t instanceof HTMLImageElement) ||
      ("undefined" != typeof HTMLCanvasElement &&
        t instanceof HTMLCanvasElement) ||
      ("undefined" != typeof ImageBitmap && t instanceof ImageBitmap)
      ? N.getDataURL(t)
      : t.data
      ? {
          data: Array.prototype.slice.call(t.data),
          width: t.width,
          height: t.height,
          type: t.data.constructor.name,
        }
      : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
  }
  (z.DEFAULT_IMAGE = void 0),
    (z.DEFAULT_MAPPING = 300),
    (z.prototype.isTexture = !0);
  class H {
    constructor(t = 0, e = 0, n = 0, i = 1) {
      (this.x = t), (this.y = e), (this.z = n), (this.w = i);
    }
    get width() {
      return this.z;
    }
    set width(t) {
      this.z = t;
    }
    get height() {
      return this.w;
    }
    set height(t) {
      this.w = t;
    }
    set(t, e, n, i) {
      return (this.x = t), (this.y = e), (this.z = n), (this.w = i), this;
    }
    setScalar(t) {
      return (this.x = t), (this.y = t), (this.z = t), (this.w = t), this;
    }
    setX(t) {
      return (this.x = t), this;
    }
    setY(t) {
      return (this.y = t), this;
    }
    setZ(t) {
      return (this.z = t), this;
    }
    setW(t) {
      return (this.w = t), this;
    }
    setComponent(t, e) {
      switch (t) {
        case 0:
          this.x = e;
          break;
        case 1:
          this.y = e;
          break;
        case 2:
          this.z = e;
          break;
        case 3:
          this.w = e;
          break;
        default:
          throw new Error("index is out of range: " + t);
      }
      return this;
    }
    getComponent(t) {
      switch (t) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        case 2:
          return this.z;
        case 3:
          return this.w;
        default:
          throw new Error("index is out of range: " + t);
      }
    }
    clone() {
      return new this.constructor(this.x, this.y, this.z, this.w);
    }
    copy(t) {
      return (
        (this.x = t.x),
        (this.y = t.y),
        (this.z = t.z),
        (this.w = void 0 !== t.w ? t.w : 1),
        this
      );
    }
    add(t, e) {
      return void 0 !== e
        ? (console.warn(
            "THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."
          ),
          this.addVectors(t, e))
        : ((this.x += t.x),
          (this.y += t.y),
          (this.z += t.z),
          (this.w += t.w),
          this);
    }
    addScalar(t) {
      return (this.x += t), (this.y += t), (this.z += t), (this.w += t), this;
    }
    addVectors(t, e) {
      return (
        (this.x = t.x + e.x),
        (this.y = t.y + e.y),
        (this.z = t.z + e.z),
        (this.w = t.w + e.w),
        this
      );
    }
    addScaledVector(t, e) {
      return (
        (this.x += t.x * e),
        (this.y += t.y * e),
        (this.z += t.z * e),
        (this.w += t.w * e),
        this
      );
    }
    sub(t, e) {
      return void 0 !== e
        ? (console.warn(
            "THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."
          ),
          this.subVectors(t, e))
        : ((this.x -= t.x),
          (this.y -= t.y),
          (this.z -= t.z),
          (this.w -= t.w),
          this);
    }
    subScalar(t) {
      return (this.x -= t), (this.y -= t), (this.z -= t), (this.w -= t), this;
    }
    subVectors(t, e) {
      return (
        (this.x = t.x - e.x),
        (this.y = t.y - e.y),
        (this.z = t.z - e.z),
        (this.w = t.w - e.w),
        this
      );
    }
    multiply(t) {
      return (
        (this.x *= t.x), (this.y *= t.y), (this.z *= t.z), (this.w *= t.w), this
      );
    }
    multiplyScalar(t) {
      return (this.x *= t), (this.y *= t), (this.z *= t), (this.w *= t), this;
    }
    applyMatrix4(t) {
      const e = this.x,
        n = this.y,
        i = this.z,
        r = this.w,
        s = t.elements;
      return (
        (this.x = s[0] * e + s[4] * n + s[8] * i + s[12] * r),
        (this.y = s[1] * e + s[5] * n + s[9] * i + s[13] * r),
        (this.z = s[2] * e + s[6] * n + s[10] * i + s[14] * r),
        (this.w = s[3] * e + s[7] * n + s[11] * i + s[15] * r),
        this
      );
    }
    divideScalar(t) {
      return this.multiplyScalar(1 / t);
    }
    setAxisAngleFromQuaternion(t) {
      this.w = 2 * Math.acos(t.w);
      const e = Math.sqrt(1 - t.w * t.w);
      return (
        e < 1e-4
          ? ((this.x = 1), (this.y = 0), (this.z = 0))
          : ((this.x = t.x / e), (this.y = t.y / e), (this.z = t.z / e)),
        this
      );
    }
    setAxisAngleFromRotationMatrix(t) {
      let e, n, i, r;
      const s = 0.01,
        o = 0.1,
        a = t.elements,
        l = a[0],
        c = a[4],
        h = a[8],
        u = a[1],
        d = a[5],
        p = a[9],
        f = a[2],
        m = a[6],
        g = a[10];
      if (Math.abs(c - u) < s && Math.abs(h - f) < s && Math.abs(p - m) < s) {
        if (
          Math.abs(c + u) < o &&
          Math.abs(h + f) < o &&
          Math.abs(p + m) < o &&
          Math.abs(l + d + g - 3) < o
        )
          return this.set(1, 0, 0, 0), this;
        e = Math.PI;
        const t = (l + 1) / 2,
          a = (d + 1) / 2,
          v = (g + 1) / 2,
          _ = (c + u) / 4,
          y = (h + f) / 4,
          x = (p + m) / 4;
        return (
          t > a && t > v
            ? t < s
              ? ((n = 0), (i = 0.707106781), (r = 0.707106781))
              : ((n = Math.sqrt(t)), (i = _ / n), (r = y / n))
            : a > v
            ? a < s
              ? ((n = 0.707106781), (i = 0), (r = 0.707106781))
              : ((i = Math.sqrt(a)), (n = _ / i), (r = x / i))
            : v < s
            ? ((n = 0.707106781), (i = 0.707106781), (r = 0))
            : ((r = Math.sqrt(v)), (n = y / r), (i = x / r)),
          this.set(n, i, r, e),
          this
        );
      }
      let v = Math.sqrt(
        (m - p) * (m - p) + (h - f) * (h - f) + (u - c) * (u - c)
      );
      return (
        Math.abs(v) < 0.001 && (v = 1),
        (this.x = (m - p) / v),
        (this.y = (h - f) / v),
        (this.z = (u - c) / v),
        (this.w = Math.acos((l + d + g - 1) / 2)),
        this
      );
    }
    min(t) {
      return (
        (this.x = Math.min(this.x, t.x)),
        (this.y = Math.min(this.y, t.y)),
        (this.z = Math.min(this.z, t.z)),
        (this.w = Math.min(this.w, t.w)),
        this
      );
    }
    max(t) {
      return (
        (this.x = Math.max(this.x, t.x)),
        (this.y = Math.max(this.y, t.y)),
        (this.z = Math.max(this.z, t.z)),
        (this.w = Math.max(this.w, t.w)),
        this
      );
    }
    clamp(t, e) {
      return (
        (this.x = Math.max(t.x, Math.min(e.x, this.x))),
        (this.y = Math.max(t.y, Math.min(e.y, this.y))),
        (this.z = Math.max(t.z, Math.min(e.z, this.z))),
        (this.w = Math.max(t.w, Math.min(e.w, this.w))),
        this
      );
    }
    clampScalar(t, e) {
      return (
        (this.x = Math.max(t, Math.min(e, this.x))),
        (this.y = Math.max(t, Math.min(e, this.y))),
        (this.z = Math.max(t, Math.min(e, this.z))),
        (this.w = Math.max(t, Math.min(e, this.w))),
        this
      );
    }
    clampLength(t, e) {
      const n = this.length();
      return this.divideScalar(n || 1).multiplyScalar(
        Math.max(t, Math.min(e, n))
      );
    }
    floor() {
      return (
        (this.x = Math.floor(this.x)),
        (this.y = Math.floor(this.y)),
        (this.z = Math.floor(this.z)),
        (this.w = Math.floor(this.w)),
        this
      );
    }
    ceil() {
      return (
        (this.x = Math.ceil(this.x)),
        (this.y = Math.ceil(this.y)),
        (this.z = Math.ceil(this.z)),
        (this.w = Math.ceil(this.w)),
        this
      );
    }
    round() {
      return (
        (this.x = Math.round(this.x)),
        (this.y = Math.round(this.y)),
        (this.z = Math.round(this.z)),
        (this.w = Math.round(this.w)),
        this
      );
    }
    roundToZero() {
      return (
        (this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x)),
        (this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y)),
        (this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z)),
        (this.w = this.w < 0 ? Math.ceil(this.w) : Math.floor(this.w)),
        this
      );
    }
    negate() {
      return (
        (this.x = -this.x),
        (this.y = -this.y),
        (this.z = -this.z),
        (this.w = -this.w),
        this
      );
    }
    dot(t) {
      return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w;
    }
    lengthSq() {
      return (
        this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
      );
    }
    length() {
      return Math.sqrt(
        this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
      );
    }
    manhattanLength() {
      return (
        Math.abs(this.x) +
        Math.abs(this.y) +
        Math.abs(this.z) +
        Math.abs(this.w)
      );
    }
    normalize() {
      return this.divideScalar(this.length() || 1);
    }
    setLength(t) {
      return this.normalize().multiplyScalar(t);
    }
    lerp(t, e) {
      return (
        (this.x += (t.x - this.x) * e),
        (this.y += (t.y - this.y) * e),
        (this.z += (t.z - this.z) * e),
        (this.w += (t.w - this.w) * e),
        this
      );
    }
    lerpVectors(t, e, n) {
      return (
        (this.x = t.x + (e.x - t.x) * n),
        (this.y = t.y + (e.y - t.y) * n),
        (this.z = t.z + (e.z - t.z) * n),
        (this.w = t.w + (e.w - t.w) * n),
        this
      );
    }
    equals(t) {
      return (
        t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w
      );
    }
    fromArray(t, e = 0) {
      return (
        (this.x = t[e]),
        (this.y = t[e + 1]),
        (this.z = t[e + 2]),
        (this.w = t[e + 3]),
        this
      );
    }
    toArray(t = [], e = 0) {
      return (
        (t[e] = this.x),
        (t[e + 1] = this.y),
        (t[e + 2] = this.z),
        (t[e + 3] = this.w),
        t
      );
    }
    fromBufferAttribute(t, e, n) {
      return (
        void 0 !== n &&
          console.warn(
            "THREE.Vector4: offset has been removed from .fromBufferAttribute()."
          ),
        (this.x = t.getX(e)),
        (this.y = t.getY(e)),
        (this.z = t.getZ(e)),
        (this.w = t.getW(e)),
        this
      );
    }
    random() {
      return (
        (this.x = Math.random()),
        (this.y = Math.random()),
        (this.z = Math.random()),
        (this.w = Math.random()),
        this
      );
    }
  }
  H.prototype.isVector4 = !0;
  class F extends A {
    constructor(t, e, n) {
      super(),
        (this.width = t),
        (this.height = e),
        (this.depth = 1),
        (this.scissor = new H(0, 0, t, e)),
        (this.scissorTest = !1),
        (this.viewport = new H(0, 0, t, e)),
        (n = n || {}),
        (this.texture = new z(
          void 0,
          n.mapping,
          n.wrapS,
          n.wrapT,
          n.magFilter,
          n.minFilter,
          n.format,
          n.type,
          n.anisotropy,
          n.encoding
        )),
        (this.texture.image = {}),
        (this.texture.image.width = t),
        (this.texture.image.height = e),
        (this.texture.image.depth = 1),
        (this.texture.generateMipmaps =
          void 0 !== n.generateMipmaps && n.generateMipmaps),
        (this.texture.minFilter = void 0 !== n.minFilter ? n.minFilter : s),
        (this.depthBuffer = void 0 === n.depthBuffer || n.depthBuffer),
        (this.stencilBuffer = void 0 !== n.stencilBuffer && n.stencilBuffer),
        (this.depthTexture = void 0 !== n.depthTexture ? n.depthTexture : null);
    }
    setTexture(t) {
      (t.image = { width: this.width, height: this.height, depth: this.depth }),
        (this.texture = t);
    }
    setSize(t, e, n = 1) {
      (this.width === t && this.height === e && this.depth === n) ||
        ((this.width = t),
        (this.height = e),
        (this.depth = n),
        (this.texture.image.width = t),
        (this.texture.image.height = e),
        (this.texture.image.depth = n),
        this.dispose()),
        this.viewport.set(0, 0, t, e),
        this.scissor.set(0, 0, t, e);
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      return (
        (this.width = t.width),
        (this.height = t.height),
        (this.depth = t.depth),
        this.viewport.copy(t.viewport),
        (this.texture = t.texture.clone()),
        (this.depthBuffer = t.depthBuffer),
        (this.stencilBuffer = t.stencilBuffer),
        (this.depthTexture = t.depthTexture),
        this
      );
    }
    dispose() {
      this.dispatchEvent({ type: "dispose" });
    }
  }
  (F.prototype.isWebGLRenderTarget = !0),
    (class extends F {
      constructor(t, e, n) {
        super(t, e, n), (this.samples = 4);
      }
      copy(t) {
        return super.copy.call(this, t), (this.samples = t.samples), this;
      }
    }.prototype.isWebGLMultisampleRenderTarget = !0);
  class U {
    constructor(t = 0, e = 0, n = 0, i = 1) {
      (this._x = t), (this._y = e), (this._z = n), (this._w = i);
    }
    static slerp(t, e, n, i) {
      return n.copy(t).slerp(e, i);
    }
    static slerpFlat(t, e, n, i, r, s, o) {
      let a = n[i + 0],
        l = n[i + 1],
        c = n[i + 2],
        h = n[i + 3];
      const u = r[s + 0],
        d = r[s + 1],
        p = r[s + 2],
        f = r[s + 3];
      if (0 === o)
        return (
          (t[e + 0] = a), (t[e + 1] = l), (t[e + 2] = c), void (t[e + 3] = h)
        );
      if (1 === o)
        return (
          (t[e + 0] = u), (t[e + 1] = d), (t[e + 2] = p), void (t[e + 3] = f)
        );
      if (h !== f || a !== u || l !== d || c !== p) {
        let t = 1 - o;
        const e = a * u + l * d + c * p + h * f,
          n = e >= 0 ? 1 : -1,
          i = 1 - e * e;
        if (i > Number.EPSILON) {
          const r = Math.sqrt(i),
            s = Math.atan2(r, e * n);
          (t = Math.sin(t * s) / r), (o = Math.sin(o * s) / r);
        }
        const r = o * n;
        if (
          ((a = a * t + u * r),
          (l = l * t + d * r),
          (c = c * t + p * r),
          (h = h * t + f * r),
          t === 1 - o)
        ) {
          const t = 1 / Math.sqrt(a * a + l * l + c * c + h * h);
          (a *= t), (l *= t), (c *= t), (h *= t);
        }
      }
      (t[e] = a), (t[e + 1] = l), (t[e + 2] = c), (t[e + 3] = h);
    }
    static multiplyQuaternionsFlat(t, e, n, i, r, s) {
      const o = n[i],
        a = n[i + 1],
        l = n[i + 2],
        c = n[i + 3],
        h = r[s],
        u = r[s + 1],
        d = r[s + 2],
        p = r[s + 3];
      return (
        (t[e] = o * p + c * h + a * d - l * u),
        (t[e + 1] = a * p + c * u + l * h - o * d),
        (t[e + 2] = l * p + c * d + o * u - a * h),
        (t[e + 3] = c * p - o * h - a * u - l * d),
        t
      );
    }
    get x() {
      return this._x;
    }
    set x(t) {
      (this._x = t), this._onChangeCallback();
    }
    get y() {
      return this._y;
    }
    set y(t) {
      (this._y = t), this._onChangeCallback();
    }
    get z() {
      return this._z;
    }
    set z(t) {
      (this._z = t), this._onChangeCallback();
    }
    get w() {
      return this._w;
    }
    set w(t) {
      (this._w = t), this._onChangeCallback();
    }
    set(t, e, n, i) {
      return (
        (this._x = t),
        (this._y = e),
        (this._z = n),
        (this._w = i),
        this._onChangeCallback(),
        this
      );
    }
    clone() {
      return new this.constructor(this._x, this._y, this._z, this._w);
    }
    copy(t) {
      return (
        (this._x = t.x),
        (this._y = t.y),
        (this._z = t.z),
        (this._w = t.w),
        this._onChangeCallback(),
        this
      );
    }
    setFromEuler(t, e) {
      if (!t || !t.isEuler)
        throw new Error(
          "THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order."
        );
      const n = t._x,
        i = t._y,
        r = t._z,
        s = t._order,
        o = Math.cos,
        a = Math.sin,
        l = o(n / 2),
        c = o(i / 2),
        h = o(r / 2),
        u = a(n / 2),
        d = a(i / 2),
        p = a(r / 2);
      switch (s) {
        case "XYZ":
          (this._x = u * c * h + l * d * p),
            (this._y = l * d * h - u * c * p),
            (this._z = l * c * p + u * d * h),
            (this._w = l * c * h - u * d * p);
          break;
        case "YXZ":
          (this._x = u * c * h + l * d * p),
            (this._y = l * d * h - u * c * p),
            (this._z = l * c * p - u * d * h),
            (this._w = l * c * h + u * d * p);
          break;
        case "ZXY":
          (this._x = u * c * h - l * d * p),
            (this._y = l * d * h + u * c * p),
            (this._z = l * c * p + u * d * h),
            (this._w = l * c * h - u * d * p);
          break;
        case "ZYX":
          (this._x = u * c * h - l * d * p),
            (this._y = l * d * h + u * c * p),
            (this._z = l * c * p - u * d * h),
            (this._w = l * c * h + u * d * p);
          break;
        case "YZX":
          (this._x = u * c * h + l * d * p),
            (this._y = l * d * h + u * c * p),
            (this._z = l * c * p - u * d * h),
            (this._w = l * c * h - u * d * p);
          break;
        case "XZY":
          (this._x = u * c * h - l * d * p),
            (this._y = l * d * h - u * c * p),
            (this._z = l * c * p + u * d * h),
            (this._w = l * c * h + u * d * p);
          break;
        default:
          console.warn(
            "THREE.Quaternion: .setFromEuler() encountered an unknown order: " +
              s
          );
      }
      return !1 !== e && this._onChangeCallback(), this;
    }
    setFromAxisAngle(t, e) {
      const n = e / 2,
        i = Math.sin(n);
      return (
        (this._x = t.x * i),
        (this._y = t.y * i),
        (this._z = t.z * i),
        (this._w = Math.cos(n)),
        this._onChangeCallback(),
        this
      );
    }
    setFromRotationMatrix(t) {
      const e = t.elements,
        n = e[0],
        i = e[4],
        r = e[8],
        s = e[1],
        o = e[5],
        a = e[9],
        l = e[2],
        c = e[6],
        h = e[10],
        u = n + o + h;
      if (u > 0) {
        const t = 0.5 / Math.sqrt(u + 1);
        (this._w = 0.25 / t),
          (this._x = (c - a) * t),
          (this._y = (r - l) * t),
          (this._z = (s - i) * t);
      } else if (n > o && n > h) {
        const t = 2 * Math.sqrt(1 + n - o - h);
        (this._w = (c - a) / t),
          (this._x = 0.25 * t),
          (this._y = (i + s) / t),
          (this._z = (r + l) / t);
      } else if (o > h) {
        const t = 2 * Math.sqrt(1 + o - n - h);
        (this._w = (r - l) / t),
          (this._x = (i + s) / t),
          (this._y = 0.25 * t),
          (this._z = (a + c) / t);
      } else {
        const t = 2 * Math.sqrt(1 + h - n - o);
        (this._w = (s - i) / t),
          (this._x = (r + l) / t),
          (this._y = (a + c) / t),
          (this._z = 0.25 * t);
      }
      return this._onChangeCallback(), this;
    }
    setFromUnitVectors(t, e) {
      let n = t.dot(e) + 1;
      return (
        n < 1e-6
          ? ((n = 0),
            Math.abs(t.x) > Math.abs(t.z)
              ? ((this._x = -t.y),
                (this._y = t.x),
                (this._z = 0),
                (this._w = n))
              : ((this._x = 0),
                (this._y = -t.z),
                (this._z = t.y),
                (this._w = n)))
          : ((this._x = t.y * e.z - t.z * e.y),
            (this._y = t.z * e.x - t.x * e.z),
            (this._z = t.x * e.y - t.y * e.x),
            (this._w = n)),
        this.normalize()
      );
    }
    angleTo(t) {
      return 2 * Math.acos(Math.abs(R.clamp(this.dot(t), -1, 1)));
    }
    rotateTowards(t, e) {
      const n = this.angleTo(t);
      if (0 === n) return this;
      const i = Math.min(1, e / n);
      return this.slerp(t, i), this;
    }
    identity() {
      return this.set(0, 0, 0, 1);
    }
    invert() {
      return this.conjugate();
    }
    conjugate() {
      return (
        (this._x *= -1),
        (this._y *= -1),
        (this._z *= -1),
        this._onChangeCallback(),
        this
      );
    }
    dot(t) {
      return this._x * t._x + this._y * t._y + this._z * t._z + this._w * t._w;
    }
    lengthSq() {
      return (
        this._x * this._x +
        this._y * this._y +
        this._z * this._z +
        this._w * this._w
      );
    }
    length() {
      return Math.sqrt(
        this._x * this._x +
          this._y * this._y +
          this._z * this._z +
          this._w * this._w
      );
    }
    normalize() {
      let t = this.length();
      return (
        0 === t
          ? ((this._x = 0), (this._y = 0), (this._z = 0), (this._w = 1))
          : ((t = 1 / t),
            (this._x = this._x * t),
            (this._y = this._y * t),
            (this._z = this._z * t),
            (this._w = this._w * t)),
        this._onChangeCallback(),
        this
      );
    }
    multiply(t, e) {
      return void 0 !== e
        ? (console.warn(
            "THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."
          ),
          this.multiplyQuaternions(t, e))
        : this.multiplyQuaternions(this, t);
    }
    premultiply(t) {
      return this.multiplyQuaternions(t, this);
    }
    multiplyQuaternions(t, e) {
      const n = t._x,
        i = t._y,
        r = t._z,
        s = t._w,
        o = e._x,
        a = e._y,
        l = e._z,
        c = e._w;
      return (
        (this._x = n * c + s * o + i * l - r * a),
        (this._y = i * c + s * a + r * o - n * l),
        (this._z = r * c + s * l + n * a - i * o),
        (this._w = s * c - n * o - i * a - r * l),
        this._onChangeCallback(),
        this
      );
    }
    slerp(t, e) {
      if (0 === e) return this;
      if (1 === e) return this.copy(t);
      const n = this._x,
        i = this._y,
        r = this._z,
        s = this._w;
      let o = s * t._w + n * t._x + i * t._y + r * t._z;
      if (
        (o < 0
          ? ((this._w = -t._w),
            (this._x = -t._x),
            (this._y = -t._y),
            (this._z = -t._z),
            (o = -o))
          : this.copy(t),
        o >= 1)
      )
        return (this._w = s), (this._x = n), (this._y = i), (this._z = r), this;
      const a = 1 - o * o;
      if (a <= Number.EPSILON) {
        const t = 1 - e;
        return (
          (this._w = t * s + e * this._w),
          (this._x = t * n + e * this._x),
          (this._y = t * i + e * this._y),
          (this._z = t * r + e * this._z),
          this.normalize(),
          this._onChangeCallback(),
          this
        );
      }
      const l = Math.sqrt(a),
        c = Math.atan2(l, o),
        h = Math.sin((1 - e) * c) / l,
        u = Math.sin(e * c) / l;
      return (
        (this._w = s * h + this._w * u),
        (this._x = n * h + this._x * u),
        (this._y = i * h + this._y * u),
        (this._z = r * h + this._z * u),
        this._onChangeCallback(),
        this
      );
    }
    equals(t) {
      return (
        t._x === this._x &&
        t._y === this._y &&
        t._z === this._z &&
        t._w === this._w
      );
    }
    fromArray(t, e = 0) {
      return (
        (this._x = t[e]),
        (this._y = t[e + 1]),
        (this._z = t[e + 2]),
        (this._w = t[e + 3]),
        this._onChangeCallback(),
        this
      );
    }
    toArray(t = [], e = 0) {
      return (
        (t[e] = this._x),
        (t[e + 1] = this._y),
        (t[e + 2] = this._z),
        (t[e + 3] = this._w),
        t
      );
    }
    fromBufferAttribute(t, e) {
      return (
        (this._x = t.getX(e)),
        (this._y = t.getY(e)),
        (this._z = t.getZ(e)),
        (this._w = t.getW(e)),
        this
      );
    }
    _onChange(t) {
      return (this._onChangeCallback = t), this;
    }
    _onChangeCallback() {}
  }
  U.prototype.isQuaternion = !0;
  class k {
    constructor(t = 0, e = 0, n = 0) {
      (this.x = t), (this.y = e), (this.z = n);
    }
    set(t, e, n) {
      return (
        void 0 === n && (n = this.z),
        (this.x = t),
        (this.y = e),
        (this.z = n),
        this
      );
    }
    setScalar(t) {
      return (this.x = t), (this.y = t), (this.z = t), this;
    }
    setX(t) {
      return (this.x = t), this;
    }
    setY(t) {
      return (this.y = t), this;
    }
    setZ(t) {
      return (this.z = t), this;
    }
    setComponent(t, e) {
      switch (t) {
        case 0:
          this.x = e;
          break;
        case 1:
          this.y = e;
          break;
        case 2:
          this.z = e;
          break;
        default:
          throw new Error("index is out of range: " + t);
      }
      return this;
    }
    getComponent(t) {
      switch (t) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        case 2:
          return this.z;
        default:
          throw new Error("index is out of range: " + t);
      }
    }
    clone() {
      return new this.constructor(this.x, this.y, this.z);
    }
    copy(t) {
      return (this.x = t.x), (this.y = t.y), (this.z = t.z), this;
    }
    add(t, e) {
      return void 0 !== e
        ? (console.warn(
            "THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."
          ),
          this.addVectors(t, e))
        : ((this.x += t.x), (this.y += t.y), (this.z += t.z), this);
    }
    addScalar(t) {
      return (this.x += t), (this.y += t), (this.z += t), this;
    }
    addVectors(t, e) {
      return (
        (this.x = t.x + e.x), (this.y = t.y + e.y), (this.z = t.z + e.z), this
      );
    }
    addScaledVector(t, e) {
      return (
        (this.x += t.x * e), (this.y += t.y * e), (this.z += t.z * e), this
      );
    }
    sub(t, e) {
      return void 0 !== e
        ? (console.warn(
            "THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."
          ),
          this.subVectors(t, e))
        : ((this.x -= t.x), (this.y -= t.y), (this.z -= t.z), this);
    }
    subScalar(t) {
      return (this.x -= t), (this.y -= t), (this.z -= t), this;
    }
    subVectors(t, e) {
      return (
        (this.x = t.x - e.x), (this.y = t.y - e.y), (this.z = t.z - e.z), this
      );
    }
    multiply(t, e) {
      return void 0 !== e
        ? (console.warn(
            "THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."
          ),
          this.multiplyVectors(t, e))
        : ((this.x *= t.x), (this.y *= t.y), (this.z *= t.z), this);
    }
    multiplyScalar(t) {
      return (this.x *= t), (this.y *= t), (this.z *= t), this;
    }
    multiplyVectors(t, e) {
      return (
        (this.x = t.x * e.x), (this.y = t.y * e.y), (this.z = t.z * e.z), this
      );
    }
    applyEuler(t) {
      return (
        (t && t.isEuler) ||
          console.error(
            "THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."
          ),
        this.applyQuaternion(V.setFromEuler(t))
      );
    }
    applyAxisAngle(t, e) {
      return this.applyQuaternion(V.setFromAxisAngle(t, e));
    }
    applyMatrix3(t) {
      const e = this.x,
        n = this.y,
        i = this.z,
        r = t.elements;
      return (
        (this.x = r[0] * e + r[3] * n + r[6] * i),
        (this.y = r[1] * e + r[4] * n + r[7] * i),
        (this.z = r[2] * e + r[5] * n + r[8] * i),
        this
      );
    }
    applyNormalMatrix(t) {
      return this.applyMatrix3(t).normalize();
    }
    applyMatrix4(t) {
      const e = this.x,
        n = this.y,
        i = this.z,
        r = t.elements,
        s = 1 / (r[3] * e + r[7] * n + r[11] * i + r[15]);
      return (
        (this.x = (r[0] * e + r[4] * n + r[8] * i + r[12]) * s),
        (this.y = (r[1] * e + r[5] * n + r[9] * i + r[13]) * s),
        (this.z = (r[2] * e + r[6] * n + r[10] * i + r[14]) * s),
        this
      );
    }
    applyQuaternion(t) {
      const e = this.x,
        n = this.y,
        i = this.z,
        r = t.x,
        s = t.y,
        o = t.z,
        a = t.w,
        l = a * e + s * i - o * n,
        c = a * n + o * e - r * i,
        h = a * i + r * n - s * e,
        u = -r * e - s * n - o * i;
      return (
        (this.x = l * a + u * -r + c * -o - h * -s),
        (this.y = c * a + u * -s + h * -r - l * -o),
        (this.z = h * a + u * -o + l * -s - c * -r),
        this
      );
    }
    project(t) {
      return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(
        t.projectionMatrix
      );
    }
    unproject(t) {
      return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(
        t.matrixWorld
      );
    }
    transformDirection(t) {
      const e = this.x,
        n = this.y,
        i = this.z,
        r = t.elements;
      return (
        (this.x = r[0] * e + r[4] * n + r[8] * i),
        (this.y = r[1] * e + r[5] * n + r[9] * i),
        (this.z = r[2] * e + r[6] * n + r[10] * i),
        this.normalize()
      );
    }
    divide(t) {
      return (this.x /= t.x), (this.y /= t.y), (this.z /= t.z), this;
    }
    divideScalar(t) {
      return this.multiplyScalar(1 / t);
    }
    min(t) {
      return (
        (this.x = Math.min(this.x, t.x)),
        (this.y = Math.min(this.y, t.y)),
        (this.z = Math.min(this.z, t.z)),
        this
      );
    }
    max(t) {
      return (
        (this.x = Math.max(this.x, t.x)),
        (this.y = Math.max(this.y, t.y)),
        (this.z = Math.max(this.z, t.z)),
        this
      );
    }
    clamp(t, e) {
      return (
        (this.x = Math.max(t.x, Math.min(e.x, this.x))),
        (this.y = Math.max(t.y, Math.min(e.y, this.y))),
        (this.z = Math.max(t.z, Math.min(e.z, this.z))),
        this
      );
    }
    clampScalar(t, e) {
      return (
        (this.x = Math.max(t, Math.min(e, this.x))),
        (this.y = Math.max(t, Math.min(e, this.y))),
        (this.z = Math.max(t, Math.min(e, this.z))),
        this
      );
    }
    clampLength(t, e) {
      const n = this.length();
      return this.divideScalar(n || 1).multiplyScalar(
        Math.max(t, Math.min(e, n))
      );
    }
    floor() {
      return (
        (this.x = Math.floor(this.x)),
        (this.y = Math.floor(this.y)),
        (this.z = Math.floor(this.z)),
        this
      );
    }
    ceil() {
      return (
        (this.x = Math.ceil(this.x)),
        (this.y = Math.ceil(this.y)),
        (this.z = Math.ceil(this.z)),
        this
      );
    }
    round() {
      return (
        (this.x = Math.round(this.x)),
        (this.y = Math.round(this.y)),
        (this.z = Math.round(this.z)),
        this
      );
    }
    roundToZero() {
      return (
        (this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x)),
        (this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y)),
        (this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z)),
        this
      );
    }
    negate() {
      return (this.x = -this.x), (this.y = -this.y), (this.z = -this.z), this;
    }
    dot(t) {
      return this.x * t.x + this.y * t.y + this.z * t.z;
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    }
    normalize() {
      return this.divideScalar(this.length() || 1);
    }
    setLength(t) {
      return this.normalize().multiplyScalar(t);
    }
    lerp(t, e) {
      return (
        (this.x += (t.x - this.x) * e),
        (this.y += (t.y - this.y) * e),
        (this.z += (t.z - this.z) * e),
        this
      );
    }
    lerpVectors(t, e, n) {
      return (
        (this.x = t.x + (e.x - t.x) * n),
        (this.y = t.y + (e.y - t.y) * n),
        (this.z = t.z + (e.z - t.z) * n),
        this
      );
    }
    cross(t, e) {
      return void 0 !== e
        ? (console.warn(
            "THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."
          ),
          this.crossVectors(t, e))
        : this.crossVectors(this, t);
    }
    crossVectors(t, e) {
      const n = t.x,
        i = t.y,
        r = t.z,
        s = e.x,
        o = e.y,
        a = e.z;
      return (
        (this.x = i * a - r * o),
        (this.y = r * s - n * a),
        (this.z = n * o - i * s),
        this
      );
    }
    projectOnVector(t) {
      const e = t.lengthSq();
      if (0 === e) return this.set(0, 0, 0);
      const n = t.dot(this) / e;
      return this.copy(t).multiplyScalar(n);
    }
    projectOnPlane(t) {
      return G.copy(this).projectOnVector(t), this.sub(G);
    }
    reflect(t) {
      return this.sub(G.copy(t).multiplyScalar(2 * this.dot(t)));
    }
    angleTo(t) {
      const e = Math.sqrt(this.lengthSq() * t.lengthSq());
      if (0 === e) return Math.PI / 2;
      const n = this.dot(t) / e;
      return Math.acos(R.clamp(n, -1, 1));
    }
    distanceTo(t) {
      return Math.sqrt(this.distanceToSquared(t));
    }
    distanceToSquared(t) {
      const e = this.x - t.x,
        n = this.y - t.y,
        i = this.z - t.z;
      return e * e + n * n + i * i;
    }
    manhattanDistanceTo(t) {
      return (
        Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z)
      );
    }
    setFromSpherical(t) {
      return this.setFromSphericalCoords(t.radius, t.phi, t.theta);
    }
    setFromSphericalCoords(t, e, n) {
      const i = Math.sin(e) * t;
      return (
        (this.x = i * Math.sin(n)),
        (this.y = Math.cos(e) * t),
        (this.z = i * Math.cos(n)),
        this
      );
    }
    setFromCylindrical(t) {
      return this.setFromCylindricalCoords(t.radius, t.theta, t.y);
    }
    setFromCylindricalCoords(t, e, n) {
      return (
        (this.x = t * Math.sin(e)),
        (this.y = n),
        (this.z = t * Math.cos(e)),
        this
      );
    }
    setFromMatrixPosition(t) {
      const e = t.elements;
      return (this.x = e[12]), (this.y = e[13]), (this.z = e[14]), this;
    }
    setFromMatrixScale(t) {
      const e = this.setFromMatrixColumn(t, 0).length(),
        n = this.setFromMatrixColumn(t, 1).length(),
        i = this.setFromMatrixColumn(t, 2).length();
      return (this.x = e), (this.y = n), (this.z = i), this;
    }
    setFromMatrixColumn(t, e) {
      return this.fromArray(t.elements, 4 * e);
    }
    setFromMatrix3Column(t, e) {
      return this.fromArray(t.elements, 3 * e);
    }
    equals(t) {
      return t.x === this.x && t.y === this.y && t.z === this.z;
    }
    fromArray(t, e = 0) {
      return (this.x = t[e]), (this.y = t[e + 1]), (this.z = t[e + 2]), this;
    }
    toArray(t = [], e = 0) {
      return (t[e] = this.x), (t[e + 1] = this.y), (t[e + 2] = this.z), t;
    }
    fromBufferAttribute(t, e, n) {
      return (
        void 0 !== n &&
          console.warn(
            "THREE.Vector3: offset has been removed from .fromBufferAttribute()."
          ),
        (this.x = t.getX(e)),
        (this.y = t.getY(e)),
        (this.z = t.getZ(e)),
        this
      );
    }
    random() {
      return (
        (this.x = Math.random()),
        (this.y = Math.random()),
        (this.z = Math.random()),
        this
      );
    }
  }
  k.prototype.isVector3 = !0;
  const G = new k(),
    V = new U();
  class W {
    constructor(
      t = new k(1 / 0, 1 / 0, 1 / 0),
      e = new k(-1 / 0, -1 / 0, -1 / 0)
    ) {
      (this.min = t), (this.max = e);
    }
    set(t, e) {
      return this.min.copy(t), this.max.copy(e), this;
    }
    setFromArray(t) {
      let e = 1 / 0,
        n = 1 / 0,
        i = 1 / 0,
        r = -1 / 0,
        s = -1 / 0,
        o = -1 / 0;
      for (let a = 0, l = t.length; a < l; a += 3) {
        const l = t[a],
          c = t[a + 1],
          h = t[a + 2];
        l < e && (e = l),
          c < n && (n = c),
          h < i && (i = h),
          l > r && (r = l),
          c > s && (s = c),
          h > o && (o = h);
      }
      return this.min.set(e, n, i), this.max.set(r, s, o), this;
    }
    setFromBufferAttribute(t) {
      let e = 1 / 0,
        n = 1 / 0,
        i = 1 / 0,
        r = -1 / 0,
        s = -1 / 0,
        o = -1 / 0;
      for (let a = 0, l = t.count; a < l; a++) {
        const l = t.getX(a),
          c = t.getY(a),
          h = t.getZ(a);
        l < e && (e = l),
          c < n && (n = c),
          h < i && (i = h),
          l > r && (r = l),
          c > s && (s = c),
          h > o && (o = h);
      }
      return this.min.set(e, n, i), this.max.set(r, s, o), this;
    }
    setFromPoints(t) {
      this.makeEmpty();
      for (let e = 0, n = t.length; e < n; e++) this.expandByPoint(t[e]);
      return this;
    }
    setFromCenterAndSize(t, e) {
      const n = q.copy(e).multiplyScalar(0.5);
      return this.min.copy(t).sub(n), this.max.copy(t).add(n), this;
    }
    setFromObject(t) {
      return this.makeEmpty(), this.expandByObject(t);
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      return this.min.copy(t.min), this.max.copy(t.max), this;
    }
    makeEmpty() {
      return (
        (this.min.x = this.min.y = this.min.z = 1 / 0),
        (this.max.x = this.max.y = this.max.z = -1 / 0),
        this
      );
    }
    isEmpty() {
      return (
        this.max.x < this.min.x ||
        this.max.y < this.min.y ||
        this.max.z < this.min.z
      );
    }
    getCenter(t) {
      return (
        void 0 === t &&
          (console.warn("THREE.Box3: .getCenter() target is now required"),
          (t = new k())),
        this.isEmpty()
          ? t.set(0, 0, 0)
          : t.addVectors(this.min, this.max).multiplyScalar(0.5)
      );
    }
    getSize(t) {
      return (
        void 0 === t &&
          (console.warn("THREE.Box3: .getSize() target is now required"),
          (t = new k())),
        this.isEmpty() ? t.set(0, 0, 0) : t.subVectors(this.max, this.min)
      );
    }
    expandByPoint(t) {
      return this.min.min(t), this.max.max(t), this;
    }
    expandByVector(t) {
      return this.min.sub(t), this.max.add(t), this;
    }
    expandByScalar(t) {
      return this.min.addScalar(-t), this.max.addScalar(t), this;
    }
    expandByObject(t) {
      t.updateWorldMatrix(!1, !1);
      const e = t.geometry;
      void 0 !== e &&
        (null === e.boundingBox && e.computeBoundingBox(),
        X.copy(e.boundingBox),
        X.applyMatrix4(t.matrixWorld),
        this.union(X));
      const n = t.children;
      for (let t = 0, e = n.length; t < e; t++) this.expandByObject(n[t]);
      return this;
    }
    containsPoint(t) {
      return !(
        t.x < this.min.x ||
        t.x > this.max.x ||
        t.y < this.min.y ||
        t.y > this.max.y ||
        t.z < this.min.z ||
        t.z > this.max.z
      );
    }
    containsBox(t) {
      return (
        this.min.x <= t.min.x &&
        t.max.x <= this.max.x &&
        this.min.y <= t.min.y &&
        t.max.y <= this.max.y &&
        this.min.z <= t.min.z &&
        t.max.z <= this.max.z
      );
    }
    getParameter(t, e) {
      return (
        void 0 === e &&
          (console.warn("THREE.Box3: .getParameter() target is now required"),
          (e = new k())),
        e.set(
          (t.x - this.min.x) / (this.max.x - this.min.x),
          (t.y - this.min.y) / (this.max.y - this.min.y),
          (t.z - this.min.z) / (this.max.z - this.min.z)
        )
      );
    }
    intersectsBox(t) {
      return !(
        t.max.x < this.min.x ||
        t.min.x > this.max.x ||
        t.max.y < this.min.y ||
        t.min.y > this.max.y ||
        t.max.z < this.min.z ||
        t.min.z > this.max.z
      );
    }
    intersectsSphere(t) {
      return (
        this.clampPoint(t.center, q),
        q.distanceToSquared(t.center) <= t.radius * t.radius
      );
    }
    intersectsPlane(t) {
      let e, n;
      return (
        t.normal.x > 0
          ? ((e = t.normal.x * this.min.x), (n = t.normal.x * this.max.x))
          : ((e = t.normal.x * this.max.x), (n = t.normal.x * this.min.x)),
        t.normal.y > 0
          ? ((e += t.normal.y * this.min.y), (n += t.normal.y * this.max.y))
          : ((e += t.normal.y * this.max.y), (n += t.normal.y * this.min.y)),
        t.normal.z > 0
          ? ((e += t.normal.z * this.min.z), (n += t.normal.z * this.max.z))
          : ((e += t.normal.z * this.max.z), (n += t.normal.z * this.min.z)),
        e <= -t.constant && n >= -t.constant
      );
    }
    intersectsTriangle(t) {
      if (this.isEmpty()) return !1;
      this.getCenter(tt),
        et.subVectors(this.max, tt),
        Y.subVectors(t.a, tt),
        J.subVectors(t.b, tt),
        Z.subVectors(t.c, tt),
        Q.subVectors(J, Y),
        K.subVectors(Z, J),
        $.subVectors(Y, Z);
      let e = [
        0,
        -Q.z,
        Q.y,
        0,
        -K.z,
        K.y,
        0,
        -$.z,
        $.y,
        Q.z,
        0,
        -Q.x,
        K.z,
        0,
        -K.x,
        $.z,
        0,
        -$.x,
        -Q.y,
        Q.x,
        0,
        -K.y,
        K.x,
        0,
        -$.y,
        $.x,
        0,
      ];
      return (
        !!rt(e, Y, J, Z, et) &&
        ((e = [1, 0, 0, 0, 1, 0, 0, 0, 1]),
        !!rt(e, Y, J, Z, et) &&
          (nt.crossVectors(Q, K), (e = [nt.x, nt.y, nt.z]), rt(e, Y, J, Z, et)))
      );
    }
    clampPoint(t, e) {
      return (
        void 0 === e &&
          (console.warn("THREE.Box3: .clampPoint() target is now required"),
          (e = new k())),
        e.copy(t).clamp(this.min, this.max)
      );
    }
    distanceToPoint(t) {
      return q.copy(t).clamp(this.min, this.max).sub(t).length();
    }
    getBoundingSphere(t) {
      return (
        void 0 === t &&
          console.error(
            "THREE.Box3: .getBoundingSphere() target is now required"
          ),
        this.getCenter(t.center),
        (t.radius = 0.5 * this.getSize(q).length()),
        t
      );
    }
    intersect(t) {
      return (
        this.min.max(t.min),
        this.max.min(t.max),
        this.isEmpty() && this.makeEmpty(),
        this
      );
    }
    union(t) {
      return this.min.min(t.min), this.max.max(t.max), this;
    }
    applyMatrix4(t) {
      return (
        this.isEmpty() ||
          (j[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t),
          j[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t),
          j[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t),
          j[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t),
          j[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t),
          j[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t),
          j[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t),
          j[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t),
          this.setFromPoints(j)),
        this
      );
    }
    translate(t) {
      return this.min.add(t), this.max.add(t), this;
    }
    equals(t) {
      return t.min.equals(this.min) && t.max.equals(this.max);
    }
  }
  W.prototype.isBox3 = !0;
  const j = [
      new k(),
      new k(),
      new k(),
      new k(),
      new k(),
      new k(),
      new k(),
      new k(),
    ],
    q = new k(),
    X = new W(),
    Y = new k(),
    J = new k(),
    Z = new k(),
    Q = new k(),
    K = new k(),
    $ = new k(),
    tt = new k(),
    et = new k(),
    nt = new k(),
    it = new k();
  function rt(t, e, n, i, r) {
    for (let s = 0, o = t.length - 3; s <= o; s += 3) {
      it.fromArray(t, s);
      const o =
          r.x * Math.abs(it.x) + r.y * Math.abs(it.y) + r.z * Math.abs(it.z),
        a = e.dot(it),
        l = n.dot(it),
        c = i.dot(it);
      if (Math.max(-Math.max(a, l, c), Math.min(a, l, c)) > o) return !1;
    }
    return !0;
  }
  const st = new W();
  class ot {
    constructor(t = new k(), e = -1) {
      (this.center = t), (this.radius = e);
    }
    set(t, e) {
      return this.center.copy(t), (this.radius = e), this;
    }
    setFromPoints(t, e) {
      const n = this.center;
      void 0 !== e ? n.copy(e) : st.setFromPoints(t).getCenter(n);
      let i = 0;
      for (let e = 0, r = t.length; e < r; e++)
        i = Math.max(i, n.distanceToSquared(t[e]));
      return (this.radius = Math.sqrt(i)), this;
    }
    copy(t) {
      return this.center.copy(t.center), (this.radius = t.radius), this;
    }
    isEmpty() {
      return this.radius < 0;
    }
    makeEmpty() {
      return this.center.set(0, 0, 0), (this.radius = -1), this;
    }
    containsPoint(t) {
      return t.distanceToSquared(this.center) <= this.radius * this.radius;
    }
    distanceToPoint(t) {
      return t.distanceTo(this.center) - this.radius;
    }
    intersectsSphere(t) {
      const e = this.radius + t.radius;
      return t.center.distanceToSquared(this.center) <= e * e;
    }
    intersectsBox(t) {
      return t.intersectsSphere(this);
    }
    intersectsPlane(t) {
      return Math.abs(t.distanceToPoint(this.center)) <= this.radius;
    }
    clampPoint(t, e) {
      const n = this.center.distanceToSquared(t);
      return (
        void 0 === e &&
          (console.warn("THREE.Sphere: .clampPoint() target is now required"),
          (e = new k())),
        e.copy(t),
        n > this.radius * this.radius &&
          (e.sub(this.center).normalize(),
          e.multiplyScalar(this.radius).add(this.center)),
        e
      );
    }
    getBoundingBox(t) {
      return (
        void 0 === t &&
          (console.warn(
            "THREE.Sphere: .getBoundingBox() target is now required"
          ),
          (t = new W())),
        this.isEmpty()
          ? (t.makeEmpty(), t)
          : (t.set(this.center, this.center), t.expandByScalar(this.radius), t)
      );
    }
    applyMatrix4(t) {
      return (
        this.center.applyMatrix4(t),
        (this.radius = this.radius * t.getMaxScaleOnAxis()),
        this
      );
    }
    translate(t) {
      return this.center.add(t), this;
    }
    equals(t) {
      return t.center.equals(this.center) && t.radius === this.radius;
    }
    clone() {
      return new this.constructor().copy(this);
    }
  }
  const at = new k(),
    lt = new k(),
    ct = new k(),
    ht = new k(),
    ut = new k(),
    dt = new k(),
    pt = new k();
  class ft {
    constructor(t = new k(), e = new k(0, 0, -1)) {
      (this.origin = t), (this.direction = e);
    }
    set(t, e) {
      return this.origin.copy(t), this.direction.copy(e), this;
    }
    copy(t) {
      return this.origin.copy(t.origin), this.direction.copy(t.direction), this;
    }
    at(t, e) {
      return (
        void 0 === e &&
          (console.warn("THREE.Ray: .at() target is now required"),
          (e = new k())),
        e.copy(this.direction).multiplyScalar(t).add(this.origin)
      );
    }
    lookAt(t) {
      return this.direction.copy(t).sub(this.origin).normalize(), this;
    }
    recast(t) {
      return this.origin.copy(this.at(t, at)), this;
    }
    closestPointToPoint(t, e) {
      void 0 === e &&
        (console.warn(
          "THREE.Ray: .closestPointToPoint() target is now required"
        ),
        (e = new k())),
        e.subVectors(t, this.origin);
      const n = e.dot(this.direction);
      return n < 0
        ? e.copy(this.origin)
        : e.copy(this.direction).multiplyScalar(n).add(this.origin);
    }
    distanceToPoint(t) {
      return Math.sqrt(this.distanceSqToPoint(t));
    }
    distanceSqToPoint(t) {
      const e = at.subVectors(t, this.origin).dot(this.direction);
      return e < 0
        ? this.origin.distanceToSquared(t)
        : (at.copy(this.direction).multiplyScalar(e).add(this.origin),
          at.distanceToSquared(t));
    }
    distanceSqToSegment(t, e, n, i) {
      lt.copy(t).add(e).multiplyScalar(0.5),
        ct.copy(e).sub(t).normalize(),
        ht.copy(this.origin).sub(lt);
      const r = 0.5 * t.distanceTo(e),
        s = -this.direction.dot(ct),
        o = ht.dot(this.direction),
        a = -ht.dot(ct),
        l = ht.lengthSq(),
        c = Math.abs(1 - s * s);
      let h, u, d, p;
      if (c > 0)
        if (((h = s * a - o), (u = s * o - a), (p = r * c), h >= 0))
          if (u >= -p)
            if (u <= p) {
              const t = 1 / c;
              (h *= t),
                (u *= t),
                (d = h * (h + s * u + 2 * o) + u * (s * h + u + 2 * a) + l);
            } else
              (u = r),
                (h = Math.max(0, -(s * u + o))),
                (d = -h * h + u * (u + 2 * a) + l);
          else
            (u = -r),
              (h = Math.max(0, -(s * u + o))),
              (d = -h * h + u * (u + 2 * a) + l);
        else
          u <= -p
            ? ((h = Math.max(0, -(-s * r + o))),
              (u = h > 0 ? -r : Math.min(Math.max(-r, -a), r)),
              (d = -h * h + u * (u + 2 * a) + l))
            : u <= p
            ? ((h = 0),
              (u = Math.min(Math.max(-r, -a), r)),
              (d = u * (u + 2 * a) + l))
            : ((h = Math.max(0, -(s * r + o))),
              (u = h > 0 ? r : Math.min(Math.max(-r, -a), r)),
              (d = -h * h + u * (u + 2 * a) + l));
      else
        (u = s > 0 ? -r : r),
          (h = Math.max(0, -(s * u + o))),
          (d = -h * h + u * (u + 2 * a) + l);
      return (
        n && n.copy(this.direction).multiplyScalar(h).add(this.origin),
        i && i.copy(ct).multiplyScalar(u).add(lt),
        d
      );
    }
    intersectSphere(t, e) {
      at.subVectors(t.center, this.origin);
      const n = at.dot(this.direction),
        i = at.dot(at) - n * n,
        r = t.radius * t.radius;
      if (i > r) return null;
      const s = Math.sqrt(r - i),
        o = n - s,
        a = n + s;
      return o < 0 && a < 0 ? null : o < 0 ? this.at(a, e) : this.at(o, e);
    }
    intersectsSphere(t) {
      return this.distanceSqToPoint(t.center) <= t.radius * t.radius;
    }
    distanceToPlane(t) {
      const e = t.normal.dot(this.direction);
      if (0 === e) return 0 === t.distanceToPoint(this.origin) ? 0 : null;
      const n = -(this.origin.dot(t.normal) + t.constant) / e;
      return n >= 0 ? n : null;
    }
    intersectPlane(t, e) {
      const n = this.distanceToPlane(t);
      return null === n ? null : this.at(n, e);
    }
    intersectsPlane(t) {
      const e = t.distanceToPoint(this.origin);
      return 0 === e || t.normal.dot(this.direction) * e < 0;
    }
    intersectBox(t, e) {
      let n, i, r, s, o, a;
      const l = 1 / this.direction.x,
        c = 1 / this.direction.y,
        h = 1 / this.direction.z,
        u = this.origin;
      return (
        l >= 0
          ? ((n = (t.min.x - u.x) * l), (i = (t.max.x - u.x) * l))
          : ((n = (t.max.x - u.x) * l), (i = (t.min.x - u.x) * l)),
        c >= 0
          ? ((r = (t.min.y - u.y) * c), (s = (t.max.y - u.y) * c))
          : ((r = (t.max.y - u.y) * c), (s = (t.min.y - u.y) * c)),
        n > s || r > i
          ? null
          : ((r > n || n != n) && (n = r),
            (s < i || i != i) && (i = s),
            h >= 0
              ? ((o = (t.min.z - u.z) * h), (a = (t.max.z - u.z) * h))
              : ((o = (t.max.z - u.z) * h), (a = (t.min.z - u.z) * h)),
            n > a || o > i
              ? null
              : ((o > n || n != n) && (n = o),
                (a < i || i != i) && (i = a),
                i < 0 ? null : this.at(n >= 0 ? n : i, e)))
      );
    }
    intersectsBox(t) {
      return null !== this.intersectBox(t, at);
    }
    intersectTriangle(t, e, n, i, r) {
      ut.subVectors(e, t), dt.subVectors(n, t), pt.crossVectors(ut, dt);
      let s,
        o = this.direction.dot(pt);
      if (o > 0) {
        if (i) return null;
        s = 1;
      } else {
        if (!(o < 0)) return null;
        (s = -1), (o = -o);
      }
      ht.subVectors(this.origin, t);
      const a = s * this.direction.dot(dt.crossVectors(ht, dt));
      if (a < 0) return null;
      const l = s * this.direction.dot(ut.cross(ht));
      if (l < 0) return null;
      if (a + l > o) return null;
      const c = -s * ht.dot(pt);
      return c < 0 ? null : this.at(c / o, r);
    }
    applyMatrix4(t) {
      return (
        this.origin.applyMatrix4(t), this.direction.transformDirection(t), this
      );
    }
    equals(t) {
      return t.origin.equals(this.origin) && t.direction.equals(this.direction);
    }
    clone() {
      return new this.constructor().copy(this);
    }
  }
  class mt {
    constructor() {
      (this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
        arguments.length > 0 &&
          console.error(
            "THREE.Matrix4: the constructor no longer reads arguments. use .set() instead."
          );
    }
    set(t, e, n, i, r, s, o, a, l, c, h, u, d, p, f, m) {
      const g = this.elements;
      return (
        (g[0] = t),
        (g[4] = e),
        (g[8] = n),
        (g[12] = i),
        (g[1] = r),
        (g[5] = s),
        (g[9] = o),
        (g[13] = a),
        (g[2] = l),
        (g[6] = c),
        (g[10] = h),
        (g[14] = u),
        (g[3] = d),
        (g[7] = p),
        (g[11] = f),
        (g[15] = m),
        this
      );
    }
    identity() {
      return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
    }
    clone() {
      return new mt().fromArray(this.elements);
    }
    copy(t) {
      const e = this.elements,
        n = t.elements;
      return (
        (e[0] = n[0]),
        (e[1] = n[1]),
        (e[2] = n[2]),
        (e[3] = n[3]),
        (e[4] = n[4]),
        (e[5] = n[5]),
        (e[6] = n[6]),
        (e[7] = n[7]),
        (e[8] = n[8]),
        (e[9] = n[9]),
        (e[10] = n[10]),
        (e[11] = n[11]),
        (e[12] = n[12]),
        (e[13] = n[13]),
        (e[14] = n[14]),
        (e[15] = n[15]),
        this
      );
    }
    copyPosition(t) {
      const e = this.elements,
        n = t.elements;
      return (e[12] = n[12]), (e[13] = n[13]), (e[14] = n[14]), this;
    }
    setFromMatrix3(t) {
      const e = t.elements;
      return (
        this.set(
          e[0],
          e[3],
          e[6],
          0,
          e[1],
          e[4],
          e[7],
          0,
          e[2],
          e[5],
          e[8],
          0,
          0,
          0,
          0,
          1
        ),
        this
      );
    }
    extractBasis(t, e, n) {
      return (
        t.setFromMatrixColumn(this, 0),
        e.setFromMatrixColumn(this, 1),
        n.setFromMatrixColumn(this, 2),
        this
      );
    }
    makeBasis(t, e, n) {
      return (
        this.set(
          t.x,
          e.x,
          n.x,
          0,
          t.y,
          e.y,
          n.y,
          0,
          t.z,
          e.z,
          n.z,
          0,
          0,
          0,
          0,
          1
        ),
        this
      );
    }
    extractRotation(t) {
      const e = this.elements,
        n = t.elements,
        i = 1 / gt.setFromMatrixColumn(t, 0).length(),
        r = 1 / gt.setFromMatrixColumn(t, 1).length(),
        s = 1 / gt.setFromMatrixColumn(t, 2).length();
      return (
        (e[0] = n[0] * i),
        (e[1] = n[1] * i),
        (e[2] = n[2] * i),
        (e[3] = 0),
        (e[4] = n[4] * r),
        (e[5] = n[5] * r),
        (e[6] = n[6] * r),
        (e[7] = 0),
        (e[8] = n[8] * s),
        (e[9] = n[9] * s),
        (e[10] = n[10] * s),
        (e[11] = 0),
        (e[12] = 0),
        (e[13] = 0),
        (e[14] = 0),
        (e[15] = 1),
        this
      );
    }
    makeRotationFromEuler(t) {
      (t && t.isEuler) ||
        console.error(
          "THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order."
        );
      const e = this.elements,
        n = t.x,
        i = t.y,
        r = t.z,
        s = Math.cos(n),
        o = Math.sin(n),
        a = Math.cos(i),
        l = Math.sin(i),
        c = Math.cos(r),
        h = Math.sin(r);
      if ("XYZ" === t.order) {
        const t = s * c,
          n = s * h,
          i = o * c,
          r = o * h;
        (e[0] = a * c),
          (e[4] = -a * h),
          (e[8] = l),
          (e[1] = n + i * l),
          (e[5] = t - r * l),
          (e[9] = -o * a),
          (e[2] = r - t * l),
          (e[6] = i + n * l),
          (e[10] = s * a);
      } else if ("YXZ" === t.order) {
        const t = a * c,
          n = a * h,
          i = l * c,
          r = l * h;
        (e[0] = t + r * o),
          (e[4] = i * o - n),
          (e[8] = s * l),
          (e[1] = s * h),
          (e[5] = s * c),
          (e[9] = -o),
          (e[2] = n * o - i),
          (e[6] = r + t * o),
          (e[10] = s * a);
      } else if ("ZXY" === t.order) {
        const t = a * c,
          n = a * h,
          i = l * c,
          r = l * h;
        (e[0] = t - r * o),
          (e[4] = -s * h),
          (e[8] = i + n * o),
          (e[1] = n + i * o),
          (e[5] = s * c),
          (e[9] = r - t * o),
          (e[2] = -s * l),
          (e[6] = o),
          (e[10] = s * a);
      } else if ("ZYX" === t.order) {
        const t = s * c,
          n = s * h,
          i = o * c,
          r = o * h;
        (e[0] = a * c),
          (e[4] = i * l - n),
          (e[8] = t * l + r),
          (e[1] = a * h),
          (e[5] = r * l + t),
          (e[9] = n * l - i),
          (e[2] = -l),
          (e[6] = o * a),
          (e[10] = s * a);
      } else if ("YZX" === t.order) {
        const t = s * a,
          n = s * l,
          i = o * a,
          r = o * l;
        (e[0] = a * c),
          (e[4] = r - t * h),
          (e[8] = i * h + n),
          (e[1] = h),
          (e[5] = s * c),
          (e[9] = -o * c),
          (e[2] = -l * c),
          (e[6] = n * h + i),
          (e[10] = t - r * h);
      } else if ("XZY" === t.order) {
        const t = s * a,
          n = s * l,
          i = o * a,
          r = o * l;
        (e[0] = a * c),
          (e[4] = -h),
          (e[8] = l * c),
          (e[1] = t * h + r),
          (e[5] = s * c),
          (e[9] = n * h - i),
          (e[2] = i * h - n),
          (e[6] = o * c),
          (e[10] = r * h + t);
      }
      return (
        (e[3] = 0),
        (e[7] = 0),
        (e[11] = 0),
        (e[12] = 0),
        (e[13] = 0),
        (e[14] = 0),
        (e[15] = 1),
        this
      );
    }
    makeRotationFromQuaternion(t) {
      return this.compose(_t, t, yt);
    }
    lookAt(t, e, n) {
      const i = this.elements;
      return (
        wt.subVectors(t, e),
        0 === wt.lengthSq() && (wt.z = 1),
        wt.normalize(),
        xt.crossVectors(n, wt),
        0 === xt.lengthSq() &&
          (1 === Math.abs(n.z) ? (wt.x += 1e-4) : (wt.z += 1e-4),
          wt.normalize(),
          xt.crossVectors(n, wt)),
        xt.normalize(),
        bt.crossVectors(wt, xt),
        (i[0] = xt.x),
        (i[4] = bt.x),
        (i[8] = wt.x),
        (i[1] = xt.y),
        (i[5] = bt.y),
        (i[9] = wt.y),
        (i[2] = xt.z),
        (i[6] = bt.z),
        (i[10] = wt.z),
        this
      );
    }
    multiply(t, e) {
      return void 0 !== e
        ? (console.warn(
            "THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."
          ),
          this.multiplyMatrices(t, e))
        : this.multiplyMatrices(this, t);
    }
    premultiply(t) {
      return this.multiplyMatrices(t, this);
    }
    multiplyMatrices(t, e) {
      const n = t.elements,
        i = e.elements,
        r = this.elements,
        s = n[0],
        o = n[4],
        a = n[8],
        l = n[12],
        c = n[1],
        h = n[5],
        u = n[9],
        d = n[13],
        p = n[2],
        f = n[6],
        m = n[10],
        g = n[14],
        v = n[3],
        _ = n[7],
        y = n[11],
        x = n[15],
        b = i[0],
        w = i[4],
        M = i[8],
        S = i[12],
        E = i[1],
        T = i[5],
        A = i[9],
        L = i[13],
        C = i[2],
        R = i[6],
        P = i[10],
        D = i[14],
        I = i[3],
        N = i[7],
        O = i[11],
        z = i[15];
      return (
        (r[0] = s * b + o * E + a * C + l * I),
        (r[4] = s * w + o * T + a * R + l * N),
        (r[8] = s * M + o * A + a * P + l * O),
        (r[12] = s * S + o * L + a * D + l * z),
        (r[1] = c * b + h * E + u * C + d * I),
        (r[5] = c * w + h * T + u * R + d * N),
        (r[9] = c * M + h * A + u * P + d * O),
        (r[13] = c * S + h * L + u * D + d * z),
        (r[2] = p * b + f * E + m * C + g * I),
        (r[6] = p * w + f * T + m * R + g * N),
        (r[10] = p * M + f * A + m * P + g * O),
        (r[14] = p * S + f * L + m * D + g * z),
        (r[3] = v * b + _ * E + y * C + x * I),
        (r[7] = v * w + _ * T + y * R + x * N),
        (r[11] = v * M + _ * A + y * P + x * O),
        (r[15] = v * S + _ * L + y * D + x * z),
        this
      );
    }
    multiplyScalar(t) {
      const e = this.elements;
      return (
        (e[0] *= t),
        (e[4] *= t),
        (e[8] *= t),
        (e[12] *= t),
        (e[1] *= t),
        (e[5] *= t),
        (e[9] *= t),
        (e[13] *= t),
        (e[2] *= t),
        (e[6] *= t),
        (e[10] *= t),
        (e[14] *= t),
        (e[3] *= t),
        (e[7] *= t),
        (e[11] *= t),
        (e[15] *= t),
        this
      );
    }
    determinant() {
      const t = this.elements,
        e = t[0],
        n = t[4],
        i = t[8],
        r = t[12],
        s = t[1],
        o = t[5],
        a = t[9],
        l = t[13],
        c = t[2],
        h = t[6],
        u = t[10],
        d = t[14];
      return (
        t[3] *
          (+r * a * h -
            i * l * h -
            r * o * u +
            n * l * u +
            i * o * d -
            n * a * d) +
        t[7] *
          (+e * a * d -
            e * l * u +
            r * s * u -
            i * s * d +
            i * l * c -
            r * a * c) +
        t[11] *
          (+e * l * h -
            e * o * d -
            r * s * h +
            n * s * d +
            r * o * c -
            n * l * c) +
        t[15] *
          (-i * o * c -
            e * a * h +
            e * o * u +
            i * s * h -
            n * s * u +
            n * a * c)
      );
    }
    transpose() {
      const t = this.elements;
      let e;
      return (
        (e = t[1]),
        (t[1] = t[4]),
        (t[4] = e),
        (e = t[2]),
        (t[2] = t[8]),
        (t[8] = e),
        (e = t[6]),
        (t[6] = t[9]),
        (t[9] = e),
        (e = t[3]),
        (t[3] = t[12]),
        (t[12] = e),
        (e = t[7]),
        (t[7] = t[13]),
        (t[13] = e),
        (e = t[11]),
        (t[11] = t[14]),
        (t[14] = e),
        this
      );
    }
    setPosition(t, e, n) {
      const i = this.elements;
      return (
        t.isVector3
          ? ((i[12] = t.x), (i[13] = t.y), (i[14] = t.z))
          : ((i[12] = t), (i[13] = e), (i[14] = n)),
        this
      );
    }
    invert() {
      const t = this.elements,
        e = t[0],
        n = t[1],
        i = t[2],
        r = t[3],
        s = t[4],
        o = t[5],
        a = t[6],
        l = t[7],
        c = t[8],
        h = t[9],
        u = t[10],
        d = t[11],
        p = t[12],
        f = t[13],
        m = t[14],
        g = t[15],
        v =
          h * m * l - f * u * l + f * a * d - o * m * d - h * a * g + o * u * g,
        _ =
          p * u * l - c * m * l - p * a * d + s * m * d + c * a * g - s * u * g,
        y =
          c * f * l - p * h * l + p * o * d - s * f * d - c * o * g + s * h * g,
        x =
          p * h * a - c * f * a - p * o * u + s * f * u + c * o * m - s * h * m,
        b = e * v + n * _ + i * y + r * x;
      if (0 === b)
        return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      const w = 1 / b;
      return (
        (t[0] = v * w),
        (t[1] =
          (f * u * r -
            h * m * r -
            f * i * d +
            n * m * d +
            h * i * g -
            n * u * g) *
          w),
        (t[2] =
          (o * m * r -
            f * a * r +
            f * i * l -
            n * m * l -
            o * i * g +
            n * a * g) *
          w),
        (t[3] =
          (h * a * r -
            o * u * r -
            h * i * l +
            n * u * l +
            o * i * d -
            n * a * d) *
          w),
        (t[4] = _ * w),
        (t[5] =
          (c * m * r -
            p * u * r +
            p * i * d -
            e * m * d -
            c * i * g +
            e * u * g) *
          w),
        (t[6] =
          (p * a * r -
            s * m * r -
            p * i * l +
            e * m * l +
            s * i * g -
            e * a * g) *
          w),
        (t[7] =
          (s * u * r -
            c * a * r +
            c * i * l -
            e * u * l -
            s * i * d +
            e * a * d) *
          w),
        (t[8] = y * w),
        (t[9] =
          (p * h * r -
            c * f * r -
            p * n * d +
            e * f * d +
            c * n * g -
            e * h * g) *
          w),
        (t[10] =
          (s * f * r -
            p * o * r +
            p * n * l -
            e * f * l -
            s * n * g +
            e * o * g) *
          w),
        (t[11] =
          (c * o * r -
            s * h * r -
            c * n * l +
            e * h * l +
            s * n * d -
            e * o * d) *
          w),
        (t[12] = x * w),
        (t[13] =
          (c * f * i -
            p * h * i +
            p * n * u -
            e * f * u -
            c * n * m +
            e * h * m) *
          w),
        (t[14] =
          (p * o * i -
            s * f * i -
            p * n * a +
            e * f * a +
            s * n * m -
            e * o * m) *
          w),
        (t[15] =
          (s * h * i -
            c * o * i +
            c * n * a -
            e * h * a -
            s * n * u +
            e * o * u) *
          w),
        this
      );
    }
    scale(t) {
      const e = this.elements,
        n = t.x,
        i = t.y,
        r = t.z;
      return (
        (e[0] *= n),
        (e[4] *= i),
        (e[8] *= r),
        (e[1] *= n),
        (e[5] *= i),
        (e[9] *= r),
        (e[2] *= n),
        (e[6] *= i),
        (e[10] *= r),
        (e[3] *= n),
        (e[7] *= i),
        (e[11] *= r),
        this
      );
    }
    getMaxScaleOnAxis() {
      const t = this.elements,
        e = t[0] * t[0] + t[1] * t[1] + t[2] * t[2],
        n = t[4] * t[4] + t[5] * t[5] + t[6] * t[6],
        i = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
      return Math.sqrt(Math.max(e, n, i));
    }
    makeTranslation(t, e, n) {
      return this.set(1, 0, 0, t, 0, 1, 0, e, 0, 0, 1, n, 0, 0, 0, 1), this;
    }
    makeRotationX(t) {
      const e = Math.cos(t),
        n = Math.sin(t);
      return this.set(1, 0, 0, 0, 0, e, -n, 0, 0, n, e, 0, 0, 0, 0, 1), this;
    }
    makeRotationY(t) {
      const e = Math.cos(t),
        n = Math.sin(t);
      return this.set(e, 0, n, 0, 0, 1, 0, 0, -n, 0, e, 0, 0, 0, 0, 1), this;
    }
    makeRotationZ(t) {
      const e = Math.cos(t),
        n = Math.sin(t);
      return this.set(e, -n, 0, 0, n, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
    }
    makeRotationAxis(t, e) {
      const n = Math.cos(e),
        i = Math.sin(e),
        r = 1 - n,
        s = t.x,
        o = t.y,
        a = t.z,
        l = r * s,
        c = r * o;
      return (
        this.set(
          l * s + n,
          l * o - i * a,
          l * a + i * o,
          0,
          l * o + i * a,
          c * o + n,
          c * a - i * s,
          0,
          l * a - i * o,
          c * a + i * s,
          r * a * a + n,
          0,
          0,
          0,
          0,
          1
        ),
        this
      );
    }
    makeScale(t, e, n) {
      return this.set(t, 0, 0, 0, 0, e, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this;
    }
    makeShear(t, e, n) {
      return this.set(1, e, n, 0, t, 1, n, 0, t, e, 1, 0, 0, 0, 0, 1), this;
    }
    compose(t, e, n) {
      const i = this.elements,
        r = e._x,
        s = e._y,
        o = e._z,
        a = e._w,
        l = r + r,
        c = s + s,
        h = o + o,
        u = r * l,
        d = r * c,
        p = r * h,
        f = s * c,
        m = s * h,
        g = o * h,
        v = a * l,
        _ = a * c,
        y = a * h,
        x = n.x,
        b = n.y,
        w = n.z;
      return (
        (i[0] = (1 - (f + g)) * x),
        (i[1] = (d + y) * x),
        (i[2] = (p - _) * x),
        (i[3] = 0),
        (i[4] = (d - y) * b),
        (i[5] = (1 - (u + g)) * b),
        (i[6] = (m + v) * b),
        (i[7] = 0),
        (i[8] = (p + _) * w),
        (i[9] = (m - v) * w),
        (i[10] = (1 - (u + f)) * w),
        (i[11] = 0),
        (i[12] = t.x),
        (i[13] = t.y),
        (i[14] = t.z),
        (i[15] = 1),
        this
      );
    }
    decompose(t, e, n) {
      const i = this.elements;
      let r = gt.set(i[0], i[1], i[2]).length();
      const s = gt.set(i[4], i[5], i[6]).length(),
        o = gt.set(i[8], i[9], i[10]).length();
      this.determinant() < 0 && (r = -r),
        (t.x = i[12]),
        (t.y = i[13]),
        (t.z = i[14]),
        vt.copy(this);
      const a = 1 / r,
        l = 1 / s,
        c = 1 / o;
      return (
        (vt.elements[0] *= a),
        (vt.elements[1] *= a),
        (vt.elements[2] *= a),
        (vt.elements[4] *= l),
        (vt.elements[5] *= l),
        (vt.elements[6] *= l),
        (vt.elements[8] *= c),
        (vt.elements[9] *= c),
        (vt.elements[10] *= c),
        e.setFromRotationMatrix(vt),
        (n.x = r),
        (n.y = s),
        (n.z = o),
        this
      );
    }
    makePerspective(t, e, n, i, r, s) {
      void 0 === s &&
        console.warn(
          "THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs."
        );
      const o = this.elements,
        a = (2 * r) / (e - t),
        l = (2 * r) / (n - i),
        c = (e + t) / (e - t),
        h = (n + i) / (n - i),
        u = -(s + r) / (s - r),
        d = (-2 * s * r) / (s - r);
      return (
        (o[0] = a),
        (o[4] = 0),
        (o[8] = c),
        (o[12] = 0),
        (o[1] = 0),
        (o[5] = l),
        (o[9] = h),
        (o[13] = 0),
        (o[2] = 0),
        (o[6] = 0),
        (o[10] = u),
        (o[14] = d),
        (o[3] = 0),
        (o[7] = 0),
        (o[11] = -1),
        (o[15] = 0),
        this
      );
    }
    makeOrthographic(t, e, n, i, r, s) {
      const o = this.elements,
        a = 1 / (e - t),
        l = 1 / (n - i),
        c = 1 / (s - r),
        h = (e + t) * a,
        u = (n + i) * l,
        d = (s + r) * c;
      return (
        (o[0] = 2 * a),
        (o[4] = 0),
        (o[8] = 0),
        (o[12] = -h),
        (o[1] = 0),
        (o[5] = 2 * l),
        (o[9] = 0),
        (o[13] = -u),
        (o[2] = 0),
        (o[6] = 0),
        (o[10] = -2 * c),
        (o[14] = -d),
        (o[3] = 0),
        (o[7] = 0),
        (o[11] = 0),
        (o[15] = 1),
        this
      );
    }
    equals(t) {
      const e = this.elements,
        n = t.elements;
      for (let t = 0; t < 16; t++) if (e[t] !== n[t]) return !1;
      return !0;
    }
    fromArray(t, e = 0) {
      for (let n = 0; n < 16; n++) this.elements[n] = t[n + e];
      return this;
    }
    toArray(t = [], e = 0) {
      const n = this.elements;
      return (
        (t[e] = n[0]),
        (t[e + 1] = n[1]),
        (t[e + 2] = n[2]),
        (t[e + 3] = n[3]),
        (t[e + 4] = n[4]),
        (t[e + 5] = n[5]),
        (t[e + 6] = n[6]),
        (t[e + 7] = n[7]),
        (t[e + 8] = n[8]),
        (t[e + 9] = n[9]),
        (t[e + 10] = n[10]),
        (t[e + 11] = n[11]),
        (t[e + 12] = n[12]),
        (t[e + 13] = n[13]),
        (t[e + 14] = n[14]),
        (t[e + 15] = n[15]),
        t
      );
    }
  }
  mt.prototype.isMatrix4 = !0;
  const gt = new k(),
    vt = new mt(),
    _t = new k(0, 0, 0),
    yt = new k(1, 1, 1),
    xt = new k(),
    bt = new k(),
    wt = new k(),
    Mt = new mt(),
    St = new U();
  class Et {
    constructor(t = 0, e = 0, n = 0, i = Et.DefaultOrder) {
      (this._x = t), (this._y = e), (this._z = n), (this._order = i);
    }
    get x() {
      return this._x;
    }
    set x(t) {
      (this._x = t), this._onChangeCallback();
    }
    get y() {
      return this._y;
    }
    set y(t) {
      (this._y = t), this._onChangeCallback();
    }
    get z() {
      return this._z;
    }
    set z(t) {
      (this._z = t), this._onChangeCallback();
    }
    get order() {
      return this._order;
    }
    set order(t) {
      (this._order = t), this._onChangeCallback();
    }
    set(t, e, n, i) {
      return (
        (this._x = t),
        (this._y = e),
        (this._z = n),
        (this._order = i || this._order),
        this._onChangeCallback(),
        this
      );
    }
    clone() {
      return new this.constructor(this._x, this._y, this._z, this._order);
    }
    copy(t) {
      return (
        (this._x = t._x),
        (this._y = t._y),
        (this._z = t._z),
        (this._order = t._order),
        this._onChangeCallback(),
        this
      );
    }
    setFromRotationMatrix(t, e, n) {
      const i = R.clamp,
        r = t.elements,
        s = r[0],
        o = r[4],
        a = r[8],
        l = r[1],
        c = r[5],
        h = r[9],
        u = r[2],
        d = r[6],
        p = r[10];
      switch ((e = e || this._order)) {
        case "XYZ":
          (this._y = Math.asin(i(a, -1, 1))),
            Math.abs(a) < 0.9999999
              ? ((this._x = Math.atan2(-h, p)), (this._z = Math.atan2(-o, s)))
              : ((this._x = Math.atan2(d, c)), (this._z = 0));
          break;
        case "YXZ":
          (this._x = Math.asin(-i(h, -1, 1))),
            Math.abs(h) < 0.9999999
              ? ((this._y = Math.atan2(a, p)), (this._z = Math.atan2(l, c)))
              : ((this._y = Math.atan2(-u, s)), (this._z = 0));
          break;
        case "ZXY":
          (this._x = Math.asin(i(d, -1, 1))),
            Math.abs(d) < 0.9999999
              ? ((this._y = Math.atan2(-u, p)), (this._z = Math.atan2(-o, c)))
              : ((this._y = 0), (this._z = Math.atan2(l, s)));
          break;
        case "ZYX":
          (this._y = Math.asin(-i(u, -1, 1))),
            Math.abs(u) < 0.9999999
              ? ((this._x = Math.atan2(d, p)), (this._z = Math.atan2(l, s)))
              : ((this._x = 0), (this._z = Math.atan2(-o, c)));
          break;
        case "YZX":
          (this._z = Math.asin(i(l, -1, 1))),
            Math.abs(l) < 0.9999999
              ? ((this._x = Math.atan2(-h, c)), (this._y = Math.atan2(-u, s)))
              : ((this._x = 0), (this._y = Math.atan2(a, p)));
          break;
        case "XZY":
          (this._z = Math.asin(-i(o, -1, 1))),
            Math.abs(o) < 0.9999999
              ? ((this._x = Math.atan2(d, c)), (this._y = Math.atan2(a, s)))
              : ((this._x = Math.atan2(-h, p)), (this._y = 0));
          break;
        default:
          console.warn(
            "THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " +
              e
          );
      }
      return (this._order = e), !1 !== n && this._onChangeCallback(), this;
    }
    setFromQuaternion(t, e, n) {
      return (
        Mt.makeRotationFromQuaternion(t), this.setFromRotationMatrix(Mt, e, n)
      );
    }
    setFromVector3(t, e) {
      return this.set(t.x, t.y, t.z, e || this._order);
    }
    reorder(t) {
      return St.setFromEuler(this), this.setFromQuaternion(St, t);
    }
    equals(t) {
      return (
        t._x === this._x &&
        t._y === this._y &&
        t._z === this._z &&
        t._order === this._order
      );
    }
    fromArray(t) {
      return (
        (this._x = t[0]),
        (this._y = t[1]),
        (this._z = t[2]),
        void 0 !== t[3] && (this._order = t[3]),
        this._onChangeCallback(),
        this
      );
    }
    toArray(t = [], e = 0) {
      return (
        (t[e] = this._x),
        (t[e + 1] = this._y),
        (t[e + 2] = this._z),
        (t[e + 3] = this._order),
        t
      );
    }
    toVector3(t) {
      return t
        ? t.set(this._x, this._y, this._z)
        : new k(this._x, this._y, this._z);
    }
    _onChange(t) {
      return (this._onChangeCallback = t), this;
    }
    _onChangeCallback() {}
  }
  (Et.prototype.isEuler = !0),
    (Et.DefaultOrder = "XYZ"),
    (Et.RotationOrders = ["XYZ", "YZX", "ZXY", "XZY", "YXZ", "ZYX"]);
  class Tt {
    constructor() {
      this.mask = 1;
    }
    set(t) {
      this.mask = (1 << t) | 0;
    }
    enable(t) {
      this.mask |= (1 << t) | 0;
    }
    enableAll() {
      this.mask = -1;
    }
    toggle(t) {
      this.mask ^= (1 << t) | 0;
    }
    disable(t) {
      this.mask &= ~((1 << t) | 0);
    }
    disableAll() {
      this.mask = 0;
    }
    test(t) {
      return 0 != (this.mask & t.mask);
    }
  }
  let At = 0;
  const Lt = new k(),
    Ct = new U(),
    Rt = new mt(),
    Pt = new k(),
    Dt = new k(),
    It = new k(),
    Nt = new U(),
    Ot = new k(1, 0, 0),
    zt = new k(0, 1, 0),
    Bt = new k(0, 0, 1),
    Ht = { type: "added" },
    Ft = { type: "removed" };
  function Ut() {
    Object.defineProperty(this, "id", { value: At++ }),
      (this.uuid = R.generateUUID()),
      (this.name = ""),
      (this.type = "Object3D"),
      (this.parent = null),
      (this.children = []),
      (this.up = Ut.DefaultUp.clone());
    const t = new k(),
      e = new Et(),
      n = new U(),
      i = new k(1, 1, 1);
    e._onChange(function () {
      n.setFromEuler(e, !1);
    }),
      n._onChange(function () {
        e.setFromQuaternion(n, void 0, !1);
      }),
      Object.defineProperties(this, {
        position: { configurable: !0, enumerable: !0, value: t },
        rotation: { configurable: !0, enumerable: !0, value: e },
        quaternion: { configurable: !0, enumerable: !0, value: n },
        scale: { configurable: !0, enumerable: !0, value: i },
        modelViewMatrix: { value: new mt() },
        normalMatrix: { value: new D() },
      }),
      (this.matrix = new mt()),
      (this.matrixWorld = new mt()),
      (this.matrixAutoUpdate = Ut.DefaultMatrixAutoUpdate),
      (this.matrixWorldNeedsUpdate = !1),
      (this.layers = new Tt()),
      (this.visible = !0),
      (this.castShadow = !1),
      (this.receiveShadow = !1),
      (this.frustumCulled = !0),
      (this.renderOrder = 0),
      (this.animations = []),
      (this.userData = {});
  }
  (Ut.DefaultUp = new k(0, 1, 0)),
    (Ut.DefaultMatrixAutoUpdate = !0),
    (Ut.prototype = Object.assign(Object.create(A.prototype), {
      constructor: Ut,
      isObject3D: !0,
      onBeforeRender: function () {},
      onAfterRender: function () {},
      applyMatrix4: function (t) {
        this.matrixAutoUpdate && this.updateMatrix(),
          this.matrix.premultiply(t),
          this.matrix.decompose(this.position, this.quaternion, this.scale);
      },
      applyQuaternion: function (t) {
        return this.quaternion.premultiply(t), this;
      },
      setRotationFromAxisAngle: function (t, e) {
        this.quaternion.setFromAxisAngle(t, e);
      },
      setRotationFromEuler: function (t) {
        this.quaternion.setFromEuler(t, !0);
      },
      setRotationFromMatrix: function (t) {
        this.quaternion.setFromRotationMatrix(t);
      },
      setRotationFromQuaternion: function (t) {
        this.quaternion.copy(t);
      },
      rotateOnAxis: function (t, e) {
        return Ct.setFromAxisAngle(t, e), this.quaternion.multiply(Ct), this;
      },
      rotateOnWorldAxis: function (t, e) {
        return Ct.setFromAxisAngle(t, e), this.quaternion.premultiply(Ct), this;
      },
      rotateX: function (t) {
        return this.rotateOnAxis(Ot, t);
      },
      rotateY: function (t) {
        return this.rotateOnAxis(zt, t);
      },
      rotateZ: function (t) {
        return this.rotateOnAxis(Bt, t);
      },
      translateOnAxis: function (t, e) {
        return (
          Lt.copy(t).applyQuaternion(this.quaternion),
          this.position.add(Lt.multiplyScalar(e)),
          this
        );
      },
      translateX: function (t) {
        return this.translateOnAxis(Ot, t);
      },
      translateY: function (t) {
        return this.translateOnAxis(zt, t);
      },
      translateZ: function (t) {
        return this.translateOnAxis(Bt, t);
      },
      localToWorld: function (t) {
        return t.applyMatrix4(this.matrixWorld);
      },
      worldToLocal: function (t) {
        return t.applyMatrix4(Rt.copy(this.matrixWorld).invert());
      },
      lookAt: function (t, e, n) {
        t.isVector3 ? Pt.copy(t) : Pt.set(t, e, n);
        const i = this.parent;
        this.updateWorldMatrix(!0, !1),
          Dt.setFromMatrixPosition(this.matrixWorld),
          this.isCamera || this.isLight
            ? Rt.lookAt(Dt, Pt, this.up)
            : Rt.lookAt(Pt, Dt, this.up),
          this.quaternion.setFromRotationMatrix(Rt),
          i &&
            (Rt.extractRotation(i.matrixWorld),
            Ct.setFromRotationMatrix(Rt),
            this.quaternion.premultiply(Ct.invert()));
      },
      add: function (t) {
        if (arguments.length > 1) {
          for (let t = 0; t < arguments.length; t++) this.add(arguments[t]);
          return this;
        }
        return t === this
          ? (console.error(
              "THREE.Object3D.add: object can't be added as a child of itself.",
              t
            ),
            this)
          : (t && t.isObject3D
              ? (null !== t.parent && t.parent.remove(t),
                (t.parent = this),
                this.children.push(t),
                t.dispatchEvent(Ht))
              : console.error(
                  "THREE.Object3D.add: object not an instance of THREE.Object3D.",
                  t
                ),
            this);
      },
      remove: function (t) {
        if (arguments.length > 1) {
          for (let t = 0; t < arguments.length; t++) this.remove(arguments[t]);
          return this;
        }
        const e = this.children.indexOf(t);
        return (
          -1 !== e &&
            ((t.parent = null),
            this.children.splice(e, 1),
            t.dispatchEvent(Ft)),
          this
        );
      },
      clear: function () {
        for (let t = 0; t < this.children.length; t++) {
          const e = this.children[t];
          (e.parent = null), e.dispatchEvent(Ft);
        }
        return (this.children.length = 0), this;
      },
      attach: function (t) {
        return (
          this.updateWorldMatrix(!0, !1),
          Rt.copy(this.matrixWorld).invert(),
          null !== t.parent &&
            (t.parent.updateWorldMatrix(!0, !1),
            Rt.multiply(t.parent.matrixWorld)),
          t.applyMatrix4(Rt),
          this.add(t),
          t.updateWorldMatrix(!1, !0),
          this
        );
      },
      getObjectById: function (t) {
        return this.getObjectByProperty("id", t);
      },
      getObjectByName: function (t) {
        return this.getObjectByProperty("name", t);
      },
      getObjectByProperty: function (t, e) {
        if (this[t] === e) return this;
        for (let n = 0, i = this.children.length; n < i; n++) {
          const i = this.children[n].getObjectByProperty(t, e);
          if (void 0 !== i) return i;
        }
      },
      getWorldPosition: function (t) {
        return (
          void 0 === t &&
            (console.warn(
              "THREE.Object3D: .getWorldPosition() target is now required"
            ),
            (t = new k())),
          this.updateWorldMatrix(!0, !1),
          t.setFromMatrixPosition(this.matrixWorld)
        );
      },
      getWorldQuaternion: function (t) {
        return (
          void 0 === t &&
            (console.warn(
              "THREE.Object3D: .getWorldQuaternion() target is now required"
            ),
            (t = new U())),
          this.updateWorldMatrix(!0, !1),
          this.matrixWorld.decompose(Dt, t, It),
          t
        );
      },
      getWorldScale: function (t) {
        return (
          void 0 === t &&
            (console.warn(
              "THREE.Object3D: .getWorldScale() target is now required"
            ),
            (t = new k())),
          this.updateWorldMatrix(!0, !1),
          this.matrixWorld.decompose(Dt, Nt, t),
          t
        );
      },
      getWorldDirection: function (t) {
        void 0 === t &&
          (console.warn(
            "THREE.Object3D: .getWorldDirection() target is now required"
          ),
          (t = new k())),
          this.updateWorldMatrix(!0, !1);
        const e = this.matrixWorld.elements;
        return t.set(e[8], e[9], e[10]).normalize();
      },
      raycast: function () {},
      traverse: function (t) {
        t(this);
        const e = this.children;
        for (let n = 0, i = e.length; n < i; n++) e[n].traverse(t);
      },
      traverseVisible: function (t) {
        if (!1 === this.visible) return;
        t(this);
        const e = this.children;
        for (let n = 0, i = e.length; n < i; n++) e[n].traverseVisible(t);
      },
      traverseAncestors: function (t) {
        const e = this.parent;
        null !== e && (t(e), e.traverseAncestors(t));
      },
      updateMatrix: function () {
        this.matrix.compose(this.position, this.quaternion, this.scale),
          (this.matrixWorldNeedsUpdate = !0);
      },
      updateMatrixWorld: function (t) {
        this.matrixAutoUpdate && this.updateMatrix(),
          (this.matrixWorldNeedsUpdate || t) &&
            (null === this.parent
              ? this.matrixWorld.copy(this.matrix)
              : this.matrixWorld.multiplyMatrices(
                  this.parent.matrixWorld,
                  this.matrix
                ),
            (this.matrixWorldNeedsUpdate = !1),
            (t = !0));
        const e = this.children;
        for (let n = 0, i = e.length; n < i; n++) e[n].updateMatrixWorld(t);
      },
      updateWorldMatrix: function (t, e) {
        const n = this.parent;
        if (
          (!0 === t && null !== n && n.updateWorldMatrix(!0, !1),
          this.matrixAutoUpdate && this.updateMatrix(),
          null === this.parent
            ? this.matrixWorld.copy(this.matrix)
            : this.matrixWorld.multiplyMatrices(
                this.parent.matrixWorld,
                this.matrix
              ),
          !0 === e)
        ) {
          const t = this.children;
          for (let e = 0, n = t.length; e < n; e++)
            t[e].updateWorldMatrix(!1, !0);
        }
      },
      toJSON: function (t) {
        const e = void 0 === t || "string" == typeof t,
          n = {};
        e &&
          ((t = {
            geometries: {},
            materials: {},
            textures: {},
            images: {},
            shapes: {},
            skeletons: {},
            animations: {},
          }),
          (n.metadata = {
            version: 4.5,
            type: "Object",
            generator: "Object3D.toJSON",
          }));
        const i = {};
        function r(e, n) {
          return void 0 === e[n.uuid] && (e[n.uuid] = n.toJSON(t)), n.uuid;
        }
        if (
          ((i.uuid = this.uuid),
          (i.type = this.type),
          "" !== this.name && (i.name = this.name),
          !0 === this.castShadow && (i.castShadow = !0),
          !0 === this.receiveShadow && (i.receiveShadow = !0),
          !1 === this.visible && (i.visible = !1),
          !1 === this.frustumCulled && (i.frustumCulled = !1),
          0 !== this.renderOrder && (i.renderOrder = this.renderOrder),
          "{}" !== JSON.stringify(this.userData) &&
            (i.userData = this.userData),
          (i.layers = this.layers.mask),
          (i.matrix = this.matrix.toArray()),
          !1 === this.matrixAutoUpdate && (i.matrixAutoUpdate = !1),
          this.isInstancedMesh &&
            ((i.type = "InstancedMesh"),
            (i.count = this.count),
            (i.instanceMatrix = this.instanceMatrix.toJSON())),
          this.isMesh || this.isLine || this.isPoints)
        ) {
          i.geometry = r(t.geometries, this.geometry);
          const e = this.geometry.parameters;
          if (void 0 !== e && void 0 !== e.shapes) {
            const n = e.shapes;
            if (Array.isArray(n))
              for (let e = 0, i = n.length; e < i; e++) {
                const i = n[e];
                r(t.shapes, i);
              }
            else r(t.shapes, n);
          }
        }
        if (
          (this.isSkinnedMesh &&
            ((i.bindMode = this.bindMode),
            (i.bindMatrix = this.bindMatrix.toArray()),
            void 0 !== this.skeleton &&
              (r(t.skeletons, this.skeleton),
              (i.skeleton = this.skeleton.uuid))),
          void 0 !== this.material)
        )
          if (Array.isArray(this.material)) {
            const e = [];
            for (let n = 0, i = this.material.length; n < i; n++)
              e.push(r(t.materials, this.material[n]));
            i.material = e;
          } else i.material = r(t.materials, this.material);
        if (this.children.length > 0) {
          i.children = [];
          for (let e = 0; e < this.children.length; e++)
            i.children.push(this.children[e].toJSON(t).object);
        }
        if (this.animations.length > 0) {
          i.animations = [];
          for (let e = 0; e < this.animations.length; e++) {
            const n = this.animations[e];
            i.animations.push(r(t.animations, n));
          }
        }
        if (e) {
          const e = s(t.geometries),
            i = s(t.materials),
            r = s(t.textures),
            o = s(t.images),
            a = s(t.shapes),
            l = s(t.skeletons),
            c = s(t.animations);
          e.length > 0 && (n.geometries = e),
            i.length > 0 && (n.materials = i),
            r.length > 0 && (n.textures = r),
            o.length > 0 && (n.images = o),
            a.length > 0 && (n.shapes = a),
            l.length > 0 && (n.skeletons = l),
            c.length > 0 && (n.animations = c);
        }
        return (n.object = i), n;
        function s(t) {
          const e = [];
          for (const n in t) {
            const i = t[n];
            delete i.metadata, e.push(i);
          }
          return e;
        }
      },
      clone: function (t) {
        return new this.constructor().copy(this, t);
      },
      copy: function (t, e = !0) {
        if (
          ((this.name = t.name),
          this.up.copy(t.up),
          this.position.copy(t.position),
          (this.rotation.order = t.rotation.order),
          this.quaternion.copy(t.quaternion),
          this.scale.copy(t.scale),
          this.matrix.copy(t.matrix),
          this.matrixWorld.copy(t.matrixWorld),
          (this.matrixAutoUpdate = t.matrixAutoUpdate),
          (this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate),
          (this.layers.mask = t.layers.mask),
          (this.visible = t.visible),
          (this.castShadow = t.castShadow),
          (this.receiveShadow = t.receiveShadow),
          (this.frustumCulled = t.frustumCulled),
          (this.renderOrder = t.renderOrder),
          (this.userData = JSON.parse(JSON.stringify(t.userData))),
          !0 === e)
        )
          for (let e = 0; e < t.children.length; e++) {
            const n = t.children[e];
            this.add(n.clone());
          }
        return this;
      },
    }));
  const kt = new k(),
    Gt = new k(),
    Vt = new D();
  class Wt {
    constructor(t = new k(1, 0, 0), e = 0) {
      (this.normal = t), (this.constant = e);
    }
    set(t, e) {
      return this.normal.copy(t), (this.constant = e), this;
    }
    setComponents(t, e, n, i) {
      return this.normal.set(t, e, n), (this.constant = i), this;
    }
    setFromNormalAndCoplanarPoint(t, e) {
      return this.normal.copy(t), (this.constant = -e.dot(this.normal)), this;
    }
    setFromCoplanarPoints(t, e, n) {
      const i = kt.subVectors(n, e).cross(Gt.subVectors(t, e)).normalize();
      return this.setFromNormalAndCoplanarPoint(i, t), this;
    }
    copy(t) {
      return this.normal.copy(t.normal), (this.constant = t.constant), this;
    }
    normalize() {
      const t = 1 / this.normal.length();
      return this.normal.multiplyScalar(t), (this.constant *= t), this;
    }
    negate() {
      return (this.constant *= -1), this.normal.negate(), this;
    }
    distanceToPoint(t) {
      return this.normal.dot(t) + this.constant;
    }
    distanceToSphere(t) {
      return this.distanceToPoint(t.center) - t.radius;
    }
    projectPoint(t, e) {
      return (
        void 0 === e &&
          (console.warn("THREE.Plane: .projectPoint() target is now required"),
          (e = new k())),
        e.copy(this.normal).multiplyScalar(-this.distanceToPoint(t)).add(t)
      );
    }
    intersectLine(t, e) {
      void 0 === e &&
        (console.warn("THREE.Plane: .intersectLine() target is now required"),
        (e = new k()));
      const n = t.delta(kt),
        i = this.normal.dot(n);
      if (0 === i)
        return 0 === this.distanceToPoint(t.start) ? e.copy(t.start) : void 0;
      const r = -(t.start.dot(this.normal) + this.constant) / i;
      return r < 0 || r > 1 ? void 0 : e.copy(n).multiplyScalar(r).add(t.start);
    }
    intersectsLine(t) {
      const e = this.distanceToPoint(t.start),
        n = this.distanceToPoint(t.end);
      return (e < 0 && n > 0) || (n < 0 && e > 0);
    }
    intersectsBox(t) {
      return t.intersectsPlane(this);
    }
    intersectsSphere(t) {
      return t.intersectsPlane(this);
    }
    coplanarPoint(t) {
      return (
        void 0 === t &&
          (console.warn("THREE.Plane: .coplanarPoint() target is now required"),
          (t = new k())),
        t.copy(this.normal).multiplyScalar(-this.constant)
      );
    }
    applyMatrix4(t, e) {
      const n = e || Vt.getNormalMatrix(t),
        i = this.coplanarPoint(kt).applyMatrix4(t),
        r = this.normal.applyMatrix3(n).normalize();
      return (this.constant = -i.dot(r)), this;
    }
    translate(t) {
      return (this.constant -= t.dot(this.normal)), this;
    }
    equals(t) {
      return t.normal.equals(this.normal) && t.constant === this.constant;
    }
    clone() {
      return new this.constructor().copy(this);
    }
  }
  Wt.prototype.isPlane = !0;
  const jt = new k(),
    qt = new k(),
    Xt = new k(),
    Yt = new k(),
    Jt = new k(),
    Zt = new k(),
    Qt = new k(),
    Kt = new k(),
    $t = new k(),
    te = new k();
  class ee {
    constructor(t = new k(), e = new k(), n = new k()) {
      (this.a = t), (this.b = e), (this.c = n);
    }
    static getNormal(t, e, n, i) {
      void 0 === i &&
        (console.warn("THREE.Triangle: .getNormal() target is now required"),
        (i = new k())),
        i.subVectors(n, e),
        jt.subVectors(t, e),
        i.cross(jt);
      const r = i.lengthSq();
      return r > 0 ? i.multiplyScalar(1 / Math.sqrt(r)) : i.set(0, 0, 0);
    }
    static getBarycoord(t, e, n, i, r) {
      jt.subVectors(i, e), qt.subVectors(n, e), Xt.subVectors(t, e);
      const s = jt.dot(jt),
        o = jt.dot(qt),
        a = jt.dot(Xt),
        l = qt.dot(qt),
        c = qt.dot(Xt),
        h = s * l - o * o;
      if (
        (void 0 === r &&
          (console.warn(
            "THREE.Triangle: .getBarycoord() target is now required"
          ),
          (r = new k())),
        0 === h)
      )
        return r.set(-2, -1, -1);
      const u = 1 / h,
        d = (l * a - o * c) * u,
        p = (s * c - o * a) * u;
      return r.set(1 - d - p, p, d);
    }
    static containsPoint(t, e, n, i) {
      return (
        this.getBarycoord(t, e, n, i, Yt),
        Yt.x >= 0 && Yt.y >= 0 && Yt.x + Yt.y <= 1
      );
    }
    static getUV(t, e, n, i, r, s, o, a) {
      return (
        this.getBarycoord(t, e, n, i, Yt),
        a.set(0, 0),
        a.addScaledVector(r, Yt.x),
        a.addScaledVector(s, Yt.y),
        a.addScaledVector(o, Yt.z),
        a
      );
    }
    static isFrontFacing(t, e, n, i) {
      return jt.subVectors(n, e), qt.subVectors(t, e), jt.cross(qt).dot(i) < 0;
    }
    set(t, e, n) {
      return this.a.copy(t), this.b.copy(e), this.c.copy(n), this;
    }
    setFromPointsAndIndices(t, e, n, i) {
      return this.a.copy(t[e]), this.b.copy(t[n]), this.c.copy(t[i]), this;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      return this.a.copy(t.a), this.b.copy(t.b), this.c.copy(t.c), this;
    }
    getArea() {
      return (
        jt.subVectors(this.c, this.b),
        qt.subVectors(this.a, this.b),
        0.5 * jt.cross(qt).length()
      );
    }
    getMidpoint(t) {
      return (
        void 0 === t &&
          (console.warn(
            "THREE.Triangle: .getMidpoint() target is now required"
          ),
          (t = new k())),
        t
          .addVectors(this.a, this.b)
          .add(this.c)
          .multiplyScalar(1 / 3)
      );
    }
    getNormal(t) {
      return ee.getNormal(this.a, this.b, this.c, t);
    }
    getPlane(t) {
      return (
        void 0 === t &&
          (console.warn("THREE.Triangle: .getPlane() target is now required"),
          (t = new Wt())),
        t.setFromCoplanarPoints(this.a, this.b, this.c)
      );
    }
    getBarycoord(t, e) {
      return ee.getBarycoord(t, this.a, this.b, this.c, e);
    }
    getUV(t, e, n, i, r) {
      return ee.getUV(t, this.a, this.b, this.c, e, n, i, r);
    }
    containsPoint(t) {
      return ee.containsPoint(t, this.a, this.b, this.c);
    }
    isFrontFacing(t) {
      return ee.isFrontFacing(this.a, this.b, this.c, t);
    }
    intersectsBox(t) {
      return t.intersectsTriangle(this);
    }
    closestPointToPoint(t, e) {
      void 0 === e &&
        (console.warn(
          "THREE.Triangle: .closestPointToPoint() target is now required"
        ),
        (e = new k()));
      const n = this.a,
        i = this.b,
        r = this.c;
      let s, o;
      Jt.subVectors(i, n), Zt.subVectors(r, n), Kt.subVectors(t, n);
      const a = Jt.dot(Kt),
        l = Zt.dot(Kt);
      if (a <= 0 && l <= 0) return e.copy(n);
      $t.subVectors(t, i);
      const c = Jt.dot($t),
        h = Zt.dot($t);
      if (c >= 0 && h <= c) return e.copy(i);
      const u = a * h - c * l;
      if (u <= 0 && a >= 0 && c <= 0)
        return (s = a / (a - c)), e.copy(n).addScaledVector(Jt, s);
      te.subVectors(t, r);
      const d = Jt.dot(te),
        p = Zt.dot(te);
      if (p >= 0 && d <= p) return e.copy(r);
      const f = d * l - a * p;
      if (f <= 0 && l >= 0 && p <= 0)
        return (o = l / (l - p)), e.copy(n).addScaledVector(Zt, o);
      const m = c * p - d * h;
      if (m <= 0 && h - c >= 0 && d - p >= 0)
        return (
          Qt.subVectors(r, i),
          (o = (h - c) / (h - c + (d - p))),
          e.copy(i).addScaledVector(Qt, o)
        );
      const g = 1 / (m + f + u);
      return (
        (s = f * g),
        (o = u * g),
        e.copy(n).addScaledVector(Jt, s).addScaledVector(Zt, o)
      );
    }
    equals(t) {
      return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c);
    }
  }
  let ne = 0;
  function ie() {
    Object.defineProperty(this, "id", { value: ne++ }),
      (this.uuid = R.generateUUID()),
      (this.name = ""),
      (this.type = "Material"),
      (this.fog = !0),
      (this.blending = 1),
      (this.side = 0),
      (this.vertexColors = !1),
      (this.opacity = 1),
      (this.transparent = !1),
      (this.blendSrc = 204),
      (this.blendDst = 205),
      (this.blendEquation = t),
      (this.blendSrcAlpha = null),
      (this.blendDstAlpha = null),
      (this.blendEquationAlpha = null),
      (this.depthFunc = 3),
      (this.depthTest = !0),
      (this.depthWrite = !0),
      (this.stencilWriteMask = 255),
      (this.stencilFunc = 519),
      (this.stencilRef = 0),
      (this.stencilFuncMask = 255),
      (this.stencilFail = M),
      (this.stencilZFail = M),
      (this.stencilZPass = M),
      (this.stencilWrite = !1),
      (this.clippingPlanes = null),
      (this.clipIntersection = !1),
      (this.clipShadows = !1),
      (this.shadowSide = null),
      (this.colorWrite = !0),
      (this.precision = null),
      (this.polygonOffset = !1),
      (this.polygonOffsetFactor = 0),
      (this.polygonOffsetUnits = 0),
      (this.dithering = !1),
      (this.alphaTest = 0),
      (this.premultipliedAlpha = !1),
      (this.visible = !0),
      (this.toneMapped = !0),
      (this.userData = {}),
      (this.version = 0);
  }
  (ie.prototype = Object.assign(Object.create(A.prototype), {
    constructor: ie,
    isMaterial: !0,
    onBeforeCompile: function () {},
    customProgramCacheKey: function () {
      return this.onBeforeCompile.toString();
    },
    setValues: function (t) {
      if (void 0 !== t)
        for (const e in t) {
          const n = t[e];
          if (void 0 === n) {
            console.warn("THREE.Material: '" + e + "' parameter is undefined.");
            continue;
          }
          if ("shading" === e) {
            console.warn(
              "THREE." +
                this.type +
                ": .shading has been removed. Use the boolean .flatShading instead."
            ),
              (this.flatShading = 1 === n);
            continue;
          }
          const i = this[e];
          void 0 !== i
            ? i && i.isColor
              ? i.set(n)
              : i && i.isVector3 && n && n.isVector3
              ? i.copy(n)
              : (this[e] = n)
            : console.warn(
                "THREE." +
                  this.type +
                  ": '" +
                  e +
                  "' is not a property of this material."
              );
        }
    },
    toJSON: function (t) {
      const e = void 0 === t || "string" == typeof t;
      e && (t = { textures: {}, images: {} });
      const n = {
        metadata: {
          version: 4.5,
          type: "Material",
          generator: "Material.toJSON",
        },
      };
      function i(t) {
        const e = [];
        for (const n in t) {
          const i = t[n];
          delete i.metadata, e.push(i);
        }
        return e;
      }
      if (
        ((n.uuid = this.uuid),
        (n.type = this.type),
        "" !== this.name && (n.name = this.name),
        this.color && this.color.isColor && (n.color = this.color.getHex()),
        void 0 !== this.roughness && (n.roughness = this.roughness),
        void 0 !== this.metalness && (n.metalness = this.metalness),
        this.sheen && this.sheen.isColor && (n.sheen = this.sheen.getHex()),
        this.emissive &&
          this.emissive.isColor &&
          (n.emissive = this.emissive.getHex()),
        this.emissiveIntensity &&
          1 !== this.emissiveIntensity &&
          (n.emissiveIntensity = this.emissiveIntensity),
        this.specular &&
          this.specular.isColor &&
          (n.specular = this.specular.getHex()),
        void 0 !== this.shininess && (n.shininess = this.shininess),
        void 0 !== this.clearcoat && (n.clearcoat = this.clearcoat),
        void 0 !== this.clearcoatRoughness &&
          (n.clearcoatRoughness = this.clearcoatRoughness),
        this.clearcoatMap &&
          this.clearcoatMap.isTexture &&
          (n.clearcoatMap = this.clearcoatMap.toJSON(t).uuid),
        this.clearcoatRoughnessMap &&
          this.clearcoatRoughnessMap.isTexture &&
          (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(t).uuid),
        this.clearcoatNormalMap &&
          this.clearcoatNormalMap.isTexture &&
          ((n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(t).uuid),
          (n.clearcoatNormalScale = this.clearcoatNormalScale.toArray())),
        this.map && this.map.isTexture && (n.map = this.map.toJSON(t).uuid),
        this.matcap &&
          this.matcap.isTexture &&
          (n.matcap = this.matcap.toJSON(t).uuid),
        this.alphaMap &&
          this.alphaMap.isTexture &&
          (n.alphaMap = this.alphaMap.toJSON(t).uuid),
        this.lightMap &&
          this.lightMap.isTexture &&
          ((n.lightMap = this.lightMap.toJSON(t).uuid),
          (n.lightMapIntensity = this.lightMapIntensity)),
        this.aoMap &&
          this.aoMap.isTexture &&
          ((n.aoMap = this.aoMap.toJSON(t).uuid),
          (n.aoMapIntensity = this.aoMapIntensity)),
        this.bumpMap &&
          this.bumpMap.isTexture &&
          ((n.bumpMap = this.bumpMap.toJSON(t).uuid),
          (n.bumpScale = this.bumpScale)),
        this.normalMap &&
          this.normalMap.isTexture &&
          ((n.normalMap = this.normalMap.toJSON(t).uuid),
          (n.normalMapType = this.normalMapType),
          (n.normalScale = this.normalScale.toArray())),
        this.displacementMap &&
          this.displacementMap.isTexture &&
          ((n.displacementMap = this.displacementMap.toJSON(t).uuid),
          (n.displacementScale = this.displacementScale),
          (n.displacementBias = this.displacementBias)),
        this.roughnessMap &&
          this.roughnessMap.isTexture &&
          (n.roughnessMap = this.roughnessMap.toJSON(t).uuid),
        this.metalnessMap &&
          this.metalnessMap.isTexture &&
          (n.metalnessMap = this.metalnessMap.toJSON(t).uuid),
        this.emissiveMap &&
          this.emissiveMap.isTexture &&
          (n.emissiveMap = this.emissiveMap.toJSON(t).uuid),
        this.specularMap &&
          this.specularMap.isTexture &&
          (n.specularMap = this.specularMap.toJSON(t).uuid),
        this.envMap &&
          this.envMap.isTexture &&
          ((n.envMap = this.envMap.toJSON(t).uuid),
          (n.reflectivity = this.reflectivity),
          (n.refractionRatio = this.refractionRatio),
          void 0 !== this.combine && (n.combine = this.combine),
          void 0 !== this.envMapIntensity &&
            (n.envMapIntensity = this.envMapIntensity)),
        this.gradientMap &&
          this.gradientMap.isTexture &&
          (n.gradientMap = this.gradientMap.toJSON(t).uuid),
        void 0 !== this.size && (n.size = this.size),
        void 0 !== this.sizeAttenuation &&
          (n.sizeAttenuation = this.sizeAttenuation),
        1 !== this.blending && (n.blending = this.blending),
        0 !== this.side && (n.side = this.side),
        this.vertexColors && (n.vertexColors = !0),
        this.opacity < 1 && (n.opacity = this.opacity),
        !0 === this.transparent && (n.transparent = this.transparent),
        (n.depthFunc = this.depthFunc),
        (n.depthTest = this.depthTest),
        (n.depthWrite = this.depthWrite),
        (n.stencilWrite = this.stencilWrite),
        (n.stencilWriteMask = this.stencilWriteMask),
        (n.stencilFunc = this.stencilFunc),
        (n.stencilRef = this.stencilRef),
        (n.stencilFuncMask = this.stencilFuncMask),
        (n.stencilFail = this.stencilFail),
        (n.stencilZFail = this.stencilZFail),
        (n.stencilZPass = this.stencilZPass),
        this.rotation && 0 !== this.rotation && (n.rotation = this.rotation),
        !0 === this.polygonOffset && (n.polygonOffset = !0),
        0 !== this.polygonOffsetFactor &&
          (n.polygonOffsetFactor = this.polygonOffsetFactor),
        0 !== this.polygonOffsetUnits &&
          (n.polygonOffsetUnits = this.polygonOffsetUnits),
        this.linewidth &&
          1 !== this.linewidth &&
          (n.linewidth = this.linewidth),
        void 0 !== this.dashSize && (n.dashSize = this.dashSize),
        void 0 !== this.gapSize && (n.gapSize = this.gapSize),
        void 0 !== this.scale && (n.scale = this.scale),
        !0 === this.dithering && (n.dithering = !0),
        this.alphaTest > 0 && (n.alphaTest = this.alphaTest),
        !0 === this.premultipliedAlpha &&
          (n.premultipliedAlpha = this.premultipliedAlpha),
        !0 === this.wireframe && (n.wireframe = this.wireframe),
        this.wireframeLinewidth > 1 &&
          (n.wireframeLinewidth = this.wireframeLinewidth),
        "round" !== this.wireframeLinecap &&
          (n.wireframeLinecap = this.wireframeLinecap),
        "round" !== this.wireframeLinejoin &&
          (n.wireframeLinejoin = this.wireframeLinejoin),
        !0 === this.morphTargets && (n.morphTargets = !0),
        !0 === this.morphNormals && (n.morphNormals = !0),
        !0 === this.skinning && (n.skinning = !0),
        !0 === this.flatShading && (n.flatShading = this.flatShading),
        !1 === this.visible && (n.visible = !1),
        !1 === this.toneMapped && (n.toneMapped = !1),
        "{}" !== JSON.stringify(this.userData) && (n.userData = this.userData),
        e)
      ) {
        const e = i(t.textures),
          r = i(t.images);
        e.length > 0 && (n.textures = e), r.length > 0 && (n.images = r);
      }
      return n;
    },
    clone: function () {
      return new this.constructor().copy(this);
    },
    copy: function (t) {
      (this.name = t.name),
        (this.fog = t.fog),
        (this.blending = t.blending),
        (this.side = t.side),
        (this.vertexColors = t.vertexColors),
        (this.opacity = t.opacity),
        (this.transparent = t.transparent),
        (this.blendSrc = t.blendSrc),
        (this.blendDst = t.blendDst),
        (this.blendEquation = t.blendEquation),
        (this.blendSrcAlpha = t.blendSrcAlpha),
        (this.blendDstAlpha = t.blendDstAlpha),
        (this.blendEquationAlpha = t.blendEquationAlpha),
        (this.depthFunc = t.depthFunc),
        (this.depthTest = t.depthTest),
        (this.depthWrite = t.depthWrite),
        (this.stencilWriteMask = t.stencilWriteMask),
        (this.stencilFunc = t.stencilFunc),
        (this.stencilRef = t.stencilRef),
        (this.stencilFuncMask = t.stencilFuncMask),
        (this.stencilFail = t.stencilFail),
        (this.stencilZFail = t.stencilZFail),
        (this.stencilZPass = t.stencilZPass),
        (this.stencilWrite = t.stencilWrite);
      const e = t.clippingPlanes;
      let n = null;
      if (null !== e) {
        const t = e.length;
        n = new Array(t);
        for (let i = 0; i !== t; ++i) n[i] = e[i].clone();
      }
      return (
        (this.clippingPlanes = n),
        (this.clipIntersection = t.clipIntersection),
        (this.clipShadows = t.clipShadows),
        (this.shadowSide = t.shadowSide),
        (this.colorWrite = t.colorWrite),
        (this.precision = t.precision),
        (this.polygonOffset = t.polygonOffset),
        (this.polygonOffsetFactor = t.polygonOffsetFactor),
        (this.polygonOffsetUnits = t.polygonOffsetUnits),
        (this.dithering = t.dithering),
        (this.alphaTest = t.alphaTest),
        (this.premultipliedAlpha = t.premultipliedAlpha),
        (this.visible = t.visible),
        (this.toneMapped = t.toneMapped),
        (this.userData = JSON.parse(JSON.stringify(t.userData))),
        this
      );
    },
    dispose: function () {
      this.dispatchEvent({ type: "dispose" });
    },
  })),
    Object.defineProperty(ie.prototype, "needsUpdate", {
      set: function (t) {
        !0 === t && this.version++;
      },
    });
  const re = {
      aliceblue: 15792383,
      antiquewhite: 16444375,
      aqua: 65535,
      aquamarine: 8388564,
      azure: 15794175,
      beige: 16119260,
      bisque: 16770244,
      black: 0,
      blanchedalmond: 16772045,
      blue: 255,
      blueviolet: 9055202,
      brown: 10824234,
      burlywood: 14596231,
      cadetblue: 6266528,
      chartreuse: 8388352,
      chocolate: 13789470,
      coral: 16744272,
      cornflowerblue: 6591981,
      cornsilk: 16775388,
      crimson: 14423100,
      cyan: 65535,
      darkblue: 139,
      darkcyan: 35723,
      darkgoldenrod: 12092939,
      darkgray: 11119017,
      darkgreen: 25600,
      darkgrey: 11119017,
      darkkhaki: 12433259,
      darkmagenta: 9109643,
      darkolivegreen: 5597999,
      darkorange: 16747520,
      darkorchid: 10040012,
      darkred: 9109504,
      darksalmon: 15308410,
      darkseagreen: 9419919,
      darkslateblue: 4734347,
      darkslategray: 3100495,
      darkslategrey: 3100495,
      darkturquoise: 52945,
      darkviolet: 9699539,
      deeppink: 16716947,
      deepskyblue: 49151,
      dimgray: 6908265,
      dimgrey: 6908265,
      dodgerblue: 2003199,
      firebrick: 11674146,
      floralwhite: 16775920,
      forestgreen: 2263842,
      fuchsia: 16711935,
      gainsboro: 14474460,
      ghostwhite: 16316671,
      gold: 16766720,
      goldenrod: 14329120,
      gray: 8421504,
      green: 32768,
      greenyellow: 11403055,
      grey: 8421504,
      honeydew: 15794160,
      hotpink: 16738740,
      indianred: 13458524,
      indigo: 4915330,
      ivory: 16777200,
      khaki: 15787660,
      lavender: 15132410,
      lavenderblush: 16773365,
      lawngreen: 8190976,
      lemonchiffon: 16775885,
      lightblue: 11393254,
      lightcoral: 15761536,
      lightcyan: 14745599,
      lightgoldenrodyellow: 16448210,
      lightgray: 13882323,
      lightgreen: 9498256,
      lightgrey: 13882323,
      lightpink: 16758465,
      lightsalmon: 16752762,
      lightseagreen: 2142890,
      lightskyblue: 8900346,
      lightslategray: 7833753,
      lightslategrey: 7833753,
      lightsteelblue: 11584734,
      lightyellow: 16777184,
      lime: 65280,
      limegreen: 3329330,
      linen: 16445670,
      magenta: 16711935,
      maroon: 8388608,
      mediumaquamarine: 6737322,
      mediumblue: 205,
      mediumorchid: 12211667,
      mediumpurple: 9662683,
      mediumseagreen: 3978097,
      mediumslateblue: 8087790,
      mediumspringgreen: 64154,
      mediumturquoise: 4772300,
      mediumvioletred: 13047173,
      midnightblue: 1644912,
      mintcream: 16121850,
      mistyrose: 16770273,
      moccasin: 16770229,
      navajowhite: 16768685,
      navy: 128,
      oldlace: 16643558,
      olive: 8421376,
      olivedrab: 7048739,
      orange: 16753920,
      orangered: 16729344,
      orchid: 14315734,
      palegoldenrod: 15657130,
      palegreen: 10025880,
      paleturquoise: 11529966,
      palevioletred: 14381203,
      papayawhip: 16773077,
      peachpuff: 16767673,
      peru: 13468991,
      pink: 16761035,
      plum: 14524637,
      powderblue: 11591910,
      purple: 8388736,
      rebeccapurple: 6697881,
      red: 16711680,
      rosybrown: 12357519,
      royalblue: 4286945,
      saddlebrown: 9127187,
      salmon: 16416882,
      sandybrown: 16032864,
      seagreen: 3050327,
      seashell: 16774638,
      sienna: 10506797,
      silver: 12632256,
      skyblue: 8900331,
      slateblue: 6970061,
      slategray: 7372944,
      slategrey: 7372944,
      snow: 16775930,
      springgreen: 65407,
      steelblue: 4620980,
      tan: 13808780,
      teal: 32896,
      thistle: 14204888,
      tomato: 16737095,
      turquoise: 4251856,
      violet: 15631086,
      wheat: 16113331,
      white: 16777215,
      whitesmoke: 16119285,
      yellow: 16776960,
      yellowgreen: 10145074,
    },
    se = { h: 0, s: 0, l: 0 },
    oe = { h: 0, s: 0, l: 0 };
  function ae(t, e, n) {
    return (
      n < 0 && (n += 1),
      n > 1 && (n -= 1),
      n < 1 / 6
        ? t + 6 * (e - t) * n
        : n < 0.5
        ? e
        : n < 2 / 3
        ? t + 6 * (e - t) * (2 / 3 - n)
        : t
    );
  }
  function le(t) {
    return t < 0.04045
      ? 0.0773993808 * t
      : Math.pow(0.9478672986 * t + 0.0521327014, 2.4);
  }
  function ce(t) {
    return t < 0.0031308 ? 12.92 * t : 1.055 * Math.pow(t, 0.41666) - 0.055;
  }
  class he {
    constructor(t, e, n) {
      return void 0 === e && void 0 === n ? this.set(t) : this.setRGB(t, e, n);
    }
    set(t) {
      return (
        t && t.isColor
          ? this.copy(t)
          : "number" == typeof t
          ? this.setHex(t)
          : "string" == typeof t && this.setStyle(t),
        this
      );
    }
    setScalar(t) {
      return (this.r = t), (this.g = t), (this.b = t), this;
    }
    setHex(t) {
      return (
        (t = Math.floor(t)),
        (this.r = ((t >> 16) & 255) / 255),
        (this.g = ((t >> 8) & 255) / 255),
        (this.b = (255 & t) / 255),
        this
      );
    }
    setRGB(t, e, n) {
      return (this.r = t), (this.g = e), (this.b = n), this;
    }
    setHSL(t, e, n) {
      if (
        ((t = R.euclideanModulo(t, 1)),
        (e = R.clamp(e, 0, 1)),
        (n = R.clamp(n, 0, 1)),
        0 === e)
      )
        this.r = this.g = this.b = n;
      else {
        const i = n <= 0.5 ? n * (1 + e) : n + e - n * e,
          r = 2 * n - i;
        (this.r = ae(r, i, t + 1 / 3)),
          (this.g = ae(r, i, t)),
          (this.b = ae(r, i, t - 1 / 3));
      }
      return this;
    }
    setStyle(t) {
      function e(e) {
        void 0 !== e &&
          parseFloat(e) < 1 &&
          console.warn(
            "THREE.Color: Alpha component of " + t + " will be ignored."
          );
      }
      let n;
      if ((n = /^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(t))) {
        let t;
        const i = n[1],
          r = n[2];
        switch (i) {
          case "rgb":
          case "rgba":
            if (
              (t =
                /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
                  r
                ))
            )
              return (
                (this.r = Math.min(255, parseInt(t[1], 10)) / 255),
                (this.g = Math.min(255, parseInt(t[2], 10)) / 255),
                (this.b = Math.min(255, parseInt(t[3], 10)) / 255),
                e(t[4]),
                this
              );
            if (
              (t =
                /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
                  r
                ))
            )
              return (
                (this.r = Math.min(100, parseInt(t[1], 10)) / 100),
                (this.g = Math.min(100, parseInt(t[2], 10)) / 100),
                (this.b = Math.min(100, parseInt(t[3], 10)) / 100),
                e(t[4]),
                this
              );
            break;
          case "hsl":
          case "hsla":
            if (
              (t =
                /^\s*(\d*\.?\d+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
                  r
                ))
            ) {
              const n = parseFloat(t[1]) / 360,
                i = parseInt(t[2], 10) / 100,
                r = parseInt(t[3], 10) / 100;
              return e(t[4]), this.setHSL(n, i, r);
            }
        }
      } else if ((n = /^\#([A-Fa-f\d]+)$/.exec(t))) {
        const t = n[1],
          e = t.length;
        if (3 === e)
          return (
            (this.r = parseInt(t.charAt(0) + t.charAt(0), 16) / 255),
            (this.g = parseInt(t.charAt(1) + t.charAt(1), 16) / 255),
            (this.b = parseInt(t.charAt(2) + t.charAt(2), 16) / 255),
            this
          );
        if (6 === e)
          return (
            (this.r = parseInt(t.charAt(0) + t.charAt(1), 16) / 255),
            (this.g = parseInt(t.charAt(2) + t.charAt(3), 16) / 255),
            (this.b = parseInt(t.charAt(4) + t.charAt(5), 16) / 255),
            this
          );
      }
      return t && t.length > 0 ? this.setColorName(t) : this;
    }
    setColorName(t) {
      const e = re[t];
      return (
        void 0 !== e
          ? this.setHex(e)
          : console.warn("THREE.Color: Unknown color " + t),
        this
      );
    }
    clone() {
      return new this.constructor(this.r, this.g, this.b);
    }
    copy(t) {
      return (this.r = t.r), (this.g = t.g), (this.b = t.b), this;
    }
    copyGammaToLinear(t, e = 2) {
      return (
        (this.r = Math.pow(t.r, e)),
        (this.g = Math.pow(t.g, e)),
        (this.b = Math.pow(t.b, e)),
        this
      );
    }
    copyLinearToGamma(t, e = 2) {
      const n = e > 0 ? 1 / e : 1;
      return (
        (this.r = Math.pow(t.r, n)),
        (this.g = Math.pow(t.g, n)),
        (this.b = Math.pow(t.b, n)),
        this
      );
    }
    convertGammaToLinear(t) {
      return this.copyGammaToLinear(this, t), this;
    }
    convertLinearToGamma(t) {
      return this.copyLinearToGamma(this, t), this;
    }
    copySRGBToLinear(t) {
      return (this.r = le(t.r)), (this.g = le(t.g)), (this.b = le(t.b)), this;
    }
    copyLinearToSRGB(t) {
      return (this.r = ce(t.r)), (this.g = ce(t.g)), (this.b = ce(t.b)), this;
    }
    convertSRGBToLinear() {
      return this.copySRGBToLinear(this), this;
    }
    convertLinearToSRGB() {
      return this.copyLinearToSRGB(this), this;
    }
    getHex() {
      return (
        ((255 * this.r) << 16) ^ ((255 * this.g) << 8) ^ ((255 * this.b) << 0)
      );
    }
    getHexString() {
      return ("000000" + this.getHex().toString(16)).slice(-6);
    }
    getHSL(t) {
      void 0 === t &&
        (console.warn("THREE.Color: .getHSL() target is now required"),
        (t = { h: 0, s: 0, l: 0 }));
      const e = this.r,
        n = this.g,
        i = this.b,
        r = Math.max(e, n, i),
        s = Math.min(e, n, i);
      let o, a;
      const l = (s + r) / 2;
      if (s === r) (o = 0), (a = 0);
      else {
        const t = r - s;
        switch (((a = l <= 0.5 ? t / (r + s) : t / (2 - r - s)), r)) {
          case e:
            o = (n - i) / t + (n < i ? 6 : 0);
            break;
          case n:
            o = (i - e) / t + 2;
            break;
          case i:
            o = (e - n) / t + 4;
        }
        o /= 6;
      }
      return (t.h = o), (t.s = a), (t.l = l), t;
    }
    getStyle() {
      return (
        "rgb(" +
        ((255 * this.r) | 0) +
        "," +
        ((255 * this.g) | 0) +
        "," +
        ((255 * this.b) | 0) +
        ")"
      );
    }
    offsetHSL(t, e, n) {
      return (
        this.getHSL(se),
        (se.h += t),
        (se.s += e),
        (se.l += n),
        this.setHSL(se.h, se.s, se.l),
        this
      );
    }
    add(t) {
      return (this.r += t.r), (this.g += t.g), (this.b += t.b), this;
    }
    addColors(t, e) {
      return (
        (this.r = t.r + e.r), (this.g = t.g + e.g), (this.b = t.b + e.b), this
      );
    }
    addScalar(t) {
      return (this.r += t), (this.g += t), (this.b += t), this;
    }
    sub(t) {
      return (
        (this.r = Math.max(0, this.r - t.r)),
        (this.g = Math.max(0, this.g - t.g)),
        (this.b = Math.max(0, this.b - t.b)),
        this
      );
    }
    multiply(t) {
      return (this.r *= t.r), (this.g *= t.g), (this.b *= t.b), this;
    }
    multiplyScalar(t) {
      return (this.r *= t), (this.g *= t), (this.b *= t), this;
    }
    lerp(t, e) {
      return (
        (this.r += (t.r - this.r) * e),
        (this.g += (t.g - this.g) * e),
        (this.b += (t.b - this.b) * e),
        this
      );
    }
    lerpColors(t, e, n) {
      return (
        (this.r = t.r + (e.r - t.r) * n),
        (this.g = t.g + (e.g - t.g) * n),
        (this.b = t.b + (e.b - t.b) * n),
        this
      );
    }
    lerpHSL(t, e) {
      this.getHSL(se), t.getHSL(oe);
      const n = R.lerp(se.h, oe.h, e),
        i = R.lerp(se.s, oe.s, e),
        r = R.lerp(se.l, oe.l, e);
      return this.setHSL(n, i, r), this;
    }
    equals(t) {
      return t.r === this.r && t.g === this.g && t.b === this.b;
    }
    fromArray(t, e = 0) {
      return (this.r = t[e]), (this.g = t[e + 1]), (this.b = t[e + 2]), this;
    }
    toArray(t = [], e = 0) {
      return (t[e] = this.r), (t[e + 1] = this.g), (t[e + 2] = this.b), t;
    }
    fromBufferAttribute(t, e) {
      return (
        (this.r = t.getX(e)),
        (this.g = t.getY(e)),
        (this.b = t.getZ(e)),
        !0 === t.normalized &&
          ((this.r /= 255), (this.g /= 255), (this.b /= 255)),
        this
      );
    }
    toJSON() {
      return this.getHex();
    }
  }
  (he.NAMES = re),
    (he.prototype.isColor = !0),
    (he.prototype.r = 1),
    (he.prototype.g = 1),
    (he.prototype.b = 1);
  class ue extends ie {
    constructor(t) {
      super(),
        (this.type = "MeshBasicMaterial"),
        (this.color = new he(16777215)),
        (this.map = null),
        (this.lightMap = null),
        (this.lightMapIntensity = 1),
        (this.aoMap = null),
        (this.aoMapIntensity = 1),
        (this.specularMap = null),
        (this.alphaMap = null),
        (this.envMap = null),
        (this.combine = 0),
        (this.reflectivity = 1),
        (this.refractionRatio = 0.98),
        (this.wireframe = !1),
        (this.wireframeLinewidth = 1),
        (this.wireframeLinecap = "round"),
        (this.wireframeLinejoin = "round"),
        (this.skinning = !1),
        (this.morphTargets = !1),
        this.setValues(t);
    }
    copy(t) {
      return (
        super.copy(t),
        this.color.copy(t.color),
        (this.map = t.map),
        (this.lightMap = t.lightMap),
        (this.lightMapIntensity = t.lightMapIntensity),
        (this.aoMap = t.aoMap),
        (this.aoMapIntensity = t.aoMapIntensity),
        (this.specularMap = t.specularMap),
        (this.alphaMap = t.alphaMap),
        (this.envMap = t.envMap),
        (this.combine = t.combine),
        (this.reflectivity = t.reflectivity),
        (this.refractionRatio = t.refractionRatio),
        (this.wireframe = t.wireframe),
        (this.wireframeLinewidth = t.wireframeLinewidth),
        (this.wireframeLinecap = t.wireframeLinecap),
        (this.wireframeLinejoin = t.wireframeLinejoin),
        (this.skinning = t.skinning),
        (this.morphTargets = t.morphTargets),
        this
      );
    }
  }
  ue.prototype.isMeshBasicMaterial = !0;
  const de = new k(),
    pe = new P();
  function fe(t, e, n) {
    if (Array.isArray(t))
      throw new TypeError(
        "THREE.BufferAttribute: array should be a Typed Array."
      );
    (this.name = ""),
      (this.array = t),
      (this.itemSize = e),
      (this.count = void 0 !== t ? t.length / e : 0),
      (this.normalized = !0 === n),
      (this.usage = S),
      (this.updateRange = { offset: 0, count: -1 }),
      (this.version = 0);
  }
  function me(t, e, n) {
    fe.call(this, new Int8Array(t), e, n);
  }
  function ge(t, e, n) {
    fe.call(this, new Uint8Array(t), e, n);
  }
  function ve(t, e, n) {
    fe.call(this, new Uint8ClampedArray(t), e, n);
  }
  function _e(t, e, n) {
    fe.call(this, new Int16Array(t), e, n);
  }
  function ye(t, e, n) {
    fe.call(this, new Uint16Array(t), e, n);
  }
  function xe(t, e, n) {
    fe.call(this, new Int32Array(t), e, n);
  }
  function be(t, e, n) {
    fe.call(this, new Uint32Array(t), e, n);
  }
  function we(t, e, n) {
    fe.call(this, new Uint16Array(t), e, n);
  }
  function Me(t, e, n) {
    fe.call(this, new Float32Array(t), e, n);
  }
  function Se(t, e, n) {
    fe.call(this, new Float64Array(t), e, n);
  }
  function Ee(t) {
    if (0 === t.length) return -1 / 0;
    let e = t[0];
    for (let n = 1, i = t.length; n < i; ++n) t[n] > e && (e = t[n]);
    return e;
  }
  Object.defineProperty(fe.prototype, "needsUpdate", {
    set: function (t) {
      !0 === t && this.version++;
    },
  }),
    Object.assign(fe.prototype, {
      isBufferAttribute: !0,
      onUploadCallback: function () {},
      setUsage: function (t) {
        return (this.usage = t), this;
      },
      copy: function (t) {
        return (
          (this.name = t.name),
          (this.array = new t.array.constructor(t.array)),
          (this.itemSize = t.itemSize),
          (this.count = t.count),
          (this.normalized = t.normalized),
          (this.usage = t.usage),
          this
        );
      },
      copyAt: function (t, e, n) {
        (t *= this.itemSize), (n *= e.itemSize);
        for (let i = 0, r = this.itemSize; i < r; i++)
          this.array[t + i] = e.array[n + i];
        return this;
      },
      copyArray: function (t) {
        return this.array.set(t), this;
      },
      copyColorsArray: function (t) {
        const e = this.array;
        let n = 0;
        for (let i = 0, r = t.length; i < r; i++) {
          let r = t[i];
          void 0 === r &&
            (console.warn(
              "THREE.BufferAttribute.copyColorsArray(): color is undefined",
              i
            ),
            (r = new he())),
            (e[n++] = r.r),
            (e[n++] = r.g),
            (e[n++] = r.b);
        }
        return this;
      },
      copyVector2sArray: function (t) {
        const e = this.array;
        let n = 0;
        for (let i = 0, r = t.length; i < r; i++) {
          let r = t[i];
          void 0 === r &&
            (console.warn(
              "THREE.BufferAttribute.copyVector2sArray(): vector is undefined",
              i
            ),
            (r = new P())),
            (e[n++] = r.x),
            (e[n++] = r.y);
        }
        return this;
      },
      copyVector3sArray: function (t) {
        const e = this.array;
        let n = 0;
        for (let i = 0, r = t.length; i < r; i++) {
          let r = t[i];
          void 0 === r &&
            (console.warn(
              "THREE.BufferAttribute.copyVector3sArray(): vector is undefined",
              i
            ),
            (r = new k())),
            (e[n++] = r.x),
            (e[n++] = r.y),
            (e[n++] = r.z);
        }
        return this;
      },
      copyVector4sArray: function (t) {
        const e = this.array;
        let n = 0;
        for (let i = 0, r = t.length; i < r; i++) {
          let r = t[i];
          void 0 === r &&
            (console.warn(
              "THREE.BufferAttribute.copyVector4sArray(): vector is undefined",
              i
            ),
            (r = new H())),
            (e[n++] = r.x),
            (e[n++] = r.y),
            (e[n++] = r.z),
            (e[n++] = r.w);
        }
        return this;
      },
      applyMatrix3: function (t) {
        if (2 === this.itemSize)
          for (let e = 0, n = this.count; e < n; e++)
            pe.fromBufferAttribute(this, e),
              pe.applyMatrix3(t),
              this.setXY(e, pe.x, pe.y);
        else if (3 === this.itemSize)
          for (let e = 0, n = this.count; e < n; e++)
            de.fromBufferAttribute(this, e),
              de.applyMatrix3(t),
              this.setXYZ(e, de.x, de.y, de.z);
        return this;
      },
      applyMatrix4: function (t) {
        for (let e = 0, n = this.count; e < n; e++)
          (de.x = this.getX(e)),
            (de.y = this.getY(e)),
            (de.z = this.getZ(e)),
            de.applyMatrix4(t),
            this.setXYZ(e, de.x, de.y, de.z);
        return this;
      },
      applyNormalMatrix: function (t) {
        for (let e = 0, n = this.count; e < n; e++)
          (de.x = this.getX(e)),
            (de.y = this.getY(e)),
            (de.z = this.getZ(e)),
            de.applyNormalMatrix(t),
            this.setXYZ(e, de.x, de.y, de.z);
        return this;
      },
      transformDirection: function (t) {
        for (let e = 0, n = this.count; e < n; e++)
          (de.x = this.getX(e)),
            (de.y = this.getY(e)),
            (de.z = this.getZ(e)),
            de.transformDirection(t),
            this.setXYZ(e, de.x, de.y, de.z);
        return this;
      },
      set: function (t, e = 0) {
        return this.array.set(t, e), this;
      },
      getX: function (t) {
        return this.array[t * this.itemSize];
      },
      setX: function (t, e) {
        return (this.array[t * this.itemSize] = e), this;
      },
      getY: function (t) {
        return this.array[t * this.itemSize + 1];
      },
      setY: function (t, e) {
        return (this.array[t * this.itemSize + 1] = e), this;
      },
      getZ: function (t) {
        return this.array[t * this.itemSize + 2];
      },
      setZ: function (t, e) {
        return (this.array[t * this.itemSize + 2] = e), this;
      },
      getW: function (t) {
        return this.array[t * this.itemSize + 3];
      },
      setW: function (t, e) {
        return (this.array[t * this.itemSize + 3] = e), this;
      },
      setXY: function (t, e, n) {
        return (
          (t *= this.itemSize),
          (this.array[t + 0] = e),
          (this.array[t + 1] = n),
          this
        );
      },
      setXYZ: function (t, e, n, i) {
        return (
          (t *= this.itemSize),
          (this.array[t + 0] = e),
          (this.array[t + 1] = n),
          (this.array[t + 2] = i),
          this
        );
      },
      setXYZW: function (t, e, n, i, r) {
        return (
          (t *= this.itemSize),
          (this.array[t + 0] = e),
          (this.array[t + 1] = n),
          (this.array[t + 2] = i),
          (this.array[t + 3] = r),
          this
        );
      },
      onUpload: function (t) {
        return (this.onUploadCallback = t), this;
      },
      clone: function () {
        return new this.constructor(this.array, this.itemSize).copy(this);
      },
      toJSON: function () {
        return {
          itemSize: this.itemSize,
          type: this.array.constructor.name,
          array: Array.prototype.slice.call(this.array),
          normalized: this.normalized,
        };
      },
    }),
    (me.prototype = Object.create(fe.prototype)),
    (me.prototype.constructor = me),
    (ge.prototype = Object.create(fe.prototype)),
    (ge.prototype.constructor = ge),
    (ve.prototype = Object.create(fe.prototype)),
    (ve.prototype.constructor = ve),
    (_e.prototype = Object.create(fe.prototype)),
    (_e.prototype.constructor = _e),
    (ye.prototype = Object.create(fe.prototype)),
    (ye.prototype.constructor = ye),
    (xe.prototype = Object.create(fe.prototype)),
    (xe.prototype.constructor = xe),
    (be.prototype = Object.create(fe.prototype)),
    (be.prototype.constructor = be),
    (we.prototype = Object.create(fe.prototype)),
    (we.prototype.constructor = we),
    (we.prototype.isFloat16BufferAttribute = !0),
    (Me.prototype = Object.create(fe.prototype)),
    (Me.prototype.constructor = Me),
    (Se.prototype = Object.create(fe.prototype)),
    (Se.prototype.constructor = Se),
    Int8Array,
    Uint8Array,
    Uint8ClampedArray,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array;
  let Te = 0;
  const Ae = new mt(),
    Le = new Ut(),
    Ce = new k(),
    Re = new W(),
    Pe = new W(),
    De = new k();
  function Ie() {
    Object.defineProperty(this, "id", { value: Te++ }),
      (this.uuid = R.generateUUID()),
      (this.name = ""),
      (this.type = "BufferGeometry"),
      (this.index = null),
      (this.attributes = {}),
      (this.morphAttributes = {}),
      (this.morphTargetsRelative = !1),
      (this.groups = []),
      (this.boundingBox = null),
      (this.boundingSphere = null),
      (this.drawRange = { start: 0, count: 1 / 0 }),
      (this.userData = {});
  }
  Ie.prototype = Object.assign(Object.create(A.prototype), {
    constructor: Ie,
    isBufferGeometry: !0,
    getIndex: function () {
      return this.index;
    },
    setIndex: function (t) {
      return (
        Array.isArray(t)
          ? (this.index = new (Ee(t) > 65535 ? be : ye)(t, 1))
          : (this.index = t),
        this
      );
    },
    getAttribute: function (t) {
      return this.attributes[t];
    },
    setAttribute: function (t, e) {
      return (this.attributes[t] = e), this;
    },
    deleteAttribute: function (t) {
      return delete this.attributes[t], this;
    },
    hasAttribute: function (t) {
      return void 0 !== this.attributes[t];
    },
    addGroup: function (t, e, n = 0) {
      this.groups.push({ start: t, count: e, materialIndex: n });
    },
    clearGroups: function () {
      this.groups = [];
    },
    setDrawRange: function (t, e) {
      (this.drawRange.start = t), (this.drawRange.count = e);
    },
    applyMatrix4: function (t) {
      const e = this.attributes.position;
      void 0 !== e && (e.applyMatrix4(t), (e.needsUpdate = !0));
      const n = this.attributes.normal;
      if (void 0 !== n) {
        const e = new D().getNormalMatrix(t);
        n.applyNormalMatrix(e), (n.needsUpdate = !0);
      }
      const i = this.attributes.tangent;
      return (
        void 0 !== i && (i.transformDirection(t), (i.needsUpdate = !0)),
        null !== this.boundingBox && this.computeBoundingBox(),
        null !== this.boundingSphere && this.computeBoundingSphere(),
        this
      );
    },
    rotateX: function (t) {
      return Ae.makeRotationX(t), this.applyMatrix4(Ae), this;
    },
    rotateY: function (t) {
      return Ae.makeRotationY(t), this.applyMatrix4(Ae), this;
    },
    rotateZ: function (t) {
      return Ae.makeRotationZ(t), this.applyMatrix4(Ae), this;
    },
    translate: function (t, e, n) {
      return Ae.makeTranslation(t, e, n), this.applyMatrix4(Ae), this;
    },
    scale: function (t, e, n) {
      return Ae.makeScale(t, e, n), this.applyMatrix4(Ae), this;
    },
    lookAt: function (t) {
      return (
        Le.lookAt(t), Le.updateMatrix(), this.applyMatrix4(Le.matrix), this
      );
    },
    center: function () {
      return (
        this.computeBoundingBox(),
        this.boundingBox.getCenter(Ce).negate(),
        this.translate(Ce.x, Ce.y, Ce.z),
        this
      );
    },
    setFromPoints: function (t) {
      const e = [];
      for (let n = 0, i = t.length; n < i; n++) {
        const i = t[n];
        e.push(i.x, i.y, i.z || 0);
      }
      return this.setAttribute("position", new Me(e, 3)), this;
    },
    computeBoundingBox: function () {
      null === this.boundingBox && (this.boundingBox = new W());
      const t = this.attributes.position,
        e = this.morphAttributes.position;
      if (t && t.isGLBufferAttribute)
        return (
          console.error(
            'THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',
            this
          ),
          void this.boundingBox.set(
            new k(-1 / 0, -1 / 0, -1 / 0),
            new k(1 / 0, 1 / 0, 1 / 0)
          )
        );
      if (void 0 !== t) {
        if ((this.boundingBox.setFromBufferAttribute(t), e))
          for (let t = 0, n = e.length; t < n; t++) {
            const n = e[t];
            Re.setFromBufferAttribute(n),
              this.morphTargetsRelative
                ? (De.addVectors(this.boundingBox.min, Re.min),
                  this.boundingBox.expandByPoint(De),
                  De.addVectors(this.boundingBox.max, Re.max),
                  this.boundingBox.expandByPoint(De))
                : (this.boundingBox.expandByPoint(Re.min),
                  this.boundingBox.expandByPoint(Re.max));
          }
      } else this.boundingBox.makeEmpty();
      (isNaN(this.boundingBox.min.x) ||
        isNaN(this.boundingBox.min.y) ||
        isNaN(this.boundingBox.min.z)) &&
        console.error(
          'THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',
          this
        );
    },
    computeBoundingSphere: function () {
      null === this.boundingSphere && (this.boundingSphere = new ot());
      const t = this.attributes.position,
        e = this.morphAttributes.position;
      if (t && t.isGLBufferAttribute)
        return (
          console.error(
            'THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',
            this
          ),
          void this.boundingSphere.set(new k(), 1 / 0)
        );
      if (t) {
        const n = this.boundingSphere.center;
        if ((Re.setFromBufferAttribute(t), e))
          for (let t = 0, n = e.length; t < n; t++) {
            const n = e[t];
            Pe.setFromBufferAttribute(n),
              this.morphTargetsRelative
                ? (De.addVectors(Re.min, Pe.min),
                  Re.expandByPoint(De),
                  De.addVectors(Re.max, Pe.max),
                  Re.expandByPoint(De))
                : (Re.expandByPoint(Pe.min), Re.expandByPoint(Pe.max));
          }
        Re.getCenter(n);
        let i = 0;
        for (let e = 0, r = t.count; e < r; e++)
          De.fromBufferAttribute(t, e),
            (i = Math.max(i, n.distanceToSquared(De)));
        if (e)
          for (let r = 0, s = e.length; r < s; r++) {
            const s = e[r],
              o = this.morphTargetsRelative;
            for (let e = 0, r = s.count; e < r; e++)
              De.fromBufferAttribute(s, e),
                o && (Ce.fromBufferAttribute(t, e), De.add(Ce)),
                (i = Math.max(i, n.distanceToSquared(De)));
          }
        (this.boundingSphere.radius = Math.sqrt(i)),
          isNaN(this.boundingSphere.radius) &&
            console.error(
              'THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',
              this
            );
      }
    },
    computeFaceNormals: function () {},
    computeTangents: function () {
      const t = this.index,
        e = this.attributes;
      if (
        null === t ||
        void 0 === e.position ||
        void 0 === e.normal ||
        void 0 === e.uv
      )
        return void console.error(
          "THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)"
        );
      const n = t.array,
        i = e.position.array,
        r = e.normal.array,
        s = e.uv.array,
        o = i.length / 3;
      void 0 === e.tangent &&
        this.setAttribute("tangent", new fe(new Float32Array(4 * o), 4));
      const a = e.tangent.array,
        l = [],
        c = [];
      for (let t = 0; t < o; t++) (l[t] = new k()), (c[t] = new k());
      const h = new k(),
        u = new k(),
        d = new k(),
        p = new P(),
        f = new P(),
        m = new P(),
        g = new k(),
        v = new k();
      function _(t, e, n) {
        h.fromArray(i, 3 * t),
          u.fromArray(i, 3 * e),
          d.fromArray(i, 3 * n),
          p.fromArray(s, 2 * t),
          f.fromArray(s, 2 * e),
          m.fromArray(s, 2 * n),
          u.sub(h),
          d.sub(h),
          f.sub(p),
          m.sub(p);
        const r = 1 / (f.x * m.y - m.x * f.y);
        isFinite(r) &&
          (g
            .copy(u)
            .multiplyScalar(m.y)
            .addScaledVector(d, -f.y)
            .multiplyScalar(r),
          v
            .copy(d)
            .multiplyScalar(f.x)
            .addScaledVector(u, -m.x)
            .multiplyScalar(r),
          l[t].add(g),
          l[e].add(g),
          l[n].add(g),
          c[t].add(v),
          c[e].add(v),
          c[n].add(v));
      }
      let y = this.groups;
      0 === y.length && (y = [{ start: 0, count: n.length }]);
      for (let t = 0, e = y.length; t < e; ++t) {
        const e = y[t],
          i = e.start;
        for (let t = i, r = i + e.count; t < r; t += 3)
          _(n[t + 0], n[t + 1], n[t + 2]);
      }
      const x = new k(),
        b = new k(),
        w = new k(),
        M = new k();
      function S(t) {
        w.fromArray(r, 3 * t), M.copy(w);
        const e = l[t];
        x.copy(e),
          x.sub(w.multiplyScalar(w.dot(e))).normalize(),
          b.crossVectors(M, e);
        const n = b.dot(c[t]) < 0 ? -1 : 1;
        (a[4 * t] = x.x),
          (a[4 * t + 1] = x.y),
          (a[4 * t + 2] = x.z),
          (a[4 * t + 3] = n);
      }
      for (let t = 0, e = y.length; t < e; ++t) {
        const e = y[t],
          i = e.start;
        for (let t = i, r = i + e.count; t < r; t += 3)
          S(n[t + 0]), S(n[t + 1]), S(n[t + 2]);
      }
    },
    computeVertexNormals: function () {
      const t = this.index,
        e = this.getAttribute("position");
      if (void 0 !== e) {
        let n = this.getAttribute("normal");
        if (void 0 === n)
          (n = new fe(new Float32Array(3 * e.count), 3)),
            this.setAttribute("normal", n);
        else for (let t = 0, e = n.count; t < e; t++) n.setXYZ(t, 0, 0, 0);
        const i = new k(),
          r = new k(),
          s = new k(),
          o = new k(),
          a = new k(),
          l = new k(),
          c = new k(),
          h = new k();
        if (t)
          for (let u = 0, d = t.count; u < d; u += 3) {
            const d = t.getX(u + 0),
              p = t.getX(u + 1),
              f = t.getX(u + 2);
            i.fromBufferAttribute(e, d),
              r.fromBufferAttribute(e, p),
              s.fromBufferAttribute(e, f),
              c.subVectors(s, r),
              h.subVectors(i, r),
              c.cross(h),
              o.fromBufferAttribute(n, d),
              a.fromBufferAttribute(n, p),
              l.fromBufferAttribute(n, f),
              o.add(c),
              a.add(c),
              l.add(c),
              n.setXYZ(d, o.x, o.y, o.z),
              n.setXYZ(p, a.x, a.y, a.z),
              n.setXYZ(f, l.x, l.y, l.z);
          }
        else
          for (let t = 0, o = e.count; t < o; t += 3)
            i.fromBufferAttribute(e, t + 0),
              r.fromBufferAttribute(e, t + 1),
              s.fromBufferAttribute(e, t + 2),
              c.subVectors(s, r),
              h.subVectors(i, r),
              c.cross(h),
              n.setXYZ(t + 0, c.x, c.y, c.z),
              n.setXYZ(t + 1, c.x, c.y, c.z),
              n.setXYZ(t + 2, c.x, c.y, c.z);
        this.normalizeNormals(), (n.needsUpdate = !0);
      }
    },
    merge: function (t, e) {
      if (!t || !t.isBufferGeometry)
        return void console.error(
          "THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.",
          t
        );
      void 0 === e &&
        ((e = 0),
        console.warn(
          "THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge."
        ));
      const n = this.attributes;
      for (const i in n) {
        if (void 0 === t.attributes[i]) continue;
        const r = n[i].array,
          s = t.attributes[i],
          o = s.array,
          a = s.itemSize * e,
          l = Math.min(o.length, r.length - a);
        for (let t = 0, e = a; t < l; t++, e++) r[e] = o[t];
      }
      return this;
    },
    normalizeNormals: function () {
      const t = this.attributes.normal;
      for (let e = 0, n = t.count; e < n; e++)
        De.fromBufferAttribute(t, e),
          De.normalize(),
          t.setXYZ(e, De.x, De.y, De.z);
    },
    toNonIndexed: function () {
      function t(t, e) {
        const n = t.array,
          i = t.itemSize,
          r = t.normalized,
          s = new n.constructor(e.length * i);
        let o = 0,
          a = 0;
        for (let t = 0, r = e.length; t < r; t++) {
          o = e[t] * i;
          for (let t = 0; t < i; t++) s[a++] = n[o++];
        }
        return new fe(s, i, r);
      }
      if (null === this.index)
        return (
          console.warn(
            "THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."
          ),
          this
        );
      const e = new Ie(),
        n = this.index.array,
        i = this.attributes;
      for (const r in i) {
        const s = t(i[r], n);
        e.setAttribute(r, s);
      }
      const r = this.morphAttributes;
      for (const i in r) {
        const s = [],
          o = r[i];
        for (let e = 0, i = o.length; e < i; e++) {
          const i = t(o[e], n);
          s.push(i);
        }
        e.morphAttributes[i] = s;
      }
      e.morphTargetsRelative = this.morphTargetsRelative;
      const s = this.groups;
      for (let t = 0, n = s.length; t < n; t++) {
        const n = s[t];
        e.addGroup(n.start, n.count, n.materialIndex);
      }
      return e;
    },
    toJSON: function () {
      const t = {
        metadata: {
          version: 4.5,
          type: "BufferGeometry",
          generator: "BufferGeometry.toJSON",
        },
      };
      if (
        ((t.uuid = this.uuid),
        (t.type = this.type),
        "" !== this.name && (t.name = this.name),
        Object.keys(this.userData).length > 0 && (t.userData = this.userData),
        void 0 !== this.parameters)
      ) {
        const e = this.parameters;
        for (const n in e) void 0 !== e[n] && (t[n] = e[n]);
        return t;
      }
      t.data = { attributes: {} };
      const e = this.index;
      null !== e &&
        (t.data.index = {
          type: e.array.constructor.name,
          array: Array.prototype.slice.call(e.array),
        });
      const n = this.attributes;
      for (const e in n) {
        const i = n[e],
          r = i.toJSON(t.data);
        "" !== i.name && (r.name = i.name), (t.data.attributes[e] = r);
      }
      const i = {};
      let r = !1;
      for (const e in this.morphAttributes) {
        const n = this.morphAttributes[e],
          s = [];
        for (let e = 0, i = n.length; e < i; e++) {
          const i = n[e],
            r = i.toJSON(t.data);
          "" !== i.name && (r.name = i.name), s.push(r);
        }
        s.length > 0 && ((i[e] = s), (r = !0));
      }
      r &&
        ((t.data.morphAttributes = i),
        (t.data.morphTargetsRelative = this.morphTargetsRelative));
      const s = this.groups;
      s.length > 0 && (t.data.groups = JSON.parse(JSON.stringify(s)));
      const o = this.boundingSphere;
      return (
        null !== o &&
          (t.data.boundingSphere = {
            center: o.center.toArray(),
            radius: o.radius,
          }),
        t
      );
    },
    clone: function () {
      return new Ie().copy(this);
    },
    copy: function (t) {
      (this.index = null),
        (this.attributes = {}),
        (this.morphAttributes = {}),
        (this.groups = []),
        (this.boundingBox = null),
        (this.boundingSphere = null);
      const e = {};
      this.name = t.name;
      const n = t.index;
      null !== n && this.setIndex(n.clone(e));
      const i = t.attributes;
      for (const t in i) {
        const n = i[t];
        this.setAttribute(t, n.clone(e));
      }
      const r = t.morphAttributes;
      for (const t in r) {
        const n = [],
          i = r[t];
        for (let t = 0, r = i.length; t < r; t++) n.push(i[t].clone(e));
        this.morphAttributes[t] = n;
      }
      this.morphTargetsRelative = t.morphTargetsRelative;
      const s = t.groups;
      for (let t = 0, e = s.length; t < e; t++) {
        const e = s[t];
        this.addGroup(e.start, e.count, e.materialIndex);
      }
      const o = t.boundingBox;
      null !== o && (this.boundingBox = o.clone());
      const a = t.boundingSphere;
      return (
        null !== a && (this.boundingSphere = a.clone()),
        (this.drawRange.start = t.drawRange.start),
        (this.drawRange.count = t.drawRange.count),
        (this.userData = t.userData),
        this
      );
    },
    dispose: function () {
      this.dispatchEvent({ type: "dispose" });
    },
  });
  const Ne = new mt(),
    Oe = new ft(),
    ze = new ot(),
    Be = new k(),
    He = new k(),
    Fe = new k(),
    Ue = new k(),
    ke = new k(),
    Ge = new k(),
    Ve = new k(),
    We = new k(),
    je = new k(),
    qe = new P(),
    Xe = new P(),
    Ye = new P(),
    Je = new k(),
    Ze = new k();
  function Qe(t = new Ie(), e = new ue()) {
    Ut.call(this),
      (this.type = "Mesh"),
      (this.geometry = t),
      (this.material = e),
      this.updateMorphTargets();
  }
  function Ke(t, e, n, i, r, s, o, a, l, c, h, u) {
    Be.fromBufferAttribute(r, c),
      He.fromBufferAttribute(r, h),
      Fe.fromBufferAttribute(r, u);
    const d = t.morphTargetInfluences;
    if (e.morphTargets && s && d) {
      Ve.set(0, 0, 0), We.set(0, 0, 0), je.set(0, 0, 0);
      for (let t = 0, e = s.length; t < e; t++) {
        const e = d[t],
          n = s[t];
        0 !== e &&
          (Ue.fromBufferAttribute(n, c),
          ke.fromBufferAttribute(n, h),
          Ge.fromBufferAttribute(n, u),
          o
            ? (Ve.addScaledVector(Ue, e),
              We.addScaledVector(ke, e),
              je.addScaledVector(Ge, e))
            : (Ve.addScaledVector(Ue.sub(Be), e),
              We.addScaledVector(ke.sub(He), e),
              je.addScaledVector(Ge.sub(Fe), e)));
      }
      Be.add(Ve), He.add(We), Fe.add(je);
    }
    t.isSkinnedMesh &&
      e.skinning &&
      (t.boneTransform(c, Be), t.boneTransform(h, He), t.boneTransform(u, Fe));
    const p = (function (t, e, n, i, r, s, o, a) {
      let l;
      if (
        ((l =
          1 === e.side
            ? i.intersectTriangle(o, s, r, !0, a)
            : i.intersectTriangle(r, s, o, 2 !== e.side, a)),
        null === l)
      )
        return null;
      Ze.copy(a), Ze.applyMatrix4(t.matrixWorld);
      const c = n.ray.origin.distanceTo(Ze);
      return c < n.near || c > n.far
        ? null
        : { distance: c, point: Ze.clone(), object: t };
    })(t, e, n, i, Be, He, Fe, Je);
    if (p) {
      a &&
        (qe.fromBufferAttribute(a, c),
        Xe.fromBufferAttribute(a, h),
        Ye.fromBufferAttribute(a, u),
        (p.uv = ee.getUV(Je, Be, He, Fe, qe, Xe, Ye, new P()))),
        l &&
          (qe.fromBufferAttribute(l, c),
          Xe.fromBufferAttribute(l, h),
          Ye.fromBufferAttribute(l, u),
          (p.uv2 = ee.getUV(Je, Be, He, Fe, qe, Xe, Ye, new P())));
      const t = { a: c, b: c, c: u, normal: new k(), materialIndex: 0 };
      ee.getNormal(Be, He, Fe, t.normal), (p.face = t);
    }
    return p;
  }
  Qe.prototype = Object.assign(Object.create(Ut.prototype), {
    constructor: Qe,
    isMesh: !0,
    copy: function (t) {
      return (
        Ut.prototype.copy.call(this, t),
        void 0 !== t.morphTargetInfluences &&
          (this.morphTargetInfluences = t.morphTargetInfluences.slice()),
        void 0 !== t.morphTargetDictionary &&
          (this.morphTargetDictionary = Object.assign(
            {},
            t.morphTargetDictionary
          )),
        (this.material = t.material),
        (this.geometry = t.geometry),
        this
      );
    },
    updateMorphTargets: function () {
      const t = this.geometry;
      if (t.isBufferGeometry) {
        const e = t.morphAttributes,
          n = Object.keys(e);
        if (n.length > 0) {
          const t = e[n[0]];
          if (void 0 !== t) {
            (this.morphTargetInfluences = []),
              (this.morphTargetDictionary = {});
            for (let e = 0, n = t.length; e < n; e++) {
              const n = t[e].name || String(e);
              this.morphTargetInfluences.push(0),
                (this.morphTargetDictionary[n] = e);
            }
          }
        }
      } else {
        const e = t.morphTargets;
        void 0 !== e &&
          e.length > 0 &&
          console.error(
            "THREE.Mesh.updateMorphTargets() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead."
          );
      }
    },
    raycast: function (t, e) {
      const n = this.geometry,
        i = this.material,
        r = this.matrixWorld;
      if (void 0 === i) return;
      if (
        (null === n.boundingSphere && n.computeBoundingSphere(),
        ze.copy(n.boundingSphere),
        ze.applyMatrix4(r),
        !1 === t.ray.intersectsSphere(ze))
      )
        return;
      if (
        (Ne.copy(r).invert(),
        Oe.copy(t.ray).applyMatrix4(Ne),
        null !== n.boundingBox && !1 === Oe.intersectsBox(n.boundingBox))
      )
        return;
      let s;
      if (n.isBufferGeometry) {
        const r = n.index,
          o = n.attributes.position,
          a = n.morphAttributes.position,
          l = n.morphTargetsRelative,
          c = n.attributes.uv,
          h = n.attributes.uv2,
          u = n.groups,
          d = n.drawRange;
        if (null !== r)
          if (Array.isArray(i))
            for (let n = 0, p = u.length; n < p; n++) {
              const p = u[n],
                f = i[p.materialIndex];
              for (
                let n = Math.max(p.start, d.start),
                  i = Math.min(p.start + p.count, d.start + d.count);
                n < i;
                n += 3
              ) {
                const i = r.getX(n),
                  u = r.getX(n + 1),
                  d = r.getX(n + 2);
                (s = Ke(this, f, t, Oe, o, a, l, c, h, i, u, d)),
                  s &&
                    ((s.faceIndex = Math.floor(n / 3)),
                    (s.face.materialIndex = p.materialIndex),
                    e.push(s));
              }
            }
          else
            for (
              let n = Math.max(0, d.start),
                u = Math.min(r.count, d.start + d.count);
              n < u;
              n += 3
            ) {
              const u = r.getX(n),
                d = r.getX(n + 1),
                p = r.getX(n + 2);
              (s = Ke(this, i, t, Oe, o, a, l, c, h, u, d, p)),
                s && ((s.faceIndex = Math.floor(n / 3)), e.push(s));
            }
        else if (void 0 !== o)
          if (Array.isArray(i))
            for (let n = 0, r = u.length; n < r; n++) {
              const r = u[n],
                p = i[r.materialIndex];
              for (
                let n = Math.max(r.start, d.start),
                  i = Math.min(r.start + r.count, d.start + d.count);
                n < i;
                n += 3
              )
                (s = Ke(this, p, t, Oe, o, a, l, c, h, n, n + 1, n + 2)),
                  s &&
                    ((s.faceIndex = Math.floor(n / 3)),
                    (s.face.materialIndex = r.materialIndex),
                    e.push(s));
            }
          else
            for (
              let n = Math.max(0, d.start),
                r = Math.min(o.count, d.start + d.count);
              n < r;
              n += 3
            )
              (s = Ke(this, i, t, Oe, o, a, l, c, h, n, n + 1, n + 2)),
                s && ((s.faceIndex = Math.floor(n / 3)), e.push(s));
      } else
        n.isGeometry &&
          console.error(
            "THREE.Mesh.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead."
          );
    },
  });
  class $e extends Ie {
    constructor(t = 1, e = 1, n = 1, i = 1, r = 1, s = 1) {
      super(),
        (this.type = "BoxGeometry"),
        (this.parameters = {
          width: t,
          height: e,
          depth: n,
          widthSegments: i,
          heightSegments: r,
          depthSegments: s,
        });
      const o = this;
      (i = Math.floor(i)), (r = Math.floor(r)), (s = Math.floor(s));
      const a = [],
        l = [],
        c = [],
        h = [];
      let u = 0,
        d = 0;
      function p(t, e, n, i, r, s, p, f, m, g, v) {
        const _ = s / m,
          y = p / g,
          x = s / 2,
          b = p / 2,
          w = f / 2,
          M = m + 1,
          S = g + 1;
        let E = 0,
          T = 0;
        const A = new k();
        for (let s = 0; s < S; s++) {
          const o = s * y - b;
          for (let a = 0; a < M; a++) {
            const u = a * _ - x;
            (A[t] = u * i),
              (A[e] = o * r),
              (A[n] = w),
              l.push(A.x, A.y, A.z),
              (A[t] = 0),
              (A[e] = 0),
              (A[n] = f > 0 ? 1 : -1),
              c.push(A.x, A.y, A.z),
              h.push(a / m),
              h.push(1 - s / g),
              (E += 1);
          }
        }
        for (let t = 0; t < g; t++)
          for (let e = 0; e < m; e++) {
            const n = u + e + M * t,
              i = u + e + M * (t + 1),
              r = u + (e + 1) + M * (t + 1),
              s = u + (e + 1) + M * t;
            a.push(n, i, s), a.push(i, r, s), (T += 6);
          }
        o.addGroup(d, T, v), (d += T), (u += E);
      }
      p("z", "y", "x", -1, -1, n, e, t, s, r, 0),
        p("z", "y", "x", 1, -1, n, e, -t, s, r, 1),
        p("x", "z", "y", 1, 1, t, n, e, i, s, 2),
        p("x", "z", "y", 1, -1, t, n, -e, i, s, 3),
        p("x", "y", "z", 1, -1, t, e, n, i, r, 4),
        p("x", "y", "z", -1, -1, t, e, -n, i, r, 5),
        this.setIndex(a),
        this.setAttribute("position", new Me(l, 3)),
        this.setAttribute("normal", new Me(c, 3)),
        this.setAttribute("uv", new Me(h, 2));
    }
  }
  function tn(t) {
    const e = {};
    for (const n in t) {
      e[n] = {};
      for (const i in t[n]) {
        const r = t[n][i];
        r &&
        (r.isColor ||
          r.isMatrix3 ||
          r.isMatrix4 ||
          r.isVector2 ||
          r.isVector3 ||
          r.isVector4 ||
          r.isTexture ||
          r.isQuaternion)
          ? (e[n][i] = r.clone())
          : Array.isArray(r)
          ? (e[n][i] = r.slice())
          : (e[n][i] = r);
      }
    }
    return e;
  }
  function en(t) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const i = tn(t[n]);
      for (const t in i) e[t] = i[t];
    }
    return e;
  }
  const nn = { clone: tn, merge: en };
  function rn(t) {
    ie.call(this),
      (this.type = "ShaderMaterial"),
      (this.defines = {}),
      (this.uniforms = {}),
      (this.vertexShader =
        "void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}"),
      (this.fragmentShader =
        "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}"),
      (this.linewidth = 1),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.fog = !1),
      (this.lights = !1),
      (this.clipping = !1),
      (this.skinning = !1),
      (this.morphTargets = !1),
      (this.morphNormals = !1),
      (this.extensions = {
        derivatives: !1,
        fragDepth: !1,
        drawBuffers: !1,
        shaderTextureLOD: !1,
      }),
      (this.defaultAttributeValues = {
        color: [1, 1, 1],
        uv: [0, 0],
        uv2: [0, 0],
      }),
      (this.index0AttributeName = void 0),
      (this.uniformsNeedUpdate = !1),
      (this.glslVersion = null),
      void 0 !== t &&
        (void 0 !== t.attributes &&
          console.error(
            "THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."
          ),
        this.setValues(t));
  }
  function sn() {
    Ut.call(this),
      (this.type = "Camera"),
      (this.matrixWorldInverse = new mt()),
      (this.projectionMatrix = new mt()),
      (this.projectionMatrixInverse = new mt());
  }
  function on(t = 50, e = 1, n = 0.1, i = 2e3) {
    sn.call(this),
      (this.type = "PerspectiveCamera"),
      (this.fov = t),
      (this.zoom = 1),
      (this.near = n),
      (this.far = i),
      (this.focus = 10),
      (this.aspect = e),
      (this.view = null),
      (this.filmGauge = 35),
      (this.filmOffset = 0),
      this.updateProjectionMatrix();
  }
  (rn.prototype = Object.create(ie.prototype)),
    (rn.prototype.constructor = rn),
    (rn.prototype.isShaderMaterial = !0),
    (rn.prototype.copy = function (t) {
      return (
        ie.prototype.copy.call(this, t),
        (this.fragmentShader = t.fragmentShader),
        (this.vertexShader = t.vertexShader),
        (this.uniforms = tn(t.uniforms)),
        (this.defines = Object.assign({}, t.defines)),
        (this.wireframe = t.wireframe),
        (this.wireframeLinewidth = t.wireframeLinewidth),
        (this.lights = t.lights),
        (this.clipping = t.clipping),
        (this.skinning = t.skinning),
        (this.morphTargets = t.morphTargets),
        (this.morphNormals = t.morphNormals),
        (this.extensions = Object.assign({}, t.extensions)),
        (this.glslVersion = t.glslVersion),
        this
      );
    }),
    (rn.prototype.toJSON = function (t) {
      const e = ie.prototype.toJSON.call(this, t);
      (e.glslVersion = this.glslVersion), (e.uniforms = {});
      for (const n in this.uniforms) {
        const i = this.uniforms[n].value;
        i && i.isTexture
          ? (e.uniforms[n] = { type: "t", value: i.toJSON(t).uuid })
          : i && i.isColor
          ? (e.uniforms[n] = { type: "c", value: i.getHex() })
          : i && i.isVector2
          ? (e.uniforms[n] = { type: "v2", value: i.toArray() })
          : i && i.isVector3
          ? (e.uniforms[n] = { type: "v3", value: i.toArray() })
          : i && i.isVector4
          ? (e.uniforms[n] = { type: "v4", value: i.toArray() })
          : i && i.isMatrix3
          ? (e.uniforms[n] = { type: "m3", value: i.toArray() })
          : i && i.isMatrix4
          ? (e.uniforms[n] = { type: "m4", value: i.toArray() })
          : (e.uniforms[n] = { value: i });
      }
      Object.keys(this.defines).length > 0 && (e.defines = this.defines),
        (e.vertexShader = this.vertexShader),
        (e.fragmentShader = this.fragmentShader);
      const n = {};
      for (const t in this.extensions) !0 === this.extensions[t] && (n[t] = !0);
      return Object.keys(n).length > 0 && (e.extensions = n), e;
    }),
    (sn.prototype = Object.assign(Object.create(Ut.prototype), {
      constructor: sn,
      isCamera: !0,
      copy: function (t, e) {
        return (
          Ut.prototype.copy.call(this, t, e),
          this.matrixWorldInverse.copy(t.matrixWorldInverse),
          this.projectionMatrix.copy(t.projectionMatrix),
          this.projectionMatrixInverse.copy(t.projectionMatrixInverse),
          this
        );
      },
      getWorldDirection: function (t) {
        void 0 === t &&
          (console.warn(
            "THREE.Camera: .getWorldDirection() target is now required"
          ),
          (t = new k())),
          this.updateWorldMatrix(!0, !1);
        const e = this.matrixWorld.elements;
        return t.set(-e[8], -e[9], -e[10]).normalize();
      },
      updateMatrixWorld: function (t) {
        Ut.prototype.updateMatrixWorld.call(this, t),
          this.matrixWorldInverse.copy(this.matrixWorld).invert();
      },
      updateWorldMatrix: function (t, e) {
        Ut.prototype.updateWorldMatrix.call(this, t, e),
          this.matrixWorldInverse.copy(this.matrixWorld).invert();
      },
      clone: function () {
        return new this.constructor().copy(this);
      },
    })),
    (on.prototype = Object.assign(Object.create(sn.prototype), {
      constructor: on,
      isPerspectiveCamera: !0,
      copy: function (t, e) {
        return (
          sn.prototype.copy.call(this, t, e),
          (this.fov = t.fov),
          (this.zoom = t.zoom),
          (this.near = t.near),
          (this.far = t.far),
          (this.focus = t.focus),
          (this.aspect = t.aspect),
          (this.view = null === t.view ? null : Object.assign({}, t.view)),
          (this.filmGauge = t.filmGauge),
          (this.filmOffset = t.filmOffset),
          this
        );
      },
      setFocalLength: function (t) {
        const e = (0.5 * this.getFilmHeight()) / t;
        (this.fov = 2 * R.RAD2DEG * Math.atan(e)),
          this.updateProjectionMatrix();
      },
      getFocalLength: function () {
        const t = Math.tan(0.5 * R.DEG2RAD * this.fov);
        return (0.5 * this.getFilmHeight()) / t;
      },
      getEffectiveFOV: function () {
        return (
          2 *
          R.RAD2DEG *
          Math.atan(Math.tan(0.5 * R.DEG2RAD * this.fov) / this.zoom)
        );
      },
      getFilmWidth: function () {
        return this.filmGauge * Math.min(this.aspect, 1);
      },
      getFilmHeight: function () {
        return this.filmGauge / Math.max(this.aspect, 1);
      },
      setViewOffset: function (t, e, n, i, r, s) {
        (this.aspect = t / e),
          null === this.view &&
            (this.view = {
              enabled: !0,
              fullWidth: 1,
              fullHeight: 1,
              offsetX: 0,
              offsetY: 0,
              width: 1,
              height: 1,
            }),
          (this.view.enabled = !0),
          (this.view.fullWidth = t),
          (this.view.fullHeight = e),
          (this.view.offsetX = n),
          (this.view.offsetY = i),
          (this.view.width = r),
          (this.view.height = s),
          this.updateProjectionMatrix();
      },
      clearViewOffset: function () {
        null !== this.view && (this.view.enabled = !1),
          this.updateProjectionMatrix();
      },
      updateProjectionMatrix: function () {
        const t = this.near;
        let e = (t * Math.tan(0.5 * R.DEG2RAD * this.fov)) / this.zoom,
          n = 2 * e,
          i = this.aspect * n,
          r = -0.5 * i;
        const s = this.view;
        if (null !== this.view && this.view.enabled) {
          const t = s.fullWidth,
            o = s.fullHeight;
          (r += (s.offsetX * i) / t),
            (e -= (s.offsetY * n) / o),
            (i *= s.width / t),
            (n *= s.height / o);
        }
        const o = this.filmOffset;
        0 !== o && (r += (t * o) / this.getFilmWidth()),
          this.projectionMatrix.makePerspective(
            r,
            r + i,
            e,
            e - n,
            t,
            this.far
          ),
          this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
      },
      toJSON: function (t) {
        const e = Ut.prototype.toJSON.call(this, t);
        return (
          (e.object.fov = this.fov),
          (e.object.zoom = this.zoom),
          (e.object.near = this.near),
          (e.object.far = this.far),
          (e.object.focus = this.focus),
          (e.object.aspect = this.aspect),
          null !== this.view && (e.object.view = Object.assign({}, this.view)),
          (e.object.filmGauge = this.filmGauge),
          (e.object.filmOffset = this.filmOffset),
          e
        );
      },
    }));
  const an = 90;
  class ln extends Ut {
    constructor(t, e, n) {
      if (
        (super(), (this.type = "CubeCamera"), !0 !== n.isWebGLCubeRenderTarget)
      )
        return void console.error(
          "THREE.CubeCamera: The constructor now expects an instance of WebGLCubeRenderTarget as third parameter."
        );
      this.renderTarget = n;
      const i = new on(an, 1, t, e);
      (i.layers = this.layers),
        i.up.set(0, -1, 0),
        i.lookAt(new k(1, 0, 0)),
        this.add(i);
      const r = new on(an, 1, t, e);
      (r.layers = this.layers),
        r.up.set(0, -1, 0),
        r.lookAt(new k(-1, 0, 0)),
        this.add(r);
      const s = new on(an, 1, t, e);
      (s.layers = this.layers),
        s.up.set(0, 0, 1),
        s.lookAt(new k(0, 1, 0)),
        this.add(s);
      const o = new on(an, 1, t, e);
      (o.layers = this.layers),
        o.up.set(0, 0, -1),
        o.lookAt(new k(0, -1, 0)),
        this.add(o);
      const a = new on(an, 1, t, e);
      (a.layers = this.layers),
        a.up.set(0, -1, 0),
        a.lookAt(new k(0, 0, 1)),
        this.add(a);
      const l = new on(an, 1, t, e);
      (l.layers = this.layers),
        l.up.set(0, -1, 0),
        l.lookAt(new k(0, 0, -1)),
        this.add(l);
    }
    update(t, e) {
      null === this.parent && this.updateMatrixWorld();
      const n = this.renderTarget,
        [i, r, s, o, a, l] = this.children,
        c = t.xr.enabled,
        h = t.getRenderTarget();
      t.xr.enabled = !1;
      const u = n.texture.generateMipmaps;
      (n.texture.generateMipmaps = !1),
        t.setRenderTarget(n, 0),
        t.render(e, i),
        t.setRenderTarget(n, 1),
        t.render(e, r),
        t.setRenderTarget(n, 2),
        t.render(e, s),
        t.setRenderTarget(n, 3),
        t.render(e, o),
        t.setRenderTarget(n, 4),
        t.render(e, a),
        (n.texture.generateMipmaps = u),
        t.setRenderTarget(n, 5),
        t.render(e, l),
        t.setRenderTarget(h),
        (t.xr.enabled = c);
    }
  }
  class cn extends z {
    constructor(t, e, n, i, r, s, o, a, l, c) {
      super(
        (t = void 0 !== t ? t : []),
        (e = void 0 !== e ? e : 301),
        n,
        i,
        r,
        s,
        (o = void 0 !== o ? o : d),
        a,
        l,
        c
      ),
        (this._needsFlipEnvMap = !0),
        (this.flipY = !1);
    }
    get images() {
      return this.image;
    }
    set images(t) {
      this.image = t;
    }
  }
  cn.prototype.isCubeTexture = !0;
  class hn extends F {
    constructor(t, e, n) {
      Number.isInteger(e) &&
        (console.warn(
          "THREE.WebGLCubeRenderTarget: constructor signature is now WebGLCubeRenderTarget( size, options )"
        ),
        (e = n)),
        super(t, t, e),
        (e = e || {}),
        (this.texture = new cn(
          void 0,
          e.mapping,
          e.wrapS,
          e.wrapT,
          e.magFilter,
          e.minFilter,
          e.format,
          e.type,
          e.anisotropy,
          e.encoding
        )),
        (this.texture.generateMipmaps =
          void 0 !== e.generateMipmaps && e.generateMipmaps),
        (this.texture.minFilter = void 0 !== e.minFilter ? e.minFilter : s),
        (this.texture._needsFlipEnvMap = !1);
    }
    fromEquirectangularTexture(t, e) {
      (this.texture.type = e.type),
        (this.texture.format = p),
        (this.texture.encoding = e.encoding),
        (this.texture.generateMipmaps = e.generateMipmaps),
        (this.texture.minFilter = e.minFilter),
        (this.texture.magFilter = e.magFilter);
      const n = { tEquirect: { value: null } },
        i =
          "\n\n\t\t\t\tvarying vec3 vWorldDirection;\n\n\t\t\t\tvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\n\t\t\t\t\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n\n\t\t\t\t}\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tvWorldDirection = transformDirection( position, modelMatrix );\n\n\t\t\t\t\t#include <begin_vertex>\n\t\t\t\t\t#include <project_vertex>\n\n\t\t\t\t}\n\t\t\t",
        r =
          "\n\n\t\t\t\tuniform sampler2D tEquirect;\n\n\t\t\t\tvarying vec3 vWorldDirection;\n\n\t\t\t\t#include <common>\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tvec3 direction = normalize( vWorldDirection );\n\n\t\t\t\t\tvec2 sampleUV = equirectUv( direction );\n\n\t\t\t\t\tgl_FragColor = texture2D( tEquirect, sampleUV );\n\n\t\t\t\t}\n\t\t\t",
        a = new $e(5, 5, 5),
        l = new rn({
          name: "CubemapFromEquirect",
          uniforms: tn(n),
          vertexShader: i,
          fragmentShader: r,
          side: 1,
          blending: 0,
        });
      l.uniforms.tEquirect.value = e;
      const c = new Qe(a, l),
        h = e.minFilter;
      return (
        e.minFilter === o && (e.minFilter = s),
        new ln(1, 10, this).update(t, c),
        (e.minFilter = h),
        c.geometry.dispose(),
        c.material.dispose(),
        this
      );
    }
    clear(t, e, n, i) {
      const r = t.getRenderTarget();
      for (let r = 0; r < 6; r++) t.setRenderTarget(this, r), t.clear(e, n, i);
      t.setRenderTarget(r);
    }
  }
  hn.prototype.isWebGLCubeRenderTarget = !0;
  class un extends z {
    constructor(t, e, n, i, s, o, a, l, c, h, u, d) {
      super(null, o, a, l, c, h, i, s, u, d),
        (this.image = { data: t || null, width: e || 1, height: n || 1 }),
        (this.magFilter = void 0 !== c ? c : r),
        (this.minFilter = void 0 !== h ? h : r),
        (this.generateMipmaps = !1),
        (this.flipY = !1),
        (this.unpackAlignment = 1),
        (this.needsUpdate = !0);
    }
  }
  un.prototype.isDataTexture = !0;
  const dn = new ot(),
    pn = new k();
  class fn {
    constructor(
      t = new Wt(),
      e = new Wt(),
      n = new Wt(),
      i = new Wt(),
      r = new Wt(),
      s = new Wt()
    ) {
      this.planes = [t, e, n, i, r, s];
    }
    set(t, e, n, i, r, s) {
      const o = this.planes;
      return (
        o[0].copy(t),
        o[1].copy(e),
        o[2].copy(n),
        o[3].copy(i),
        o[4].copy(r),
        o[5].copy(s),
        this
      );
    }
    copy(t) {
      const e = this.planes;
      for (let n = 0; n < 6; n++) e[n].copy(t.planes[n]);
      return this;
    }
    setFromProjectionMatrix(t) {
      const e = this.planes,
        n = t.elements,
        i = n[0],
        r = n[1],
        s = n[2],
        o = n[3],
        a = n[4],
        l = n[5],
        c = n[6],
        h = n[7],
        u = n[8],
        d = n[9],
        p = n[10],
        f = n[11],
        m = n[12],
        g = n[13],
        v = n[14],
        _ = n[15];
      return (
        e[0].setComponents(o - i, h - a, f - u, _ - m).normalize(),
        e[1].setComponents(o + i, h + a, f + u, _ + m).normalize(),
        e[2].setComponents(o + r, h + l, f + d, _ + g).normalize(),
        e[3].setComponents(o - r, h - l, f - d, _ - g).normalize(),
        e[4].setComponents(o - s, h - c, f - p, _ - v).normalize(),
        e[5].setComponents(o + s, h + c, f + p, _ + v).normalize(),
        this
      );
    }
    intersectsObject(t) {
      const e = t.geometry;
      return (
        null === e.boundingSphere && e.computeBoundingSphere(),
        dn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld),
        this.intersectsSphere(dn)
      );
    }
    intersectsSprite(t) {
      return (
        dn.center.set(0, 0, 0),
        (dn.radius = 0.7071067811865476),
        dn.applyMatrix4(t.matrixWorld),
        this.intersectsSphere(dn)
      );
    }
    intersectsSphere(t) {
      const e = this.planes,
        n = t.center,
        i = -t.radius;
      for (let t = 0; t < 6; t++) if (e[t].distanceToPoint(n) < i) return !1;
      return !0;
    }
    intersectsBox(t) {
      const e = this.planes;
      for (let n = 0; n < 6; n++) {
        const i = e[n];
        if (
          ((pn.x = i.normal.x > 0 ? t.max.x : t.min.x),
          (pn.y = i.normal.y > 0 ? t.max.y : t.min.y),
          (pn.z = i.normal.z > 0 ? t.max.z : t.min.z),
          i.distanceToPoint(pn) < 0)
        )
          return !1;
      }
      return !0;
    }
    containsPoint(t) {
      const e = this.planes;
      for (let n = 0; n < 6; n++) if (e[n].distanceToPoint(t) < 0) return !1;
      return !0;
    }
    clone() {
      return new this.constructor().copy(this);
    }
  }
  function mn() {
    let t = null,
      e = !1,
      n = null,
      i = null;
    function r(e, s) {
      n(e, s), (i = t.requestAnimationFrame(r));
    }
    return {
      start: function () {
        !0 !== e && null !== n && ((i = t.requestAnimationFrame(r)), (e = !0));
      },
      stop: function () {
        t.cancelAnimationFrame(i), (e = !1);
      },
      setAnimationLoop: function (t) {
        n = t;
      },
      setContext: function (e) {
        t = e;
      },
    };
  }
  function gn(t, e) {
    const n = e.isWebGL2,
      i = new WeakMap();
    return {
      get: function (t) {
        return t.isInterleavedBufferAttribute && (t = t.data), i.get(t);
      },
      remove: function (e) {
        e.isInterleavedBufferAttribute && (e = e.data);
        const n = i.get(e);
        n && (t.deleteBuffer(n.buffer), i.delete(e));
      },
      update: function (e, r) {
        if (e.isGLBufferAttribute) {
          const t = i.get(e);
          return void (
            (!t || t.version < e.version) &&
            i.set(e, {
              buffer: e.buffer,
              type: e.type,
              bytesPerElement: e.elementSize,
              version: e.version,
            })
          );
        }
        e.isInterleavedBufferAttribute && (e = e.data);
        const s = i.get(e);
        void 0 === s
          ? i.set(
              e,
              (function (e, i) {
                const r = e.array,
                  s = e.usage,
                  o = t.createBuffer();
                t.bindBuffer(i, o), t.bufferData(i, r, s), e.onUploadCallback();
                let a = 5126;
                return (
                  r instanceof Float32Array
                    ? (a = 5126)
                    : r instanceof Float64Array
                    ? console.warn(
                        "THREE.WebGLAttributes: Unsupported data buffer format: Float64Array."
                      )
                    : r instanceof Uint16Array
                    ? e.isFloat16BufferAttribute
                      ? n
                        ? (a = 5131)
                        : console.warn(
                            "THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2."
                          )
                      : (a = 5123)
                    : r instanceof Int16Array
                    ? (a = 5122)
                    : r instanceof Uint32Array
                    ? (a = 5125)
                    : r instanceof Int32Array
                    ? (a = 5124)
                    : r instanceof Int8Array
                    ? (a = 5120)
                    : r instanceof Uint8Array && (a = 5121),
                  {
                    buffer: o,
                    type: a,
                    bytesPerElement: r.BYTES_PER_ELEMENT,
                    version: e.version,
                  }
                );
              })(e, r)
            )
          : s.version < e.version &&
            ((function (e, i, r) {
              const s = i.array,
                o = i.updateRange;
              t.bindBuffer(r, e),
                -1 === o.count
                  ? t.bufferSubData(r, 0, s)
                  : (n
                      ? t.bufferSubData(
                          r,
                          o.offset * s.BYTES_PER_ELEMENT,
                          s,
                          o.offset,
                          o.count
                        )
                      : t.bufferSubData(
                          r,
                          o.offset * s.BYTES_PER_ELEMENT,
                          s.subarray(o.offset, o.offset + o.count)
                        ),
                    (o.count = -1));
            })(s.buffer, e, r),
            (s.version = e.version));
      },
    };
  }
  class vn extends Ie {
    constructor(t = 1, e = 1, n = 1, i = 1) {
      super(),
        (this.type = "PlaneGeometry"),
        (this.parameters = {
          width: t,
          height: e,
          widthSegments: n,
          heightSegments: i,
        });
      const r = t / 2,
        s = e / 2,
        o = Math.floor(n),
        a = Math.floor(i),
        l = o + 1,
        c = a + 1,
        h = t / o,
        u = e / a,
        d = [],
        p = [],
        f = [],
        m = [];
      for (let t = 0; t < c; t++) {
        const e = t * u - s;
        for (let n = 0; n < l; n++) {
          const i = n * h - r;
          p.push(i, -e, 0), f.push(0, 0, 1), m.push(n / o), m.push(1 - t / a);
        }
      }
      for (let t = 0; t < a; t++)
        for (let e = 0; e < o; e++) {
          const n = e + l * t,
            i = e + l * (t + 1),
            r = e + 1 + l * (t + 1),
            s = e + 1 + l * t;
          d.push(n, i, s), d.push(i, r, s);
        }
      this.setIndex(d),
        this.setAttribute("position", new Me(p, 3)),
        this.setAttribute("normal", new Me(f, 3)),
        this.setAttribute("uv", new Me(m, 2));
    }
  }
  const _n = {
      alphamap_fragment:
        "#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n#endif",
      alphamap_pars_fragment:
        "#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif",
      alphatest_fragment:
        "#ifdef ALPHATEST\n\tif ( diffuseColor.a < ALPHATEST ) discard;\n#endif",
      aomap_fragment:
        "#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_ENVMAP ) && defined( STANDARD )\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );\n\t#endif\n#endif",
      aomap_pars_fragment:
        "#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif",
      begin_vertex: "vec3 transformed = vec3( position );",
      beginnormal_vertex:
        "vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n\tvec3 objectTangent = vec3( tangent.xyz );\n#endif",
      bsdfs:
        "vec2 integrateSpecularBRDF( const in float dotNV, const in float roughness ) {\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\treturn vec2( -1.04, 1.04 ) * a004 + r.zw;\n}\nfloat punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\tif( cutoffDistance > 0.0 ) {\n\t\tdistanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t}\n\treturn distanceFalloff;\n#else\n\tif( cutoffDistance > 0.0 && decayExponent > 0.0 ) {\n\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\t}\n\treturn 1.0;\n#endif\n}\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );\n\treturn ( 1.0 - specularColor ) * fresnel + specularColor;\n}\nvec3 F_Schlick_RoughnessDependent( const in vec3 F0, const in float dotNV, const in float roughness ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotNV - 6.98316 ) * dotNV );\n\tvec3 Fr = max( vec3( 1.0 - roughness ), F0 ) - F0;\n\treturn Fr * fresnel + F0;\n}\nfloat G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\tfloat gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\treturn 1.0 / ( gl * gv );\n}\nfloat G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\nvec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( incidentLight.direction + viewDir );\n\tfloat dotNL = saturate( dot( normal, incidentLight.direction ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\tfloat D = D_GGX( alpha, dotNH );\n\treturn F * ( G * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\tconst float LUT_SIZE = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS = 0.5 / LUT_SIZE;\n\tfloat dotNV = saturate( dot( N, V ) );\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\tfloat l = length( f );\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\tfloat x = dot( v1, v2 );\n\tfloat y = abs( x );\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\treturn cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 );\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\treturn vec3( result );\n}\nvec3 BRDF_Specular_GGX_Environment( const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tvec2 brdf = integrateSpecularBRDF( dotNV, roughness );\n\treturn specularColor * brdf.x + brdf.y;\n}\nvoid BRDF_Specular_Multiscattering_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tvec3 F = F_Schlick_RoughnessDependent( specularColor, dotNV, roughness );\n\tvec2 brdf = integrateSpecularBRDF( dotNV, roughness );\n\tvec3 FssEss = F * brdf.x + brdf.y;\n\tfloat Ess = brdf.x + brdf.y;\n\tfloat Ems = 1.0 - Ess;\n\tvec3 Favg = specularColor + ( 1.0 - specularColor ) * 0.047619;\tvec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n\tsingleScatter += FssEss;\n\tmultiScatter += Fms * Ems;\n}\nfloat G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n}\nfloat GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {\n\treturn ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );\n}\nfloat BlinnExponentToGGXRoughness( const in float blinnExponent ) {\n\treturn sqrt( 2.0 / ( blinnExponent + 2.0 ) );\n}\n#if defined( USE_SHEEN )\nfloat D_Charlie(float roughness, float NoH) {\n\tfloat invAlpha = 1.0 / roughness;\n\tfloat cos2h = NoH * NoH;\n\tfloat sin2h = max(1.0 - cos2h, 0.0078125);\treturn (2.0 + invAlpha) * pow(sin2h, invAlpha * 0.5) / (2.0 * PI);\n}\nfloat V_Neubelt(float NoV, float NoL) {\n\treturn saturate(1.0 / (4.0 * (NoL + NoV - NoL * NoV)));\n}\nvec3 BRDF_Specular_Sheen( const in float roughness, const in vec3 L, const in GeometricContext geometry, vec3 specularColor ) {\n\tvec3 N = geometry.normal;\n\tvec3 V = geometry.viewDir;\n\tvec3 H = normalize( V + L );\n\tfloat dotNH = saturate( dot( N, H ) );\n\treturn specularColor * D_Charlie( roughness, dotNH ) * V_Neubelt( dot(N, V), dot(N, L) );\n}\n#endif",
      bumpmap_pars_fragment:
        "#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {\n\t\tvec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );\n\t\tvec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 ) * faceDirection;\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif",
      clipping_planes_fragment:
        "#if NUM_CLIPPING_PLANES > 0\n\tvec4 plane;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\t\tplane = clippingPlanes[ i ];\n\t\tif ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n\t}\n\t#pragma unroll_loop_end\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\tbool clipped = true;\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t\tif ( clipped ) discard;\n\t#endif\n#endif",
      clipping_planes_pars_fragment:
        "#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif",
      clipping_planes_pars_vertex:
        "#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n#endif",
      clipping_planes_vertex:
        "#if NUM_CLIPPING_PLANES > 0\n\tvClipPosition = - mvPosition.xyz;\n#endif",
      color_fragment: "#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif",
      color_pars_fragment: "#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif",
      color_pars_vertex:
        "#if defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\tvarying vec3 vColor;\n#endif",
      color_vertex:
        "#if defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\tvColor = vec3( 1.0 );\n#endif\n#ifdef USE_COLOR\n\tvColor.xyz *= color.xyz;\n#endif\n#ifdef USE_INSTANCING_COLOR\n\tvColor.xyz *= instanceColor.xyz;\n#endif",
      common:
        "#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement(a) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract(sin(sn) * c);\n}\n#ifdef HIGH_PRECISION\n\tfloat precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n\tfloat max3( vec3 v ) { return max( max( v.x, v.y ), v.z ); }\n\tfloat precisionSafeLength( vec3 v ) {\n\t\tfloat maxComponent = max3( abs( v ) );\n\t\treturn length( v / maxComponent ) * maxComponent;\n\t}\n#endif\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n#ifdef CLEARCOAT\n\tvec3 clearcoatNormal;\n#endif\n};\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\tfloat distance = dot( planeNormal, point - pointOnPlane );\n\treturn - distance * planeNormal + point;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;\n}\nmat3 transposeMat3( const in mat3 m ) {\n\tmat3 tmp;\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\treturn tmp;\n}\nfloat linearToRelativeLuminance( const in vec3 color ) {\n\tvec3 weights = vec3( 0.2126, 0.7152, 0.0722 );\n\treturn dot( weights, color.rgb );\n}\nbool isPerspectiveMatrix( mat4 m ) {\n\treturn m[ 2 ][ 3 ] == - 1.0;\n}\nvec2 equirectUv( in vec3 dir ) {\n\tfloat u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;\n\tfloat v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\treturn vec2( u, v );\n}",
      cube_uv_reflection_fragment:
        "#ifdef ENVMAP_TYPE_CUBE_UV\n\t#define cubeUV_maxMipLevel 8.0\n\t#define cubeUV_minMipLevel 4.0\n\t#define cubeUV_maxTileSize 256.0\n\t#define cubeUV_minTileSize 16.0\n\tfloat getFace( vec3 direction ) {\n\t\tvec3 absDirection = abs( direction );\n\t\tfloat face = - 1.0;\n\t\tif ( absDirection.x > absDirection.z ) {\n\t\t\tif ( absDirection.x > absDirection.y )\n\t\t\t\tface = direction.x > 0.0 ? 0.0 : 3.0;\n\t\t\telse\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\t\t} else {\n\t\t\tif ( absDirection.z > absDirection.y )\n\t\t\t\tface = direction.z > 0.0 ? 2.0 : 5.0;\n\t\t\telse\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\t\t}\n\t\treturn face;\n\t}\n\tvec2 getUV( vec3 direction, float face ) {\n\t\tvec2 uv;\n\t\tif ( face == 0.0 ) {\n\t\t\tuv = vec2( direction.z, direction.y ) / abs( direction.x );\n\t\t} else if ( face == 1.0 ) {\n\t\t\tuv = vec2( - direction.x, - direction.z ) / abs( direction.y );\n\t\t} else if ( face == 2.0 ) {\n\t\t\tuv = vec2( - direction.x, direction.y ) / abs( direction.z );\n\t\t} else if ( face == 3.0 ) {\n\t\t\tuv = vec2( - direction.z, direction.y ) / abs( direction.x );\n\t\t} else if ( face == 4.0 ) {\n\t\t\tuv = vec2( - direction.x, direction.z ) / abs( direction.y );\n\t\t} else {\n\t\t\tuv = vec2( direction.x, direction.y ) / abs( direction.z );\n\t\t}\n\t\treturn 0.5 * ( uv + 1.0 );\n\t}\n\tvec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {\n\t\tfloat face = getFace( direction );\n\t\tfloat filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );\n\t\tmipInt = max( mipInt, cubeUV_minMipLevel );\n\t\tfloat faceSize = exp2( mipInt );\n\t\tfloat texelSize = 1.0 / ( 3.0 * cubeUV_maxTileSize );\n\t\tvec2 uv = getUV( direction, face ) * ( faceSize - 1.0 );\n\t\tvec2 f = fract( uv );\n\t\tuv += 0.5 - f;\n\t\tif ( face > 2.0 ) {\n\t\t\tuv.y += faceSize;\n\t\t\tface -= 3.0;\n\t\t}\n\t\tuv.x += face * faceSize;\n\t\tif ( mipInt < cubeUV_maxMipLevel ) {\n\t\t\tuv.y += 2.0 * cubeUV_maxTileSize;\n\t\t}\n\t\tuv.y += filterInt * 2.0 * cubeUV_minTileSize;\n\t\tuv.x += 3.0 * max( 0.0, cubeUV_maxTileSize - 2.0 * faceSize );\n\t\tuv *= texelSize;\n\t\tvec3 tl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\t\tuv.x += texelSize;\n\t\tvec3 tr = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\t\tuv.y += texelSize;\n\t\tvec3 br = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\t\tuv.x -= texelSize;\n\t\tvec3 bl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\t\tvec3 tm = mix( tl, tr, f.x );\n\t\tvec3 bm = mix( bl, br, f.x );\n\t\treturn mix( tm, bm, f.y );\n\t}\n\t#define r0 1.0\n\t#define v0 0.339\n\t#define m0 - 2.0\n\t#define r1 0.8\n\t#define v1 0.276\n\t#define m1 - 1.0\n\t#define r4 0.4\n\t#define v4 0.046\n\t#define m4 2.0\n\t#define r5 0.305\n\t#define v5 0.016\n\t#define m5 3.0\n\t#define r6 0.21\n\t#define v6 0.0038\n\t#define m6 4.0\n\tfloat roughnessToMip( float roughness ) {\n\t\tfloat mip = 0.0;\n\t\tif ( roughness >= r1 ) {\n\t\t\tmip = ( r0 - roughness ) * ( m1 - m0 ) / ( r0 - r1 ) + m0;\n\t\t} else if ( roughness >= r4 ) {\n\t\t\tmip = ( r1 - roughness ) * ( m4 - m1 ) / ( r1 - r4 ) + m1;\n\t\t} else if ( roughness >= r5 ) {\n\t\t\tmip = ( r4 - roughness ) * ( m5 - m4 ) / ( r4 - r5 ) + m4;\n\t\t} else if ( roughness >= r6 ) {\n\t\t\tmip = ( r5 - roughness ) * ( m6 - m5 ) / ( r5 - r6 ) + m5;\n\t\t} else {\n\t\t\tmip = - 2.0 * log2( 1.16 * roughness );\t\t}\n\t\treturn mip;\n\t}\n\tvec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {\n\t\tfloat mip = clamp( roughnessToMip( roughness ), m0, cubeUV_maxMipLevel );\n\t\tfloat mipF = fract( mip );\n\t\tfloat mipInt = floor( mip );\n\t\tvec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );\n\t\tif ( mipF == 0.0 ) {\n\t\t\treturn vec4( color0, 1.0 );\n\t\t} else {\n\t\t\tvec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );\n\t\t\treturn vec4( mix( color0, color1, mipF ), 1.0 );\n\t\t}\n\t}\n#endif",
      defaultnormal_vertex:
        "vec3 transformedNormal = objectNormal;\n#ifdef USE_INSTANCING\n\tmat3 m = mat3( instanceMatrix );\n\ttransformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );\n\ttransformedNormal = m * transformedNormal;\n#endif\ntransformedNormal = normalMatrix * transformedNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n\tvec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#ifdef FLIP_SIDED\n\t\ttransformedTangent = - transformedTangent;\n\t#endif\n#endif",
      displacementmap_pars_vertex:
        "#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif",
      displacementmap_vertex:
        "#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );\n#endif",
      emissivemap_fragment:
        "#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\temissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif",
      emissivemap_pars_fragment:
        "#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif",
      encodings_fragment: "gl_FragColor = linearToOutputTexel( gl_FragColor );",
      encodings_pars_fragment:
        "\nvec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\nvec4 GammaToLinear( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( gammaFactor ) ), value.a );\n}\nvec4 LinearToGamma( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( 1.0 / gammaFactor ) ), value.a );\n}\nvec4 sRGBToLinear( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}\nvec4 RGBEToLinear( in vec4 value ) {\n\treturn vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );\n}\nvec4 LinearToRGBE( in vec4 value ) {\n\tfloat maxComponent = max( max( value.r, value.g ), value.b );\n\tfloat fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );\n\treturn vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );\n}\nvec4 RGBMToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * value.a * maxRange, 1.0 );\n}\nvec4 LinearToRGBM( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat M = clamp( maxRGB / maxRange, 0.0, 1.0 );\n\tM = ceil( M * 255.0 ) / 255.0;\n\treturn vec4( value.rgb / ( M * maxRange ), M );\n}\nvec4 RGBDToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );\n}\nvec4 LinearToRGBD( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat D = max( maxRange / maxRGB, 1.0 );\n\tD = clamp( floor( D ) / 255.0, 0.0, 1.0 );\n\treturn vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );\n}\nconst mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );\nvec4 LinearToLogLuv( in vec4 value ) {\n\tvec3 Xp_Y_XYZp = cLogLuvM * value.rgb;\n\tXp_Y_XYZp = max( Xp_Y_XYZp, vec3( 1e-6, 1e-6, 1e-6 ) );\n\tvec4 vResult;\n\tvResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;\n\tfloat Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;\n\tvResult.w = fract( Le );\n\tvResult.z = ( Le - ( floor( vResult.w * 255.0 ) ) / 255.0 ) / 255.0;\n\treturn vResult;\n}\nconst mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );\nvec4 LogLuvToLinear( in vec4 value ) {\n\tfloat Le = value.z * 255.0 + value.w;\n\tvec3 Xp_Y_XYZp;\n\tXp_Y_XYZp.y = exp2( ( Le - 127.0 ) / 2.0 );\n\tXp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;\n\tXp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;\n\tvec3 vRGB = cLogLuvInverseM * Xp_Y_XYZp.rgb;\n\treturn vec4( max( vRGB, 0.0 ), 1.0 );\n}",
      envmap_fragment:
        "#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvec3 cameraToFrag;\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToFrag = normalize( vWorldPosition - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToFrag, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\tvec4 envColor = textureCubeUV( envMap, reflectVec, 0.0 );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\t#ifndef ENVMAP_TYPE_CUBE_UV\n\t\tenvColor = envMapTexelToLinear( envColor );\n\t#endif\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif",
      envmap_common_pars_fragment:
        "#ifdef USE_ENVMAP\n\tuniform float envMapIntensity;\n\tuniform float flipEnvMap;\n\tuniform int maxMipLevel;\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\t\n#endif",
      envmap_pars_fragment:
        "#ifdef USE_ENVMAP\n\tuniform float reflectivity;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\tvarying vec3 vWorldPosition;\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif",
      envmap_pars_vertex:
        "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) ||defined( PHONG )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\t\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif",
      envmap_physical_pars_fragment:
        "#if defined( USE_ENVMAP )\n\t#ifdef ENVMAP_MODE_REFRACTION\n\t\tuniform float refractionRatio;\n\t#endif\n\tvec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {\n\t\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );\n\t\t#else\n\t\t\tvec4 envMapColor = vec4( 0.0 );\n\t\t#endif\n\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t}\n\tfloat getSpecularMIPLevel( const in float roughness, const in int maxMIPLevel ) {\n\t\tfloat maxMIPLevelScalar = float( maxMIPLevel );\n\t\tfloat sigma = PI * roughness * roughness / ( 1.0 + roughness );\n\t\tfloat desiredMIPLevel = maxMIPLevelScalar + log2( sigma );\n\t\treturn clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n\t}\n\tvec3 getLightProbeIndirectRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in int maxMIPLevel ) {\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( -viewDir, normal );\n\t\t\treflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( -viewDir, normal, refractionRatio );\n\t\t#endif\n\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\tfloat specularMIPLevel = getSpecularMIPLevel( roughness, maxMIPLevel );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );\n\t\t#endif\n\t\treturn envMapColor.rgb * envMapIntensity;\n\t}\n#endif",
      envmap_vertex:
        "#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex;\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif",
      fog_vertex: "#ifdef USE_FOG\n\tfogDepth = - mvPosition.z;\n#endif",
      fog_pars_vertex: "#ifdef USE_FOG\n\tvarying float fogDepth;\n#endif",
      fog_fragment:
        "#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = 1.0 - exp( - fogDensity * fogDensity * fogDepth * fogDepth );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, fogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif",
      fog_pars_fragment:
        "#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float fogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif",
      gradientmap_pars_fragment:
        "#ifdef USE_GRADIENTMAP\n\tuniform sampler2D gradientMap;\n#endif\nvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\tfloat dotNL = dot( normal, lightDirection );\n\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t#ifdef USE_GRADIENTMAP\n\t\treturn texture2D( gradientMap, coord ).rgb;\n\t#else\n\t\treturn ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );\n\t#endif\n}",
      lightmap_fragment:
        "#ifdef USE_LIGHTMAP\n\tvec4 lightMapTexel= texture2D( lightMap, vUv2 );\n\treflectedLight.indirectDiffuse += PI * lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n#endif",
      lightmap_pars_fragment:
        "#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif",
      lights_lambert_vertex:
        "vec3 diffuse = vec3( 1.0 );\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( -mvPosition.xyz );\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\nvLightFront = vec3( 0.0 );\nvIndirectFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n\tvIndirectBack = vec3( 0.0 );\n#endif\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\nvIndirectFront += getAmbientLightIrradiance( ambientLightColor );\nvIndirectFront += getLightProbeIrradiance( lightProbe, geometry );\n#ifdef DOUBLE_SIDED\n\tvIndirectBack += getAmbientLightIrradiance( ambientLightColor );\n\tvIndirectBack += getLightProbeIrradiance( lightProbe, backGeometry );\n#endif\n#if NUM_POINT_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tgetPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tgetSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if NUM_DIR_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tgetDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\tvIndirectFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvIndirectBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif",
      lights_pars_begin:
        "uniform bool receiveShadow;\nuniform vec3 ambientLightColor;\nuniform vec3 lightProbe[ 9 ];\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n\tfloat x = normal.x, y = normal.y, z = normal.z;\n\tvec3 result = shCoefficients[ 0 ] * 0.886227;\n\tresult += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n\tresult += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n\tresult += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n\tresult += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n\tresult += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n\tresult += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n\tresult += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n\tresult += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n\treturn result;\n}\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in GeometricContext geometry ) {\n\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\tvec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n\treturn irradiance;\n}\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treturn irradiance;\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n\t\tdirectLight.visible = ( directLight.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\t\tif ( angleCos > spotLight.coneCos ) {\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\t\t} else {\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltc_1;\tuniform sampler2D ltc_2;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n\t\tfloat dotNL = dot( geometry.normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tirradiance *= PI;\n\t\t#endif\n\t\treturn irradiance;\n\t}\n#endif",
      lights_toon_fragment:
        "ToonMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;",
      lights_toon_pars_fragment:
        "varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct ToonMaterial {\n\tvec3 diffuseColor;\n};\nvoid RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\tvec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_Toon\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Toon\n#define Material_LightProbeLOD( material )\t(0)",
      lights_phong_fragment:
        "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;",
      lights_phong_pars_fragment:
        "varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct BlinnPhongMaterial {\n\tvec3 diffuseColor;\n\tvec3 specularColor;\n\tfloat specularShininess;\n\tfloat specularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n#define Material_LightProbeLOD( material )\t(0)",
      lights_physical_fragment:
        "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nvec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\nmaterial.specularRoughness = max( roughnessFactor, 0.0525 );material.specularRoughness += geometryRoughness;\nmaterial.specularRoughness = min( material.specularRoughness, 1.0 );\n#ifdef REFLECTIVITY\n\tmaterial.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );\n#endif\n#ifdef CLEARCOAT\n\tmaterial.clearcoat = clearcoat;\n\tmaterial.clearcoatRoughness = clearcoatRoughness;\n\t#ifdef USE_CLEARCOATMAP\n\t\tmaterial.clearcoat *= texture2D( clearcoatMap, vUv ).x;\n\t#endif\n\t#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\t\tmaterial.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;\n\t#endif\n\tmaterial.clearcoat = saturate( material.clearcoat );\tmaterial.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );\n\tmaterial.clearcoatRoughness += geometryRoughness;\n\tmaterial.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n#endif\n#ifdef USE_SHEEN\n\tmaterial.sheenColor = sheen;\n#endif",
      lights_physical_pars_fragment:
        "struct PhysicalMaterial {\n\tvec3 diffuseColor;\n\tfloat specularRoughness;\n\tvec3 specularColor;\n#ifdef CLEARCOAT\n\tfloat clearcoat;\n\tfloat clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\n\tvec3 sheenColor;\n#endif\n};\n#define MAXIMUM_SPECULAR_COEFFICIENT 0.16\n#define DEFAULT_SPECULAR_COEFFICIENT 0.04\nfloat clearcoatDHRApprox( const in float roughness, const in float dotNL ) {\n\treturn DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 normal = geometry.normal;\n\t\tvec3 viewDir = geometry.viewDir;\n\t\tvec3 position = geometry.position;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.specularRoughness;\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos + halfWidth - halfHeight;\t\trectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(    0, 1,    0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\t\tvec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\t#ifdef CLEARCOAT\n\t\tfloat ccDotNL = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );\n\t\tvec3 ccIrradiance = ccDotNL * directLight.color;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tccIrradiance *= PI;\n\t\t#endif\n\t\tfloat clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );\n\t\treflectedLight.directSpecular += ccIrradiance * material.clearcoat * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );\n\t#else\n\t\tfloat clearcoatDHR = 0.0;\n\t#endif\n\t#ifdef USE_SHEEN\n\t\treflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_Sheen(\n\t\t\tmaterial.specularRoughness,\n\t\t\tdirectLight.direction,\n\t\t\tgeometry,\n\t\t\tmaterial.sheenColor\n\t\t);\n\t#else\n\t\treflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.normal, material.specularColor, material.specularRoughness);\n\t#endif\n\treflectedLight.directDiffuse += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n\t#ifdef CLEARCOAT\n\t\tfloat ccDotNV = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular += clearcoatRadiance * material.clearcoat * BRDF_Specular_GGX_Environment( geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );\n\t\tfloat ccDotNL = ccDotNV;\n\t\tfloat clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );\n\t#else\n\t\tfloat clearcoatDHR = 0.0;\n\t#endif\n\tfloat clearcoatInv = 1.0 - clearcoatDHR;\n\tvec3 singleScattering = vec3( 0.0 );\n\tvec3 multiScattering = vec3( 0.0 );\n\tvec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n\tBRDF_Specular_Multiscattering_Environment( geometry, material.specularColor, material.specularRoughness, singleScattering, multiScattering );\n\tvec3 diffuse = material.diffuseColor * ( 1.0 - ( singleScattering + multiScattering ) );\n\treflectedLight.indirectSpecular += clearcoatInv * radiance * singleScattering;\n\treflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;\n\treflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}",
      lights_fragment_begin:
        "\nGeometricContext geometry;\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\n#ifdef CLEARCOAT\n\tgeometry.clearcoatNormal = clearcoatNormal;\n#endif\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointDirectLightIrradiance( pointLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )\n\t\tpointLightShadow = pointLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\tspotLightShadow = spotLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n\t\tdirectionalLightShadow = directionalLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 iblIrradiance = vec3( 0.0 );\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\tirradiance += getLightProbeIrradiance( lightProbe, geometry );\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t}\n\t\t#pragma unroll_loop_end\n\t#endif\n#endif\n#if defined( RE_IndirectSpecular )\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearcoatRadiance = vec3( 0.0 );\n#endif",
      lights_fragment_maps:
        "#if defined( RE_IndirectDiffuse )\n\t#ifdef USE_LIGHTMAP\n\t\tvec4 lightMapTexel= texture2D( lightMap, vUv2 );\n\t\tvec3 lightMapIrradiance = lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tlightMapIrradiance *= PI;\n\t\t#endif\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\tiblIrradiance += getLightProbeIndirectIrradiance( geometry, maxMipLevel );\n\t#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\tradiance += getLightProbeIndirectRadiance( geometry.viewDir, geometry.normal, material.specularRoughness, maxMipLevel );\n\t#ifdef CLEARCOAT\n\t\tclearcoatRadiance += getLightProbeIndirectRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness, maxMipLevel );\n\t#endif\n#endif",
      lights_fragment_end:
        "#if defined( RE_IndirectDiffuse )\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n\tRE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );\n#endif",
      logdepthbuf_fragment:
        "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tgl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif",
      logdepthbuf_pars_fragment:
        "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tuniform float logDepthBufFC;\n\tvarying float vFragDepth;\n\tvarying float vIsPerspective;\n#endif",
      logdepthbuf_pars_vertex:
        "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t\tvarying float vIsPerspective;\n\t#else\n\t\tuniform float logDepthBufFC;\n\t#endif\n#endif",
      logdepthbuf_vertex:
        "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t\tvIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n\t#else\n\t\tif ( isPerspectiveMatrix( projectionMatrix ) ) {\n\t\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\t\t\tgl_Position.z *= gl_Position.w;\n\t\t}\n\t#endif\n#endif",
      map_fragment:
        "#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\ttexelColor = mapTexelToLinear( texelColor );\n\tdiffuseColor *= texelColor;\n#endif",
      map_pars_fragment: "#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif",
      map_particle_fragment:
        "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n#endif\n#ifdef USE_MAP\n\tvec4 mapTexel = texture2D( map, uv );\n\tdiffuseColor *= mapTexelToLinear( mapTexel );\n#endif\n#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, uv ).g;\n#endif",
      map_particle_pars_fragment:
        "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\tuniform mat3 uvTransform;\n#endif\n#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif",
      metalnessmap_fragment:
        "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vUv );\n\tmetalnessFactor *= texelMetalness.b;\n#endif",
      metalnessmap_pars_fragment:
        "#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif",
      morphnormal_vertex:
        "#ifdef USE_MORPHNORMALS\n\tobjectNormal *= morphTargetBaseInfluence;\n\tobjectNormal += morphNormal0 * morphTargetInfluences[ 0 ];\n\tobjectNormal += morphNormal1 * morphTargetInfluences[ 1 ];\n\tobjectNormal += morphNormal2 * morphTargetInfluences[ 2 ];\n\tobjectNormal += morphNormal3 * morphTargetInfluences[ 3 ];\n#endif",
      morphtarget_pars_vertex:
        "#ifdef USE_MORPHTARGETS\n\tuniform float morphTargetBaseInfluence;\n\t#ifndef USE_MORPHNORMALS\n\t\tuniform float morphTargetInfluences[ 8 ];\n\t#else\n\t\tuniform float morphTargetInfluences[ 4 ];\n\t#endif\n#endif",
      morphtarget_vertex:
        "#ifdef USE_MORPHTARGETS\n\ttransformed *= morphTargetBaseInfluence;\n\ttransformed += morphTarget0 * morphTargetInfluences[ 0 ];\n\ttransformed += morphTarget1 * morphTargetInfluences[ 1 ];\n\ttransformed += morphTarget2 * morphTargetInfluences[ 2 ];\n\ttransformed += morphTarget3 * morphTargetInfluences[ 3 ];\n\t#ifndef USE_MORPHNORMALS\n\t\ttransformed += morphTarget4 * morphTargetInfluences[ 4 ];\n\t\ttransformed += morphTarget5 * morphTargetInfluences[ 5 ];\n\t\ttransformed += morphTarget6 * morphTargetInfluences[ 6 ];\n\t\ttransformed += morphTarget7 * morphTargetInfluences[ 7 ];\n\t#endif\n#endif",
      normal_fragment_begin:
        "float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;\n#ifdef FLAT_SHADED\n\tvec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n\tvec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * faceDirection;\n\t#endif\n\t#ifdef USE_TANGENT\n\t\tvec3 tangent = normalize( vTangent );\n\t\tvec3 bitangent = normalize( vBitangent );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\ttangent = tangent * faceDirection;\n\t\t\tbitangent = bitangent * faceDirection;\n\t\t#endif\n\t\t#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )\n\t\t\tmat3 vTBN = mat3( tangent, bitangent, normal );\n\t\t#endif\n\t#endif\n#endif\nvec3 geometryNormal = normal;",
      normal_fragment_maps:
        "#ifdef OBJECTSPACE_NORMALMAP\n\tnormal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t#ifdef FLIP_SIDED\n\t\tnormal = - normal;\n\t#endif\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * faceDirection;\n\t#endif\n\tnormal = normalize( normalMatrix * normal );\n#elif defined( TANGENTSPACE_NORMALMAP )\n\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\tmapN.xy *= normalScale;\n\t#ifdef USE_TANGENT\n\t\tnormal = normalize( vTBN * mapN );\n\t#else\n\t\tnormal = perturbNormal2Arb( -vViewPosition, normal, mapN, faceDirection );\n\t#endif\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd(), faceDirection );\n#endif",
      normalmap_pars_fragment:
        "#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n#endif\n#ifdef OBJECTSPACE_NORMALMAP\n\tuniform mat3 normalMatrix;\n#endif\n#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )\n\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {\n\t\tvec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n\t\tvec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n\t\tvec2 st0 = dFdx( vUv.st );\n\t\tvec2 st1 = dFdy( vUv.st );\n\t\tvec3 N = surf_norm;\n\t\tvec3 q1perp = cross( q1, N );\n\t\tvec3 q0perp = cross( N, q0 );\n\t\tvec3 T = q1perp * st0.x + q0perp * st1.x;\n\t\tvec3 B = q1perp * st0.y + q0perp * st1.y;\n\t\tfloat det = max( dot( T, T ), dot( B, B ) );\n\t\tfloat scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );\n\t\treturn normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );\n\t}\n#endif",
      clearcoat_normal_fragment_begin:
        "#ifdef CLEARCOAT\n\tvec3 clearcoatNormal = geometryNormal;\n#endif",
      clearcoat_normal_fragment_maps:
        "#ifdef USE_CLEARCOAT_NORMALMAP\n\tvec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;\n\tclearcoatMapN.xy *= clearcoatNormalScale;\n\t#ifdef USE_TANGENT\n\t\tclearcoatNormal = normalize( vTBN * clearcoatMapN );\n\t#else\n\t\tclearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );\n\t#endif\n#endif",
      clearcoat_pars_fragment:
        "#ifdef USE_CLEARCOATMAP\n\tuniform sampler2D clearcoatMap;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tuniform sampler2D clearcoatRoughnessMap;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tuniform sampler2D clearcoatNormalMap;\n\tuniform vec2 clearcoatNormalScale;\n#endif",
      packing:
        "vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nvec4 pack2HalfToRGBA( vec2 v ) {\n\tvec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ));\n\treturn vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w);\n}\nvec2 unpackRGBATo2Half( vec4 v ) {\n\treturn vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n\treturn linearClipZ * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn (( near + viewZ ) * far ) / (( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * invClipZ - far );\n}",
      premultiplied_alpha_fragment:
        "#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif",
      project_vertex:
        "vec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_INSTANCING\n\tmvPosition = instanceMatrix * mvPosition;\n#endif\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;",
      dithering_fragment:
        "#ifdef DITHERING\n\tgl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif",
      dithering_pars_fragment:
        "#ifdef DITHERING\n\tvec3 dithering( vec3 color ) {\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\t\treturn color + dither_shift_RGB;\n\t}\n#endif",
      roughnessmap_fragment:
        "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vUv );\n\troughnessFactor *= texelRoughness.g;\n#endif",
      roughnessmap_pars_fragment:
        "#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif",
      shadowmap_pars_fragment:
        "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tvec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {\n\t\treturn unpackRGBATo2Half( texture2D( shadow, uv ) );\n\t}\n\tfloat VSMShadow (sampler2D shadow, vec2 uv, float compare ){\n\t\tfloat occlusion = 1.0;\n\t\tvec2 distribution = texture2DDistribution( shadow, uv );\n\t\tfloat hard_shadow = step( compare , distribution.x );\n\t\tif (hard_shadow != 1.0 ) {\n\t\t\tfloat distance = compare - distribution.x ;\n\t\t\tfloat variance = max( 0.00000, distribution.y * distribution.y );\n\t\t\tfloat softness_probability = variance / (variance + distance * distance );\t\t\tsoftness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );\t\t\tocclusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );\n\t\t}\n\t\treturn occlusion;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tfloat shadow = 1.0;\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\t\tbool frustumTest = all( frustumTestVec );\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tfloat dx2 = dx0 / 2.0;\n\t\t\tfloat dy2 = dy0 / 2.0;\n\t\t\tfloat dx3 = dx1 / 2.0;\n\t\t\tfloat dy3 = dy1 / 2.0;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 17.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx = texelSize.x;\n\t\t\tfloat dy = texelSize.y;\n\t\t\tvec2 uv = shadowCoord.xy;\n\t\t\tvec2 f = fract( uv * shadowMapSize + 0.5 );\n\t\t\tuv -= f * texelSize;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, uv, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ), \n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ), \n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t f.y )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_VSM )\n\t\t\tshadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#else\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn shadow;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tfloat dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );\t\tdp += shadowBias;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t#endif\n\t}\n#endif",
      shadowmap_pars_vertex:
        "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n#endif",
      shadowmap_vertex:
        "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0\n\t\tvec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\tvec4 shadowWorldPosition;\n\t#endif\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n#endif",
      shadowmask_pars_fragment:
        "float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tdirectionalLight = directionalLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tspotLight = spotLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tpointLight = pointLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#endif\n\treturn shadow;\n}",
      skinbase_vertex:
        "#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",
      skinning_pars_vertex:
        "#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\t#ifdef BONE_TEXTURE\n\t\tuniform highp sampler2D boneTexture;\n\t\tuniform int boneTextureSize;\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureSize ) );\n\t\t\tfloat y = floor( j / float( boneTextureSize ) );\n\t\t\tfloat dx = 1.0 / float( boneTextureSize );\n\t\t\tfloat dy = 1.0 / float( boneTextureSize );\n\t\t\ty = dy * ( y + 0.5 );\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\t\treturn bone;\n\t\t}\n\t#else\n\t\tuniform mat4 boneMatrices[ MAX_BONES ];\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tmat4 bone = boneMatrices[ int(i) ];\n\t\t\treturn bone;\n\t\t}\n\t#endif\n#endif",
      skinning_vertex:
        "#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n#endif",
      skinnormal_vertex:
        "#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n\t#ifdef USE_TANGENT\n\t\tobjectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#endif\n#endif",
      specularmap_fragment:
        "float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif",
      specularmap_pars_fragment:
        "#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif",
      tonemapping_fragment:
        "#if defined( TONE_MAPPING )\n\tgl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif",
      tonemapping_pars_fragment:
        "#ifndef saturate\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn toneMappingExposure * color;\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 RRTAndODTFit( vec3 v ) {\n\tvec3 a = v * ( v + 0.0245786 ) - 0.000090537;\n\tvec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;\n\treturn a / b;\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n\tconst mat3 ACESInputMat = mat3(\n\t\tvec3( 0.59719, 0.07600, 0.02840 ),\t\tvec3( 0.35458, 0.90834, 0.13383 ),\n\t\tvec3( 0.04823, 0.01566, 0.83777 )\n\t);\n\tconst mat3 ACESOutputMat = mat3(\n\t\tvec3(  1.60475, -0.10208, -0.00327 ),\t\tvec3( -0.53108,  1.10813, -0.07276 ),\n\t\tvec3( -0.07367, -0.00605,  1.07602 )\n\t);\n\tcolor *= toneMappingExposure / 0.6;\n\tcolor = ACESInputMat * color;\n\tcolor = RRTAndODTFit( color );\n\tcolor = ACESOutputMat * color;\n\treturn saturate( color );\n}\nvec3 CustomToneMapping( vec3 color ) { return color; }",
      transmissionmap_fragment:
        "#ifdef USE_TRANSMISSIONMAP\n\ttotalTransmission *= texture2D( transmissionMap, vUv ).r;\n#endif",
      transmissionmap_pars_fragment:
        "#ifdef USE_TRANSMISSIONMAP\n\tuniform sampler2D transmissionMap;\n#endif",
      uv_pars_fragment:
        "#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )\n\tvarying vec2 vUv;\n#endif",
      uv_pars_vertex:
        "#ifdef USE_UV\n\t#ifdef UVS_VERTEX_ONLY\n\t\tvec2 vUv;\n\t#else\n\t\tvarying vec2 vUv;\n\t#endif\n\tuniform mat3 uvTransform;\n#endif",
      uv_vertex:
        "#ifdef USE_UV\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n#endif",
      uv2_pars_fragment:
        "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvarying vec2 vUv2;\n#endif",
      uv2_pars_vertex:
        "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n\tuniform mat3 uv2Transform;\n#endif",
      uv2_vertex:
        "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;\n#endif",
      worldpos_vertex:
        "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )\n\tvec4 worldPosition = vec4( transformed, 1.0 );\n\t#ifdef USE_INSTANCING\n\t\tworldPosition = instanceMatrix * worldPosition;\n\t#endif\n\tworldPosition = modelMatrix * worldPosition;\n#endif",
      background_frag:
        "uniform sampler2D t2D;\nvarying vec2 vUv;\nvoid main() {\n\tvec4 texColor = texture2D( t2D, vUv );\n\tgl_FragColor = mapTexelToLinear( texColor );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}",
      background_vert:
        "varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\tgl_Position = vec4( position.xy, 1.0, 1.0 );\n}",
      cube_frag:
        "#include <envmap_common_pars_fragment>\nuniform float opacity;\nvarying vec3 vWorldDirection;\n#include <cube_uv_reflection_fragment>\nvoid main() {\n\tvec3 vReflect = vWorldDirection;\n\t#include <envmap_fragment>\n\tgl_FragColor = envColor;\n\tgl_FragColor.a *= opacity;\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}",
      cube_vert:
        "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}",
      depth_frag:
        "#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <logdepthbuf_fragment>\n\tfloat fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( fragCoordZ );\n\t#endif\n}",
      depth_vert:
        "#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvHighPrecisionZW = gl_Position.zw;\n}",
      distanceRGBA_frag:
        "#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist );\n\tgl_FragColor = packDepthToRGBA( dist );\n}",
      distanceRGBA_vert:
        "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition.xyz;\n}",
      equirect_frag:
        "uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldDirection );\n\tvec2 sampleUV = equirectUv( direction );\n\tvec4 texColor = texture2D( tEquirect, sampleUV );\n\tgl_FragColor = mapTexelToLinear( texColor );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}",
      equirect_vert:
        "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}",
      linedashed_frag:
        "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}",
      linedashed_vert:
        "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\tvLineDistance = scale * lineDistance;\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}",
      meshbasic_frag:
        "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\n\t\tvec4 lightMapTexel= texture2D( lightMap, vUv2 );\n\t\treflectedLight.indirectDiffuse += lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
      meshbasic_vert:
        "#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_ENVMAP\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}",
      meshlambert_frag:
        "uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <emissivemap_fragment>\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;\n\t#else\n\t\treflectedLight.indirectDiffuse += vIndirectFront;\n\t#endif\n\t#include <lightmap_fragment>\n\treflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\t#else\n\t\treflectedLight.directDiffuse = vLightFront;\n\t#endif\n\treflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
      meshlambert_vert:
        "#define LAMBERT\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <lights_lambert_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
      meshmatcap_frag:
        "#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tvec3 viewDir = normalize( vViewPosition );\n\tvec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n\tvec3 y = cross( viewDir, x );\n\tvec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n\t#ifdef USE_MATCAP\n\t\tvec4 matcapColor = texture2D( matcap, uv );\n\t\tmatcapColor = matcapTexelToLinear( matcapColor );\n\t#else\n\t\tvec4 matcapColor = vec4( 1.0 );\n\t#endif\n\tvec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
      meshmatcap_vert:
        "#define MATCAP\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#ifndef FLAT_SHADED\n\t\tvNormal = normalize( transformedNormal );\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\tvViewPosition = - mvPosition.xyz;\n}",
      meshtoon_frag:
        "#define TOON\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_toon_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
      meshtoon_vert:
        "#define TOON\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
      meshphong_frag:
        "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
      meshphong_vert:
        "#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
      meshphysical_frag:
        "#define STANDARD\n#ifdef PHYSICAL\n\t#define REFLECTIVITY\n\t#define CLEARCOAT\n\t#define TRANSMISSION\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef TRANSMISSION\n\tuniform float transmission;\n#endif\n#ifdef REFLECTIVITY\n\tuniform float reflectivity;\n#endif\n#ifdef CLEARCOAT\n\tuniform float clearcoat;\n\tuniform float clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\n\tuniform vec3 sheen;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <transmissionmap_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <lights_physical_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#ifdef TRANSMISSION\n\t\tfloat totalTransmission = transmission;\n\t#endif\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <clearcoat_normal_fragment_begin>\n\t#include <clearcoat_normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <transmissionmap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#ifdef TRANSMISSION\n\t\tdiffuseColor.a *= mix( saturate( 1. - totalTransmission + linearToRelativeLuminance( reflectedLight.directSpecular + reflectedLight.indirectSpecular ) ), 1.0, metalness );\n\t#endif\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
      meshphysical_vert:
        "#define STANDARD\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
      normal_frag:
        "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n}",
      normal_vert:
        "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}",
      points_frag:
        "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}",
      points_vert:
        "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\tgl_PointSize = size;\n\t#ifdef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <fog_vertex>\n}",
      shadow_frag:
        "uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}",
      shadow_vert:
        "#include <common>\n#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
      sprite_frag:
        "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}",
      sprite_vert:
        "uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\tvec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\n\tvec2 scale;\n\tscale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );\n\tscale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );\n\t#ifndef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) scale *= - mvPosition.z;\n\t#endif\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\tmvPosition.xy += rotatedPosition;\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}",
    },
    yn = {
      common: {
        diffuse: { value: new he(15658734) },
        opacity: { value: 1 },
        map: { value: null },
        uvTransform: { value: new D() },
        uv2Transform: { value: new D() },
        alphaMap: { value: null },
      },
      specularmap: { specularMap: { value: null } },
      envmap: {
        envMap: { value: null },
        flipEnvMap: { value: -1 },
        reflectivity: { value: 1 },
        refractionRatio: { value: 0.98 },
        maxMipLevel: { value: 0 },
      },
      aomap: { aoMap: { value: null }, aoMapIntensity: { value: 1 } },
      lightmap: { lightMap: { value: null }, lightMapIntensity: { value: 1 } },
      emissivemap: { emissiveMap: { value: null } },
      bumpmap: { bumpMap: { value: null }, bumpScale: { value: 1 } },
      normalmap: {
        normalMap: { value: null },
        normalScale: { value: new P(1, 1) },
      },
      displacementmap: {
        displacementMap: { value: null },
        displacementScale: { value: 1 },
        displacementBias: { value: 0 },
      },
      roughnessmap: { roughnessMap: { value: null } },
      metalnessmap: { metalnessMap: { value: null } },
      gradientmap: { gradientMap: { value: null } },
      fog: {
        fogDensity: { value: 25e-5 },
        fogNear: { value: 1 },
        fogFar: { value: 2e3 },
        fogColor: { value: new he(16777215) },
      },
      lights: {
        ambientLightColor: { value: [] },
        lightProbe: { value: [] },
        directionalLights: {
          value: [],
          properties: { direction: {}, color: {} },
        },
        directionalLightShadows: {
          value: [],
          properties: {
            shadowBias: {},
            shadowNormalBias: {},
            shadowRadius: {},
            shadowMapSize: {},
          },
        },
        directionalShadowMap: { value: [] },
        directionalShadowMatrix: { value: [] },
        spotLights: {
          value: [],
          properties: {
            color: {},
            position: {},
            direction: {},
            distance: {},
            coneCos: {},
            penumbraCos: {},
            decay: {},
          },
        },
        spotLightShadows: {
          value: [],
          properties: {
            shadowBias: {},
            shadowNormalBias: {},
            shadowRadius: {},
            shadowMapSize: {},
          },
        },
        spotShadowMap: { value: [] },
        spotShadowMatrix: { value: [] },
        pointLights: {
          value: [],
          properties: { color: {}, position: {}, decay: {}, distance: {} },
        },
        pointLightShadows: {
          value: [],
          properties: {
            shadowBias: {},
            shadowNormalBias: {},
            shadowRadius: {},
            shadowMapSize: {},
            shadowCameraNear: {},
            shadowCameraFar: {},
          },
        },
        pointShadowMap: { value: [] },
        pointShadowMatrix: { value: [] },
        hemisphereLights: {
          value: [],
          properties: { direction: {}, skyColor: {}, groundColor: {} },
        },
        rectAreaLights: {
          value: [],
          properties: { color: {}, position: {}, width: {}, height: {} },
        },
        ltc_1: { value: null },
        ltc_2: { value: null },
      },
      points: {
        diffuse: { value: new he(15658734) },
        opacity: { value: 1 },
        size: { value: 1 },
        scale: { value: 1 },
        map: { value: null },
        alphaMap: { value: null },
        uvTransform: { value: new D() },
      },
      sprite: {
        diffuse: { value: new he(15658734) },
        opacity: { value: 1 },
        center: { value: new P(0.5, 0.5) },
        rotation: { value: 0 },
        map: { value: null },
        alphaMap: { value: null },
        uvTransform: { value: new D() },
      },
    },
    xn = {
      basic: {
        uniforms: en([
          yn.common,
          yn.specularmap,
          yn.envmap,
          yn.aomap,
          yn.lightmap,
          yn.fog,
        ]),
        vertexShader: _n.meshbasic_vert,
        fragmentShader: _n.meshbasic_frag,
      },
      lambert: {
        uniforms: en([
          yn.common,
          yn.specularmap,
          yn.envmap,
          yn.aomap,
          yn.lightmap,
          yn.emissivemap,
          yn.fog,
          yn.lights,
          { emissive: { value: new he(0) } },
        ]),
        vertexShader: _n.meshlambert_vert,
        fragmentShader: _n.meshlambert_frag,
      },
      phong: {
        uniforms: en([
          yn.common,
          yn.specularmap,
          yn.envmap,
          yn.aomap,
          yn.lightmap,
          yn.emissivemap,
          yn.bumpmap,
          yn.normalmap,
          yn.displacementmap,
          yn.fog,
          yn.lights,
          {
            emissive: { value: new he(0) },
            specular: { value: new he(1118481) },
            shininess: { value: 30 },
          },
        ]),
        vertexShader: _n.meshphong_vert,
        fragmentShader: _n.meshphong_frag,
      },
      standard: {
        uniforms: en([
          yn.common,
          yn.envmap,
          yn.aomap,
          yn.lightmap,
          yn.emissivemap,
          yn.bumpmap,
          yn.normalmap,
          yn.displacementmap,
          yn.roughnessmap,
          yn.metalnessmap,
          yn.fog,
          yn.lights,
          {
            emissive: { value: new he(0) },
            roughness: { value: 1 },
            metalness: { value: 0 },
            envMapIntensity: { value: 1 },
          },
        ]),
        vertexShader: _n.meshphysical_vert,
        fragmentShader: _n.meshphysical_frag,
      },
      toon: {
        uniforms: en([
          yn.common,
          yn.aomap,
          yn.lightmap,
          yn.emissivemap,
          yn.bumpmap,
          yn.normalmap,
          yn.displacementmap,
          yn.gradientmap,
          yn.fog,
          yn.lights,
          { emissive: { value: new he(0) } },
        ]),
        vertexShader: _n.meshtoon_vert,
        fragmentShader: _n.meshtoon_frag,
      },
      matcap: {
        uniforms: en([
          yn.common,
          yn.bumpmap,
          yn.normalmap,
          yn.displacementmap,
          yn.fog,
          { matcap: { value: null } },
        ]),
        vertexShader: _n.meshmatcap_vert,
        fragmentShader: _n.meshmatcap_frag,
      },
      points: {
        uniforms: en([yn.points, yn.fog]),
        vertexShader: _n.points_vert,
        fragmentShader: _n.points_frag,
      },
      dashed: {
        uniforms: en([
          yn.common,
          yn.fog,
          {
            scale: { value: 1 },
            dashSize: { value: 1 },
            totalSize: { value: 2 },
          },
        ]),
        vertexShader: _n.linedashed_vert,
        fragmentShader: _n.linedashed_frag,
      },
      depth: {
        uniforms: en([yn.common, yn.displacementmap]),
        vertexShader: _n.depth_vert,
        fragmentShader: _n.depth_frag,
      },
      normal: {
        uniforms: en([
          yn.common,
          yn.bumpmap,
          yn.normalmap,
          yn.displacementmap,
          { opacity: { value: 1 } },
        ]),
        vertexShader: _n.normal_vert,
        fragmentShader: _n.normal_frag,
      },
      sprite: {
        uniforms: en([yn.sprite, yn.fog]),
        vertexShader: _n.sprite_vert,
        fragmentShader: _n.sprite_frag,
      },
      background: {
        uniforms: { uvTransform: { value: new D() }, t2D: { value: null } },
        vertexShader: _n.background_vert,
        fragmentShader: _n.background_frag,
      },
      cube: {
        uniforms: en([yn.envmap, { opacity: { value: 1 } }]),
        vertexShader: _n.cube_vert,
        fragmentShader: _n.cube_frag,
      },
      equirect: {
        uniforms: { tEquirect: { value: null } },
        vertexShader: _n.equirect_vert,
        fragmentShader: _n.equirect_frag,
      },
      distanceRGBA: {
        uniforms: en([
          yn.common,
          yn.displacementmap,
          {
            referencePosition: { value: new k() },
            nearDistance: { value: 1 },
            farDistance: { value: 1e3 },
          },
        ]),
        vertexShader: _n.distanceRGBA_vert,
        fragmentShader: _n.distanceRGBA_frag,
      },
      shadow: {
        uniforms: en([
          yn.lights,
          yn.fog,
          { color: { value: new he(0) }, opacity: { value: 1 } },
        ]),
        vertexShader: _n.shadow_vert,
        fragmentShader: _n.shadow_frag,
      },
    };
  function bn(t, e, n, i, r) {
    const s = new he(0);
    let o,
      a,
      l = 0,
      c = null,
      h = 0,
      u = null;
    function d(t, e) {
      n.buffers.color.setClear(t.r, t.g, t.b, e, r);
    }
    return {
      getClearColor: function () {
        return s;
      },
      setClearColor: function (t, e = 1) {
        s.set(t), (l = e), d(s, l);
      },
      getClearAlpha: function () {
        return l;
      },
      setClearAlpha: function (t) {
        (l = t), d(s, l);
      },
      render: function (n, r, p, f) {
        let m = !0 === r.isScene ? r.background : null;
        m && m.isTexture && (m = e.get(m));
        const g = t.xr,
          v = g.getSession && g.getSession();
        v && "additive" === v.environmentBlendMode && (m = null),
          null === m ? d(s, l) : m && m.isColor && (d(m, 1), (f = !0)),
          (t.autoClear || f) &&
            t.clear(t.autoClearColor, t.autoClearDepth, t.autoClearStencil),
          m &&
          (m.isCubeTexture || m.isWebGLCubeRenderTarget || 306 === m.mapping)
            ? (void 0 === a &&
                ((a = new Qe(
                  new $e(1, 1, 1),
                  new rn({
                    name: "BackgroundCubeMaterial",
                    uniforms: tn(xn.cube.uniforms),
                    vertexShader: xn.cube.vertexShader,
                    fragmentShader: xn.cube.fragmentShader,
                    side: 1,
                    depthTest: !1,
                    depthWrite: !1,
                    fog: !1,
                  })
                )),
                a.geometry.deleteAttribute("normal"),
                a.geometry.deleteAttribute("uv"),
                (a.onBeforeRender = function (t, e, n) {
                  this.matrixWorld.copyPosition(n.matrixWorld);
                }),
                Object.defineProperty(a.material, "envMap", {
                  get: function () {
                    return this.uniforms.envMap.value;
                  },
                }),
                i.update(a)),
              m.isWebGLCubeRenderTarget && (m = m.texture),
              (a.material.uniforms.envMap.value = m),
              (a.material.uniforms.flipEnvMap.value =
                m.isCubeTexture && m._needsFlipEnvMap ? -1 : 1),
              (c === m && h === m.version && u === t.toneMapping) ||
                ((a.material.needsUpdate = !0),
                (c = m),
                (h = m.version),
                (u = t.toneMapping)),
              n.unshift(a, a.geometry, a.material, 0, 0, null))
            : m &&
              m.isTexture &&
              (void 0 === o &&
                ((o = new Qe(
                  new vn(2, 2),
                  new rn({
                    name: "BackgroundMaterial",
                    uniforms: tn(xn.background.uniforms),
                    vertexShader: xn.background.vertexShader,
                    fragmentShader: xn.background.fragmentShader,
                    side: 0,
                    depthTest: !1,
                    depthWrite: !1,
                    fog: !1,
                  })
                )),
                o.geometry.deleteAttribute("normal"),
                Object.defineProperty(o.material, "map", {
                  get: function () {
                    return this.uniforms.t2D.value;
                  },
                }),
                i.update(o)),
              (o.material.uniforms.t2D.value = m),
              !0 === m.matrixAutoUpdate && m.updateMatrix(),
              o.material.uniforms.uvTransform.value.copy(m.matrix),
              (c === m && h === m.version && u === t.toneMapping) ||
                ((o.material.needsUpdate = !0),
                (c = m),
                (h = m.version),
                (u = t.toneMapping)),
              n.unshift(o, o.geometry, o.material, 0, 0, null));
      },
    };
  }
  function wn(t, e, n, i) {
    const r = t.getParameter(34921),
      s = i.isWebGL2 ? null : e.get("OES_vertex_array_object"),
      o = i.isWebGL2 || null !== s,
      a = {},
      l = d(null);
    let c = l;
    function h(e) {
      return i.isWebGL2 ? t.bindVertexArray(e) : s.bindVertexArrayOES(e);
    }
    function u(e) {
      return i.isWebGL2 ? t.deleteVertexArray(e) : s.deleteVertexArrayOES(e);
    }
    function d(t) {
      const e = [],
        n = [],
        i = [];
      for (let t = 0; t < r; t++) (e[t] = 0), (n[t] = 0), (i[t] = 0);
      return {
        geometry: null,
        program: null,
        wireframe: !1,
        newAttributes: e,
        enabledAttributes: n,
        attributeDivisors: i,
        object: t,
        attributes: {},
        index: null,
      };
    }
    function p() {
      const t = c.newAttributes;
      for (let e = 0, n = t.length; e < n; e++) t[e] = 0;
    }
    function f(t) {
      m(t, 0);
    }
    function m(n, r) {
      const s = c.newAttributes,
        o = c.enabledAttributes,
        a = c.attributeDivisors;
      (s[n] = 1),
        0 === o[n] && (t.enableVertexAttribArray(n), (o[n] = 1)),
        a[n] !== r &&
          ((i.isWebGL2 ? t : e.get("ANGLE_instanced_arrays"))[
            i.isWebGL2 ? "vertexAttribDivisor" : "vertexAttribDivisorANGLE"
          ](n, r),
          (a[n] = r));
    }
    function g() {
      const e = c.newAttributes,
        n = c.enabledAttributes;
      for (let i = 0, r = n.length; i < r; i++)
        n[i] !== e[i] && (t.disableVertexAttribArray(i), (n[i] = 0));
    }
    function v(e, n, r, s, o, a) {
      !0 !== i.isWebGL2 || (5124 !== r && 5125 !== r)
        ? t.vertexAttribPointer(e, n, r, s, o, a)
        : t.vertexAttribIPointer(e, n, r, o, a);
    }
    function _() {
      y(), c !== l && ((c = l), h(c.object));
    }
    function y() {
      (l.geometry = null), (l.program = null), (l.wireframe = !1);
    }
    return {
      setup: function (r, l, u, _, y) {
        let x = !1;
        if (o) {
          const e = (function (e, n, r) {
            const o = !0 === r.wireframe;
            let l = a[e.id];
            void 0 === l && ((l = {}), (a[e.id] = l));
            let c = l[n.id];
            void 0 === c && ((c = {}), (l[n.id] = c));
            let h = c[o];
            return (
              void 0 === h &&
                ((h = d(
                  i.isWebGL2 ? t.createVertexArray() : s.createVertexArrayOES()
                )),
                (c[o] = h)),
              h
            );
          })(_, u, l);
          c !== e && ((c = e), h(c.object)),
            (x = (function (t, e) {
              const n = c.attributes,
                i = t.attributes;
              let r = 0;
              for (const t in i) {
                const e = n[t],
                  s = i[t];
                if (void 0 === e) return !0;
                if (e.attribute !== s) return !0;
                if (e.data !== s.data) return !0;
                r++;
              }
              return c.attributesNum !== r || c.index !== e;
            })(_, y)),
            x &&
              (function (t, e) {
                const n = {},
                  i = t.attributes;
                let r = 0;
                for (const t in i) {
                  const e = i[t],
                    s = {};
                  (s.attribute = e),
                    e.data && (s.data = e.data),
                    (n[t] = s),
                    r++;
                }
                (c.attributes = n), (c.attributesNum = r), (c.index = e);
              })(_, y);
        } else {
          const t = !0 === l.wireframe;
          (c.geometry === _.id && c.program === u.id && c.wireframe === t) ||
            ((c.geometry = _.id),
            (c.program = u.id),
            (c.wireframe = t),
            (x = !0));
        }
        !0 === r.isInstancedMesh && (x = !0),
          null !== y && n.update(y, 34963),
          x &&
            ((function (r, s, o, a) {
              if (
                !1 === i.isWebGL2 &&
                (r.isInstancedMesh || a.isInstancedBufferGeometry) &&
                null === e.get("ANGLE_instanced_arrays")
              )
                return;
              p();
              const l = a.attributes,
                c = o.getAttributes(),
                h = s.defaultAttributeValues;
              for (const e in c) {
                const i = c[e];
                if (i >= 0) {
                  const s = l[e];
                  if (void 0 !== s) {
                    const e = s.normalized,
                      r = s.itemSize,
                      o = n.get(s);
                    if (void 0 === o) continue;
                    const l = o.buffer,
                      c = o.type,
                      h = o.bytesPerElement;
                    if (s.isInterleavedBufferAttribute) {
                      const n = s.data,
                        o = n.stride,
                        u = s.offset;
                      n && n.isInstancedInterleavedBuffer
                        ? (m(i, n.meshPerAttribute),
                          void 0 === a._maxInstanceCount &&
                            (a._maxInstanceCount =
                              n.meshPerAttribute * n.count))
                        : f(i),
                        t.bindBuffer(34962, l),
                        v(i, r, c, e, o * h, u * h);
                    } else
                      s.isInstancedBufferAttribute
                        ? (m(i, s.meshPerAttribute),
                          void 0 === a._maxInstanceCount &&
                            (a._maxInstanceCount =
                              s.meshPerAttribute * s.count))
                        : f(i),
                        t.bindBuffer(34962, l),
                        v(i, r, c, e, 0, 0);
                  } else if ("instanceMatrix" === e) {
                    const e = n.get(r.instanceMatrix);
                    if (void 0 === e) continue;
                    const s = e.buffer,
                      o = e.type;
                    m(i + 0, 1),
                      m(i + 1, 1),
                      m(i + 2, 1),
                      m(i + 3, 1),
                      t.bindBuffer(34962, s),
                      t.vertexAttribPointer(i + 0, 4, o, !1, 64, 0),
                      t.vertexAttribPointer(i + 1, 4, o, !1, 64, 16),
                      t.vertexAttribPointer(i + 2, 4, o, !1, 64, 32),
                      t.vertexAttribPointer(i + 3, 4, o, !1, 64, 48);
                  } else if ("instanceColor" === e) {
                    const e = n.get(r.instanceColor);
                    if (void 0 === e) continue;
                    const s = e.buffer,
                      o = e.type;
                    m(i, 1),
                      t.bindBuffer(34962, s),
                      t.vertexAttribPointer(i, 3, o, !1, 12, 0);
                  } else if (void 0 !== h) {
                    const n = h[e];
                    if (void 0 !== n)
                      switch (n.length) {
                        case 2:
                          t.vertexAttrib2fv(i, n);
                          break;
                        case 3:
                          t.vertexAttrib3fv(i, n);
                          break;
                        case 4:
                          t.vertexAttrib4fv(i, n);
                          break;
                        default:
                          t.vertexAttrib1fv(i, n);
                      }
                  }
                }
              }
              g();
            })(r, l, u, _),
            null !== y && t.bindBuffer(34963, n.get(y).buffer));
      },
      reset: _,
      resetDefaultState: y,
      dispose: function () {
        _();
        for (const t in a) {
          const e = a[t];
          for (const t in e) {
            const n = e[t];
            for (const t in n) u(n[t].object), delete n[t];
            delete e[t];
          }
          delete a[t];
        }
      },
      releaseStatesOfGeometry: function (t) {
        if (void 0 === a[t.id]) return;
        const e = a[t.id];
        for (const t in e) {
          const n = e[t];
          for (const t in n) u(n[t].object), delete n[t];
          delete e[t];
        }
        delete a[t.id];
      },
      releaseStatesOfProgram: function (t) {
        for (const e in a) {
          const n = a[e];
          if (void 0 === n[t.id]) continue;
          const i = n[t.id];
          for (const t in i) u(i[t].object), delete i[t];
          delete n[t.id];
        }
      },
      initAttributes: p,
      enableAttribute: f,
      disableUnusedAttributes: g,
    };
  }
  function Mn(t, e, n, i) {
    const r = i.isWebGL2;
    let s;
    (this.setMode = function (t) {
      s = t;
    }),
      (this.render = function (e, i) {
        t.drawArrays(s, e, i), n.update(i, s, 1);
      }),
      (this.renderInstances = function (i, o, a) {
        if (0 === a) return;
        let l, c;
        if (r) (l = t), (c = "drawArraysInstanced");
        else if (
          ((l = e.get("ANGLE_instanced_arrays")),
          (c = "drawArraysInstancedANGLE"),
          null === l)
        )
          return void console.error(
            "THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays."
          );
        l[c](s, i, o, a), n.update(o, s, a);
      });
  }
  function Sn(t, e, n) {
    let i;
    function r(e) {
      if ("highp" === e) {
        if (
          t.getShaderPrecisionFormat(35633, 36338).precision > 0 &&
          t.getShaderPrecisionFormat(35632, 36338).precision > 0
        )
          return "highp";
        e = "mediump";
      }
      return "mediump" === e &&
        t.getShaderPrecisionFormat(35633, 36337).precision > 0 &&
        t.getShaderPrecisionFormat(35632, 36337).precision > 0
        ? "mediump"
        : "lowp";
    }
    const s =
      ("undefined" != typeof WebGL2RenderingContext &&
        t instanceof WebGL2RenderingContext) ||
      ("undefined" != typeof WebGL2ComputeRenderingContext &&
        t instanceof WebGL2ComputeRenderingContext);
    let o = void 0 !== n.precision ? n.precision : "highp";
    const a = r(o);
    a !== o &&
      (console.warn(
        "THREE.WebGLRenderer:",
        o,
        "not supported, using",
        a,
        "instead."
      ),
      (o = a));
    const l = !0 === n.logarithmicDepthBuffer,
      c = t.getParameter(34930),
      h = t.getParameter(35660),
      u = t.getParameter(3379),
      d = t.getParameter(34076),
      p = t.getParameter(34921),
      f = t.getParameter(36347),
      m = t.getParameter(36348),
      g = t.getParameter(36349),
      v = h > 0,
      _ = s || e.has("OES_texture_float");
    return {
      isWebGL2: s,
      getMaxAnisotropy: function () {
        if (void 0 !== i) return i;
        if (!0 === e.has("EXT_texture_filter_anisotropic")) {
          const n = e.get("EXT_texture_filter_anisotropic");
          i = t.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
        } else i = 0;
        return i;
      },
      getMaxPrecision: r,
      precision: o,
      logarithmicDepthBuffer: l,
      maxTextures: c,
      maxVertexTextures: h,
      maxTextureSize: u,
      maxCubemapSize: d,
      maxAttributes: p,
      maxVertexUniforms: f,
      maxVaryings: m,
      maxFragmentUniforms: g,
      vertexTextures: v,
      floatFragmentTextures: _,
      floatVertexTextures: v && _,
      maxSamples: s ? t.getParameter(36183) : 0,
    };
  }
  function En(t) {
    const e = this;
    let n = null,
      i = 0,
      r = !1,
      s = !1;
    const o = new Wt(),
      a = new D(),
      l = { value: null, needsUpdate: !1 };
    function c() {
      l.value !== n && ((l.value = n), (l.needsUpdate = i > 0)),
        (e.numPlanes = i),
        (e.numIntersection = 0);
    }
    function h(t, n, i, r) {
      const s = null !== t ? t.length : 0;
      let c = null;
      if (0 !== s) {
        if (((c = l.value), !0 !== r || null === c)) {
          const e = i + 4 * s,
            r = n.matrixWorldInverse;
          a.getNormalMatrix(r),
            (null === c || c.length < e) && (c = new Float32Array(e));
          for (let e = 0, n = i; e !== s; ++e, n += 4)
            o.copy(t[e]).applyMatrix4(r, a),
              o.normal.toArray(c, n),
              (c[n + 3] = o.constant);
        }
        (l.value = c), (l.needsUpdate = !0);
      }
      return (e.numPlanes = s), (e.numIntersection = 0), c;
    }
    (this.uniform = l),
      (this.numPlanes = 0),
      (this.numIntersection = 0),
      (this.init = function (t, e, s) {
        const o = 0 !== t.length || e || 0 !== i || r;
        return (r = e), (n = h(t, s, 0)), (i = t.length), o;
      }),
      (this.beginShadows = function () {
        (s = !0), h(null);
      }),
      (this.endShadows = function () {
        (s = !1), c();
      }),
      (this.setState = function (e, o, a) {
        const u = e.clippingPlanes,
          d = e.clipIntersection,
          p = e.clipShadows,
          f = t.get(e);
        if (!r || null === u || 0 === u.length || (s && !p)) s ? h(null) : c();
        else {
          const t = s ? 0 : i,
            e = 4 * t;
          let r = f.clippingState || null;
          (l.value = r), (r = h(u, o, e, a));
          for (let t = 0; t !== e; ++t) r[t] = n[t];
          (f.clippingState = r),
            (this.numIntersection = d ? this.numPlanes : 0),
            (this.numPlanes += t);
        }
      });
  }
  function Tn(t) {
    let e = new WeakMap();
    function n(t, e) {
      return 303 === e ? (t.mapping = 301) : 304 === e && (t.mapping = 302), t;
    }
    function i(t) {
      const n = t.target;
      n.removeEventListener("dispose", i);
      const r = e.get(n);
      void 0 !== r && (e.delete(n), r.dispose());
    }
    return {
      get: function (r) {
        if (r && r.isTexture) {
          const s = r.mapping;
          if (303 === s || 304 === s) {
            if (e.has(r)) return n(e.get(r).texture, r.mapping);
            {
              const s = r.image;
              if (s && s.height > 0) {
                const o = t.getRenderTarget(),
                  a = new hn(s.height / 2);
                return (
                  a.fromEquirectangularTexture(t, r),
                  e.set(r, a),
                  t.setRenderTarget(o),
                  r.addEventListener("dispose", i),
                  n(a.texture, r.mapping)
                );
              }
              return null;
            }
          }
        }
        return r;
      },
      dispose: function () {
        e = new WeakMap();
      },
    };
  }
  function An(t) {
    const e = {};
    function n(n) {
      if (void 0 !== e[n]) return e[n];
      let i;
      switch (n) {
        case "WEBGL_depth_texture":
          i =
            t.getExtension("WEBGL_depth_texture") ||
            t.getExtension("MOZ_WEBGL_depth_texture") ||
            t.getExtension("WEBKIT_WEBGL_depth_texture");
          break;
        case "EXT_texture_filter_anisotropic":
          i =
            t.getExtension("EXT_texture_filter_anisotropic") ||
            t.getExtension("MOZ_EXT_texture_filter_anisotropic") ||
            t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
          break;
        case "WEBGL_compressed_texture_s3tc":
          i =
            t.getExtension("WEBGL_compressed_texture_s3tc") ||
            t.getExtension("MOZ_WEBGL_compressed_texture_s3tc") ||
            t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
          break;
        case "WEBGL_compressed_texture_pvrtc":
          i =
            t.getExtension("WEBGL_compressed_texture_pvrtc") ||
            t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
          break;
        default:
          i = t.getExtension(n);
      }
      return (e[n] = i), i;
    }
    return {
      has: function (t) {
        return null !== n(t);
      },
      init: function (t) {
        t.isWebGL2
          ? n("EXT_color_buffer_float")
          : (n("WEBGL_depth_texture"),
            n("OES_texture_float"),
            n("OES_texture_half_float"),
            n("OES_texture_half_float_linear"),
            n("OES_standard_derivatives"),
            n("OES_element_index_uint"),
            n("OES_vertex_array_object"),
            n("ANGLE_instanced_arrays")),
          n("OES_texture_float_linear"),
          n("EXT_color_buffer_half_float");
      },
      get: function (t) {
        const e = n(t);
        return (
          null === e &&
            console.warn(
              "THREE.WebGLRenderer: " + t + " extension not supported."
            ),
          e
        );
      },
    };
  }
  function Ln(t, e, n, i) {
    const r = {},
      s = new WeakMap();
    function o(t) {
      const a = t.target;
      null !== a.index && e.remove(a.index);
      for (const t in a.attributes) e.remove(a.attributes[t]);
      a.removeEventListener("dispose", o), delete r[a.id];
      const l = s.get(a);
      l && (e.remove(l), s.delete(a)),
        i.releaseStatesOfGeometry(a),
        !0 === a.isInstancedBufferGeometry && delete a._maxInstanceCount,
        n.memory.geometries--;
    }
    function a(t) {
      const n = [],
        i = t.index,
        r = t.attributes.position;
      let o = 0;
      if (null !== i) {
        const t = i.array;
        o = i.version;
        for (let e = 0, i = t.length; e < i; e += 3) {
          const i = t[e + 0],
            r = t[e + 1],
            s = t[e + 2];
          n.push(i, r, r, s, s, i);
        }
      } else {
        const t = r.array;
        o = r.version;
        for (let e = 0, i = t.length / 3 - 1; e < i; e += 3) {
          const t = e + 0,
            i = e + 1,
            r = e + 2;
          n.push(t, i, i, r, r, t);
        }
      }
      const a = new (Ee(n) > 65535 ? be : ye)(n, 1);
      a.version = o;
      const l = s.get(t);
      l && e.remove(l), s.set(t, a);
    }
    return {
      get: function (t, e) {
        return (
          !0 === r[e.id] ||
            (e.addEventListener("dispose", o),
            (r[e.id] = !0),
            n.memory.geometries++),
          e
        );
      },
      update: function (t) {
        const n = t.attributes;
        for (const t in n) e.update(n[t], 34962);
        const i = t.morphAttributes;
        for (const t in i) {
          const n = i[t];
          for (let t = 0, i = n.length; t < i; t++) e.update(n[t], 34962);
        }
      },
      getWireframeAttribute: function (t) {
        const e = s.get(t);
        if (e) {
          const n = t.index;
          null !== n && e.version < n.version && a(t);
        } else a(t);
        return s.get(t);
      },
    };
  }
  function Cn(t, e, n, i) {
    const r = i.isWebGL2;
    let s, o, a;
    (this.setMode = function (t) {
      s = t;
    }),
      (this.setIndex = function (t) {
        (o = t.type), (a = t.bytesPerElement);
      }),
      (this.render = function (e, i) {
        t.drawElements(s, i, o, e * a), n.update(i, s, 1);
      }),
      (this.renderInstances = function (i, l, c) {
        if (0 === c) return;
        let h, u;
        if (r) (h = t), (u = "drawElementsInstanced");
        else if (
          ((h = e.get("ANGLE_instanced_arrays")),
          (u = "drawElementsInstancedANGLE"),
          null === h)
        )
          return void console.error(
            "THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays."
          );
        h[u](s, l, o, i * a, c), n.update(l, s, c);
      });
  }
  function Rn(t) {
    const e = { frame: 0, calls: 0, triangles: 0, points: 0, lines: 0 };
    return {
      memory: { geometries: 0, textures: 0 },
      render: e,
      programs: null,
      autoReset: !0,
      reset: function () {
        e.frame++,
          (e.calls = 0),
          (e.triangles = 0),
          (e.points = 0),
          (e.lines = 0);
      },
      update: function (t, n, i) {
        switch ((e.calls++, n)) {
          case 4:
            e.triangles += i * (t / 3);
            break;
          case 1:
            e.lines += i * (t / 2);
            break;
          case 3:
            e.lines += i * (t - 1);
            break;
          case 2:
            e.lines += i * t;
            break;
          case 0:
            e.points += i * t;
            break;
          default:
            console.error("THREE.WebGLInfo: Unknown draw mode:", n);
        }
      },
    };
  }
  function Pn(t, e) {
    return t[0] - e[0];
  }
  function Dn(t, e) {
    return Math.abs(e[1]) - Math.abs(t[1]);
  }
  function In(t) {
    const e = {},
      n = new Float32Array(8),
      i = [];
    for (let t = 0; t < 8; t++) i[t] = [t, 0];
    return {
      update: function (r, s, o, a) {
        const l = r.morphTargetInfluences,
          c = void 0 === l ? 0 : l.length;
        let h = e[s.id];
        if (void 0 === h) {
          h = [];
          for (let t = 0; t < c; t++) h[t] = [t, 0];
          e[s.id] = h;
        }
        for (let t = 0; t < c; t++) {
          const e = h[t];
          (e[0] = t), (e[1] = l[t]);
        }
        h.sort(Dn);
        for (let t = 0; t < 8; t++)
          t < c && h[t][1]
            ? ((i[t][0] = h[t][0]), (i[t][1] = h[t][1]))
            : ((i[t][0] = Number.MAX_SAFE_INTEGER), (i[t][1] = 0));
        i.sort(Pn);
        const u = o.morphTargets && s.morphAttributes.position,
          d = o.morphNormals && s.morphAttributes.normal;
        let p = 0;
        for (let t = 0; t < 8; t++) {
          const e = i[t],
            r = e[0],
            o = e[1];
          r !== Number.MAX_SAFE_INTEGER && o
            ? (u &&
                s.getAttribute("morphTarget" + t) !== u[r] &&
                s.setAttribute("morphTarget" + t, u[r]),
              d &&
                s.getAttribute("morphNormal" + t) !== d[r] &&
                s.setAttribute("morphNormal" + t, d[r]),
              (n[t] = o),
              (p += o))
            : (u &&
                !0 === s.hasAttribute("morphTarget" + t) &&
                s.deleteAttribute("morphTarget" + t),
              d &&
                !0 === s.hasAttribute("morphNormal" + t) &&
                s.deleteAttribute("morphNormal" + t),
              (n[t] = 0));
        }
        const f = s.morphTargetsRelative ? 1 : 1 - p;
        a.getUniforms().setValue(t, "morphTargetBaseInfluence", f),
          a.getUniforms().setValue(t, "morphTargetInfluences", n);
      },
    };
  }
  function Nn(t, e, n, i) {
    let r = new WeakMap();
    function s(t) {
      const e = t.target;
      e.removeEventListener("dispose", s),
        n.remove(e.instanceMatrix),
        null !== e.instanceColor && n.remove(e.instanceColor);
    }
    return {
      update: function (t) {
        const o = i.render.frame,
          a = t.geometry,
          l = e.get(t, a);
        return (
          r.get(l) !== o && (e.update(l), r.set(l, o)),
          t.isInstancedMesh &&
            (!1 === t.hasEventListener("dispose", s) &&
              t.addEventListener("dispose", s),
            n.update(t.instanceMatrix, 34962),
            null !== t.instanceColor && n.update(t.instanceColor, 34962)),
          l
        );
      },
      dispose: function () {
        r = new WeakMap();
      },
    };
  }
  xn.physical = {
    uniforms: en([
      xn.standard.uniforms,
      {
        clearcoat: { value: 0 },
        clearcoatMap: { value: null },
        clearcoatRoughness: { value: 0 },
        clearcoatRoughnessMap: { value: null },
        clearcoatNormalScale: { value: new P(1, 1) },
        clearcoatNormalMap: { value: null },
        sheen: { value: new he(0) },
        transmission: { value: 0 },
        transmissionMap: { value: null },
      },
    ]),
    vertexShader: _n.meshphysical_vert,
    fragmentShader: _n.meshphysical_frag,
  };
  class On extends z {
    constructor(t = null, e = 1, i = 1, s = 1) {
      super(null),
        (this.image = { data: t, width: e, height: i, depth: s }),
        (this.magFilter = r),
        (this.minFilter = r),
        (this.wrapR = n),
        (this.generateMipmaps = !1),
        (this.flipY = !1),
        (this.needsUpdate = !0);
    }
  }
  On.prototype.isDataTexture2DArray = !0;
  class zn extends z {
    constructor(t = null, e = 1, i = 1, s = 1) {
      super(null),
        (this.image = { data: t, width: e, height: i, depth: s }),
        (this.magFilter = r),
        (this.minFilter = r),
        (this.wrapR = n),
        (this.generateMipmaps = !1),
        (this.flipY = !1),
        (this.needsUpdate = !0);
    }
  }
  zn.prototype.isDataTexture3D = !0;
  const Bn = new z(),
    Hn = new On(),
    Fn = new zn(),
    Un = new cn(),
    kn = [],
    Gn = [],
    Vn = new Float32Array(16),
    Wn = new Float32Array(9),
    jn = new Float32Array(4);
  function qn(t, e, n) {
    const i = t[0];
    if (i <= 0 || i > 0) return t;
    const r = e * n;
    let s = kn[r];
    if ((void 0 === s && ((s = new Float32Array(r)), (kn[r] = s)), 0 !== e)) {
      i.toArray(s, 0);
      for (let i = 1, r = 0; i !== e; ++i) (r += n), t[i].toArray(s, r);
    }
    return s;
  }
  function Xn(t, e) {
    if (t.length !== e.length) return !1;
    for (let n = 0, i = t.length; n < i; n++) if (t[n] !== e[n]) return !1;
    return !0;
  }
  function Yn(t, e) {
    for (let n = 0, i = e.length; n < i; n++) t[n] = e[n];
  }
  function Jn(t, e) {
    let n = Gn[e];
    void 0 === n && ((n = new Int32Array(e)), (Gn[e] = n));
    for (let i = 0; i !== e; ++i) n[i] = t.allocateTextureUnit();
    return n;
  }
  function Zn(t, e) {
    const n = this.cache;
    n[0] !== e && (t.uniform1f(this.addr, e), (n[0] = e));
  }
  function Qn(t, e) {
    const n = this.cache;
    if (void 0 !== e.x)
      (n[0] === e.x && n[1] === e.y) ||
        (t.uniform2f(this.addr, e.x, e.y), (n[0] = e.x), (n[1] = e.y));
    else {
      if (Xn(n, e)) return;
      t.uniform2fv(this.addr, e), Yn(n, e);
    }
  }
  function Kn(t, e) {
    const n = this.cache;
    if (void 0 !== e.x)
      (n[0] === e.x && n[1] === e.y && n[2] === e.z) ||
        (t.uniform3f(this.addr, e.x, e.y, e.z),
        (n[0] = e.x),
        (n[1] = e.y),
        (n[2] = e.z));
    else if (void 0 !== e.r)
      (n[0] === e.r && n[1] === e.g && n[2] === e.b) ||
        (t.uniform3f(this.addr, e.r, e.g, e.b),
        (n[0] = e.r),
        (n[1] = e.g),
        (n[2] = e.b));
    else {
      if (Xn(n, e)) return;
      t.uniform3fv(this.addr, e), Yn(n, e);
    }
  }
  function $n(t, e) {
    const n = this.cache;
    if (void 0 !== e.x)
      (n[0] === e.x && n[1] === e.y && n[2] === e.z && n[3] === e.w) ||
        (t.uniform4f(this.addr, e.x, e.y, e.z, e.w),
        (n[0] = e.x),
        (n[1] = e.y),
        (n[2] = e.z),
        (n[3] = e.w));
    else {
      if (Xn(n, e)) return;
      t.uniform4fv(this.addr, e), Yn(n, e);
    }
  }
  function ti(t, e) {
    const n = this.cache,
      i = e.elements;
    if (void 0 === i) {
      if (Xn(n, e)) return;
      t.uniformMatrix2fv(this.addr, !1, e), Yn(n, e);
    } else {
      if (Xn(n, i)) return;
      jn.set(i), t.uniformMatrix2fv(this.addr, !1, jn), Yn(n, i);
    }
  }
  function ei(t, e) {
    const n = this.cache,
      i = e.elements;
    if (void 0 === i) {
      if (Xn(n, e)) return;
      t.uniformMatrix3fv(this.addr, !1, e), Yn(n, e);
    } else {
      if (Xn(n, i)) return;
      Wn.set(i), t.uniformMatrix3fv(this.addr, !1, Wn), Yn(n, i);
    }
  }
  function ni(t, e) {
    const n = this.cache,
      i = e.elements;
    if (void 0 === i) {
      if (Xn(n, e)) return;
      t.uniformMatrix4fv(this.addr, !1, e), Yn(n, e);
    } else {
      if (Xn(n, i)) return;
      Vn.set(i), t.uniformMatrix4fv(this.addr, !1, Vn), Yn(n, i);
    }
  }
  function ii(t, e, n) {
    const i = this.cache,
      r = n.allocateTextureUnit();
    i[0] !== r && (t.uniform1i(this.addr, r), (i[0] = r)),
      n.safeSetTexture2D(e || Bn, r);
  }
  function ri(t, e, n) {
    const i = this.cache,
      r = n.allocateTextureUnit();
    i[0] !== r && (t.uniform1i(this.addr, r), (i[0] = r)),
      n.setTexture2DArray(e || Hn, r);
  }
  function si(t, e, n) {
    const i = this.cache,
      r = n.allocateTextureUnit();
    i[0] !== r && (t.uniform1i(this.addr, r), (i[0] = r)),
      n.setTexture3D(e || Fn, r);
  }
  function oi(t, e, n) {
    const i = this.cache,
      r = n.allocateTextureUnit();
    i[0] !== r && (t.uniform1i(this.addr, r), (i[0] = r)),
      n.safeSetTextureCube(e || Un, r);
  }
  function ai(t, e) {
    const n = this.cache;
    n[0] !== e && (t.uniform1i(this.addr, e), (n[0] = e));
  }
  function li(t, e) {
    const n = this.cache;
    Xn(n, e) || (t.uniform2iv(this.addr, e), Yn(n, e));
  }
  function ci(t, e) {
    const n = this.cache;
    Xn(n, e) || (t.uniform3iv(this.addr, e), Yn(n, e));
  }
  function hi(t, e) {
    const n = this.cache;
    Xn(n, e) || (t.uniform4iv(this.addr, e), Yn(n, e));
  }
  function ui(t, e) {
    const n = this.cache;
    n[0] !== e && (t.uniform1ui(this.addr, e), (n[0] = e));
  }
  function di(t, e) {
    t.uniform1fv(this.addr, e);
  }
  function pi(t, e) {
    t.uniform1iv(this.addr, e);
  }
  function fi(t, e) {
    t.uniform2iv(this.addr, e);
  }
  function mi(t, e) {
    t.uniform3iv(this.addr, e);
  }
  function gi(t, e) {
    t.uniform4iv(this.addr, e);
  }
  function vi(t, e) {
    const n = qn(e, this.size, 2);
    t.uniform2fv(this.addr, n);
  }
  function _i(t, e) {
    const n = qn(e, this.size, 3);
    t.uniform3fv(this.addr, n);
  }
  function yi(t, e) {
    const n = qn(e, this.size, 4);
    t.uniform4fv(this.addr, n);
  }
  function xi(t, e) {
    const n = qn(e, this.size, 4);
    t.uniformMatrix2fv(this.addr, !1, n);
  }
  function bi(t, e) {
    const n = qn(e, this.size, 9);
    t.uniformMatrix3fv(this.addr, !1, n);
  }
  function wi(t, e) {
    const n = qn(e, this.size, 16);
    t.uniformMatrix4fv(this.addr, !1, n);
  }
  function Mi(t, e, n) {
    const i = e.length,
      r = Jn(n, i);
    t.uniform1iv(this.addr, r);
    for (let t = 0; t !== i; ++t) n.safeSetTexture2D(e[t] || Bn, r[t]);
  }
  function Si(t, e, n) {
    const i = e.length,
      r = Jn(n, i);
    t.uniform1iv(this.addr, r);
    for (let t = 0; t !== i; ++t) n.safeSetTextureCube(e[t] || Un, r[t]);
  }
  function Ei(t, e, n) {
    (this.id = t),
      (this.addr = n),
      (this.cache = []),
      (this.setValue = (function (t) {
        switch (t) {
          case 5126:
            return Zn;
          case 35664:
            return Qn;
          case 35665:
            return Kn;
          case 35666:
            return $n;
          case 35674:
            return ti;
          case 35675:
            return ei;
          case 35676:
            return ni;
          case 5124:
          case 35670:
            return ai;
          case 35667:
          case 35671:
            return li;
          case 35668:
          case 35672:
            return ci;
          case 35669:
          case 35673:
            return hi;
          case 5125:
            return ui;
          case 35678:
          case 36198:
          case 36298:
          case 36306:
          case 35682:
            return ii;
          case 35679:
          case 36299:
          case 36307:
            return si;
          case 35680:
          case 36300:
          case 36308:
          case 36293:
            return oi;
          case 36289:
          case 36303:
          case 36311:
          case 36292:
            return ri;
        }
      })(e.type));
  }
  function Ti(t, e, n) {
    (this.id = t),
      (this.addr = n),
      (this.cache = []),
      (this.size = e.size),
      (this.setValue = (function (t) {
        switch (t) {
          case 5126:
            return di;
          case 35664:
            return vi;
          case 35665:
            return _i;
          case 35666:
            return yi;
          case 35674:
            return xi;
          case 35675:
            return bi;
          case 35676:
            return wi;
          case 5124:
          case 35670:
            return pi;
          case 35667:
          case 35671:
            return fi;
          case 35668:
          case 35672:
            return mi;
          case 35669:
          case 35673:
            return gi;
          case 35678:
          case 36198:
          case 36298:
          case 36306:
          case 35682:
            return Mi;
          case 35680:
          case 36300:
          case 36308:
          case 36293:
            return Si;
        }
      })(e.type));
  }
  function Ai(t) {
    (this.id = t), (this.seq = []), (this.map = {});
  }
  (Ti.prototype.updateCache = function (t) {
    const e = this.cache;
    t instanceof Float32Array &&
      e.length !== t.length &&
      (this.cache = new Float32Array(t.length)),
      Yn(e, t);
  }),
    (Ai.prototype.setValue = function (t, e, n) {
      const i = this.seq;
      for (let r = 0, s = i.length; r !== s; ++r) {
        const s = i[r];
        s.setValue(t, e[s.id], n);
      }
    });
  const Li = /(\w+)(\])?(\[|\.)?/g;
  function Ci(t, e) {
    t.seq.push(e), (t.map[e.id] = e);
  }
  function Ri(t, e, n) {
    const i = t.name,
      r = i.length;
    for (Li.lastIndex = 0; ; ) {
      const s = Li.exec(i),
        o = Li.lastIndex;
      let a = s[1];
      const l = "]" === s[2],
        c = s[3];
      if ((l && (a |= 0), void 0 === c || ("[" === c && o + 2 === r))) {
        Ci(n, void 0 === c ? new Ei(a, t, e) : new Ti(a, t, e));
        break;
      }
      {
        let t = n.map[a];
        void 0 === t && ((t = new Ai(a)), Ci(n, t)), (n = t);
      }
    }
  }
  function Pi(t, e) {
    (this.seq = []), (this.map = {});
    const n = t.getProgramParameter(e, 35718);
    for (let i = 0; i < n; ++i) {
      const n = t.getActiveUniform(e, i);
      Ri(n, t.getUniformLocation(e, n.name), this);
    }
  }
  function Di(t, e, n) {
    const i = t.createShader(e);
    return t.shaderSource(i, n), t.compileShader(i), i;
  }
  (Pi.prototype.setValue = function (t, e, n, i) {
    const r = this.map[e];
    void 0 !== r && r.setValue(t, n, i);
  }),
    (Pi.prototype.setOptional = function (t, e, n) {
      const i = e[n];
      void 0 !== i && this.setValue(t, n, i);
    }),
    (Pi.upload = function (t, e, n, i) {
      for (let r = 0, s = e.length; r !== s; ++r) {
        const s = e[r],
          o = n[s.id];
        !1 !== o.needsUpdate && s.setValue(t, o.value, i);
      }
    }),
    (Pi.seqWithValue = function (t, e) {
      const n = [];
      for (let i = 0, r = t.length; i !== r; ++i) {
        const r = t[i];
        r.id in e && n.push(r);
      }
      return n;
    });
  let Ii = 0;
  function Ni(t) {
    switch (t) {
      case w:
        return ["Linear", "( value )"];
      case 3001:
        return ["sRGB", "( value )"];
      case 3002:
        return ["RGBE", "( value )"];
      case 3004:
        return ["RGBM", "( value, 7.0 )"];
      case 3005:
        return ["RGBM", "( value, 16.0 )"];
      case 3006:
        return ["RGBD", "( value, 256.0 )"];
      case 3007:
        return ["Gamma", "( value, float( GAMMA_FACTOR ) )"];
      case 3003:
        return ["LogLuv", "( value )"];
      default:
        return (
          console.warn("THREE.WebGLProgram: Unsupported encoding:", t),
          ["Linear", "( value )"]
        );
    }
  }
  function Oi(t, e, n) {
    const i = t.getShaderParameter(e, 35713),
      r = t.getShaderInfoLog(e).trim();
    return i && "" === r
      ? ""
      : "THREE.WebGLShader: gl.getShaderInfoLog() " +
          n +
          "\n" +
          r +
          (function (t) {
            const e = t.split("\n");
            for (let t = 0; t < e.length; t++) e[t] = t + 1 + ": " + e[t];
            return e.join("\n");
          })(t.getShaderSource(e));
  }
  function zi(t, e) {
    const n = Ni(e);
    return (
      "vec4 " +
      t +
      "( vec4 value ) { return " +
      n[0] +
      "ToLinear" +
      n[1] +
      "; }"
    );
  }
  function Bi(t, e) {
    const n = Ni(e);
    return (
      "vec4 " + t + "( vec4 value ) { return LinearTo" + n[0] + n[1] + "; }"
    );
  }
  function Hi(t, e) {
    let n;
    switch (e) {
      case 1:
        n = "Linear";
        break;
      case 2:
        n = "Reinhard";
        break;
      case 3:
        n = "OptimizedCineon";
        break;
      case 4:
        n = "ACESFilmic";
        break;
      case 5:
        n = "Custom";
        break;
      default:
        console.warn("THREE.WebGLProgram: Unsupported toneMapping:", e),
          (n = "Linear");
    }
    return (
      "vec3 " + t + "( vec3 color ) { return " + n + "ToneMapping( color ); }"
    );
  }
  function Fi(t) {
    return "" !== t;
  }
  function Ui(t, e) {
    return t
      .replace(/NUM_DIR_LIGHTS/g, e.numDirLights)
      .replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights)
      .replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights)
      .replace(/NUM_POINT_LIGHTS/g, e.numPointLights)
      .replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights)
      .replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows)
      .replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows)
      .replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows);
  }
  function ki(t, e) {
    return t
      .replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes)
      .replace(
        /UNION_CLIPPING_PLANES/g,
        e.numClippingPlanes - e.numClipIntersection
      );
  }
  const Gi = /^[ \t]*#include +<([\w\d./]+)>/gm;
  function Vi(t) {
    return t.replace(Gi, Wi);
  }
  function Wi(t, e) {
    const n = _n[e];
    if (void 0 === n) throw new Error("Can not resolve #include <" + e + ">");
    return Vi(n);
  }
  const ji =
      /#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g,
    qi =
      /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
  function Xi(t) {
    return t.replace(qi, Ji).replace(ji, Yi);
  }
  function Yi(t, e, n, i) {
    return (
      console.warn(
        "WebGLProgram: #pragma unroll_loop shader syntax is deprecated. Please use #pragma unroll_loop_start syntax instead."
      ),
      Ji(0, e, n, i)
    );
  }
  function Ji(t, e, n, i) {
    let r = "";
    for (let t = parseInt(e); t < parseInt(n); t++)
      r += i
        .replace(/\[\s*i\s*\]/g, "[ " + t + " ]")
        .replace(/UNROLLED_LOOP_INDEX/g, t);
    return r;
  }
  function Zi(t) {
    let e =
      "precision " +
      t.precision +
      " float;\nprecision " +
      t.precision +
      " int;";
    return (
      "highp" === t.precision
        ? (e += "\n#define HIGH_PRECISION")
        : "mediump" === t.precision
        ? (e += "\n#define MEDIUM_PRECISION")
        : "lowp" === t.precision && (e += "\n#define LOW_PRECISION"),
      e
    );
  }
  function Qi(t, e, n, i) {
    const r = t.getContext(),
      s = n.defines;
    let o = n.vertexShader,
      a = n.fragmentShader;
    const l = (function (t) {
        let e = "SHADOWMAP_TYPE_BASIC";
        return (
          1 === t.shadowMapType
            ? (e = "SHADOWMAP_TYPE_PCF")
            : 2 === t.shadowMapType
            ? (e = "SHADOWMAP_TYPE_PCF_SOFT")
            : 3 === t.shadowMapType && (e = "SHADOWMAP_TYPE_VSM"),
          e
        );
      })(n),
      c = (function (t) {
        let e = "ENVMAP_TYPE_CUBE";
        if (t.envMap)
          switch (t.envMapMode) {
            case 301:
            case 302:
              e = "ENVMAP_TYPE_CUBE";
              break;
            case 306:
            case 307:
              e = "ENVMAP_TYPE_CUBE_UV";
          }
        return e;
      })(n),
      h = (function (t) {
        let e = "ENVMAP_MODE_REFLECTION";
        if (t.envMap)
          switch (t.envMapMode) {
            case 302:
            case 307:
              e = "ENVMAP_MODE_REFRACTION";
          }
        return e;
      })(n),
      u = (function (t) {
        let e = "ENVMAP_BLENDING_NONE";
        if (t.envMap)
          switch (t.combine) {
            case 0:
              e = "ENVMAP_BLENDING_MULTIPLY";
              break;
            case 1:
              e = "ENVMAP_BLENDING_MIX";
              break;
            case 2:
              e = "ENVMAP_BLENDING_ADD";
          }
        return e;
      })(n),
      d = t.gammaFactor > 0 ? t.gammaFactor : 1,
      p = n.isWebGL2
        ? ""
        : (function (t) {
            return [
              t.extensionDerivatives ||
              t.envMapCubeUV ||
              t.bumpMap ||
              t.tangentSpaceNormalMap ||
              t.clearcoatNormalMap ||
              t.flatShading ||
              "physical" === t.shaderID
                ? "#extension GL_OES_standard_derivatives : enable"
                : "",
              (t.extensionFragDepth || t.logarithmicDepthBuffer) &&
              t.rendererExtensionFragDepth
                ? "#extension GL_EXT_frag_depth : enable"
                : "",
              t.extensionDrawBuffers && t.rendererExtensionDrawBuffers
                ? "#extension GL_EXT_draw_buffers : require"
                : "",
              (t.extensionShaderTextureLOD || t.envMap) &&
              t.rendererExtensionShaderTextureLod
                ? "#extension GL_EXT_shader_texture_lod : enable"
                : "",
            ]
              .filter(Fi)
              .join("\n");
          })(n),
      f = (function (t) {
        const e = [];
        for (const n in t) {
          const i = t[n];
          !1 !== i && e.push("#define " + n + " " + i);
        }
        return e.join("\n");
      })(s),
      m = r.createProgram();
    let g,
      v,
      _ = n.glslVersion ? "#version " + n.glslVersion + "\n" : "";
    n.isRawShaderMaterial
      ? ((g = [f].filter(Fi).join("\n")),
        g.length > 0 && (g += "\n"),
        (v = [p, f].filter(Fi).join("\n")),
        v.length > 0 && (v += "\n"))
      : ((g = [
          Zi(n),
          "#define SHADER_NAME " + n.shaderName,
          f,
          n.instancing ? "#define USE_INSTANCING" : "",
          n.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
          n.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "",
          "#define GAMMA_FACTOR " + d,
          "#define MAX_BONES " + n.maxBones,
          n.useFog && n.fog ? "#define USE_FOG" : "",
          n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "",
          n.map ? "#define USE_MAP" : "",
          n.envMap ? "#define USE_ENVMAP" : "",
          n.envMap ? "#define " + h : "",
          n.lightMap ? "#define USE_LIGHTMAP" : "",
          n.aoMap ? "#define USE_AOMAP" : "",
          n.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
          n.bumpMap ? "#define USE_BUMPMAP" : "",
          n.normalMap ? "#define USE_NORMALMAP" : "",
          n.normalMap && n.objectSpaceNormalMap
            ? "#define OBJECTSPACE_NORMALMAP"
            : "",
          n.normalMap && n.tangentSpaceNormalMap
            ? "#define TANGENTSPACE_NORMALMAP"
            : "",
          n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
          n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
          n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
          n.displacementMap && n.supportsVertexTextures
            ? "#define USE_DISPLACEMENTMAP"
            : "",
          n.specularMap ? "#define USE_SPECULARMAP" : "",
          n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
          n.metalnessMap ? "#define USE_METALNESSMAP" : "",
          n.alphaMap ? "#define USE_ALPHAMAP" : "",
          n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
          n.vertexTangents ? "#define USE_TANGENT" : "",
          n.vertexColors ? "#define USE_COLOR" : "",
          n.vertexUvs ? "#define USE_UV" : "",
          n.uvsVertexOnly ? "#define UVS_VERTEX_ONLY" : "",
          n.flatShading ? "#define FLAT_SHADED" : "",
          n.skinning ? "#define USE_SKINNING" : "",
          n.useVertexTexture ? "#define BONE_TEXTURE" : "",
          n.morphTargets ? "#define USE_MORPHTARGETS" : "",
          n.morphNormals && !1 === n.flatShading
            ? "#define USE_MORPHNORMALS"
            : "",
          n.doubleSided ? "#define DOUBLE_SIDED" : "",
          n.flipSided ? "#define FLIP_SIDED" : "",
          n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
          n.shadowMapEnabled ? "#define " + l : "",
          n.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
          n.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
          n.logarithmicDepthBuffer && n.rendererExtensionFragDepth
            ? "#define USE_LOGDEPTHBUF_EXT"
            : "",
          "uniform mat4 modelMatrix;",
          "uniform mat4 modelViewMatrix;",
          "uniform mat4 projectionMatrix;",
          "uniform mat4 viewMatrix;",
          "uniform mat3 normalMatrix;",
          "uniform vec3 cameraPosition;",
          "uniform bool isOrthographic;",
          "#ifdef USE_INSTANCING",
          "\tattribute mat4 instanceMatrix;",
          "#endif",
          "#ifdef USE_INSTANCING_COLOR",
          "\tattribute vec3 instanceColor;",
          "#endif",
          "attribute vec3 position;",
          "attribute vec3 normal;",
          "attribute vec2 uv;",
          "#ifdef USE_TANGENT",
          "\tattribute vec4 tangent;",
          "#endif",
          "#ifdef USE_COLOR",
          "\tattribute vec3 color;",
          "#endif",
          "#ifdef USE_MORPHTARGETS",
          "\tattribute vec3 morphTarget0;",
          "\tattribute vec3 morphTarget1;",
          "\tattribute vec3 morphTarget2;",
          "\tattribute vec3 morphTarget3;",
          "\t#ifdef USE_MORPHNORMALS",
          "\t\tattribute vec3 morphNormal0;",
          "\t\tattribute vec3 morphNormal1;",
          "\t\tattribute vec3 morphNormal2;",
          "\t\tattribute vec3 morphNormal3;",
          "\t#else",
          "\t\tattribute vec3 morphTarget4;",
          "\t\tattribute vec3 morphTarget5;",
          "\t\tattribute vec3 morphTarget6;",
          "\t\tattribute vec3 morphTarget7;",
          "\t#endif",
          "#endif",
          "#ifdef USE_SKINNING",
          "\tattribute vec4 skinIndex;",
          "\tattribute vec4 skinWeight;",
          "#endif",
          "\n",
        ]
          .filter(Fi)
          .join("\n")),
        (v = [
          p,
          Zi(n),
          "#define SHADER_NAME " + n.shaderName,
          f,
          n.alphaTest
            ? "#define ALPHATEST " + n.alphaTest + (n.alphaTest % 1 ? "" : ".0")
            : "",
          "#define GAMMA_FACTOR " + d,
          n.useFog && n.fog ? "#define USE_FOG" : "",
          n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "",
          n.map ? "#define USE_MAP" : "",
          n.matcap ? "#define USE_MATCAP" : "",
          n.envMap ? "#define USE_ENVMAP" : "",
          n.envMap ? "#define " + c : "",
          n.envMap ? "#define " + h : "",
          n.envMap ? "#define " + u : "",
          n.lightMap ? "#define USE_LIGHTMAP" : "",
          n.aoMap ? "#define USE_AOMAP" : "",
          n.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
          n.bumpMap ? "#define USE_BUMPMAP" : "",
          n.normalMap ? "#define USE_NORMALMAP" : "",
          n.normalMap && n.objectSpaceNormalMap
            ? "#define OBJECTSPACE_NORMALMAP"
            : "",
          n.normalMap && n.tangentSpaceNormalMap
            ? "#define TANGENTSPACE_NORMALMAP"
            : "",
          n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
          n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
          n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
          n.specularMap ? "#define USE_SPECULARMAP" : "",
          n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
          n.metalnessMap ? "#define USE_METALNESSMAP" : "",
          n.alphaMap ? "#define USE_ALPHAMAP" : "",
          n.sheen ? "#define USE_SHEEN" : "",
          n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
          n.vertexTangents ? "#define USE_TANGENT" : "",
          n.vertexColors || n.instancingColor ? "#define USE_COLOR" : "",
          n.vertexUvs ? "#define USE_UV" : "",
          n.uvsVertexOnly ? "#define UVS_VERTEX_ONLY" : "",
          n.gradientMap ? "#define USE_GRADIENTMAP" : "",
          n.flatShading ? "#define FLAT_SHADED" : "",
          n.doubleSided ? "#define DOUBLE_SIDED" : "",
          n.flipSided ? "#define FLIP_SIDED" : "",
          n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
          n.shadowMapEnabled ? "#define " + l : "",
          n.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
          n.physicallyCorrectLights ? "#define PHYSICALLY_CORRECT_LIGHTS" : "",
          n.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
          n.logarithmicDepthBuffer && n.rendererExtensionFragDepth
            ? "#define USE_LOGDEPTHBUF_EXT"
            : "",
          (n.extensionShaderTextureLOD || n.envMap) &&
          n.rendererExtensionShaderTextureLod
            ? "#define TEXTURE_LOD_EXT"
            : "",
          "uniform mat4 viewMatrix;",
          "uniform vec3 cameraPosition;",
          "uniform bool isOrthographic;",
          0 !== n.toneMapping ? "#define TONE_MAPPING" : "",
          0 !== n.toneMapping ? _n.tonemapping_pars_fragment : "",
          0 !== n.toneMapping ? Hi("toneMapping", n.toneMapping) : "",
          n.dithering ? "#define DITHERING" : "",
          _n.encodings_pars_fragment,
          n.map ? zi("mapTexelToLinear", n.mapEncoding) : "",
          n.matcap ? zi("matcapTexelToLinear", n.matcapEncoding) : "",
          n.envMap ? zi("envMapTexelToLinear", n.envMapEncoding) : "",
          n.emissiveMap
            ? zi("emissiveMapTexelToLinear", n.emissiveMapEncoding)
            : "",
          n.lightMap ? zi("lightMapTexelToLinear", n.lightMapEncoding) : "",
          Bi("linearToOutputTexel", n.outputEncoding),
          n.depthPacking ? "#define DEPTH_PACKING " + n.depthPacking : "",
          "\n",
        ]
          .filter(Fi)
          .join("\n"))),
      (o = Vi(o)),
      (o = Ui(o, n)),
      (o = ki(o, n)),
      (a = Vi(a)),
      (a = Ui(a, n)),
      (a = ki(a, n)),
      (o = Xi(o)),
      (a = Xi(a)),
      n.isWebGL2 &&
        !0 !== n.isRawShaderMaterial &&
        ((_ = "#version 300 es\n"),
        (g =
          [
            "#define attribute in",
            "#define varying out",
            "#define texture2D texture",
          ].join("\n") +
          "\n" +
          g),
        (v =
          [
            "#define varying in",
            n.glslVersion === T ? "" : "out highp vec4 pc_fragColor;",
            n.glslVersion === T ? "" : "#define gl_FragColor pc_fragColor",
            "#define gl_FragDepthEXT gl_FragDepth",
            "#define texture2D texture",
            "#define textureCube texture",
            "#define texture2DProj textureProj",
            "#define texture2DLodEXT textureLod",
            "#define texture2DProjLodEXT textureProjLod",
            "#define textureCubeLodEXT textureLod",
            "#define texture2DGradEXT textureGrad",
            "#define texture2DProjGradEXT textureProjGrad",
            "#define textureCubeGradEXT textureGrad",
          ].join("\n") +
          "\n" +
          v));
    const y = _ + v + a,
      x = Di(r, 35633, _ + g + o),
      b = Di(r, 35632, y);
    if (
      (r.attachShader(m, x),
      r.attachShader(m, b),
      void 0 !== n.index0AttributeName
        ? r.bindAttribLocation(m, 0, n.index0AttributeName)
        : !0 === n.morphTargets && r.bindAttribLocation(m, 0, "position"),
      r.linkProgram(m),
      t.debug.checkShaderErrors)
    ) {
      const t = r.getProgramInfoLog(m).trim(),
        e = r.getShaderInfoLog(x).trim(),
        n = r.getShaderInfoLog(b).trim();
      let i = !0,
        s = !0;
      if (!1 === r.getProgramParameter(m, 35714)) {
        i = !1;
        const e = Oi(r, x, "vertex"),
          n = Oi(r, b, "fragment");
        console.error(
          "THREE.WebGLProgram: shader error: ",
          r.getError(),
          "35715",
          r.getProgramParameter(m, 35715),
          "gl.getProgramInfoLog",
          t,
          e,
          n
        );
      } else
        "" !== t
          ? console.warn("THREE.WebGLProgram: gl.getProgramInfoLog()", t)
          : ("" !== e && "" !== n) || (s = !1);
      s &&
        (this.diagnostics = {
          runnable: i,
          programLog: t,
          vertexShader: { log: e, prefix: g },
          fragmentShader: { log: n, prefix: v },
        });
    }
    let w, M;
    return (
      r.deleteShader(x),
      r.deleteShader(b),
      (this.getUniforms = function () {
        return void 0 === w && (w = new Pi(r, m)), w;
      }),
      (this.getAttributes = function () {
        return (
          void 0 === M &&
            (M = (function (t, e) {
              const n = {},
                i = t.getProgramParameter(e, 35721);
              for (let r = 0; r < i; r++) {
                const i = t.getActiveAttrib(e, r).name;
                n[i] = t.getAttribLocation(e, i);
              }
              return n;
            })(r, m)),
          M
        );
      }),
      (this.destroy = function () {
        i.releaseStatesOfProgram(this),
          r.deleteProgram(m),
          (this.program = void 0);
      }),
      (this.name = n.shaderName),
      (this.id = Ii++),
      (this.cacheKey = e),
      (this.usedTimes = 1),
      (this.program = m),
      (this.vertexShader = x),
      (this.fragmentShader = b),
      this
    );
  }
  function Ki(t, e, n, i, r, s) {
    const o = [],
      a = i.isWebGL2,
      l = i.logarithmicDepthBuffer,
      c = i.floatVertexTextures,
      h = i.maxVertexUniforms,
      u = i.vertexTextures;
    let d = i.precision;
    const p = {
        MeshDepthMaterial: "depth",
        MeshDistanceMaterial: "distanceRGBA",
        MeshNormalMaterial: "normal",
        MeshBasicMaterial: "basic",
        MeshLambertMaterial: "lambert",
        MeshPhongMaterial: "phong",
        MeshToonMaterial: "toon",
        MeshStandardMaterial: "physical",
        MeshPhysicalMaterial: "physical",
        MeshMatcapMaterial: "matcap",
        LineBasicMaterial: "basic",
        LineDashedMaterial: "dashed",
        PointsMaterial: "points",
        ShadowMaterial: "shadow",
        SpriteMaterial: "sprite",
      },
      f = [
        "precision",
        "isWebGL2",
        "supportsVertexTextures",
        "outputEncoding",
        "instancing",
        "instancingColor",
        "map",
        "mapEncoding",
        "matcap",
        "matcapEncoding",
        "envMap",
        "envMapMode",
        "envMapEncoding",
        "envMapCubeUV",
        "lightMap",
        "lightMapEncoding",
        "aoMap",
        "emissiveMap",
        "emissiveMapEncoding",
        "bumpMap",
        "normalMap",
        "objectSpaceNormalMap",
        "tangentSpaceNormalMap",
        "clearcoatMap",
        "clearcoatRoughnessMap",
        "clearcoatNormalMap",
        "displacementMap",
        "specularMap",
        "roughnessMap",
        "metalnessMap",
        "gradientMap",
        "alphaMap",
        "combine",
        "vertexColors",
        "vertexTangents",
        "vertexUvs",
        "uvsVertexOnly",
        "fog",
        "useFog",
        "fogExp2",
        "flatShading",
        "sizeAttenuation",
        "logarithmicDepthBuffer",
        "skinning",
        "maxBones",
        "useVertexTexture",
        "morphTargets",
        "morphNormals",
        "maxMorphTargets",
        "maxMorphNormals",
        "premultipliedAlpha",
        "numDirLights",
        "numPointLights",
        "numSpotLights",
        "numHemiLights",
        "numRectAreaLights",
        "numDirLightShadows",
        "numPointLightShadows",
        "numSpotLightShadows",
        "shadowMapEnabled",
        "shadowMapType",
        "toneMapping",
        "physicallyCorrectLights",
        "alphaTest",
        "doubleSided",
        "flipSided",
        "numClippingPlanes",
        "numClipIntersection",
        "depthPacking",
        "dithering",
        "sheen",
        "transmissionMap",
      ];
    function m(t) {
      let e;
      return (
        t && t.isTexture
          ? (e = t.encoding)
          : t && t.isWebGLRenderTarget
          ? (console.warn(
              "THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead."
            ),
            (e = t.texture.encoding))
          : (e = w),
        e
      );
    }
    return {
      getParameters: function (r, o, f, g, v) {
        const _ = g.fog,
          y = r.isMeshStandardMaterial ? g.environment : null,
          x = e.get(r.envMap || y),
          b = p[r.type],
          w = v.isSkinnedMesh
            ? (function (t) {
                const e = t.skeleton.bones;
                if (c) return 1024;
                {
                  const t = h,
                    n = Math.floor((t - 20) / 4),
                    i = Math.min(n, e.length);
                  return i < e.length
                    ? (console.warn(
                        "THREE.WebGLRenderer: Skeleton has " +
                          e.length +
                          " bones. This GPU supports " +
                          i +
                          "."
                      ),
                      0)
                    : i;
                }
              })(v)
            : 0;
        let M, S;
        if (
          (null !== r.precision &&
            ((d = i.getMaxPrecision(r.precision)),
            d !== r.precision &&
              console.warn(
                "THREE.WebGLProgram.getParameters:",
                r.precision,
                "not supported, using",
                d,
                "instead."
              )),
          b)
        ) {
          const t = xn[b];
          (M = t.vertexShader), (S = t.fragmentShader);
        } else (M = r.vertexShader), (S = r.fragmentShader);
        const E = t.getRenderTarget();
        return {
          isWebGL2: a,
          shaderID: b,
          shaderName: r.type,
          vertexShader: M,
          fragmentShader: S,
          defines: r.defines,
          isRawShaderMaterial: !0 === r.isRawShaderMaterial,
          glslVersion: r.glslVersion,
          precision: d,
          instancing: !0 === v.isInstancedMesh,
          instancingColor: !0 === v.isInstancedMesh && null !== v.instanceColor,
          supportsVertexTextures: u,
          outputEncoding: null !== E ? m(E.texture) : t.outputEncoding,
          map: !!r.map,
          mapEncoding: m(r.map),
          matcap: !!r.matcap,
          matcapEncoding: m(r.matcap),
          envMap: !!x,
          envMapMode: x && x.mapping,
          envMapEncoding: m(x),
          envMapCubeUV: !!x && (306 === x.mapping || 307 === x.mapping),
          lightMap: !!r.lightMap,
          lightMapEncoding: m(r.lightMap),
          aoMap: !!r.aoMap,
          emissiveMap: !!r.emissiveMap,
          emissiveMapEncoding: m(r.emissiveMap),
          bumpMap: !!r.bumpMap,
          normalMap: !!r.normalMap,
          objectSpaceNormalMap: 1 === r.normalMapType,
          tangentSpaceNormalMap: 0 === r.normalMapType,
          clearcoatMap: !!r.clearcoatMap,
          clearcoatRoughnessMap: !!r.clearcoatRoughnessMap,
          clearcoatNormalMap: !!r.clearcoatNormalMap,
          displacementMap: !!r.displacementMap,
          roughnessMap: !!r.roughnessMap,
          metalnessMap: !!r.metalnessMap,
          specularMap: !!r.specularMap,
          alphaMap: !!r.alphaMap,
          gradientMap: !!r.gradientMap,
          sheen: !!r.sheen,
          transmissionMap: !!r.transmissionMap,
          combine: r.combine,
          vertexTangents: r.normalMap && r.vertexTangents,
          vertexColors: r.vertexColors,
          vertexUvs: !!(
            r.map ||
            r.bumpMap ||
            r.normalMap ||
            r.specularMap ||
            r.alphaMap ||
            r.emissiveMap ||
            r.roughnessMap ||
            r.metalnessMap ||
            r.clearcoatMap ||
            r.clearcoatRoughnessMap ||
            r.clearcoatNormalMap ||
            r.displacementMap ||
            r.transmissionMap
          ),
          uvsVertexOnly: !(
            r.map ||
            r.bumpMap ||
            r.normalMap ||
            r.specularMap ||
            r.alphaMap ||
            r.emissiveMap ||
            r.roughnessMap ||
            r.metalnessMap ||
            r.clearcoatNormalMap ||
            r.transmissionMap ||
            !r.displacementMap
          ),
          fog: !!_,
          useFog: r.fog,
          fogExp2: _ && _.isFogExp2,
          flatShading: !!r.flatShading,
          sizeAttenuation: r.sizeAttenuation,
          logarithmicDepthBuffer: l,
          skinning: r.skinning && w > 0,
          maxBones: w,
          useVertexTexture: c,
          morphTargets: r.morphTargets,
          morphNormals: r.morphNormals,
          maxMorphTargets: t.maxMorphTargets,
          maxMorphNormals: t.maxMorphNormals,
          numDirLights: o.directional.length,
          numPointLights: o.point.length,
          numSpotLights: o.spot.length,
          numRectAreaLights: o.rectArea.length,
          numHemiLights: o.hemi.length,
          numDirLightShadows: o.directionalShadowMap.length,
          numPointLightShadows: o.pointShadowMap.length,
          numSpotLightShadows: o.spotShadowMap.length,
          numClippingPlanes: s.numPlanes,
          numClipIntersection: s.numIntersection,
          dithering: r.dithering,
          shadowMapEnabled: t.shadowMap.enabled && f.length > 0,
          shadowMapType: t.shadowMap.type,
          toneMapping: r.toneMapped ? t.toneMapping : 0,
          physicallyCorrectLights: t.physicallyCorrectLights,
          premultipliedAlpha: r.premultipliedAlpha,
          alphaTest: r.alphaTest,
          doubleSided: 2 === r.side,
          flipSided: 1 === r.side,
          depthPacking: void 0 !== r.depthPacking && r.depthPacking,
          index0AttributeName: r.index0AttributeName,
          extensionDerivatives: r.extensions && r.extensions.derivatives,
          extensionFragDepth: r.extensions && r.extensions.fragDepth,
          extensionDrawBuffers: r.extensions && r.extensions.drawBuffers,
          extensionShaderTextureLOD:
            r.extensions && r.extensions.shaderTextureLOD,
          rendererExtensionFragDepth: a || n.has("EXT_frag_depth"),
          rendererExtensionDrawBuffers: a || n.has("WEBGL_draw_buffers"),
          rendererExtensionShaderTextureLod:
            a || n.has("EXT_shader_texture_lod"),
          customProgramCacheKey: r.customProgramCacheKey(),
        };
      },
      getProgramCacheKey: function (e) {
        const n = [];
        if (
          (e.shaderID
            ? n.push(e.shaderID)
            : (n.push(e.fragmentShader), n.push(e.vertexShader)),
          void 0 !== e.defines)
        )
          for (const t in e.defines) n.push(t), n.push(e.defines[t]);
        if (!1 === e.isRawShaderMaterial) {
          for (let t = 0; t < f.length; t++) n.push(e[f[t]]);
          n.push(t.outputEncoding), n.push(t.gammaFactor);
        }
        return n.push(e.customProgramCacheKey), n.join();
      },
      getUniforms: function (t) {
        const e = p[t.type];
        let n;
        if (e) {
          const t = xn[e];
          n = nn.clone(t.uniforms);
        } else n = t.uniforms;
        return n;
      },
      acquireProgram: function (e, n) {
        let i;
        for (let t = 0, e = o.length; t < e; t++) {
          const e = o[t];
          if (e.cacheKey === n) {
            (i = e), ++i.usedTimes;
            break;
          }
        }
        return void 0 === i && ((i = new Qi(t, n, e, r)), o.push(i)), i;
      },
      releaseProgram: function (t) {
        if (0 == --t.usedTimes) {
          const e = o.indexOf(t);
          (o[e] = o[o.length - 1]), o.pop(), t.destroy();
        }
      },
      programs: o,
    };
  }
  function $i() {
    let t = new WeakMap();
    return {
      get: function (e) {
        let n = t.get(e);
        return void 0 === n && ((n = {}), t.set(e, n)), n;
      },
      remove: function (e) {
        t.delete(e);
      },
      update: function (e, n, i) {
        t.get(e)[n] = i;
      },
      dispose: function () {
        t = new WeakMap();
      },
    };
  }
  function tr(t, e) {
    return t.groupOrder !== e.groupOrder
      ? t.groupOrder - e.groupOrder
      : t.renderOrder !== e.renderOrder
      ? t.renderOrder - e.renderOrder
      : t.program !== e.program
      ? t.program.id - e.program.id
      : t.material.id !== e.material.id
      ? t.material.id - e.material.id
      : t.z !== e.z
      ? t.z - e.z
      : t.id - e.id;
  }
  function er(t, e) {
    return t.groupOrder !== e.groupOrder
      ? t.groupOrder - e.groupOrder
      : t.renderOrder !== e.renderOrder
      ? t.renderOrder - e.renderOrder
      : t.z !== e.z
      ? e.z - t.z
      : t.id - e.id;
  }
  function nr(t) {
    const e = [];
    let n = 0;
    const i = [],
      r = [],
      s = { id: -1 };
    function o(i, r, o, a, l, c) {
      let h = e[n];
      const u = t.get(o);
      return (
        void 0 === h
          ? ((h = {
              id: i.id,
              object: i,
              geometry: r,
              material: o,
              program: u.program || s,
              groupOrder: a,
              renderOrder: i.renderOrder,
              z: l,
              group: c,
            }),
            (e[n] = h))
          : ((h.id = i.id),
            (h.object = i),
            (h.geometry = r),
            (h.material = o),
            (h.program = u.program || s),
            (h.groupOrder = a),
            (h.renderOrder = i.renderOrder),
            (h.z = l),
            (h.group = c)),
        n++,
        h
      );
    }
    return {
      opaque: i,
      transparent: r,
      init: function () {
        (n = 0), (i.length = 0), (r.length = 0);
      },
      push: function (t, e, n, s, a, l) {
        const c = o(t, e, n, s, a, l);
        (!0 === n.transparent ? r : i).push(c);
      },
      unshift: function (t, e, n, s, a, l) {
        const c = o(t, e, n, s, a, l);
        (!0 === n.transparent ? r : i).unshift(c);
      },
      finish: function () {
        for (let t = n, i = e.length; t < i; t++) {
          const n = e[t];
          if (null === n.id) break;
          (n.id = null),
            (n.object = null),
            (n.geometry = null),
            (n.material = null),
            (n.program = null),
            (n.group = null);
        }
      },
      sort: function (t, e) {
        i.length > 1 && i.sort(t || tr), r.length > 1 && r.sort(e || er);
      },
    };
  }
  function ir(t) {
    let e = new WeakMap();
    return {
      get: function (n, i) {
        let r;
        return (
          !1 === e.has(n)
            ? ((r = new nr(t)), e.set(n, [r]))
            : i >= e.get(n).length
            ? ((r = new nr(t)), e.get(n).push(r))
            : (r = e.get(n)[i]),
          r
        );
      },
      dispose: function () {
        e = new WeakMap();
      },
    };
  }
  function rr() {
    const t = {};
    return {
      get: function (e) {
        if (void 0 !== t[e.id]) return t[e.id];
        let n;
        switch (e.type) {
          case "DirectionalLight":
            n = { direction: new k(), color: new he() };
            break;
          case "SpotLight":
            n = {
              position: new k(),
              direction: new k(),
              color: new he(),
              distance: 0,
              coneCos: 0,
              penumbraCos: 0,
              decay: 0,
            };
            break;
          case "PointLight":
            n = { position: new k(), color: new he(), distance: 0, decay: 0 };
            break;
          case "HemisphereLight":
            n = {
              direction: new k(),
              skyColor: new he(),
              groundColor: new he(),
            };
            break;
          case "RectAreaLight":
            n = {
              color: new he(),
              position: new k(),
              halfWidth: new k(),
              halfHeight: new k(),
            };
        }
        return (t[e.id] = n), n;
      },
    };
  }
  let sr = 0;
  function or(t, e) {
    return (e.castShadow ? 1 : 0) - (t.castShadow ? 1 : 0);
  }
  function ar(t, e) {
    const n = new rr(),
      i = (function () {
        const t = {};
        return {
          get: function (e) {
            if (void 0 !== t[e.id]) return t[e.id];
            let n;
            switch (e.type) {
              case "DirectionalLight":
              case "SpotLight":
                n = {
                  shadowBias: 0,
                  shadowNormalBias: 0,
                  shadowRadius: 1,
                  shadowMapSize: new P(),
                };
                break;
              case "PointLight":
                n = {
                  shadowBias: 0,
                  shadowNormalBias: 0,
                  shadowRadius: 1,
                  shadowMapSize: new P(),
                  shadowCameraNear: 1,
                  shadowCameraFar: 1e3,
                };
            }
            return (t[e.id] = n), n;
          },
        };
      })(),
      r = {
        version: 0,
        hash: {
          directionalLength: -1,
          pointLength: -1,
          spotLength: -1,
          rectAreaLength: -1,
          hemiLength: -1,
          numDirectionalShadows: -1,
          numPointShadows: -1,
          numSpotShadows: -1,
        },
        ambient: [0, 0, 0],
        probe: [],
        directional: [],
        directionalShadow: [],
        directionalShadowMap: [],
        directionalShadowMatrix: [],
        spot: [],
        spotShadow: [],
        spotShadowMap: [],
        spotShadowMatrix: [],
        rectArea: [],
        rectAreaLTC1: null,
        rectAreaLTC2: null,
        point: [],
        pointShadow: [],
        pointShadowMap: [],
        pointShadowMatrix: [],
        hemi: [],
      };
    for (let t = 0; t < 9; t++) r.probe.push(new k());
    const s = new k(),
      o = new mt(),
      a = new mt();
    return {
      setup: function (s) {
        let o = 0,
          a = 0,
          l = 0;
        for (let t = 0; t < 9; t++) r.probe[t].set(0, 0, 0);
        let c = 0,
          h = 0,
          u = 0,
          d = 0,
          p = 0,
          f = 0,
          m = 0,
          g = 0;
        s.sort(or);
        for (let t = 0, e = s.length; t < e; t++) {
          const e = s[t],
            v = e.color,
            _ = e.intensity,
            y = e.distance,
            x = e.shadow && e.shadow.map ? e.shadow.map.texture : null;
          if (e.isAmbientLight) (o += v.r * _), (a += v.g * _), (l += v.b * _);
          else if (e.isLightProbe)
            for (let t = 0; t < 9; t++)
              r.probe[t].addScaledVector(e.sh.coefficients[t], _);
          else if (e.isDirectionalLight) {
            const t = n.get(e);
            if (
              (t.color.copy(e.color).multiplyScalar(e.intensity), e.castShadow)
            ) {
              const t = e.shadow,
                n = i.get(e);
              (n.shadowBias = t.bias),
                (n.shadowNormalBias = t.normalBias),
                (n.shadowRadius = t.radius),
                (n.shadowMapSize = t.mapSize),
                (r.directionalShadow[c] = n),
                (r.directionalShadowMap[c] = x),
                (r.directionalShadowMatrix[c] = e.shadow.matrix),
                f++;
            }
            (r.directional[c] = t), c++;
          } else if (e.isSpotLight) {
            const t = n.get(e);
            if (
              (t.position.setFromMatrixPosition(e.matrixWorld),
              t.color.copy(v).multiplyScalar(_),
              (t.distance = y),
              (t.coneCos = Math.cos(e.angle)),
              (t.penumbraCos = Math.cos(e.angle * (1 - e.penumbra))),
              (t.decay = e.decay),
              e.castShadow)
            ) {
              const t = e.shadow,
                n = i.get(e);
              (n.shadowBias = t.bias),
                (n.shadowNormalBias = t.normalBias),
                (n.shadowRadius = t.radius),
                (n.shadowMapSize = t.mapSize),
                (r.spotShadow[u] = n),
                (r.spotShadowMap[u] = x),
                (r.spotShadowMatrix[u] = e.shadow.matrix),
                g++;
            }
            (r.spot[u] = t), u++;
          } else if (e.isRectAreaLight) {
            const t = n.get(e);
            t.color.copy(v).multiplyScalar(_),
              t.halfWidth.set(0.5 * e.width, 0, 0),
              t.halfHeight.set(0, 0.5 * e.height, 0),
              (r.rectArea[d] = t),
              d++;
          } else if (e.isPointLight) {
            const t = n.get(e);
            if (
              (t.color.copy(e.color).multiplyScalar(e.intensity),
              (t.distance = e.distance),
              (t.decay = e.decay),
              e.castShadow)
            ) {
              const t = e.shadow,
                n = i.get(e);
              (n.shadowBias = t.bias),
                (n.shadowNormalBias = t.normalBias),
                (n.shadowRadius = t.radius),
                (n.shadowMapSize = t.mapSize),
                (n.shadowCameraNear = t.camera.near),
                (n.shadowCameraFar = t.camera.far),
                (r.pointShadow[h] = n),
                (r.pointShadowMap[h] = x),
                (r.pointShadowMatrix[h] = e.shadow.matrix),
                m++;
            }
            (r.point[h] = t), h++;
          } else if (e.isHemisphereLight) {
            const t = n.get(e);
            t.skyColor.copy(e.color).multiplyScalar(_),
              t.groundColor.copy(e.groundColor).multiplyScalar(_),
              (r.hemi[p] = t),
              p++;
          }
        }
        d > 0 &&
          (e.isWebGL2 || !0 === t.has("OES_texture_float_linear")
            ? ((r.rectAreaLTC1 = yn.LTC_FLOAT_1),
              (r.rectAreaLTC2 = yn.LTC_FLOAT_2))
            : !0 === t.has("OES_texture_half_float_linear")
            ? ((r.rectAreaLTC1 = yn.LTC_HALF_1),
              (r.rectAreaLTC2 = yn.LTC_HALF_2))
            : console.error(
                "THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions."
              )),
          (r.ambient[0] = o),
          (r.ambient[1] = a),
          (r.ambient[2] = l);
        const v = r.hash;
        (v.directionalLength === c &&
          v.pointLength === h &&
          v.spotLength === u &&
          v.rectAreaLength === d &&
          v.hemiLength === p &&
          v.numDirectionalShadows === f &&
          v.numPointShadows === m &&
          v.numSpotShadows === g) ||
          ((r.directional.length = c),
          (r.spot.length = u),
          (r.rectArea.length = d),
          (r.point.length = h),
          (r.hemi.length = p),
          (r.directionalShadow.length = f),
          (r.directionalShadowMap.length = f),
          (r.pointShadow.length = m),
          (r.pointShadowMap.length = m),
          (r.spotShadow.length = g),
          (r.spotShadowMap.length = g),
          (r.directionalShadowMatrix.length = f),
          (r.pointShadowMatrix.length = m),
          (r.spotShadowMatrix.length = g),
          (v.directionalLength = c),
          (v.pointLength = h),
          (v.spotLength = u),
          (v.rectAreaLength = d),
          (v.hemiLength = p),
          (v.numDirectionalShadows = f),
          (v.numPointShadows = m),
          (v.numSpotShadows = g),
          (r.version = sr++));
      },
      setupView: function (t, e) {
        let n = 0,
          i = 0,
          l = 0,
          c = 0,
          h = 0;
        const u = e.matrixWorldInverse;
        for (let e = 0, d = t.length; e < d; e++) {
          const d = t[e];
          if (d.isDirectionalLight) {
            const t = r.directional[n];
            t.direction.setFromMatrixPosition(d.matrixWorld),
              s.setFromMatrixPosition(d.target.matrixWorld),
              t.direction.sub(s),
              t.direction.transformDirection(u),
              n++;
          } else if (d.isSpotLight) {
            const t = r.spot[l];
            t.position.setFromMatrixPosition(d.matrixWorld),
              t.position.applyMatrix4(u),
              t.direction.setFromMatrixPosition(d.matrixWorld),
              s.setFromMatrixPosition(d.target.matrixWorld),
              t.direction.sub(s),
              t.direction.transformDirection(u),
              l++;
          } else if (d.isRectAreaLight) {
            const t = r.rectArea[c];
            t.position.setFromMatrixPosition(d.matrixWorld),
              t.position.applyMatrix4(u),
              a.identity(),
              o.copy(d.matrixWorld),
              o.premultiply(u),
              a.extractRotation(o),
              t.halfWidth.set(0.5 * d.width, 0, 0),
              t.halfHeight.set(0, 0.5 * d.height, 0),
              t.halfWidth.applyMatrix4(a),
              t.halfHeight.applyMatrix4(a),
              c++;
          } else if (d.isPointLight) {
            const t = r.point[i];
            t.position.setFromMatrixPosition(d.matrixWorld),
              t.position.applyMatrix4(u),
              i++;
          } else if (d.isHemisphereLight) {
            const t = r.hemi[h];
            t.direction.setFromMatrixPosition(d.matrixWorld),
              t.direction.transformDirection(u),
              t.direction.normalize(),
              h++;
          }
        }
      },
      state: r,
    };
  }
  function lr(t, e) {
    const n = new ar(t, e),
      i = [],
      r = [];
    return {
      init: function () {
        (i.length = 0), (r.length = 0);
      },
      state: { lightsArray: i, shadowsArray: r, lights: n },
      setupLights: function () {
        n.setup(i);
      },
      setupLightsView: function (t) {
        n.setupView(i, t);
      },
      pushLight: function (t) {
        i.push(t);
      },
      pushShadow: function (t) {
        r.push(t);
      },
    };
  }
  function cr(t, e) {
    let n = new WeakMap();
    return {
      get: function (i, r = 0) {
        let s;
        return (
          !1 === n.has(i)
            ? ((s = new lr(t, e)), n.set(i, [s]))
            : r >= n.get(i).length
            ? ((s = new lr(t, e)), n.get(i).push(s))
            : (s = n.get(i)[r]),
          s
        );
      },
      dispose: function () {
        n = new WeakMap();
      },
    };
  }
  class hr extends ie {
    constructor(t) {
      super(),
        (this.type = "MeshDepthMaterial"),
        (this.depthPacking = 3200),
        (this.skinning = !1),
        (this.morphTargets = !1),
        (this.map = null),
        (this.alphaMap = null),
        (this.displacementMap = null),
        (this.displacementScale = 1),
        (this.displacementBias = 0),
        (this.wireframe = !1),
        (this.wireframeLinewidth = 1),
        (this.fog = !1),
        this.setValues(t);
    }
    copy(t) {
      return (
        super.copy(t),
        (this.depthPacking = t.depthPacking),
        (this.skinning = t.skinning),
        (this.morphTargets = t.morphTargets),
        (this.map = t.map),
        (this.alphaMap = t.alphaMap),
        (this.displacementMap = t.displacementMap),
        (this.displacementScale = t.displacementScale),
        (this.displacementBias = t.displacementBias),
        (this.wireframe = t.wireframe),
        (this.wireframeLinewidth = t.wireframeLinewidth),
        this
      );
    }
  }
  hr.prototype.isMeshDepthMaterial = !0;
  class ur extends ie {
    constructor(t) {
      super(),
        (this.type = "MeshDistanceMaterial"),
        (this.referencePosition = new k()),
        (this.nearDistance = 1),
        (this.farDistance = 1e3),
        (this.skinning = !1),
        (this.morphTargets = !1),
        (this.map = null),
        (this.alphaMap = null),
        (this.displacementMap = null),
        (this.displacementScale = 1),
        (this.displacementBias = 0),
        (this.fog = !1),
        this.setValues(t);
    }
    copy(t) {
      return (
        super.copy(t),
        this.referencePosition.copy(t.referencePosition),
        (this.nearDistance = t.nearDistance),
        (this.farDistance = t.farDistance),
        (this.skinning = t.skinning),
        (this.morphTargets = t.morphTargets),
        (this.map = t.map),
        (this.alphaMap = t.alphaMap),
        (this.displacementMap = t.displacementMap),
        (this.displacementScale = t.displacementScale),
        (this.displacementBias = t.displacementBias),
        this
      );
    }
  }
  function dr(t, e, n) {
    let i = new fn();
    const o = new P(),
      a = new P(),
      l = new H(),
      c = [],
      h = [],
      u = {},
      d = { 0: 1, 1: 0, 2: 2 },
      f = new rn({
        defines: { SAMPLE_RATE: 2 / 8, HALF_SAMPLE_RATE: 1 / 8 },
        uniforms: {
          shadow_pass: { value: null },
          resolution: { value: new P() },
          radius: { value: 4 },
        },
        vertexShader:
          "void main() {\n\tgl_Position = vec4( position, 1.0 );\n}",
        fragmentShader:
          "uniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\n#include <packing>\nvoid main() {\n\tfloat mean = 0.0;\n\tfloat squared_mean = 0.0;\n\tfloat depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy ) / resolution ) );\n\tfor ( float i = -1.0; i < 1.0 ; i += SAMPLE_RATE) {\n\t\t#ifdef HORIZONTAL_PASS\n\t\t\tvec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( i, 0.0 ) * radius ) / resolution ) );\n\t\t\tmean += distribution.x;\n\t\t\tsquared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n\t\t#else\n\t\t\tfloat depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, i ) * radius ) / resolution ) );\n\t\t\tmean += depth;\n\t\t\tsquared_mean += depth * depth;\n\t\t#endif\n\t}\n\tmean = mean * HALF_SAMPLE_RATE;\n\tsquared_mean = squared_mean * HALF_SAMPLE_RATE;\n\tfloat std_dev = sqrt( squared_mean - mean * mean );\n\tgl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );\n}",
      }),
      m = f.clone();
    m.defines.HORIZONTAL_PASS = 1;
    const g = new Ie();
    g.setAttribute(
      "position",
      new fe(new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]), 3)
    );
    const v = new Qe(g, f),
      _ = this;
    function y(n, i) {
      const r = e.update(v);
      (f.uniforms.shadow_pass.value = n.map.texture),
        (f.uniforms.resolution.value = n.mapSize),
        (f.uniforms.radius.value = n.radius),
        t.setRenderTarget(n.mapPass),
        t.clear(),
        t.renderBufferDirect(i, null, r, f, v, null),
        (m.uniforms.shadow_pass.value = n.mapPass.texture),
        (m.uniforms.resolution.value = n.mapSize),
        (m.uniforms.radius.value = n.radius),
        t.setRenderTarget(n.map),
        t.clear(),
        t.renderBufferDirect(i, null, r, m, v, null);
    }
    function x(t, e, n) {
      const i = (t << 0) | (e << 1) | (n << 2);
      let r = c[i];
      return (
        void 0 === r &&
          ((r = new hr({ depthPacking: 3201, morphTargets: t, skinning: e })),
          (c[i] = r)),
        r
      );
    }
    function b(t, e, n) {
      const i = (t << 0) | (e << 1) | (n << 2);
      let r = h[i];
      return (
        void 0 === r &&
          ((r = new ur({ morphTargets: t, skinning: e })), (h[i] = r)),
        r
      );
    }
    function w(e, n, i, r, s, o, a) {
      let l = null,
        c = x,
        h = e.customDepthMaterial;
      if (
        (!0 === r.isPointLight && ((c = b), (h = e.customDistanceMaterial)),
        void 0 === h)
      ) {
        let t = !1;
        !0 === i.morphTargets &&
          (t =
            n.morphAttributes &&
            n.morphAttributes.position &&
            n.morphAttributes.position.length > 0);
        let r = !1;
        !0 === e.isSkinnedMesh &&
          (!0 === i.skinning
            ? (r = !0)
            : console.warn(
                "THREE.WebGLShadowMap: THREE.SkinnedMesh with material.skinning set to false:",
                e
              )),
          (l = c(t, r, !0 === e.isInstancedMesh));
      } else l = h;
      if (
        t.localClippingEnabled &&
        !0 === i.clipShadows &&
        0 !== i.clippingPlanes.length
      ) {
        const t = l.uuid,
          e = i.uuid;
        let n = u[t];
        void 0 === n && ((n = {}), (u[t] = n));
        let r = n[e];
        void 0 === r && ((r = l.clone()), (n[e] = r)), (l = r);
      }
      return (
        (l.visible = i.visible),
        (l.wireframe = i.wireframe),
        (l.side =
          3 === a
            ? null !== i.shadowSide
              ? i.shadowSide
              : i.side
            : null !== i.shadowSide
            ? i.shadowSide
            : d[i.side]),
        (l.clipShadows = i.clipShadows),
        (l.clippingPlanes = i.clippingPlanes),
        (l.clipIntersection = i.clipIntersection),
        (l.wireframeLinewidth = i.wireframeLinewidth),
        (l.linewidth = i.linewidth),
        !0 === r.isPointLight &&
          !0 === l.isMeshDistanceMaterial &&
          (l.referencePosition.setFromMatrixPosition(r.matrixWorld),
          (l.nearDistance = s),
          (l.farDistance = o)),
        l
      );
    }
    function M(n, r, s, o, a) {
      if (!1 === n.visible) return;
      if (
        n.layers.test(r.layers) &&
        (n.isMesh || n.isLine || n.isPoints) &&
        (n.castShadow || (n.receiveShadow && 3 === a)) &&
        (!n.frustumCulled || i.intersectsObject(n))
      ) {
        n.modelViewMatrix.multiplyMatrices(s.matrixWorldInverse, n.matrixWorld);
        const i = e.update(n),
          r = n.material;
        if (Array.isArray(r)) {
          const e = i.groups;
          for (let l = 0, c = e.length; l < c; l++) {
            const c = e[l],
              h = r[c.materialIndex];
            if (h && h.visible) {
              const e = w(n, i, h, o, s.near, s.far, a);
              t.renderBufferDirect(s, null, i, e, n, c);
            }
          }
        } else if (r.visible) {
          const e = w(n, i, r, o, s.near, s.far, a);
          t.renderBufferDirect(s, null, i, e, n, null);
        }
      }
      const l = n.children;
      for (let t = 0, e = l.length; t < e; t++) M(l[t], r, s, o, a);
    }
    (this.enabled = !1),
      (this.autoUpdate = !0),
      (this.needsUpdate = !1),
      (this.type = 1),
      (this.render = function (e, c, h) {
        if (!1 === _.enabled) return;
        if (!1 === _.autoUpdate && !1 === _.needsUpdate) return;
        if (0 === e.length) return;
        const u = t.getRenderTarget(),
          d = t.getActiveCubeFace(),
          f = t.getActiveMipmapLevel(),
          m = t.state;
        m.setBlending(0),
          m.buffers.color.setClear(1, 1, 1, 1),
          m.buffers.depth.setTest(!0),
          m.setScissorTest(!1);
        for (let u = 0, d = e.length; u < d; u++) {
          const d = e[u],
            f = d.shadow;
          if (void 0 === f) {
            console.warn("THREE.WebGLShadowMap:", d, "has no shadow.");
            continue;
          }
          if (!1 === f.autoUpdate && !1 === f.needsUpdate) continue;
          o.copy(f.mapSize);
          const g = f.getFrameExtents();
          if (
            (o.multiply(g),
            a.copy(f.mapSize),
            (o.x > n || o.y > n) &&
              (o.x > n &&
                ((a.x = Math.floor(n / g.x)),
                (o.x = a.x * g.x),
                (f.mapSize.x = a.x)),
              o.y > n &&
                ((a.y = Math.floor(n / g.y)),
                (o.y = a.y * g.y),
                (f.mapSize.y = a.y))),
            null === f.map && !f.isPointLightShadow && 3 === this.type)
          ) {
            const t = { minFilter: s, magFilter: s, format: p };
            (f.map = new F(o.x, o.y, t)),
              (f.map.texture.name = d.name + ".shadowMap"),
              (f.mapPass = new F(o.x, o.y, t)),
              f.camera.updateProjectionMatrix();
          }
          if (null === f.map) {
            const t = { minFilter: r, magFilter: r, format: p };
            (f.map = new F(o.x, o.y, t)),
              (f.map.texture.name = d.name + ".shadowMap"),
              f.camera.updateProjectionMatrix();
          }
          t.setRenderTarget(f.map), t.clear();
          const v = f.getViewportCount();
          for (let t = 0; t < v; t++) {
            const e = f.getViewport(t);
            l.set(a.x * e.x, a.y * e.y, a.x * e.z, a.y * e.w),
              m.viewport(l),
              f.updateMatrices(d, t),
              (i = f.getFrustum()),
              M(c, h, f.camera, d, this.type);
          }
          f.isPointLightShadow || 3 !== this.type || y(f, h),
            (f.needsUpdate = !1);
        }
        (_.needsUpdate = !1), t.setRenderTarget(u, d, f);
      });
  }
  function pr(e, n, i) {
    const r = i.isWebGL2,
      s = new (function () {
        let t = !1;
        const n = new H();
        let i = null;
        const r = new H(0, 0, 0, 0);
        return {
          setMask: function (n) {
            i === n || t || (e.colorMask(n, n, n, n), (i = n));
          },
          setLocked: function (e) {
            t = e;
          },
          setClear: function (t, i, s, o, a) {
            !0 === a && ((t *= o), (i *= o), (s *= o)),
              n.set(t, i, s, o),
              !1 === r.equals(n) && (e.clearColor(t, i, s, o), r.copy(n));
          },
          reset: function () {
            (t = !1), (i = null), r.set(-1, 0, 0, 0);
          },
        };
      })(),
      o = new (function () {
        let t = !1,
          n = null,
          i = null,
          r = null;
        return {
          setTest: function (t) {
            t ? N(2929) : O(2929);
          },
          setMask: function (i) {
            n === i || t || (e.depthMask(i), (n = i));
          },
          setFunc: function (t) {
            if (i !== t) {
              if (t)
                switch (t) {
                  case 0:
                    e.depthFunc(512);
                    break;
                  case 1:
                    e.depthFunc(519);
                    break;
                  case 2:
                    e.depthFunc(513);
                    break;
                  case 3:
                    e.depthFunc(515);
                    break;
                  case 4:
                    e.depthFunc(514);
                    break;
                  case 5:
                    e.depthFunc(518);
                    break;
                  case 6:
                    e.depthFunc(516);
                    break;
                  case 7:
                    e.depthFunc(517);
                    break;
                  default:
                    e.depthFunc(515);
                }
              else e.depthFunc(515);
              i = t;
            }
          },
          setLocked: function (e) {
            t = e;
          },
          setClear: function (t) {
            r !== t && (e.clearDepth(t), (r = t));
          },
          reset: function () {
            (t = !1), (n = null), (i = null), (r = null);
          },
        };
      })(),
      a = new (function () {
        let t = !1,
          n = null,
          i = null,
          r = null,
          s = null,
          o = null,
          a = null,
          l = null,
          c = null;
        return {
          setTest: function (e) {
            t || (e ? N(2960) : O(2960));
          },
          setMask: function (i) {
            n === i || t || (e.stencilMask(i), (n = i));
          },
          setFunc: function (t, n, o) {
            (i === t && r === n && s === o) ||
              (e.stencilFunc(t, n, o), (i = t), (r = n), (s = o));
          },
          setOp: function (t, n, i) {
            (o === t && a === n && l === i) ||
              (e.stencilOp(t, n, i), (o = t), (a = n), (l = i));
          },
          setLocked: function (e) {
            t = e;
          },
          setClear: function (t) {
            c !== t && (e.clearStencil(t), (c = t));
          },
          reset: function () {
            (t = !1),
              (n = null),
              (i = null),
              (r = null),
              (s = null),
              (o = null),
              (a = null),
              (l = null),
              (c = null);
          },
        };
      })();
    let l = {},
      c = null,
      h = !1,
      u = null,
      d = null,
      p = null,
      f = null,
      m = null,
      g = null,
      v = null,
      _ = !1,
      y = null,
      x = null,
      b = null,
      w = null,
      M = null;
    const S = e.getParameter(35661);
    let E = !1,
      T = 0;
    const A = e.getParameter(7938);
    -1 !== A.indexOf("WebGL")
      ? ((T = parseFloat(/^WebGL (\d)/.exec(A)[1])), (E = T >= 1))
      : -1 !== A.indexOf("OpenGL ES") &&
        ((T = parseFloat(/^OpenGL ES (\d)/.exec(A)[1])), (E = T >= 2));
    let L = null,
      C = {};
    const R = new H(),
      P = new H();
    function D(t, n, i) {
      const r = new Uint8Array(4),
        s = e.createTexture();
      e.bindTexture(t, s),
        e.texParameteri(t, 10241, 9728),
        e.texParameteri(t, 10240, 9728);
      for (let t = 0; t < i; t++)
        e.texImage2D(n + t, 0, 6408, 1, 1, 0, 6408, 5121, r);
      return s;
    }
    const I = {};
    function N(t) {
      !0 !== l[t] && (e.enable(t), (l[t] = !0));
    }
    function O(t) {
      !1 !== l[t] && (e.disable(t), (l[t] = !1));
    }
    (I[3553] = D(3553, 3553, 1)),
      (I[34067] = D(34067, 34069, 6)),
      s.setClear(0, 0, 0, 1),
      o.setClear(1),
      a.setClear(0),
      N(2929),
      o.setFunc(3),
      U(!1),
      k(1),
      N(2884),
      F(0);
    const z = { [t]: 32774, 101: 32778, 102: 32779 };
    if (r) (z[103] = 32775), (z[104] = 32776);
    else {
      const t = n.get("EXT_blend_minmax");
      null !== t && ((z[103] = t.MIN_EXT), (z[104] = t.MAX_EXT));
    }
    const B = {
      200: 0,
      201: 1,
      202: 768,
      204: 770,
      210: 776,
      208: 774,
      206: 772,
      203: 769,
      205: 771,
      209: 775,
      207: 773,
    };
    function F(n, i, r, s, o, a, l, c) {
      if (0 !== n) {
        if ((!1 === h && (N(3042), (h = !0)), 5 === n))
          (o = o || i),
            (a = a || r),
            (l = l || s),
            (i === d && o === m) ||
              (e.blendEquationSeparate(z[i], z[o]), (d = i), (m = o)),
            (r === p && s === f && a === g && l === v) ||
              (e.blendFuncSeparate(B[r], B[s], B[a], B[l]),
              (p = r),
              (f = s),
              (g = a),
              (v = l)),
            (u = n),
            (_ = null);
        else if (n !== u || c !== _) {
          if (
            ((d === t && m === t) || (e.blendEquation(32774), (d = t), (m = t)),
            c)
          )
            switch (n) {
              case 1:
                e.blendFuncSeparate(1, 771, 1, 771);
                break;
              case 2:
                e.blendFunc(1, 1);
                break;
              case 3:
                e.blendFuncSeparate(0, 0, 769, 771);
                break;
              case 4:
                e.blendFuncSeparate(0, 768, 0, 770);
                break;
              default:
                console.error("THREE.WebGLState: Invalid blending: ", n);
            }
          else
            switch (n) {
              case 1:
                e.blendFuncSeparate(770, 771, 1, 771);
                break;
              case 2:
                e.blendFunc(770, 1);
                break;
              case 3:
                e.blendFunc(0, 769);
                break;
              case 4:
                e.blendFunc(0, 768);
                break;
              default:
                console.error("THREE.WebGLState: Invalid blending: ", n);
            }
          (p = null), (f = null), (g = null), (v = null), (u = n), (_ = c);
        }
      } else !0 === h && (O(3042), (h = !1));
    }
    function U(t) {
      y !== t && (t ? e.frontFace(2304) : e.frontFace(2305), (y = t));
    }
    function k(t) {
      0 !== t
        ? (N(2884),
          t !== x &&
            (1 === t
              ? e.cullFace(1029)
              : 2 === t
              ? e.cullFace(1028)
              : e.cullFace(1032)))
        : O(2884),
        (x = t);
    }
    function G(t, n, i) {
      t
        ? (N(32823),
          (w === n && M === i) || (e.polygonOffset(n, i), (w = n), (M = i)))
        : O(32823);
    }
    function V(t) {
      void 0 === t && (t = 33984 + S - 1),
        L !== t && (e.activeTexture(t), (L = t));
    }
    return {
      buffers: { color: s, depth: o, stencil: a },
      enable: N,
      disable: O,
      useProgram: function (t) {
        return c !== t && (e.useProgram(t), (c = t), !0);
      },
      setBlending: F,
      setMaterial: function (t, e) {
        2 === t.side ? O(2884) : N(2884);
        let n = 1 === t.side;
        e && (n = !n),
          U(n),
          1 === t.blending && !1 === t.transparent
            ? F(0)
            : F(
                t.blending,
                t.blendEquation,
                t.blendSrc,
                t.blendDst,
                t.blendEquationAlpha,
                t.blendSrcAlpha,
                t.blendDstAlpha,
                t.premultipliedAlpha
              ),
          o.setFunc(t.depthFunc),
          o.setTest(t.depthTest),
          o.setMask(t.depthWrite),
          s.setMask(t.colorWrite);
        const i = t.stencilWrite;
        a.setTest(i),
          i &&
            (a.setMask(t.stencilWriteMask),
            a.setFunc(t.stencilFunc, t.stencilRef, t.stencilFuncMask),
            a.setOp(t.stencilFail, t.stencilZFail, t.stencilZPass)),
          G(t.polygonOffset, t.polygonOffsetFactor, t.polygonOffsetUnits);
      },
      setFlipSided: U,
      setCullFace: k,
      setLineWidth: function (t) {
        t !== b && (E && e.lineWidth(t), (b = t));
      },
      setPolygonOffset: G,
      setScissorTest: function (t) {
        t ? N(3089) : O(3089);
      },
      activeTexture: V,
      bindTexture: function (t, n) {
        null === L && V();
        let i = C[L];
        void 0 === i && ((i = { type: void 0, texture: void 0 }), (C[L] = i)),
          (i.type === t && i.texture === n) ||
            (e.bindTexture(t, n || I[t]), (i.type = t), (i.texture = n));
      },
      unbindTexture: function () {
        const t = C[L];
        void 0 !== t &&
          void 0 !== t.type &&
          (e.bindTexture(t.type, null),
          (t.type = void 0),
          (t.texture = void 0));
      },
      compressedTexImage2D: function () {
        try {
          e.compressedTexImage2D.apply(e, arguments);
        } catch (t) {
          console.error("THREE.WebGLState:", t);
        }
      },
      texImage2D: function () {
        try {
          e.texImage2D.apply(e, arguments);
        } catch (t) {
          console.error("THREE.WebGLState:", t);
        }
      },
      texImage3D: function () {
        try {
          e.texImage3D.apply(e, arguments);
        } catch (t) {
          console.error("THREE.WebGLState:", t);
        }
      },
      scissor: function (t) {
        !1 === R.equals(t) && (e.scissor(t.x, t.y, t.z, t.w), R.copy(t));
      },
      viewport: function (t) {
        !1 === P.equals(t) && (e.viewport(t.x, t.y, t.z, t.w), P.copy(t));
      },
      reset: function () {
        e.disable(3042),
          e.disable(2884),
          e.disable(2929),
          e.disable(32823),
          e.disable(3089),
          e.disable(2960),
          e.blendEquation(32774),
          e.blendFunc(1, 0),
          e.blendFuncSeparate(1, 0, 1, 0),
          e.colorMask(!0, !0, !0, !0),
          e.clearColor(0, 0, 0, 0),
          e.depthMask(!0),
          e.depthFunc(513),
          e.clearDepth(1),
          e.stencilMask(4294967295),
          e.stencilFunc(519, 0, 4294967295),
          e.stencilOp(7680, 7680, 7680),
          e.clearStencil(0),
          e.cullFace(1029),
          e.frontFace(2305),
          e.polygonOffset(0, 0),
          e.activeTexture(33984),
          e.useProgram(null),
          e.lineWidth(1),
          e.scissor(0, 0, e.canvas.width, e.canvas.height),
          e.viewport(0, 0, e.canvas.width, e.canvas.height),
          (l = {}),
          (L = null),
          (C = {}),
          (c = null),
          (h = !1),
          (u = null),
          (d = null),
          (p = null),
          (f = null),
          (m = null),
          (g = null),
          (v = null),
          (_ = !1),
          (y = null),
          (x = null),
          (b = null),
          (w = null),
          (M = null),
          s.reset(),
          o.reset(),
          a.reset();
      },
    };
  }
  function fr(t, g, v, _, y, x, b) {
    const w = y.isWebGL2,
      M = y.maxTextures,
      S = y.maxCubemapSize,
      E = y.maxTextureSize,
      T = y.maxSamples,
      A = new WeakMap();
    let L,
      C = !1;
    try {
      C =
        "undefined" != typeof OffscreenCanvas &&
        null !== new OffscreenCanvas(1, 1).getContext("2d");
    } catch (t) {}
    function P(t, e) {
      return C
        ? new OffscreenCanvas(t, e)
        : document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
    }
    function D(t, e, n, i) {
      let r = 1;
      if (
        ((t.width > i || t.height > i) && (r = i / Math.max(t.width, t.height)),
        r < 1 || !0 === e)
      ) {
        if (
          ("undefined" != typeof HTMLImageElement &&
            t instanceof HTMLImageElement) ||
          ("undefined" != typeof HTMLCanvasElement &&
            t instanceof HTMLCanvasElement) ||
          ("undefined" != typeof ImageBitmap && t instanceof ImageBitmap)
        ) {
          const i = e ? R.floorPowerOfTwo : Math.floor,
            s = i(r * t.width),
            o = i(r * t.height);
          void 0 === L && (L = P(s, o));
          const a = n ? P(s, o) : L;
          return (
            (a.width = s),
            (a.height = o),
            a.getContext("2d").drawImage(t, 0, 0, s, o),
            console.warn(
              "THREE.WebGLRenderer: Texture has been resized from (" +
                t.width +
                "x" +
                t.height +
                ") to (" +
                s +
                "x" +
                o +
                ")."
            ),
            a
          );
        }
        return (
          "data" in t &&
            console.warn(
              "THREE.WebGLRenderer: Image in DataTexture is too big (" +
                t.width +
                "x" +
                t.height +
                ")."
            ),
          t
        );
      }
      return t;
    }
    function I(t) {
      return R.isPowerOfTwo(t.width) && R.isPowerOfTwo(t.height);
    }
    function N(t, e) {
      return t.generateMipmaps && e && t.minFilter !== r && t.minFilter !== s;
    }
    function O(e, n, i, r) {
      t.generateMipmap(e), (_.get(n).__maxMipLevel = Math.log2(Math.max(i, r)));
    }
    function z(e, n, i) {
      if (!1 === w) return n;
      if (null !== e) {
        if (void 0 !== t[e]) return t[e];
        console.warn(
          "THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" +
            e +
            "'"
        );
      }
      let r = n;
      return (
        6403 === n &&
          (5126 === i && (r = 33326),
          5131 === i && (r = 33325),
          5121 === i && (r = 33321)),
        6407 === n &&
          (5126 === i && (r = 34837),
          5131 === i && (r = 34843),
          5121 === i && (r = 32849)),
        6408 === n &&
          (5126 === i && (r = 34836),
          5131 === i && (r = 34842),
          5121 === i && (r = 32856)),
        (33325 !== r && 33326 !== r && 34842 !== r && 34836 !== r) ||
          g.get("EXT_color_buffer_float"),
        r
      );
    }
    function B(t) {
      return t === r || 1004 === t || 1005 === t ? 9728 : 9729;
    }
    function H(e) {
      const n = e.target;
      n.removeEventListener("dispose", H),
        (function (e) {
          const n = _.get(e);
          void 0 !== n.__webglInit &&
            (t.deleteTexture(n.__webglTexture), _.remove(e));
        })(n),
        n.isVideoTexture && A.delete(n),
        b.memory.textures--;
    }
    function F(e) {
      const n = e.target;
      n.removeEventListener("dispose", F),
        (function (e) {
          const n = e.texture,
            i = _.get(e),
            r = _.get(n);
          if (e) {
            if (
              (void 0 !== r.__webglTexture && t.deleteTexture(r.__webglTexture),
              e.depthTexture && e.depthTexture.dispose(),
              e.isWebGLCubeRenderTarget)
            )
              for (let e = 0; e < 6; e++)
                t.deleteFramebuffer(i.__webglFramebuffer[e]),
                  i.__webglDepthbuffer &&
                    t.deleteRenderbuffer(i.__webglDepthbuffer[e]);
            else
              t.deleteFramebuffer(i.__webglFramebuffer),
                i.__webglDepthbuffer &&
                  t.deleteRenderbuffer(i.__webglDepthbuffer),
                i.__webglMultisampledFramebuffer &&
                  t.deleteFramebuffer(i.__webglMultisampledFramebuffer),
                i.__webglColorRenderbuffer &&
                  t.deleteRenderbuffer(i.__webglColorRenderbuffer),
                i.__webglDepthRenderbuffer &&
                  t.deleteRenderbuffer(i.__webglDepthRenderbuffer);
            _.remove(n), _.remove(e);
          }
        })(n),
        b.memory.textures--;
    }
    let U = 0;
    function k(t, e) {
      const n = _.get(t);
      if (
        (t.isVideoTexture &&
          (function (t) {
            const e = b.render.frame;
            A.get(t) !== e && (A.set(t, e), t.update());
          })(t),
        t.version > 0 && n.__version !== t.version)
      ) {
        const i = t.image;
        if (void 0 === i)
          console.warn(
            "THREE.WebGLRenderer: Texture marked for update but image is undefined"
          );
        else {
          if (!1 !== i.complete) return void X(n, t, e);
          console.warn(
            "THREE.WebGLRenderer: Texture marked for update but image is incomplete"
          );
        }
      }
      v.activeTexture(33984 + e), v.bindTexture(3553, n.__webglTexture);
    }
    function G(e, n) {
      const i = _.get(e);
      e.version > 0 && i.__version !== e.version
        ? (function (e, n, i) {
            if (6 !== n.image.length) return;
            q(e, n),
              v.activeTexture(33984 + i),
              v.bindTexture(34067, e.__webglTexture),
              t.pixelStorei(37440, n.flipY),
              t.pixelStorei(37441, n.premultiplyAlpha),
              t.pixelStorei(3317, n.unpackAlignment),
              t.pixelStorei(37443, 0);
            const r =
                n && (n.isCompressedTexture || n.image[0].isCompressedTexture),
              s = n.image[0] && n.image[0].isDataTexture,
              o = [];
            for (let t = 0; t < 6; t++)
              o[t] =
                r || s
                  ? s
                    ? n.image[t].image
                    : n.image[t]
                  : D(n.image[t], !1, !0, S);
            const a = o[0],
              l = I(a) || w,
              c = x.convert(n.format),
              h = x.convert(n.type),
              u = z(n.internalFormat, c, h);
            let f;
            if ((j(34067, n, l), r)) {
              for (let t = 0; t < 6; t++) {
                f = o[t].mipmaps;
                for (let e = 0; e < f.length; e++) {
                  const i = f[e];
                  n.format !== p && n.format !== d
                    ? null !== c
                      ? v.compressedTexImage2D(
                          34069 + t,
                          e,
                          u,
                          i.width,
                          i.height,
                          0,
                          i.data
                        )
                      : console.warn(
                          "THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"
                        )
                    : v.texImage2D(
                        34069 + t,
                        e,
                        u,
                        i.width,
                        i.height,
                        0,
                        c,
                        h,
                        i.data
                      );
                }
              }
              e.__maxMipLevel = f.length - 1;
            } else {
              f = n.mipmaps;
              for (let t = 0; t < 6; t++)
                if (s) {
                  v.texImage2D(
                    34069 + t,
                    0,
                    u,
                    o[t].width,
                    o[t].height,
                    0,
                    c,
                    h,
                    o[t].data
                  );
                  for (let e = 0; e < f.length; e++) {
                    const n = f[e].image[t].image;
                    v.texImage2D(
                      34069 + t,
                      e + 1,
                      u,
                      n.width,
                      n.height,
                      0,
                      c,
                      h,
                      n.data
                    );
                  }
                } else {
                  v.texImage2D(34069 + t, 0, u, c, h, o[t]);
                  for (let e = 0; e < f.length; e++) {
                    const n = f[e];
                    v.texImage2D(34069 + t, e + 1, u, c, h, n.image[t]);
                  }
                }
              e.__maxMipLevel = f.length;
            }
            N(n, l) && O(34067, n, a.width, a.height),
              (e.__version = n.version),
              n.onUpdate && n.onUpdate(n);
          })(i, e, n)
        : (v.activeTexture(33984 + n), v.bindTexture(34067, i.__webglTexture));
    }
    const V = { [e]: 10497, [n]: 33071, [i]: 33648 },
      W = {
        [r]: 9728,
        1004: 9984,
        1005: 9986,
        [s]: 9729,
        1007: 9985,
        [o]: 9987,
      };
    function j(e, i, o) {
      if (
        (o
          ? (t.texParameteri(e, 10242, V[i.wrapS]),
            t.texParameteri(e, 10243, V[i.wrapT]),
            (32879 !== e && 35866 !== e) ||
              t.texParameteri(e, 32882, V[i.wrapR]),
            t.texParameteri(e, 10240, W[i.magFilter]),
            t.texParameteri(e, 10241, W[i.minFilter]))
          : (t.texParameteri(e, 10242, 33071),
            t.texParameteri(e, 10243, 33071),
            (32879 !== e && 35866 !== e) || t.texParameteri(e, 32882, 33071),
            (i.wrapS === n && i.wrapT === n) ||
              console.warn(
                "THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."
              ),
            t.texParameteri(e, 10240, B(i.magFilter)),
            t.texParameteri(e, 10241, B(i.minFilter)),
            i.minFilter !== r &&
              i.minFilter !== s &&
              console.warn(
                "THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter."
              )),
        !0 === g.has("EXT_texture_filter_anisotropic"))
      ) {
        const n = g.get("EXT_texture_filter_anisotropic");
        if (i.type === c && !1 === g.has("OES_texture_float_linear")) return;
        if (
          !1 === w &&
          i.type === h &&
          !1 === g.has("OES_texture_half_float_linear")
        )
          return;
        (i.anisotropy > 1 || _.get(i).__currentAnisotropy) &&
          (t.texParameterf(
            e,
            n.TEXTURE_MAX_ANISOTROPY_EXT,
            Math.min(i.anisotropy, y.getMaxAnisotropy())
          ),
          (_.get(i).__currentAnisotropy = i.anisotropy));
      }
    }
    function q(e, n) {
      void 0 === e.__webglInit &&
        ((e.__webglInit = !0),
        n.addEventListener("dispose", H),
        (e.__webglTexture = t.createTexture()),
        b.memory.textures++);
    }
    function X(e, i, o) {
      let h = 3553;
      i.isDataTexture2DArray && (h = 35866),
        i.isDataTexture3D && (h = 32879),
        q(e, i),
        v.activeTexture(33984 + o),
        v.bindTexture(h, e.__webglTexture),
        t.pixelStorei(37440, i.flipY),
        t.pixelStorei(37441, i.premultiplyAlpha),
        t.pixelStorei(3317, i.unpackAlignment),
        t.pixelStorei(37443, 0);
      const g =
          (function (t) {
            return (
              !w &&
              (t.wrapS !== n ||
                t.wrapT !== n ||
                (t.minFilter !== r && t.minFilter !== s))
            );
          })(i) && !1 === I(i.image),
        _ = D(i.image, g, !1, E),
        y = I(_) || w,
        b = x.convert(i.format);
      let M,
        S = x.convert(i.type),
        T = z(i.internalFormat, b, S);
      j(h, i, y);
      const A = i.mipmaps;
      if (i.isDepthTexture)
        (T = 6402),
          w
            ? (T =
                i.type === c
                  ? 36012
                  : i.type === l
                  ? 33190
                  : i.type === u
                  ? 35056
                  : 33189)
            : i.type === c &&
              console.error(
                "WebGLRenderer: Floating point depth texture requires WebGL2."
              ),
          i.format === f &&
            6402 === T &&
            i.type !== a &&
            i.type !== l &&
            (console.warn(
              "THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."
            ),
            (i.type = a),
            (S = x.convert(i.type))),
          i.format === m &&
            6402 === T &&
            ((T = 34041),
            i.type !== u &&
              (console.warn(
                "THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."
              ),
              (i.type = u),
              (S = x.convert(i.type)))),
          v.texImage2D(3553, 0, T, _.width, _.height, 0, b, S, null);
      else if (i.isDataTexture)
        if (A.length > 0 && y) {
          for (let t = 0, e = A.length; t < e; t++)
            (M = A[t]),
              v.texImage2D(3553, t, T, M.width, M.height, 0, b, S, M.data);
          (i.generateMipmaps = !1), (e.__maxMipLevel = A.length - 1);
        } else
          v.texImage2D(3553, 0, T, _.width, _.height, 0, b, S, _.data),
            (e.__maxMipLevel = 0);
      else if (i.isCompressedTexture) {
        for (let t = 0, e = A.length; t < e; t++)
          (M = A[t]),
            i.format !== p && i.format !== d
              ? null !== b
                ? v.compressedTexImage2D(
                    3553,
                    t,
                    T,
                    M.width,
                    M.height,
                    0,
                    M.data
                  )
                : console.warn(
                    "THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"
                  )
              : v.texImage2D(3553, t, T, M.width, M.height, 0, b, S, M.data);
        e.__maxMipLevel = A.length - 1;
      } else if (i.isDataTexture2DArray)
        v.texImage3D(35866, 0, T, _.width, _.height, _.depth, 0, b, S, _.data),
          (e.__maxMipLevel = 0);
      else if (i.isDataTexture3D)
        v.texImage3D(32879, 0, T, _.width, _.height, _.depth, 0, b, S, _.data),
          (e.__maxMipLevel = 0);
      else if (A.length > 0 && y) {
        for (let t = 0, e = A.length; t < e; t++)
          (M = A[t]), v.texImage2D(3553, t, T, b, S, M);
        (i.generateMipmaps = !1), (e.__maxMipLevel = A.length - 1);
      } else v.texImage2D(3553, 0, T, b, S, _), (e.__maxMipLevel = 0);
      N(i, y) && O(h, i, _.width, _.height),
        (e.__version = i.version),
        i.onUpdate && i.onUpdate(i);
    }
    function Y(e, n, i, r) {
      const s = n.texture,
        o = x.convert(s.format),
        a = x.convert(s.type),
        l = z(s.internalFormat, o, a);
      32879 === r || 35866 === r
        ? v.texImage3D(r, 0, l, n.width, n.height, n.depth, 0, o, a, null)
        : v.texImage2D(r, 0, l, n.width, n.height, 0, o, a, null),
        t.bindFramebuffer(36160, e),
        t.framebufferTexture2D(36160, i, r, _.get(s).__webglTexture, 0),
        t.bindFramebuffer(36160, null);
    }
    function J(e, n, i) {
      if ((t.bindRenderbuffer(36161, e), n.depthBuffer && !n.stencilBuffer)) {
        let r = 33189;
        if (i) {
          const e = n.depthTexture;
          e &&
            e.isDepthTexture &&
            (e.type === c ? (r = 36012) : e.type === l && (r = 33190));
          const i = Z(n);
          t.renderbufferStorageMultisample(36161, i, r, n.width, n.height);
        } else t.renderbufferStorage(36161, r, n.width, n.height);
        t.framebufferRenderbuffer(36160, 36096, 36161, e);
      } else if (n.depthBuffer && n.stencilBuffer) {
        if (i) {
          const e = Z(n);
          t.renderbufferStorageMultisample(36161, e, 35056, n.width, n.height);
        } else t.renderbufferStorage(36161, 34041, n.width, n.height);
        t.framebufferRenderbuffer(36160, 33306, 36161, e);
      } else {
        const e = n.texture,
          r = x.convert(e.format),
          s = x.convert(e.type),
          o = z(e.internalFormat, r, s);
        if (i) {
          const e = Z(n);
          t.renderbufferStorageMultisample(36161, e, o, n.width, n.height);
        } else t.renderbufferStorage(36161, o, n.width, n.height);
      }
      t.bindRenderbuffer(36161, null);
    }
    function Z(t) {
      return w && t.isWebGLMultisampleRenderTarget ? Math.min(T, t.samples) : 0;
    }
    let Q = !1,
      K = !1;
    (this.allocateTextureUnit = function () {
      const t = U;
      return (
        t >= M &&
          console.warn(
            "THREE.WebGLTextures: Trying to use " +
              t +
              " texture units while this GPU supports only " +
              M
          ),
        (U += 1),
        t
      );
    }),
      (this.resetTextureUnits = function () {
        U = 0;
      }),
      (this.setTexture2D = k),
      (this.setTexture2DArray = function (t, e) {
        const n = _.get(t);
        t.version > 0 && n.__version !== t.version
          ? X(n, t, e)
          : (v.activeTexture(33984 + e),
            v.bindTexture(35866, n.__webglTexture));
      }),
      (this.setTexture3D = function (t, e) {
        const n = _.get(t);
        t.version > 0 && n.__version !== t.version
          ? X(n, t, e)
          : (v.activeTexture(33984 + e),
            v.bindTexture(32879, n.__webglTexture));
      }),
      (this.setTextureCube = G),
      (this.setupRenderTarget = function (e) {
        const n = e.texture,
          i = _.get(e),
          r = _.get(n);
        e.addEventListener("dispose", F),
          (r.__webglTexture = t.createTexture()),
          b.memory.textures++;
        const s = !0 === e.isWebGLCubeRenderTarget,
          o = !0 === e.isWebGLMultisampleRenderTarget,
          a = n.isDataTexture3D || n.isDataTexture2DArray,
          l = I(e) || w;
        if (
          (!w ||
            n.format !== d ||
            (n.type !== c && n.type !== h) ||
            ((n.format = p),
            console.warn(
              "THREE.WebGLRenderer: Rendering to textures with RGB format is not supported. Using RGBA format instead."
            )),
          s)
        ) {
          i.__webglFramebuffer = [];
          for (let e = 0; e < 6; e++)
            i.__webglFramebuffer[e] = t.createFramebuffer();
        } else if (((i.__webglFramebuffer = t.createFramebuffer()), o))
          if (w) {
            (i.__webglMultisampledFramebuffer = t.createFramebuffer()),
              (i.__webglColorRenderbuffer = t.createRenderbuffer()),
              t.bindRenderbuffer(36161, i.__webglColorRenderbuffer);
            const r = x.convert(n.format),
              s = x.convert(n.type),
              o = z(n.internalFormat, r, s),
              a = Z(e);
            t.renderbufferStorageMultisample(36161, a, o, e.width, e.height),
              t.bindFramebuffer(36160, i.__webglMultisampledFramebuffer),
              t.framebufferRenderbuffer(
                36160,
                36064,
                36161,
                i.__webglColorRenderbuffer
              ),
              t.bindRenderbuffer(36161, null),
              e.depthBuffer &&
                ((i.__webglDepthRenderbuffer = t.createRenderbuffer()),
                J(i.__webglDepthRenderbuffer, e, !0)),
              t.bindFramebuffer(36160, null);
          } else
            console.warn(
              "THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2."
            );
        if (s) {
          v.bindTexture(34067, r.__webglTexture), j(34067, n, l);
          for (let t = 0; t < 6; t++)
            Y(i.__webglFramebuffer[t], e, 36064, 34069 + t);
          N(n, l) && O(34067, n, e.width, e.height), v.bindTexture(34067, null);
        } else {
          let t = 3553;
          a &&
            (w
              ? (t = n.isDataTexture3D ? 32879 : 35866)
              : console.warn(
                  "THREE.DataTexture3D and THREE.DataTexture2DArray only supported with WebGL2."
                )),
            v.bindTexture(t, r.__webglTexture),
            j(t, n, l),
            Y(i.__webglFramebuffer, e, 36064, t),
            N(n, l) && O(3553, n, e.width, e.height),
            v.bindTexture(3553, null);
        }
        e.depthBuffer &&
          (function (e) {
            const n = _.get(e),
              i = !0 === e.isWebGLCubeRenderTarget;
            if (e.depthTexture) {
              if (i)
                throw new Error(
                  "target.depthTexture not supported in Cube render targets"
                );
              !(function (e, n) {
                if (n && n.isWebGLCubeRenderTarget)
                  throw new Error(
                    "Depth Texture with cube render targets is not supported"
                  );
                if (
                  (t.bindFramebuffer(36160, e),
                  !n.depthTexture || !n.depthTexture.isDepthTexture)
                )
                  throw new Error(
                    "renderTarget.depthTexture must be an instance of THREE.DepthTexture"
                  );
                (_.get(n.depthTexture).__webglTexture &&
                  n.depthTexture.image.width === n.width &&
                  n.depthTexture.image.height === n.height) ||
                  ((n.depthTexture.image.width = n.width),
                  (n.depthTexture.image.height = n.height),
                  (n.depthTexture.needsUpdate = !0)),
                  k(n.depthTexture, 0);
                const i = _.get(n.depthTexture).__webglTexture;
                if (n.depthTexture.format === f)
                  t.framebufferTexture2D(36160, 36096, 3553, i, 0);
                else {
                  if (n.depthTexture.format !== m)
                    throw new Error("Unknown depthTexture format");
                  t.framebufferTexture2D(36160, 33306, 3553, i, 0);
                }
              })(n.__webglFramebuffer, e);
            } else if (i) {
              n.__webglDepthbuffer = [];
              for (let i = 0; i < 6; i++)
                t.bindFramebuffer(36160, n.__webglFramebuffer[i]),
                  (n.__webglDepthbuffer[i] = t.createRenderbuffer()),
                  J(n.__webglDepthbuffer[i], e, !1);
            } else
              t.bindFramebuffer(36160, n.__webglFramebuffer),
                (n.__webglDepthbuffer = t.createRenderbuffer()),
                J(n.__webglDepthbuffer, e, !1);
            t.bindFramebuffer(36160, null);
          })(e);
      }),
      (this.updateRenderTargetMipmap = function (t) {
        const e = t.texture;
        if (N(e, I(t) || w)) {
          const n = t.isWebGLCubeRenderTarget ? 34067 : 3553,
            i = _.get(e).__webglTexture;
          v.bindTexture(n, i),
            O(n, e, t.width, t.height),
            v.bindTexture(n, null);
        }
      }),
      (this.updateMultisampleRenderTarget = function (e) {
        if (e.isWebGLMultisampleRenderTarget)
          if (w) {
            const n = _.get(e);
            t.bindFramebuffer(36008, n.__webglMultisampledFramebuffer),
              t.bindFramebuffer(36009, n.__webglFramebuffer);
            const i = e.width,
              r = e.height;
            let s = 16384;
            e.depthBuffer && (s |= 256),
              e.stencilBuffer && (s |= 1024),
              t.blitFramebuffer(0, 0, i, r, 0, 0, i, r, s, 9728),
              t.bindFramebuffer(36160, n.__webglMultisampledFramebuffer);
          } else
            console.warn(
              "THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2."
            );
      }),
      (this.safeSetTexture2D = function (t, e) {
        t &&
          t.isWebGLRenderTarget &&
          (!1 === Q &&
            (console.warn(
              "THREE.WebGLTextures.safeSetTexture2D: don't use render targets as textures. Use their .texture property instead."
            ),
            (Q = !0)),
          (t = t.texture)),
          k(t, e);
      }),
      (this.safeSetTextureCube = function (t, e) {
        t &&
          t.isWebGLCubeRenderTarget &&
          (!1 === K &&
            (console.warn(
              "THREE.WebGLTextures.safeSetTextureCube: don't use cube render targets as textures. Use their .texture property instead."
            ),
            (K = !0)),
          (t = t.texture)),
          G(t, e);
      });
  }
  function mr(t, e, n) {
    const i = n.isWebGL2;
    return {
      convert: function (t) {
        let n;
        if (1009 === t) return 5121;
        if (1017 === t) return 32819;
        if (1018 === t) return 32820;
        if (1019 === t) return 33635;
        if (1010 === t) return 5120;
        if (1011 === t) return 5122;
        if (t === a) return 5123;
        if (1013 === t) return 5124;
        if (t === l) return 5125;
        if (t === c) return 5126;
        if (t === h)
          return i
            ? 5131
            : ((n = e.get("OES_texture_half_float")),
              null !== n ? n.HALF_FLOAT_OES : null);
        if (1021 === t) return 6406;
        if (t === d) return 6407;
        if (t === p) return 6408;
        if (1024 === t) return 6409;
        if (1025 === t) return 6410;
        if (t === f) return 6402;
        if (t === m) return 34041;
        if (1028 === t) return 6403;
        if (1029 === t) return 36244;
        if (1030 === t) return 33319;
        if (1031 === t) return 33320;
        if (1032 === t) return 36248;
        if (1033 === t) return 36249;
        if (33776 === t || 33777 === t || 33778 === t || 33779 === t) {
          if (((n = e.get("WEBGL_compressed_texture_s3tc")), null === n))
            return null;
          if (33776 === t) return n.COMPRESSED_RGB_S3TC_DXT1_EXT;
          if (33777 === t) return n.COMPRESSED_RGBA_S3TC_DXT1_EXT;
          if (33778 === t) return n.COMPRESSED_RGBA_S3TC_DXT3_EXT;
          if (33779 === t) return n.COMPRESSED_RGBA_S3TC_DXT5_EXT;
        }
        if (35840 === t || 35841 === t || 35842 === t || 35843 === t) {
          if (((n = e.get("WEBGL_compressed_texture_pvrtc")), null === n))
            return null;
          if (35840 === t) return n.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
          if (35841 === t) return n.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
          if (35842 === t) return n.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
          if (35843 === t) return n.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
        }
        if (36196 === t)
          return (
            (n = e.get("WEBGL_compressed_texture_etc1")),
            null !== n ? n.COMPRESSED_RGB_ETC1_WEBGL : null
          );
        if (
          (37492 === t || 37496 === t) &&
          ((n = e.get("WEBGL_compressed_texture_etc")), null !== n)
        ) {
          if (37492 === t) return n.COMPRESSED_RGB8_ETC2;
          if (37496 === t) return n.COMPRESSED_RGBA8_ETC2_EAC;
        }
        return 37808 === t ||
          37809 === t ||
          37810 === t ||
          37811 === t ||
          37812 === t ||
          37813 === t ||
          37814 === t ||
          37815 === t ||
          37816 === t ||
          37817 === t ||
          37818 === t ||
          37819 === t ||
          37820 === t ||
          37821 === t ||
          37840 === t ||
          37841 === t ||
          37842 === t ||
          37843 === t ||
          37844 === t ||
          37845 === t ||
          37846 === t ||
          37847 === t ||
          37848 === t ||
          37849 === t ||
          37850 === t ||
          37851 === t ||
          37852 === t ||
          37853 === t
          ? ((n = e.get("WEBGL_compressed_texture_astc")),
            null !== n ? t : null)
          : 36492 === t
          ? ((n = e.get("EXT_texture_compression_bptc")), null !== n ? t : null)
          : t === u
          ? i
            ? 34042
            : ((n = e.get("WEBGL_depth_texture")),
              null !== n ? n.UNSIGNED_INT_24_8_WEBGL : null)
          : void 0;
      },
    };
  }
  function gr(t = []) {
    on.call(this), (this.cameras = t);
  }
  (ur.prototype.isMeshDistanceMaterial = !0),
    (gr.prototype = Object.assign(Object.create(on.prototype), {
      constructor: gr,
      isArrayCamera: !0,
    }));
  class vr extends Ut {
    constructor() {
      super(), (this.type = "Group");
    }
  }
  function _r() {
    (this._targetRay = null), (this._grip = null), (this._hand = null);
  }
  function yr(t, e) {
    const n = this;
    let i = null,
      r = 1,
      s = null,
      o = "local-floor",
      a = null;
    const l = [],
      c = new Map(),
      h = new on();
    h.layers.enable(1), (h.viewport = new H());
    const u = new on();
    u.layers.enable(2), (u.viewport = new H());
    const d = [h, u],
      p = new gr();
    p.layers.enable(1), p.layers.enable(2);
    let f = null,
      m = null;
    function g(t) {
      const e = c.get(t.inputSource);
      e && e.dispatchEvent({ type: t.type, data: t.inputSource });
    }
    function v() {
      c.forEach(function (t, e) {
        t.disconnect(e);
      }),
        c.clear(),
        (f = null),
        (m = null),
        t.setFramebuffer(null),
        t.setRenderTarget(t.getRenderTarget()),
        M.stop(),
        (n.isPresenting = !1),
        n.dispatchEvent({ type: "sessionend" });
    }
    function _(t) {
      const e = i.inputSources;
      for (let t = 0; t < l.length; t++) c.set(e[t], l[t]);
      for (let e = 0; e < t.removed.length; e++) {
        const n = t.removed[e],
          i = c.get(n);
        i && (i.dispatchEvent({ type: "disconnected", data: n }), c.delete(n));
      }
      for (let e = 0; e < t.added.length; e++) {
        const n = t.added[e],
          i = c.get(n);
        i && i.dispatchEvent({ type: "connected", data: n });
      }
    }
    (this.enabled = !1),
      (this.isPresenting = !1),
      (this.getController = function (t) {
        let e = l[t];
        return (
          void 0 === e && ((e = new _r()), (l[t] = e)), e.getTargetRaySpace()
        );
      }),
      (this.getControllerGrip = function (t) {
        let e = l[t];
        return void 0 === e && ((e = new _r()), (l[t] = e)), e.getGripSpace();
      }),
      (this.getHand = function (t) {
        let e = l[t];
        return void 0 === e && ((e = new _r()), (l[t] = e)), e.getHandSpace();
      }),
      (this.setFramebufferScaleFactor = function (t) {
        (r = t),
          !0 === n.isPresenting &&
            console.warn(
              "THREE.WebXRManager: Cannot change framebuffer scale while presenting."
            );
      }),
      (this.setReferenceSpaceType = function (t) {
        (o = t),
          !0 === n.isPresenting &&
            console.warn(
              "THREE.WebXRManager: Cannot change reference space type while presenting."
            );
      }),
      (this.getReferenceSpace = function () {
        return s;
      }),
      (this.getSession = function () {
        return i;
      }),
      (this.setSession = async function (t) {
        if (((i = t), null !== i)) {
          i.addEventListener("select", g),
            i.addEventListener("selectstart", g),
            i.addEventListener("selectend", g),
            i.addEventListener("squeeze", g),
            i.addEventListener("squeezestart", g),
            i.addEventListener("squeezeend", g),
            i.addEventListener("end", v),
            i.addEventListener("inputsourceschange", _);
          const t = e.getContextAttributes();
          !0 !== t.xrCompatible && (await e.makeXRCompatible());
          const a = {
              antialias: t.antialias,
              alpha: t.alpha,
              depth: t.depth,
              stencil: t.stencil,
              framebufferScaleFactor: r,
            },
            l = new XRWebGLLayer(i, e, a);
          i.updateRenderState({ baseLayer: l }),
            (s = await i.requestReferenceSpace(o)),
            M.setContext(i),
            M.start(),
            (n.isPresenting = !0),
            n.dispatchEvent({ type: "sessionstart" });
        }
      });
    const y = new k(),
      x = new k();
    function b(t, e) {
      null === e
        ? t.matrixWorld.copy(t.matrix)
        : t.matrixWorld.multiplyMatrices(e.matrixWorld, t.matrix),
        t.matrixWorldInverse.copy(t.matrixWorld).invert();
    }
    this.getCamera = function (t) {
      (p.near = u.near = h.near = t.near),
        (p.far = u.far = h.far = t.far),
        (f === p.near && m === p.far) ||
          (i.updateRenderState({ depthNear: p.near, depthFar: p.far }),
          (f = p.near),
          (m = p.far));
      const e = t.parent,
        n = p.cameras;
      b(p, e);
      for (let t = 0; t < n.length; t++) b(n[t], e);
      t.matrixWorld.copy(p.matrixWorld),
        t.matrix.copy(p.matrix),
        t.matrix.decompose(t.position, t.quaternion, t.scale);
      const r = t.children;
      for (let t = 0, e = r.length; t < e; t++) r[t].updateMatrixWorld(!0);
      return (
        2 === n.length
          ? (function (t, e, n) {
              y.setFromMatrixPosition(e.matrixWorld),
                x.setFromMatrixPosition(n.matrixWorld);
              const i = y.distanceTo(x),
                r = e.projectionMatrix.elements,
                s = n.projectionMatrix.elements,
                o = r[14] / (r[10] - 1),
                a = r[14] / (r[10] + 1),
                l = (r[9] + 1) / r[5],
                c = (r[9] - 1) / r[5],
                h = (r[8] - 1) / r[0],
                u = (s[8] + 1) / s[0],
                d = o * h,
                p = o * u,
                f = i / (-h + u),
                m = f * -h;
              e.matrixWorld.decompose(t.position, t.quaternion, t.scale),
                t.translateX(m),
                t.translateZ(f),
                t.matrixWorld.compose(t.position, t.quaternion, t.scale),
                t.matrixWorldInverse.copy(t.matrixWorld).invert();
              const g = o + f,
                v = a + f,
                _ = d - m,
                b = p + (i - m),
                w = ((l * a) / v) * g,
                M = ((c * a) / v) * g;
              t.projectionMatrix.makePerspective(_, b, w, M, g, v);
            })(p, h, u)
          : p.projectionMatrix.copy(h.projectionMatrix),
        p
      );
    };
    let w = null;
    const M = new mn();
    M.setAnimationLoop(function (e, n) {
      if (((a = n.getViewerPose(s)), null !== a)) {
        const e = a.views,
          n = i.renderState.baseLayer;
        t.setFramebuffer(n.framebuffer);
        let r = !1;
        e.length !== p.cameras.length && ((p.cameras.length = 0), (r = !0));
        for (let t = 0; t < e.length; t++) {
          const i = e[t],
            s = n.getViewport(i),
            o = d[t];
          o.matrix.fromArray(i.transform.matrix),
            o.projectionMatrix.fromArray(i.projectionMatrix),
            o.viewport.set(s.x, s.y, s.width, s.height),
            0 === t && p.matrix.copy(o.matrix),
            !0 === r && p.cameras.push(o);
        }
      }
      const r = i.inputSources;
      for (let t = 0; t < l.length; t++) {
        const e = l[t],
          i = r[t];
        e.update(i, n, s);
      }
      w && w(e, n);
    }),
      (this.setAnimationLoop = function (t) {
        w = t;
      }),
      (this.dispose = function () {});
  }
  function xr(t) {
    function e(e, n) {
      (e.opacity.value = n.opacity),
        n.color && e.diffuse.value.copy(n.color),
        n.emissive &&
          e.emissive.value.copy(n.emissive).multiplyScalar(n.emissiveIntensity),
        n.map && (e.map.value = n.map),
        n.alphaMap && (e.alphaMap.value = n.alphaMap),
        n.specularMap && (e.specularMap.value = n.specularMap);
      const i = t.get(n).envMap;
      if (i) {
        (e.envMap.value = i),
          (e.flipEnvMap.value = i.isCubeTexture && i._needsFlipEnvMap ? -1 : 1),
          (e.reflectivity.value = n.reflectivity),
          (e.refractionRatio.value = n.refractionRatio);
        const r = t.get(i).__maxMipLevel;
        void 0 !== r && (e.maxMipLevel.value = r);
      }
      let r, s;
      n.lightMap &&
        ((e.lightMap.value = n.lightMap),
        (e.lightMapIntensity.value = n.lightMapIntensity)),
        n.aoMap &&
          ((e.aoMap.value = n.aoMap),
          (e.aoMapIntensity.value = n.aoMapIntensity)),
        n.map
          ? (r = n.map)
          : n.specularMap
          ? (r = n.specularMap)
          : n.displacementMap
          ? (r = n.displacementMap)
          : n.normalMap
          ? (r = n.normalMap)
          : n.bumpMap
          ? (r = n.bumpMap)
          : n.roughnessMap
          ? (r = n.roughnessMap)
          : n.metalnessMap
          ? (r = n.metalnessMap)
          : n.alphaMap
          ? (r = n.alphaMap)
          : n.emissiveMap
          ? (r = n.emissiveMap)
          : n.clearcoatMap
          ? (r = n.clearcoatMap)
          : n.clearcoatNormalMap
          ? (r = n.clearcoatNormalMap)
          : n.clearcoatRoughnessMap && (r = n.clearcoatRoughnessMap),
        void 0 !== r &&
          (r.isWebGLRenderTarget && (r = r.texture),
          !0 === r.matrixAutoUpdate && r.updateMatrix(),
          e.uvTransform.value.copy(r.matrix)),
        n.aoMap ? (s = n.aoMap) : n.lightMap && (s = n.lightMap),
        void 0 !== s &&
          (s.isWebGLRenderTarget && (s = s.texture),
          !0 === s.matrixAutoUpdate && s.updateMatrix(),
          e.uv2Transform.value.copy(s.matrix));
    }
    function n(e, n) {
      (e.roughness.value = n.roughness),
        (e.metalness.value = n.metalness),
        n.roughnessMap && (e.roughnessMap.value = n.roughnessMap),
        n.metalnessMap && (e.metalnessMap.value = n.metalnessMap),
        n.emissiveMap && (e.emissiveMap.value = n.emissiveMap),
        n.bumpMap &&
          ((e.bumpMap.value = n.bumpMap),
          (e.bumpScale.value = n.bumpScale),
          1 === n.side && (e.bumpScale.value *= -1)),
        n.normalMap &&
          ((e.normalMap.value = n.normalMap),
          e.normalScale.value.copy(n.normalScale),
          1 === n.side && e.normalScale.value.negate()),
        n.displacementMap &&
          ((e.displacementMap.value = n.displacementMap),
          (e.displacementScale.value = n.displacementScale),
          (e.displacementBias.value = n.displacementBias)),
        t.get(n).envMap && (e.envMapIntensity.value = n.envMapIntensity);
    }
    return {
      refreshFogUniforms: function (t, e) {
        t.fogColor.value.copy(e.color),
          e.isFog
            ? ((t.fogNear.value = e.near), (t.fogFar.value = e.far))
            : e.isFogExp2 && (t.fogDensity.value = e.density);
      },
      refreshMaterialUniforms: function (t, i, r, s) {
        i.isMeshBasicMaterial
          ? e(t, i)
          : i.isMeshLambertMaterial
          ? (e(t, i),
            (function (t, e) {
              e.emissiveMap && (t.emissiveMap.value = e.emissiveMap);
            })(t, i))
          : i.isMeshToonMaterial
          ? (e(t, i),
            (function (t, e) {
              e.gradientMap && (t.gradientMap.value = e.gradientMap),
                e.emissiveMap && (t.emissiveMap.value = e.emissiveMap),
                e.bumpMap &&
                  ((t.bumpMap.value = e.bumpMap),
                  (t.bumpScale.value = e.bumpScale),
                  1 === e.side && (t.bumpScale.value *= -1)),
                e.normalMap &&
                  ((t.normalMap.value = e.normalMap),
                  t.normalScale.value.copy(e.normalScale),
                  1 === e.side && t.normalScale.value.negate()),
                e.displacementMap &&
                  ((t.displacementMap.value = e.displacementMap),
                  (t.displacementScale.value = e.displacementScale),
                  (t.displacementBias.value = e.displacementBias));
            })(t, i))
          : i.isMeshPhongMaterial
          ? (e(t, i),
            (function (t, e) {
              t.specular.value.copy(e.specular),
                (t.shininess.value = Math.max(e.shininess, 1e-4)),
                e.emissiveMap && (t.emissiveMap.value = e.emissiveMap),
                e.bumpMap &&
                  ((t.bumpMap.value = e.bumpMap),
                  (t.bumpScale.value = e.bumpScale),
                  1 === e.side && (t.bumpScale.value *= -1)),
                e.normalMap &&
                  ((t.normalMap.value = e.normalMap),
                  t.normalScale.value.copy(e.normalScale),
                  1 === e.side && t.normalScale.value.negate()),
                e.displacementMap &&
                  ((t.displacementMap.value = e.displacementMap),
                  (t.displacementScale.value = e.displacementScale),
                  (t.displacementBias.value = e.displacementBias));
            })(t, i))
          : i.isMeshStandardMaterial
          ? (e(t, i),
            i.isMeshPhysicalMaterial
              ? (function (t, e) {
                  n(t, e),
                    (t.reflectivity.value = e.reflectivity),
                    (t.clearcoat.value = e.clearcoat),
                    (t.clearcoatRoughness.value = e.clearcoatRoughness),
                    e.sheen && t.sheen.value.copy(e.sheen),
                    e.clearcoatMap && (t.clearcoatMap.value = e.clearcoatMap),
                    e.clearcoatRoughnessMap &&
                      (t.clearcoatRoughnessMap.value = e.clearcoatRoughnessMap),
                    e.clearcoatNormalMap &&
                      (t.clearcoatNormalScale.value.copy(
                        e.clearcoatNormalScale
                      ),
                      (t.clearcoatNormalMap.value = e.clearcoatNormalMap),
                      1 === e.side && t.clearcoatNormalScale.value.negate()),
                    (t.transmission.value = e.transmission),
                    e.transmissionMap &&
                      (t.transmissionMap.value = e.transmissionMap);
                })(t, i)
              : n(t, i))
          : i.isMeshMatcapMaterial
          ? (e(t, i),
            (function (t, e) {
              e.matcap && (t.matcap.value = e.matcap),
                e.bumpMap &&
                  ((t.bumpMap.value = e.bumpMap),
                  (t.bumpScale.value = e.bumpScale),
                  1 === e.side && (t.bumpScale.value *= -1)),
                e.normalMap &&
                  ((t.normalMap.value = e.normalMap),
                  t.normalScale.value.copy(e.normalScale),
                  1 === e.side && t.normalScale.value.negate()),
                e.displacementMap &&
                  ((t.displacementMap.value = e.displacementMap),
                  (t.displacementScale.value = e.displacementScale),
                  (t.displacementBias.value = e.displacementBias));
            })(t, i))
          : i.isMeshDepthMaterial
          ? (e(t, i),
            (function (t, e) {
              e.displacementMap &&
                ((t.displacementMap.value = e.displacementMap),
                (t.displacementScale.value = e.displacementScale),
                (t.displacementBias.value = e.displacementBias));
            })(t, i))
          : i.isMeshDistanceMaterial
          ? (e(t, i),
            (function (t, e) {
              e.displacementMap &&
                ((t.displacementMap.value = e.displacementMap),
                (t.displacementScale.value = e.displacementScale),
                (t.displacementBias.value = e.displacementBias)),
                t.referencePosition.value.copy(e.referencePosition),
                (t.nearDistance.value = e.nearDistance),
                (t.farDistance.value = e.farDistance);
            })(t, i))
          : i.isMeshNormalMaterial
          ? (e(t, i),
            (function (t, e) {
              e.bumpMap &&
                ((t.bumpMap.value = e.bumpMap),
                (t.bumpScale.value = e.bumpScale),
                1 === e.side && (t.bumpScale.value *= -1)),
                e.normalMap &&
                  ((t.normalMap.value = e.normalMap),
                  t.normalScale.value.copy(e.normalScale),
                  1 === e.side && t.normalScale.value.negate()),
                e.displacementMap &&
                  ((t.displacementMap.value = e.displacementMap),
                  (t.displacementScale.value = e.displacementScale),
                  (t.displacementBias.value = e.displacementBias));
            })(t, i))
          : i.isLineBasicMaterial
          ? ((function (t, e) {
              t.diffuse.value.copy(e.color), (t.opacity.value = e.opacity);
            })(t, i),
            i.isLineDashedMaterial &&
              (function (t, e) {
                (t.dashSize.value = e.dashSize),
                  (t.totalSize.value = e.dashSize + e.gapSize),
                  (t.scale.value = e.scale);
              })(t, i))
          : i.isPointsMaterial
          ? (function (t, e, n, i) {
              let r;
              t.diffuse.value.copy(e.color),
                (t.opacity.value = e.opacity),
                (t.size.value = e.size * n),
                (t.scale.value = 0.5 * i),
                e.map && (t.map.value = e.map),
                e.alphaMap && (t.alphaMap.value = e.alphaMap),
                e.map ? (r = e.map) : e.alphaMap && (r = e.alphaMap),
                void 0 !== r &&
                  (!0 === r.matrixAutoUpdate && r.updateMatrix(),
                  t.uvTransform.value.copy(r.matrix));
            })(t, i, r, s)
          : i.isSpriteMaterial
          ? (function (t, e) {
              let n;
              t.diffuse.value.copy(e.color),
                (t.opacity.value = e.opacity),
                (t.rotation.value = e.rotation),
                e.map && (t.map.value = e.map),
                e.alphaMap && (t.alphaMap.value = e.alphaMap),
                e.map ? (n = e.map) : e.alphaMap && (n = e.alphaMap),
                void 0 !== n &&
                  (!0 === n.matrixAutoUpdate && n.updateMatrix(),
                  t.uvTransform.value.copy(n.matrix));
            })(t, i)
          : i.isShadowMaterial
          ? (t.color.value.copy(i.color), (t.opacity.value = i.opacity))
          : i.isShaderMaterial && (i.uniformsNeedUpdate = !1);
      },
    };
  }
  function br(t) {
    const e =
        void 0 !== (t = t || {}).canvas
          ? t.canvas
          : (function () {
              const t = document.createElementNS(
                "http://www.w3.org/1999/xhtml",
                "canvas"
              );
              return (t.style.display = "block"), t;
            })(),
      n = void 0 !== t.context ? t.context : null,
      i = void 0 !== t.alpha && t.alpha,
      r = void 0 === t.depth || t.depth,
      s = void 0 === t.stencil || t.stencil,
      o = void 0 !== t.antialias && t.antialias,
      a = void 0 === t.premultipliedAlpha || t.premultipliedAlpha,
      l = void 0 !== t.preserveDrawingBuffer && t.preserveDrawingBuffer,
      u = void 0 !== t.powerPreference ? t.powerPreference : "default",
      d =
        void 0 !== t.failIfMajorPerformanceCaveat &&
        t.failIfMajorPerformanceCaveat;
    let f = null,
      m = null;
    const g = [],
      v = [];
    (this.domElement = e),
      (this.debug = { checkShaderErrors: !0 }),
      (this.autoClear = !0),
      (this.autoClearColor = !0),
      (this.autoClearDepth = !0),
      (this.autoClearStencil = !0),
      (this.sortObjects = !0),
      (this.clippingPlanes = []),
      (this.localClippingEnabled = !1),
      (this.gammaFactor = 2),
      (this.outputEncoding = w),
      (this.physicallyCorrectLights = !1),
      (this.toneMapping = 0),
      (this.toneMappingExposure = 1),
      (this.maxMorphTargets = 8),
      (this.maxMorphNormals = 4);
    const _ = this;
    let y = !1,
      x = null,
      b = 0,
      M = 0,
      S = null,
      E = null,
      T = -1,
      A = null;
    const L = new H(),
      C = new H();
    let D = null,
      I = e.width,
      N = e.height,
      O = 1,
      z = null,
      B = null;
    const F = new H(0, 0, I, N),
      U = new H(0, 0, I, N);
    let G = !1;
    const V = new fn();
    let W = !1,
      j = !1;
    const q = new mt(),
      X = new k(),
      Y = {
        background: null,
        fog: null,
        environment: null,
        overrideMaterial: null,
        isScene: !0,
      };
    function J() {
      return null === S ? O : 1;
    }
    let Z,
      Q,
      K,
      $,
      tt,
      et,
      nt,
      it,
      rt,
      st,
      ot,
      at,
      lt,
      ct,
      ht,
      ut,
      dt,
      pt,
      ft,
      gt,
      vt,
      _t = n;
    function yt(t, n) {
      for (let i = 0; i < t.length; i++) {
        const r = t[i],
          s = e.getContext(r, n);
        if (null !== s) return s;
      }
      return null;
    }
    try {
      const t = {
        alpha: i,
        depth: r,
        stencil: s,
        antialias: o,
        premultipliedAlpha: a,
        preserveDrawingBuffer: l,
        powerPreference: u,
        failIfMajorPerformanceCaveat: d,
      };
      if (
        (e.addEventListener("webglcontextlost", Mt, !1),
        e.addEventListener("webglcontextrestored", St, !1),
        null === _t)
      ) {
        const e = ["webgl2", "webgl", "experimental-webgl"];
        if (
          (!0 === _.isWebGL1Renderer && e.shift(), (_t = yt(e, t)), null === _t)
        )
          throw yt(e)
            ? new Error(
                "Error creating WebGL context with your selected attributes."
              )
            : new Error("Error creating WebGL context.");
      }
      void 0 === _t.getShaderPrecisionFormat &&
        (_t.getShaderPrecisionFormat = function () {
          return { rangeMin: 1, rangeMax: 1, precision: 1 };
        });
    } catch (t) {
      throw (console.error("THREE.WebGLRenderer: " + t.message), t);
    }
    function xt() {
      (Z = new An(_t)),
        (Q = new Sn(_t, Z, t)),
        Z.init(Q),
        (gt = new mr(_t, Z, Q)),
        (K = new pr(_t, Z, Q)),
        K.scissor(C.copy(U).multiplyScalar(O).floor()),
        K.viewport(L.copy(F).multiplyScalar(O).floor()),
        ($ = new Rn(_t)),
        (tt = new $i()),
        (et = new fr(_t, Z, K, tt, Q, gt, $)),
        (nt = new Tn(_)),
        (it = new gn(_t, Q)),
        (vt = new wn(_t, Z, it, Q)),
        (rt = new Ln(_t, it, $, vt)),
        (st = new Nn(_t, rt, it, $)),
        (dt = new In(_t)),
        (ht = new En(tt)),
        (ot = new Ki(_, nt, Z, Q, vt, ht)),
        (at = new xr(tt)),
        (lt = new ir(tt)),
        (ct = new cr(Z, Q)),
        (ut = new bn(_, nt, K, st, a)),
        (pt = new Mn(_t, Z, $, Q)),
        (ft = new Cn(_t, Z, $, Q)),
        ($.programs = ot.programs),
        (_.capabilities = Q),
        (_.extensions = Z),
        (_.properties = tt),
        (_.renderLists = lt),
        (_.state = K),
        (_.info = $);
    }
    xt();
    const bt = new yr(_, _t);
    this.xr = bt;
    const wt = new dr(_, st, Q.maxTextureSize);
    function Mt(t) {
      t.preventDefault(),
        console.log("THREE.WebGLRenderer: Context Lost."),
        (y = !0);
    }
    function St() {
      console.log("THREE.WebGLRenderer: Context Restored."), (y = !1), xt();
    }
    function Et(t) {
      const e = t.target;
      e.removeEventListener("dispose", Et),
        (function (t) {
          Tt(t), tt.remove(t);
        })(e);
    }
    function Tt(t) {
      const e = tt.get(t).program;
      void 0 !== e && ot.releaseProgram(e);
    }
    (this.shadowMap = wt),
      (this.getContext = function () {
        return _t;
      }),
      (this.getContextAttributes = function () {
        return _t.getContextAttributes();
      }),
      (this.forceContextLoss = function () {
        const t = Z.get("WEBGL_lose_context");
        t && t.loseContext();
      }),
      (this.forceContextRestore = function () {
        const t = Z.get("WEBGL_lose_context");
        t && t.restoreContext();
      }),
      (this.getPixelRatio = function () {
        return O;
      }),
      (this.setPixelRatio = function (t) {
        void 0 !== t && ((O = t), this.setSize(I, N, !1));
      }),
      (this.getSize = function (t) {
        return (
          void 0 === t &&
            (console.warn(
              "WebGLRenderer: .getsize() now requires a Vector2 as an argument"
            ),
            (t = new P())),
          t.set(I, N)
        );
      }),
      (this.setSize = function (t, n, i) {
        bt.isPresenting
          ? console.warn(
              "THREE.WebGLRenderer: Can't change size while VR device is presenting."
            )
          : ((I = t),
            (N = n),
            (e.width = Math.floor(t * O)),
            (e.height = Math.floor(n * O)),
            !1 !== i &&
              ((e.style.width = t + "px"), (e.style.height = n + "px")),
            this.setViewport(0, 0, t, n));
      }),
      (this.getDrawingBufferSize = function (t) {
        return (
          void 0 === t &&
            (console.warn(
              "WebGLRenderer: .getdrawingBufferSize() now requires a Vector2 as an argument"
            ),
            (t = new P())),
          t.set(I * O, N * O).floor()
        );
      }),
      (this.setDrawingBufferSize = function (t, n, i) {
        (I = t),
          (N = n),
          (O = i),
          (e.width = Math.floor(t * i)),
          (e.height = Math.floor(n * i)),
          this.setViewport(0, 0, t, n);
      }),
      (this.getCurrentViewport = function (t) {
        return (
          void 0 === t &&
            (console.warn(
              "WebGLRenderer: .getCurrentViewport() now requires a Vector4 as an argument"
            ),
            (t = new H())),
          t.copy(L)
        );
      }),
      (this.getViewport = function (t) {
        return t.copy(F);
      }),
      (this.setViewport = function (t, e, n, i) {
        t.isVector4 ? F.set(t.x, t.y, t.z, t.w) : F.set(t, e, n, i),
          K.viewport(L.copy(F).multiplyScalar(O).floor());
      }),
      (this.getScissor = function (t) {
        return t.copy(U);
      }),
      (this.setScissor = function (t, e, n, i) {
        t.isVector4 ? U.set(t.x, t.y, t.z, t.w) : U.set(t, e, n, i),
          K.scissor(C.copy(U).multiplyScalar(O).floor());
      }),
      (this.getScissorTest = function () {
        return G;
      }),
      (this.setScissorTest = function (t) {
        K.setScissorTest((G = t));
      }),
      (this.setOpaqueSort = function (t) {
        z = t;
      }),
      (this.setTransparentSort = function (t) {
        B = t;
      }),
      (this.getClearColor = function (t) {
        return (
          void 0 === t &&
            (console.warn(
              "WebGLRenderer: .getClearColor() now requires a Color as an argument"
            ),
            (t = new he())),
          t.copy(ut.getClearColor())
        );
      }),
      (this.setClearColor = function () {
        ut.setClearColor.apply(ut, arguments);
      }),
      (this.getClearAlpha = function () {
        return ut.getClearAlpha();
      }),
      (this.setClearAlpha = function () {
        ut.setClearAlpha.apply(ut, arguments);
      }),
      (this.clear = function (t, e, n) {
        let i = 0;
        (void 0 === t || t) && (i |= 16384),
          (void 0 === e || e) && (i |= 256),
          (void 0 === n || n) && (i |= 1024),
          _t.clear(i);
      }),
      (this.clearColor = function () {
        this.clear(!0, !1, !1);
      }),
      (this.clearDepth = function () {
        this.clear(!1, !0, !1);
      }),
      (this.clearStencil = function () {
        this.clear(!1, !1, !0);
      }),
      (this.dispose = function () {
        e.removeEventListener("webglcontextlost", Mt, !1),
          e.removeEventListener("webglcontextrestored", St, !1),
          lt.dispose(),
          ct.dispose(),
          tt.dispose(),
          nt.dispose(),
          st.dispose(),
          vt.dispose(),
          bt.dispose(),
          Lt.stop();
      }),
      (this.renderBufferImmediate = function (t, e) {
        vt.initAttributes();
        const n = tt.get(t);
        t.hasPositions && !n.position && (n.position = _t.createBuffer()),
          t.hasNormals && !n.normal && (n.normal = _t.createBuffer()),
          t.hasUvs && !n.uv && (n.uv = _t.createBuffer()),
          t.hasColors && !n.color && (n.color = _t.createBuffer());
        const i = e.getAttributes();
        t.hasPositions &&
          (_t.bindBuffer(34962, n.position),
          _t.bufferData(34962, t.positionArray, 35048),
          vt.enableAttribute(i.position),
          _t.vertexAttribPointer(i.position, 3, 5126, !1, 0, 0)),
          t.hasNormals &&
            (_t.bindBuffer(34962, n.normal),
            _t.bufferData(34962, t.normalArray, 35048),
            vt.enableAttribute(i.normal),
            _t.vertexAttribPointer(i.normal, 3, 5126, !1, 0, 0)),
          t.hasUvs &&
            (_t.bindBuffer(34962, n.uv),
            _t.bufferData(34962, t.uvArray, 35048),
            vt.enableAttribute(i.uv),
            _t.vertexAttribPointer(i.uv, 2, 5126, !1, 0, 0)),
          t.hasColors &&
            (_t.bindBuffer(34962, n.color),
            _t.bufferData(34962, t.colorArray, 35048),
            vt.enableAttribute(i.color),
            _t.vertexAttribPointer(i.color, 3, 5126, !1, 0, 0)),
          vt.disableUnusedAttributes(),
          _t.drawArrays(4, 0, t.count),
          (t.count = 0);
      }),
      (this.renderBufferDirect = function (t, e, n, i, r, s) {
        null === e && (e = Y);
        const o = r.isMesh && r.matrixWorld.determinant() < 0,
          a = It(t, e, i, r);
        K.setMaterial(i, o);
        let l = n.index;
        const c = n.attributes.position;
        if (null === l) {
          if (void 0 === c || 0 === c.count) return;
        } else if (0 === l.count) return;
        let h,
          u = 1;
        !0 === i.wireframe && ((l = rt.getWireframeAttribute(n)), (u = 2)),
          (i.morphTargets || i.morphNormals) && dt.update(r, n, i, a),
          vt.setup(r, i, a, n, l);
        let d = pt;
        null !== l && ((h = it.get(l)), (d = ft), d.setIndex(h));
        const p = null !== l ? l.count : c.count,
          f = n.drawRange.start * u,
          m = n.drawRange.count * u,
          g = null !== s ? s.start * u : 0,
          v = null !== s ? s.count * u : 1 / 0,
          _ = Math.max(f, g),
          y = Math.min(p, f + m, g + v) - 1,
          x = Math.max(0, y - _ + 1);
        if (0 !== x) {
          if (r.isMesh)
            !0 === i.wireframe
              ? (K.setLineWidth(i.wireframeLinewidth * J()), d.setMode(1))
              : d.setMode(4);
          else if (r.isLine) {
            let t = i.linewidth;
            void 0 === t && (t = 1),
              K.setLineWidth(t * J()),
              r.isLineSegments
                ? d.setMode(1)
                : r.isLineLoop
                ? d.setMode(2)
                : d.setMode(3);
          } else r.isPoints ? d.setMode(0) : r.isSprite && d.setMode(4);
          if (r.isInstancedMesh) d.renderInstances(_, x, r.count);
          else if (n.isInstancedBufferGeometry) {
            const t = Math.min(n.instanceCount, n._maxInstanceCount);
            d.renderInstances(_, x, t);
          } else d.render(_, x);
        }
      }),
      (this.compile = function (t, e) {
        (m = ct.get(t)),
          m.init(),
          t.traverseVisible(function (t) {
            t.isLight &&
              t.layers.test(e.layers) &&
              (m.pushLight(t), t.castShadow && m.pushShadow(t));
          }),
          m.setupLights();
        const n = new WeakMap();
        t.traverse(function (e) {
          const i = e.material;
          if (i)
            if (Array.isArray(i))
              for (let r = 0; r < i.length; r++) {
                const s = i[r];
                !1 === n.has(s) && (Dt(s, t, e), n.set(s));
              }
            else !1 === n.has(i) && (Dt(i, t, e), n.set(i));
        });
      });
    let At = null;
    const Lt = new mn();
    function Ct(t, e, n, i) {
      if (!1 === t.visible) return;
      if (t.layers.test(e.layers))
        if (t.isGroup) n = t.renderOrder;
        else if (t.isLOD) !0 === t.autoUpdate && t.update(e);
        else if (t.isLight) m.pushLight(t), t.castShadow && m.pushShadow(t);
        else if (t.isSprite) {
          if (!t.frustumCulled || V.intersectsSprite(t)) {
            i && X.setFromMatrixPosition(t.matrixWorld).applyMatrix4(q);
            const e = st.update(t),
              r = t.material;
            r.visible && f.push(t, e, r, n, X.z, null);
          }
        } else if (t.isImmediateRenderObject)
          i && X.setFromMatrixPosition(t.matrixWorld).applyMatrix4(q),
            f.push(t, null, t.material, n, X.z, null);
        else if (
          (t.isMesh || t.isLine || t.isPoints) &&
          (t.isSkinnedMesh &&
            t.skeleton.frame !== $.render.frame &&
            (t.skeleton.update(), (t.skeleton.frame = $.render.frame)),
          !t.frustumCulled || V.intersectsObject(t))
        ) {
          i && X.setFromMatrixPosition(t.matrixWorld).applyMatrix4(q);
          const e = st.update(t),
            r = t.material;
          if (Array.isArray(r)) {
            const i = e.groups;
            for (let s = 0, o = i.length; s < o; s++) {
              const o = i[s],
                a = r[o.materialIndex];
              a && a.visible && f.push(t, e, a, n, X.z, o);
            }
          } else r.visible && f.push(t, e, r, n, X.z, null);
        }
      const r = t.children;
      for (let t = 0, s = r.length; t < s; t++) Ct(r[t], e, n, i);
    }
    function Rt(t, e, n) {
      const i = !0 === e.isScene ? e.overrideMaterial : null;
      for (let r = 0, s = t.length; r < s; r++) {
        const s = t[r],
          o = s.object,
          a = s.geometry,
          l = null === i ? s.material : i,
          c = s.group;
        if (n.isArrayCamera) {
          const t = n.cameras;
          for (let n = 0, i = t.length; n < i; n++) {
            const i = t[n];
            o.layers.test(i.layers) &&
              (K.viewport(L.copy(i.viewport)),
              m.setupLightsView(i),
              Pt(o, e, i, a, l, c));
          }
        } else Pt(o, e, n, a, l, c);
      }
    }
    function Pt(t, e, n, i, r, s) {
      if (
        (t.onBeforeRender(_, e, n, i, r, s),
        t.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse, t.matrixWorld),
        t.normalMatrix.getNormalMatrix(t.modelViewMatrix),
        t.isImmediateRenderObject)
      ) {
        const i = It(n, e, r, t);
        K.setMaterial(r),
          vt.reset(),
          (function (t, e) {
            t.render(function (t) {
              _.renderBufferImmediate(t, e);
            });
          })(t, i);
      } else _.renderBufferDirect(n, e, i, r, t, s);
      t.onAfterRender(_, e, n, i, r, s);
    }
    function Dt(t, e, n) {
      !0 !== e.isScene && (e = Y);
      const i = tt.get(t),
        r = m.state.lights,
        s = m.state.shadowsArray,
        o = r.state.version,
        a = ot.getParameters(t, r.state, s, e, n),
        l = ot.getProgramCacheKey(a);
      let c = i.program,
        h = !0;
      if (
        ((i.environment = t.isMeshStandardMaterial ? e.environment : null),
        (i.fog = e.fog),
        (i.envMap = nt.get(t.envMap || i.environment)),
        void 0 === c)
      )
        t.addEventListener("dispose", Et);
      else if (c.cacheKey !== l) Tt(t);
      else if (i.lightsStateVersion !== o) h = !1;
      else {
        if (void 0 !== a.shaderID) return;
        h = !1;
      }
      h &&
        ((a.uniforms = ot.getUniforms(t)),
        t.onBeforeCompile(a, _),
        (c = ot.acquireProgram(a, l)),
        (i.program = c),
        (i.uniforms = a.uniforms),
        (i.outputEncoding = a.outputEncoding));
      const u = i.uniforms;
      ((t.isShaderMaterial || t.isRawShaderMaterial) && !0 !== t.clipping) ||
        ((i.numClippingPlanes = ht.numPlanes),
        (i.numIntersection = ht.numIntersection),
        (u.clippingPlanes = ht.uniform)),
        (i.needsLights = (function (t) {
          return (
            t.isMeshLambertMaterial ||
            t.isMeshToonMaterial ||
            t.isMeshPhongMaterial ||
            t.isMeshStandardMaterial ||
            t.isShadowMaterial ||
            (t.isShaderMaterial && !0 === t.lights)
          );
        })(t)),
        (i.lightsStateVersion = o),
        i.needsLights &&
          ((u.ambientLightColor.value = r.state.ambient),
          (u.lightProbe.value = r.state.probe),
          (u.directionalLights.value = r.state.directional),
          (u.directionalLightShadows.value = r.state.directionalShadow),
          (u.spotLights.value = r.state.spot),
          (u.spotLightShadows.value = r.state.spotShadow),
          (u.rectAreaLights.value = r.state.rectArea),
          (u.ltc_1.value = r.state.rectAreaLTC1),
          (u.ltc_2.value = r.state.rectAreaLTC2),
          (u.pointLights.value = r.state.point),
          (u.pointLightShadows.value = r.state.pointShadow),
          (u.hemisphereLights.value = r.state.hemi),
          (u.directionalShadowMap.value = r.state.directionalShadowMap),
          (u.directionalShadowMatrix.value = r.state.directionalShadowMatrix),
          (u.spotShadowMap.value = r.state.spotShadowMap),
          (u.spotShadowMatrix.value = r.state.spotShadowMatrix),
          (u.pointShadowMap.value = r.state.pointShadowMap),
          (u.pointShadowMatrix.value = r.state.pointShadowMatrix));
      const d = i.program.getUniforms(),
        p = Pi.seqWithValue(d.seq, u);
      i.uniformsList = p;
    }
    function It(t, e, n, i) {
      !0 !== e.isScene && (e = Y), et.resetTextureUnits();
      const r = e.fog,
        s = n.isMeshStandardMaterial ? e.environment : null,
        o = null === S ? _.outputEncoding : S.texture.encoding,
        a = nt.get(n.envMap || s),
        l = tt.get(n),
        h = m.state.lights;
      if (!0 === W && (!0 === j || t !== A)) {
        const e = t === A && n.id === T;
        ht.setState(n, t, e);
      }
      n.version === l.__version
        ? (n.fog && l.fog !== r) ||
          l.environment !== s ||
          (l.needsLights && l.lightsStateVersion !== h.state.version)
          ? Dt(n, e, i)
          : void 0 === l.numClippingPlanes ||
            (l.numClippingPlanes === ht.numPlanes &&
              l.numIntersection === ht.numIntersection)
          ? (l.outputEncoding !== o || l.envMap !== a) && Dt(n, e, i)
          : Dt(n, e, i)
        : (Dt(n, e, i), (l.__version = n.version));
      let u = !1,
        d = !1,
        f = !1;
      const g = l.program,
        v = g.getUniforms(),
        y = l.uniforms;
      if (
        (K.useProgram(g.program) && ((u = !0), (d = !0), (f = !0)),
        n.id !== T && ((T = n.id), (d = !0)),
        u || A !== t)
      ) {
        if (
          (v.setValue(_t, "projectionMatrix", t.projectionMatrix),
          Q.logarithmicDepthBuffer &&
            v.setValue(
              _t,
              "logDepthBufFC",
              2 / (Math.log(t.far + 1) / Math.LN2)
            ),
          A !== t && ((A = t), (d = !0), (f = !0)),
          n.isShaderMaterial ||
            n.isMeshPhongMaterial ||
            n.isMeshToonMaterial ||
            n.isMeshStandardMaterial ||
            n.envMap)
        ) {
          const e = v.map.cameraPosition;
          void 0 !== e &&
            e.setValue(_t, X.setFromMatrixPosition(t.matrixWorld));
        }
        (n.isMeshPhongMaterial ||
          n.isMeshToonMaterial ||
          n.isMeshLambertMaterial ||
          n.isMeshBasicMaterial ||
          n.isMeshStandardMaterial ||
          n.isShaderMaterial) &&
          v.setValue(_t, "isOrthographic", !0 === t.isOrthographicCamera),
          (n.isMeshPhongMaterial ||
            n.isMeshToonMaterial ||
            n.isMeshLambertMaterial ||
            n.isMeshBasicMaterial ||
            n.isMeshStandardMaterial ||
            n.isShaderMaterial ||
            n.isShadowMaterial ||
            n.skinning) &&
            v.setValue(_t, "viewMatrix", t.matrixWorldInverse);
      }
      if (n.skinning) {
        v.setOptional(_t, i, "bindMatrix"),
          v.setOptional(_t, i, "bindMatrixInverse");
        const t = i.skeleton;
        if (t) {
          const e = t.bones;
          if (Q.floatVertexTextures) {
            if (null === t.boneTexture) {
              let n = Math.sqrt(4 * e.length);
              (n = R.ceilPowerOfTwo(n)), (n = Math.max(n, 4));
              const i = new Float32Array(n * n * 4);
              i.set(t.boneMatrices);
              const r = new un(i, n, n, p, c);
              (t.boneMatrices = i),
                (t.boneTexture = r),
                (t.boneTextureSize = n);
            }
            v.setValue(_t, "boneTexture", t.boneTexture, et),
              v.setValue(_t, "boneTextureSize", t.boneTextureSize);
          } else v.setOptional(_t, t, "boneMatrices");
        }
      }
      var x, b;
      return (
        (d || l.receiveShadow !== i.receiveShadow) &&
          ((l.receiveShadow = i.receiveShadow),
          v.setValue(_t, "receiveShadow", i.receiveShadow)),
        d &&
          (v.setValue(_t, "toneMappingExposure", _.toneMappingExposure),
          l.needsLights &&
            ((b = f),
            ((x = y).ambientLightColor.needsUpdate = b),
            (x.lightProbe.needsUpdate = b),
            (x.directionalLights.needsUpdate = b),
            (x.directionalLightShadows.needsUpdate = b),
            (x.pointLights.needsUpdate = b),
            (x.pointLightShadows.needsUpdate = b),
            (x.spotLights.needsUpdate = b),
            (x.spotLightShadows.needsUpdate = b),
            (x.rectAreaLights.needsUpdate = b),
            (x.hemisphereLights.needsUpdate = b)),
          r && n.fog && at.refreshFogUniforms(y, r),
          at.refreshMaterialUniforms(y, n, O, N),
          Pi.upload(_t, l.uniformsList, y, et)),
        n.isShaderMaterial &&
          !0 === n.uniformsNeedUpdate &&
          (Pi.upload(_t, l.uniformsList, y, et), (n.uniformsNeedUpdate = !1)),
        n.isSpriteMaterial && v.setValue(_t, "center", i.center),
        v.setValue(_t, "modelViewMatrix", i.modelViewMatrix),
        v.setValue(_t, "normalMatrix", i.normalMatrix),
        v.setValue(_t, "modelMatrix", i.matrixWorld),
        g
      );
    }
    Lt.setAnimationLoop(function (t) {
      bt.isPresenting || (At && At(t));
    }),
      "undefined" != typeof window && Lt.setContext(window),
      (this.setAnimationLoop = function (t) {
        (At = t), bt.setAnimationLoop(t), null === t ? Lt.stop() : Lt.start();
      }),
      (this.render = function (t, e) {
        let n, i;
        if (
          (void 0 !== arguments[2] &&
            (console.warn(
              "THREE.WebGLRenderer.render(): the renderTarget argument has been removed. Use .setRenderTarget() instead."
            ),
            (n = arguments[2])),
          void 0 !== arguments[3] &&
            (console.warn(
              "THREE.WebGLRenderer.render(): the forceClear argument has been removed. Use .clear() instead."
            ),
            (i = arguments[3])),
          void 0 !== e && !0 !== e.isCamera)
        )
          return void console.error(
            "THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera."
          );
        if (!0 === y) return;
        vt.resetDefaultState(),
          (T = -1),
          (A = null),
          !0 === t.autoUpdate && t.updateMatrixWorld(),
          null === e.parent && e.updateMatrixWorld(),
          !0 === bt.enabled && !0 === bt.isPresenting && (e = bt.getCamera(e)),
          !0 === t.isScene && t.onBeforeRender(_, t, e, n || S),
          (m = ct.get(t, v.length)),
          m.init(),
          v.push(m),
          q.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse),
          V.setFromProjectionMatrix(q),
          (j = this.localClippingEnabled),
          (W = ht.init(this.clippingPlanes, j, e)),
          (f = lt.get(t, g.length)),
          f.init(),
          g.push(f),
          Ct(t, e, 0, _.sortObjects),
          f.finish(),
          !0 === _.sortObjects && f.sort(z, B),
          !0 === W && ht.beginShadows();
        const r = m.state.shadowsArray;
        wt.render(r, t, e),
          m.setupLights(),
          m.setupLightsView(e),
          !0 === W && ht.endShadows(),
          !0 === this.info.autoReset && this.info.reset(),
          void 0 !== n && this.setRenderTarget(n),
          ut.render(f, t, e, i);
        const s = f.opaque,
          o = f.transparent;
        s.length > 0 && Rt(s, t, e),
          o.length > 0 && Rt(o, t, e),
          !0 === t.isScene && t.onAfterRender(_, t, e),
          null !== S &&
            (et.updateRenderTargetMipmap(S),
            et.updateMultisampleRenderTarget(S)),
          K.buffers.depth.setTest(!0),
          K.buffers.depth.setMask(!0),
          K.buffers.color.setMask(!0),
          K.setPolygonOffset(!1),
          v.pop(),
          (m = v.length > 0 ? v[v.length - 1] : null),
          g.pop(),
          (f = g.length > 0 ? g[g.length - 1] : null);
      }),
      (this.setFramebuffer = function (t) {
        x !== t && null === S && _t.bindFramebuffer(36160, t), (x = t);
      }),
      (this.getActiveCubeFace = function () {
        return b;
      }),
      (this.getActiveMipmapLevel = function () {
        return M;
      }),
      (this.getRenderTarget = function () {
        return S;
      }),
      (this.setRenderTarget = function (t, e = 0, n = 0) {
        (S = t),
          (b = e),
          (M = n),
          t &&
            void 0 === tt.get(t).__webglFramebuffer &&
            et.setupRenderTarget(t);
        let i = x,
          r = !1,
          s = !1;
        if (t) {
          const n = t.texture;
          (n.isDataTexture3D || n.isDataTexture2DArray) && (s = !0);
          const o = tt.get(t).__webglFramebuffer;
          t.isWebGLCubeRenderTarget
            ? ((i = o[e]), (r = !0))
            : (i = t.isWebGLMultisampleRenderTarget
                ? tt.get(t).__webglMultisampledFramebuffer
                : o),
            L.copy(t.viewport),
            C.copy(t.scissor),
            (D = t.scissorTest);
        } else
          L.copy(F).multiplyScalar(O).floor(),
            C.copy(U).multiplyScalar(O).floor(),
            (D = G);
        if (
          (E !== i && (_t.bindFramebuffer(36160, i), (E = i)),
          K.viewport(L),
          K.scissor(C),
          K.setScissorTest(D),
          r)
        ) {
          const i = tt.get(t.texture);
          _t.framebufferTexture2D(36160, 36064, 34069 + e, i.__webglTexture, n);
        } else if (s) {
          const i = tt.get(t.texture),
            r = e || 0;
          _t.framebufferTextureLayer(36160, 36064, i.__webglTexture, n || 0, r);
        }
      }),
      (this.readRenderTargetPixels = function (t, e, n, i, r, s, o) {
        if (!t || !t.isWebGLRenderTarget)
          return void console.error(
            "THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget."
          );
        let a = tt.get(t).__webglFramebuffer;
        if ((t.isWebGLCubeRenderTarget && void 0 !== o && (a = a[o]), a)) {
          let o = !1;
          a !== E && (_t.bindFramebuffer(36160, a), (o = !0));
          try {
            const a = t.texture,
              l = a.format,
              u = a.type;
            if (l !== p && gt.convert(l) !== _t.getParameter(35739))
              return void console.error(
                "THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format."
              );
            const d =
              u === h &&
              (Z.has("EXT_color_buffer_half_float") ||
                (Q.isWebGL2 && Z.has("EXT_color_buffer_float")));
            if (
              !(
                1009 === u ||
                gt.convert(u) === _t.getParameter(35738) ||
                (u === c &&
                  (Q.isWebGL2 ||
                    Z.has("OES_texture_float") ||
                    Z.has("WEBGL_color_buffer_float"))) ||
                d
              )
            )
              return void console.error(
                "THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type."
              );
            36053 === _t.checkFramebufferStatus(36160)
              ? e >= 0 &&
                e <= t.width - i &&
                n >= 0 &&
                n <= t.height - r &&
                _t.readPixels(e, n, i, r, gt.convert(l), gt.convert(u), s)
              : console.error(
                  "THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete."
                );
          } finally {
            o && _t.bindFramebuffer(36160, E);
          }
        }
      }),
      (this.copyFramebufferToTexture = function (t, e, n = 0) {
        const i = Math.pow(2, -n),
          r = Math.floor(e.image.width * i),
          s = Math.floor(e.image.height * i),
          o = gt.convert(e.format);
        et.setTexture2D(e, 0),
          _t.copyTexImage2D(3553, n, o, t.x, t.y, r, s, 0),
          K.unbindTexture();
      }),
      (this.copyTextureToTexture = function (t, e, n, i = 0) {
        const r = e.image.width,
          s = e.image.height,
          o = gt.convert(n.format),
          a = gt.convert(n.type);
        et.setTexture2D(n, 0),
          _t.pixelStorei(37440, n.flipY),
          _t.pixelStorei(37441, n.premultiplyAlpha),
          _t.pixelStorei(3317, n.unpackAlignment),
          e.isDataTexture
            ? _t.texSubImage2D(3553, i, t.x, t.y, r, s, o, a, e.image.data)
            : e.isCompressedTexture
            ? _t.compressedTexSubImage2D(
                3553,
                i,
                t.x,
                t.y,
                e.mipmaps[0].width,
                e.mipmaps[0].height,
                o,
                e.mipmaps[0].data
              )
            : _t.texSubImage2D(3553, i, t.x, t.y, o, a, e.image),
          0 === i && n.generateMipmaps && _t.generateMipmap(3553),
          K.unbindTexture();
      }),
      (this.copyTextureToTexture3D = function (t, e, n, i, r = 0) {
        if (_.isWebGL1Renderer)
          return void console.warn(
            "THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2."
          );
        const { width: s, height: o, data: a } = n.image,
          l = gt.convert(i.format),
          c = gt.convert(i.type);
        let h;
        if (i.isDataTexture3D) et.setTexture3D(i, 0), (h = 32879);
        else {
          if (!i.isDataTexture2DArray)
            return void console.warn(
              "THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray."
            );
          et.setTexture2DArray(i, 0), (h = 35866);
        }
        _t.pixelStorei(37440, i.flipY),
          _t.pixelStorei(37441, i.premultiplyAlpha),
          _t.pixelStorei(3317, i.unpackAlignment);
        const u = _t.getParameter(3314),
          d = _t.getParameter(32878),
          p = _t.getParameter(3316),
          f = _t.getParameter(3315),
          m = _t.getParameter(32877);
        _t.pixelStorei(3314, s),
          _t.pixelStorei(32878, o),
          _t.pixelStorei(3316, t.min.x),
          _t.pixelStorei(3315, t.min.y),
          _t.pixelStorei(32877, t.min.z),
          _t.texSubImage3D(
            h,
            r,
            e.x,
            e.y,
            e.z,
            t.max.x - t.min.x + 1,
            t.max.y - t.min.y + 1,
            t.max.z - t.min.z + 1,
            l,
            c,
            a
          ),
          _t.pixelStorei(3314, u),
          _t.pixelStorei(32878, d),
          _t.pixelStorei(3316, p),
          _t.pixelStorei(3315, f),
          _t.pixelStorei(32877, m),
          0 === r && i.generateMipmaps && _t.generateMipmap(h),
          K.unbindTexture();
      }),
      (this.initTexture = function (t) {
        et.setTexture2D(t, 0), K.unbindTexture();
      }),
      (this.resetState = function () {
        K.reset(), vt.reset();
      }),
      "undefined" != typeof __THREE_DEVTOOLS__ &&
        __THREE_DEVTOOLS__.dispatchEvent(
          new CustomEvent("observe", { detail: this })
        );
  }
  (vr.prototype.isGroup = !0),
    Object.assign(_r.prototype, {
      constructor: _r,
      getHandSpace: function () {
        return (
          null === this._hand &&
            ((this._hand = new vr()),
            (this._hand.matrixAutoUpdate = !1),
            (this._hand.visible = !1),
            (this._hand.joints = {}),
            (this._hand.inputState = { pinching: !1 })),
          this._hand
        );
      },
      getTargetRaySpace: function () {
        return (
          null === this._targetRay &&
            ((this._targetRay = new vr()),
            (this._targetRay.matrixAutoUpdate = !1),
            (this._targetRay.visible = !1)),
          this._targetRay
        );
      },
      getGripSpace: function () {
        return (
          null === this._grip &&
            ((this._grip = new vr()),
            (this._grip.matrixAutoUpdate = !1),
            (this._grip.visible = !1)),
          this._grip
        );
      },
      dispatchEvent: function (t) {
        return (
          null !== this._targetRay && this._targetRay.dispatchEvent(t),
          null !== this._grip && this._grip.dispatchEvent(t),
          null !== this._hand && this._hand.dispatchEvent(t),
          this
        );
      },
      disconnect: function (t) {
        return (
          this.dispatchEvent({ type: "disconnected", data: t }),
          null !== this._targetRay && (this._targetRay.visible = !1),
          null !== this._grip && (this._grip.visible = !1),
          null !== this._hand && (this._hand.visible = !1),
          this
        );
      },
      update: function (t, e, n) {
        let i = null,
          r = null,
          s = null;
        const o = this._targetRay,
          a = this._grip,
          l = this._hand;
        if (t && "visible-blurred" !== e.session.visibilityState)
          if (l && t.hand) {
            s = !0;
            for (const i of t.hand.values()) {
              const t = e.getJointPose(i, n);
              if (void 0 === l.joints[i.jointName]) {
                const t = new vr();
                (t.matrixAutoUpdate = !1),
                  (t.visible = !1),
                  (l.joints[i.jointName] = t),
                  l.add(t);
              }
              const r = l.joints[i.jointName];
              null !== t &&
                (r.matrix.fromArray(t.transform.matrix),
                r.matrix.decompose(r.position, r.rotation, r.scale),
                (r.jointRadius = t.radius)),
                (r.visible = null !== t);
            }
            const i = l.joints["index-finger-tip"],
              r = l.joints["thumb-tip"],
              o = i.position.distanceTo(r.position),
              a = 0.02,
              c = 0.005;
            l.inputState.pinching && o > a + c
              ? ((l.inputState.pinching = !1),
                this.dispatchEvent({
                  type: "pinchend",
                  handedness: t.handedness,
                  target: this,
                }))
              : !l.inputState.pinching &&
                o <= a - c &&
                ((l.inputState.pinching = !0),
                this.dispatchEvent({
                  type: "pinchstart",
                  handedness: t.handedness,
                  target: this,
                }));
          } else
            null !== o &&
              ((i = e.getPose(t.targetRaySpace, n)),
              null !== i &&
                (o.matrix.fromArray(i.transform.matrix),
                o.matrix.decompose(o.position, o.rotation, o.scale))),
              null !== a &&
                t.gripSpace &&
                ((r = e.getPose(t.gripSpace, n)),
                null !== r &&
                  (a.matrix.fromArray(r.transform.matrix),
                  a.matrix.decompose(a.position, a.rotation, a.scale)));
        return (
          null !== o && (o.visible = null !== i),
          null !== a && (a.visible = null !== r),
          null !== l && (l.visible = null !== s),
          this
        );
      },
    }),
    Object.assign(yr.prototype, A.prototype),
    (class extends br {}.prototype.isWebGL1Renderer = !0);
  class wr {
    constructor(t, e) {
      (this.name = ""),
        (this.color = new he(t)),
        (this.density = void 0 !== e ? e : 25e-5);
    }
    clone() {
      return new wr(this.color, this.density);
    }
    toJSON() {
      return {
        type: "FogExp2",
        color: this.color.getHex(),
        density: this.density,
      };
    }
  }
  wr.prototype.isFogExp2 = !0;
  class Mr {
    constructor(t, e, n) {
      (this.name = ""),
        (this.color = new he(t)),
        (this.near = void 0 !== e ? e : 1),
        (this.far = void 0 !== n ? n : 1e3);
    }
    clone() {
      return new Mr(this.color, this.near, this.far);
    }
    toJSON() {
      return {
        type: "Fog",
        color: this.color.getHex(),
        near: this.near,
        far: this.far,
      };
    }
  }
  Mr.prototype.isFog = !0;
  class Sr extends Ut {
    constructor() {
      super(),
        (this.type = "Scene"),
        (this.background = null),
        (this.environment = null),
        (this.fog = null),
        (this.overrideMaterial = null),
        (this.autoUpdate = !0),
        "undefined" != typeof __THREE_DEVTOOLS__ &&
          __THREE_DEVTOOLS__.dispatchEvent(
            new CustomEvent("observe", { detail: this })
          );
    }
    copy(t, e) {
      return (
        super.copy(t, e),
        null !== t.background && (this.background = t.background.clone()),
        null !== t.environment && (this.environment = t.environment.clone()),
        null !== t.fog && (this.fog = t.fog.clone()),
        null !== t.overrideMaterial &&
          (this.overrideMaterial = t.overrideMaterial.clone()),
        (this.autoUpdate = t.autoUpdate),
        (this.matrixAutoUpdate = t.matrixAutoUpdate),
        this
      );
    }
    toJSON(t) {
      const e = super.toJSON(t);
      return (
        null !== this.background &&
          (e.object.background = this.background.toJSON(t)),
        null !== this.environment &&
          (e.object.environment = this.environment.toJSON(t)),
        null !== this.fog && (e.object.fog = this.fog.toJSON()),
        e
      );
    }
  }
  function Er(t, e) {
    (this.array = t),
      (this.stride = e),
      (this.count = void 0 !== t ? t.length / e : 0),
      (this.usage = S),
      (this.updateRange = { offset: 0, count: -1 }),
      (this.version = 0),
      (this.uuid = R.generateUUID());
  }
  (Sr.prototype.isScene = !0),
    Object.defineProperty(Er.prototype, "needsUpdate", {
      set: function (t) {
        !0 === t && this.version++;
      },
    }),
    Object.assign(Er.prototype, {
      isInterleavedBuffer: !0,
      onUploadCallback: function () {},
      setUsage: function (t) {
        return (this.usage = t), this;
      },
      copy: function (t) {
        return (
          (this.array = new t.array.constructor(t.array)),
          (this.count = t.count),
          (this.stride = t.stride),
          (this.usage = t.usage),
          this
        );
      },
      copyAt: function (t, e, n) {
        (t *= this.stride), (n *= e.stride);
        for (let i = 0, r = this.stride; i < r; i++)
          this.array[t + i] = e.array[n + i];
        return this;
      },
      set: function (t, e = 0) {
        return this.array.set(t, e), this;
      },
      clone: function (t) {
        void 0 === t.arrayBuffers && (t.arrayBuffers = {}),
          void 0 === this.array.buffer._uuid &&
            (this.array.buffer._uuid = R.generateUUID()),
          void 0 === t.arrayBuffers[this.array.buffer._uuid] &&
            (t.arrayBuffers[this.array.buffer._uuid] =
              this.array.slice(0).buffer);
        const e = new Er(
          new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),
          this.stride
        );
        return e.setUsage(this.usage), e;
      },
      onUpload: function (t) {
        return (this.onUploadCallback = t), this;
      },
      toJSON: function (t) {
        return (
          void 0 === t.arrayBuffers && (t.arrayBuffers = {}),
          void 0 === this.array.buffer._uuid &&
            (this.array.buffer._uuid = R.generateUUID()),
          void 0 === t.arrayBuffers[this.array.buffer._uuid] &&
            (t.arrayBuffers[this.array.buffer._uuid] =
              Array.prototype.slice.call(new Uint32Array(this.array.buffer))),
          {
            uuid: this.uuid,
            buffer: this.array.buffer._uuid,
            type: this.array.constructor.name,
            stride: this.stride,
          }
        );
      },
    });
  const Tr = new k();
  function Ar(t, e, n, i) {
    (this.name = ""),
      (this.data = t),
      (this.itemSize = e),
      (this.offset = n),
      (this.normalized = !0 === i);
  }
  Object.defineProperties(Ar.prototype, {
    count: {
      get: function () {
        return this.data.count;
      },
    },
    array: {
      get: function () {
        return this.data.array;
      },
    },
    needsUpdate: {
      set: function (t) {
        this.data.needsUpdate = t;
      },
    },
  }),
    Object.assign(Ar.prototype, {
      isInterleavedBufferAttribute: !0,
      applyMatrix4: function (t) {
        for (let e = 0, n = this.data.count; e < n; e++)
          (Tr.x = this.getX(e)),
            (Tr.y = this.getY(e)),
            (Tr.z = this.getZ(e)),
            Tr.applyMatrix4(t),
            this.setXYZ(e, Tr.x, Tr.y, Tr.z);
        return this;
      },
      setX: function (t, e) {
        return (this.data.array[t * this.data.stride + this.offset] = e), this;
      },
      setY: function (t, e) {
        return (
          (this.data.array[t * this.data.stride + this.offset + 1] = e), this
        );
      },
      setZ: function (t, e) {
        return (
          (this.data.array[t * this.data.stride + this.offset + 2] = e), this
        );
      },
      setW: function (t, e) {
        return (
          (this.data.array[t * this.data.stride + this.offset + 3] = e), this
        );
      },
      getX: function (t) {
        return this.data.array[t * this.data.stride + this.offset];
      },
      getY: function (t) {
        return this.data.array[t * this.data.stride + this.offset + 1];
      },
      getZ: function (t) {
        return this.data.array[t * this.data.stride + this.offset + 2];
      },
      getW: function (t) {
        return this.data.array[t * this.data.stride + this.offset + 3];
      },
      setXY: function (t, e, n) {
        return (
          (t = t * this.data.stride + this.offset),
          (this.data.array[t + 0] = e),
          (this.data.array[t + 1] = n),
          this
        );
      },
      setXYZ: function (t, e, n, i) {
        return (
          (t = t * this.data.stride + this.offset),
          (this.data.array[t + 0] = e),
          (this.data.array[t + 1] = n),
          (this.data.array[t + 2] = i),
          this
        );
      },
      setXYZW: function (t, e, n, i, r) {
        return (
          (t = t * this.data.stride + this.offset),
          (this.data.array[t + 0] = e),
          (this.data.array[t + 1] = n),
          (this.data.array[t + 2] = i),
          (this.data.array[t + 3] = r),
          this
        );
      },
      clone: function (t) {
        if (void 0 === t) {
          console.log(
            "THREE.InterleavedBufferAttribute.clone(): Cloning an interlaved buffer attribute will deinterleave buffer data."
          );
          const t = [];
          for (let e = 0; e < this.count; e++) {
            const n = e * this.data.stride + this.offset;
            for (let e = 0; e < this.itemSize; e++)
              t.push(this.data.array[n + e]);
          }
          return new fe(
            new this.array.constructor(t),
            this.itemSize,
            this.normalized
          );
        }
        return (
          void 0 === t.interleavedBuffers && (t.interleavedBuffers = {}),
          void 0 === t.interleavedBuffers[this.data.uuid] &&
            (t.interleavedBuffers[this.data.uuid] = this.data.clone(t)),
          new Ar(
            t.interleavedBuffers[this.data.uuid],
            this.itemSize,
            this.offset,
            this.normalized
          )
        );
      },
      toJSON: function (t) {
        if (void 0 === t) {
          console.log(
            "THREE.InterleavedBufferAttribute.toJSON(): Serializing an interlaved buffer attribute will deinterleave buffer data."
          );
          const t = [];
          for (let e = 0; e < this.count; e++) {
            const n = e * this.data.stride + this.offset;
            for (let e = 0; e < this.itemSize; e++)
              t.push(this.data.array[n + e]);
          }
          return {
            itemSize: this.itemSize,
            type: this.array.constructor.name,
            array: t,
            normalized: this.normalized,
          };
        }
        return (
          void 0 === t.interleavedBuffers && (t.interleavedBuffers = {}),
          void 0 === t.interleavedBuffers[this.data.uuid] &&
            (t.interleavedBuffers[this.data.uuid] = this.data.toJSON(t)),
          {
            isInterleavedBufferAttribute: !0,
            itemSize: this.itemSize,
            data: this.data.uuid,
            offset: this.offset,
            normalized: this.normalized,
          }
        );
      },
    });
  class Lr extends ie {
    constructor(t) {
      super(),
        (this.type = "SpriteMaterial"),
        (this.color = new he(16777215)),
        (this.map = null),
        (this.alphaMap = null),
        (this.rotation = 0),
        (this.sizeAttenuation = !0),
        (this.transparent = !0),
        this.setValues(t);
    }
    copy(t) {
      return (
        super.copy(t),
        this.color.copy(t.color),
        (this.map = t.map),
        (this.alphaMap = t.alphaMap),
        (this.rotation = t.rotation),
        (this.sizeAttenuation = t.sizeAttenuation),
        this
      );
    }
  }
  let Cr;
  Lr.prototype.isSpriteMaterial = !0;
  const Rr = new k(),
    Pr = new k(),
    Dr = new k(),
    Ir = new P(),
    Nr = new P(),
    Or = new mt(),
    zr = new k(),
    Br = new k(),
    Hr = new k(),
    Fr = new P(),
    Ur = new P(),
    kr = new P();
  function Gr(t, e, n, i, r, s) {
    Ir.subVectors(t, n).addScalar(0.5).multiply(i),
      void 0 !== r
        ? ((Nr.x = s * Ir.x - r * Ir.y), (Nr.y = r * Ir.x + s * Ir.y))
        : Nr.copy(Ir),
      t.copy(e),
      (t.x += Nr.x),
      (t.y += Nr.y),
      t.applyMatrix4(Or);
  }
  (class extends Ut {
    constructor(t) {
      if ((super(), (this.type = "Sprite"), void 0 === Cr)) {
        Cr = new Ie();
        const t = new Er(
          new Float32Array([
            -0.5, -0.5, 0, 0, 0, 0.5, -0.5, 0, 1, 0, 0.5, 0.5, 0, 1, 1, -0.5,
            0.5, 0, 0, 1,
          ]),
          5
        );
        Cr.setIndex([0, 1, 2, 0, 2, 3]),
          Cr.setAttribute("position", new Ar(t, 3, 0, !1)),
          Cr.setAttribute("uv", new Ar(t, 2, 3, !1));
      }
      (this.geometry = Cr),
        (this.material = void 0 !== t ? t : new Lr()),
        (this.center = new P(0.5, 0.5));
    }
    raycast(t, e) {
      null === t.camera &&
        console.error(
          'THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'
        ),
        Pr.setFromMatrixScale(this.matrixWorld),
        Or.copy(t.camera.matrixWorld),
        this.modelViewMatrix.multiplyMatrices(
          t.camera.matrixWorldInverse,
          this.matrixWorld
        ),
        Dr.setFromMatrixPosition(this.modelViewMatrix),
        t.camera.isPerspectiveCamera &&
          !1 === this.material.sizeAttenuation &&
          Pr.multiplyScalar(-Dr.z);
      const n = this.material.rotation;
      let i, r;
      0 !== n && ((r = Math.cos(n)), (i = Math.sin(n)));
      const s = this.center;
      Gr(zr.set(-0.5, -0.5, 0), Dr, s, Pr, i, r),
        Gr(Br.set(0.5, -0.5, 0), Dr, s, Pr, i, r),
        Gr(Hr.set(0.5, 0.5, 0), Dr, s, Pr, i, r),
        Fr.set(0, 0),
        Ur.set(1, 0),
        kr.set(1, 1);
      let o = t.ray.intersectTriangle(zr, Br, Hr, !1, Rr);
      if (
        null === o &&
        (Gr(Br.set(-0.5, 0.5, 0), Dr, s, Pr, i, r),
        Ur.set(0, 1),
        (o = t.ray.intersectTriangle(zr, Hr, Br, !1, Rr)),
        null === o)
      )
        return;
      const a = t.ray.origin.distanceTo(Rr);
      a < t.near ||
        a > t.far ||
        e.push({
          distance: a,
          point: Rr.clone(),
          uv: ee.getUV(Rr, zr, Br, Hr, Fr, Ur, kr, new P()),
          face: null,
          object: this,
        });
    }
    copy(t) {
      return (
        super.copy(t),
        void 0 !== t.center && this.center.copy(t.center),
        (this.material = t.material),
        this
      );
    }
  }.prototype.isSprite = !0);
  const Vr = new k(),
    Wr = new k();
  const jr = new k(),
    qr = new H(),
    Xr = new H(),
    Yr = new k(),
    Jr = new mt();
  function Zr(t, e) {
    Qe.call(this, t, e),
      (this.type = "SkinnedMesh"),
      (this.bindMode = "attached"),
      (this.bindMatrix = new mt()),
      (this.bindMatrixInverse = new mt());
  }
  function Qr() {
    Ut.call(this), (this.type = "Bone");
  }
  (Zr.prototype = Object.assign(Object.create(Qe.prototype), {
    constructor: Zr,
    isSkinnedMesh: !0,
    copy: function (t) {
      return (
        Qe.prototype.copy.call(this, t),
        (this.bindMode = t.bindMode),
        this.bindMatrix.copy(t.bindMatrix),
        this.bindMatrixInverse.copy(t.bindMatrixInverse),
        (this.skeleton = t.skeleton),
        this
      );
    },
    bind: function (t, e) {
      (this.skeleton = t),
        void 0 === e &&
          (this.updateMatrixWorld(!0),
          this.skeleton.calculateInverses(),
          (e = this.matrixWorld)),
        this.bindMatrix.copy(e),
        this.bindMatrixInverse.copy(e).invert();
    },
    pose: function () {
      this.skeleton.pose();
    },
    normalizeSkinWeights: function () {
      const t = new H(),
        e = this.geometry.attributes.skinWeight;
      for (let n = 0, i = e.count; n < i; n++) {
        (t.x = e.getX(n)),
          (t.y = e.getY(n)),
          (t.z = e.getZ(n)),
          (t.w = e.getW(n));
        const i = 1 / t.manhattanLength();
        i !== 1 / 0 ? t.multiplyScalar(i) : t.set(1, 0, 0, 0),
          e.setXYZW(n, t.x, t.y, t.z, t.w);
      }
    },
    updateMatrixWorld: function (t) {
      Qe.prototype.updateMatrixWorld.call(this, t),
        "attached" === this.bindMode
          ? this.bindMatrixInverse.copy(this.matrixWorld).invert()
          : "detached" === this.bindMode
          ? this.bindMatrixInverse.copy(this.bindMatrix).invert()
          : console.warn(
              "THREE.SkinnedMesh: Unrecognized bindMode: " + this.bindMode
            );
    },
    boneTransform: function (t, e) {
      const n = this.skeleton,
        i = this.geometry;
      qr.fromBufferAttribute(i.attributes.skinIndex, t),
        Xr.fromBufferAttribute(i.attributes.skinWeight, t),
        jr
          .fromBufferAttribute(i.attributes.position, t)
          .applyMatrix4(this.bindMatrix),
        e.set(0, 0, 0);
      for (let t = 0; t < 4; t++) {
        const i = Xr.getComponent(t);
        if (0 !== i) {
          const r = qr.getComponent(t);
          Jr.multiplyMatrices(n.bones[r].matrixWorld, n.boneInverses[r]),
            e.addScaledVector(Yr.copy(jr).applyMatrix4(Jr), i);
        }
      }
      return e.applyMatrix4(this.bindMatrixInverse);
    },
  })),
    (Qr.prototype = Object.assign(Object.create(Ut.prototype), {
      constructor: Qr,
      isBone: !0,
    }));
  const Kr = new mt(),
    $r = new mt();
  class ts {
    constructor(t = [], e = []) {
      (this.uuid = R.generateUUID()),
        (this.bones = t.slice(0)),
        (this.boneInverses = e),
        (this.boneMatrices = null),
        (this.boneTexture = null),
        (this.boneTextureSize = 0),
        (this.frame = -1),
        this.init();
    }
    init() {
      const t = this.bones,
        e = this.boneInverses;
      if (
        ((this.boneMatrices = new Float32Array(16 * t.length)), 0 === e.length)
      )
        this.calculateInverses();
      else if (t.length !== e.length) {
        console.warn(
          "THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."
        ),
          (this.boneInverses = []);
        for (let t = 0, e = this.bones.length; t < e; t++)
          this.boneInverses.push(new mt());
      }
    }
    calculateInverses() {
      this.boneInverses.length = 0;
      for (let t = 0, e = this.bones.length; t < e; t++) {
        const e = new mt();
        this.bones[t] && e.copy(this.bones[t].matrixWorld).invert(),
          this.boneInverses.push(e);
      }
    }
    pose() {
      for (let t = 0, e = this.bones.length; t < e; t++) {
        const e = this.bones[t];
        e && e.matrixWorld.copy(this.boneInverses[t]).invert();
      }
      for (let t = 0, e = this.bones.length; t < e; t++) {
        const e = this.bones[t];
        e &&
          (e.parent && e.parent.isBone
            ? (e.matrix.copy(e.parent.matrixWorld).invert(),
              e.matrix.multiply(e.matrixWorld))
            : e.matrix.copy(e.matrixWorld),
          e.matrix.decompose(e.position, e.quaternion, e.scale));
      }
    }
    update() {
      const t = this.bones,
        e = this.boneInverses,
        n = this.boneMatrices,
        i = this.boneTexture;
      for (let i = 0, r = t.length; i < r; i++) {
        const r = t[i] ? t[i].matrixWorld : $r;
        Kr.multiplyMatrices(r, e[i]), Kr.toArray(n, 16 * i);
      }
      null !== i && (i.needsUpdate = !0);
    }
    clone() {
      return new ts(this.bones, this.boneInverses);
    }
    getBoneByName(t) {
      for (let e = 0, n = this.bones.length; e < n; e++) {
        const n = this.bones[e];
        if (n.name === t) return n;
      }
    }
    dispose() {
      null !== this.boneTexture &&
        (this.boneTexture.dispose(), (this.boneTexture = null));
    }
    fromJSON(t, e) {
      this.uuid = t.uuid;
      for (let n = 0, i = t.bones.length; n < i; n++) {
        const i = t.bones[n];
        let r = e[i];
        void 0 === r &&
          (console.warn("THREE.Skeleton: No bone found with UUID:", i),
          (r = new Qr())),
          this.bones.push(r),
          this.boneInverses.push(new mt().fromArray(t.boneInverses[n]));
      }
      return this.init(), this;
    }
    toJSON() {
      const t = {
        metadata: {
          version: 4.5,
          type: "Skeleton",
          generator: "Skeleton.toJSON",
        },
        bones: [],
        boneInverses: [],
      };
      t.uuid = this.uuid;
      const e = this.bones,
        n = this.boneInverses;
      for (let i = 0, r = e.length; i < r; i++) {
        const r = e[i];
        t.bones.push(r.uuid);
        const s = n[i];
        t.boneInverses.push(s.toArray());
      }
      return t;
    }
  }
  const es = new mt(),
    ns = new mt(),
    is = [],
    rs = new Qe();
  function ss(t, e, n) {
    Qe.call(this, t, e),
      (this.instanceMatrix = new fe(new Float32Array(16 * n), 16)),
      (this.instanceColor = null),
      (this.count = n),
      (this.frustumCulled = !1);
  }
  ss.prototype = Object.assign(Object.create(Qe.prototype), {
    constructor: ss,
    isInstancedMesh: !0,
    copy: function (t) {
      return (
        Qe.prototype.copy.call(this, t),
        this.instanceMatrix.copy(t.instanceMatrix),
        null !== t.instanceColor &&
          (this.instanceColor = t.instanceColor.clone()),
        (this.count = t.count),
        this
      );
    },
    getColorAt: function (t, e) {
      e.fromArray(this.instanceColor.array, 3 * t);
    },
    getMatrixAt: function (t, e) {
      e.fromArray(this.instanceMatrix.array, 16 * t);
    },
    raycast: function (t, e) {
      const n = this.matrixWorld,
        i = this.count;
      if (
        ((rs.geometry = this.geometry),
        (rs.material = this.material),
        void 0 !== rs.material)
      )
        for (let r = 0; r < i; r++) {
          this.getMatrixAt(r, es),
            ns.multiplyMatrices(n, es),
            (rs.matrixWorld = ns),
            rs.raycast(t, is);
          for (let t = 0, n = is.length; t < n; t++) {
            const n = is[t];
            (n.instanceId = r), (n.object = this), e.push(n);
          }
          is.length = 0;
        }
    },
    setColorAt: function (t, e) {
      null === this.instanceColor &&
        (this.instanceColor = new fe(new Float32Array(3 * this.count), 3)),
        e.toArray(this.instanceColor.array, 3 * t);
    },
    setMatrixAt: function (t, e) {
      e.toArray(this.instanceMatrix.array, 16 * t);
    },
    updateMorphTargets: function () {},
    dispose: function () {
      this.dispatchEvent({ type: "dispose" });
    },
  });
  class os extends ie {
    constructor(t) {
      super(),
        (this.type = "LineBasicMaterial"),
        (this.color = new he(16777215)),
        (this.linewidth = 1),
        (this.linecap = "round"),
        (this.linejoin = "round"),
        (this.morphTargets = !1),
        this.setValues(t);
    }
    copy(t) {
      return (
        super.copy(t),
        this.color.copy(t.color),
        (this.linewidth = t.linewidth),
        (this.linecap = t.linecap),
        (this.linejoin = t.linejoin),
        (this.morphTargets = t.morphTargets),
        this
      );
    }
  }
  os.prototype.isLineBasicMaterial = !0;
  const as = new k(),
    ls = new k(),
    cs = new mt(),
    hs = new ft(),
    us = new ot();
  function ds(t = new Ie(), e = new os()) {
    Ut.call(this),
      (this.type = "Line"),
      (this.geometry = t),
      (this.material = e),
      this.updateMorphTargets();
  }
  ds.prototype = Object.assign(Object.create(Ut.prototype), {
    constructor: ds,
    isLine: !0,
    copy: function (t) {
      return (
        Ut.prototype.copy.call(this, t),
        (this.material = t.material),
        (this.geometry = t.geometry),
        this
      );
    },
    computeLineDistances: function () {
      const t = this.geometry;
      if (t.isBufferGeometry)
        if (null === t.index) {
          const e = t.attributes.position,
            n = [0];
          for (let t = 1, i = e.count; t < i; t++)
            as.fromBufferAttribute(e, t - 1),
              ls.fromBufferAttribute(e, t),
              (n[t] = n[t - 1]),
              (n[t] += as.distanceTo(ls));
          t.setAttribute("lineDistance", new Me(n, 1));
        } else
          console.warn(
            "THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry."
          );
      else
        t.isGeometry &&
          console.error(
            "THREE.Line.computeLineDistances() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead."
          );
      return this;
    },
    raycast: function (t, e) {
      const n = this.geometry,
        i = this.matrixWorld,
        r = t.params.Line.threshold;
      if (
        (null === n.boundingSphere && n.computeBoundingSphere(),
        us.copy(n.boundingSphere),
        us.applyMatrix4(i),
        (us.radius += r),
        !1 === t.ray.intersectsSphere(us))
      )
        return;
      cs.copy(i).invert(), hs.copy(t.ray).applyMatrix4(cs);
      const s = r / ((this.scale.x + this.scale.y + this.scale.z) / 3),
        o = s * s,
        a = new k(),
        l = new k(),
        c = new k(),
        h = new k(),
        u = this.isLineSegments ? 2 : 1;
      if (n.isBufferGeometry) {
        const i = n.index,
          r = n.attributes.position;
        if (null !== i) {
          const n = i.array;
          for (let i = 0, s = n.length - 1; i < s; i += u) {
            const s = n[i],
              u = n[i + 1];
            if (
              (a.fromBufferAttribute(r, s),
              l.fromBufferAttribute(r, u),
              hs.distanceSqToSegment(a, l, h, c) > o)
            )
              continue;
            h.applyMatrix4(this.matrixWorld);
            const d = t.ray.origin.distanceTo(h);
            d < t.near ||
              d > t.far ||
              e.push({
                distance: d,
                point: c.clone().applyMatrix4(this.matrixWorld),
                index: i,
                face: null,
                faceIndex: null,
                object: this,
              });
          }
        } else
          for (let n = 0, i = r.count - 1; n < i; n += u) {
            if (
              (a.fromBufferAttribute(r, n),
              l.fromBufferAttribute(r, n + 1),
              hs.distanceSqToSegment(a, l, h, c) > o)
            )
              continue;
            h.applyMatrix4(this.matrixWorld);
            const i = t.ray.origin.distanceTo(h);
            i < t.near ||
              i > t.far ||
              e.push({
                distance: i,
                point: c.clone().applyMatrix4(this.matrixWorld),
                index: n,
                face: null,
                faceIndex: null,
                object: this,
              });
          }
      } else
        n.isGeometry &&
          console.error(
            "THREE.Line.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead."
          );
    },
    updateMorphTargets: function () {
      const t = this.geometry;
      if (t.isBufferGeometry) {
        const e = t.morphAttributes,
          n = Object.keys(e);
        if (n.length > 0) {
          const t = e[n[0]];
          if (void 0 !== t) {
            (this.morphTargetInfluences = []),
              (this.morphTargetDictionary = {});
            for (let e = 0, n = t.length; e < n; e++) {
              const n = t[e].name || String(e);
              this.morphTargetInfluences.push(0),
                (this.morphTargetDictionary[n] = e);
            }
          }
        }
      } else {
        const e = t.morphTargets;
        void 0 !== e &&
          e.length > 0 &&
          console.error(
            "THREE.Line.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead."
          );
      }
    },
  });
  const ps = new k(),
    fs = new k();
  function ms(t, e) {
    ds.call(this, t, e), (this.type = "LineSegments");
  }
  ms.prototype = Object.assign(Object.create(ds.prototype), {
    constructor: ms,
    isLineSegments: !0,
    computeLineDistances: function () {
      const t = this.geometry;
      if (t.isBufferGeometry)
        if (null === t.index) {
          const e = t.attributes.position,
            n = [];
          for (let t = 0, i = e.count; t < i; t += 2)
            ps.fromBufferAttribute(e, t),
              fs.fromBufferAttribute(e, t + 1),
              (n[t] = 0 === t ? 0 : n[t - 1]),
              (n[t + 1] = n[t] + ps.distanceTo(fs));
          t.setAttribute("lineDistance", new Me(n, 1));
        } else
          console.warn(
            "THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry."
          );
      else
        t.isGeometry &&
          console.error(
            "THREE.LineSegments.computeLineDistances() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead."
          );
      return this;
    },
  });
  (class extends ds {
    constructor(t, e) {
      super(t, e), (this.type = "LineLoop");
    }
  }.prototype.isLineLoop = !0);
  class gs extends ie {
    constructor(t) {
      super(),
        (this.type = "PointsMaterial"),
        (this.color = new he(16777215)),
        (this.map = null),
        (this.alphaMap = null),
        (this.size = 1),
        (this.sizeAttenuation = !0),
        (this.morphTargets = !1),
        this.setValues(t);
    }
    copy(t) {
      return (
        super.copy(t),
        this.color.copy(t.color),
        (this.map = t.map),
        (this.alphaMap = t.alphaMap),
        (this.size = t.size),
        (this.sizeAttenuation = t.sizeAttenuation),
        (this.morphTargets = t.morphTargets),
        this
      );
    }
  }
  gs.prototype.isPointsMaterial = !0;
  const vs = new mt(),
    _s = new ft(),
    ys = new ot(),
    xs = new k();
  function bs(t = new Ie(), e = new gs()) {
    Ut.call(this),
      (this.type = "Points"),
      (this.geometry = t),
      (this.material = e),
      this.updateMorphTargets();
  }
  function ws(t, e, n, i, r, s, o) {
    const a = _s.distanceSqToPoint(t);
    if (a < n) {
      const n = new k();
      _s.closestPointToPoint(t, n), n.applyMatrix4(i);
      const l = r.ray.origin.distanceTo(n);
      if (l < r.near || l > r.far) return;
      s.push({
        distance: l,
        distanceToRay: Math.sqrt(a),
        point: n,
        index: e,
        face: null,
        object: o,
      });
    }
  }
  (bs.prototype = Object.assign(Object.create(Ut.prototype), {
    constructor: bs,
    isPoints: !0,
    copy: function (t) {
      return (
        Ut.prototype.copy.call(this, t),
        (this.material = t.material),
        (this.geometry = t.geometry),
        this
      );
    },
    raycast: function (t, e) {
      const n = this.geometry,
        i = this.matrixWorld,
        r = t.params.Points.threshold;
      if (
        (null === n.boundingSphere && n.computeBoundingSphere(),
        ys.copy(n.boundingSphere),
        ys.applyMatrix4(i),
        (ys.radius += r),
        !1 === t.ray.intersectsSphere(ys))
      )
        return;
      vs.copy(i).invert(), _s.copy(t.ray).applyMatrix4(vs);
      const s = r / ((this.scale.x + this.scale.y + this.scale.z) / 3),
        o = s * s;
      if (n.isBufferGeometry) {
        const r = n.index,
          s = n.attributes.position;
        if (null !== r) {
          const n = r.array;
          for (let r = 0, a = n.length; r < a; r++) {
            const a = n[r];
            xs.fromBufferAttribute(s, a), ws(xs, a, o, i, t, e, this);
          }
        } else
          for (let n = 0, r = s.count; n < r; n++)
            xs.fromBufferAttribute(s, n), ws(xs, n, o, i, t, e, this);
      } else
        console.error(
          "THREE.Points.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead."
        );
    },
    updateMorphTargets: function () {
      const t = this.geometry;
      if (t.isBufferGeometry) {
        const e = t.morphAttributes,
          n = Object.keys(e);
        if (n.length > 0) {
          const t = e[n[0]];
          if (void 0 !== t) {
            (this.morphTargetInfluences = []),
              (this.morphTargetDictionary = {});
            for (let e = 0, n = t.length; e < n; e++) {
              const n = t[e].name || String(e);
              this.morphTargetInfluences.push(0),
                (this.morphTargetDictionary[n] = e);
            }
          }
        }
      } else {
        const e = t.morphTargets;
        void 0 !== e &&
          e.length > 0 &&
          console.error(
            "THREE.Points.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead."
          );
      }
    },
  })),
    (class extends z {
      constructor(t, e, n, i, r, o, a, l, c) {
        super(t, e, n, i, r, o, a, l, c),
          (this.format = void 0 !== a ? a : d),
          (this.minFilter = void 0 !== o ? o : s),
          (this.magFilter = void 0 !== r ? r : s),
          (this.generateMipmaps = !1);
        const h = this;
        "requestVideoFrameCallback" in t &&
          t.requestVideoFrameCallback(function e() {
            (h.needsUpdate = !0), t.requestVideoFrameCallback(e);
          });
      }
      clone() {
        return new this.constructor(this.image).copy(this);
      }
      update() {
        const t = this.image;
        !1 == "requestVideoFrameCallback" in t &&
          t.readyState >= t.HAVE_CURRENT_DATA &&
          (this.needsUpdate = !0);
      }
    }.prototype.isVideoTexture = !0);
  class Ms extends z {
    constructor(t, e, n, i, r, s, o, a, l, c, h, u) {
      super(null, s, o, a, l, c, i, r, h, u),
        (this.image = { width: e, height: n }),
        (this.mipmaps = t),
        (this.flipY = !1),
        (this.generateMipmaps = !1);
    }
  }
  (Ms.prototype.isCompressedTexture = !0),
    (class extends z {
      constructor(t, e, n, i, r, s, o, a, l) {
        super(t, e, n, i, r, s, o, a, l), (this.needsUpdate = !0);
      }
    }.prototype.isCanvasTexture = !0),
    (class extends z {
      constructor(t, e, n, i, s, o, l, c, h, d) {
        if ((d = void 0 !== d ? d : f) !== f && d !== m)
          throw new Error(
            "DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat"
          );
        void 0 === n && d === f && (n = a),
          void 0 === n && d === m && (n = u),
          super(null, i, s, o, l, c, d, n, h),
          (this.image = { width: t, height: e }),
          (this.magFilter = void 0 !== l ? l : r),
          (this.minFilter = void 0 !== c ? c : r),
          (this.flipY = !1),
          (this.generateMipmaps = !1);
      }
    }.prototype.isDepthTexture = !0),
    new k(),
    new k(),
    new k(),
    new ee();
  function Ss(t, e, n, i, r) {
    let s, o;
    if (
      r ===
      (function (t, e, n, i) {
        let r = 0;
        for (let s = e, o = n - i; s < n; s += i)
          (r += (t[o] - t[s]) * (t[s + 1] + t[o + 1])), (o = s);
        return r;
      })(t, e, n, i) >
        0
    )
      for (s = e; s < n; s += i) o = js(s, t[s], t[s + 1], o);
    else for (s = n - i; s >= e; s -= i) o = js(s, t[s], t[s + 1], o);
    return o && Fs(o, o.next) && (qs(o), (o = o.next)), o;
  }
  function Es(t, e) {
    if (!t) return t;
    e || (e = t);
    let n,
      i = t;
    do {
      if (
        ((n = !1), i.steiner || (!Fs(i, i.next) && 0 !== Hs(i.prev, i, i.next)))
      )
        i = i.next;
      else {
        if ((qs(i), (i = e = i.prev), i === i.next)) break;
        n = !0;
      }
    } while (n || i !== e);
    return e;
  }
  function Ts(t, e, n, i, r, s, o) {
    if (!t) return;
    !o &&
      s &&
      (function (t, e, n, i) {
        let r = t;
        do {
          null === r.z && (r.z = Ns(r.x, r.y, e, n, i)),
            (r.prevZ = r.prev),
            (r.nextZ = r.next),
            (r = r.next);
        } while (r !== t);
        (r.prevZ.nextZ = null),
          (r.prevZ = null),
          (function (t) {
            let e,
              n,
              i,
              r,
              s,
              o,
              a,
              l,
              c = 1;
            do {
              for (n = t, t = null, s = null, o = 0; n; ) {
                for (
                  o++, i = n, a = 0, e = 0;
                  e < c && (a++, (i = i.nextZ), i);
                  e++
                );
                for (l = c; a > 0 || (l > 0 && i); )
                  0 !== a && (0 === l || !i || n.z <= i.z)
                    ? ((r = n), (n = n.nextZ), a--)
                    : ((r = i), (i = i.nextZ), l--),
                    s ? (s.nextZ = r) : (t = r),
                    (r.prevZ = s),
                    (s = r);
                n = i;
              }
              (s.nextZ = null), (c *= 2);
            } while (o > 1);
          })(r);
      })(t, i, r, s);
    let a,
      l,
      c = t;
    for (; t.prev !== t.next; )
      if (((a = t.prev), (l = t.next), s ? Ls(t, i, r, s) : As(t)))
        e.push(a.i / n),
          e.push(t.i / n),
          e.push(l.i / n),
          qs(t),
          (t = l.next),
          (c = l.next);
      else if ((t = l) === c) {
        o
          ? 1 === o
            ? Ts((t = Cs(Es(t), e, n)), e, n, i, r, s, 2)
            : 2 === o && Rs(t, e, n, i, r, s)
          : Ts(Es(t), e, n, i, r, s, 1);
        break;
      }
  }
  function As(t) {
    const e = t.prev,
      n = t,
      i = t.next;
    if (Hs(e, n, i) >= 0) return !1;
    let r = t.next.next;
    for (; r !== t.prev; ) {
      if (
        zs(e.x, e.y, n.x, n.y, i.x, i.y, r.x, r.y) &&
        Hs(r.prev, r, r.next) >= 0
      )
        return !1;
      r = r.next;
    }
    return !0;
  }
  function Ls(t, e, n, i) {
    const r = t.prev,
      s = t,
      o = t.next;
    if (Hs(r, s, o) >= 0) return !1;
    const a = r.x < s.x ? (r.x < o.x ? r.x : o.x) : s.x < o.x ? s.x : o.x,
      l = r.y < s.y ? (r.y < o.y ? r.y : o.y) : s.y < o.y ? s.y : o.y,
      c = r.x > s.x ? (r.x > o.x ? r.x : o.x) : s.x > o.x ? s.x : o.x,
      h = r.y > s.y ? (r.y > o.y ? r.y : o.y) : s.y > o.y ? s.y : o.y,
      u = Ns(a, l, e, n, i),
      d = Ns(c, h, e, n, i);
    let p = t.prevZ,
      f = t.nextZ;
    for (; p && p.z >= u && f && f.z <= d; ) {
      if (
        p !== t.prev &&
        p !== t.next &&
        zs(r.x, r.y, s.x, s.y, o.x, o.y, p.x, p.y) &&
        Hs(p.prev, p, p.next) >= 0
      )
        return !1;
      if (
        ((p = p.prevZ),
        f !== t.prev &&
          f !== t.next &&
          zs(r.x, r.y, s.x, s.y, o.x, o.y, f.x, f.y) &&
          Hs(f.prev, f, f.next) >= 0)
      )
        return !1;
      f = f.nextZ;
    }
    for (; p && p.z >= u; ) {
      if (
        p !== t.prev &&
        p !== t.next &&
        zs(r.x, r.y, s.x, s.y, o.x, o.y, p.x, p.y) &&
        Hs(p.prev, p, p.next) >= 0
      )
        return !1;
      p = p.prevZ;
    }
    for (; f && f.z <= d; ) {
      if (
        f !== t.prev &&
        f !== t.next &&
        zs(r.x, r.y, s.x, s.y, o.x, o.y, f.x, f.y) &&
        Hs(f.prev, f, f.next) >= 0
      )
        return !1;
      f = f.nextZ;
    }
    return !0;
  }
  function Cs(t, e, n) {
    let i = t;
    do {
      const r = i.prev,
        s = i.next.next;
      !Fs(r, s) &&
        Us(r, i, i.next, s) &&
        Vs(r, s) &&
        Vs(s, r) &&
        (e.push(r.i / n),
        e.push(i.i / n),
        e.push(s.i / n),
        qs(i),
        qs(i.next),
        (i = t = s)),
        (i = i.next);
    } while (i !== t);
    return Es(i);
  }
  function Rs(t, e, n, i, r, s) {
    let o = t;
    do {
      let t = o.next.next;
      for (; t !== o.prev; ) {
        if (o.i !== t.i && Bs(o, t)) {
          let a = Ws(o, t);
          return (
            (o = Es(o, o.next)),
            (a = Es(a, a.next)),
            Ts(o, e, n, i, r, s),
            void Ts(a, e, n, i, r, s)
          );
        }
        t = t.next;
      }
      o = o.next;
    } while (o !== t);
  }
  function Ps(t, e) {
    return t.x - e.x;
  }
  function Ds(t, e) {
    if (
      (e = (function (t, e) {
        let n = e;
        const i = t.x,
          r = t.y;
        let s,
          o = -1 / 0;
        do {
          if (r <= n.y && r >= n.next.y && n.next.y !== n.y) {
            const t = n.x + ((r - n.y) * (n.next.x - n.x)) / (n.next.y - n.y);
            if (t <= i && t > o) {
              if (((o = t), t === i)) {
                if (r === n.y) return n;
                if (r === n.next.y) return n.next;
              }
              s = n.x < n.next.x ? n : n.next;
            }
          }
          n = n.next;
        } while (n !== e);
        if (!s) return null;
        if (i === o) return s;
        const a = s,
          l = s.x,
          c = s.y;
        let h,
          u = 1 / 0;
        n = s;
        do {
          i >= n.x &&
            n.x >= l &&
            i !== n.x &&
            zs(r < c ? i : o, r, l, c, r < c ? o : i, r, n.x, n.y) &&
            ((h = Math.abs(r - n.y) / (i - n.x)),
            Vs(n, t) &&
              (h < u ||
                (h === u && (n.x > s.x || (n.x === s.x && Is(s, n))))) &&
              ((s = n), (u = h))),
            (n = n.next);
        } while (n !== a);
        return s;
      })(t, e))
    ) {
      const n = Ws(e, t);
      Es(e, e.next), Es(n, n.next);
    }
  }
  function Is(t, e) {
    return Hs(t.prev, t, e.prev) < 0 && Hs(e.next, t, t.next) < 0;
  }
  function Ns(t, e, n, i, r) {
    return (
      (t =
        1431655765 &
        ((t =
          858993459 &
          ((t =
            252645135 &
            ((t = 16711935 & ((t = 32767 * (t - n) * r) | (t << 8))) |
              (t << 4))) |
            (t << 2))) |
          (t << 1))) |
      ((e =
        1431655765 &
        ((e =
          858993459 &
          ((e =
            252645135 &
            ((e = 16711935 & ((e = 32767 * (e - i) * r) | (e << 8))) |
              (e << 4))) |
            (e << 2))) |
          (e << 1))) <<
        1)
    );
  }
  function Os(t) {
    let e = t,
      n = t;
    do {
      (e.x < n.x || (e.x === n.x && e.y < n.y)) && (n = e), (e = e.next);
    } while (e !== t);
    return n;
  }
  function zs(t, e, n, i, r, s, o, a) {
    return (
      (r - o) * (e - a) - (t - o) * (s - a) >= 0 &&
      (t - o) * (i - a) - (n - o) * (e - a) >= 0 &&
      (n - o) * (s - a) - (r - o) * (i - a) >= 0
    );
  }
  function Bs(t, e) {
    return (
      t.next.i !== e.i &&
      t.prev.i !== e.i &&
      !(function (t, e) {
        let n = t;
        do {
          if (
            n.i !== t.i &&
            n.next.i !== t.i &&
            n.i !== e.i &&
            n.next.i !== e.i &&
            Us(n, n.next, t, e)
          )
            return !0;
          n = n.next;
        } while (n !== t);
        return !1;
      })(t, e) &&
      ((Vs(t, e) &&
        Vs(e, t) &&
        (function (t, e) {
          let n = t,
            i = !1;
          const r = (t.x + e.x) / 2,
            s = (t.y + e.y) / 2;
          do {
            n.y > s != n.next.y > s &&
              n.next.y !== n.y &&
              r < ((n.next.x - n.x) * (s - n.y)) / (n.next.y - n.y) + n.x &&
              (i = !i),
              (n = n.next);
          } while (n !== t);
          return i;
        })(t, e) &&
        (Hs(t.prev, t, e.prev) || Hs(t, e.prev, e))) ||
        (Fs(t, e) && Hs(t.prev, t, t.next) > 0 && Hs(e.prev, e, e.next) > 0))
    );
  }
  function Hs(t, e, n) {
    return (e.y - t.y) * (n.x - e.x) - (e.x - t.x) * (n.y - e.y);
  }
  function Fs(t, e) {
    return t.x === e.x && t.y === e.y;
  }
  function Us(t, e, n, i) {
    const r = Gs(Hs(t, e, n)),
      s = Gs(Hs(t, e, i)),
      o = Gs(Hs(n, i, t)),
      a = Gs(Hs(n, i, e));
    return (
      (r !== s && o !== a) ||
      !(0 !== r || !ks(t, n, e)) ||
      !(0 !== s || !ks(t, i, e)) ||
      !(0 !== o || !ks(n, t, i)) ||
      !(0 !== a || !ks(n, e, i))
    );
  }
  function ks(t, e, n) {
    return (
      e.x <= Math.max(t.x, n.x) &&
      e.x >= Math.min(t.x, n.x) &&
      e.y <= Math.max(t.y, n.y) &&
      e.y >= Math.min(t.y, n.y)
    );
  }
  function Gs(t) {
    return t > 0 ? 1 : t < 0 ? -1 : 0;
  }
  function Vs(t, e) {
    return Hs(t.prev, t, t.next) < 0
      ? Hs(t, e, t.next) >= 0 && Hs(t, t.prev, e) >= 0
      : Hs(t, e, t.prev) < 0 || Hs(t, t.next, e) < 0;
  }
  function Ws(t, e) {
    const n = new Xs(t.i, t.x, t.y),
      i = new Xs(e.i, e.x, e.y),
      r = t.next,
      s = e.prev;
    return (
      (t.next = e),
      (e.prev = t),
      (n.next = r),
      (r.prev = n),
      (i.next = n),
      (n.prev = i),
      (s.next = i),
      (i.prev = s),
      i
    );
  }
  function js(t, e, n, i) {
    const r = new Xs(t, e, n);
    return (
      i
        ? ((r.next = i.next), (r.prev = i), (i.next.prev = r), (i.next = r))
        : ((r.prev = r), (r.next = r)),
      r
    );
  }
  function qs(t) {
    (t.next.prev = t.prev),
      (t.prev.next = t.next),
      t.prevZ && (t.prevZ.nextZ = t.nextZ),
      t.nextZ && (t.nextZ.prevZ = t.prevZ);
  }
  function Xs(t, e, n) {
    (this.i = t),
      (this.x = e),
      (this.y = n),
      (this.prev = null),
      (this.next = null),
      (this.z = null),
      (this.prevZ = null),
      (this.nextZ = null),
      (this.steiner = !1);
  }
  const Ys = {
    area: function (t) {
      const e = t.length;
      let n = 0;
      for (let i = e - 1, r = 0; r < e; i = r++)
        n += t[i].x * t[r].y - t[r].x * t[i].y;
      return 0.5 * n;
    },
    isClockWise: function (t) {
      return Ys.area(t) < 0;
    },
    triangulateShape: function (t, e) {
      const n = [],
        i = [],
        r = [];
      Js(t), Zs(n, t);
      let s = t.length;
      e.forEach(Js);
      for (let t = 0; t < e.length; t++)
        i.push(s), (s += e[t].length), Zs(n, e[t]);
      const o = (function (t, e, n) {
        n = n || 2;
        const i = e && e.length,
          r = i ? e[0] * n : t.length;
        let s = Ss(t, 0, r, n, !0);
        const o = [];
        if (!s || s.next === s.prev) return o;
        let a, l, c, h, u, d, p;
        if (
          (i &&
            (s = (function (t, e, n, i) {
              const r = [];
              let s, o, a, l, c;
              for (s = 0, o = e.length; s < o; s++)
                (a = e[s] * i),
                  (l = s < o - 1 ? e[s + 1] * i : t.length),
                  (c = Ss(t, a, l, i, !1)),
                  c === c.next && (c.steiner = !0),
                  r.push(Os(c));
              for (r.sort(Ps), s = 0; s < r.length; s++)
                Ds(r[s], n), (n = Es(n, n.next));
              return n;
            })(t, e, s, n)),
          t.length > 80 * n)
        ) {
          (a = c = t[0]), (l = h = t[1]);
          for (let e = n; e < r; e += n)
            (u = t[e]),
              (d = t[e + 1]),
              u < a && (a = u),
              d < l && (l = d),
              u > c && (c = u),
              d > h && (h = d);
          (p = Math.max(c - a, h - l)), (p = 0 !== p ? 1 / p : 0);
        }
        return Ts(s, o, n, a, l, p), o;
      })(n, i);
      for (let t = 0; t < o.length; t += 3) r.push(o.slice(t, t + 3));
      return r;
    },
  };
  function Js(t) {
    const e = t.length;
    e > 2 && t[e - 1].equals(t[0]) && t.pop();
  }
  function Zs(t, e) {
    for (let n = 0; n < e.length; n++) t.push(e[n].x), t.push(e[n].y);
  }
  class Qs extends Ie {
    constructor(t, e) {
      super(),
        (this.type = "ExtrudeGeometry"),
        (this.parameters = { shapes: t, options: e }),
        (t = Array.isArray(t) ? t : [t]);
      const n = this,
        i = [],
        r = [];
      for (let e = 0, n = t.length; e < n; e++) s(t[e]);
      function s(t) {
        const s = [],
          o = void 0 !== e.curveSegments ? e.curveSegments : 12,
          a = void 0 !== e.steps ? e.steps : 1;
        let l = void 0 !== e.depth ? e.depth : 100,
          c = void 0 === e.bevelEnabled || e.bevelEnabled,
          h = void 0 !== e.bevelThickness ? e.bevelThickness : 6,
          u = void 0 !== e.bevelSize ? e.bevelSize : h - 2,
          d = void 0 !== e.bevelOffset ? e.bevelOffset : 0,
          p = void 0 !== e.bevelSegments ? e.bevelSegments : 3;
        const f = e.extrudePath,
          m = void 0 !== e.UVGenerator ? e.UVGenerator : Ks;
        void 0 !== e.amount &&
          (console.warn(
            "THREE.ExtrudeBufferGeometry: amount has been renamed to depth."
          ),
          (l = e.amount));
        let g,
          v,
          _,
          y,
          x,
          b = !1;
        f &&
          ((g = f.getSpacedPoints(a)),
          (b = !0),
          (c = !1),
          (v = f.computeFrenetFrames(a, !1)),
          (_ = new k()),
          (y = new k()),
          (x = new k())),
          c || ((p = 0), (h = 0), (u = 0), (d = 0));
        const w = t.extractPoints(o);
        let M = w.shape;
        const S = w.holes;
        if (!Ys.isClockWise(M)) {
          M = M.reverse();
          for (let t = 0, e = S.length; t < e; t++) {
            const e = S[t];
            Ys.isClockWise(e) && (S[t] = e.reverse());
          }
        }
        const E = Ys.triangulateShape(M, S),
          T = M;
        for (let t = 0, e = S.length; t < e; t++) {
          const e = S[t];
          M = M.concat(e);
        }
        function A(t, e, n) {
          return (
            e || console.error("THREE.ExtrudeGeometry: vec does not exist"),
            e.clone().multiplyScalar(n).add(t)
          );
        }
        const L = M.length,
          C = E.length;
        function R(t, e, n) {
          let i, r, s;
          const o = t.x - e.x,
            a = t.y - e.y,
            l = n.x - t.x,
            c = n.y - t.y,
            h = o * o + a * a,
            u = o * c - a * l;
          if (Math.abs(u) > Number.EPSILON) {
            const u = Math.sqrt(h),
              d = Math.sqrt(l * l + c * c),
              p = e.x - a / u,
              f = e.y + o / u,
              m =
                ((n.x - c / d - p) * c - (n.y + l / d - f) * l) /
                (o * c - a * l);
            (i = p + o * m - t.x), (r = f + a * m - t.y);
            const g = i * i + r * r;
            if (g <= 2) return new P(i, r);
            s = Math.sqrt(g / 2);
          } else {
            let t = !1;
            o > Number.EPSILON
              ? l > Number.EPSILON && (t = !0)
              : o < -Number.EPSILON
              ? l < -Number.EPSILON && (t = !0)
              : Math.sign(a) === Math.sign(c) && (t = !0),
              t
                ? ((i = -a), (r = o), (s = Math.sqrt(h)))
                : ((i = o), (r = a), (s = Math.sqrt(h / 2)));
          }
          return new P(i / s, r / s);
        }
        const D = [];
        for (
          let t = 0, e = T.length, n = e - 1, i = t + 1;
          t < e;
          t++, n++, i++
        )
          n === e && (n = 0), i === e && (i = 0), (D[t] = R(T[t], T[n], T[i]));
        const I = [];
        let N,
          O = D.concat();
        for (let t = 0, e = S.length; t < e; t++) {
          const e = S[t];
          N = [];
          for (
            let t = 0, n = e.length, i = n - 1, r = t + 1;
            t < n;
            t++, i++, r++
          )
            i === n && (i = 0),
              r === n && (r = 0),
              (N[t] = R(e[t], e[i], e[r]));
          I.push(N), (O = O.concat(N));
        }
        for (let t = 0; t < p; t++) {
          const e = t / p,
            n = h * Math.cos((e * Math.PI) / 2),
            i = u * Math.sin((e * Math.PI) / 2) + d;
          for (let t = 0, e = T.length; t < e; t++) {
            const e = A(T[t], D[t], i);
            H(e.x, e.y, -n);
          }
          for (let t = 0, e = S.length; t < e; t++) {
            const e = S[t];
            N = I[t];
            for (let t = 0, r = e.length; t < r; t++) {
              const r = A(e[t], N[t], i);
              H(r.x, r.y, -n);
            }
          }
        }
        const z = u + d;
        for (let t = 0; t < L; t++) {
          const e = c ? A(M[t], O[t], z) : M[t];
          b
            ? (y.copy(v.normals[0]).multiplyScalar(e.x),
              _.copy(v.binormals[0]).multiplyScalar(e.y),
              x.copy(g[0]).add(y).add(_),
              H(x.x, x.y, x.z))
            : H(e.x, e.y, 0);
        }
        for (let t = 1; t <= a; t++)
          for (let e = 0; e < L; e++) {
            const n = c ? A(M[e], O[e], z) : M[e];
            b
              ? (y.copy(v.normals[t]).multiplyScalar(n.x),
                _.copy(v.binormals[t]).multiplyScalar(n.y),
                x.copy(g[t]).add(y).add(_),
                H(x.x, x.y, x.z))
              : H(n.x, n.y, (l / a) * t);
          }
        for (let t = p - 1; t >= 0; t--) {
          const e = t / p,
            n = h * Math.cos((e * Math.PI) / 2),
            i = u * Math.sin((e * Math.PI) / 2) + d;
          for (let t = 0, e = T.length; t < e; t++) {
            const e = A(T[t], D[t], i);
            H(e.x, e.y, l + n);
          }
          for (let t = 0, e = S.length; t < e; t++) {
            const e = S[t];
            N = I[t];
            for (let t = 0, r = e.length; t < r; t++) {
              const r = A(e[t], N[t], i);
              b ? H(r.x, r.y + g[a - 1].y, g[a - 1].x + n) : H(r.x, r.y, l + n);
            }
          }
        }
        function B(t, e) {
          let n = t.length;
          for (; --n >= 0; ) {
            const i = n;
            let r = n - 1;
            r < 0 && (r = t.length - 1);
            for (let t = 0, n = a + 2 * p; t < n; t++) {
              const n = L * t,
                s = L * (t + 1);
              U(e + i + n, e + r + n, e + r + s, e + i + s);
            }
          }
        }
        function H(t, e, n) {
          s.push(t), s.push(e), s.push(n);
        }
        function F(t, e, r) {
          G(t), G(e), G(r);
          const s = i.length / 3,
            o = m.generateTopUV(n, i, s - 3, s - 2, s - 1);
          V(o[0]), V(o[1]), V(o[2]);
        }
        function U(t, e, r, s) {
          G(t), G(e), G(s), G(e), G(r), G(s);
          const o = i.length / 3,
            a = m.generateSideWallUV(n, i, o - 6, o - 3, o - 2, o - 1);
          V(a[0]), V(a[1]), V(a[3]), V(a[1]), V(a[2]), V(a[3]);
        }
        function G(t) {
          i.push(s[3 * t + 0]), i.push(s[3 * t + 1]), i.push(s[3 * t + 2]);
        }
        function V(t) {
          r.push(t.x), r.push(t.y);
        }
        !(function () {
          const t = i.length / 3;
          if (c) {
            let t = 0,
              e = L * t;
            for (let t = 0; t < C; t++) {
              const n = E[t];
              F(n[2] + e, n[1] + e, n[0] + e);
            }
            (t = a + 2 * p), (e = L * t);
            for (let t = 0; t < C; t++) {
              const n = E[t];
              F(n[0] + e, n[1] + e, n[2] + e);
            }
          } else {
            for (let t = 0; t < C; t++) {
              const e = E[t];
              F(e[2], e[1], e[0]);
            }
            for (let t = 0; t < C; t++) {
              const e = E[t];
              F(e[0] + L * a, e[1] + L * a, e[2] + L * a);
            }
          }
          n.addGroup(t, i.length / 3 - t, 0);
        })(),
          (function () {
            const t = i.length / 3;
            let e = 0;
            B(T, e), (e += T.length);
            for (let t = 0, n = S.length; t < n; t++) {
              const n = S[t];
              B(n, e), (e += n.length);
            }
            n.addGroup(t, i.length / 3 - t, 1);
          })();
      }
      this.setAttribute("position", new Me(i, 3)),
        this.setAttribute("uv", new Me(r, 2)),
        this.computeVertexNormals();
    }
    toJSON() {
      const t = Ie.prototype.toJSON.call(this);
      return (function (t, e, n) {
        if (((n.shapes = []), Array.isArray(t)))
          for (let e = 0, i = t.length; e < i; e++) {
            const i = t[e];
            n.shapes.push(i.uuid);
          }
        else n.shapes.push(t.uuid);
        return (
          void 0 !== e.extrudePath &&
            (n.options.extrudePath = e.extrudePath.toJSON()),
          n
        );
      })(this.parameters.shapes, this.parameters.options, t);
    }
  }
  const Ks = {
    generateTopUV: function (t, e, n, i, r) {
      const s = e[3 * n],
        o = e[3 * n + 1],
        a = e[3 * i],
        l = e[3 * i + 1],
        c = e[3 * r],
        h = e[3 * r + 1];
      return [new P(s, o), new P(a, l), new P(c, h)];
    },
    generateSideWallUV: function (t, e, n, i, r, s) {
      const o = e[3 * n],
        a = e[3 * n + 1],
        l = e[3 * n + 2],
        c = e[3 * i],
        h = e[3 * i + 1],
        u = e[3 * i + 2],
        d = e[3 * r],
        p = e[3 * r + 1],
        f = e[3 * r + 2],
        m = e[3 * s],
        g = e[3 * s + 1],
        v = e[3 * s + 2];
      return Math.abs(a - h) < 0.01
        ? [new P(o, 1 - l), new P(c, 1 - u), new P(d, 1 - f), new P(m, 1 - v)]
        : [new P(a, 1 - l), new P(h, 1 - u), new P(p, 1 - f), new P(g, 1 - v)];
    },
  };
  function $s(t, e, n) {
    Ie.call(this),
      (this.type = "ParametricGeometry"),
      (this.parameters = { func: t, slices: e, stacks: n });
    const i = [],
      r = [],
      s = [],
      o = [],
      a = 1e-5,
      l = new k(),
      c = new k(),
      h = new k(),
      u = new k(),
      d = new k();
    t.length < 3 &&
      console.error(
        "THREE.ParametricGeometry: Function must now modify a Vector3 as third parameter."
      );
    const p = e + 1;
    for (let i = 0; i <= n; i++) {
      const p = i / n;
      for (let n = 0; n <= e; n++) {
        const i = n / e;
        t(i, p, c),
          r.push(c.x, c.y, c.z),
          i - a >= 0
            ? (t(i - a, p, h), u.subVectors(c, h))
            : (t(i + a, p, h), u.subVectors(h, c)),
          p - a >= 0
            ? (t(i, p - a, h), d.subVectors(c, h))
            : (t(i, p + a, h), d.subVectors(h, c)),
          l.crossVectors(u, d).normalize(),
          s.push(l.x, l.y, l.z),
          o.push(i, p);
      }
    }
    for (let t = 0; t < n; t++)
      for (let n = 0; n < e; n++) {
        const e = t * p + n,
          r = t * p + n + 1,
          s = (t + 1) * p + n + 1,
          o = (t + 1) * p + n;
        i.push(e, r, o), i.push(r, s, o);
      }
    this.setIndex(i),
      this.setAttribute("position", new Me(r, 3)),
      this.setAttribute("normal", new Me(s, 3)),
      this.setAttribute("uv", new Me(o, 2));
  }
  ($s.prototype = Object.create(Ie.prototype)), ($s.prototype.constructor = $s);
  class to extends Ie {
    constructor(t, e = 12) {
      super(),
        (this.type = "ShapeGeometry"),
        (this.parameters = { shapes: t, curveSegments: e });
      const n = [],
        i = [],
        r = [],
        s = [];
      let o = 0,
        a = 0;
      if (!1 === Array.isArray(t)) l(t);
      else
        for (let e = 0; e < t.length; e++)
          l(t[e]), this.addGroup(o, a, e), (o += a), (a = 0);
      function l(t) {
        const o = i.length / 3,
          l = t.extractPoints(e);
        let c = l.shape;
        const h = l.holes;
        !1 === Ys.isClockWise(c) && (c = c.reverse());
        for (let t = 0, e = h.length; t < e; t++) {
          const e = h[t];
          !0 === Ys.isClockWise(e) && (h[t] = e.reverse());
        }
        const u = Ys.triangulateShape(c, h);
        for (let t = 0, e = h.length; t < e; t++) {
          const e = h[t];
          c = c.concat(e);
        }
        for (let t = 0, e = c.length; t < e; t++) {
          const e = c[t];
          i.push(e.x, e.y, 0), r.push(0, 0, 1), s.push(e.x, e.y);
        }
        for (let t = 0, e = u.length; t < e; t++) {
          const e = u[t],
            i = e[0] + o,
            r = e[1] + o,
            s = e[2] + o;
          n.push(i, r, s), (a += 3);
        }
      }
      this.setIndex(n),
        this.setAttribute("position", new Me(i, 3)),
        this.setAttribute("normal", new Me(r, 3)),
        this.setAttribute("uv", new Me(s, 2));
    }
    toJSON() {
      const t = Ie.prototype.toJSON.call(this);
      return (function (t, e) {
        if (((e.shapes = []), Array.isArray(t)))
          for (let n = 0, i = t.length; n < i; n++) {
            const i = t[n];
            e.shapes.push(i.uuid);
          }
        else e.shapes.push(t.uuid);
        return e;
      })(this.parameters.shapes, t);
    }
  }
  (class extends ie {
    constructor(t) {
      super(),
        (this.type = "ShadowMaterial"),
        (this.color = new he(0)),
        (this.transparent = !0),
        this.setValues(t);
    }
    copy(t) {
      return super.copy(t), this.color.copy(t.color), this;
    }
  }.prototype.isShadowMaterial = !0);
  function eo(t) {
    ie.call(this),
      (this.defines = { STANDARD: "" }),
      (this.type = "MeshStandardMaterial"),
      (this.color = new he(16777215)),
      (this.roughness = 1),
      (this.metalness = 0),
      (this.map = null),
      (this.lightMap = null),
      (this.lightMapIntensity = 1),
      (this.aoMap = null),
      (this.aoMapIntensity = 1),
      (this.emissive = new he(0)),
      (this.emissiveIntensity = 1),
      (this.emissiveMap = null),
      (this.bumpMap = null),
      (this.bumpScale = 1),
      (this.normalMap = null),
      (this.normalMapType = 0),
      (this.normalScale = new P(1, 1)),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      (this.roughnessMap = null),
      (this.metalnessMap = null),
      (this.alphaMap = null),
      (this.envMap = null),
      (this.envMapIntensity = 1),
      (this.refractionRatio = 0.98),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.wireframeLinecap = "round"),
      (this.wireframeLinejoin = "round"),
      (this.skinning = !1),
      (this.morphTargets = !1),
      (this.morphNormals = !1),
      (this.flatShading = !1),
      (this.vertexTangents = !1),
      this.setValues(t);
  }
  function no(t) {
    eo.call(this),
      (this.defines = { STANDARD: "", PHYSICAL: "" }),
      (this.type = "MeshPhysicalMaterial"),
      (this.clearcoat = 0),
      (this.clearcoatMap = null),
      (this.clearcoatRoughness = 0),
      (this.clearcoatRoughnessMap = null),
      (this.clearcoatNormalScale = new P(1, 1)),
      (this.clearcoatNormalMap = null),
      (this.reflectivity = 0.5),
      Object.defineProperty(this, "ior", {
        get: function () {
          return (1 + 0.4 * this.reflectivity) / (1 - 0.4 * this.reflectivity);
        },
        set: function (t) {
          this.reflectivity = R.clamp((2.5 * (t - 1)) / (t + 1), 0, 1);
        },
      }),
      (this.sheen = null),
      (this.transmission = 0),
      (this.transmissionMap = null),
      this.setValues(t);
  }
  ((class extends rn {
    constructor(t) {
      super(t), (this.type = "RawShaderMaterial");
    }
  }.prototype.isRawShaderMaterial = !0),
    (eo.prototype = Object.create(ie.prototype)),
    (eo.prototype.constructor = eo),
    (eo.prototype.isMeshStandardMaterial = !0),
    (eo.prototype.copy = function (t) {
      return (
        ie.prototype.copy.call(this, t),
        (this.defines = { STANDARD: "" }),
        this.color.copy(t.color),
        (this.roughness = t.roughness),
        (this.metalness = t.metalness),
        (this.map = t.map),
        (this.lightMap = t.lightMap),
        (this.lightMapIntensity = t.lightMapIntensity),
        (this.aoMap = t.aoMap),
        (this.aoMapIntensity = t.aoMapIntensity),
        this.emissive.copy(t.emissive),
        (this.emissiveMap = t.emissiveMap),
        (this.emissiveIntensity = t.emissiveIntensity),
        (this.bumpMap = t.bumpMap),
        (this.bumpScale = t.bumpScale),
        (this.normalMap = t.normalMap),
        (this.normalMapType = t.normalMapType),
        this.normalScale.copy(t.normalScale),
        (this.displacementMap = t.displacementMap),
        (this.displacementScale = t.displacementScale),
        (this.displacementBias = t.displacementBias),
        (this.roughnessMap = t.roughnessMap),
        (this.metalnessMap = t.metalnessMap),
        (this.alphaMap = t.alphaMap),
        (this.envMap = t.envMap),
        (this.envMapIntensity = t.envMapIntensity),
        (this.refractionRatio = t.refractionRatio),
        (this.wireframe = t.wireframe),
        (this.wireframeLinewidth = t.wireframeLinewidth),
        (this.wireframeLinecap = t.wireframeLinecap),
        (this.wireframeLinejoin = t.wireframeLinejoin),
        (this.skinning = t.skinning),
        (this.morphTargets = t.morphTargets),
        (this.morphNormals = t.morphNormals),
        (this.flatShading = t.flatShading),
        (this.vertexTangents = t.vertexTangents),
        this
      );
    }),
    (no.prototype = Object.create(eo.prototype)),
    (no.prototype.constructor = no),
    (no.prototype.isMeshPhysicalMaterial = !0),
    (no.prototype.copy = function (t) {
      return (
        eo.prototype.copy.call(this, t),
        (this.defines = { STANDARD: "", PHYSICAL: "" }),
        (this.clearcoat = t.clearcoat),
        (this.clearcoatMap = t.clearcoatMap),
        (this.clearcoatRoughness = t.clearcoatRoughness),
        (this.clearcoatRoughnessMap = t.clearcoatRoughnessMap),
        (this.clearcoatNormalMap = t.clearcoatNormalMap),
        this.clearcoatNormalScale.copy(t.clearcoatNormalScale),
        (this.reflectivity = t.reflectivity),
        t.sheen
          ? (this.sheen = (this.sheen || new he()).copy(t.sheen))
          : (this.sheen = null),
        (this.transmission = t.transmission),
        (this.transmissionMap = t.transmissionMap),
        this
      );
    }));
  class io extends ie {
    constructor(t) {
      super(),
        (this.type = "MeshPhongMaterial"),
        (this.color = new he(16777215)),
        (this.specular = new he(1118481)),
        (this.shininess = 30),
        (this.map = null),
        (this.lightMap = null),
        (this.lightMapIntensity = 1),
        (this.aoMap = null),
        (this.aoMapIntensity = 1),
        (this.emissive = new he(0)),
        (this.emissiveIntensity = 1),
        (this.emissiveMap = null),
        (this.bumpMap = null),
        (this.bumpScale = 1),
        (this.normalMap = null),
        (this.normalMapType = 0),
        (this.normalScale = new P(1, 1)),
        (this.displacementMap = null),
        (this.displacementScale = 1),
        (this.displacementBias = 0),
        (this.specularMap = null),
        (this.alphaMap = null),
        (this.envMap = null),
        (this.combine = 0),
        (this.reflectivity = 1),
        (this.refractionRatio = 0.98),
        (this.wireframe = !1),
        (this.wireframeLinewidth = 1),
        (this.wireframeLinecap = "round"),
        (this.wireframeLinejoin = "round"),
        (this.skinning = !1),
        (this.morphTargets = !1),
        (this.morphNormals = !1),
        (this.flatShading = !1),
        this.setValues(t);
    }
    copy(t) {
      return (
        super.copy(t),
        this.color.copy(t.color),
        this.specular.copy(t.specular),
        (this.shininess = t.shininess),
        (this.map = t.map),
        (this.lightMap = t.lightMap),
        (this.lightMapIntensity = t.lightMapIntensity),
        (this.aoMap = t.aoMap),
        (this.aoMapIntensity = t.aoMapIntensity),
        this.emissive.copy(t.emissive),
        (this.emissiveMap = t.emissiveMap),
        (this.emissiveIntensity = t.emissiveIntensity),
        (this.bumpMap = t.bumpMap),
        (this.bumpScale = t.bumpScale),
        (this.normalMap = t.normalMap),
        (this.normalMapType = t.normalMapType),
        this.normalScale.copy(t.normalScale),
        (this.displacementMap = t.displacementMap),
        (this.displacementScale = t.displacementScale),
        (this.displacementBias = t.displacementBias),
        (this.specularMap = t.specularMap),
        (this.alphaMap = t.alphaMap),
        (this.envMap = t.envMap),
        (this.combine = t.combine),
        (this.reflectivity = t.reflectivity),
        (this.refractionRatio = t.refractionRatio),
        (this.wireframe = t.wireframe),
        (this.wireframeLinewidth = t.wireframeLinewidth),
        (this.wireframeLinecap = t.wireframeLinecap),
        (this.wireframeLinejoin = t.wireframeLinejoin),
        (this.skinning = t.skinning),
        (this.morphTargets = t.morphTargets),
        (this.morphNormals = t.morphNormals),
        (this.flatShading = t.flatShading),
        this
      );
    }
  }
  io.prototype.isMeshPhongMaterial = !0;
  (class extends ie {
    constructor(t) {
      super(),
        (this.defines = { TOON: "" }),
        (this.type = "MeshToonMaterial"),
        (this.color = new he(16777215)),
        (this.map = null),
        (this.gradientMap = null),
        (this.lightMap = null),
        (this.lightMapIntensity = 1),
        (this.aoMap = null),
        (this.aoMapIntensity = 1),
        (this.emissive = new he(0)),
        (this.emissiveIntensity = 1),
        (this.emissiveMap = null),
        (this.bumpMap = null),
        (this.bumpScale = 1),
        (this.normalMap = null),
        (this.normalMapType = 0),
        (this.normalScale = new P(1, 1)),
        (this.displacementMap = null),
        (this.displacementScale = 1),
        (this.displacementBias = 0),
        (this.alphaMap = null),
        (this.wireframe = !1),
        (this.wireframeLinewidth = 1),
        (this.wireframeLinecap = "round"),
        (this.wireframeLinejoin = "round"),
        (this.skinning = !1),
        (this.morphTargets = !1),
        (this.morphNormals = !1),
        this.setValues(t);
    }
    copy(t) {
      return (
        super.copy(t),
        this.color.copy(t.color),
        (this.map = t.map),
        (this.gradientMap = t.gradientMap),
        (this.lightMap = t.lightMap),
        (this.lightMapIntensity = t.lightMapIntensity),
        (this.aoMap = t.aoMap),
        (this.aoMapIntensity = t.aoMapIntensity),
        this.emissive.copy(t.emissive),
        (this.emissiveMap = t.emissiveMap),
        (this.emissiveIntensity = t.emissiveIntensity),
        (this.bumpMap = t.bumpMap),
        (this.bumpScale = t.bumpScale),
        (this.normalMap = t.normalMap),
        (this.normalMapType = t.normalMapType),
        this.normalScale.copy(t.normalScale),
        (this.displacementMap = t.displacementMap),
        (this.displacementScale = t.displacementScale),
        (this.displacementBias = t.displacementBias),
        (this.alphaMap = t.alphaMap),
        (this.wireframe = t.wireframe),
        (this.wireframeLinewidth = t.wireframeLinewidth),
        (this.wireframeLinecap = t.wireframeLinecap),
        (this.wireframeLinejoin = t.wireframeLinejoin),
        (this.skinning = t.skinning),
        (this.morphTargets = t.morphTargets),
        (this.morphNormals = t.morphNormals),
        this
      );
    }
  }.prototype.isMeshToonMaterial = !0);
  (class extends ie {
    constructor(t) {
      super(),
        (this.type = "MeshNormalMaterial"),
        (this.bumpMap = null),
        (this.bumpScale = 1),
        (this.normalMap = null),
        (this.normalMapType = 0),
        (this.normalScale = new P(1, 1)),
        (this.displacementMap = null),
        (this.displacementScale = 1),
        (this.displacementBias = 0),
        (this.wireframe = !1),
        (this.wireframeLinewidth = 1),
        (this.fog = !1),
        (this.skinning = !1),
        (this.morphTargets = !1),
        (this.morphNormals = !1),
        (this.flatShading = !1),
        this.setValues(t);
    }
    copy(t) {
      return (
        super.copy(t),
        (this.bumpMap = t.bumpMap),
        (this.bumpScale = t.bumpScale),
        (this.normalMap = t.normalMap),
        (this.normalMapType = t.normalMapType),
        this.normalScale.copy(t.normalScale),
        (this.displacementMap = t.displacementMap),
        (this.displacementScale = t.displacementScale),
        (this.displacementBias = t.displacementBias),
        (this.wireframe = t.wireframe),
        (this.wireframeLinewidth = t.wireframeLinewidth),
        (this.skinning = t.skinning),
        (this.morphTargets = t.morphTargets),
        (this.morphNormals = t.morphNormals),
        (this.flatShading = t.flatShading),
        this
      );
    }
  }.prototype.isMeshNormalMaterial = !0);
  (class extends ie {
    constructor(t) {
      super(),
        (this.type = "MeshLambertMaterial"),
        (this.color = new he(16777215)),
        (this.map = null),
        (this.lightMap = null),
        (this.lightMapIntensity = 1),
        (this.aoMap = null),
        (this.aoMapIntensity = 1),
        (this.emissive = new he(0)),
        (this.emissiveIntensity = 1),
        (this.emissiveMap = null),
        (this.specularMap = null),
        (this.alphaMap = null),
        (this.envMap = null),
        (this.combine = 0),
        (this.reflectivity = 1),
        (this.refractionRatio = 0.98),
        (this.wireframe = !1),
        (this.wireframeLinewidth = 1),
        (this.wireframeLinecap = "round"),
        (this.wireframeLinejoin = "round"),
        (this.skinning = !1),
        (this.morphTargets = !1),
        (this.morphNormals = !1),
        this.setValues(t);
    }
    copy(t) {
      return (
        super.copy(t),
        this.color.copy(t.color),
        (this.map = t.map),
        (this.lightMap = t.lightMap),
        (this.lightMapIntensity = t.lightMapIntensity),
        (this.aoMap = t.aoMap),
        (this.aoMapIntensity = t.aoMapIntensity),
        this.emissive.copy(t.emissive),
        (this.emissiveMap = t.emissiveMap),
        (this.emissiveIntensity = t.emissiveIntensity),
        (this.specularMap = t.specularMap),
        (this.alphaMap = t.alphaMap),
        (this.envMap = t.envMap),
        (this.combine = t.combine),
        (this.reflectivity = t.reflectivity),
        (this.refractionRatio = t.refractionRatio),
        (this.wireframe = t.wireframe),
        (this.wireframeLinewidth = t.wireframeLinewidth),
        (this.wireframeLinecap = t.wireframeLinecap),
        (this.wireframeLinejoin = t.wireframeLinejoin),
        (this.skinning = t.skinning),
        (this.morphTargets = t.morphTargets),
        (this.morphNormals = t.morphNormals),
        this
      );
    }
  }.prototype.isMeshLambertMaterial = !0);
  (class extends ie {
    constructor(t) {
      super(),
        (this.defines = { MATCAP: "" }),
        (this.type = "MeshMatcapMaterial"),
        (this.color = new he(16777215)),
        (this.matcap = null),
        (this.map = null),
        (this.bumpMap = null),
        (this.bumpScale = 1),
        (this.normalMap = null),
        (this.normalMapType = 0),
        (this.normalScale = new P(1, 1)),
        (this.displacementMap = null),
        (this.displacementScale = 1),
        (this.displacementBias = 0),
        (this.alphaMap = null),
        (this.skinning = !1),
        (this.morphTargets = !1),
        (this.morphNormals = !1),
        (this.flatShading = !1),
        this.setValues(t);
    }
    copy(t) {
      return (
        super.copy(t),
        (this.defines = { MATCAP: "" }),
        this.color.copy(t.color),
        (this.matcap = t.matcap),
        (this.map = t.map),
        (this.bumpMap = t.bumpMap),
        (this.bumpScale = t.bumpScale),
        (this.normalMap = t.normalMap),
        (this.normalMapType = t.normalMapType),
        this.normalScale.copy(t.normalScale),
        (this.displacementMap = t.displacementMap),
        (this.displacementScale = t.displacementScale),
        (this.displacementBias = t.displacementBias),
        (this.alphaMap = t.alphaMap),
        (this.skinning = t.skinning),
        (this.morphTargets = t.morphTargets),
        (this.morphNormals = t.morphNormals),
        (this.flatShading = t.flatShading),
        this
      );
    }
  }.prototype.isMeshMatcapMaterial = !0);
  (class extends os {
    constructor(t) {
      super(),
        (this.type = "LineDashedMaterial"),
        (this.scale = 1),
        (this.dashSize = 3),
        (this.gapSize = 1),
        this.setValues(t);
    }
    copy(t) {
      return (
        super.copy(t),
        (this.scale = t.scale),
        (this.dashSize = t.dashSize),
        (this.gapSize = t.gapSize),
        this
      );
    }
  }.prototype.isLineDashedMaterial = !0);
  const ro = {
    arraySlice: function (t, e, n) {
      return ro.isTypedArray(t)
        ? new t.constructor(t.subarray(e, void 0 !== n ? n : t.length))
        : t.slice(e, n);
    },
    convertArray: function (t, e, n) {
      return !t || (!n && t.constructor === e)
        ? t
        : "number" == typeof e.BYTES_PER_ELEMENT
        ? new e(t)
        : Array.prototype.slice.call(t);
    },
    isTypedArray: function (t) {
      return ArrayBuffer.isView(t) && !(t instanceof DataView);
    },
    getKeyframeOrder: function (t) {
      const e = t.length,
        n = new Array(e);
      for (let t = 0; t !== e; ++t) n[t] = t;
      return (
        n.sort(function (e, n) {
          return t[e] - t[n];
        }),
        n
      );
    },
    sortedArray: function (t, e, n) {
      const i = t.length,
        r = new t.constructor(i);
      for (let s = 0, o = 0; o !== i; ++s) {
        const i = n[s] * e;
        for (let n = 0; n !== e; ++n) r[o++] = t[i + n];
      }
      return r;
    },
    flattenJSON: function (t, e, n, i) {
      let r = 1,
        s = t[0];
      for (; void 0 !== s && void 0 === s[i]; ) s = t[r++];
      if (void 0 === s) return;
      let o = s[i];
      if (void 0 !== o)
        if (Array.isArray(o))
          do {
            (o = s[i]),
              void 0 !== o && (e.push(s.time), n.push.apply(n, o)),
              (s = t[r++]);
          } while (void 0 !== s);
        else if (void 0 !== o.toArray)
          do {
            (o = s[i]),
              void 0 !== o && (e.push(s.time), o.toArray(n, n.length)),
              (s = t[r++]);
          } while (void 0 !== s);
        else
          do {
            (o = s[i]),
              void 0 !== o && (e.push(s.time), n.push(o)),
              (s = t[r++]);
          } while (void 0 !== s);
    },
    subclip: function (t, e, n, i, r = 30) {
      const s = t.clone();
      s.name = e;
      const o = [];
      for (let t = 0; t < s.tracks.length; ++t) {
        const e = s.tracks[t],
          a = e.getValueSize(),
          l = [],
          c = [];
        for (let t = 0; t < e.times.length; ++t) {
          const s = e.times[t] * r;
          if (!(s < n || s >= i)) {
            l.push(e.times[t]);
            for (let n = 0; n < a; ++n) c.push(e.values[t * a + n]);
          }
        }
        0 !== l.length &&
          ((e.times = ro.convertArray(l, e.times.constructor)),
          (e.values = ro.convertArray(c, e.values.constructor)),
          o.push(e));
      }
      s.tracks = o;
      let a = 1 / 0;
      for (let t = 0; t < s.tracks.length; ++t)
        a > s.tracks[t].times[0] && (a = s.tracks[t].times[0]);
      for (let t = 0; t < s.tracks.length; ++t) s.tracks[t].shift(-1 * a);
      return s.resetDuration(), s;
    },
    makeClipAdditive: function (t, e = 0, n = t, i = 30) {
      i <= 0 && (i = 30);
      const r = n.tracks.length,
        s = e / i;
      for (let e = 0; e < r; ++e) {
        const i = n.tracks[e],
          r = i.ValueTypeName;
        if ("bool" === r || "string" === r) continue;
        const o = t.tracks.find(function (t) {
          return t.name === i.name && t.ValueTypeName === r;
        });
        if (void 0 === o) continue;
        let a = 0;
        const l = i.getValueSize();
        i.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline &&
          (a = l / 3);
        let c = 0;
        const h = o.getValueSize();
        o.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline &&
          (c = h / 3);
        const u = i.times.length - 1;
        let d;
        if (s <= i.times[0]) {
          const t = a,
            e = l - a;
          d = ro.arraySlice(i.values, t, e);
        } else if (s >= i.times[u]) {
          const t = u * l + a,
            e = t + l - a;
          d = ro.arraySlice(i.values, t, e);
        } else {
          const t = i.createInterpolant(),
            e = a,
            n = l - a;
          t.evaluate(s), (d = ro.arraySlice(t.resultBuffer, e, n));
        }
        "quaternion" === r &&
          new U().fromArray(d).normalize().conjugate().toArray(d);
        const p = o.times.length;
        for (let t = 0; t < p; ++t) {
          const e = t * h + c;
          if ("quaternion" === r)
            U.multiplyQuaternionsFlat(o.values, e, d, 0, o.values, e);
          else {
            const t = h - 2 * c;
            for (let n = 0; n < t; ++n) o.values[e + n] -= d[n];
          }
        }
      }
      return (t.blendMode = 2501), t;
    },
  };
  function so(t, e, n, i) {
    (this.parameterPositions = t),
      (this._cachedIndex = 0),
      (this.resultBuffer = void 0 !== i ? i : new e.constructor(n)),
      (this.sampleValues = e),
      (this.valueSize = n);
  }
  function oo(t, e, n, i) {
    so.call(this, t, e, n, i),
      (this._weightPrev = -0),
      (this._offsetPrev = -0),
      (this._weightNext = -0),
      (this._offsetNext = -0);
  }
  function ao(t, e, n, i) {
    so.call(this, t, e, n, i);
  }
  function lo(t, e, n, i) {
    so.call(this, t, e, n, i);
  }
  Object.assign(so.prototype, {
    evaluate: function (t) {
      const e = this.parameterPositions;
      let n = this._cachedIndex,
        i = e[n],
        r = e[n - 1];
      t: {
        e: {
          let s;
          n: {
            i: if (!(t < i)) {
              for (let s = n + 2; ; ) {
                if (void 0 === i) {
                  if (t < r) break i;
                  return (
                    (n = e.length),
                    (this._cachedIndex = n),
                    this.afterEnd_(n - 1, t, r)
                  );
                }
                if (n === s) break;
                if (((r = i), (i = e[++n]), t < i)) break e;
              }
              s = e.length;
              break n;
            }
            if (t >= r) break t;
            {
              const o = e[1];
              t < o && ((n = 2), (r = o));
              for (let s = n - 2; ; ) {
                if (void 0 === r)
                  return (this._cachedIndex = 0), this.beforeStart_(0, t, i);
                if (n === s) break;
                if (((i = r), (r = e[--n - 1]), t >= r)) break e;
              }
              (s = n), (n = 0);
            }
          }
          for (; n < s; ) {
            const i = (n + s) >>> 1;
            t < e[i] ? (s = i) : (n = i + 1);
          }
          if (((i = e[n]), (r = e[n - 1]), void 0 === r))
            return (this._cachedIndex = 0), this.beforeStart_(0, t, i);
          if (void 0 === i)
            return (
              (n = e.length),
              (this._cachedIndex = n),
              this.afterEnd_(n - 1, r, t)
            );
        }
        (this._cachedIndex = n), this.intervalChanged_(n, r, i);
      }
      return this.interpolate_(n, r, t, i);
    },
    settings: null,
    DefaultSettings_: {},
    getSettings_: function () {
      return this.settings || this.DefaultSettings_;
    },
    copySampleValue_: function (t) {
      const e = this.resultBuffer,
        n = this.sampleValues,
        i = this.valueSize,
        r = t * i;
      for (let t = 0; t !== i; ++t) e[t] = n[r + t];
      return e;
    },
    interpolate_: function () {
      throw new Error("call to abstract method");
    },
    intervalChanged_: function () {},
  }),
    Object.assign(so.prototype, {
      beforeStart_: so.prototype.copySampleValue_,
      afterEnd_: so.prototype.copySampleValue_,
    }),
    (oo.prototype = Object.assign(Object.create(so.prototype), {
      constructor: oo,
      DefaultSettings_: { endingStart: y, endingEnd: y },
      intervalChanged_: function (t, e, n) {
        const i = this.parameterPositions;
        let r = t - 2,
          s = t + 1,
          o = i[r],
          a = i[s];
        if (void 0 === o)
          switch (this.getSettings_().endingStart) {
            case x:
              (r = t), (o = 2 * e - n);
              break;
            case b:
              (r = i.length - 2), (o = e + i[r] - i[r + 1]);
              break;
            default:
              (r = t), (o = n);
          }
        if (void 0 === a)
          switch (this.getSettings_().endingEnd) {
            case x:
              (s = t), (a = 2 * n - e);
              break;
            case b:
              (s = 1), (a = n + i[1] - i[0]);
              break;
            default:
              (s = t - 1), (a = e);
          }
        const l = 0.5 * (n - e),
          c = this.valueSize;
        (this._weightPrev = l / (e - o)),
          (this._weightNext = l / (a - n)),
          (this._offsetPrev = r * c),
          (this._offsetNext = s * c);
      },
      interpolate_: function (t, e, n, i) {
        const r = this.resultBuffer,
          s = this.sampleValues,
          o = this.valueSize,
          a = t * o,
          l = a - o,
          c = this._offsetPrev,
          h = this._offsetNext,
          u = this._weightPrev,
          d = this._weightNext,
          p = (n - e) / (i - e),
          f = p * p,
          m = f * p,
          g = -u * m + 2 * u * f - u * p,
          v = (1 + u) * m + (-1.5 - 2 * u) * f + (-0.5 + u) * p + 1,
          _ = (-1 - d) * m + (1.5 + d) * f + 0.5 * p,
          y = d * m - d * f;
        for (let t = 0; t !== o; ++t)
          r[t] = g * s[c + t] + v * s[l + t] + _ * s[a + t] + y * s[h + t];
        return r;
      },
    })),
    (ao.prototype = Object.assign(Object.create(so.prototype), {
      constructor: ao,
      interpolate_: function (t, e, n, i) {
        const r = this.resultBuffer,
          s = this.sampleValues,
          o = this.valueSize,
          a = t * o,
          l = a - o,
          c = (n - e) / (i - e),
          h = 1 - c;
        for (let t = 0; t !== o; ++t) r[t] = s[l + t] * h + s[a + t] * c;
        return r;
      },
    })),
    (lo.prototype = Object.assign(Object.create(so.prototype), {
      constructor: lo,
      interpolate_: function (t) {
        return this.copySampleValue_(t - 1);
      },
    }));
  class co {
    constructor(t, e, n, i) {
      if (void 0 === t)
        throw new Error("THREE.KeyframeTrack: track name is undefined");
      if (void 0 === e || 0 === e.length)
        throw new Error(
          "THREE.KeyframeTrack: no keyframes in track named " + t
        );
      (this.name = t),
        (this.times = ro.convertArray(e, this.TimeBufferType)),
        (this.values = ro.convertArray(n, this.ValueBufferType)),
        this.setInterpolation(i || this.DefaultInterpolation);
    }
    static toJSON(t) {
      const e = t.constructor;
      let n;
      if (e.toJSON !== this.toJSON) n = e.toJSON(t);
      else {
        n = {
          name: t.name,
          times: ro.convertArray(t.times, Array),
          values: ro.convertArray(t.values, Array),
        };
        const e = t.getInterpolation();
        e !== t.DefaultInterpolation && (n.interpolation = e);
      }
      return (n.type = t.ValueTypeName), n;
    }
    InterpolantFactoryMethodDiscrete(t) {
      return new lo(this.times, this.values, this.getValueSize(), t);
    }
    InterpolantFactoryMethodLinear(t) {
      return new ao(this.times, this.values, this.getValueSize(), t);
    }
    InterpolantFactoryMethodSmooth(t) {
      return new oo(this.times, this.values, this.getValueSize(), t);
    }
    setInterpolation(t) {
      let e;
      switch (t) {
        case g:
          e = this.InterpolantFactoryMethodDiscrete;
          break;
        case v:
          e = this.InterpolantFactoryMethodLinear;
          break;
        case _:
          e = this.InterpolantFactoryMethodSmooth;
      }
      if (void 0 === e) {
        const e =
          "unsupported interpolation for " +
          this.ValueTypeName +
          " keyframe track named " +
          this.name;
        if (void 0 === this.createInterpolant) {
          if (t === this.DefaultInterpolation) throw new Error(e);
          this.setInterpolation(this.DefaultInterpolation);
        }
        return console.warn("THREE.KeyframeTrack:", e), this;
      }
      return (this.createInterpolant = e), this;
    }
    getInterpolation() {
      switch (this.createInterpolant) {
        case this.InterpolantFactoryMethodDiscrete:
          return g;
        case this.InterpolantFactoryMethodLinear:
          return v;
        case this.InterpolantFactoryMethodSmooth:
          return _;
      }
    }
    getValueSize() {
      return this.values.length / this.times.length;
    }
    shift(t) {
      if (0 !== t) {
        const e = this.times;
        for (let n = 0, i = e.length; n !== i; ++n) e[n] += t;
      }
      return this;
    }
    scale(t) {
      if (1 !== t) {
        const e = this.times;
        for (let n = 0, i = e.length; n !== i; ++n) e[n] *= t;
      }
      return this;
    }
    trim(t, e) {
      const n = this.times,
        i = n.length;
      let r = 0,
        s = i - 1;
      for (; r !== i && n[r] < t; ) ++r;
      for (; -1 !== s && n[s] > e; ) --s;
      if ((++s, 0 !== r || s !== i)) {
        r >= s && ((s = Math.max(s, 1)), (r = s - 1));
        const t = this.getValueSize();
        (this.times = ro.arraySlice(n, r, s)),
          (this.values = ro.arraySlice(this.values, r * t, s * t));
      }
      return this;
    }
    validate() {
      let t = !0;
      const e = this.getValueSize();
      e - Math.floor(e) != 0 &&
        (console.error(
          "THREE.KeyframeTrack: Invalid value size in track.",
          this
        ),
        (t = !1));
      const n = this.times,
        i = this.values,
        r = n.length;
      0 === r &&
        (console.error("THREE.KeyframeTrack: Track is empty.", this), (t = !1));
      let s = null;
      for (let e = 0; e !== r; e++) {
        const i = n[e];
        if ("number" == typeof i && isNaN(i)) {
          console.error(
            "THREE.KeyframeTrack: Time is not a valid number.",
            this,
            e,
            i
          ),
            (t = !1);
          break;
        }
        if (null !== s && s > i) {
          console.error(
            "THREE.KeyframeTrack: Out of order keys.",
            this,
            e,
            i,
            s
          ),
            (t = !1);
          break;
        }
        s = i;
      }
      if (void 0 !== i && ro.isTypedArray(i))
        for (let e = 0, n = i.length; e !== n; ++e) {
          const n = i[e];
          if (isNaN(n)) {
            console.error(
              "THREE.KeyframeTrack: Value is not a valid number.",
              this,
              e,
              n
            ),
              (t = !1);
            break;
          }
        }
      return t;
    }
    optimize() {
      const t = ro.arraySlice(this.times),
        e = ro.arraySlice(this.values),
        n = this.getValueSize(),
        i = this.getInterpolation() === _,
        r = t.length - 1;
      let s = 1;
      for (let o = 1; o < r; ++o) {
        let r = !1;
        const a = t[o];
        if (a !== t[o + 1] && (1 !== o || a !== t[0]))
          if (i) r = !0;
          else {
            const t = o * n,
              i = t - n,
              s = t + n;
            for (let o = 0; o !== n; ++o) {
              const n = e[t + o];
              if (n !== e[i + o] || n !== e[s + o]) {
                r = !0;
                break;
              }
            }
          }
        if (r) {
          if (o !== s) {
            t[s] = t[o];
            const i = o * n,
              r = s * n;
            for (let t = 0; t !== n; ++t) e[r + t] = e[i + t];
          }
          ++s;
        }
      }
      if (r > 0) {
        t[s] = t[r];
        for (let t = r * n, i = s * n, o = 0; o !== n; ++o) e[i + o] = e[t + o];
        ++s;
      }
      return (
        s !== t.length
          ? ((this.times = ro.arraySlice(t, 0, s)),
            (this.values = ro.arraySlice(e, 0, s * n)))
          : ((this.times = t), (this.values = e)),
        this
      );
    }
    clone() {
      const t = ro.arraySlice(this.times, 0),
        e = ro.arraySlice(this.values, 0),
        n = new (0, this.constructor)(this.name, t, e);
      return (n.createInterpolant = this.createInterpolant), n;
    }
  }
  (co.prototype.TimeBufferType = Float32Array),
    (co.prototype.ValueBufferType = Float32Array),
    (co.prototype.DefaultInterpolation = v);
  class ho extends co {}
  (ho.prototype.ValueTypeName = "bool"),
    (ho.prototype.ValueBufferType = Array),
    (ho.prototype.DefaultInterpolation = g),
    (ho.prototype.InterpolantFactoryMethodLinear = void 0),
    (ho.prototype.InterpolantFactoryMethodSmooth = void 0);
  class uo extends co {}
  uo.prototype.ValueTypeName = "color";
  class po extends co {}
  function fo(t, e, n, i) {
    so.call(this, t, e, n, i);
  }
  (po.prototype.ValueTypeName = "number"),
    (fo.prototype = Object.assign(Object.create(so.prototype), {
      constructor: fo,
      interpolate_: function (t, e, n, i) {
        const r = this.resultBuffer,
          s = this.sampleValues,
          o = this.valueSize,
          a = (n - e) / (i - e);
        let l = t * o;
        for (let t = l + o; l !== t; l += 4)
          U.slerpFlat(r, 0, s, l - o, s, l, a);
        return r;
      },
    }));
  class mo extends co {
    InterpolantFactoryMethodLinear(t) {
      return new fo(this.times, this.values, this.getValueSize(), t);
    }
  }
  (mo.prototype.ValueTypeName = "quaternion"),
    (mo.prototype.DefaultInterpolation = v),
    (mo.prototype.InterpolantFactoryMethodSmooth = void 0);
  class go extends co {}
  (go.prototype.ValueTypeName = "string"),
    (go.prototype.ValueBufferType = Array),
    (go.prototype.DefaultInterpolation = g),
    (go.prototype.InterpolantFactoryMethodLinear = void 0),
    (go.prototype.InterpolantFactoryMethodSmooth = void 0);
  class vo extends co {}
  vo.prototype.ValueTypeName = "vector";
  class _o {
    constructor(t, e = -1, n, i = 2500) {
      (this.name = t),
        (this.tracks = n),
        (this.duration = e),
        (this.blendMode = i),
        (this.uuid = R.generateUUID()),
        this.duration < 0 && this.resetDuration();
    }
    static parse(t) {
      const e = [],
        n = t.tracks,
        i = 1 / (t.fps || 1);
      for (let t = 0, r = n.length; t !== r; ++t) e.push(yo(n[t]).scale(i));
      const r = new this(t.name, t.duration, e, t.blendMode);
      return (r.uuid = t.uuid), r;
    }
    static toJSON(t) {
      const e = [],
        n = t.tracks,
        i = {
          name: t.name,
          duration: t.duration,
          tracks: e,
          uuid: t.uuid,
          blendMode: t.blendMode,
        };
      for (let t = 0, i = n.length; t !== i; ++t) e.push(co.toJSON(n[t]));
      return i;
    }
    static CreateFromMorphTargetSequence(t, e, n, i) {
      const r = e.length,
        s = [];
      for (let t = 0; t < r; t++) {
        let o = [],
          a = [];
        o.push((t + r - 1) % r, t, (t + 1) % r), a.push(0, 1, 0);
        const l = ro.getKeyframeOrder(o);
        (o = ro.sortedArray(o, 1, l)),
          (a = ro.sortedArray(a, 1, l)),
          i || 0 !== o[0] || (o.push(r), a.push(a[0])),
          s.push(
            new po(".morphTargetInfluences[" + e[t].name + "]", o, a).scale(
              1 / n
            )
          );
      }
      return new this(t, -1, s);
    }
    static findByName(t, e) {
      let n = t;
      if (!Array.isArray(t)) {
        const e = t;
        n = (e.geometry && e.geometry.animations) || e.animations;
      }
      for (let t = 0; t < n.length; t++) if (n[t].name === e) return n[t];
      return null;
    }
    static CreateClipsFromMorphTargetSequences(t, e, n) {
      const i = {},
        r = /^([\w-]*?)([\d]+)$/;
      for (let e = 0, n = t.length; e < n; e++) {
        const n = t[e],
          s = n.name.match(r);
        if (s && s.length > 1) {
          const t = s[1];
          let e = i[t];
          e || (i[t] = e = []), e.push(n);
        }
      }
      const s = [];
      for (const t in i)
        s.push(this.CreateFromMorphTargetSequence(t, i[t], e, n));
      return s;
    }
    static parseAnimation(t, e) {
      if (!t)
        return (
          console.error(
            "THREE.AnimationClip: No animation in JSONLoader data."
          ),
          null
        );
      const n = function (t, e, n, i, r) {
          if (0 !== n.length) {
            const s = [],
              o = [];
            ro.flattenJSON(n, s, o, i),
              0 !== s.length && r.push(new t(e, s, o));
          }
        },
        i = [],
        r = t.name || "default",
        s = t.fps || 30,
        o = t.blendMode;
      let a = t.length || -1;
      const l = t.hierarchy || [];
      for (let t = 0; t < l.length; t++) {
        const r = l[t].keys;
        if (r && 0 !== r.length)
          if (r[0].morphTargets) {
            const t = {};
            let e;
            for (e = 0; e < r.length; e++)
              if (r[e].morphTargets)
                for (let n = 0; n < r[e].morphTargets.length; n++)
                  t[r[e].morphTargets[n]] = -1;
            for (const n in t) {
              const t = [],
                s = [];
              for (let i = 0; i !== r[e].morphTargets.length; ++i) {
                const i = r[e];
                t.push(i.time), s.push(i.morphTarget === n ? 1 : 0);
              }
              i.push(new po(".morphTargetInfluence[" + n + "]", t, s));
            }
            a = t.length * (s || 1);
          } else {
            const s = ".bones[" + e[t].name + "]";
            n(vo, s + ".position", r, "pos", i),
              n(mo, s + ".quaternion", r, "rot", i),
              n(vo, s + ".scale", r, "scl", i);
          }
      }
      return 0 === i.length ? null : new this(r, a, i, o);
    }
    resetDuration() {
      let t = 0;
      for (let e = 0, n = this.tracks.length; e !== n; ++e) {
        const n = this.tracks[e];
        t = Math.max(t, n.times[n.times.length - 1]);
      }
      return (this.duration = t), this;
    }
    trim() {
      for (let t = 0; t < this.tracks.length; t++)
        this.tracks[t].trim(0, this.duration);
      return this;
    }
    validate() {
      let t = !0;
      for (let e = 0; e < this.tracks.length; e++)
        t = t && this.tracks[e].validate();
      return t;
    }
    optimize() {
      for (let t = 0; t < this.tracks.length; t++) this.tracks[t].optimize();
      return this;
    }
    clone() {
      const t = [];
      for (let e = 0; e < this.tracks.length; e++)
        t.push(this.tracks[e].clone());
      return new this.constructor(this.name, this.duration, t, this.blendMode);
    }
    toJSON() {
      return this.constructor.toJSON(this);
    }
  }
  function yo(t) {
    if (void 0 === t.type)
      throw new Error(
        "THREE.KeyframeTrack: track type undefined, can not parse"
      );
    const e = (function (t) {
      switch (t.toLowerCase()) {
        case "scalar":
        case "double":
        case "float":
        case "number":
        case "integer":
          return po;
        case "vector":
        case "vector2":
        case "vector3":
        case "vector4":
          return vo;
        case "color":
          return uo;
        case "quaternion":
          return mo;
        case "bool":
        case "boolean":
          return ho;
        case "string":
          return go;
      }
      throw new Error("THREE.KeyframeTrack: Unsupported typeName: " + t);
    })(t.type);
    if (void 0 === t.times) {
      const e = [],
        n = [];
      ro.flattenJSON(t.keys, e, n, "value"), (t.times = e), (t.values = n);
    }
    return void 0 !== e.parse
      ? e.parse(t)
      : new e(t.name, t.times, t.values, t.interpolation);
  }
  const xo = {
    enabled: !1,
    files: {},
    add: function (t, e) {
      !1 !== this.enabled && (this.files[t] = e);
    },
    get: function (t) {
      if (!1 !== this.enabled) return this.files[t];
    },
    remove: function (t) {
      delete this.files[t];
    },
    clear: function () {
      this.files = {};
    },
  };
  const bo = new (function (t, e, n) {
    const i = this;
    let r,
      s = !1,
      o = 0,
      a = 0;
    const l = [];
    (this.onStart = void 0),
      (this.onLoad = t),
      (this.onProgress = e),
      (this.onError = n),
      (this.itemStart = function (t) {
        a++, !1 === s && void 0 !== i.onStart && i.onStart(t, o, a), (s = !0);
      }),
      (this.itemEnd = function (t) {
        o++,
          void 0 !== i.onProgress && i.onProgress(t, o, a),
          o === a && ((s = !1), void 0 !== i.onLoad && i.onLoad());
      }),
      (this.itemError = function (t) {
        void 0 !== i.onError && i.onError(t);
      }),
      (this.resolveURL = function (t) {
        return r ? r(t) : t;
      }),
      (this.setURLModifier = function (t) {
        return (r = t), this;
      }),
      (this.addHandler = function (t, e) {
        return l.push(t, e), this;
      }),
      (this.removeHandler = function (t) {
        const e = l.indexOf(t);
        return -1 !== e && l.splice(e, 2), this;
      }),
      (this.getHandler = function (t) {
        for (let e = 0, n = l.length; e < n; e += 2) {
          const n = l[e],
            i = l[e + 1];
          if ((n.global && (n.lastIndex = 0), n.test(t))) return i;
        }
        return null;
      });
  })();
  function wo(t) {
    (this.manager = void 0 !== t ? t : bo),
      (this.crossOrigin = "anonymous"),
      (this.withCredentials = !1),
      (this.path = ""),
      (this.resourcePath = ""),
      (this.requestHeader = {});
  }
  Object.assign(wo.prototype, {
    load: function () {},
    loadAsync: function (t, e) {
      const n = this;
      return new Promise(function (i, r) {
        n.load(t, i, e, r);
      });
    },
    parse: function () {},
    setCrossOrigin: function (t) {
      return (this.crossOrigin = t), this;
    },
    setWithCredentials: function (t) {
      return (this.withCredentials = t), this;
    },
    setPath: function (t) {
      return (this.path = t), this;
    },
    setResourcePath: function (t) {
      return (this.resourcePath = t), this;
    },
    setRequestHeader: function (t) {
      return (this.requestHeader = t), this;
    },
  });
  const Mo = {};
  function So(t) {
    wo.call(this, t);
  }
  function Eo(t) {
    wo.call(this, t);
  }
  (So.prototype = Object.assign(Object.create(wo.prototype), {
    constructor: So,
    load: function (t, e, n, i) {
      void 0 === t && (t = ""),
        void 0 !== this.path && (t = this.path + t),
        (t = this.manager.resolveURL(t));
      const r = this,
        s = xo.get(t);
      if (void 0 !== s)
        return (
          r.manager.itemStart(t),
          setTimeout(function () {
            e && e(s), r.manager.itemEnd(t);
          }, 0),
          s
        );
      if (void 0 !== Mo[t])
        return void Mo[t].push({ onLoad: e, onProgress: n, onError: i });
      const o = t.match(/^data:(.*?)(;base64)?,(.*)$/);
      let a;
      if (o) {
        const n = o[1],
          s = !!o[2];
        let a = o[3];
        (a = decodeURIComponent(a)), s && (a = atob(a));
        try {
          let i;
          const s = (this.responseType || "").toLowerCase();
          switch (s) {
            case "arraybuffer":
            case "blob":
              const t = new Uint8Array(a.length);
              for (let e = 0; e < a.length; e++) t[e] = a.charCodeAt(e);
              i = "blob" === s ? new Blob([t.buffer], { type: n }) : t.buffer;
              break;
            case "document":
              const e = new DOMParser();
              i = e.parseFromString(a, n);
              break;
            case "json":
              i = JSON.parse(a);
              break;
            default:
              i = a;
          }
          setTimeout(function () {
            e && e(i), r.manager.itemEnd(t);
          }, 0);
        } catch (e) {
          setTimeout(function () {
            i && i(e), r.manager.itemError(t), r.manager.itemEnd(t);
          }, 0);
        }
      } else {
        (Mo[t] = []),
          Mo[t].push({ onLoad: e, onProgress: n, onError: i }),
          (a = new XMLHttpRequest()),
          a.open("GET", t, !0),
          a.addEventListener(
            "load",
            function (e) {
              const n = this.response,
                i = Mo[t];
              if ((delete Mo[t], 200 === this.status || 0 === this.status)) {
                0 === this.status &&
                  console.warn("THREE.FileLoader: HTTP Status 0 received."),
                  xo.add(t, n);
                for (let t = 0, e = i.length; t < e; t++) {
                  const e = i[t];
                  e.onLoad && e.onLoad(n);
                }
                r.manager.itemEnd(t);
              } else {
                for (let t = 0, n = i.length; t < n; t++) {
                  const n = i[t];
                  n.onError && n.onError(e);
                }
                r.manager.itemError(t), r.manager.itemEnd(t);
              }
            },
            !1
          ),
          a.addEventListener(
            "progress",
            function (e) {
              const n = Mo[t];
              for (let t = 0, i = n.length; t < i; t++) {
                const i = n[t];
                i.onProgress && i.onProgress(e);
              }
            },
            !1
          ),
          a.addEventListener(
            "error",
            function (e) {
              const n = Mo[t];
              delete Mo[t];
              for (let t = 0, i = n.length; t < i; t++) {
                const i = n[t];
                i.onError && i.onError(e);
              }
              r.manager.itemError(t), r.manager.itemEnd(t);
            },
            !1
          ),
          a.addEventListener(
            "abort",
            function (e) {
              const n = Mo[t];
              delete Mo[t];
              for (let t = 0, i = n.length; t < i; t++) {
                const i = n[t];
                i.onError && i.onError(e);
              }
              r.manager.itemError(t), r.manager.itemEnd(t);
            },
            !1
          ),
          void 0 !== this.responseType && (a.responseType = this.responseType),
          void 0 !== this.withCredentials &&
            (a.withCredentials = this.withCredentials),
          a.overrideMimeType &&
            a.overrideMimeType(
              void 0 !== this.mimeType ? this.mimeType : "text/plain"
            );
        for (const t in this.requestHeader)
          a.setRequestHeader(t, this.requestHeader[t]);
        a.send(null);
      }
      return r.manager.itemStart(t), a;
    },
    setResponseType: function (t) {
      return (this.responseType = t), this;
    },
    setMimeType: function (t) {
      return (this.mimeType = t), this;
    },
  })),
    (Eo.prototype = Object.assign(Object.create(wo.prototype), {
      constructor: Eo,
      load: function (t, e, n, i) {
        const r = this,
          o = [],
          a = new Ms(),
          l = new So(this.manager);
        l.setPath(this.path),
          l.setResponseType("arraybuffer"),
          l.setRequestHeader(this.requestHeader),
          l.setWithCredentials(r.withCredentials);
        let c = 0;
        function h(h) {
          l.load(
            t[h],
            function (t) {
              const n = r.parse(t, !0);
              (o[h] = {
                width: n.width,
                height: n.height,
                format: n.format,
                mipmaps: n.mipmaps,
              }),
                (c += 1),
                6 === c &&
                  (1 === n.mipmapCount && (a.minFilter = s),
                  (a.image = o),
                  (a.format = n.format),
                  (a.needsUpdate = !0),
                  e && e(a));
            },
            n,
            i
          );
        }
        if (Array.isArray(t)) for (let e = 0, n = t.length; e < n; ++e) h(e);
        else
          l.load(
            t,
            function (t) {
              const n = r.parse(t, !0);
              if (n.isCubemap) {
                const t = n.mipmaps.length / n.mipmapCount;
                for (let e = 0; e < t; e++) {
                  o[e] = { mipmaps: [] };
                  for (let t = 0; t < n.mipmapCount; t++)
                    o[e].mipmaps.push(n.mipmaps[e * n.mipmapCount + t]),
                      (o[e].format = n.format),
                      (o[e].width = n.width),
                      (o[e].height = n.height);
                }
                a.image = o;
              } else
                (a.image.width = n.width),
                  (a.image.height = n.height),
                  (a.mipmaps = n.mipmaps);
              1 === n.mipmapCount && (a.minFilter = s),
                (a.format = n.format),
                (a.needsUpdate = !0),
                e && e(a);
            },
            n,
            i
          );
        return a;
      },
    }));
  class To extends wo {
    constructor(t) {
      super(t);
    }
    load(t, e, n, i) {
      void 0 !== this.path && (t = this.path + t),
        (t = this.manager.resolveURL(t));
      const r = this,
        s = xo.get(t);
      if (void 0 !== s)
        return (
          r.manager.itemStart(t),
          setTimeout(function () {
            e && e(s), r.manager.itemEnd(t);
          }, 0),
          s
        );
      const o = document.createElementNS("http://www.w3.org/1999/xhtml", "img");
      function a() {
        o.removeEventListener("load", a, !1),
          o.removeEventListener("error", l, !1),
          xo.add(t, this),
          e && e(this),
          r.manager.itemEnd(t);
      }
      function l(e) {
        o.removeEventListener("load", a, !1),
          o.removeEventListener("error", l, !1),
          i && i(e),
          r.manager.itemError(t),
          r.manager.itemEnd(t);
      }
      return (
        o.addEventListener("load", a, !1),
        o.addEventListener("error", l, !1),
        "data:" !== t.substr(0, 5) &&
          void 0 !== this.crossOrigin &&
          (o.crossOrigin = this.crossOrigin),
        r.manager.itemStart(t),
        (o.src = t),
        o
      );
    }
  }
  class Ao extends wo {
    constructor(t) {
      super(t);
    }
    load(t, e, n, i) {
      const r = new cn(),
        s = new To(this.manager);
      s.setCrossOrigin(this.crossOrigin), s.setPath(this.path);
      let o = 0;
      function a(n) {
        s.load(
          t[n],
          function (t) {
            (r.images[n] = t),
              o++,
              6 === o && ((r.needsUpdate = !0), e && e(r));
          },
          void 0,
          i
        );
      }
      for (let e = 0; e < t.length; ++e) a(e);
      return r;
    }
  }
  function Lo(t) {
    wo.call(this, t);
  }
  function Co(t) {
    wo.call(this, t);
  }
  function Ro() {
    (this.type = "Curve"), (this.arcLengthDivisions = 200);
  }
  (Lo.prototype = Object.assign(Object.create(wo.prototype), {
    constructor: Lo,
    load: function (t, e, i, r) {
      const a = this,
        l = new un(),
        c = new So(this.manager);
      return (
        c.setResponseType("arraybuffer"),
        c.setRequestHeader(this.requestHeader),
        c.setPath(this.path),
        c.setWithCredentials(a.withCredentials),
        c.load(
          t,
          function (t) {
            const i = a.parse(t);
            i &&
              (void 0 !== i.image
                ? (l.image = i.image)
                : void 0 !== i.data &&
                  ((l.image.width = i.width),
                  (l.image.height = i.height),
                  (l.image.data = i.data)),
              (l.wrapS = void 0 !== i.wrapS ? i.wrapS : n),
              (l.wrapT = void 0 !== i.wrapT ? i.wrapT : n),
              (l.magFilter = void 0 !== i.magFilter ? i.magFilter : s),
              (l.minFilter = void 0 !== i.minFilter ? i.minFilter : s),
              (l.anisotropy = void 0 !== i.anisotropy ? i.anisotropy : 1),
              void 0 !== i.encoding && (l.encoding = i.encoding),
              void 0 !== i.flipY && (l.flipY = i.flipY),
              void 0 !== i.format && (l.format = i.format),
              void 0 !== i.type && (l.type = i.type),
              void 0 !== i.mipmaps &&
                ((l.mipmaps = i.mipmaps), (l.minFilter = o)),
              1 === i.mipmapCount && (l.minFilter = s),
              (l.needsUpdate = !0),
              e && e(l, i));
          },
          i,
          r
        ),
        l
      );
    },
  })),
    (Co.prototype = Object.assign(Object.create(wo.prototype), {
      constructor: Co,
      load: function (t, e, n, i) {
        const r = new z(),
          s = new To(this.manager);
        return (
          s.setCrossOrigin(this.crossOrigin),
          s.setPath(this.path),
          s.load(
            t,
            function (n) {
              r.image = n;
              const i =
                t.search(/\.jpe?g($|\?)/i) > 0 ||
                0 === t.search(/^data\:image\/jpeg/);
              (r.format = i ? d : p),
                (r.needsUpdate = !0),
                void 0 !== e && e(r);
            },
            n,
            i
          ),
          r
        );
      },
    })),
    Object.assign(Ro.prototype, {
      getPoint: function () {
        return console.warn("THREE.Curve: .getPoint() not implemented."), null;
      },
      getPointAt: function (t, e) {
        const n = this.getUtoTmapping(t);
        return this.getPoint(n, e);
      },
      getPoints: function (t = 5) {
        const e = [];
        for (let n = 0; n <= t; n++) e.push(this.getPoint(n / t));
        return e;
      },
      getSpacedPoints: function (t = 5) {
        const e = [];
        for (let n = 0; n <= t; n++) e.push(this.getPointAt(n / t));
        return e;
      },
      getLength: function () {
        const t = this.getLengths();
        return t[t.length - 1];
      },
      getLengths: function (t) {
        if (
          (void 0 === t && (t = this.arcLengthDivisions),
          this.cacheArcLengths &&
            this.cacheArcLengths.length === t + 1 &&
            !this.needsUpdate)
        )
          return this.cacheArcLengths;
        this.needsUpdate = !1;
        const e = [];
        let n,
          i = this.getPoint(0),
          r = 0;
        e.push(0);
        for (let s = 1; s <= t; s++)
          (n = this.getPoint(s / t)),
            (r += n.distanceTo(i)),
            e.push(r),
            (i = n);
        return (this.cacheArcLengths = e), e;
      },
      updateArcLengths: function () {
        (this.needsUpdate = !0), this.getLengths();
      },
      getUtoTmapping: function (t, e) {
        const n = this.getLengths();
        let i = 0;
        const r = n.length;
        let s;
        s = e || t * n[r - 1];
        let o,
          a = 0,
          l = r - 1;
        for (; a <= l; )
          if (((i = Math.floor(a + (l - a) / 2)), (o = n[i] - s), o < 0))
            a = i + 1;
          else {
            if (!(o > 0)) {
              l = i;
              break;
            }
            l = i - 1;
          }
        if (((i = l), n[i] === s)) return i / (r - 1);
        const c = n[i];
        return (i + (s - c) / (n[i + 1] - c)) / (r - 1);
      },
      getTangent: function (t, e) {
        const n = 1e-4;
        let i = t - n,
          r = t + n;
        i < 0 && (i = 0), r > 1 && (r = 1);
        const s = this.getPoint(i),
          o = this.getPoint(r),
          a = e || (s.isVector2 ? new P() : new k());
        return a.copy(o).sub(s).normalize(), a;
      },
      getTangentAt: function (t, e) {
        const n = this.getUtoTmapping(t);
        return this.getTangent(n, e);
      },
      computeFrenetFrames: function (t, e) {
        const n = new k(),
          i = [],
          r = [],
          s = [],
          o = new k(),
          a = new mt();
        for (let e = 0; e <= t; e++) {
          const n = e / t;
          (i[e] = this.getTangentAt(n, new k())), i[e].normalize();
        }
        (r[0] = new k()), (s[0] = new k());
        let l = Number.MAX_VALUE;
        const c = Math.abs(i[0].x),
          h = Math.abs(i[0].y),
          u = Math.abs(i[0].z);
        c <= l && ((l = c), n.set(1, 0, 0)),
          h <= l && ((l = h), n.set(0, 1, 0)),
          u <= l && n.set(0, 0, 1),
          o.crossVectors(i[0], n).normalize(),
          r[0].crossVectors(i[0], o),
          s[0].crossVectors(i[0], r[0]);
        for (let e = 1; e <= t; e++) {
          if (
            ((r[e] = r[e - 1].clone()),
            (s[e] = s[e - 1].clone()),
            o.crossVectors(i[e - 1], i[e]),
            o.length() > Number.EPSILON)
          ) {
            o.normalize();
            const t = Math.acos(R.clamp(i[e - 1].dot(i[e]), -1, 1));
            r[e].applyMatrix4(a.makeRotationAxis(o, t));
          }
          s[e].crossVectors(i[e], r[e]);
        }
        if (!0 === e) {
          let e = Math.acos(R.clamp(r[0].dot(r[t]), -1, 1));
          (e /= t), i[0].dot(o.crossVectors(r[0], r[t])) > 0 && (e = -e);
          for (let n = 1; n <= t; n++)
            r[n].applyMatrix4(a.makeRotationAxis(i[n], e * n)),
              s[n].crossVectors(i[n], r[n]);
        }
        return { tangents: i, normals: r, binormals: s };
      },
      clone: function () {
        return new this.constructor().copy(this);
      },
      copy: function (t) {
        return (this.arcLengthDivisions = t.arcLengthDivisions), this;
      },
      toJSON: function () {
        const t = {
          metadata: { version: 4.5, type: "Curve", generator: "Curve.toJSON" },
        };
        return (
          (t.arcLengthDivisions = this.arcLengthDivisions),
          (t.type = this.type),
          t
        );
      },
      fromJSON: function (t) {
        return (this.arcLengthDivisions = t.arcLengthDivisions), this;
      },
    });
  class Po extends Ro {
    constructor(
      t = 0,
      e = 0,
      n = 1,
      i = 1,
      r = 0,
      s = 2 * Math.PI,
      o = !1,
      a = 0
    ) {
      super(),
        (this.type = "EllipseCurve"),
        (this.aX = t),
        (this.aY = e),
        (this.xRadius = n),
        (this.yRadius = i),
        (this.aStartAngle = r),
        (this.aEndAngle = s),
        (this.aClockwise = o),
        (this.aRotation = a);
    }
    getPoint(t, e) {
      const n = e || new P(),
        i = 2 * Math.PI;
      let r = this.aEndAngle - this.aStartAngle;
      const s = Math.abs(r) < Number.EPSILON;
      for (; r < 0; ) r += i;
      for (; r > i; ) r -= i;
      r < Number.EPSILON && (r = s ? 0 : i),
        !0 !== this.aClockwise || s || (r === i ? (r = -i) : (r -= i));
      const o = this.aStartAngle + t * r;
      let a = this.aX + this.xRadius * Math.cos(o),
        l = this.aY + this.yRadius * Math.sin(o);
      if (0 !== this.aRotation) {
        const t = Math.cos(this.aRotation),
          e = Math.sin(this.aRotation),
          n = a - this.aX,
          i = l - this.aY;
        (a = n * t - i * e + this.aX), (l = n * e + i * t + this.aY);
      }
      return n.set(a, l);
    }
    copy(t) {
      return (
        super.copy(t),
        (this.aX = t.aX),
        (this.aY = t.aY),
        (this.xRadius = t.xRadius),
        (this.yRadius = t.yRadius),
        (this.aStartAngle = t.aStartAngle),
        (this.aEndAngle = t.aEndAngle),
        (this.aClockwise = t.aClockwise),
        (this.aRotation = t.aRotation),
        this
      );
    }
    toJSON() {
      const t = super.toJSON();
      return (
        (t.aX = this.aX),
        (t.aY = this.aY),
        (t.xRadius = this.xRadius),
        (t.yRadius = this.yRadius),
        (t.aStartAngle = this.aStartAngle),
        (t.aEndAngle = this.aEndAngle),
        (t.aClockwise = this.aClockwise),
        (t.aRotation = this.aRotation),
        t
      );
    }
    fromJSON(t) {
      return (
        super.fromJSON(t),
        (this.aX = t.aX),
        (this.aY = t.aY),
        (this.xRadius = t.xRadius),
        (this.yRadius = t.yRadius),
        (this.aStartAngle = t.aStartAngle),
        (this.aEndAngle = t.aEndAngle),
        (this.aClockwise = t.aClockwise),
        (this.aRotation = t.aRotation),
        this
      );
    }
  }
  Po.prototype.isEllipseCurve = !0;
  class Do extends Po {
    constructor(t, e, n, i, r, s) {
      super(t, e, n, n, i, r, s), (this.type = "ArcCurve");
    }
  }
  function Io() {
    let t = 0,
      e = 0,
      n = 0,
      i = 0;
    function r(r, s, o, a) {
      (t = r),
        (e = o),
        (n = -3 * r + 3 * s - 2 * o - a),
        (i = 2 * r - 2 * s + o + a);
    }
    return {
      initCatmullRom: function (t, e, n, i, s) {
        r(e, n, s * (n - t), s * (i - e));
      },
      initNonuniformCatmullRom: function (t, e, n, i, s, o, a) {
        let l = (e - t) / s - (n - t) / (s + o) + (n - e) / o,
          c = (n - e) / o - (i - e) / (o + a) + (i - n) / a;
        (l *= o), (c *= o), r(e, n, l, c);
      },
      calc: function (r) {
        const s = r * r;
        return t + e * r + n * s + i * (s * r);
      },
    };
  }
  Do.prototype.isArcCurve = !0;
  const No = new k(),
    Oo = new Io(),
    zo = new Io(),
    Bo = new Io();
  class Ho extends Ro {
    constructor(t = [], e = !1, n = "centripetal", i = 0.5) {
      super(),
        (this.type = "CatmullRomCurve3"),
        (this.points = t),
        (this.closed = e),
        (this.curveType = n),
        (this.tension = i);
    }
    getPoint(t, e = new k()) {
      const n = e,
        i = this.points,
        r = i.length,
        s = (r - (this.closed ? 0 : 1)) * t;
      let o,
        a,
        l = Math.floor(s),
        c = s - l;
      this.closed
        ? (l += l > 0 ? 0 : (Math.floor(Math.abs(l) / r) + 1) * r)
        : 0 === c && l === r - 1 && ((l = r - 2), (c = 1)),
        this.closed || l > 0
          ? (o = i[(l - 1) % r])
          : (No.subVectors(i[0], i[1]).add(i[0]), (o = No));
      const h = i[l % r],
        u = i[(l + 1) % r];
      if (
        (this.closed || l + 2 < r
          ? (a = i[(l + 2) % r])
          : (No.subVectors(i[r - 1], i[r - 2]).add(i[r - 1]), (a = No)),
        "centripetal" === this.curveType || "chordal" === this.curveType)
      ) {
        const t = "chordal" === this.curveType ? 0.5 : 0.25;
        let e = Math.pow(o.distanceToSquared(h), t),
          n = Math.pow(h.distanceToSquared(u), t),
          i = Math.pow(u.distanceToSquared(a), t);
        n < 1e-4 && (n = 1),
          e < 1e-4 && (e = n),
          i < 1e-4 && (i = n),
          Oo.initNonuniformCatmullRom(o.x, h.x, u.x, a.x, e, n, i),
          zo.initNonuniformCatmullRom(o.y, h.y, u.y, a.y, e, n, i),
          Bo.initNonuniformCatmullRom(o.z, h.z, u.z, a.z, e, n, i);
      } else
        "catmullrom" === this.curveType &&
          (Oo.initCatmullRom(o.x, h.x, u.x, a.x, this.tension),
          zo.initCatmullRom(o.y, h.y, u.y, a.y, this.tension),
          Bo.initCatmullRom(o.z, h.z, u.z, a.z, this.tension));
      return n.set(Oo.calc(c), zo.calc(c), Bo.calc(c)), n;
    }
    copy(t) {
      super.copy(t), (this.points = []);
      for (let e = 0, n = t.points.length; e < n; e++) {
        const n = t.points[e];
        this.points.push(n.clone());
      }
      return (
        (this.closed = t.closed),
        (this.curveType = t.curveType),
        (this.tension = t.tension),
        this
      );
    }
    toJSON() {
      const t = super.toJSON();
      t.points = [];
      for (let e = 0, n = this.points.length; e < n; e++) {
        const n = this.points[e];
        t.points.push(n.toArray());
      }
      return (
        (t.closed = this.closed),
        (t.curveType = this.curveType),
        (t.tension = this.tension),
        t
      );
    }
    fromJSON(t) {
      super.fromJSON(t), (this.points = []);
      for (let e = 0, n = t.points.length; e < n; e++) {
        const n = t.points[e];
        this.points.push(new k().fromArray(n));
      }
      return (
        (this.closed = t.closed),
        (this.curveType = t.curveType),
        (this.tension = t.tension),
        this
      );
    }
  }
  function Fo(t, e, n, i, r) {
    const s = 0.5 * (i - e),
      o = 0.5 * (r - n),
      a = t * t;
    return (
      (2 * n - 2 * i + s + o) * (t * a) +
      (-3 * n + 3 * i - 2 * s - o) * a +
      s * t +
      n
    );
  }
  function Uo(t, e, n, i) {
    return (
      (function (t, e) {
        const n = 1 - t;
        return n * n * e;
      })(t, e) +
      (function (t, e) {
        return 2 * (1 - t) * t * e;
      })(t, n) +
      (function (t, e) {
        return t * t * e;
      })(t, i)
    );
  }
  function ko(t, e, n, i, r) {
    return (
      (function (t, e) {
        const n = 1 - t;
        return n * n * n * e;
      })(t, e) +
      (function (t, e) {
        const n = 1 - t;
        return 3 * n * n * t * e;
      })(t, n) +
      (function (t, e) {
        return 3 * (1 - t) * t * t * e;
      })(t, i) +
      (function (t, e) {
        return t * t * t * e;
      })(t, r)
    );
  }
  Ho.prototype.isCatmullRomCurve3 = !0;
  class Go extends Ro {
    constructor(t = new P(), e = new P(), n = new P(), i = new P()) {
      super(),
        (this.type = "CubicBezierCurve"),
        (this.v0 = t),
        (this.v1 = e),
        (this.v2 = n),
        (this.v3 = i);
    }
    getPoint(t, e = new P()) {
      const n = e,
        i = this.v0,
        r = this.v1,
        s = this.v2,
        o = this.v3;
      return n.set(ko(t, i.x, r.x, s.x, o.x), ko(t, i.y, r.y, s.y, o.y)), n;
    }
    copy(t) {
      return (
        super.copy(t),
        this.v0.copy(t.v0),
        this.v1.copy(t.v1),
        this.v2.copy(t.v2),
        this.v3.copy(t.v3),
        this
      );
    }
    toJSON() {
      const t = super.toJSON();
      return (
        (t.v0 = this.v0.toArray()),
        (t.v1 = this.v1.toArray()),
        (t.v2 = this.v2.toArray()),
        (t.v3 = this.v3.toArray()),
        t
      );
    }
    fromJSON(t) {
      return (
        super.fromJSON(t),
        this.v0.fromArray(t.v0),
        this.v1.fromArray(t.v1),
        this.v2.fromArray(t.v2),
        this.v3.fromArray(t.v3),
        this
      );
    }
  }
  Go.prototype.isCubicBezierCurve = !0;
  class Vo extends Ro {
    constructor(t = new k(), e = new k(), n = new k(), i = new k()) {
      super(),
        (this.type = "CubicBezierCurve3"),
        (this.v0 = t),
        (this.v1 = e),
        (this.v2 = n),
        (this.v3 = i);
    }
    getPoint(t, e = new k()) {
      const n = e,
        i = this.v0,
        r = this.v1,
        s = this.v2,
        o = this.v3;
      return (
        n.set(
          ko(t, i.x, r.x, s.x, o.x),
          ko(t, i.y, r.y, s.y, o.y),
          ko(t, i.z, r.z, s.z, o.z)
        ),
        n
      );
    }
    copy(t) {
      return (
        super.copy(t),
        this.v0.copy(t.v0),
        this.v1.copy(t.v1),
        this.v2.copy(t.v2),
        this.v3.copy(t.v3),
        this
      );
    }
    toJSON() {
      const t = super.toJSON();
      return (
        (t.v0 = this.v0.toArray()),
        (t.v1 = this.v1.toArray()),
        (t.v2 = this.v2.toArray()),
        (t.v3 = this.v3.toArray()),
        t
      );
    }
    fromJSON(t) {
      return (
        super.fromJSON(t),
        this.v0.fromArray(t.v0),
        this.v1.fromArray(t.v1),
        this.v2.fromArray(t.v2),
        this.v3.fromArray(t.v3),
        this
      );
    }
  }
  Vo.prototype.isCubicBezierCurve3 = !0;
  class Wo extends Ro {
    constructor(t = new P(), e = new P()) {
      super(), (this.type = "LineCurve"), (this.v1 = t), (this.v2 = e);
    }
    getPoint(t, e = new P()) {
      const n = e;
      return (
        1 === t
          ? n.copy(this.v2)
          : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(t).add(this.v1)),
        n
      );
    }
    getPointAt(t, e) {
      return this.getPoint(t, e);
    }
    getTangent(t, e) {
      const n = e || new P();
      return n.copy(this.v2).sub(this.v1).normalize(), n;
    }
    copy(t) {
      return super.copy(t), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
    }
    toJSON() {
      const t = super.toJSON();
      return (t.v1 = this.v1.toArray()), (t.v2 = this.v2.toArray()), t;
    }
    fromJSON(t) {
      return (
        super.fromJSON(t),
        this.v1.fromArray(t.v1),
        this.v2.fromArray(t.v2),
        this
      );
    }
  }
  Wo.prototype.isLineCurve = !0;
  class jo extends Ro {
    constructor(t = new P(), e = new P(), n = new P()) {
      super(),
        (this.type = "QuadraticBezierCurve"),
        (this.v0 = t),
        (this.v1 = e),
        (this.v2 = n);
    }
    getPoint(t, e = new P()) {
      const n = e,
        i = this.v0,
        r = this.v1,
        s = this.v2;
      return n.set(Uo(t, i.x, r.x, s.x), Uo(t, i.y, r.y, s.y)), n;
    }
    copy(t) {
      return (
        super.copy(t),
        this.v0.copy(t.v0),
        this.v1.copy(t.v1),
        this.v2.copy(t.v2),
        this
      );
    }
    toJSON() {
      const t = super.toJSON();
      return (
        (t.v0 = this.v0.toArray()),
        (t.v1 = this.v1.toArray()),
        (t.v2 = this.v2.toArray()),
        t
      );
    }
    fromJSON(t) {
      return (
        super.fromJSON(t),
        this.v0.fromArray(t.v0),
        this.v1.fromArray(t.v1),
        this.v2.fromArray(t.v2),
        this
      );
    }
  }
  jo.prototype.isQuadraticBezierCurve = !0;
  class qo extends Ro {
    constructor(t = new k(), e = new k(), n = new k()) {
      super(),
        (this.type = "QuadraticBezierCurve3"),
        (this.v0 = t),
        (this.v1 = e),
        (this.v2 = n);
    }
    getPoint(t, e = new k()) {
      const n = e,
        i = this.v0,
        r = this.v1,
        s = this.v2;
      return (
        n.set(Uo(t, i.x, r.x, s.x), Uo(t, i.y, r.y, s.y), Uo(t, i.z, r.z, s.z)),
        n
      );
    }
    copy(t) {
      return (
        super.copy(t),
        this.v0.copy(t.v0),
        this.v1.copy(t.v1),
        this.v2.copy(t.v2),
        this
      );
    }
    toJSON() {
      const t = super.toJSON();
      return (
        (t.v0 = this.v0.toArray()),
        (t.v1 = this.v1.toArray()),
        (t.v2 = this.v2.toArray()),
        t
      );
    }
    fromJSON(t) {
      return (
        super.fromJSON(t),
        this.v0.fromArray(t.v0),
        this.v1.fromArray(t.v1),
        this.v2.fromArray(t.v2),
        this
      );
    }
  }
  qo.prototype.isQuadraticBezierCurve3 = !0;
  class Xo extends Ro {
    constructor(t = []) {
      super(), (this.type = "SplineCurve"), (this.points = t);
    }
    getPoint(t, e = new P()) {
      const n = e,
        i = this.points,
        r = (i.length - 1) * t,
        s = Math.floor(r),
        o = r - s,
        a = i[0 === s ? s : s - 1],
        l = i[s],
        c = i[s > i.length - 2 ? i.length - 1 : s + 1],
        h = i[s > i.length - 3 ? i.length - 1 : s + 2];
      return n.set(Fo(o, a.x, l.x, c.x, h.x), Fo(o, a.y, l.y, c.y, h.y)), n;
    }
    copy(t) {
      super.copy(t), (this.points = []);
      for (let e = 0, n = t.points.length; e < n; e++) {
        const n = t.points[e];
        this.points.push(n.clone());
      }
      return this;
    }
    toJSON() {
      const t = super.toJSON();
      t.points = [];
      for (let e = 0, n = this.points.length; e < n; e++) {
        const n = this.points[e];
        t.points.push(n.toArray());
      }
      return t;
    }
    fromJSON(t) {
      super.fromJSON(t), (this.points = []);
      for (let e = 0, n = t.points.length; e < n; e++) {
        const n = t.points[e];
        this.points.push(new P().fromArray(n));
      }
      return this;
    }
  }
  Xo.prototype.isSplineCurve = !0;
  var Yo = Object.freeze({
    __proto__: null,
    ArcCurve: Do,
    CatmullRomCurve3: Ho,
    CubicBezierCurve: Go,
    CubicBezierCurve3: Vo,
    EllipseCurve: Po,
    LineCurve: Wo,
    LineCurve3: class extends Ro {
      constructor(t = new k(), e = new k()) {
        super(),
          (this.type = "LineCurve3"),
          (this.isLineCurve3 = !0),
          (this.v1 = t),
          (this.v2 = e);
      }
      getPoint(t, e = new k()) {
        const n = e;
        return (
          1 === t
            ? n.copy(this.v2)
            : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(t).add(this.v1)),
          n
        );
      }
      getPointAt(t, e) {
        return this.getPoint(t, e);
      }
      copy(t) {
        return super.copy(t), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
      }
      toJSON() {
        const t = super.toJSON();
        return (t.v1 = this.v1.toArray()), (t.v2 = this.v2.toArray()), t;
      }
      fromJSON(t) {
        return (
          super.fromJSON(t),
          this.v1.fromArray(t.v1),
          this.v2.fromArray(t.v2),
          this
        );
      }
    },
    QuadraticBezierCurve: jo,
    QuadraticBezierCurve3: qo,
    SplineCurve: Xo,
  });
  class Jo extends Ro {
    constructor() {
      super(),
        (this.type = "CurvePath"),
        (this.curves = []),
        (this.autoClose = !1);
    }
    add(t) {
      this.curves.push(t);
    }
    closePath() {
      const t = this.curves[0].getPoint(0),
        e = this.curves[this.curves.length - 1].getPoint(1);
      t.equals(e) || this.curves.push(new Wo(e, t));
    }
    getPoint(t) {
      const e = t * this.getLength(),
        n = this.getCurveLengths();
      let i = 0;
      for (; i < n.length; ) {
        if (n[i] >= e) {
          const t = n[i] - e,
            r = this.curves[i],
            s = r.getLength(),
            o = 0 === s ? 0 : 1 - t / s;
          return r.getPointAt(o);
        }
        i++;
      }
      return null;
    }
    getLength() {
      const t = this.getCurveLengths();
      return t[t.length - 1];
    }
    updateArcLengths() {
      (this.needsUpdate = !0),
        (this.cacheLengths = null),
        this.getCurveLengths();
    }
    getCurveLengths() {
      if (this.cacheLengths && this.cacheLengths.length === this.curves.length)
        return this.cacheLengths;
      const t = [];
      let e = 0;
      for (let n = 0, i = this.curves.length; n < i; n++)
        (e += this.curves[n].getLength()), t.push(e);
      return (this.cacheLengths = t), t;
    }
    getSpacedPoints(t = 40) {
      const e = [];
      for (let n = 0; n <= t; n++) e.push(this.getPoint(n / t));
      return this.autoClose && e.push(e[0]), e;
    }
    getPoints(t = 12) {
      const e = [];
      let n;
      for (let i = 0, r = this.curves; i < r.length; i++) {
        const s = r[i],
          o =
            s && s.isEllipseCurve
              ? 2 * t
              : s && (s.isLineCurve || s.isLineCurve3)
              ? 1
              : s && s.isSplineCurve
              ? t * s.points.length
              : t,
          a = s.getPoints(o);
        for (let t = 0; t < a.length; t++) {
          const i = a[t];
          (n && n.equals(i)) || (e.push(i), (n = i));
        }
      }
      return (
        this.autoClose &&
          e.length > 1 &&
          !e[e.length - 1].equals(e[0]) &&
          e.push(e[0]),
        e
      );
    }
    copy(t) {
      super.copy(t), (this.curves = []);
      for (let e = 0, n = t.curves.length; e < n; e++) {
        const n = t.curves[e];
        this.curves.push(n.clone());
      }
      return (this.autoClose = t.autoClose), this;
    }
    toJSON() {
      const t = super.toJSON();
      (t.autoClose = this.autoClose), (t.curves = []);
      for (let e = 0, n = this.curves.length; e < n; e++) {
        const n = this.curves[e];
        t.curves.push(n.toJSON());
      }
      return t;
    }
    fromJSON(t) {
      super.fromJSON(t), (this.autoClose = t.autoClose), (this.curves = []);
      for (let e = 0, n = t.curves.length; e < n; e++) {
        const n = t.curves[e];
        this.curves.push(new Yo[n.type]().fromJSON(n));
      }
      return this;
    }
  }
  class Zo extends Jo {
    constructor(t) {
      super(),
        (this.type = "Path"),
        (this.currentPoint = new P()),
        t && this.setFromPoints(t);
    }
    setFromPoints(t) {
      this.moveTo(t[0].x, t[0].y);
      for (let e = 1, n = t.length; e < n; e++) this.lineTo(t[e].x, t[e].y);
      return this;
    }
    moveTo(t, e) {
      return this.currentPoint.set(t, e), this;
    }
    lineTo(t, e) {
      const n = new Wo(this.currentPoint.clone(), new P(t, e));
      return this.curves.push(n), this.currentPoint.set(t, e), this;
    }
    quadraticCurveTo(t, e, n, i) {
      const r = new jo(this.currentPoint.clone(), new P(t, e), new P(n, i));
      return this.curves.push(r), this.currentPoint.set(n, i), this;
    }
    bezierCurveTo(t, e, n, i, r, s) {
      const o = new Go(
        this.currentPoint.clone(),
        new P(t, e),
        new P(n, i),
        new P(r, s)
      );
      return this.curves.push(o), this.currentPoint.set(r, s), this;
    }
    splineThru(t) {
      const e = [this.currentPoint.clone()].concat(t),
        n = new Xo(e);
      return this.curves.push(n), this.currentPoint.copy(t[t.length - 1]), this;
    }
    arc(t, e, n, i, r, s) {
      const o = this.currentPoint.x,
        a = this.currentPoint.y;
      return this.absarc(t + o, e + a, n, i, r, s), this;
    }
    absarc(t, e, n, i, r, s) {
      return this.absellipse(t, e, n, n, i, r, s), this;
    }
    ellipse(t, e, n, i, r, s, o, a) {
      const l = this.currentPoint.x,
        c = this.currentPoint.y;
      return this.absellipse(t + l, e + c, n, i, r, s, o, a), this;
    }
    absellipse(t, e, n, i, r, s, o, a) {
      const l = new Po(t, e, n, i, r, s, o, a);
      if (this.curves.length > 0) {
        const t = l.getPoint(0);
        t.equals(this.currentPoint) || this.lineTo(t.x, t.y);
      }
      this.curves.push(l);
      const c = l.getPoint(1);
      return this.currentPoint.copy(c), this;
    }
    copy(t) {
      return super.copy(t), this.currentPoint.copy(t.currentPoint), this;
    }
    toJSON() {
      const t = super.toJSON();
      return (t.currentPoint = this.currentPoint.toArray()), t;
    }
    fromJSON(t) {
      return (
        super.fromJSON(t), this.currentPoint.fromArray(t.currentPoint), this
      );
    }
  }
  class Qo extends Zo {
    constructor(t) {
      super(t),
        (this.uuid = R.generateUUID()),
        (this.type = "Shape"),
        (this.holes = []);
    }
    getPointsHoles(t) {
      const e = [];
      for (let n = 0, i = this.holes.length; n < i; n++)
        e[n] = this.holes[n].getPoints(t);
      return e;
    }
    extractPoints(t) {
      return { shape: this.getPoints(t), holes: this.getPointsHoles(t) };
    }
    copy(t) {
      super.copy(t), (this.holes = []);
      for (let e = 0, n = t.holes.length; e < n; e++) {
        const n = t.holes[e];
        this.holes.push(n.clone());
      }
      return this;
    }
    toJSON() {
      const t = super.toJSON();
      (t.uuid = this.uuid), (t.holes = []);
      for (let e = 0, n = this.holes.length; e < n; e++) {
        const n = this.holes[e];
        t.holes.push(n.toJSON());
      }
      return t;
    }
    fromJSON(t) {
      super.fromJSON(t), (this.uuid = t.uuid), (this.holes = []);
      for (let e = 0, n = t.holes.length; e < n; e++) {
        const n = t.holes[e];
        this.holes.push(new Zo().fromJSON(n));
      }
      return this;
    }
  }
  class Ko extends Ut {
    constructor(t, e = 1) {
      super(),
        (this.type = "Light"),
        (this.color = new he(t)),
        (this.intensity = e);
    }
    copy(t) {
      return (
        super.copy(t),
        this.color.copy(t.color),
        (this.intensity = t.intensity),
        this
      );
    }
    toJSON(t) {
      const e = super.toJSON(t);
      return (
        (e.object.color = this.color.getHex()),
        (e.object.intensity = this.intensity),
        void 0 !== this.groundColor &&
          (e.object.groundColor = this.groundColor.getHex()),
        void 0 !== this.distance && (e.object.distance = this.distance),
        void 0 !== this.angle && (e.object.angle = this.angle),
        void 0 !== this.decay && (e.object.decay = this.decay),
        void 0 !== this.penumbra && (e.object.penumbra = this.penumbra),
        void 0 !== this.shadow && (e.object.shadow = this.shadow.toJSON()),
        e
      );
    }
  }
  Ko.prototype.isLight = !0;
  (class extends Ko {
    constructor(t, e, n) {
      super(t, n),
        (this.type = "HemisphereLight"),
        this.position.copy(Ut.DefaultUp),
        this.updateMatrix(),
        (this.groundColor = new he(e));
    }
    copy(t) {
      return (
        Ko.prototype.copy.call(this, t),
        this.groundColor.copy(t.groundColor),
        this
      );
    }
  }.prototype.isHemisphereLight = !0);
  const $o = new mt(),
    ta = new k(),
    ea = new k();
  class na {
    constructor(t) {
      (this.camera = t),
        (this.bias = 0),
        (this.normalBias = 0),
        (this.radius = 1),
        (this.mapSize = new P(512, 512)),
        (this.map = null),
        (this.mapPass = null),
        (this.matrix = new mt()),
        (this.autoUpdate = !0),
        (this.needsUpdate = !1),
        (this._frustum = new fn()),
        (this._frameExtents = new P(1, 1)),
        (this._viewportCount = 1),
        (this._viewports = [new H(0, 0, 1, 1)]);
    }
    getViewportCount() {
      return this._viewportCount;
    }
    getFrustum() {
      return this._frustum;
    }
    updateMatrices(t) {
      const e = this.camera,
        n = this.matrix;
      ta.setFromMatrixPosition(t.matrixWorld),
        e.position.copy(ta),
        ea.setFromMatrixPosition(t.target.matrixWorld),
        e.lookAt(ea),
        e.updateMatrixWorld(),
        $o.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse),
        this._frustum.setFromProjectionMatrix($o),
        n.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1),
        n.multiply(e.projectionMatrix),
        n.multiply(e.matrixWorldInverse);
    }
    getViewport(t) {
      return this._viewports[t];
    }
    getFrameExtents() {
      return this._frameExtents;
    }
    copy(t) {
      return (
        (this.camera = t.camera.clone()),
        (this.bias = t.bias),
        (this.radius = t.radius),
        this.mapSize.copy(t.mapSize),
        this
      );
    }
    clone() {
      return new this.constructor().copy(this);
    }
    toJSON() {
      const t = {};
      return (
        0 !== this.bias && (t.bias = this.bias),
        0 !== this.normalBias && (t.normalBias = this.normalBias),
        1 !== this.radius && (t.radius = this.radius),
        (512 === this.mapSize.x && 512 === this.mapSize.y) ||
          (t.mapSize = this.mapSize.toArray()),
        (t.camera = this.camera.toJSON(!1).object),
        delete t.camera.matrix,
        t
      );
    }
  }
  class ia extends na {
    constructor() {
      super(new on(50, 1, 0.5, 500)), (this.focus = 1);
    }
    updateMatrices(t) {
      const e = this.camera,
        n = 2 * R.RAD2DEG * t.angle * this.focus,
        i = this.mapSize.width / this.mapSize.height,
        r = t.distance || e.far;
      (n === e.fov && i === e.aspect && r === e.far) ||
        ((e.fov = n), (e.aspect = i), (e.far = r), e.updateProjectionMatrix()),
        super.updateMatrices(t);
    }
  }
  ia.prototype.isSpotLightShadow = !0;
  (class extends Ko {
    constructor(t, e, n = 0, i = Math.PI / 3, r = 0, s = 1) {
      super(t, e),
        (this.type = "SpotLight"),
        this.position.copy(Ut.DefaultUp),
        this.updateMatrix(),
        (this.target = new Ut()),
        (this.distance = n),
        (this.angle = i),
        (this.penumbra = r),
        (this.decay = s),
        (this.shadow = new ia());
    }
    get power() {
      return this.intensity * Math.PI;
    }
    set power(t) {
      this.intensity = t / Math.PI;
    }
    copy(t) {
      return (
        super.copy(t),
        (this.distance = t.distance),
        (this.angle = t.angle),
        (this.penumbra = t.penumbra),
        (this.decay = t.decay),
        (this.target = t.target.clone()),
        (this.shadow = t.shadow.clone()),
        this
      );
    }
  }.prototype.isSpotLight = !0);
  const ra = new mt(),
    sa = new k(),
    oa = new k();
  class aa extends na {
    constructor() {
      super(new on(90, 1, 0.5, 500)),
        (this._frameExtents = new P(4, 2)),
        (this._viewportCount = 6),
        (this._viewports = [
          new H(2, 1, 1, 1),
          new H(0, 1, 1, 1),
          new H(3, 1, 1, 1),
          new H(1, 1, 1, 1),
          new H(3, 0, 1, 1),
          new H(1, 0, 1, 1),
        ]),
        (this._cubeDirections = [
          new k(1, 0, 0),
          new k(-1, 0, 0),
          new k(0, 0, 1),
          new k(0, 0, -1),
          new k(0, 1, 0),
          new k(0, -1, 0),
        ]),
        (this._cubeUps = [
          new k(0, 1, 0),
          new k(0, 1, 0),
          new k(0, 1, 0),
          new k(0, 1, 0),
          new k(0, 0, 1),
          new k(0, 0, -1),
        ]);
    }
    updateMatrices(t, e = 0) {
      const n = this.camera,
        i = this.matrix;
      sa.setFromMatrixPosition(t.matrixWorld),
        n.position.copy(sa),
        oa.copy(n.position),
        oa.add(this._cubeDirections[e]),
        n.up.copy(this._cubeUps[e]),
        n.lookAt(oa),
        n.updateMatrixWorld(),
        i.makeTranslation(-sa.x, -sa.y, -sa.z),
        ra.multiplyMatrices(n.projectionMatrix, n.matrixWorldInverse),
        this._frustum.setFromProjectionMatrix(ra);
    }
  }
  aa.prototype.isPointLightShadow = !0;
  class la extends Ko {
    constructor(t, e, n = 0, i = 1) {
      super(t, e),
        (this.type = "PointLight"),
        (this.distance = n),
        (this.decay = i),
        (this.shadow = new aa());
    }
    get power() {
      return 4 * this.intensity * Math.PI;
    }
    set power(t) {
      this.intensity = t / (4 * Math.PI);
    }
    copy(t) {
      return (
        super.copy(t),
        (this.distance = t.distance),
        (this.decay = t.decay),
        (this.shadow = t.shadow.clone()),
        this
      );
    }
  }
  la.prototype.isPointLight = !0;
  class ca extends sn {
    constructor(t = -1, e = 1, n = 1, i = -1, r = 0.1, s = 2e3) {
      super(),
        (this.type = "OrthographicCamera"),
        (this.zoom = 1),
        (this.view = null),
        (this.left = t),
        (this.right = e),
        (this.top = n),
        (this.bottom = i),
        (this.near = r),
        (this.far = s),
        this.updateProjectionMatrix();
    }
    copy(t, e) {
      return (
        super.copy(t, e),
        (this.left = t.left),
        (this.right = t.right),
        (this.top = t.top),
        (this.bottom = t.bottom),
        (this.near = t.near),
        (this.far = t.far),
        (this.zoom = t.zoom),
        (this.view = null === t.view ? null : Object.assign({}, t.view)),
        this
      );
    }
    setViewOffset(t, e, n, i, r, s) {
      null === this.view &&
        (this.view = {
          enabled: !0,
          fullWidth: 1,
          fullHeight: 1,
          offsetX: 0,
          offsetY: 0,
          width: 1,
          height: 1,
        }),
        (this.view.enabled = !0),
        (this.view.fullWidth = t),
        (this.view.fullHeight = e),
        (this.view.offsetX = n),
        (this.view.offsetY = i),
        (this.view.width = r),
        (this.view.height = s),
        this.updateProjectionMatrix();
    }
    clearViewOffset() {
      null !== this.view && (this.view.enabled = !1),
        this.updateProjectionMatrix();
    }
    updateProjectionMatrix() {
      const t = (this.right - this.left) / (2 * this.zoom),
        e = (this.top - this.bottom) / (2 * this.zoom),
        n = (this.right + this.left) / 2,
        i = (this.top + this.bottom) / 2;
      let r = n - t,
        s = n + t,
        o = i + e,
        a = i - e;
      if (null !== this.view && this.view.enabled) {
        const t = (this.right - this.left) / this.view.fullWidth / this.zoom,
          e = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
        (r += t * this.view.offsetX),
          (s = r + t * this.view.width),
          (o -= e * this.view.offsetY),
          (a = o - e * this.view.height);
      }
      this.projectionMatrix.makeOrthographic(r, s, o, a, this.near, this.far),
        this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
    }
    toJSON(t) {
      const e = Ut.prototype.toJSON.call(this, t);
      return (
        (e.object.zoom = this.zoom),
        (e.object.left = this.left),
        (e.object.right = this.right),
        (e.object.top = this.top),
        (e.object.bottom = this.bottom),
        (e.object.near = this.near),
        (e.object.far = this.far),
        null !== this.view && (e.object.view = Object.assign({}, this.view)),
        e
      );
    }
  }
  ca.prototype.isOrthographicCamera = !0;
  class ha extends na {
    constructor() {
      super(new ca(-5, 5, 5, -5, 0.5, 500));
    }
  }
  ha.prototype.isDirectionalLightShadow = !0;
  (class extends Ko {
    constructor(t, e) {
      super(t, e),
        (this.type = "DirectionalLight"),
        this.position.copy(Ut.DefaultUp),
        this.updateMatrix(),
        (this.target = new Ut()),
        (this.shadow = new ha());
    }
    copy(t) {
      return (
        super.copy(t),
        (this.target = t.target.clone()),
        (this.shadow = t.shadow.clone()),
        this
      );
    }
  }.prototype.isDirectionalLight = !0);
  (class extends Ko {
    constructor(t, e) {
      super(t, e), (this.type = "AmbientLight");
    }
  }.prototype.isAmbientLight = !0);
  (class extends Ko {
    constructor(t, e, n = 10, i = 10) {
      super(t, e),
        (this.type = "RectAreaLight"),
        (this.width = n),
        (this.height = i);
    }
    copy(t) {
      return (
        super.copy(t), (this.width = t.width), (this.height = t.height), this
      );
    }
    toJSON(t) {
      const e = super.toJSON(t);
      return (e.object.width = this.width), (e.object.height = this.height), e;
    }
  }.prototype.isRectAreaLight = !0);
  class ua {
    constructor() {
      this.coefficients = [];
      for (let t = 0; t < 9; t++) this.coefficients.push(new k());
    }
    set(t) {
      for (let e = 0; e < 9; e++) this.coefficients[e].copy(t[e]);
      return this;
    }
    zero() {
      for (let t = 0; t < 9; t++) this.coefficients[t].set(0, 0, 0);
      return this;
    }
    getAt(t, e) {
      const n = t.x,
        i = t.y,
        r = t.z,
        s = this.coefficients;
      return (
        e.copy(s[0]).multiplyScalar(0.282095),
        e.addScaledVector(s[1], 0.488603 * i),
        e.addScaledVector(s[2], 0.488603 * r),
        e.addScaledVector(s[3], 0.488603 * n),
        e.addScaledVector(s[4], n * i * 1.092548),
        e.addScaledVector(s[5], i * r * 1.092548),
        e.addScaledVector(s[6], 0.315392 * (3 * r * r - 1)),
        e.addScaledVector(s[7], n * r * 1.092548),
        e.addScaledVector(s[8], 0.546274 * (n * n - i * i)),
        e
      );
    }
    getIrradianceAt(t, e) {
      const n = t.x,
        i = t.y,
        r = t.z,
        s = this.coefficients;
      return (
        e.copy(s[0]).multiplyScalar(0.886227),
        e.addScaledVector(s[1], 1.023328 * i),
        e.addScaledVector(s[2], 1.023328 * r),
        e.addScaledVector(s[3], 1.023328 * n),
        e.addScaledVector(s[4], 0.858086 * n * i),
        e.addScaledVector(s[5], 0.858086 * i * r),
        e.addScaledVector(s[6], 0.743125 * r * r - 0.247708),
        e.addScaledVector(s[7], 0.858086 * n * r),
        e.addScaledVector(s[8], 0.429043 * (n * n - i * i)),
        e
      );
    }
    add(t) {
      for (let e = 0; e < 9; e++) this.coefficients[e].add(t.coefficients[e]);
      return this;
    }
    addScaledSH(t, e) {
      for (let n = 0; n < 9; n++)
        this.coefficients[n].addScaledVector(t.coefficients[n], e);
      return this;
    }
    scale(t) {
      for (let e = 0; e < 9; e++) this.coefficients[e].multiplyScalar(t);
      return this;
    }
    lerp(t, e) {
      for (let n = 0; n < 9; n++)
        this.coefficients[n].lerp(t.coefficients[n], e);
      return this;
    }
    equals(t) {
      for (let e = 0; e < 9; e++)
        if (!this.coefficients[e].equals(t.coefficients[e])) return !1;
      return !0;
    }
    copy(t) {
      return this.set(t.coefficients);
    }
    clone() {
      return new this.constructor().copy(this);
    }
    fromArray(t, e = 0) {
      const n = this.coefficients;
      for (let i = 0; i < 9; i++) n[i].fromArray(t, e + 3 * i);
      return this;
    }
    toArray(t = [], e = 0) {
      const n = this.coefficients;
      for (let i = 0; i < 9; i++) n[i].toArray(t, e + 3 * i);
      return t;
    }
    static getBasisAt(t, e) {
      const n = t.x,
        i = t.y,
        r = t.z;
      (e[0] = 0.282095),
        (e[1] = 0.488603 * i),
        (e[2] = 0.488603 * r),
        (e[3] = 0.488603 * n),
        (e[4] = 1.092548 * n * i),
        (e[5] = 1.092548 * i * r),
        (e[6] = 0.315392 * (3 * r * r - 1)),
        (e[7] = 1.092548 * n * r),
        (e[8] = 0.546274 * (n * n - i * i));
    }
  }
  ua.prototype.isSphericalHarmonics3 = !0;
  class da extends Ko {
    constructor(t = new ua(), e = 1) {
      super(void 0, e), (this.sh = t);
    }
    copy(t) {
      return super.copy(t), this.sh.copy(t.sh), this;
    }
    fromJSON(t) {
      return (this.intensity = t.intensity), this.sh.fromArray(t.sh), this;
    }
    toJSON(t) {
      const e = super.toJSON(t);
      return (e.object.sh = this.sh.toArray()), e;
    }
  }
  da.prototype.isLightProbe = !0;
  function pa() {
    Ie.call(this),
      (this.type = "InstancedBufferGeometry"),
      (this.instanceCount = 1 / 0);
  }
  function fa(t, e, n, i) {
    "number" == typeof n &&
      ((i = n),
      (n = !1),
      console.error(
        "THREE.InstancedBufferAttribute: The constructor now expects normalized as the third argument."
      )),
      fe.call(this, t, e, n),
      (this.meshPerAttribute = i || 1);
  }
  function ma(t) {
    "undefined" == typeof createImageBitmap &&
      console.warn(
        "THREE.ImageBitmapLoader: createImageBitmap() not supported."
      ),
      "undefined" == typeof fetch &&
        console.warn("THREE.ImageBitmapLoader: fetch() not supported."),
      wo.call(this, t),
      (this.options = { premultiplyAlpha: "none" });
  }
  (pa.prototype = Object.assign(Object.create(Ie.prototype), {
    constructor: pa,
    isInstancedBufferGeometry: !0,
    copy: function (t) {
      return (
        Ie.prototype.copy.call(this, t),
        (this.instanceCount = t.instanceCount),
        this
      );
    },
    clone: function () {
      return new this.constructor().copy(this);
    },
    toJSON: function () {
      const t = Ie.prototype.toJSON.call(this);
      return (
        (t.instanceCount = this.instanceCount),
        (t.isInstancedBufferGeometry = !0),
        t
      );
    },
  })),
    (fa.prototype = Object.assign(Object.create(fe.prototype), {
      constructor: fa,
      isInstancedBufferAttribute: !0,
      copy: function (t) {
        return (
          fe.prototype.copy.call(this, t),
          (this.meshPerAttribute = t.meshPerAttribute),
          this
        );
      },
      toJSON: function () {
        const t = fe.prototype.toJSON.call(this);
        return (
          (t.meshPerAttribute = this.meshPerAttribute),
          (t.isInstancedBufferAttribute = !0),
          t
        );
      },
    })),
    (ma.prototype = Object.assign(Object.create(wo.prototype), {
      constructor: ma,
      isImageBitmapLoader: !0,
      setOptions: function (t) {
        return (this.options = t), this;
      },
      load: function (t, e, n, i) {
        void 0 === t && (t = ""),
          void 0 !== this.path && (t = this.path + t),
          (t = this.manager.resolveURL(t));
        const r = this,
          s = xo.get(t);
        if (void 0 !== s)
          return (
            r.manager.itemStart(t),
            setTimeout(function () {
              e && e(s), r.manager.itemEnd(t);
            }, 0),
            s
          );
        const o = {};
        (o.credentials =
          "anonymous" === this.crossOrigin ? "same-origin" : "include"),
          (o.headers = this.requestHeader),
          fetch(t, o)
            .then(function (t) {
              return t.blob();
            })
            .then(function (t) {
              return createImageBitmap(
                t,
                Object.assign(r.options, { colorSpaceConversion: "none" })
              );
            })
            .then(function (n) {
              xo.add(t, n), e && e(n), r.manager.itemEnd(t);
            })
            .catch(function (e) {
              i && i(e), r.manager.itemError(t), r.manager.itemEnd(t);
            }),
          r.manager.itemStart(t);
      },
    }));
  class ga {
    constructor() {
      (this.type = "ShapePath"),
        (this.color = new he()),
        (this.subPaths = []),
        (this.currentPath = null);
    }
    moveTo(t, e) {
      return (
        (this.currentPath = new Zo()),
        this.subPaths.push(this.currentPath),
        this.currentPath.moveTo(t, e),
        this
      );
    }
    lineTo(t, e) {
      return this.currentPath.lineTo(t, e), this;
    }
    quadraticCurveTo(t, e, n, i) {
      return this.currentPath.quadraticCurveTo(t, e, n, i), this;
    }
    bezierCurveTo(t, e, n, i, r, s) {
      return this.currentPath.bezierCurveTo(t, e, n, i, r, s), this;
    }
    splineThru(t) {
      return this.currentPath.splineThru(t), this;
    }
    toShapes(t, e) {
      function n(t) {
        const e = [];
        for (let n = 0, i = t.length; n < i; n++) {
          const i = t[n],
            r = new Qo();
          (r.curves = i.curves), e.push(r);
        }
        return e;
      }
      function i(t, e) {
        const n = e.length;
        let i = !1;
        for (let r = n - 1, s = 0; s < n; r = s++) {
          let n = e[r],
            o = e[s],
            a = o.x - n.x,
            l = o.y - n.y;
          if (Math.abs(l) > Number.EPSILON) {
            if (
              (l < 0 && ((n = e[s]), (a = -a), (o = e[r]), (l = -l)),
              t.y < n.y || t.y > o.y)
            )
              continue;
            if (t.y === n.y) {
              if (t.x === n.x) return !0;
            } else {
              const e = l * (t.x - n.x) - a * (t.y - n.y);
              if (0 === e) return !0;
              if (e < 0) continue;
              i = !i;
            }
          } else {
            if (t.y !== n.y) continue;
            if ((o.x <= t.x && t.x <= n.x) || (n.x <= t.x && t.x <= o.x))
              return !0;
          }
        }
        return i;
      }
      const r = Ys.isClockWise,
        s = this.subPaths;
      if (0 === s.length) return [];
      if (!0 === e) return n(s);
      let o, a, l;
      const c = [];
      if (1 === s.length)
        return (a = s[0]), (l = new Qo()), (l.curves = a.curves), c.push(l), c;
      let h = !r(s[0].getPoints());
      h = t ? !h : h;
      const u = [],
        d = [];
      let p,
        f,
        m = [],
        g = 0;
      (d[g] = void 0), (m[g] = []);
      for (let e = 0, n = s.length; e < n; e++)
        (a = s[e]),
          (p = a.getPoints()),
          (o = r(p)),
          (o = t ? !o : o),
          o
            ? (!h && d[g] && g++,
              (d[g] = { s: new Qo(), p }),
              (d[g].s.curves = a.curves),
              h && g++,
              (m[g] = []))
            : m[g].push({ h: a, p: p[0] });
      if (!d[0]) return n(s);
      if (d.length > 1) {
        let t = !1;
        const e = [];
        for (let t = 0, e = d.length; t < e; t++) u[t] = [];
        for (let n = 0, r = d.length; n < r; n++) {
          const r = m[n];
          for (let s = 0; s < r.length; s++) {
            const o = r[s];
            let a = !0;
            for (let r = 0; r < d.length; r++)
              i(o.p, d[r].p) &&
                (n !== r && e.push({ froms: n, tos: r, hole: s }),
                a ? ((a = !1), u[r].push(o)) : (t = !0));
            a && u[n].push(o);
          }
        }
        e.length > 0 && (t || (m = u));
      }
      for (let t = 0, e = d.length; t < e; t++) {
        (l = d[t].s), c.push(l), (f = m[t]);
        for (let t = 0, e = f.length; t < e; t++) l.holes.push(f[t].h);
      }
      return c;
    }
  }
  function va(t, e, n, i, r) {
    const s = r.glyphs[t] || r.glyphs["?"];
    if (!s)
      return void console.error(
        'THREE.Font: character "' +
          t +
          '" does not exists in font family ' +
          r.familyName +
          "."
      );
    const o = new ga();
    let a, l, c, h, u, d, p, f;
    if (s.o) {
      const t = s._cachedOutline || (s._cachedOutline = s.o.split(" "));
      for (let r = 0, s = t.length; r < s; )
        switch (t[r++]) {
          case "m":
            (a = t[r++] * e + n), (l = t[r++] * e + i), o.moveTo(a, l);
            break;
          case "l":
            (a = t[r++] * e + n), (l = t[r++] * e + i), o.lineTo(a, l);
            break;
          case "q":
            (c = t[r++] * e + n),
              (h = t[r++] * e + i),
              (u = t[r++] * e + n),
              (d = t[r++] * e + i),
              o.quadraticCurveTo(u, d, c, h);
            break;
          case "b":
            (c = t[r++] * e + n),
              (h = t[r++] * e + i),
              (u = t[r++] * e + n),
              (d = t[r++] * e + i),
              (p = t[r++] * e + n),
              (f = t[r++] * e + i),
              o.bezierCurveTo(u, d, p, f, c, h);
        }
    }
    return { offsetX: s.ha * e, path: o };
  }
  let _a;
  (class {
    constructor(t) {
      (this.type = "Font"), (this.data = t);
    }
    generateShapes(t, e = 100) {
      const n = [],
        i = (function (t, e, n) {
          const i = Array.from(t),
            r = e / n.resolution,
            s =
              (n.boundingBox.yMax - n.boundingBox.yMin + n.underlineThickness) *
              r,
            o = [];
          let a = 0,
            l = 0;
          for (let t = 0; t < i.length; t++) {
            const e = i[t];
            if ("\n" === e) (a = 0), (l -= s);
            else {
              const t = va(e, r, a, l, n);
              (a += t.offsetX), o.push(t.path);
            }
          }
          return o;
        })(t, e, this.data);
      for (let t = 0, e = i.length; t < e; t++)
        Array.prototype.push.apply(n, i[t].toShapes());
      return n;
    }
  }.prototype.isFont = !0);
  class ya extends wo {
    constructor(t) {
      super(t);
    }
    load(t, e, n, i) {
      const r = this,
        s = new So(this.manager);
      s.setResponseType("arraybuffer"),
        s.setPath(this.path),
        s.setRequestHeader(this.requestHeader),
        s.setWithCredentials(this.withCredentials),
        s.load(
          t,
          function (n) {
            try {
              const t = n.slice(0);
              (void 0 === _a &&
                (_a = new (window.AudioContext || window.webkitAudioContext)()),
              _a).decodeAudioData(t, function (t) {
                e(t);
              });
            } catch (e) {
              i ? i(e) : console.error(e), r.manager.itemError(t);
            }
          },
          n,
          i
        );
    }
  }
  ((class extends da {
    constructor(t, e, n = 1) {
      super(void 0, n);
      const i = new he().set(t),
        r = new he().set(e),
        s = new k(i.r, i.g, i.b),
        o = new k(r.r, r.g, r.b),
        a = Math.sqrt(Math.PI),
        l = a * Math.sqrt(0.75);
      this.sh.coefficients[0].copy(s).add(o).multiplyScalar(a),
        this.sh.coefficients[1].copy(s).sub(o).multiplyScalar(l);
    }
  }.prototype.isHemisphereLightProbe = !0),
    (class extends da {
      constructor(t, e = 1) {
        super(void 0, e);
        const n = new he().set(t);
        this.sh.coefficients[0]
          .set(n.r, n.g, n.b)
          .multiplyScalar(2 * Math.sqrt(Math.PI));
      }
    }.prototype.isAmbientLightProbe = !0),
    new mt(),
    new mt());
  function xa() {
    return ("undefined" == typeof performance ? Date : performance).now();
  }
  class ba {
    constructor(t, e, n) {
      let i, r, s;
      switch (((this.binding = t), (this.valueSize = n), e)) {
        case "quaternion":
          (i = this._slerp),
            (r = this._slerpAdditive),
            (s = this._setAdditiveIdentityQuaternion),
            (this.buffer = new Float64Array(6 * n)),
            (this._workIndex = 5);
          break;
        case "string":
        case "bool":
          (i = this._select),
            (r = this._select),
            (s = this._setAdditiveIdentityOther),
            (this.buffer = new Array(5 * n));
          break;
        default:
          (i = this._lerp),
            (r = this._lerpAdditive),
            (s = this._setAdditiveIdentityNumeric),
            (this.buffer = new Float64Array(5 * n));
      }
      (this._mixBufferRegion = i),
        (this._mixBufferRegionAdditive = r),
        (this._setIdentity = s),
        (this._origIndex = 3),
        (this._addIndex = 4),
        (this.cumulativeWeight = 0),
        (this.cumulativeWeightAdditive = 0),
        (this.useCount = 0),
        (this.referenceCount = 0);
    }
    accumulate(t, e) {
      const n = this.buffer,
        i = this.valueSize,
        r = t * i + i;
      let s = this.cumulativeWeight;
      if (0 === s) {
        for (let t = 0; t !== i; ++t) n[r + t] = n[t];
        s = e;
      } else {
        s += e;
        const t = e / s;
        this._mixBufferRegion(n, r, 0, t, i);
      }
      this.cumulativeWeight = s;
    }
    accumulateAdditive(t) {
      const e = this.buffer,
        n = this.valueSize,
        i = n * this._addIndex;
      0 === this.cumulativeWeightAdditive && this._setIdentity(),
        this._mixBufferRegionAdditive(e, i, 0, t, n),
        (this.cumulativeWeightAdditive += t);
    }
    apply(t) {
      const e = this.valueSize,
        n = this.buffer,
        i = t * e + e,
        r = this.cumulativeWeight,
        s = this.cumulativeWeightAdditive,
        o = this.binding;
      if (
        ((this.cumulativeWeight = 0),
        (this.cumulativeWeightAdditive = 0),
        r < 1)
      ) {
        const t = e * this._origIndex;
        this._mixBufferRegion(n, i, t, 1 - r, e);
      }
      s > 0 && this._mixBufferRegionAdditive(n, i, this._addIndex * e, 1, e);
      for (let t = e, r = e + e; t !== r; ++t)
        if (n[t] !== n[t + e]) {
          o.setValue(n, i);
          break;
        }
    }
    saveOriginalState() {
      const t = this.binding,
        e = this.buffer,
        n = this.valueSize,
        i = n * this._origIndex;
      t.getValue(e, i);
      for (let t = n, r = i; t !== r; ++t) e[t] = e[i + (t % n)];
      this._setIdentity(),
        (this.cumulativeWeight = 0),
        (this.cumulativeWeightAdditive = 0);
    }
    restoreOriginalState() {
      const t = 3 * this.valueSize;
      this.binding.setValue(this.buffer, t);
    }
    _setAdditiveIdentityNumeric() {
      const t = this._addIndex * this.valueSize,
        e = t + this.valueSize;
      for (let n = t; n < e; n++) this.buffer[n] = 0;
    }
    _setAdditiveIdentityQuaternion() {
      this._setAdditiveIdentityNumeric(),
        (this.buffer[this._addIndex * this.valueSize + 3] = 1);
    }
    _setAdditiveIdentityOther() {
      const t = this._origIndex * this.valueSize,
        e = this._addIndex * this.valueSize;
      for (let n = 0; n < this.valueSize; n++)
        this.buffer[e + n] = this.buffer[t + n];
    }
    _select(t, e, n, i, r) {
      if (i >= 0.5) for (let i = 0; i !== r; ++i) t[e + i] = t[n + i];
    }
    _slerp(t, e, n, i) {
      U.slerpFlat(t, e, t, e, t, n, i);
    }
    _slerpAdditive(t, e, n, i, r) {
      const s = this._workIndex * r;
      U.multiplyQuaternionsFlat(t, s, t, e, t, n),
        U.slerpFlat(t, e, t, e, t, s, i);
    }
    _lerp(t, e, n, i, r) {
      const s = 1 - i;
      for (let o = 0; o !== r; ++o) {
        const r = e + o;
        t[r] = t[r] * s + t[n + o] * i;
      }
    }
    _lerpAdditive(t, e, n, i, r) {
      for (let s = 0; s !== r; ++s) {
        const r = e + s;
        t[r] = t[r] + t[n + s] * i;
      }
    }
  }
  const wa = new RegExp("[\\[\\]\\.:\\/]", "g"),
    Ma = "[^\\[\\]\\.:\\/]",
    Sa = "[^" + "\\[\\]\\.:\\/".replace("\\.", "") + "]",
    Ea = /((?:WC+[\/:])*)/.source.replace("WC", Ma),
    Ta = /(WCOD+)?/.source.replace("WCOD", Sa),
    Aa = /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", Ma),
    La = /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", Ma),
    Ca = new RegExp("^" + Ea + Ta + Aa + La + "$"),
    Ra = ["material", "materials", "bones"];
  function Pa(t, e, n) {
    const i = n || Da.parseTrackName(e);
    (this._targetGroup = t), (this._bindings = t.subscribe_(e, i));
  }
  function Da(t, e, n) {
    (this.path = e),
      (this.parsedPath = n || Da.parseTrackName(e)),
      (this.node = Da.findNode(t, this.parsedPath.nodeName) || t),
      (this.rootNode = t);
  }
  Object.assign(Pa.prototype, {
    getValue: function (t, e) {
      this.bind();
      const n = this._targetGroup.nCachedObjects_,
        i = this._bindings[n];
      void 0 !== i && i.getValue(t, e);
    },
    setValue: function (t, e) {
      const n = this._bindings;
      for (
        let i = this._targetGroup.nCachedObjects_, r = n.length;
        i !== r;
        ++i
      )
        n[i].setValue(t, e);
    },
    bind: function () {
      const t = this._bindings;
      for (
        let e = this._targetGroup.nCachedObjects_, n = t.length;
        e !== n;
        ++e
      )
        t[e].bind();
    },
    unbind: function () {
      const t = this._bindings;
      for (
        let e = this._targetGroup.nCachedObjects_, n = t.length;
        e !== n;
        ++e
      )
        t[e].unbind();
    },
  }),
    Object.assign(Da, {
      Composite: Pa,
      create: function (t, e, n) {
        return t && t.isAnimationObjectGroup
          ? new Da.Composite(t, e, n)
          : new Da(t, e, n);
      },
      sanitizeNodeName: function (t) {
        return t.replace(/\s/g, "_").replace(wa, "");
      },
      parseTrackName: function (t) {
        const e = Ca.exec(t);
        if (!e)
          throw new Error("PropertyBinding: Cannot parse trackName: " + t);
        const n = {
            nodeName: e[2],
            objectName: e[3],
            objectIndex: e[4],
            propertyName: e[5],
            propertyIndex: e[6],
          },
          i = n.nodeName && n.nodeName.lastIndexOf(".");
        if (void 0 !== i && -1 !== i) {
          const t = n.nodeName.substring(i + 1);
          -1 !== Ra.indexOf(t) &&
            ((n.nodeName = n.nodeName.substring(0, i)), (n.objectName = t));
        }
        if (null === n.propertyName || 0 === n.propertyName.length)
          throw new Error(
            "PropertyBinding: can not parse propertyName from trackName: " + t
          );
        return n;
      },
      findNode: function (t, e) {
        if (
          !e ||
          "" === e ||
          "." === e ||
          -1 === e ||
          e === t.name ||
          e === t.uuid
        )
          return t;
        if (t.skeleton) {
          const n = t.skeleton.getBoneByName(e);
          if (void 0 !== n) return n;
        }
        if (t.children) {
          const n = function (t) {
              for (let i = 0; i < t.length; i++) {
                const r = t[i];
                if (r.name === e || r.uuid === e) return r;
                const s = n(r.children);
                if (s) return s;
              }
              return null;
            },
            i = n(t.children);
          if (i) return i;
        }
        return null;
      },
    }),
    Object.assign(Da.prototype, {
      _getValue_unavailable: function () {},
      _setValue_unavailable: function () {},
      BindingType: {
        Direct: 0,
        EntireArray: 1,
        ArrayElement: 2,
        HasFromToArray: 3,
      },
      Versioning: { None: 0, NeedsUpdate: 1, MatrixWorldNeedsUpdate: 2 },
      GetterByBindingType: [
        function (t, e) {
          t[e] = this.node[this.propertyName];
        },
        function (t, e) {
          const n = this.resolvedProperty;
          for (let i = 0, r = n.length; i !== r; ++i) t[e++] = n[i];
        },
        function (t, e) {
          t[e] = this.resolvedProperty[this.propertyIndex];
        },
        function (t, e) {
          this.resolvedProperty.toArray(t, e);
        },
      ],
      SetterByBindingTypeAndVersioning: [
        [
          function (t, e) {
            this.targetObject[this.propertyName] = t[e];
          },
          function (t, e) {
            (this.targetObject[this.propertyName] = t[e]),
              (this.targetObject.needsUpdate = !0);
          },
          function (t, e) {
            (this.targetObject[this.propertyName] = t[e]),
              (this.targetObject.matrixWorldNeedsUpdate = !0);
          },
        ],
        [
          function (t, e) {
            const n = this.resolvedProperty;
            for (let i = 0, r = n.length; i !== r; ++i) n[i] = t[e++];
          },
          function (t, e) {
            const n = this.resolvedProperty;
            for (let i = 0, r = n.length; i !== r; ++i) n[i] = t[e++];
            this.targetObject.needsUpdate = !0;
          },
          function (t, e) {
            const n = this.resolvedProperty;
            for (let i = 0, r = n.length; i !== r; ++i) n[i] = t[e++];
            this.targetObject.matrixWorldNeedsUpdate = !0;
          },
        ],
        [
          function (t, e) {
            this.resolvedProperty[this.propertyIndex] = t[e];
          },
          function (t, e) {
            (this.resolvedProperty[this.propertyIndex] = t[e]),
              (this.targetObject.needsUpdate = !0);
          },
          function (t, e) {
            (this.resolvedProperty[this.propertyIndex] = t[e]),
              (this.targetObject.matrixWorldNeedsUpdate = !0);
          },
        ],
        [
          function (t, e) {
            this.resolvedProperty.fromArray(t, e);
          },
          function (t, e) {
            this.resolvedProperty.fromArray(t, e),
              (this.targetObject.needsUpdate = !0);
          },
          function (t, e) {
            this.resolvedProperty.fromArray(t, e),
              (this.targetObject.matrixWorldNeedsUpdate = !0);
          },
        ],
      ],
      getValue: function (t, e) {
        this.bind(), this.getValue(t, e);
      },
      setValue: function (t, e) {
        this.bind(), this.setValue(t, e);
      },
      bind: function () {
        let t = this.node;
        const e = this.parsedPath,
          n = e.objectName,
          i = e.propertyName;
        let r = e.propertyIndex;
        if (
          (t ||
            ((t = Da.findNode(this.rootNode, e.nodeName) || this.rootNode),
            (this.node = t)),
          (this.getValue = this._getValue_unavailable),
          (this.setValue = this._setValue_unavailable),
          !t)
        )
          return void console.error(
            "THREE.PropertyBinding: Trying to update node for track: " +
              this.path +
              " but it wasn't found."
          );
        if (n) {
          let i = e.objectIndex;
          switch (n) {
            case "materials":
              if (!t.material)
                return void console.error(
                  "THREE.PropertyBinding: Can not bind to material as node does not have a material.",
                  this
                );
              if (!t.material.materials)
                return void console.error(
                  "THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",
                  this
                );
              t = t.material.materials;
              break;
            case "bones":
              if (!t.skeleton)
                return void console.error(
                  "THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",
                  this
                );
              t = t.skeleton.bones;
              for (let e = 0; e < t.length; e++)
                if (t[e].name === i) {
                  i = e;
                  break;
                }
              break;
            default:
              if (void 0 === t[n])
                return void console.error(
                  "THREE.PropertyBinding: Can not bind to objectName of node undefined.",
                  this
                );
              t = t[n];
          }
          if (void 0 !== i) {
            if (void 0 === t[i])
              return void console.error(
                "THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",
                this,
                t
              );
            t = t[i];
          }
        }
        const s = t[i];
        if (void 0 === s) {
          const n = e.nodeName;
          return void console.error(
            "THREE.PropertyBinding: Trying to update property for track: " +
              n +
              "." +
              i +
              " but it wasn't found.",
            t
          );
        }
        let o = this.Versioning.None;
        (this.targetObject = t),
          void 0 !== t.needsUpdate
            ? (o = this.Versioning.NeedsUpdate)
            : void 0 !== t.matrixWorldNeedsUpdate &&
              (o = this.Versioning.MatrixWorldNeedsUpdate);
        let a = this.BindingType.Direct;
        if (void 0 !== r) {
          if ("morphTargetInfluences" === i) {
            if (!t.geometry)
              return void console.error(
                "THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",
                this
              );
            if (!t.geometry.isBufferGeometry)
              return void console.error(
                "THREE.PropertyBinding: Can not bind to morphTargetInfluences on THREE.Geometry. Use THREE.BufferGeometry instead.",
                this
              );
            if (!t.geometry.morphAttributes)
              return void console.error(
                "THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",
                this
              );
            void 0 !== t.morphTargetDictionary[r] &&
              (r = t.morphTargetDictionary[r]);
          }
          (a = this.BindingType.ArrayElement),
            (this.resolvedProperty = s),
            (this.propertyIndex = r);
        } else
          void 0 !== s.fromArray && void 0 !== s.toArray
            ? ((a = this.BindingType.HasFromToArray),
              (this.resolvedProperty = s))
            : Array.isArray(s)
            ? ((a = this.BindingType.EntireArray), (this.resolvedProperty = s))
            : (this.propertyName = i);
        (this.getValue = this.GetterByBindingType[a]),
          (this.setValue = this.SetterByBindingTypeAndVersioning[a][o]);
      },
      unbind: function () {
        (this.node = null),
          (this.getValue = this._getValue_unbound),
          (this.setValue = this._setValue_unbound);
      },
    }),
    Object.assign(Da.prototype, {
      _getValue_unbound: Da.prototype.getValue,
      _setValue_unbound: Da.prototype.setValue,
    }),
    (class {
      constructor() {
        (this.uuid = R.generateUUID()),
          (this._objects = Array.prototype.slice.call(arguments)),
          (this.nCachedObjects_ = 0);
        const t = {};
        this._indicesByUUID = t;
        for (let e = 0, n = arguments.length; e !== n; ++e)
          t[arguments[e].uuid] = e;
        (this._paths = []),
          (this._parsedPaths = []),
          (this._bindings = []),
          (this._bindingsIndicesByPath = {});
        const e = this;
        this.stats = {
          objects: {
            get total() {
              return e._objects.length;
            },
            get inUse() {
              return this.total - e.nCachedObjects_;
            },
          },
          get bindingsPerObject() {
            return e._bindings.length;
          },
        };
      }
      add() {
        const t = this._objects,
          e = this._indicesByUUID,
          n = this._paths,
          i = this._parsedPaths,
          r = this._bindings,
          s = r.length;
        let o,
          a = t.length,
          l = this.nCachedObjects_;
        for (let c = 0, h = arguments.length; c !== h; ++c) {
          const h = arguments[c],
            u = h.uuid;
          let d = e[u];
          if (void 0 === d) {
            (d = a++), (e[u] = d), t.push(h);
            for (let t = 0, e = s; t !== e; ++t)
              r[t].push(new Da(h, n[t], i[t]));
          } else if (d < l) {
            o = t[d];
            const a = --l,
              c = t[a];
            (e[c.uuid] = d), (t[d] = c), (e[u] = a), (t[a] = h);
            for (let t = 0, e = s; t !== e; ++t) {
              const e = r[t],
                s = e[a];
              let o = e[d];
              (e[d] = s),
                void 0 === o && (o = new Da(h, n[t], i[t])),
                (e[a] = o);
            }
          } else
            t[d] !== o &&
              console.error(
                "THREE.AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes."
              );
        }
        this.nCachedObjects_ = l;
      }
      remove() {
        const t = this._objects,
          e = this._indicesByUUID,
          n = this._bindings,
          i = n.length;
        let r = this.nCachedObjects_;
        for (let s = 0, o = arguments.length; s !== o; ++s) {
          const o = arguments[s],
            a = o.uuid,
            l = e[a];
          if (void 0 !== l && l >= r) {
            const s = r++,
              c = t[s];
            (e[c.uuid] = l), (t[l] = c), (e[a] = s), (t[s] = o);
            for (let t = 0, e = i; t !== e; ++t) {
              const e = n[t],
                i = e[s],
                r = e[l];
              (e[l] = i), (e[s] = r);
            }
          }
        }
        this.nCachedObjects_ = r;
      }
      uncache() {
        const t = this._objects,
          e = this._indicesByUUID,
          n = this._bindings,
          i = n.length;
        let r = this.nCachedObjects_,
          s = t.length;
        for (let o = 0, a = arguments.length; o !== a; ++o) {
          const a = arguments[o].uuid,
            l = e[a];
          if (void 0 !== l)
            if ((delete e[a], l < r)) {
              const o = --r,
                a = t[o],
                c = --s,
                h = t[c];
              (e[a.uuid] = l), (t[l] = a), (e[h.uuid] = o), (t[o] = h), t.pop();
              for (let t = 0, e = i; t !== e; ++t) {
                const e = n[t],
                  i = e[o],
                  r = e[c];
                (e[l] = i), (e[o] = r), e.pop();
              }
            } else {
              const r = --s,
                o = t[r];
              r > 0 && (e[o.uuid] = l), (t[l] = o), t.pop();
              for (let t = 0, e = i; t !== e; ++t) {
                const e = n[t];
                (e[l] = e[r]), e.pop();
              }
            }
        }
        this.nCachedObjects_ = r;
      }
      subscribe_(t, e) {
        const n = this._bindingsIndicesByPath;
        let i = n[t];
        const r = this._bindings;
        if (void 0 !== i) return r[i];
        const s = this._paths,
          o = this._parsedPaths,
          a = this._objects,
          l = a.length,
          c = this.nCachedObjects_,
          h = new Array(l);
        (i = r.length), (n[t] = i), s.push(t), o.push(e), r.push(h);
        for (let n = c, i = a.length; n !== i; ++n) {
          const i = a[n];
          h[n] = new Da(i, t, e);
        }
        return h;
      }
      unsubscribe_(t) {
        const e = this._bindingsIndicesByPath,
          n = e[t];
        if (void 0 !== n) {
          const i = this._paths,
            r = this._parsedPaths,
            s = this._bindings,
            o = s.length - 1,
            a = s[o];
          (e[t[o]] = n),
            (s[n] = a),
            s.pop(),
            (r[n] = r[o]),
            r.pop(),
            (i[n] = i[o]),
            i.pop();
        }
      }
    }.prototype.isAnimationObjectGroup = !0);
  class Ia {
    constructor(t, e, n = null, i = e.blendMode) {
      (this._mixer = t),
        (this._clip = e),
        (this._localRoot = n),
        (this.blendMode = i);
      const r = e.tracks,
        s = r.length,
        o = new Array(s),
        a = { endingStart: y, endingEnd: y };
      for (let t = 0; t !== s; ++t) {
        const e = r[t].createInterpolant(null);
        (o[t] = e), (e.settings = a);
      }
      (this._interpolantSettings = a),
        (this._interpolants = o),
        (this._propertyBindings = new Array(s)),
        (this._cacheIndex = null),
        (this._byClipCacheIndex = null),
        (this._timeScaleInterpolant = null),
        (this._weightInterpolant = null),
        (this.loop = 2201),
        (this._loopCount = -1),
        (this._startTime = null),
        (this.time = 0),
        (this.timeScale = 1),
        (this._effectiveTimeScale = 1),
        (this.weight = 1),
        (this._effectiveWeight = 1),
        (this.repetitions = 1 / 0),
        (this.paused = !1),
        (this.enabled = !0),
        (this.clampWhenFinished = !1),
        (this.zeroSlopeAtStart = !0),
        (this.zeroSlopeAtEnd = !0);
    }
    play() {
      return this._mixer._activateAction(this), this;
    }
    stop() {
      return this._mixer._deactivateAction(this), this.reset();
    }
    reset() {
      return (
        (this.paused = !1),
        (this.enabled = !0),
        (this.time = 0),
        (this._loopCount = -1),
        (this._startTime = null),
        this.stopFading().stopWarping()
      );
    }
    isRunning() {
      return (
        this.enabled &&
        !this.paused &&
        0 !== this.timeScale &&
        null === this._startTime &&
        this._mixer._isActiveAction(this)
      );
    }
    isScheduled() {
      return this._mixer._isActiveAction(this);
    }
    startAt(t) {
      return (this._startTime = t), this;
    }
    setLoop(t, e) {
      return (this.loop = t), (this.repetitions = e), this;
    }
    setEffectiveWeight(t) {
      return (
        (this.weight = t),
        (this._effectiveWeight = this.enabled ? t : 0),
        this.stopFading()
      );
    }
    getEffectiveWeight() {
      return this._effectiveWeight;
    }
    fadeIn(t) {
      return this._scheduleFading(t, 0, 1);
    }
    fadeOut(t) {
      return this._scheduleFading(t, 1, 0);
    }
    crossFadeFrom(t, e, n) {
      if ((t.fadeOut(e), this.fadeIn(e), n)) {
        const n = this._clip.duration,
          i = t._clip.duration,
          r = i / n,
          s = n / i;
        t.warp(1, r, e), this.warp(s, 1, e);
      }
      return this;
    }
    crossFadeTo(t, e, n) {
      return t.crossFadeFrom(this, e, n);
    }
    stopFading() {
      const t = this._weightInterpolant;
      return (
        null !== t &&
          ((this._weightInterpolant = null),
          this._mixer._takeBackControlInterpolant(t)),
        this
      );
    }
    setEffectiveTimeScale(t) {
      return (
        (this.timeScale = t),
        (this._effectiveTimeScale = this.paused ? 0 : t),
        this.stopWarping()
      );
    }
    getEffectiveTimeScale() {
      return this._effectiveTimeScale;
    }
    setDuration(t) {
      return (this.timeScale = this._clip.duration / t), this.stopWarping();
    }
    syncWith(t) {
      return (
        (this.time = t.time), (this.timeScale = t.timeScale), this.stopWarping()
      );
    }
    halt(t) {
      return this.warp(this._effectiveTimeScale, 0, t);
    }
    warp(t, e, n) {
      const i = this._mixer,
        r = i.time,
        s = this.timeScale;
      let o = this._timeScaleInterpolant;
      null === o &&
        ((o = i._lendControlInterpolant()), (this._timeScaleInterpolant = o));
      const a = o.parameterPositions,
        l = o.sampleValues;
      return (a[0] = r), (a[1] = r + n), (l[0] = t / s), (l[1] = e / s), this;
    }
    stopWarping() {
      const t = this._timeScaleInterpolant;
      return (
        null !== t &&
          ((this._timeScaleInterpolant = null),
          this._mixer._takeBackControlInterpolant(t)),
        this
      );
    }
    getMixer() {
      return this._mixer;
    }
    getClip() {
      return this._clip;
    }
    getRoot() {
      return this._localRoot || this._mixer._root;
    }
    _update(t, e, n, i) {
      if (!this.enabled) return void this._updateWeight(t);
      const r = this._startTime;
      if (null !== r) {
        const i = (t - r) * n;
        if (i < 0 || 0 === n) return;
        (this._startTime = null), (e = n * i);
      }
      e *= this._updateTimeScale(t);
      const s = this._updateTime(e),
        o = this._updateWeight(t);
      if (o > 0) {
        const t = this._interpolants,
          e = this._propertyBindings;
        switch (this.blendMode) {
          case 2501:
            for (let n = 0, i = t.length; n !== i; ++n)
              t[n].evaluate(s), e[n].accumulateAdditive(o);
            break;
          case 2500:
          default:
            for (let n = 0, r = t.length; n !== r; ++n)
              t[n].evaluate(s), e[n].accumulate(i, o);
        }
      }
    }
    _updateWeight(t) {
      let e = 0;
      if (this.enabled) {
        e = this.weight;
        const n = this._weightInterpolant;
        if (null !== n) {
          const i = n.evaluate(t)[0];
          (e *= i),
            t > n.parameterPositions[1] &&
              (this.stopFading(), 0 === i && (this.enabled = !1));
        }
      }
      return (this._effectiveWeight = e), e;
    }
    _updateTimeScale(t) {
      let e = 0;
      if (!this.paused) {
        e = this.timeScale;
        const n = this._timeScaleInterpolant;
        null !== n &&
          ((e *= n.evaluate(t)[0]),
          t > n.parameterPositions[1] &&
            (this.stopWarping(),
            0 === e ? (this.paused = !0) : (this.timeScale = e)));
      }
      return (this._effectiveTimeScale = e), e;
    }
    _updateTime(t) {
      const e = this._clip.duration,
        n = this.loop;
      let i = this.time + t,
        r = this._loopCount;
      const s = 2202 === n;
      if (0 === t) return -1 === r ? i : s && 1 == (1 & r) ? e - i : i;
      if (2200 === n) {
        -1 === r && ((this._loopCount = 0), this._setEndings(!0, !0, !1));
        t: {
          if (i >= e) i = e;
          else {
            if (!(i < 0)) {
              this.time = i;
              break t;
            }
            i = 0;
          }
          this.clampWhenFinished ? (this.paused = !0) : (this.enabled = !1),
            (this.time = i),
            this._mixer.dispatchEvent({
              type: "finished",
              action: this,
              direction: t < 0 ? -1 : 1,
            });
        }
      } else {
        if (
          (-1 === r &&
            (t >= 0
              ? ((r = 0), this._setEndings(!0, 0 === this.repetitions, s))
              : this._setEndings(0 === this.repetitions, !0, s)),
          i >= e || i < 0)
        ) {
          const n = Math.floor(i / e);
          (i -= e * n), (r += Math.abs(n));
          const o = this.repetitions - r;
          if (o <= 0)
            this.clampWhenFinished ? (this.paused = !0) : (this.enabled = !1),
              (i = t > 0 ? e : 0),
              (this.time = i),
              this._mixer.dispatchEvent({
                type: "finished",
                action: this,
                direction: t > 0 ? 1 : -1,
              });
          else {
            if (1 === o) {
              const e = t < 0;
              this._setEndings(e, !e, s);
            } else this._setEndings(!1, !1, s);
            (this._loopCount = r),
              (this.time = i),
              this._mixer.dispatchEvent({
                type: "loop",
                action: this,
                loopDelta: n,
              });
          }
        } else this.time = i;
        if (s && 1 == (1 & r)) return e - i;
      }
      return i;
    }
    _setEndings(t, e, n) {
      const i = this._interpolantSettings;
      n
        ? ((i.endingStart = x), (i.endingEnd = x))
        : ((i.endingStart = t ? (this.zeroSlopeAtStart ? x : y) : b),
          (i.endingEnd = e ? (this.zeroSlopeAtEnd ? x : y) : b));
    }
    _scheduleFading(t, e, n) {
      const i = this._mixer,
        r = i.time;
      let s = this._weightInterpolant;
      null === s &&
        ((s = i._lendControlInterpolant()), (this._weightInterpolant = s));
      const o = s.parameterPositions,
        a = s.sampleValues;
      return (o[0] = r), (a[0] = e), (o[1] = r + t), (a[1] = n), this;
    }
  }
  (class extends A {
    constructor(t) {
      super(),
        (this._root = t),
        this._initMemoryManager(),
        (this._accuIndex = 0),
        (this.time = 0),
        (this.timeScale = 1);
    }
    _bindAction(t, e) {
      const n = t._localRoot || this._root,
        i = t._clip.tracks,
        r = i.length,
        s = t._propertyBindings,
        o = t._interpolants,
        a = n.uuid,
        l = this._bindingsByRootAndName;
      let c = l[a];
      void 0 === c && ((c = {}), (l[a] = c));
      for (let t = 0; t !== r; ++t) {
        const r = i[t],
          l = r.name;
        let h = c[l];
        if (void 0 !== h) s[t] = h;
        else {
          if (((h = s[t]), void 0 !== h)) {
            null === h._cacheIndex &&
              (++h.referenceCount, this._addInactiveBinding(h, a, l));
            continue;
          }
          const i = e && e._propertyBindings[t].binding.parsedPath;
          (h = new ba(Da.create(n, l, i), r.ValueTypeName, r.getValueSize())),
            ++h.referenceCount,
            this._addInactiveBinding(h, a, l),
            (s[t] = h);
        }
        o[t].resultBuffer = h.buffer;
      }
    }
    _activateAction(t) {
      if (!this._isActiveAction(t)) {
        if (null === t._cacheIndex) {
          const e = (t._localRoot || this._root).uuid,
            n = t._clip.uuid,
            i = this._actionsByClip[n];
          this._bindAction(t, i && i.knownActions[0]),
            this._addInactiveAction(t, n, e);
        }
        const e = t._propertyBindings;
        for (let t = 0, n = e.length; t !== n; ++t) {
          const n = e[t];
          0 == n.useCount++ && (this._lendBinding(n), n.saveOriginalState());
        }
        this._lendAction(t);
      }
    }
    _deactivateAction(t) {
      if (this._isActiveAction(t)) {
        const e = t._propertyBindings;
        for (let t = 0, n = e.length; t !== n; ++t) {
          const n = e[t];
          0 == --n.useCount &&
            (n.restoreOriginalState(), this._takeBackBinding(n));
        }
        this._takeBackAction(t);
      }
    }
    _initMemoryManager() {
      (this._actions = []),
        (this._nActiveActions = 0),
        (this._actionsByClip = {}),
        (this._bindings = []),
        (this._nActiveBindings = 0),
        (this._bindingsByRootAndName = {}),
        (this._controlInterpolants = []),
        (this._nActiveControlInterpolants = 0);
      const t = this;
      this.stats = {
        actions: {
          get total() {
            return t._actions.length;
          },
          get inUse() {
            return t._nActiveActions;
          },
        },
        bindings: {
          get total() {
            return t._bindings.length;
          },
          get inUse() {
            return t._nActiveBindings;
          },
        },
        controlInterpolants: {
          get total() {
            return t._controlInterpolants.length;
          },
          get inUse() {
            return t._nActiveControlInterpolants;
          },
        },
      };
    }
    _isActiveAction(t) {
      const e = t._cacheIndex;
      return null !== e && e < this._nActiveActions;
    }
    _addInactiveAction(t, e, n) {
      const i = this._actions,
        r = this._actionsByClip;
      let s = r[e];
      if (void 0 === s)
        (s = { knownActions: [t], actionByRoot: {} }),
          (t._byClipCacheIndex = 0),
          (r[e] = s);
      else {
        const e = s.knownActions;
        (t._byClipCacheIndex = e.length), e.push(t);
      }
      (t._cacheIndex = i.length), i.push(t), (s.actionByRoot[n] = t);
    }
    _removeInactiveAction(t) {
      const e = this._actions,
        n = e[e.length - 1],
        i = t._cacheIndex;
      (n._cacheIndex = i), (e[i] = n), e.pop(), (t._cacheIndex = null);
      const r = t._clip.uuid,
        s = this._actionsByClip,
        o = s[r],
        a = o.knownActions,
        l = a[a.length - 1],
        c = t._byClipCacheIndex;
      (l._byClipCacheIndex = c),
        (a[c] = l),
        a.pop(),
        (t._byClipCacheIndex = null),
        delete o.actionByRoot[(t._localRoot || this._root).uuid],
        0 === a.length && delete s[r],
        this._removeInactiveBindingsForAction(t);
    }
    _removeInactiveBindingsForAction(t) {
      const e = t._propertyBindings;
      for (let t = 0, n = e.length; t !== n; ++t) {
        const n = e[t];
        0 == --n.referenceCount && this._removeInactiveBinding(n);
      }
    }
    _lendAction(t) {
      const e = this._actions,
        n = t._cacheIndex,
        i = this._nActiveActions++,
        r = e[i];
      (t._cacheIndex = i), (e[i] = t), (r._cacheIndex = n), (e[n] = r);
    }
    _takeBackAction(t) {
      const e = this._actions,
        n = t._cacheIndex,
        i = --this._nActiveActions,
        r = e[i];
      (t._cacheIndex = i), (e[i] = t), (r._cacheIndex = n), (e[n] = r);
    }
    _addInactiveBinding(t, e, n) {
      const i = this._bindingsByRootAndName,
        r = this._bindings;
      let s = i[e];
      void 0 === s && ((s = {}), (i[e] = s)),
        (s[n] = t),
        (t._cacheIndex = r.length),
        r.push(t);
    }
    _removeInactiveBinding(t) {
      const e = this._bindings,
        n = t.binding,
        i = n.rootNode.uuid,
        r = n.path,
        s = this._bindingsByRootAndName,
        o = s[i],
        a = e[e.length - 1],
        l = t._cacheIndex;
      (a._cacheIndex = l),
        (e[l] = a),
        e.pop(),
        delete o[r],
        0 === Object.keys(o).length && delete s[i];
    }
    _lendBinding(t) {
      const e = this._bindings,
        n = t._cacheIndex,
        i = this._nActiveBindings++,
        r = e[i];
      (t._cacheIndex = i), (e[i] = t), (r._cacheIndex = n), (e[n] = r);
    }
    _takeBackBinding(t) {
      const e = this._bindings,
        n = t._cacheIndex,
        i = --this._nActiveBindings,
        r = e[i];
      (t._cacheIndex = i), (e[i] = t), (r._cacheIndex = n), (e[n] = r);
    }
    _lendControlInterpolant() {
      const t = this._controlInterpolants,
        e = this._nActiveControlInterpolants++;
      let n = t[e];
      return (
        void 0 === n &&
          ((n = new ao(
            new Float32Array(2),
            new Float32Array(2),
            1,
            this._controlInterpolantsResultBuffer
          )),
          (n.__cacheIndex = e),
          (t[e] = n)),
        n
      );
    }
    _takeBackControlInterpolant(t) {
      const e = this._controlInterpolants,
        n = t.__cacheIndex,
        i = --this._nActiveControlInterpolants,
        r = e[i];
      (t.__cacheIndex = i), (e[i] = t), (r.__cacheIndex = n), (e[n] = r);
    }
    clipAction(t, e, n) {
      const i = e || this._root,
        r = i.uuid;
      let s = "string" == typeof t ? _o.findByName(i, t) : t;
      const o = null !== s ? s.uuid : t,
        a = this._actionsByClip[o];
      let l = null;
      if (
        (void 0 === n && (n = null !== s ? s.blendMode : 2500), void 0 !== a)
      ) {
        const t = a.actionByRoot[r];
        if (void 0 !== t && t.blendMode === n) return t;
        (l = a.knownActions[0]), null === s && (s = l._clip);
      }
      if (null === s) return null;
      const c = new Ia(this, s, e, n);
      return this._bindAction(c, l), this._addInactiveAction(c, o, r), c;
    }
    existingAction(t, e) {
      const n = e || this._root,
        i = n.uuid,
        r = "string" == typeof t ? _o.findByName(n, t) : t,
        s = r ? r.uuid : t,
        o = this._actionsByClip[s];
      return (void 0 !== o && o.actionByRoot[i]) || null;
    }
    stopAllAction() {
      const t = this._actions;
      for (let e = this._nActiveActions - 1; e >= 0; --e) t[e].stop();
      return this;
    }
    update(t) {
      t *= this.timeScale;
      const e = this._actions,
        n = this._nActiveActions,
        i = (this.time += t),
        r = Math.sign(t),
        s = (this._accuIndex ^= 1);
      for (let o = 0; o !== n; ++o) e[o]._update(i, t, r, s);
      const o = this._bindings,
        a = this._nActiveBindings;
      for (let t = 0; t !== a; ++t) o[t].apply(s);
      return this;
    }
    setTime(t) {
      this.time = 0;
      for (let t = 0; t < this._actions.length; t++) this._actions[t].time = 0;
      return this.update(t);
    }
    getRoot() {
      return this._root;
    }
    uncacheClip(t) {
      const e = this._actions,
        n = t.uuid,
        i = this._actionsByClip,
        r = i[n];
      if (void 0 !== r) {
        const t = r.knownActions;
        for (let n = 0, i = t.length; n !== i; ++n) {
          const i = t[n];
          this._deactivateAction(i);
          const r = i._cacheIndex,
            s = e[e.length - 1];
          (i._cacheIndex = null),
            (i._byClipCacheIndex = null),
            (s._cacheIndex = r),
            (e[r] = s),
            e.pop(),
            this._removeInactiveBindingsForAction(i);
        }
        delete i[n];
      }
    }
    uncacheRoot(t) {
      const e = t.uuid,
        n = this._actionsByClip;
      for (const t in n) {
        const i = n[t].actionByRoot[e];
        void 0 !== i &&
          (this._deactivateAction(i), this._removeInactiveAction(i));
      }
      const i = this._bindingsByRootAndName[e];
      if (void 0 !== i)
        for (const t in i) {
          const e = i[t];
          e.restoreOriginalState(), this._removeInactiveBinding(e);
        }
    }
    uncacheAction(t, e) {
      const n = this.existingAction(t, e);
      null !== n && (this._deactivateAction(n), this._removeInactiveAction(n));
    }
  }.prototype._controlInterpolantsResultBuffer = new Float32Array(1));
  class Na {
    constructor(t) {
      "string" == typeof t &&
        (console.warn("THREE.Uniform: Type parameter is no longer needed."),
        (t = arguments[1])),
        (this.value = t);
    }
    clone() {
      return new Na(
        void 0 === this.value.clone ? this.value : this.value.clone()
      );
    }
  }
  function Oa(t, e, n) {
    Er.call(this, t, e), (this.meshPerAttribute = n || 1);
  }
  function za(t, e, n, i, r) {
    (this.buffer = t),
      (this.type = e),
      (this.itemSize = n),
      (this.elementSize = i),
      (this.count = r),
      (this.version = 0);
  }
  function Ba(t, e, n = 0, i = 1 / 0) {
    (this.ray = new ft(t, e)),
      (this.near = n),
      (this.far = i),
      (this.camera = null),
      (this.layers = new Tt()),
      (this.params = {
        Mesh: {},
        Line: { threshold: 1 },
        LOD: {},
        Points: { threshold: 1 },
        Sprite: {},
      }),
      Object.defineProperties(this.params, {
        PointCloud: {
          get: function () {
            return (
              console.warn(
                "THREE.Raycaster: params.PointCloud has been renamed to params.Points."
              ),
              this.Points
            );
          },
        },
      });
  }
  function Ha(t, e) {
    return t.distance - e.distance;
  }
  function Fa(t, e, n, i) {
    if ((t.layers.test(e.layers) && t.raycast(e, n), !0 === i)) {
      const i = t.children;
      for (let t = 0, r = i.length; t < r; t++) Fa(i[t], e, n, !0);
    }
  }
  (Oa.prototype = Object.assign(Object.create(Er.prototype), {
    constructor: Oa,
    isInstancedInterleavedBuffer: !0,
    copy: function (t) {
      return (
        Er.prototype.copy.call(this, t),
        (this.meshPerAttribute = t.meshPerAttribute),
        this
      );
    },
    clone: function (t) {
      const e = Er.prototype.clone.call(this, t);
      return (e.meshPerAttribute = this.meshPerAttribute), e;
    },
    toJSON: function (t) {
      const e = Er.prototype.toJSON.call(this, t);
      return (
        (e.isInstancedInterleavedBuffer = !0),
        (e.meshPerAttribute = this.meshPerAttribute),
        e
      );
    },
  })),
    Object.defineProperty(za.prototype, "needsUpdate", {
      set: function (t) {
        !0 === t && this.version++;
      },
    }),
    Object.assign(za.prototype, {
      isGLBufferAttribute: !0,
      setBuffer: function (t) {
        return (this.buffer = t), this;
      },
      setType: function (t, e) {
        return (this.type = t), (this.elementSize = e), this;
      },
      setItemSize: function (t) {
        return (this.itemSize = t), this;
      },
      setCount: function (t) {
        return (this.count = t), this;
      },
    }),
    Object.assign(Ba.prototype, {
      set: function (t, e) {
        this.ray.set(t, e);
      },
      setFromCamera: function (t, e) {
        e && e.isPerspectiveCamera
          ? (this.ray.origin.setFromMatrixPosition(e.matrixWorld),
            this.ray.direction
              .set(t.x, t.y, 0.5)
              .unproject(e)
              .sub(this.ray.origin)
              .normalize(),
            (this.camera = e))
          : e && e.isOrthographicCamera
          ? (this.ray.origin
              .set(t.x, t.y, (e.near + e.far) / (e.near - e.far))
              .unproject(e),
            this.ray.direction.set(0, 0, -1).transformDirection(e.matrixWorld),
            (this.camera = e))
          : console.error(
              "THREE.Raycaster: Unsupported camera type: " + e.type
            );
      },
      intersectObject: function (t, e = !1, n = []) {
        return Fa(t, this, n, e), n.sort(Ha), n;
      },
      intersectObjects: function (t, e = !1, n = []) {
        for (let i = 0, r = t.length; i < r; i++) Fa(t[i], this, n, e);
        return n.sort(Ha), n;
      },
    });
  const Ua = new P();
  class ka {
    constructor(t = new P(1 / 0, 1 / 0), e = new P(-1 / 0, -1 / 0)) {
      (this.min = t), (this.max = e);
    }
    set(t, e) {
      return this.min.copy(t), this.max.copy(e), this;
    }
    setFromPoints(t) {
      this.makeEmpty();
      for (let e = 0, n = t.length; e < n; e++) this.expandByPoint(t[e]);
      return this;
    }
    setFromCenterAndSize(t, e) {
      const n = Ua.copy(e).multiplyScalar(0.5);
      return this.min.copy(t).sub(n), this.max.copy(t).add(n), this;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      return this.min.copy(t.min), this.max.copy(t.max), this;
    }
    makeEmpty() {
      return (
        (this.min.x = this.min.y = 1 / 0),
        (this.max.x = this.max.y = -1 / 0),
        this
      );
    }
    isEmpty() {
      return this.max.x < this.min.x || this.max.y < this.min.y;
    }
    getCenter(t) {
      return (
        void 0 === t &&
          (console.warn("THREE.Box2: .getCenter() target is now required"),
          (t = new P())),
        this.isEmpty()
          ? t.set(0, 0)
          : t.addVectors(this.min, this.max).multiplyScalar(0.5)
      );
    }
    getSize(t) {
      return (
        void 0 === t &&
          (console.warn("THREE.Box2: .getSize() target is now required"),
          (t = new P())),
        this.isEmpty() ? t.set(0, 0) : t.subVectors(this.max, this.min)
      );
    }
    expandByPoint(t) {
      return this.min.min(t), this.max.max(t), this;
    }
    expandByVector(t) {
      return this.min.sub(t), this.max.add(t), this;
    }
    expandByScalar(t) {
      return this.min.addScalar(-t), this.max.addScalar(t), this;
    }
    containsPoint(t) {
      return !(
        t.x < this.min.x ||
        t.x > this.max.x ||
        t.y < this.min.y ||
        t.y > this.max.y
      );
    }
    containsBox(t) {
      return (
        this.min.x <= t.min.x &&
        t.max.x <= this.max.x &&
        this.min.y <= t.min.y &&
        t.max.y <= this.max.y
      );
    }
    getParameter(t, e) {
      return (
        void 0 === e &&
          (console.warn("THREE.Box2: .getParameter() target is now required"),
          (e = new P())),
        e.set(
          (t.x - this.min.x) / (this.max.x - this.min.x),
          (t.y - this.min.y) / (this.max.y - this.min.y)
        )
      );
    }
    intersectsBox(t) {
      return !(
        t.max.x < this.min.x ||
        t.min.x > this.max.x ||
        t.max.y < this.min.y ||
        t.min.y > this.max.y
      );
    }
    clampPoint(t, e) {
      return (
        void 0 === e &&
          (console.warn("THREE.Box2: .clampPoint() target is now required"),
          (e = new P())),
        e.copy(t).clamp(this.min, this.max)
      );
    }
    distanceToPoint(t) {
      return Ua.copy(t).clamp(this.min, this.max).sub(t).length();
    }
    intersect(t) {
      return this.min.max(t.min), this.max.min(t.max), this;
    }
    union(t) {
      return this.min.min(t.min), this.max.max(t.max), this;
    }
    translate(t) {
      return this.min.add(t), this.max.add(t), this;
    }
    equals(t) {
      return t.min.equals(this.min) && t.max.equals(this.max);
    }
  }
  ka.prototype.isBox2 = !0;
  const Ga = new k(),
    Va = new k();
  function Wa(t) {
    Ut.call(this),
      (this.material = t),
      (this.render = function () {}),
      (this.hasPositions = !1),
      (this.hasNormals = !1),
      (this.hasColors = !1),
      (this.hasUvs = !1),
      (this.positionArray = null),
      (this.normalArray = null),
      (this.colorArray = null),
      (this.uvArray = null),
      (this.count = 0);
  }
  (Wa.prototype = Object.create(Ut.prototype)),
    (Wa.prototype.constructor = Wa),
    (Wa.prototype.isImmediateRenderObject = !0);
  const ja = new k(),
    qa = new mt(),
    Xa = new mt();
  function Ya(t) {
    const e = [];
    t && t.isBone && e.push(t);
    for (let n = 0; n < t.children.length; n++)
      e.push.apply(e, Ya(t.children[n]));
    return e;
  }
  const Ja = new Float32Array(1),
    Za =
      (new Int32Array(Ja.buffer),
      Math.pow(2, 8),
      [0.125, 0.215, 0.35, 0.446, 0.526, 0.582]),
    Qa = 5 + Za.length,
    Ka = new ue({ side: 1, depthWrite: !1, depthTest: !1 }),
    {
      _lodPlanes: $a,
      _sizeLods: tl,
      _sigmas: el,
    } = (new Qe(new $e(), Ka), nl());
  function nl() {
    const t = [],
      e = [],
      n = [];
    let i = 8;
    for (let r = 0; r < Qa; r++) {
      const s = Math.pow(2, i);
      e.push(s);
      let o = 1 / s;
      r > 4 ? (o = Za[r - 8 + 4 - 1]) : 0 == r && (o = 0), n.push(o);
      const a = 1 / (s - 1),
        l = -a / 2,
        c = 1 + a / 2,
        h = [l, l, c, l, c, c, l, l, c, c, l, c],
        u = 6,
        d = 6,
        p = 3,
        f = 2,
        m = 1,
        g = new Float32Array(p * d * u),
        v = new Float32Array(f * d * u),
        _ = new Float32Array(m * d * u);
      for (let t = 0; t < u; t++) {
        const e = ((t % 3) * 2) / 3 - 1,
          n = t > 2 ? 0 : -1,
          i = [
            e,
            n,
            0,
            e + 2 / 3,
            n,
            0,
            e + 2 / 3,
            n + 1,
            0,
            e,
            n,
            0,
            e + 2 / 3,
            n + 1,
            0,
            e,
            n + 1,
            0,
          ];
        g.set(i, p * d * t), v.set(h, f * d * t);
        const r = [t, t, t, t, t, t];
        _.set(r, m * d * t);
      }
      const y = new Ie();
      y.setAttribute("position", new fe(g, p)),
        y.setAttribute("uv", new fe(v, f)),
        y.setAttribute("faceIndex", new fe(_, m)),
        t.push(y),
        i > 4 && i--;
    }
    return { _lodPlanes: t, _sizeLods: e, _sigmas: n };
  }
  function il(t, e) {
    var n = t.__state.conversionName.toString(),
      i = Math.round(t.r),
      r = Math.round(t.g),
      s = Math.round(t.b),
      o = t.a,
      a = Math.round(t.h),
      l = t.s.toFixed(1),
      c = t.v.toFixed(1);
    if (e || "THREE_CHAR_HEX" === n || "SIX_CHAR_HEX" === n) {
      for (var h = t.hex.toString(16); h.length < 6; ) h = "0" + h;
      return "#" + h;
    }
    return "CSS_RGB" === n
      ? "rgb(" + i + "," + r + "," + s + ")"
      : "CSS_RGBA" === n
      ? "rgba(" + i + "," + r + "," + s + "," + o + ")"
      : "HEX" === n
      ? "0x" + t.hex.toString(16)
      : "RGB_ARRAY" === n
      ? "[" + i + "," + r + "," + s + "]"
      : "RGBA_ARRAY" === n
      ? "[" + i + "," + r + "," + s + "," + o + "]"
      : "RGB_OBJ" === n
      ? "{r:" + i + ",g:" + r + ",b:" + s + "}"
      : "RGBA_OBJ" === n
      ? "{r:" + i + ",g:" + r + ",b:" + s + ",a:" + o + "}"
      : "HSV_OBJ" === n
      ? "{h:" + a + ",s:" + l + ",v:" + c + "}"
      : "HSVA_OBJ" === n
      ? "{h:" + a + ",s:" + l + ",v:" + c + ",a:" + o + "}"
      : "unknown format";
  }
  Math.sqrt(5),
    (Ro.create = function (t, e) {
      return (
        console.log("THREE.Curve.create() has been deprecated"),
        (t.prototype = Object.create(Ro.prototype)),
        (t.prototype.constructor = t),
        (t.prototype.getPoint = e),
        t
      );
    }),
    (Zo.prototype.fromPoints = function (t) {
      return (
        console.warn(
          "THREE.Path: .fromPoints() has been renamed to .setFromPoints()."
        ),
        this.setFromPoints(t)
      );
    }),
    (class extends ms {
      constructor(t = 10, e = 10, n = 4473924, i = 8947848) {
        (n = new he(n)), (i = new he(i));
        const r = e / 2,
          s = t / e,
          o = t / 2,
          a = [],
          l = [];
        for (let t = 0, c = 0, h = -o; t <= e; t++, h += s) {
          a.push(-o, 0, h, o, 0, h), a.push(h, 0, -o, h, 0, o);
          const e = t === r ? n : i;
          e.toArray(l, c),
            (c += 3),
            e.toArray(l, c),
            (c += 3),
            e.toArray(l, c),
            (c += 3),
            e.toArray(l, c),
            (c += 3);
        }
        const c = new Ie();
        c.setAttribute("position", new Me(a, 3)),
          c.setAttribute("color", new Me(l, 3)),
          super(c, new os({ vertexColors: !0, toneMapped: !1 })),
          (this.type = "GridHelper");
      }
    }.prototype.setColors = function () {
      console.error(
        "THREE.GridHelper: setColors() has been deprecated, pass them in the constructor instead."
      );
    }),
    (class extends ms {
      constructor(t) {
        const e = Ya(t),
          n = new Ie(),
          i = [],
          r = [],
          s = new he(0, 0, 1),
          o = new he(0, 1, 0);
        for (let t = 0; t < e.length; t++) {
          const n = e[t];
          n.parent &&
            n.parent.isBone &&
            (i.push(0, 0, 0),
            i.push(0, 0, 0),
            r.push(s.r, s.g, s.b),
            r.push(o.r, o.g, o.b));
        }
        n.setAttribute("position", new Me(i, 3)),
          n.setAttribute("color", new Me(r, 3)),
          super(
            n,
            new os({
              vertexColors: !0,
              depthTest: !1,
              depthWrite: !1,
              toneMapped: !1,
              transparent: !0,
            })
          ),
          (this.type = "SkeletonHelper"),
          (this.isSkeletonHelper = !0),
          (this.root = t),
          (this.bones = e),
          (this.matrix = t.matrixWorld),
          (this.matrixAutoUpdate = !1);
      }
      updateMatrixWorld(t) {
        const e = this.bones,
          n = this.geometry,
          i = n.getAttribute("position");
        Xa.copy(this.root.matrixWorld).invert();
        for (let t = 0, n = 0; t < e.length; t++) {
          const r = e[t];
          r.parent &&
            r.parent.isBone &&
            (qa.multiplyMatrices(Xa, r.matrixWorld),
            ja.setFromMatrixPosition(qa),
            i.setXYZ(n, ja.x, ja.y, ja.z),
            qa.multiplyMatrices(Xa, r.parent.matrixWorld),
            ja.setFromMatrixPosition(qa),
            i.setXYZ(n + 1, ja.x, ja.y, ja.z),
            (n += 2));
        }
        (n.getAttribute("position").needsUpdate = !0),
          super.updateMatrixWorld(t);
      }
    }.prototype.update = function () {
      console.error(
        "THREE.SkeletonHelper: update() no longer needs to be called."
      );
    }),
    (wo.prototype.extractUrlBase = function (t) {
      return (
        console.warn(
          "THREE.Loader: .extractUrlBase() has been deprecated. Use THREE.LoaderUtils.extractUrlBase() instead."
        ),
        (function (t) {
          const e = t.lastIndexOf("/");
          return -1 === e ? "./" : t.substr(0, e + 1);
        })(t)
      );
    }),
    (wo.Handlers = {
      add: function () {
        console.error(
          "THREE.Loader: Handlers.add() has been removed. Use LoadingManager.addHandler() instead."
        );
      },
      get: function () {
        console.error(
          "THREE.Loader: Handlers.get() has been removed. Use LoadingManager.getHandler() instead."
        );
      },
    }),
    (ka.prototype.center = function (t) {
      return (
        console.warn("THREE.Box2: .center() has been renamed to .getCenter()."),
        this.getCenter(t)
      );
    }),
    (ka.prototype.empty = function () {
      return (
        console.warn("THREE.Box2: .empty() has been renamed to .isEmpty()."),
        this.isEmpty()
      );
    }),
    (ka.prototype.isIntersectionBox = function (t) {
      return (
        console.warn(
          "THREE.Box2: .isIntersectionBox() has been renamed to .intersectsBox()."
        ),
        this.intersectsBox(t)
      );
    }),
    (ka.prototype.size = function (t) {
      return (
        console.warn("THREE.Box2: .size() has been renamed to .getSize()."),
        this.getSize(t)
      );
    }),
    (W.prototype.center = function (t) {
      return (
        console.warn("THREE.Box3: .center() has been renamed to .getCenter()."),
        this.getCenter(t)
      );
    }),
    (W.prototype.empty = function () {
      return (
        console.warn("THREE.Box3: .empty() has been renamed to .isEmpty()."),
        this.isEmpty()
      );
    }),
    (W.prototype.isIntersectionBox = function (t) {
      return (
        console.warn(
          "THREE.Box3: .isIntersectionBox() has been renamed to .intersectsBox()."
        ),
        this.intersectsBox(t)
      );
    }),
    (W.prototype.isIntersectionSphere = function (t) {
      return (
        console.warn(
          "THREE.Box3: .isIntersectionSphere() has been renamed to .intersectsSphere()."
        ),
        this.intersectsSphere(t)
      );
    }),
    (W.prototype.size = function (t) {
      return (
        console.warn("THREE.Box3: .size() has been renamed to .getSize()."),
        this.getSize(t)
      );
    }),
    (ot.prototype.empty = function () {
      return (
        console.warn("THREE.Sphere: .empty() has been renamed to .isEmpty()."),
        this.isEmpty()
      );
    }),
    (fn.prototype.setFromMatrix = function (t) {
      return (
        console.warn(
          "THREE.Frustum: .setFromMatrix() has been renamed to .setFromProjectionMatrix()."
        ),
        this.setFromProjectionMatrix(t)
      );
    }),
    (class {
      constructor(t = new k(), e = new k()) {
        (this.start = t), (this.end = e);
      }
      set(t, e) {
        return this.start.copy(t), this.end.copy(e), this;
      }
      copy(t) {
        return this.start.copy(t.start), this.end.copy(t.end), this;
      }
      getCenter(t) {
        return (
          void 0 === t &&
            (console.warn("THREE.Line3: .getCenter() target is now required"),
            (t = new k())),
          t.addVectors(this.start, this.end).multiplyScalar(0.5)
        );
      }
      delta(t) {
        return (
          void 0 === t &&
            (console.warn("THREE.Line3: .delta() target is now required"),
            (t = new k())),
          t.subVectors(this.end, this.start)
        );
      }
      distanceSq() {
        return this.start.distanceToSquared(this.end);
      }
      distance() {
        return this.start.distanceTo(this.end);
      }
      at(t, e) {
        return (
          void 0 === e &&
            (console.warn("THREE.Line3: .at() target is now required"),
            (e = new k())),
          this.delta(e).multiplyScalar(t).add(this.start)
        );
      }
      closestPointToPointParameter(t, e) {
        Ga.subVectors(t, this.start), Va.subVectors(this.end, this.start);
        const n = Va.dot(Va);
        let i = Va.dot(Ga) / n;
        return e && (i = R.clamp(i, 0, 1)), i;
      }
      closestPointToPoint(t, e, n) {
        const i = this.closestPointToPointParameter(t, e);
        return (
          void 0 === n &&
            (console.warn(
              "THREE.Line3: .closestPointToPoint() target is now required"
            ),
            (n = new k())),
          this.delta(n).multiplyScalar(i).add(this.start)
        );
      }
      applyMatrix4(t) {
        return this.start.applyMatrix4(t), this.end.applyMatrix4(t), this;
      }
      equals(t) {
        return t.start.equals(this.start) && t.end.equals(this.end);
      }
      clone() {
        return new this.constructor().copy(this);
      }
    }.prototype.center = function (t) {
      return (
        console.warn(
          "THREE.Line3: .center() has been renamed to .getCenter()."
        ),
        this.getCenter(t)
      );
    }),
    (R.random16 = function () {
      return (
        console.warn(
          "THREE.Math: .random16() has been deprecated. Use Math.random() instead."
        ),
        Math.random()
      );
    }),
    (R.nearestPowerOfTwo = function (t) {
      return (
        console.warn(
          "THREE.Math: .nearestPowerOfTwo() has been renamed to .floorPowerOfTwo()."
        ),
        R.floorPowerOfTwo(t)
      );
    }),
    (R.nextPowerOfTwo = function (t) {
      return (
        console.warn(
          "THREE.Math: .nextPowerOfTwo() has been renamed to .ceilPowerOfTwo()."
        ),
        R.ceilPowerOfTwo(t)
      );
    }),
    (D.prototype.flattenToArrayOffset = function (t, e) {
      return (
        console.warn(
          "THREE.Matrix3: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."
        ),
        this.toArray(t, e)
      );
    }),
    (D.prototype.multiplyVector3 = function (t) {
      return (
        console.warn(
          "THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead."
        ),
        t.applyMatrix3(this)
      );
    }),
    (D.prototype.multiplyVector3Array = function () {
      console.error("THREE.Matrix3: .multiplyVector3Array() has been removed.");
    }),
    (D.prototype.applyToBufferAttribute = function (t) {
      return (
        console.warn(
          "THREE.Matrix3: .applyToBufferAttribute() has been removed. Use attribute.applyMatrix3( matrix ) instead."
        ),
        t.applyMatrix3(this)
      );
    }),
    (D.prototype.applyToVector3Array = function () {
      console.error("THREE.Matrix3: .applyToVector3Array() has been removed.");
    }),
    (D.prototype.getInverse = function (t) {
      return (
        console.warn(
          "THREE.Matrix3: .getInverse() has been removed. Use matrixInv.copy( matrix ).invert(); instead."
        ),
        this.copy(t).invert()
      );
    }),
    (mt.prototype.extractPosition = function (t) {
      return (
        console.warn(
          "THREE.Matrix4: .extractPosition() has been renamed to .copyPosition()."
        ),
        this.copyPosition(t)
      );
    }),
    (mt.prototype.flattenToArrayOffset = function (t, e) {
      return (
        console.warn(
          "THREE.Matrix4: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."
        ),
        this.toArray(t, e)
      );
    }),
    (mt.prototype.getPosition = function () {
      return (
        console.warn(
          "THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead."
        ),
        new k().setFromMatrixColumn(this, 3)
      );
    }),
    (mt.prototype.setRotationFromQuaternion = function (t) {
      return (
        console.warn(
          "THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion()."
        ),
        this.makeRotationFromQuaternion(t)
      );
    }),
    (mt.prototype.multiplyToArray = function () {
      console.warn("THREE.Matrix4: .multiplyToArray() has been removed.");
    }),
    (mt.prototype.multiplyVector3 = function (t) {
      return (
        console.warn(
          "THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) instead."
        ),
        t.applyMatrix4(this)
      );
    }),
    (mt.prototype.multiplyVector4 = function (t) {
      return (
        console.warn(
          "THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead."
        ),
        t.applyMatrix4(this)
      );
    }),
    (mt.prototype.multiplyVector3Array = function () {
      console.error("THREE.Matrix4: .multiplyVector3Array() has been removed.");
    }),
    (mt.prototype.rotateAxis = function (t) {
      console.warn(
        "THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead."
      ),
        t.transformDirection(this);
    }),
    (mt.prototype.crossVector = function (t) {
      return (
        console.warn(
          "THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead."
        ),
        t.applyMatrix4(this)
      );
    }),
    (mt.prototype.translate = function () {
      console.error("THREE.Matrix4: .translate() has been removed.");
    }),
    (mt.prototype.rotateX = function () {
      console.error("THREE.Matrix4: .rotateX() has been removed.");
    }),
    (mt.prototype.rotateY = function () {
      console.error("THREE.Matrix4: .rotateY() has been removed.");
    }),
    (mt.prototype.rotateZ = function () {
      console.error("THREE.Matrix4: .rotateZ() has been removed.");
    }),
    (mt.prototype.rotateByAxis = function () {
      console.error("THREE.Matrix4: .rotateByAxis() has been removed.");
    }),
    (mt.prototype.applyToBufferAttribute = function (t) {
      return (
        console.warn(
          "THREE.Matrix4: .applyToBufferAttribute() has been removed. Use attribute.applyMatrix4( matrix ) instead."
        ),
        t.applyMatrix4(this)
      );
    }),
    (mt.prototype.applyToVector3Array = function () {
      console.error("THREE.Matrix4: .applyToVector3Array() has been removed.");
    }),
    (mt.prototype.makeFrustum = function (t, e, n, i, r, s) {
      return (
        console.warn(
          "THREE.Matrix4: .makeFrustum() has been removed. Use .makePerspective( left, right, top, bottom, near, far ) instead."
        ),
        this.makePerspective(t, e, i, n, r, s)
      );
    }),
    (mt.prototype.getInverse = function (t) {
      return (
        console.warn(
          "THREE.Matrix4: .getInverse() has been removed. Use matrixInv.copy( matrix ).invert(); instead."
        ),
        this.copy(t).invert()
      );
    }),
    (Wt.prototype.isIntersectionLine = function (t) {
      return (
        console.warn(
          "THREE.Plane: .isIntersectionLine() has been renamed to .intersectsLine()."
        ),
        this.intersectsLine(t)
      );
    }),
    (U.prototype.multiplyVector3 = function (t) {
      return (
        console.warn(
          "THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead."
        ),
        t.applyQuaternion(this)
      );
    }),
    (U.prototype.inverse = function () {
      return (
        console.warn(
          "THREE.Quaternion: .inverse() has been renamed to invert()."
        ),
        this.invert()
      );
    }),
    (ft.prototype.isIntersectionBox = function (t) {
      return (
        console.warn(
          "THREE.Ray: .isIntersectionBox() has been renamed to .intersectsBox()."
        ),
        this.intersectsBox(t)
      );
    }),
    (ft.prototype.isIntersectionPlane = function (t) {
      return (
        console.warn(
          "THREE.Ray: .isIntersectionPlane() has been renamed to .intersectsPlane()."
        ),
        this.intersectsPlane(t)
      );
    }),
    (ft.prototype.isIntersectionSphere = function (t) {
      return (
        console.warn(
          "THREE.Ray: .isIntersectionSphere() has been renamed to .intersectsSphere()."
        ),
        this.intersectsSphere(t)
      );
    }),
    (ee.prototype.area = function () {
      return (
        console.warn("THREE.Triangle: .area() has been renamed to .getArea()."),
        this.getArea()
      );
    }),
    (ee.prototype.barycoordFromPoint = function (t, e) {
      return (
        console.warn(
          "THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord()."
        ),
        this.getBarycoord(t, e)
      );
    }),
    (ee.prototype.midpoint = function (t) {
      return (
        console.warn(
          "THREE.Triangle: .midpoint() has been renamed to .getMidpoint()."
        ),
        this.getMidpoint(t)
      );
    }),
    (ee.prototypenormal = function (t) {
      return (
        console.warn(
          "THREE.Triangle: .normal() has been renamed to .getNormal()."
        ),
        this.getNormal(t)
      );
    }),
    (ee.prototype.plane = function (t) {
      return (
        console.warn(
          "THREE.Triangle: .plane() has been renamed to .getPlane()."
        ),
        this.getPlane(t)
      );
    }),
    (ee.barycoordFromPoint = function (t, e, n, i, r) {
      return (
        console.warn(
          "THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord()."
        ),
        ee.getBarycoord(t, e, n, i, r)
      );
    }),
    (ee.normal = function (t, e, n, i) {
      return (
        console.warn(
          "THREE.Triangle: .normal() has been renamed to .getNormal()."
        ),
        ee.getNormal(t, e, n, i)
      );
    }),
    (Qo.prototype.extractAllPoints = function (t) {
      return (
        console.warn(
          "THREE.Shape: .extractAllPoints() has been removed. Use .extractPoints() instead."
        ),
        this.extractPoints(t)
      );
    }),
    (Qo.prototype.extrude = function (t) {
      return (
        console.warn(
          "THREE.Shape: .extrude() has been removed. Use ExtrudeGeometry() instead."
        ),
        new Qs(this, t)
      );
    }),
    (Qo.prototype.makeGeometry = function (t) {
      return (
        console.warn(
          "THREE.Shape: .makeGeometry() has been removed. Use ShapeGeometry() instead."
        ),
        new to(this, t)
      );
    }),
    (P.prototype.fromAttribute = function (t, e, n) {
      return (
        console.warn(
          "THREE.Vector2: .fromAttribute() has been renamed to .fromBufferAttribute()."
        ),
        this.fromBufferAttribute(t, e, n)
      );
    }),
    (P.prototype.distanceToManhattan = function (t) {
      return (
        console.warn(
          "THREE.Vector2: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."
        ),
        this.manhattanDistanceTo(t)
      );
    }),
    (P.prototype.lengthManhattan = function () {
      return (
        console.warn(
          "THREE.Vector2: .lengthManhattan() has been renamed to .manhattanLength()."
        ),
        this.manhattanLength()
      );
    }),
    (k.prototype.setEulerFromRotationMatrix = function () {
      console.error(
        "THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead."
      );
    }),
    (k.prototype.setEulerFromQuaternion = function () {
      console.error(
        "THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead."
      );
    }),
    (k.prototype.getPositionFromMatrix = function (t) {
      return (
        console.warn(
          "THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition()."
        ),
        this.setFromMatrixPosition(t)
      );
    }),
    (k.prototype.getScaleFromMatrix = function (t) {
      return (
        console.warn(
          "THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale()."
        ),
        this.setFromMatrixScale(t)
      );
    }),
    (k.prototype.getColumnFromMatrix = function (t, e) {
      return (
        console.warn(
          "THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn()."
        ),
        this.setFromMatrixColumn(e, t)
      );
    }),
    (k.prototype.applyProjection = function (t) {
      return (
        console.warn(
          "THREE.Vector3: .applyProjection() has been removed. Use .applyMatrix4( m ) instead."
        ),
        this.applyMatrix4(t)
      );
    }),
    (k.prototype.fromAttribute = function (t, e, n) {
      return (
        console.warn(
          "THREE.Vector3: .fromAttribute() has been renamed to .fromBufferAttribute()."
        ),
        this.fromBufferAttribute(t, e, n)
      );
    }),
    (k.prototype.distanceToManhattan = function (t) {
      return (
        console.warn(
          "THREE.Vector3: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."
        ),
        this.manhattanDistanceTo(t)
      );
    }),
    (k.prototype.lengthManhattan = function () {
      return (
        console.warn(
          "THREE.Vector3: .lengthManhattan() has been renamed to .manhattanLength()."
        ),
        this.manhattanLength()
      );
    }),
    (H.prototype.fromAttribute = function (t, e, n) {
      return (
        console.warn(
          "THREE.Vector4: .fromAttribute() has been renamed to .fromBufferAttribute()."
        ),
        this.fromBufferAttribute(t, e, n)
      );
    }),
    (H.prototype.lengthManhattan = function () {
      return (
        console.warn(
          "THREE.Vector4: .lengthManhattan() has been renamed to .manhattanLength()."
        ),
        this.manhattanLength()
      );
    }),
    (Ut.prototype.getChildByName = function (t) {
      return (
        console.warn(
          "THREE.Object3D: .getChildByName() has been renamed to .getObjectByName()."
        ),
        this.getObjectByName(t)
      );
    }),
    (Ut.prototype.renderDepth = function () {
      console.warn(
        "THREE.Object3D: .renderDepth has been removed. Use .renderOrder, instead."
      );
    }),
    (Ut.prototype.translate = function (t, e) {
      return (
        console.warn(
          "THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead."
        ),
        this.translateOnAxis(e, t)
      );
    }),
    (Ut.prototype.getWorldRotation = function () {
      console.error(
        "THREE.Object3D: .getWorldRotation() has been removed. Use THREE.Object3D.getWorldQuaternion( target ) instead."
      );
    }),
    (Ut.prototype.applyMatrix = function (t) {
      return (
        console.warn(
          "THREE.Object3D: .applyMatrix() has been renamed to .applyMatrix4()."
        ),
        this.applyMatrix4(t)
      );
    }),
    Object.defineProperties(Ut.prototype, {
      eulerOrder: {
        get: function () {
          return (
            console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."),
            this.rotation.order
          );
        },
        set: function (t) {
          console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."),
            (this.rotation.order = t);
        },
      },
      useQuaternion: {
        get: function () {
          console.warn(
            "THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default."
          );
        },
        set: function () {
          console.warn(
            "THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default."
          );
        },
      },
    }),
    (Qe.prototype.setDrawMode = function () {
      console.error(
        "THREE.Mesh: .setDrawMode() has been removed. The renderer now always assumes THREE.TrianglesDrawMode. Transform your geometry via BufferGeometryUtils.toTrianglesDrawMode() if necessary."
      );
    }),
    Object.defineProperties(Qe.prototype, {
      drawMode: {
        get: function () {
          return (
            console.error(
              "THREE.Mesh: .drawMode has been removed. The renderer now always assumes THREE.TrianglesDrawMode."
            ),
            0
          );
        },
        set: function () {
          console.error(
            "THREE.Mesh: .drawMode has been removed. The renderer now always assumes THREE.TrianglesDrawMode. Transform your geometry via BufferGeometryUtils.toTrianglesDrawMode() if necessary."
          );
        },
      },
    }),
    Object.defineProperties(
      class extends Ut {
        constructor() {
          super(),
            (this._currentLevel = 0),
            (this.type = "LOD"),
            Object.defineProperties(this, {
              levels: { enumerable: !0, value: [] },
              isLOD: { value: !0 },
            }),
            (this.autoUpdate = !0);
        }
        copy(t) {
          super.copy(t, !1);
          const e = t.levels;
          for (let t = 0, n = e.length; t < n; t++) {
            const n = e[t];
            this.addLevel(n.object.clone(), n.distance);
          }
          return (this.autoUpdate = t.autoUpdate), this;
        }
        addLevel(t, e = 0) {
          e = Math.abs(e);
          const n = this.levels;
          let i;
          for (i = 0; i < n.length && !(e < n[i].distance); i++);
          return n.splice(i, 0, { distance: e, object: t }), this.add(t), this;
        }
        getCurrentLevel() {
          return this._currentLevel;
        }
        getObjectForDistance(t) {
          const e = this.levels;
          if (e.length > 0) {
            let n, i;
            for (n = 1, i = e.length; n < i && !(t < e[n].distance); n++);
            return e[n - 1].object;
          }
          return null;
        }
        raycast(t, e) {
          if (this.levels.length > 0) {
            Vr.setFromMatrixPosition(this.matrixWorld);
            const n = t.ray.origin.distanceTo(Vr);
            this.getObjectForDistance(n).raycast(t, e);
          }
        }
        update(t) {
          const e = this.levels;
          if (e.length > 1) {
            Vr.setFromMatrixPosition(t.matrixWorld),
              Wr.setFromMatrixPosition(this.matrixWorld);
            const n = Vr.distanceTo(Wr) / t.zoom;
            let i, r;
            for (
              e[0].object.visible = !0, i = 1, r = e.length;
              i < r && n >= e[i].distance;
              i++
            )
              (e[i - 1].object.visible = !1), (e[i].object.visible = !0);
            for (this._currentLevel = i - 1; i < r; i++)
              e[i].object.visible = !1;
          }
        }
        toJSON(t) {
          const e = super.toJSON(t);
          !1 === this.autoUpdate && (e.object.autoUpdate = !1),
            (e.object.levels = []);
          const n = this.levels;
          for (let t = 0, i = n.length; t < i; t++) {
            const i = n[t];
            e.object.levels.push({
              object: i.object.uuid,
              distance: i.distance,
            });
          }
          return e;
        }
      }.prototype,
      {
        objects: {
          get: function () {
            return (
              console.warn("THREE.LOD: .objects has been renamed to .levels."),
              this.levels
            );
          },
        },
      }
    ),
    Object.defineProperty(ts.prototype, "useVertexTexture", {
      get: function () {
        console.warn("THREE.Skeleton: useVertexTexture has been removed.");
      },
      set: function () {
        console.warn("THREE.Skeleton: useVertexTexture has been removed.");
      },
    }),
    (Zr.prototype.initBones = function () {
      console.error("THREE.SkinnedMesh: initBones() has been removed.");
    }),
    Object.defineProperty(Ro.prototype, "__arcLengthDivisions", {
      get: function () {
        return (
          console.warn(
            "THREE.Curve: .__arcLengthDivisions is now .arcLengthDivisions."
          ),
          this.arcLengthDivisions
        );
      },
      set: function (t) {
        console.warn(
          "THREE.Curve: .__arcLengthDivisions is now .arcLengthDivisions."
        ),
          (this.arcLengthDivisions = t);
      },
    }),
    (on.prototype.setLens = function (t, e) {
      console.warn(
        "THREE.PerspectiveCamera.setLens is deprecated. Use .setFocalLength and .filmGauge for a photographic setup."
      ),
        void 0 !== e && (this.filmGauge = e),
        this.setFocalLength(t);
    }),
    Object.defineProperties(Ko.prototype, {
      onlyShadow: {
        set: function () {
          console.warn("THREE.Light: .onlyShadow has been removed.");
        },
      },
      shadowCameraFov: {
        set: function (t) {
          console.warn(
            "THREE.Light: .shadowCameraFov is now .shadow.camera.fov."
          ),
            (this.shadow.camera.fov = t);
        },
      },
      shadowCameraLeft: {
        set: function (t) {
          console.warn(
            "THREE.Light: .shadowCameraLeft is now .shadow.camera.left."
          ),
            (this.shadow.camera.left = t);
        },
      },
      shadowCameraRight: {
        set: function (t) {
          console.warn(
            "THREE.Light: .shadowCameraRight is now .shadow.camera.right."
          ),
            (this.shadow.camera.right = t);
        },
      },
      shadowCameraTop: {
        set: function (t) {
          console.warn(
            "THREE.Light: .shadowCameraTop is now .shadow.camera.top."
          ),
            (this.shadow.camera.top = t);
        },
      },
      shadowCameraBottom: {
        set: function (t) {
          console.warn(
            "THREE.Light: .shadowCameraBottom is now .shadow.camera.bottom."
          ),
            (this.shadow.camera.bottom = t);
        },
      },
      shadowCameraNear: {
        set: function (t) {
          console.warn(
            "THREE.Light: .shadowCameraNear is now .shadow.camera.near."
          ),
            (this.shadow.camera.near = t);
        },
      },
      shadowCameraFar: {
        set: function (t) {
          console.warn(
            "THREE.Light: .shadowCameraFar is now .shadow.camera.far."
          ),
            (this.shadow.camera.far = t);
        },
      },
      shadowCameraVisible: {
        set: function () {
          console.warn(
            "THREE.Light: .shadowCameraVisible has been removed. Use new THREE.CameraHelper( light.shadow.camera ) instead."
          );
        },
      },
      shadowBias: {
        set: function (t) {
          console.warn("THREE.Light: .shadowBias is now .shadow.bias."),
            (this.shadow.bias = t);
        },
      },
      shadowDarkness: {
        set: function () {
          console.warn("THREE.Light: .shadowDarkness has been removed.");
        },
      },
      shadowMapWidth: {
        set: function (t) {
          console.warn(
            "THREE.Light: .shadowMapWidth is now .shadow.mapSize.width."
          ),
            (this.shadow.mapSize.width = t);
        },
      },
      shadowMapHeight: {
        set: function (t) {
          console.warn(
            "THREE.Light: .shadowMapHeight is now .shadow.mapSize.height."
          ),
            (this.shadow.mapSize.height = t);
        },
      },
    }),
    Object.defineProperties(fe.prototype, {
      length: {
        get: function () {
          return (
            console.warn(
              "THREE.BufferAttribute: .length has been deprecated. Use .count instead."
            ),
            this.array.length
          );
        },
      },
      dynamic: {
        get: function () {
          return (
            console.warn(
              "THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead."
            ),
            this.usage === E
          );
        },
        set: function () {
          console.warn(
            "THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead."
          ),
            this.setUsage(E);
        },
      },
    }),
    (fe.prototype.setDynamic = function (t) {
      return (
        console.warn(
          "THREE.BufferAttribute: .setDynamic() has been deprecated. Use .setUsage() instead."
        ),
        this.setUsage(!0 === t ? E : S),
        this
      );
    }),
    (fe.prototype.copyIndicesArray = function () {
      console.error(
        "THREE.BufferAttribute: .copyIndicesArray() has been removed."
      );
    }),
    (fe.prototype.setArray = function () {
      console.error(
        "THREE.BufferAttribute: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers"
      );
    }),
    (Ie.prototype.addIndex = function (t) {
      console.warn(
        "THREE.BufferGeometry: .addIndex() has been renamed to .setIndex()."
      ),
        this.setIndex(t);
    }),
    (Ie.prototype.addAttribute = function (t, e) {
      return (
        console.warn(
          "THREE.BufferGeometry: .addAttribute() has been renamed to .setAttribute()."
        ),
        (e && e.isBufferAttribute) || (e && e.isInterleavedBufferAttribute)
          ? "index" === t
            ? (console.warn(
                "THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute."
              ),
              this.setIndex(e),
              this)
            : this.setAttribute(t, e)
          : (console.warn(
              "THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."
            ),
            this.setAttribute(t, new fe(arguments[1], arguments[2])))
      );
    }),
    (Ie.prototype.addDrawCall = function (t, e, n) {
      void 0 !== n &&
        console.warn(
          "THREE.BufferGeometry: .addDrawCall() no longer supports indexOffset."
        ),
        console.warn(
          "THREE.BufferGeometry: .addDrawCall() is now .addGroup()."
        ),
        this.addGroup(t, e);
    }),
    (Ie.prototype.clearDrawCalls = function () {
      console.warn(
        "THREE.BufferGeometry: .clearDrawCalls() is now .clearGroups()."
      ),
        this.clearGroups();
    }),
    (Ie.prototype.computeOffsets = function () {
      console.warn("THREE.BufferGeometry: .computeOffsets() has been removed.");
    }),
    (Ie.prototype.removeAttribute = function (t) {
      return (
        console.warn(
          "THREE.BufferGeometry: .removeAttribute() has been renamed to .deleteAttribute()."
        ),
        this.deleteAttribute(t)
      );
    }),
    (Ie.prototype.applyMatrix = function (t) {
      return (
        console.warn(
          "THREE.BufferGeometry: .applyMatrix() has been renamed to .applyMatrix4()."
        ),
        this.applyMatrix4(t)
      );
    }),
    Object.defineProperties(Ie.prototype, {
      drawcalls: {
        get: function () {
          return (
            console.error(
              "THREE.BufferGeometry: .drawcalls has been renamed to .groups."
            ),
            this.groups
          );
        },
      },
      offsets: {
        get: function () {
          return (
            console.warn(
              "THREE.BufferGeometry: .offsets has been renamed to .groups."
            ),
            this.groups
          );
        },
      },
    }),
    Object.defineProperties(pa.prototype, {
      maxInstancedCount: {
        get: function () {
          return (
            console.warn(
              "THREE.InstancedBufferGeometry: .maxInstancedCount has been renamed to .instanceCount."
            ),
            this.instanceCount
          );
        },
        set: function (t) {
          console.warn(
            "THREE.InstancedBufferGeometry: .maxInstancedCount has been renamed to .instanceCount."
          ),
            (this.instanceCount = t);
        },
      },
    }),
    Object.defineProperties(Ba.prototype, {
      linePrecision: {
        get: function () {
          return (
            console.warn(
              "THREE.Raycaster: .linePrecision has been deprecated. Use .params.Line.threshold instead."
            ),
            this.params.Line.threshold
          );
        },
        set: function (t) {
          console.warn(
            "THREE.Raycaster: .linePrecision has been deprecated. Use .params.Line.threshold instead."
          ),
            (this.params.Line.threshold = t);
        },
      },
    }),
    Object.defineProperties(Er.prototype, {
      dynamic: {
        get: function () {
          return (
            console.warn(
              "THREE.InterleavedBuffer: .length has been deprecated. Use .usage instead."
            ),
            this.usage === E
          );
        },
        set: function (t) {
          console.warn(
            "THREE.InterleavedBuffer: .length has been deprecated. Use .usage instead."
          ),
            this.setUsage(t);
        },
      },
    }),
    (Er.prototype.setDynamic = function (t) {
      return (
        console.warn(
          "THREE.InterleavedBuffer: .setDynamic() has been deprecated. Use .setUsage() instead."
        ),
        this.setUsage(!0 === t ? E : S),
        this
      );
    }),
    (Er.prototype.setArray = function () {
      console.error(
        "THREE.InterleavedBuffer: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers"
      );
    }),
    (Qs.prototype.getArrays = function () {
      console.error("THREE.ExtrudeGeometry: .getArrays() has been removed.");
    }),
    (Qs.prototype.addShapeList = function () {
      console.error("THREE.ExtrudeGeometry: .addShapeList() has been removed.");
    }),
    (Qs.prototype.addShape = function () {
      console.error("THREE.ExtrudeGeometry: .addShape() has been removed.");
    }),
    (Sr.prototype.dispose = function () {
      console.error("THREE.Scene: .dispose() has been removed.");
    }),
    Object.defineProperties(Na.prototype, {
      dynamic: {
        set: function () {
          console.warn(
            "THREE.Uniform: .dynamic has been removed. Use object.onBeforeRender() instead."
          );
        },
      },
      onUpdate: {
        value: function () {
          return (
            console.warn(
              "THREE.Uniform: .onUpdate() has been removed. Use object.onBeforeRender() instead."
            ),
            this
          );
        },
      },
    }),
    Object.defineProperties(ie.prototype, {
      wrapAround: {
        get: function () {
          console.warn("THREE.Material: .wrapAround has been removed.");
        },
        set: function () {
          console.warn("THREE.Material: .wrapAround has been removed.");
        },
      },
      overdraw: {
        get: function () {
          console.warn("THREE.Material: .overdraw has been removed.");
        },
        set: function () {
          console.warn("THREE.Material: .overdraw has been removed.");
        },
      },
      wrapRGB: {
        get: function () {
          return (
            console.warn("THREE.Material: .wrapRGB has been removed."), new he()
          );
        },
      },
      shading: {
        get: function () {
          console.error(
            "THREE." +
              this.type +
              ": .shading has been removed. Use the boolean .flatShading instead."
          );
        },
        set: function (t) {
          console.warn(
            "THREE." +
              this.type +
              ": .shading has been removed. Use the boolean .flatShading instead."
          ),
            (this.flatShading = 1 === t);
        },
      },
      stencilMask: {
        get: function () {
          return (
            console.warn(
              "THREE." +
                this.type +
                ": .stencilMask has been removed. Use .stencilFuncMask instead."
            ),
            this.stencilFuncMask
          );
        },
        set: function (t) {
          console.warn(
            "THREE." +
              this.type +
              ": .stencilMask has been removed. Use .stencilFuncMask instead."
          ),
            (this.stencilFuncMask = t);
        },
      },
    }),
    Object.defineProperties(io.prototype, {
      metal: {
        get: function () {
          return (
            console.warn(
              "THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead."
            ),
            !1
          );
        },
        set: function () {
          console.warn(
            "THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead"
          );
        },
      },
    }),
    Object.defineProperties(no.prototype, {
      transparency: {
        get: function () {
          return (
            console.warn(
              "THREE.MeshPhysicalMaterial: .transparency has been renamed to .transmission."
            ),
            this.transmission
          );
        },
        set: function (t) {
          console.warn(
            "THREE.MeshPhysicalMaterial: .transparency has been renamed to .transmission."
          ),
            (this.transmission = t);
        },
      },
    }),
    Object.defineProperties(rn.prototype, {
      derivatives: {
        get: function () {
          return (
            console.warn(
              "THREE.ShaderMaterial: .derivatives has been moved to .extensions.derivatives."
            ),
            this.extensions.derivatives
          );
        },
        set: function (t) {
          console.warn(
            "THREE. ShaderMaterial: .derivatives has been moved to .extensions.derivatives."
          ),
            (this.extensions.derivatives = t);
        },
      },
    }),
    (br.prototype.clearTarget = function (t, e, n, i) {
      console.warn(
        "THREE.WebGLRenderer: .clearTarget() has been deprecated. Use .setRenderTarget() and .clear() instead."
      ),
        this.setRenderTarget(t),
        this.clear(e, n, i);
    }),
    (br.prototype.animate = function (t) {
      console.warn(
        "THREE.WebGLRenderer: .animate() is now .setAnimationLoop()."
      ),
        this.setAnimationLoop(t);
    }),
    (br.prototype.getCurrentRenderTarget = function () {
      return (
        console.warn(
          "THREE.WebGLRenderer: .getCurrentRenderTarget() is now .getRenderTarget()."
        ),
        this.getRenderTarget()
      );
    }),
    (br.prototype.getMaxAnisotropy = function () {
      return (
        console.warn(
          "THREE.WebGLRenderer: .getMaxAnisotropy() is now .capabilities.getMaxAnisotropy()."
        ),
        this.capabilities.getMaxAnisotropy()
      );
    }),
    (br.prototype.getPrecision = function () {
      return (
        console.warn(
          "THREE.WebGLRenderer: .getPrecision() is now .capabilities.precision."
        ),
        this.capabilities.precision
      );
    }),
    (br.prototype.resetGLState = function () {
      return (
        console.warn(
          "THREE.WebGLRenderer: .resetGLState() is now .state.reset()."
        ),
        this.state.reset()
      );
    }),
    (br.prototype.supportsFloatTextures = function () {
      return (
        console.warn(
          "THREE.WebGLRenderer: .supportsFloatTextures() is now .extensions.get( 'OES_texture_float' )."
        ),
        this.extensions.get("OES_texture_float")
      );
    }),
    (br.prototype.supportsHalfFloatTextures = function () {
      return (
        console.warn(
          "THREE.WebGLRenderer: .supportsHalfFloatTextures() is now .extensions.get( 'OES_texture_half_float' )."
        ),
        this.extensions.get("OES_texture_half_float")
      );
    }),
    (br.prototype.supportsStandardDerivatives = function () {
      return (
        console.warn(
          "THREE.WebGLRenderer: .supportsStandardDerivatives() is now .extensions.get( 'OES_standard_derivatives' )."
        ),
        this.extensions.get("OES_standard_derivatives")
      );
    }),
    (br.prototype.supportsCompressedTextureS3TC = function () {
      return (
        console.warn(
          "THREE.WebGLRenderer: .supportsCompressedTextureS3TC() is now .extensions.get( 'WEBGL_compressed_texture_s3tc' )."
        ),
        this.extensions.get("WEBGL_compressed_texture_s3tc")
      );
    }),
    (br.prototype.supportsCompressedTexturePVRTC = function () {
      return (
        console.warn(
          "THREE.WebGLRenderer: .supportsCompressedTexturePVRTC() is now .extensions.get( 'WEBGL_compressed_texture_pvrtc' )."
        ),
        this.extensions.get("WEBGL_compressed_texture_pvrtc")
      );
    }),
    (br.prototype.supportsBlendMinMax = function () {
      return (
        console.warn(
          "THREE.WebGLRenderer: .supportsBlendMinMax() is now .extensions.get( 'EXT_blend_minmax' )."
        ),
        this.extensions.get("EXT_blend_minmax")
      );
    }),
    (br.prototype.supportsVertexTextures = function () {
      return (
        console.warn(
          "THREE.WebGLRenderer: .supportsVertexTextures() is now .capabilities.vertexTextures."
        ),
        this.capabilities.vertexTextures
      );
    }),
    (br.prototype.supportsInstancedArrays = function () {
      return (
        console.warn(
          "THREE.WebGLRenderer: .supportsInstancedArrays() is now .extensions.get( 'ANGLE_instanced_arrays' )."
        ),
        this.extensions.get("ANGLE_instanced_arrays")
      );
    }),
    (br.prototype.enableScissorTest = function (t) {
      console.warn(
        "THREE.WebGLRenderer: .enableScissorTest() is now .setScissorTest()."
      ),
        this.setScissorTest(t);
    }),
    (br.prototype.initMaterial = function () {
      console.warn("THREE.WebGLRenderer: .initMaterial() has been removed.");
    }),
    (br.prototype.addPrePlugin = function () {
      console.warn("THREE.WebGLRenderer: .addPrePlugin() has been removed.");
    }),
    (br.prototype.addPostPlugin = function () {
      console.warn("THREE.WebGLRenderer: .addPostPlugin() has been removed.");
    }),
    (br.prototype.updateShadowMap = function () {
      console.warn("THREE.WebGLRenderer: .updateShadowMap() has been removed.");
    }),
    (br.prototype.setFaceCulling = function () {
      console.warn("THREE.WebGLRenderer: .setFaceCulling() has been removed.");
    }),
    (br.prototype.allocTextureUnit = function () {
      console.warn(
        "THREE.WebGLRenderer: .allocTextureUnit() has been removed."
      );
    }),
    (br.prototype.setTexture = function () {
      console.warn("THREE.WebGLRenderer: .setTexture() has been removed.");
    }),
    (br.prototype.setTexture2D = function () {
      console.warn("THREE.WebGLRenderer: .setTexture2D() has been removed.");
    }),
    (br.prototype.setTextureCube = function () {
      console.warn("THREE.WebGLRenderer: .setTextureCube() has been removed.");
    }),
    (br.prototype.getActiveMipMapLevel = function () {
      return (
        console.warn(
          "THREE.WebGLRenderer: .getActiveMipMapLevel() is now .getActiveMipmapLevel()."
        ),
        this.getActiveMipmapLevel()
      );
    }),
    Object.defineProperties(br.prototype, {
      shadowMapEnabled: {
        get: function () {
          return this.shadowMap.enabled;
        },
        set: function (t) {
          console.warn(
            "THREE.WebGLRenderer: .shadowMapEnabled is now .shadowMap.enabled."
          ),
            (this.shadowMap.enabled = t);
        },
      },
      shadowMapType: {
        get: function () {
          return this.shadowMap.type;
        },
        set: function (t) {
          console.warn(
            "THREE.WebGLRenderer: .shadowMapType is now .shadowMap.type."
          ),
            (this.shadowMap.type = t);
        },
      },
      shadowMapCullFace: {
        get: function () {
          console.warn(
            "THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead."
          );
        },
        set: function () {
          console.warn(
            "THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead."
          );
        },
      },
      context: {
        get: function () {
          return (
            console.warn(
              "THREE.WebGLRenderer: .context has been removed. Use .getContext() instead."
            ),
            this.getContext()
          );
        },
      },
      vr: {
        get: function () {
          return (
            console.warn("THREE.WebGLRenderer: .vr has been renamed to .xr"),
            this.xr
          );
        },
      },
      gammaInput: {
        get: function () {
          return (
            console.warn(
              "THREE.WebGLRenderer: .gammaInput has been removed. Set the encoding for textures via Texture.encoding instead."
            ),
            !1
          );
        },
        set: function () {
          console.warn(
            "THREE.WebGLRenderer: .gammaInput has been removed. Set the encoding for textures via Texture.encoding instead."
          );
        },
      },
      gammaOutput: {
        get: function () {
          return (
            console.warn(
              "THREE.WebGLRenderer: .gammaOutput has been removed. Set WebGLRenderer.outputEncoding instead."
            ),
            !1
          );
        },
        set: function (t) {
          console.warn(
            "THREE.WebGLRenderer: .gammaOutput has been removed. Set WebGLRenderer.outputEncoding instead."
          ),
            (this.outputEncoding = !0 === t ? 3001 : w);
        },
      },
      toneMappingWhitePoint: {
        get: function () {
          return (
            console.warn(
              "THREE.WebGLRenderer: .toneMappingWhitePoint has been removed."
            ),
            1
          );
        },
        set: function () {
          console.warn(
            "THREE.WebGLRenderer: .toneMappingWhitePoint has been removed."
          );
        },
      },
    }),
    Object.defineProperties(dr.prototype, {
      cullFace: {
        get: function () {
          console.warn(
            "THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead."
          );
        },
        set: function () {
          console.warn(
            "THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead."
          );
        },
      },
      renderReverseSided: {
        get: function () {
          console.warn(
            "THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead."
          );
        },
        set: function () {
          console.warn(
            "THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead."
          );
        },
      },
      renderSingleSided: {
        get: function () {
          console.warn(
            "THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead."
          );
        },
        set: function () {
          console.warn(
            "THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead."
          );
        },
      },
    }),
    Object.defineProperties(F.prototype, {
      wrapS: {
        get: function () {
          return (
            console.warn(
              "THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."
            ),
            this.texture.wrapS
          );
        },
        set: function (t) {
          console.warn(
            "THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."
          ),
            (this.texture.wrapS = t);
        },
      },
      wrapT: {
        get: function () {
          return (
            console.warn(
              "THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."
            ),
            this.texture.wrapT
          );
        },
        set: function (t) {
          console.warn(
            "THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."
          ),
            (this.texture.wrapT = t);
        },
      },
      magFilter: {
        get: function () {
          return (
            console.warn(
              "THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."
            ),
            this.texture.magFilter
          );
        },
        set: function (t) {
          console.warn(
            "THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."
          ),
            (this.texture.magFilter = t);
        },
      },
      minFilter: {
        get: function () {
          return (
            console.warn(
              "THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."
            ),
            this.texture.minFilter
          );
        },
        set: function (t) {
          console.warn(
            "THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."
          ),
            (this.texture.minFilter = t);
        },
      },
      anisotropy: {
        get: function () {
          return (
            console.warn(
              "THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."
            ),
            this.texture.anisotropy
          );
        },
        set: function (t) {
          console.warn(
            "THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."
          ),
            (this.texture.anisotropy = t);
        },
      },
      offset: {
        get: function () {
          return (
            console.warn(
              "THREE.WebGLRenderTarget: .offset is now .texture.offset."
            ),
            this.texture.offset
          );
        },
        set: function (t) {
          console.warn(
            "THREE.WebGLRenderTarget: .offset is now .texture.offset."
          ),
            (this.texture.offset = t);
        },
      },
      repeat: {
        get: function () {
          return (
            console.warn(
              "THREE.WebGLRenderTarget: .repeat is now .texture.repeat."
            ),
            this.texture.repeat
          );
        },
        set: function (t) {
          console.warn(
            "THREE.WebGLRenderTarget: .repeat is now .texture.repeat."
          ),
            (this.texture.repeat = t);
        },
      },
      format: {
        get: function () {
          return (
            console.warn(
              "THREE.WebGLRenderTarget: .format is now .texture.format."
            ),
            this.texture.format
          );
        },
        set: function (t) {
          console.warn(
            "THREE.WebGLRenderTarget: .format is now .texture.format."
          ),
            (this.texture.format = t);
        },
      },
      type: {
        get: function () {
          return (
            console.warn(
              "THREE.WebGLRenderTarget: .type is now .texture.type."
            ),
            this.texture.type
          );
        },
        set: function (t) {
          console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."),
            (this.texture.type = t);
        },
      },
      generateMipmaps: {
        get: function () {
          return (
            console.warn(
              "THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."
            ),
            this.texture.generateMipmaps
          );
        },
        set: function (t) {
          console.warn(
            "THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."
          ),
            (this.texture.generateMipmaps = t);
        },
      },
    }),
    Object.defineProperties(
      class extends Ut {
        constructor(t) {
          super(),
            (this.type = "Audio"),
            (this.listener = t),
            (this.context = t.context),
            (this.gain = this.context.createGain()),
            this.gain.connect(t.getInput()),
            (this.autoplay = !1),
            (this.buffer = null),
            (this.detune = 0),
            (this.loop = !1),
            (this.loopStart = 0),
            (this.loopEnd = 0),
            (this.offset = 0),
            (this.duration = void 0),
            (this.playbackRate = 1),
            (this.isPlaying = !1),
            (this.hasPlaybackControl = !0),
            (this.source = null),
            (this.sourceType = "empty"),
            (this._startedAt = 0),
            (this._progress = 0),
            (this._connected = !1),
            (this.filters = []);
        }
        getOutput() {
          return this.gain;
        }
        setNodeSource(t) {
          return (
            (this.hasPlaybackControl = !1),
            (this.sourceType = "audioNode"),
            (this.source = t),
            this.connect(),
            this
          );
        }
        setMediaElementSource(t) {
          return (
            (this.hasPlaybackControl = !1),
            (this.sourceType = "mediaNode"),
            (this.source = this.context.createMediaElementSource(t)),
            this.connect(),
            this
          );
        }
        setMediaStreamSource(t) {
          return (
            (this.hasPlaybackControl = !1),
            (this.sourceType = "mediaStreamNode"),
            (this.source = this.context.createMediaStreamSource(t)),
            this.connect(),
            this
          );
        }
        setBuffer(t) {
          return (
            (this.buffer = t),
            (this.sourceType = "buffer"),
            this.autoplay && this.play(),
            this
          );
        }
        play(t = 0) {
          if (!0 === this.isPlaying)
            return void console.warn("THREE.Audio: Audio is already playing.");
          if (!1 === this.hasPlaybackControl)
            return void console.warn(
              "THREE.Audio: this Audio has no playback control."
            );
          this._startedAt = this.context.currentTime + t;
          const e = this.context.createBufferSource();
          return (
            (e.buffer = this.buffer),
            (e.loop = this.loop),
            (e.loopStart = this.loopStart),
            (e.loopEnd = this.loopEnd),
            (e.onended = this.onEnded.bind(this)),
            e.start(
              this._startedAt,
              this._progress + this.offset,
              this.duration
            ),
            (this.isPlaying = !0),
            (this.source = e),
            this.setDetune(this.detune),
            this.setPlaybackRate(this.playbackRate),
            this.connect()
          );
        }
        pause() {
          if (!1 !== this.hasPlaybackControl)
            return (
              !0 === this.isPlaying &&
                ((this._progress +=
                  Math.max(this.context.currentTime - this._startedAt, 0) *
                  this.playbackRate),
                !0 === this.loop &&
                  (this._progress =
                    this._progress % (this.duration || this.buffer.duration)),
                this.source.stop(),
                (this.source.onended = null),
                (this.isPlaying = !1)),
              this
            );
          console.warn("THREE.Audio: this Audio has no playback control.");
        }
        stop() {
          if (!1 !== this.hasPlaybackControl)
            return (
              (this._progress = 0),
              this.source.stop(),
              (this.source.onended = null),
              (this.isPlaying = !1),
              this
            );
          console.warn("THREE.Audio: this Audio has no playback control.");
        }
        connect() {
          if (this.filters.length > 0) {
            this.source.connect(this.filters[0]);
            for (let t = 1, e = this.filters.length; t < e; t++)
              this.filters[t - 1].connect(this.filters[t]);
            this.filters[this.filters.length - 1].connect(this.getOutput());
          } else this.source.connect(this.getOutput());
          return (this._connected = !0), this;
        }
        disconnect() {
          if (this.filters.length > 0) {
            this.source.disconnect(this.filters[0]);
            for (let t = 1, e = this.filters.length; t < e; t++)
              this.filters[t - 1].disconnect(this.filters[t]);
            this.filters[this.filters.length - 1].disconnect(this.getOutput());
          } else this.source.disconnect(this.getOutput());
          return (this._connected = !1), this;
        }
        getFilters() {
          return this.filters;
        }
        setFilters(t) {
          return (
            t || (t = []),
            !0 === this._connected
              ? (this.disconnect(), (this.filters = t.slice()), this.connect())
              : (this.filters = t.slice()),
            this
          );
        }
        setDetune(t) {
          if (((this.detune = t), void 0 !== this.source.detune))
            return (
              !0 === this.isPlaying &&
                this.source.detune.setTargetAtTime(
                  this.detune,
                  this.context.currentTime,
                  0.01
                ),
              this
            );
        }
        getDetune() {
          return this.detune;
        }
        getFilter() {
          return this.getFilters()[0];
        }
        setFilter(t) {
          return this.setFilters(t ? [t] : []);
        }
        setPlaybackRate(t) {
          if (!1 !== this.hasPlaybackControl)
            return (
              (this.playbackRate = t),
              !0 === this.isPlaying &&
                this.source.playbackRate.setTargetAtTime(
                  this.playbackRate,
                  this.context.currentTime,
                  0.01
                ),
              this
            );
          console.warn("THREE.Audio: this Audio has no playback control.");
        }
        getPlaybackRate() {
          return this.playbackRate;
        }
        onEnded() {
          this.isPlaying = !1;
        }
        getLoop() {
          return !1 === this.hasPlaybackControl
            ? (console.warn("THREE.Audio: this Audio has no playback control."),
              !1)
            : this.loop;
        }
        setLoop(t) {
          if (!1 !== this.hasPlaybackControl)
            return (
              (this.loop = t),
              !0 === this.isPlaying && (this.source.loop = this.loop),
              this
            );
          console.warn("THREE.Audio: this Audio has no playback control.");
        }
        setLoopStart(t) {
          return (this.loopStart = t), this;
        }
        setLoopEnd(t) {
          return (this.loopEnd = t), this;
        }
        getVolume() {
          return this.gain.gain.value;
        }
        setVolume(t) {
          return (
            this.gain.gain.setTargetAtTime(t, this.context.currentTime, 0.01),
            this
          );
        }
      }.prototype,
      {
        load: {
          value: function (t) {
            console.warn(
              "THREE.Audio: .load has been deprecated. Use THREE.AudioLoader instead."
            );
            const e = this;
            return (
              new ya().load(t, function (t) {
                e.setBuffer(t);
              }),
              this
            );
          },
        },
        startTime: {
          set: function () {
            console.warn("THREE.Audio: .startTime is now .play( delay ).");
          },
        },
      }
    ),
    (class {
      constructor(t, e = 2048) {
        (this.analyser = t.context.createAnalyser()),
          (this.analyser.fftSize = e),
          (this.data = new Uint8Array(this.analyser.frequencyBinCount)),
          t.getOutput().connect(this.analyser);
      }
      getFrequencyData() {
        return this.analyser.getByteFrequencyData(this.data), this.data;
      }
      getAverageFrequency() {
        let t = 0;
        const e = this.getFrequencyData();
        for (let n = 0; n < e.length; n++) t += e[n];
        return t / e.length;
      }
    }.prototype.getData = function () {
      return (
        console.warn(
          "THREE.AudioAnalyser: .getData() is now .getFrequencyData()."
        ),
        this.getFrequencyData()
      );
    }),
    (ln.prototype.updateCubeMap = function (t, e) {
      return (
        console.warn("THREE.CubeCamera: .updateCubeMap() is now .update()."),
        this.update(t, e)
      );
    }),
    (ln.prototype.clear = function (t, e, n, i) {
      return (
        console.warn(
          "THREE.CubeCamera: .clear() is now .renderTarget.clear()."
        ),
        this.renderTarget.clear(t, e, n, i)
      );
    }),
    (N.crossOrigin = void 0),
    (N.loadTexture = function (t, e, n, i) {
      console.warn(
        "THREE.ImageUtils.loadTexture has been deprecated. Use THREE.TextureLoader() instead."
      );
      const r = new Co();
      r.setCrossOrigin(this.crossOrigin);
      const s = r.load(t, n, void 0, i);
      return e && (s.mapping = e), s;
    }),
    (N.loadTextureCube = function (t, e, n, i) {
      console.warn(
        "THREE.ImageUtils.loadTextureCube has been deprecated. Use THREE.CubeTextureLoader() instead."
      );
      const r = new Ao();
      r.setCrossOrigin(this.crossOrigin);
      const s = r.load(t, n, void 0, i);
      return e && (s.mapping = e), s;
    }),
    (N.loadCompressedTexture = function () {
      console.error(
        "THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead."
      );
    }),
    (N.loadCompressedTextureCube = function () {
      console.error(
        "THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead."
      );
    }),
    "undefined" != typeof __THREE_DEVTOOLS__ &&
      __THREE_DEVTOOLS__.dispatchEvent(
        new CustomEvent("register", { detail: { revision: "126" } })
      ),
    "undefined" != typeof window &&
      (window.__THREE__
        ? console.warn(
            "WARNING: Multiple instances of Three.js being imported."
          )
        : (window.__THREE__ = "126"));
  var rl = Array.prototype.forEach,
    sl = Array.prototype.slice,
    ol = {
      BREAK: {},
      extend: function (t) {
        return (
          this.each(
            sl.call(arguments, 1),
            function (e) {
              (this.isObject(e) ? Object.keys(e) : []).forEach(
                function (n) {
                  this.isUndefined(e[n]) || (t[n] = e[n]);
                }.bind(this)
              );
            },
            this
          ),
          t
        );
      },
      defaults: function (t) {
        return (
          this.each(
            sl.call(arguments, 1),
            function (e) {
              (this.isObject(e) ? Object.keys(e) : []).forEach(
                function (n) {
                  this.isUndefined(t[n]) && (t[n] = e[n]);
                }.bind(this)
              );
            },
            this
          ),
          t
        );
      },
      compose: function () {
        var t = sl.call(arguments);
        return function () {
          for (var e = sl.call(arguments), n = t.length - 1; n >= 0; n--)
            e = [t[n].apply(this, e)];
          return e[0];
        };
      },
      each: function (t, e, n) {
        if (t)
          if (rl && t.forEach && t.forEach === rl) t.forEach(e, n);
          else if (t.length === t.length + 0) {
            var i,
              r = void 0;
            for (r = 0, i = t.length; r < i; r++)
              if (r in t && e.call(n, t[r], r) === this.BREAK) return;
          } else for (var s in t) if (e.call(n, t[s], s) === this.BREAK) return;
      },
      defer: function (t) {
        setTimeout(t, 0);
      },
      debounce: function (t, e, n) {
        var i = void 0;
        return function () {
          var r = this,
            s = arguments;
          function o() {
            (i = null), n || t.apply(r, s);
          }
          var a = n || !i;
          clearTimeout(i), (i = setTimeout(o, e)), a && t.apply(r, s);
        };
      },
      toArray: function (t) {
        return t.toArray ? t.toArray() : sl.call(t);
      },
      isUndefined: function (t) {
        return void 0 === t;
      },
      isNull: function (t) {
        return null === t;
      },
      isNaN: (function (t) {
        function e(e) {
          return t.apply(this, arguments);
        }
        return (
          (e.toString = function () {
            return t.toString();
          }),
          e
        );
      })(function (t) {
        return isNaN(t);
      }),
      isArray:
        Array.isArray ||
        function (t) {
          return t.constructor === Array;
        },
      isObject: function (t) {
        return t === Object(t);
      },
      isNumber: function (t) {
        return t === t + 0;
      },
      isString: function (t) {
        return t === t + "";
      },
      isBoolean: function (t) {
        return !1 === t || !0 === t;
      },
      isFunction: function (t) {
        return t instanceof Function;
      },
    },
    al = [
      {
        litmus: ol.isString,
        conversions: {
          THREE_CHAR_HEX: {
            read: function (t) {
              var e = t.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
              return (
                null !== e && {
                  space: "HEX",
                  hex: parseInt(
                    "0x" +
                      e[1].toString() +
                      e[1].toString() +
                      e[2].toString() +
                      e[2].toString() +
                      e[3].toString() +
                      e[3].toString(),
                    0
                  ),
                }
              );
            },
            write: il,
          },
          SIX_CHAR_HEX: {
            read: function (t) {
              var e = t.match(/^#([A-F0-9]{6})$/i);
              return (
                null !== e && {
                  space: "HEX",
                  hex: parseInt("0x" + e[1].toString(), 0),
                }
              );
            },
            write: il,
          },
          CSS_RGB: {
            read: function (t) {
              var e = t.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
              return (
                null !== e && {
                  space: "RGB",
                  r: parseFloat(e[1]),
                  g: parseFloat(e[2]),
                  b: parseFloat(e[3]),
                }
              );
            },
            write: il,
          },
          CSS_RGBA: {
            read: function (t) {
              var e = t.match(
                /^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/
              );
              return (
                null !== e && {
                  space: "RGB",
                  r: parseFloat(e[1]),
                  g: parseFloat(e[2]),
                  b: parseFloat(e[3]),
                  a: parseFloat(e[4]),
                }
              );
            },
            write: il,
          },
        },
      },
      {
        litmus: ol.isNumber,
        conversions: {
          HEX: {
            read: function (t) {
              return { space: "HEX", hex: t, conversionName: "HEX" };
            },
            write: function (t) {
              return t.hex;
            },
          },
        },
      },
      {
        litmus: ol.isArray,
        conversions: {
          RGB_ARRAY: {
            read: function (t) {
              return (
                3 === t.length && { space: "RGB", r: t[0], g: t[1], b: t[2] }
              );
            },
            write: function (t) {
              return [t.r, t.g, t.b];
            },
          },
          RGBA_ARRAY: {
            read: function (t) {
              return (
                4 === t.length && {
                  space: "RGB",
                  r: t[0],
                  g: t[1],
                  b: t[2],
                  a: t[3],
                }
              );
            },
            write: function (t) {
              return [t.r, t.g, t.b, t.a];
            },
          },
        },
      },
      {
        litmus: ol.isObject,
        conversions: {
          RGBA_OBJ: {
            read: function (t) {
              return (
                !!(
                  ol.isNumber(t.r) &&
                  ol.isNumber(t.g) &&
                  ol.isNumber(t.b) &&
                  ol.isNumber(t.a)
                ) && { space: "RGB", r: t.r, g: t.g, b: t.b, a: t.a }
              );
            },
            write: function (t) {
              return { r: t.r, g: t.g, b: t.b, a: t.a };
            },
          },
          RGB_OBJ: {
            read: function (t) {
              return (
                !!(
                  ol.isNumber(t.r) &&
                  ol.isNumber(t.g) &&
                  ol.isNumber(t.b)
                ) && { space: "RGB", r: t.r, g: t.g, b: t.b }
              );
            },
            write: function (t) {
              return { r: t.r, g: t.g, b: t.b };
            },
          },
          HSVA_OBJ: {
            read: function (t) {
              return (
                !!(
                  ol.isNumber(t.h) &&
                  ol.isNumber(t.s) &&
                  ol.isNumber(t.v) &&
                  ol.isNumber(t.a)
                ) && { space: "HSV", h: t.h, s: t.s, v: t.v, a: t.a }
              );
            },
            write: function (t) {
              return { h: t.h, s: t.s, v: t.v, a: t.a };
            },
          },
          HSV_OBJ: {
            read: function (t) {
              return (
                !!(
                  ol.isNumber(t.h) &&
                  ol.isNumber(t.s) &&
                  ol.isNumber(t.v)
                ) && { space: "HSV", h: t.h, s: t.s, v: t.v }
              );
            },
            write: function (t) {
              return { h: t.h, s: t.s, v: t.v };
            },
          },
        },
      },
    ],
    ll = void 0,
    cl = void 0,
    hl = function () {
      cl = !1;
      var t = arguments.length > 1 ? ol.toArray(arguments) : arguments[0];
      return (
        ol.each(al, function (e) {
          if (e.litmus(t))
            return (
              ol.each(e.conversions, function (e, n) {
                if (((ll = e.read(t)), !1 === cl && !1 !== ll))
                  return (
                    (cl = ll),
                    (ll.conversionName = n),
                    (ll.conversion = e),
                    ol.BREAK
                  );
              }),
              ol.BREAK
            );
        }),
        cl
      );
    },
    ul = void 0,
    dl = {
      hsv_to_rgb: function (t, e, n) {
        var i = Math.floor(t / 60) % 6,
          r = t / 60 - Math.floor(t / 60),
          s = n * (1 - e),
          o = n * (1 - r * e),
          a = n * (1 - (1 - r) * e),
          l = [
            [n, a, s],
            [o, n, s],
            [s, n, a],
            [s, o, n],
            [a, s, n],
            [n, s, o],
          ][i];
        return { r: 255 * l[0], g: 255 * l[1], b: 255 * l[2] };
      },
      rgb_to_hsv: function (t, e, n) {
        var i = Math.min(t, e, n),
          r = Math.max(t, e, n),
          s = r - i,
          o = void 0;
        return 0 === r
          ? { h: NaN, s: 0, v: 0 }
          : ((o =
              t === r
                ? (e - n) / s
                : e === r
                ? 2 + (n - t) / s
                : 4 + (t - e) / s),
            (o /= 6) < 0 && (o += 1),
            { h: 360 * o, s: s / r, v: r / 255 });
      },
      rgb_to_hex: function (t, e, n) {
        var i = this.hex_with_component(0, 2, t);
        return (
          (i = this.hex_with_component(i, 1, e)),
          this.hex_with_component(i, 0, n)
        );
      },
      component_from_hex: function (t, e) {
        return (t >> (8 * e)) & 255;
      },
      hex_with_component: function (t, e, n) {
        return (n << (ul = 8 * e)) | (t & ~(255 << ul));
      },
    },
    pl =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              "function" == typeof Symbol &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          },
    fl = function (t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    },
    ml = (function () {
      function t(t, e) {
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            "value" in i && (i.writable = !0),
            Object.defineProperty(t, i.key, i);
        }
      }
      return function (e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e;
      };
    })(),
    gl = function t(e, n, i) {
      null === e && (e = Function.prototype);
      var r = Object.getOwnPropertyDescriptor(e, n);
      if (void 0 === r) {
        var s = Object.getPrototypeOf(e);
        return null === s ? void 0 : t(s, n, i);
      }
      if ("value" in r) return r.value;
      var o = r.get;
      return void 0 !== o ? o.call(i) : void 0;
    },
    vl = function (t, e) {
      if ("function" != typeof e && null !== e)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof e
        );
      (t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        e &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(t, e)
            : (t.__proto__ = e));
    },
    _l = function (t, e) {
      if (!t)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !e || ("object" != typeof e && "function" != typeof e) ? t : e;
    },
    yl = (function () {
      function t() {
        if (
          (fl(this, t),
          (this.__state = hl.apply(this, arguments)),
          !1 === this.__state)
        )
          throw new Error("Failed to interpret color arguments");
        this.__state.a = this.__state.a || 1;
      }
      return (
        ml(t, [
          {
            key: "toString",
            value: function () {
              return il(this);
            },
          },
          {
            key: "toHexString",
            value: function () {
              return il(this, !0);
            },
          },
          {
            key: "toOriginal",
            value: function () {
              return this.__state.conversion.write(this);
            },
          },
        ]),
        t
      );
    })();
  function xl(t, e, n) {
    Object.defineProperty(t, e, {
      get: function () {
        return (
          "RGB" === this.__state.space || yl.recalculateRGB(this, e, n),
          this.__state[e]
        );
      },
      set: function (t) {
        "RGB" !== this.__state.space &&
          (yl.recalculateRGB(this, e, n), (this.__state.space = "RGB")),
          (this.__state[e] = t);
      },
    });
  }
  function bl(t, e) {
    Object.defineProperty(t, e, {
      get: function () {
        return (
          "HSV" === this.__state.space || yl.recalculateHSV(this),
          this.__state[e]
        );
      },
      set: function (t) {
        "HSV" !== this.__state.space &&
          (yl.recalculateHSV(this), (this.__state.space = "HSV")),
          (this.__state[e] = t);
      },
    });
  }
  (yl.recalculateRGB = function (t, e, n) {
    if ("HEX" === t.__state.space)
      t.__state[e] = dl.component_from_hex(t.__state.hex, n);
    else {
      if ("HSV" !== t.__state.space) throw new Error("Corrupted color state");
      ol.extend(
        t.__state,
        dl.hsv_to_rgb(t.__state.h, t.__state.s, t.__state.v)
      );
    }
  }),
    (yl.recalculateHSV = function (t) {
      var e = dl.rgb_to_hsv(t.r, t.g, t.b);
      ol.extend(t.__state, { s: e.s, v: e.v }),
        ol.isNaN(e.h)
          ? ol.isUndefined(t.__state.h) && (t.__state.h = 0)
          : (t.__state.h = e.h);
    }),
    (yl.COMPONENTS = ["r", "g", "b", "h", "s", "v", "hex", "a"]),
    xl(yl.prototype, "r", 2),
    xl(yl.prototype, "g", 1),
    xl(yl.prototype, "b", 0),
    bl(yl.prototype, "h"),
    bl(yl.prototype, "s"),
    bl(yl.prototype, "v"),
    Object.defineProperty(yl.prototype, "a", {
      get: function () {
        return this.__state.a;
      },
      set: function (t) {
        this.__state.a = t;
      },
    }),
    Object.defineProperty(yl.prototype, "hex", {
      get: function () {
        return (
          "HEX" !== this.__state.space &&
            ((this.__state.hex = dl.rgb_to_hex(this.r, this.g, this.b)),
            (this.__state.space = "HEX")),
          this.__state.hex
        );
      },
      set: function (t) {
        (this.__state.space = "HEX"), (this.__state.hex = t);
      },
    });
  var wl = (function () {
      function t(e, n) {
        fl(this, t),
          (this.initialValue = e[n]),
          (this.domElement = document.createElement("div")),
          (this.object = e),
          (this.property = n),
          (this.__onChange = void 0),
          (this.__onFinishChange = void 0);
      }
      return (
        ml(t, [
          {
            key: "onChange",
            value: function (t) {
              return (this.__onChange = t), this;
            },
          },
          {
            key: "onFinishChange",
            value: function (t) {
              return (this.__onFinishChange = t), this;
            },
          },
          {
            key: "setValue",
            value: function (t) {
              return (
                (this.object[this.property] = t),
                this.__onChange && this.__onChange.call(this, t),
                this.updateDisplay(),
                this
              );
            },
          },
          {
            key: "getValue",
            value: function () {
              return this.object[this.property];
            },
          },
          {
            key: "updateDisplay",
            value: function () {
              return this;
            },
          },
          {
            key: "isModified",
            value: function () {
              return this.initialValue !== this.getValue();
            },
          },
        ]),
        t
      );
    })(),
    Ml = {};
  ol.each(
    {
      HTMLEvents: ["change"],
      MouseEvents: ["click", "mousemove", "mousedown", "mouseup", "mouseover"],
      KeyboardEvents: ["keydown"],
    },
    function (t, e) {
      ol.each(t, function (t) {
        Ml[t] = e;
      });
    }
  );
  var Sl = /(\d+(\.\d+)?)px/;
  function El(t) {
    if ("0" === t || ol.isUndefined(t)) return 0;
    var e = t.match(Sl);
    return ol.isNull(e) ? 0 : parseFloat(e[1]);
  }
  var Tl = {
      makeSelectable: function (t, e) {
        void 0 !== t &&
          void 0 !== t.style &&
          ((t.onselectstart = e
            ? function () {
                return !1;
              }
            : function () {}),
          (t.style.MozUserSelect = e ? "auto" : "none"),
          (t.style.KhtmlUserSelect = e ? "auto" : "none"),
          (t.unselectable = e ? "on" : "off"));
      },
      makeFullscreen: function (t, e, n) {
        var i = n,
          r = e;
        ol.isUndefined(r) && (r = !0),
          ol.isUndefined(i) && (i = !0),
          (t.style.position = "absolute"),
          r && ((t.style.left = 0), (t.style.right = 0)),
          i && ((t.style.top = 0), (t.style.bottom = 0));
      },
      fakeEvent: function (t, e, n, i) {
        var r = n || {},
          s = Ml[e];
        if (!s) throw new Error("Event type " + e + " not supported.");
        var o = document.createEvent(s);
        switch (s) {
          case "MouseEvents":
            var a = r.x || r.clientX || 0,
              l = r.y || r.clientY || 0;
            o.initMouseEvent(
              e,
              r.bubbles || !1,
              r.cancelable || !0,
              window,
              r.clickCount || 1,
              0,
              0,
              a,
              l,
              !1,
              !1,
              !1,
              !1,
              0,
              null
            );
            break;
          case "KeyboardEvents":
            var c = o.initKeyboardEvent || o.initKeyEvent;
            ol.defaults(r, {
              cancelable: !0,
              ctrlKey: !1,
              altKey: !1,
              shiftKey: !1,
              metaKey: !1,
              keyCode: void 0,
              charCode: void 0,
            }),
              c(
                e,
                r.bubbles || !1,
                r.cancelable,
                window,
                r.ctrlKey,
                r.altKey,
                r.shiftKey,
                r.metaKey,
                r.keyCode,
                r.charCode
              );
            break;
          default:
            o.initEvent(e, r.bubbles || !1, r.cancelable || !0);
        }
        ol.defaults(o, i), t.dispatchEvent(o);
      },
      bind: function (t, e, n, i) {
        var r = i || !1;
        return (
          t.addEventListener
            ? t.addEventListener(e, n, r)
            : t.attachEvent && t.attachEvent("on" + e, n),
          Tl
        );
      },
      unbind: function (t, e, n, i) {
        var r = i || !1;
        return (
          t.removeEventListener
            ? t.removeEventListener(e, n, r)
            : t.detachEvent && t.detachEvent("on" + e, n),
          Tl
        );
      },
      addClass: function (t, e) {
        if (void 0 === t.className) t.className = e;
        else if (t.className !== e) {
          var n = t.className.split(/ +/);
          -1 === n.indexOf(e) &&
            (n.push(e),
            (t.className = n
              .join(" ")
              .replace(/^\s+/, "")
              .replace(/\s+$/, "")));
        }
        return Tl;
      },
      removeClass: function (t, e) {
        if (e)
          if (t.className === e) t.removeAttribute("class");
          else {
            var n = t.className.split(/ +/),
              i = n.indexOf(e);
            -1 !== i && (n.splice(i, 1), (t.className = n.join(" ")));
          }
        else t.className = void 0;
        return Tl;
      },
      hasClass: function (t, e) {
        return (
          new RegExp("(?:^|\\s+)" + e + "(?:\\s+|$)").test(t.className) || !1
        );
      },
      getWidth: function (t) {
        var e = getComputedStyle(t);
        return (
          El(e["border-left-width"]) +
          El(e["border-right-width"]) +
          El(e["padding-left"]) +
          El(e["padding-right"]) +
          El(e.width)
        );
      },
      getHeight: function (t) {
        var e = getComputedStyle(t);
        return (
          El(e["border-top-width"]) +
          El(e["border-bottom-width"]) +
          El(e["padding-top"]) +
          El(e["padding-bottom"]) +
          El(e.height)
        );
      },
      getOffset: function (t) {
        var e = t,
          n = { left: 0, top: 0 };
        if (e.offsetParent)
          do {
            (n.left += e.offsetLeft),
              (n.top += e.offsetTop),
              (e = e.offsetParent);
          } while (e);
        return n;
      },
      isActive: function (t) {
        return t === document.activeElement && (t.type || t.href);
      },
    },
    Al = (function (t) {
      function e(t, n) {
        fl(this, e);
        var i = _l(
            this,
            (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n)
          ),
          r = i;
        return (
          (i.__prev = i.getValue()),
          (i.__checkbox = document.createElement("input")),
          i.__checkbox.setAttribute("type", "checkbox"),
          Tl.bind(
            i.__checkbox,
            "change",
            function () {
              r.setValue(!r.__prev);
            },
            !1
          ),
          i.domElement.appendChild(i.__checkbox),
          i.updateDisplay(),
          i
        );
      }
      return (
        vl(e, t),
        ml(e, [
          {
            key: "setValue",
            value: function (t) {
              var n = gl(
                e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                "setValue",
                this
              ).call(this, t);
              return (
                this.__onFinishChange &&
                  this.__onFinishChange.call(this, this.getValue()),
                (this.__prev = this.getValue()),
                n
              );
            },
          },
          {
            key: "updateDisplay",
            value: function () {
              return (
                !0 === this.getValue()
                  ? (this.__checkbox.setAttribute("checked", "checked"),
                    (this.__checkbox.checked = !0),
                    (this.__prev = !0))
                  : ((this.__checkbox.checked = !1), (this.__prev = !1)),
                gl(
                  e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                  "updateDisplay",
                  this
                ).call(this)
              );
            },
          },
        ]),
        e
      );
    })(wl),
    Ll = (function (t) {
      function e(t, n, i) {
        fl(this, e);
        var r = _l(
            this,
            (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n)
          ),
          s = i,
          o = r;
        if (((r.__select = document.createElement("select")), ol.isArray(s))) {
          var a = {};
          ol.each(s, function (t) {
            a[t] = t;
          }),
            (s = a);
        }
        return (
          ol.each(s, function (t, e) {
            var n = document.createElement("option");
            (n.innerHTML = e),
              n.setAttribute("value", t),
              o.__select.appendChild(n);
          }),
          r.updateDisplay(),
          Tl.bind(r.__select, "change", function () {
            var t = this.options[this.selectedIndex].value;
            o.setValue(t);
          }),
          r.domElement.appendChild(r.__select),
          r
        );
      }
      return (
        vl(e, t),
        ml(e, [
          {
            key: "setValue",
            value: function (t) {
              var n = gl(
                e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                "setValue",
                this
              ).call(this, t);
              return (
                this.__onFinishChange &&
                  this.__onFinishChange.call(this, this.getValue()),
                n
              );
            },
          },
          {
            key: "updateDisplay",
            value: function () {
              return Tl.isActive(this.__select)
                ? this
                : ((this.__select.value = this.getValue()),
                  gl(
                    e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                    "updateDisplay",
                    this
                  ).call(this));
            },
          },
        ]),
        e
      );
    })(wl),
    Cl = (function (t) {
      function e(t, n) {
        fl(this, e);
        var i = _l(
            this,
            (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n)
          ),
          r = i;
        function s() {
          r.setValue(r.__input.value);
        }
        return (
          (i.__input = document.createElement("input")),
          i.__input.setAttribute("type", "text"),
          Tl.bind(i.__input, "keyup", s),
          Tl.bind(i.__input, "change", s),
          Tl.bind(i.__input, "blur", function () {
            r.__onFinishChange && r.__onFinishChange.call(r, r.getValue());
          }),
          Tl.bind(i.__input, "keydown", function (t) {
            13 === t.keyCode && this.blur();
          }),
          i.updateDisplay(),
          i.domElement.appendChild(i.__input),
          i
        );
      }
      return (
        vl(e, t),
        ml(e, [
          {
            key: "updateDisplay",
            value: function () {
              return (
                Tl.isActive(this.__input) ||
                  (this.__input.value = this.getValue()),
                gl(
                  e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                  "updateDisplay",
                  this
                ).call(this)
              );
            },
          },
        ]),
        e
      );
    })(wl);
  function Rl(t) {
    var e = t.toString();
    return e.indexOf(".") > -1 ? e.length - e.indexOf(".") - 1 : 0;
  }
  var Pl = (function (t) {
      function e(t, n, i) {
        fl(this, e);
        var r = _l(
            this,
            (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n)
          ),
          s = i || {};
        return (
          (r.__min = s.min),
          (r.__max = s.max),
          (r.__step = s.step),
          ol.isUndefined(r.__step)
            ? 0 === r.initialValue
              ? (r.__impliedStep = 1)
              : (r.__impliedStep =
                  Math.pow(
                    10,
                    Math.floor(Math.log(Math.abs(r.initialValue)) / Math.LN10)
                  ) / 10)
            : (r.__impliedStep = r.__step),
          (r.__precision = Rl(r.__impliedStep)),
          r
        );
      }
      return (
        vl(e, t),
        ml(e, [
          {
            key: "setValue",
            value: function (t) {
              var n = t;
              return (
                void 0 !== this.__min && n < this.__min
                  ? (n = this.__min)
                  : void 0 !== this.__max && n > this.__max && (n = this.__max),
                void 0 !== this.__step &&
                  n % this.__step != 0 &&
                  (n = Math.round(n / this.__step) * this.__step),
                gl(
                  e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                  "setValue",
                  this
                ).call(this, n)
              );
            },
          },
          {
            key: "min",
            value: function (t) {
              return (this.__min = t), this;
            },
          },
          {
            key: "max",
            value: function (t) {
              return (this.__max = t), this;
            },
          },
          {
            key: "step",
            value: function (t) {
              return (
                (this.__step = t),
                (this.__impliedStep = t),
                (this.__precision = Rl(t)),
                this
              );
            },
          },
        ]),
        e
      );
    })(wl),
    Dl = (function (t) {
      function e(t, n, i) {
        fl(this, e);
        var r = _l(
          this,
          (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n, i)
        );
        r.__truncationSuspended = !1;
        var s = r,
          o = void 0;
        function a() {
          s.__onFinishChange && s.__onFinishChange.call(s, s.getValue());
        }
        function l(t) {
          var e = o - t.clientY;
          s.setValue(s.getValue() + e * s.__impliedStep), (o = t.clientY);
        }
        function c() {
          Tl.unbind(window, "mousemove", l),
            Tl.unbind(window, "mouseup", c),
            a();
        }
        return (
          (r.__input = document.createElement("input")),
          r.__input.setAttribute("type", "text"),
          Tl.bind(r.__input, "change", function () {
            var t = parseFloat(s.__input.value);
            ol.isNaN(t) || s.setValue(t);
          }),
          Tl.bind(r.__input, "blur", function () {
            a();
          }),
          Tl.bind(r.__input, "mousedown", function (t) {
            Tl.bind(window, "mousemove", l),
              Tl.bind(window, "mouseup", c),
              (o = t.clientY);
          }),
          Tl.bind(r.__input, "keydown", function (t) {
            13 === t.keyCode &&
              ((s.__truncationSuspended = !0),
              this.blur(),
              (s.__truncationSuspended = !1),
              a());
          }),
          r.updateDisplay(),
          r.domElement.appendChild(r.__input),
          r
        );
      }
      return (
        vl(e, t),
        ml(e, [
          {
            key: "updateDisplay",
            value: function () {
              var t, n, i;
              return (
                (this.__input.value = this.__truncationSuspended
                  ? this.getValue()
                  : ((t = this.getValue()),
                    (n = this.__precision),
                    (i = Math.pow(10, n)),
                    Math.round(t * i) / i)),
                gl(
                  e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                  "updateDisplay",
                  this
                ).call(this)
              );
            },
          },
        ]),
        e
      );
    })(Pl);
  function Il(t, e, n, i, r) {
    return i + ((t - e) / (n - e)) * (r - i);
  }
  var Nl = (function (t) {
      function e(t, n, i, r, s) {
        fl(this, e);
        var o = _l(
            this,
            (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n, {
              min: i,
              max: r,
              step: s,
            })
          ),
          a = o;
        function l(t) {
          t.preventDefault();
          var e = a.__background.getBoundingClientRect();
          return (
            a.setValue(Il(t.clientX, e.left, e.right, a.__min, a.__max)), !1
          );
        }
        function c() {
          Tl.unbind(window, "mousemove", l),
            Tl.unbind(window, "mouseup", c),
            a.__onFinishChange && a.__onFinishChange.call(a, a.getValue());
        }
        function h(t) {
          var e = t.touches[0].clientX,
            n = a.__background.getBoundingClientRect();
          a.setValue(Il(e, n.left, n.right, a.__min, a.__max));
        }
        function u() {
          Tl.unbind(window, "touchmove", h),
            Tl.unbind(window, "touchend", u),
            a.__onFinishChange && a.__onFinishChange.call(a, a.getValue());
        }
        return (
          (o.__background = document.createElement("div")),
          (o.__foreground = document.createElement("div")),
          Tl.bind(o.__background, "mousedown", function (t) {
            document.activeElement.blur(),
              Tl.bind(window, "mousemove", l),
              Tl.bind(window, "mouseup", c),
              l(t);
          }),
          Tl.bind(o.__background, "touchstart", function (t) {
            1 === t.touches.length &&
              (Tl.bind(window, "touchmove", h),
              Tl.bind(window, "touchend", u),
              h(t));
          }),
          Tl.addClass(o.__background, "slider"),
          Tl.addClass(o.__foreground, "slider-fg"),
          o.updateDisplay(),
          o.__background.appendChild(o.__foreground),
          o.domElement.appendChild(o.__background),
          o
        );
      }
      return (
        vl(e, t),
        ml(e, [
          {
            key: "updateDisplay",
            value: function () {
              var t =
                (this.getValue() - this.__min) / (this.__max - this.__min);
              return (
                (this.__foreground.style.width = 100 * t + "%"),
                gl(
                  e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                  "updateDisplay",
                  this
                ).call(this)
              );
            },
          },
        ]),
        e
      );
    })(Pl),
    Ol = (function (t) {
      function e(t, n, i) {
        fl(this, e);
        var r = _l(
            this,
            (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n)
          ),
          s = r;
        return (
          (r.__button = document.createElement("div")),
          (r.__button.innerHTML = void 0 === i ? "Fire" : i),
          Tl.bind(r.__button, "click", function (t) {
            return t.preventDefault(), s.fire(), !1;
          }),
          Tl.addClass(r.__button, "button"),
          r.domElement.appendChild(r.__button),
          r
        );
      }
      return (
        vl(e, t),
        ml(e, [
          {
            key: "fire",
            value: function () {
              this.__onChange && this.__onChange.call(this),
                this.getValue().call(this.object),
                this.__onFinishChange &&
                  this.__onFinishChange.call(this, this.getValue());
            },
          },
        ]),
        e
      );
    })(wl),
    zl = (function (t) {
      function e(t, n) {
        fl(this, e);
        var i = _l(
          this,
          (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n)
        );
        (i.__color = new yl(i.getValue())), (i.__temp = new yl(0));
        var r = i;
        (i.domElement = document.createElement("div")),
          Tl.makeSelectable(i.domElement, !1),
          (i.__selector = document.createElement("div")),
          (i.__selector.className = "selector"),
          (i.__saturation_field = document.createElement("div")),
          (i.__saturation_field.className = "saturation-field"),
          (i.__field_knob = document.createElement("div")),
          (i.__field_knob.className = "field-knob"),
          (i.__field_knob_border = "2px solid "),
          (i.__hue_knob = document.createElement("div")),
          (i.__hue_knob.className = "hue-knob"),
          (i.__hue_field = document.createElement("div")),
          (i.__hue_field.className = "hue-field"),
          (i.__input = document.createElement("input")),
          (i.__input.type = "text"),
          (i.__input_textShadow = "0 1px 1px "),
          Tl.bind(i.__input, "keydown", function (t) {
            13 === t.keyCode && u.call(this);
          }),
          Tl.bind(i.__input, "blur", u),
          Tl.bind(i.__selector, "mousedown", function () {
            Tl.addClass(this, "drag").bind(window, "mouseup", function () {
              Tl.removeClass(r.__selector, "drag");
            });
          }),
          Tl.bind(i.__selector, "touchstart", function () {
            Tl.addClass(this, "drag").bind(window, "touchend", function () {
              Tl.removeClass(r.__selector, "drag");
            });
          });
        var s,
          o = document.createElement("div");
        function a(t) {
          p(t),
            Tl.bind(window, "mousemove", p),
            Tl.bind(window, "touchmove", p),
            Tl.bind(window, "mouseup", c),
            Tl.bind(window, "touchend", c);
        }
        function l(t) {
          f(t),
            Tl.bind(window, "mousemove", f),
            Tl.bind(window, "touchmove", f),
            Tl.bind(window, "mouseup", h),
            Tl.bind(window, "touchend", h);
        }
        function c() {
          Tl.unbind(window, "mousemove", p),
            Tl.unbind(window, "touchmove", p),
            Tl.unbind(window, "mouseup", c),
            Tl.unbind(window, "touchend", c),
            d();
        }
        function h() {
          Tl.unbind(window, "mousemove", f),
            Tl.unbind(window, "touchmove", f),
            Tl.unbind(window, "mouseup", h),
            Tl.unbind(window, "touchend", h),
            d();
        }
        function u() {
          var t = hl(this.value);
          !1 !== t
            ? ((r.__color.__state = t), r.setValue(r.__color.toOriginal()))
            : (this.value = r.__color.toString());
        }
        function d() {
          r.__onFinishChange &&
            r.__onFinishChange.call(r, r.__color.toOriginal());
        }
        function p(t) {
          -1 === t.type.indexOf("touch") && t.preventDefault();
          var e = r.__saturation_field.getBoundingClientRect(),
            n = (t.touches && t.touches[0]) || t,
            i = n.clientX,
            s = n.clientY,
            o = (i - e.left) / (e.right - e.left),
            a = 1 - (s - e.top) / (e.bottom - e.top);
          return (
            a > 1 ? (a = 1) : a < 0 && (a = 0),
            o > 1 ? (o = 1) : o < 0 && (o = 0),
            (r.__color.v = a),
            (r.__color.s = o),
            r.setValue(r.__color.toOriginal()),
            !1
          );
        }
        function f(t) {
          -1 === t.type.indexOf("touch") && t.preventDefault();
          var e = r.__hue_field.getBoundingClientRect(),
            n =
              1 -
              (((t.touches && t.touches[0]) || t).clientY - e.top) /
                (e.bottom - e.top);
          return (
            n > 1 ? (n = 1) : n < 0 && (n = 0),
            (r.__color.h = 360 * n),
            r.setValue(r.__color.toOriginal()),
            !1
          );
        }
        return (
          ol.extend(i.__selector.style, {
            width: "122px",
            height: "102px",
            padding: "3px",
            backgroundColor: "#222",
            boxShadow: "0px 1px 3px rgba(0,0,0,0.3)",
          }),
          ol.extend(i.__field_knob.style, {
            position: "absolute",
            width: "12px",
            height: "12px",
            border:
              i.__field_knob_border + (i.__color.v < 0.5 ? "#fff" : "#000"),
            boxShadow: "0px 1px 3px rgba(0,0,0,0.5)",
            borderRadius: "12px",
            zIndex: 1,
          }),
          ol.extend(i.__hue_knob.style, {
            position: "absolute",
            width: "15px",
            height: "2px",
            borderRight: "4px solid #fff",
            zIndex: 1,
          }),
          ol.extend(i.__saturation_field.style, {
            width: "100px",
            height: "100px",
            border: "1px solid #555",
            marginRight: "3px",
            display: "inline-block",
            cursor: "pointer",
          }),
          ol.extend(o.style, {
            width: "100%",
            height: "100%",
            background: "none",
          }),
          Hl(o, "top", "rgba(0,0,0,0)", "#000"),
          ol.extend(i.__hue_field.style, {
            width: "15px",
            height: "100px",
            border: "1px solid #555",
            cursor: "ns-resize",
            position: "absolute",
            top: "3px",
            right: "3px",
          }),
          ((s = i.__hue_field).style.background = ""),
          (s.style.cssText +=
            "background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);"),
          (s.style.cssText +=
            "background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"),
          (s.style.cssText +=
            "background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"),
          (s.style.cssText +=
            "background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"),
          (s.style.cssText +=
            "background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"),
          ol.extend(i.__input.style, {
            outline: "none",
            textAlign: "center",
            color: "#fff",
            border: 0,
            fontWeight: "bold",
            textShadow: i.__input_textShadow + "rgba(0,0,0,0.7)",
          }),
          Tl.bind(i.__saturation_field, "mousedown", a),
          Tl.bind(i.__saturation_field, "touchstart", a),
          Tl.bind(i.__field_knob, "mousedown", a),
          Tl.bind(i.__field_knob, "touchstart", a),
          Tl.bind(i.__hue_field, "mousedown", l),
          Tl.bind(i.__hue_field, "touchstart", l),
          i.__saturation_field.appendChild(o),
          i.__selector.appendChild(i.__field_knob),
          i.__selector.appendChild(i.__saturation_field),
          i.__selector.appendChild(i.__hue_field),
          i.__hue_field.appendChild(i.__hue_knob),
          i.domElement.appendChild(i.__input),
          i.domElement.appendChild(i.__selector),
          i.updateDisplay(),
          i
        );
      }
      return (
        vl(e, t),
        ml(e, [
          {
            key: "updateDisplay",
            value: function () {
              var t = hl(this.getValue());
              if (!1 !== t) {
                var e = !1;
                ol.each(
                  yl.COMPONENTS,
                  function (n) {
                    if (
                      !ol.isUndefined(t[n]) &&
                      !ol.isUndefined(this.__color.__state[n]) &&
                      t[n] !== this.__color.__state[n]
                    )
                      return (e = !0), {};
                  },
                  this
                ),
                  e && ol.extend(this.__color.__state, t);
              }
              ol.extend(this.__temp.__state, this.__color.__state),
                (this.__temp.a = 1);
              var n = this.__color.v < 0.5 || this.__color.s > 0.5 ? 255 : 0,
                i = 255 - n;
              ol.extend(this.__field_knob.style, {
                marginLeft: 100 * this.__color.s - 7 + "px",
                marginTop: 100 * (1 - this.__color.v) - 7 + "px",
                backgroundColor: this.__temp.toHexString(),
                border:
                  this.__field_knob_border +
                  "rgb(" +
                  n +
                  "," +
                  n +
                  "," +
                  n +
                  ")",
              }),
                (this.__hue_knob.style.marginTop =
                  100 * (1 - this.__color.h / 360) + "px"),
                (this.__temp.s = 1),
                (this.__temp.v = 1),
                Hl(
                  this.__saturation_field,
                  "left",
                  "#fff",
                  this.__temp.toHexString()
                ),
                (this.__input.value = this.__color.toString()),
                ol.extend(this.__input.style, {
                  backgroundColor: this.__color.toHexString(),
                  color: "rgb(" + n + "," + n + "," + n + ")",
                  textShadow:
                    this.__input_textShadow +
                    "rgba(" +
                    i +
                    "," +
                    i +
                    "," +
                    i +
                    ",.7)",
                });
            },
          },
        ]),
        e
      );
    })(wl),
    Bl = ["-moz-", "-o-", "-webkit-", "-ms-", ""];
  function Hl(t, e, n, i) {
    (t.style.background = ""),
      ol.each(Bl, function (r) {
        t.style.cssText +=
          "background: " +
          r +
          "linear-gradient(" +
          e +
          ", " +
          n +
          " 0%, " +
          i +
          " 100%); ";
      });
  }
  var Fl =
      '<div id="dg-save" class="dg dialogue">\n\n  Here\'s the new load parameter for your <code>GUI</code>\'s constructor:\n\n  <textarea id="dg-new-constructor"></textarea>\n\n  <div id="dg-save-locally">\n\n    <input id="dg-local-storage" type="checkbox"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id="dg-local-explain">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>\'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n\n    </div>\n\n  </div>\n\n</div>',
    Ul = function (t, e) {
      var n = t[e];
      return ol.isArray(arguments[2]) || ol.isObject(arguments[2])
        ? new Ll(t, e, arguments[2])
        : ol.isNumber(n)
        ? ol.isNumber(arguments[2]) && ol.isNumber(arguments[3])
          ? ol.isNumber(arguments[4])
            ? new Nl(t, e, arguments[2], arguments[3], arguments[4])
            : new Nl(t, e, arguments[2], arguments[3])
          : ol.isNumber(arguments[4])
          ? new Dl(t, e, {
              min: arguments[2],
              max: arguments[3],
              step: arguments[4],
            })
          : new Dl(t, e, { min: arguments[2], max: arguments[3] })
        : ol.isString(n)
        ? new Cl(t, e)
        : ol.isFunction(n)
        ? new Ol(t, e, "")
        : ol.isBoolean(n)
        ? new Al(t, e)
        : null;
    },
    kl =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (t) {
        setTimeout(t, 1e3 / 60);
      },
    Gl = (function () {
      function t() {
        fl(this, t),
          (this.backgroundElement = document.createElement("div")),
          ol.extend(this.backgroundElement.style, {
            backgroundColor: "rgba(0,0,0,0.8)",
            top: 0,
            left: 0,
            display: "none",
            zIndex: "1000",
            opacity: 0,
            WebkitTransition: "opacity 0.2s linear",
            transition: "opacity 0.2s linear",
          }),
          Tl.makeFullscreen(this.backgroundElement),
          (this.backgroundElement.style.position = "fixed"),
          (this.domElement = document.createElement("div")),
          ol.extend(this.domElement.style, {
            position: "fixed",
            display: "none",
            zIndex: "1001",
            opacity: 0,
            WebkitTransition:
              "-webkit-transform 0.2s ease-out, opacity 0.2s linear",
            transition: "transform 0.2s ease-out, opacity 0.2s linear",
          }),
          document.body.appendChild(this.backgroundElement),
          document.body.appendChild(this.domElement);
        var e = this;
        Tl.bind(this.backgroundElement, "click", function () {
          e.hide();
        });
      }
      return (
        ml(t, [
          {
            key: "show",
            value: function () {
              var t = this;
              (this.backgroundElement.style.display = "block"),
                (this.domElement.style.display = "block"),
                (this.domElement.style.opacity = 0),
                (this.domElement.style.webkitTransform = "scale(1.1)"),
                this.layout(),
                ol.defer(function () {
                  (t.backgroundElement.style.opacity = 1),
                    (t.domElement.style.opacity = 1),
                    (t.domElement.style.webkitTransform = "scale(1)");
                });
            },
          },
          {
            key: "hide",
            value: function () {
              var t = this,
                e = function e() {
                  (t.domElement.style.display = "none"),
                    (t.backgroundElement.style.display = "none"),
                    Tl.unbind(t.domElement, "webkitTransitionEnd", e),
                    Tl.unbind(t.domElement, "transitionend", e),
                    Tl.unbind(t.domElement, "oTransitionEnd", e);
                };
              Tl.bind(this.domElement, "webkitTransitionEnd", e),
                Tl.bind(this.domElement, "transitionend", e),
                Tl.bind(this.domElement, "oTransitionEnd", e),
                (this.backgroundElement.style.opacity = 0),
                (this.domElement.style.opacity = 0),
                (this.domElement.style.webkitTransform = "scale(1.1)");
            },
          },
          {
            key: "layout",
            value: function () {
              (this.domElement.style.left =
                window.innerWidth / 2 -
                Tl.getWidth(this.domElement) / 2 +
                "px"),
                (this.domElement.style.top =
                  window.innerHeight / 2 -
                  Tl.getHeight(this.domElement) / 2 +
                  "px");
            },
          },
        ]),
        t
      );
    })();
  !(function (t, e) {
    var n = e || document,
      i = document.createElement("style");
    (i.type = "text/css"), (i.innerHTML = t);
    var r = n.getElementsByTagName("head")[0];
    try {
      r.appendChild(i);
    } catch (t) {}
  })(
    (function (t) {
      if ("undefined" != typeof window) {
        var e = document.createElement("style");
        return (
          e.setAttribute("type", "text/css"),
          (e.innerHTML = t),
          document.head.appendChild(e),
          t
        );
      }
    })(
      ".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n"
    )
  );
  var Vl = "Default",
    Wl = (function () {
      try {
        return !!window.localStorage;
      } catch (t) {
        return !1;
      }
    })(),
    jl = void 0,
    ql = !0,
    Xl = void 0,
    Yl = !1,
    Jl = [],
    Zl = function t(e) {
      var n = this,
        i = e || {};
      (this.domElement = document.createElement("div")),
        (this.__ul = document.createElement("ul")),
        this.domElement.appendChild(this.__ul),
        Tl.addClass(this.domElement, "dg"),
        (this.__folders = {}),
        (this.__controllers = []),
        (this.__rememberedObjects = []),
        (this.__rememberedObjectIndecesToControllers = []),
        (this.__listening = []),
        (i = ol.defaults(i, {
          closeOnTop: !1,
          autoPlace: !0,
          width: t.DEFAULT_WIDTH,
        })),
        (i = ol.defaults(i, { resizable: i.autoPlace, hideable: i.autoPlace })),
        ol.isUndefined(i.load)
          ? (i.load = { preset: Vl })
          : i.preset && (i.load.preset = i.preset),
        ol.isUndefined(i.parent) && i.hideable && Jl.push(this),
        (i.resizable = ol.isUndefined(i.parent) && i.resizable),
        i.autoPlace && ol.isUndefined(i.scrollable) && (i.scrollable = !0);
      var r,
        s = Wl && "true" === localStorage.getItem(nc(0, "isLocal")),
        o = void 0,
        a = void 0;
      if (
        (Object.defineProperties(this, {
          parent: {
            get: function () {
              return i.parent;
            },
          },
          scrollable: {
            get: function () {
              return i.scrollable;
            },
          },
          autoPlace: {
            get: function () {
              return i.autoPlace;
            },
          },
          closeOnTop: {
            get: function () {
              return i.closeOnTop;
            },
          },
          preset: {
            get: function () {
              return n.parent ? n.getRoot().preset : i.load.preset;
            },
            set: function (t) {
              n.parent ? (n.getRoot().preset = t) : (i.load.preset = t),
                (function (t) {
                  for (var e = 0; e < t.__preset_select.length; e++)
                    t.__preset_select[e].value === t.preset &&
                      (t.__preset_select.selectedIndex = e);
                })(this),
                n.revert();
            },
          },
          width: {
            get: function () {
              return i.width;
            },
            set: function (t) {
              (i.width = t), ac(n, t);
            },
          },
          name: {
            get: function () {
              return i.name;
            },
            set: function (t) {
              (i.name = t), a && (a.innerHTML = i.name);
            },
          },
          closed: {
            get: function () {
              return i.closed;
            },
            set: function (e) {
              (i.closed = e),
                i.closed
                  ? Tl.addClass(n.__ul, t.CLASS_CLOSED)
                  : Tl.removeClass(n.__ul, t.CLASS_CLOSED),
                this.onResize(),
                n.__closeButton &&
                  (n.__closeButton.innerHTML = e ? t.TEXT_OPEN : t.TEXT_CLOSED);
            },
          },
          load: {
            get: function () {
              return i.load;
            },
          },
          useLocalStorage: {
            get: function () {
              return s;
            },
            set: function (t) {
              Wl &&
                ((s = t),
                t
                  ? Tl.bind(window, "unload", o)
                  : Tl.unbind(window, "unload", o),
                localStorage.setItem(nc(0, "isLocal"), t));
            },
          },
        }),
        ol.isUndefined(i.parent))
      ) {
        if (
          ((this.closed = i.closed || !1),
          Tl.addClass(this.domElement, t.CLASS_MAIN),
          Tl.makeSelectable(this.domElement, !1),
          Wl && s)
        ) {
          n.useLocalStorage = !0;
          var l = localStorage.getItem(nc(0, "gui"));
          l && (i.load = JSON.parse(l));
        }
        (this.__closeButton = document.createElement("div")),
          (this.__closeButton.innerHTML = t.TEXT_CLOSED),
          Tl.addClass(this.__closeButton, t.CLASS_CLOSE_BUTTON),
          i.closeOnTop
            ? (Tl.addClass(this.__closeButton, t.CLASS_CLOSE_TOP),
              this.domElement.insertBefore(
                this.__closeButton,
                this.domElement.childNodes[0]
              ))
            : (Tl.addClass(this.__closeButton, t.CLASS_CLOSE_BOTTOM),
              this.domElement.appendChild(this.__closeButton)),
          Tl.bind(this.__closeButton, "click", function () {
            n.closed = !n.closed;
          });
      } else {
        void 0 === i.closed && (i.closed = !0);
        var c = document.createTextNode(i.name);
        Tl.addClass(c, "controller-name"),
          (a = Ql(n, c)),
          Tl.addClass(this.__ul, t.CLASS_CLOSED),
          Tl.addClass(a, "title"),
          Tl.bind(a, "click", function (t) {
            return t.preventDefault(), (n.closed = !n.closed), !1;
          }),
          i.closed || (this.closed = !1);
      }
      i.autoPlace &&
        (ol.isUndefined(i.parent) &&
          (ql &&
            ((Xl = document.createElement("div")),
            Tl.addClass(Xl, "dg"),
            Tl.addClass(Xl, t.CLASS_AUTO_PLACE_CONTAINER),
            document.body.appendChild(Xl),
            (ql = !1)),
          Xl.appendChild(this.domElement),
          Tl.addClass(this.domElement, t.CLASS_AUTO_PLACE)),
        this.parent || ac(n, i.width)),
        (this.__resizeHandler = function () {
          n.onResizeDebounced();
        }),
        Tl.bind(window, "resize", this.__resizeHandler),
        Tl.bind(this.__ul, "webkitTransitionEnd", this.__resizeHandler),
        Tl.bind(this.__ul, "transitionend", this.__resizeHandler),
        Tl.bind(this.__ul, "oTransitionEnd", this.__resizeHandler),
        this.onResize(),
        i.resizable && oc(this),
        (o = function () {
          Wl &&
            "true" === localStorage.getItem(nc(0, "isLocal")) &&
            localStorage.setItem(
              nc(0, "gui"),
              JSON.stringify(n.getSaveObject())
            );
        }),
        (this.saveToLocalStorageIfPossible = o),
        i.parent ||
          (((r = n.getRoot()).width += 1),
          ol.defer(function () {
            r.width -= 1;
          }));
    };
  function Ql(t, e, n) {
    var i = document.createElement("li");
    return (
      e && i.appendChild(e),
      n ? t.__ul.insertBefore(i, n) : t.__ul.appendChild(i),
      t.onResize(),
      i
    );
  }
  function Kl(t) {
    Tl.unbind(window, "resize", t.__resizeHandler),
      t.saveToLocalStorageIfPossible &&
        Tl.unbind(window, "unload", t.saveToLocalStorageIfPossible);
  }
  function $l(t, e) {
    var n = t.__preset_select[t.__preset_select.selectedIndex];
    n.innerHTML = e ? n.value + "*" : n.value;
  }
  function tc(t, e) {
    var n = t.getRoot(),
      i = n.__rememberedObjects.indexOf(e.object);
    if (-1 !== i) {
      var r = n.__rememberedObjectIndecesToControllers[i];
      if (
        (void 0 === r &&
          ((r = {}), (n.__rememberedObjectIndecesToControllers[i] = r)),
        (r[e.property] = e),
        n.load && n.load.remembered)
      ) {
        var s = n.load.remembered,
          o = void 0;
        if (s[t.preset]) o = s[t.preset];
        else {
          if (!s.Default) return;
          o = s.Default;
        }
        if (o[i] && void 0 !== o[i][e.property]) {
          var a = o[i][e.property];
          (e.initialValue = a), e.setValue(a);
        }
      }
    }
  }
  function ec(t, e, n, i) {
    if (void 0 === e[n])
      throw new Error('Object "' + e + '" has no property "' + n + '"');
    var r = void 0;
    if (i.color) r = new zl(e, n);
    else {
      var s = [e, n].concat(i.factoryArgs);
      r = Ul.apply(t, s);
    }
    i.before instanceof wl && (i.before = i.before.__li),
      tc(t, r),
      Tl.addClass(r.domElement, "c");
    var o = document.createElement("span");
    Tl.addClass(o, "property-name"), (o.innerHTML = r.property);
    var a = document.createElement("div");
    a.appendChild(o), a.appendChild(r.domElement);
    var l = Ql(t, a, i.before);
    return (
      Tl.addClass(l, Zl.CLASS_CONTROLLER_ROW),
      r instanceof zl
        ? Tl.addClass(l, "color")
        : Tl.addClass(l, pl(r.getValue())),
      (function (t, e, n) {
        if (
          ((n.__li = e),
          (n.__gui = t),
          ol.extend(n, {
            options: function (e) {
              if (arguments.length > 1) {
                var i = n.__li.nextElementSibling;
                return (
                  n.remove(),
                  ec(t, n.object, n.property, {
                    before: i,
                    factoryArgs: [ol.toArray(arguments)],
                  })
                );
              }
              if (ol.isArray(e) || ol.isObject(e)) {
                var r = n.__li.nextElementSibling;
                return (
                  n.remove(),
                  ec(t, n.object, n.property, { before: r, factoryArgs: [e] })
                );
              }
            },
            name: function (t) {
              return (
                (n.__li.firstElementChild.firstElementChild.innerHTML = t), n
              );
            },
            listen: function () {
              return n.__gui.listen(n), n;
            },
            remove: function () {
              return n.__gui.remove(n), n;
            },
          }),
          n instanceof Nl)
        ) {
          var i = new Dl(n.object, n.property, {
            min: n.__min,
            max: n.__max,
            step: n.__step,
          });
          ol.each(
            [
              "updateDisplay",
              "onChange",
              "onFinishChange",
              "step",
              "min",
              "max",
            ],
            function (t) {
              var e = n[t],
                r = i[t];
              n[t] = i[t] = function () {
                var t = Array.prototype.slice.call(arguments);
                return r.apply(i, t), e.apply(n, t);
              };
            }
          ),
            Tl.addClass(e, "has-slider"),
            n.domElement.insertBefore(
              i.domElement,
              n.domElement.firstElementChild
            );
        } else if (n instanceof Dl) {
          var r = function (e) {
            if (ol.isNumber(n.__min) && ol.isNumber(n.__max)) {
              var i = n.__li.firstElementChild.firstElementChild.innerHTML,
                r = n.__gui.__listening.indexOf(n) > -1;
              n.remove();
              var s = ec(t, n.object, n.property, {
                before: n.__li.nextElementSibling,
                factoryArgs: [n.__min, n.__max, n.__step],
              });
              return s.name(i), r && s.listen(), s;
            }
            return e;
          };
          (n.min = ol.compose(r, n.min)), (n.max = ol.compose(r, n.max));
        } else
          n instanceof Al
            ? (Tl.bind(e, "click", function () {
                Tl.fakeEvent(n.__checkbox, "click");
              }),
              Tl.bind(n.__checkbox, "click", function (t) {
                t.stopPropagation();
              }))
            : n instanceof Ol
            ? (Tl.bind(e, "click", function () {
                Tl.fakeEvent(n.__button, "click");
              }),
              Tl.bind(e, "mouseover", function () {
                Tl.addClass(n.__button, "hover");
              }),
              Tl.bind(e, "mouseout", function () {
                Tl.removeClass(n.__button, "hover");
              }))
            : n instanceof zl &&
              (Tl.addClass(e, "color"),
              (n.updateDisplay = ol.compose(function (t) {
                return (e.style.borderLeftColor = n.__color.toString()), t;
              }, n.updateDisplay)),
              n.updateDisplay());
        n.setValue = ol.compose(function (e) {
          return (
            t.getRoot().__preset_select &&
              n.isModified() &&
              $l(t.getRoot(), !0),
            e
          );
        }, n.setValue);
      })(t, l, r),
      t.__controllers.push(r),
      r
    );
  }
  function nc(t, e) {
    return document.location.href + "." + e;
  }
  function ic(t, e, n) {
    var i = document.createElement("option");
    (i.innerHTML = e),
      (i.value = e),
      t.__preset_select.appendChild(i),
      n && (t.__preset_select.selectedIndex = t.__preset_select.length - 1);
  }
  function rc(t, e) {
    e.style.display = t.useLocalStorage ? "block" : "none";
  }
  function sc(t) {
    var e = (t.__save_row = document.createElement("li"));
    Tl.addClass(t.domElement, "has-save"),
      t.__ul.insertBefore(e, t.__ul.firstChild),
      Tl.addClass(e, "save-row");
    var n = document.createElement("span");
    (n.innerHTML = "&nbsp;"), Tl.addClass(n, "button gears");
    var i = document.createElement("span");
    (i.innerHTML = "Save"), Tl.addClass(i, "button"), Tl.addClass(i, "save");
    var r = document.createElement("span");
    (r.innerHTML = "New"), Tl.addClass(r, "button"), Tl.addClass(r, "save-as");
    var s = document.createElement("span");
    (s.innerHTML = "Revert"),
      Tl.addClass(s, "button"),
      Tl.addClass(s, "revert");
    var o = (t.__preset_select = document.createElement("select"));
    if (
      (t.load && t.load.remembered
        ? ol.each(t.load.remembered, function (e, n) {
            ic(t, n, n === t.preset);
          })
        : ic(t, Vl, !1),
      Tl.bind(o, "change", function () {
        for (var e = 0; e < t.__preset_select.length; e++)
          t.__preset_select[e].innerHTML = t.__preset_select[e].value;
        t.preset = this.value;
      }),
      e.appendChild(o),
      e.appendChild(n),
      e.appendChild(i),
      e.appendChild(r),
      e.appendChild(s),
      Wl)
    ) {
      var a = document.getElementById("dg-local-explain"),
        l = document.getElementById("dg-local-storage");
      (document.getElementById("dg-save-locally").style.display = "block"),
        "true" === localStorage.getItem(nc(0, "isLocal")) &&
          l.setAttribute("checked", "checked"),
        rc(t, a),
        Tl.bind(l, "change", function () {
          (t.useLocalStorage = !t.useLocalStorage), rc(t, a);
        });
    }
    var c = document.getElementById("dg-new-constructor");
    Tl.bind(c, "keydown", function (t) {
      !t.metaKey || (67 !== t.which && 67 !== t.keyCode) || jl.hide();
    }),
      Tl.bind(n, "click", function () {
        (c.innerHTML = JSON.stringify(t.getSaveObject(), void 0, 2)),
          jl.show(),
          c.focus(),
          c.select();
      }),
      Tl.bind(i, "click", function () {
        t.save();
      }),
      Tl.bind(r, "click", function () {
        var e = prompt("Enter a new preset name.");
        e && t.saveAs(e);
      }),
      Tl.bind(s, "click", function () {
        t.revert();
      });
  }
  function oc(t) {
    var e = void 0;
    function n(n) {
      return (
        n.preventDefault(),
        (t.width += e - n.clientX),
        t.onResize(),
        (e = n.clientX),
        !1
      );
    }
    function i() {
      Tl.removeClass(t.__closeButton, Zl.CLASS_DRAG),
        Tl.unbind(window, "mousemove", n),
        Tl.unbind(window, "mouseup", i);
    }
    function r(r) {
      return (
        r.preventDefault(),
        (e = r.clientX),
        Tl.addClass(t.__closeButton, Zl.CLASS_DRAG),
        Tl.bind(window, "mousemove", n),
        Tl.bind(window, "mouseup", i),
        !1
      );
    }
    (t.__resize_handle = document.createElement("div")),
      ol.extend(t.__resize_handle.style, {
        width: "6px",
        marginLeft: "-3px",
        height: "200px",
        cursor: "ew-resize",
        position: "absolute",
      }),
      Tl.bind(t.__resize_handle, "mousedown", r),
      Tl.bind(t.__closeButton, "mousedown", r),
      t.domElement.insertBefore(
        t.__resize_handle,
        t.domElement.firstElementChild
      );
  }
  function ac(t, e) {
    (t.domElement.style.width = e + "px"),
      t.__save_row && t.autoPlace && (t.__save_row.style.width = e + "px"),
      t.__closeButton && (t.__closeButton.style.width = e + "px");
  }
  function lc(t, e) {
    var n = {};
    return (
      ol.each(t.__rememberedObjects, function (i, r) {
        var s = {},
          o = t.__rememberedObjectIndecesToControllers[r];
        ol.each(o, function (t, n) {
          s[n] = e ? t.initialValue : t.getValue();
        }),
          (n[r] = s);
      }),
      n
    );
  }
  function cc(t) {
    0 !== t.length &&
      kl.call(window, function () {
        cc(t);
      }),
      ol.each(t, function (t) {
        t.updateDisplay();
      });
  }
  (Zl.toggleHide = function () {
    (Yl = !Yl),
      ol.each(Jl, function (t) {
        t.domElement.style.display = Yl ? "none" : "";
      });
  }),
    (Zl.CLASS_AUTO_PLACE = "a"),
    (Zl.CLASS_AUTO_PLACE_CONTAINER = "ac"),
    (Zl.CLASS_MAIN = "main"),
    (Zl.CLASS_CONTROLLER_ROW = "cr"),
    (Zl.CLASS_TOO_TALL = "taller-than-window"),
    (Zl.CLASS_CLOSED = "closed"),
    (Zl.CLASS_CLOSE_BUTTON = "close-button"),
    (Zl.CLASS_CLOSE_TOP = "close-top"),
    (Zl.CLASS_CLOSE_BOTTOM = "close-bottom"),
    (Zl.CLASS_DRAG = "drag"),
    (Zl.DEFAULT_WIDTH = 245),
    (Zl.TEXT_CLOSED = "Close Controls"),
    (Zl.TEXT_OPEN = "Open Controls"),
    (Zl._keydownHandler = function (t) {
      "text" === document.activeElement.type ||
        (72 !== t.which && 72 !== t.keyCode) ||
        Zl.toggleHide();
    }),
    Tl.bind(window, "keydown", Zl._keydownHandler, !1),
    ol.extend(Zl.prototype, {
      add: function (t, e) {
        return ec(this, t, e, {
          factoryArgs: Array.prototype.slice.call(arguments, 2),
        });
      },
      addColor: function (t, e) {
        return ec(this, t, e, { color: !0 });
      },
      remove: function (t) {
        this.__ul.removeChild(t.__li),
          this.__controllers.splice(this.__controllers.indexOf(t), 1);
        var e = this;
        ol.defer(function () {
          e.onResize();
        });
      },
      destroy: function () {
        if (this.parent)
          throw new Error(
            "Only the root GUI should be removed with .destroy(). For subfolders, use gui.removeFolder(folder) instead."
          );
        this.autoPlace && Xl.removeChild(this.domElement);
        var t = this;
        ol.each(this.__folders, function (e) {
          t.removeFolder(e);
        }),
          Tl.unbind(window, "keydown", Zl._keydownHandler, !1),
          Kl(this);
      },
      addFolder: function (t) {
        if (void 0 !== this.__folders[t])
          throw new Error(
            'You already have a folder in this GUI by the name "' + t + '"'
          );
        var e = { name: t, parent: this };
        (e.autoPlace = this.autoPlace),
          this.load &&
            this.load.folders &&
            this.load.folders[t] &&
            ((e.closed = this.load.folders[t].closed),
            (e.load = this.load.folders[t]));
        var n = new Zl(e);
        this.__folders[t] = n;
        var i = Ql(this, n.domElement);
        return Tl.addClass(i, "folder"), n;
      },
      removeFolder: function (t) {
        this.__ul.removeChild(t.domElement.parentElement),
          delete this.__folders[t.name],
          this.load &&
            this.load.folders &&
            this.load.folders[t.name] &&
            delete this.load.folders[t.name],
          Kl(t);
        var e = this;
        ol.each(t.__folders, function (e) {
          t.removeFolder(e);
        }),
          ol.defer(function () {
            e.onResize();
          });
      },
      open: function () {
        this.closed = !1;
      },
      close: function () {
        this.closed = !0;
      },
      hide: function () {
        this.domElement.style.display = "none";
      },
      show: function () {
        this.domElement.style.display = "";
      },
      onResize: function () {
        var t = this.getRoot();
        if (t.scrollable) {
          var e = Tl.getOffset(t.__ul).top,
            n = 0;
          ol.each(t.__ul.childNodes, function (e) {
            (t.autoPlace && e === t.__save_row) || (n += Tl.getHeight(e));
          }),
            window.innerHeight - e - 20 < n
              ? (Tl.addClass(t.domElement, Zl.CLASS_TOO_TALL),
                (t.__ul.style.height = window.innerHeight - e - 20 + "px"))
              : (Tl.removeClass(t.domElement, Zl.CLASS_TOO_TALL),
                (t.__ul.style.height = "auto"));
        }
        t.__resize_handle &&
          ol.defer(function () {
            t.__resize_handle.style.height = t.__ul.offsetHeight + "px";
          }),
          t.__closeButton && (t.__closeButton.style.width = t.width + "px");
      },
      onResizeDebounced: ol.debounce(function () {
        this.onResize();
      }, 50),
      remember: function () {
        if (
          (ol.isUndefined(jl) && ((jl = new Gl()).domElement.innerHTML = Fl),
          this.parent)
        )
          throw new Error("You can only call remember on a top level GUI.");
        var t = this;
        ol.each(Array.prototype.slice.call(arguments), function (e) {
          0 === t.__rememberedObjects.length && sc(t),
            -1 === t.__rememberedObjects.indexOf(e) &&
              t.__rememberedObjects.push(e);
        }),
          this.autoPlace && ac(this, this.width);
      },
      getRoot: function () {
        for (var t = this; t.parent; ) t = t.parent;
        return t;
      },
      getSaveObject: function () {
        var t = this.load;
        return (
          (t.closed = this.closed),
          this.__rememberedObjects.length > 0 &&
            ((t.preset = this.preset),
            t.remembered || (t.remembered = {}),
            (t.remembered[this.preset] = lc(this))),
          (t.folders = {}),
          ol.each(this.__folders, function (e, n) {
            t.folders[n] = e.getSaveObject();
          }),
          t
        );
      },
      save: function () {
        this.load.remembered || (this.load.remembered = {}),
          (this.load.remembered[this.preset] = lc(this)),
          $l(this, !1),
          this.saveToLocalStorageIfPossible();
      },
      saveAs: function (t) {
        this.load.remembered ||
          ((this.load.remembered = {}),
          (this.load.remembered.Default = lc(this, !0))),
          (this.load.remembered[t] = lc(this)),
          (this.preset = t),
          ic(this, t, !0),
          this.saveToLocalStorageIfPossible();
      },
      revert: function (t) {
        ol.each(
          this.__controllers,
          function (e) {
            this.getRoot().load.remembered
              ? tc(t || this.getRoot(), e)
              : e.setValue(e.initialValue),
              e.__onFinishChange && e.__onFinishChange.call(e, e.getValue());
          },
          this
        ),
          ol.each(this.__folders, function (t) {
            t.revert(t);
          }),
          t || $l(this.getRoot(), !1);
      },
      listen: function (t) {
        var e = 0 === this.__listening.length;
        this.__listening.push(t), e && cc(this.__listening);
      },
      updateDisplay: function () {
        ol.each(this.__controllers, function (t) {
          t.updateDisplay();
        }),
          ol.each(this.__folders, function (t) {
            t.updateDisplay();
          });
      },
    }),
    new Co().load("./images.png");
  const hc = document.querySelector("canvas.webgl"),
    uc = new Sr(),
    dc = new (class extends Ie {
      constructor(t = 1, e = 0.4, n = 8, i = 6, r = 2 * Math.PI) {
        super(),
          (this.type = "TorusGeometry"),
          (this.parameters = {
            radius: t,
            tube: e,
            radialSegments: n,
            tubularSegments: i,
            arc: r,
          }),
          (n = Math.floor(n)),
          (i = Math.floor(i));
        const s = [],
          o = [],
          a = [],
          l = [],
          c = new k(),
          h = new k(),
          u = new k();
        for (let s = 0; s <= n; s++)
          for (let d = 0; d <= i; d++) {
            const p = (d / i) * r,
              f = (s / n) * Math.PI * 2;
            (h.x = (t + e * Math.cos(f)) * Math.cos(p)),
              (h.y = (t + e * Math.cos(f)) * Math.sin(p)),
              (h.z = e * Math.sin(f)),
              o.push(h.x, h.y, h.z),
              (c.x = t * Math.cos(p)),
              (c.y = t * Math.sin(p)),
              u.subVectors(h, c).normalize(),
              a.push(u.x, u.y, u.z),
              l.push(d / i),
              l.push(s / n);
          }
        for (let t = 1; t <= n; t++)
          for (let e = 1; e <= i; e++) {
            const n = (i + 1) * t + e - 1,
              r = (i + 1) * (t - 1) + e - 1,
              o = (i + 1) * (t - 1) + e,
              a = (i + 1) * t + e;
            s.push(n, r, a), s.push(r, o, a);
          }
        this.setIndex(s),
          this.setAttribute("position", new Me(o, 3)),
          this.setAttribute("normal", new Me(a, 3)),
          this.setAttribute("uv", new Me(l, 2));
      }
    })(0.7, 0.2, 16, 100),
    pc = new Ie(),
    fc = new Float32Array(9e3);
  for (let t = 0; t < 9e3; t++)
    fc[t] = (Math.random() - 0.5) * (5 * Math.random());
  pc.setAttribute("position", new fe(fc, 3));
  const mc = new gs({ size: 5e-4 }),
    gc = new gs({ size: 5e-4, transparent: !0, color: "yellow" }),
    vc = new bs(dc, mc),
    _c = new bs(pc, gc);
  uc.add(_c), console.log(vc);
  const yc = new la(16777215, 0.1);
  (yc.position.x = 2), (yc.position.y = 3), (yc.position.z = 4), uc.add(yc);
  const xc = { width: window.innerWidth, height: window.innerHeight };
  window.addEventListener("resize", () => {
    (xc.width = window.innerWidth),
      (xc.height = window.innerHeight),
      (bc.aspect = xc.width / xc.height),
      bc.updateProjectionMatrix(),
      wc.setSize(xc.width, xc.height),
      wc.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
  const bc = new on(75, xc.width / xc.height, 0.1, 100);
  (bc.position.x = 0), (bc.position.y = 0), (bc.position.z = 2), uc.add(bc);
  const wc = new br({ canvas: hc });
  wc.setSize(xc.width, xc.height),
    wc.setPixelRatio(Math.min(window.devicePixelRatio, 2)),
    wc.setClearColor(new he("#000000")),
    document.addEventListener("mousemove", function (t) {
      (Sc = t.clientY), (Mc = t.clientX);
    });
  let Mc = 0,
    Sc = 0;
  const Ec = new (class {
      constructor(t) {
        (this.autoStart = void 0 === t || t),
          (this.startTime = 0),
          (this.oldTime = 0),
          (this.elapsedTime = 0),
          (this.running = !1);
      }
      start() {
        (this.startTime = xa()),
          (this.oldTime = this.startTime),
          (this.elapsedTime = 0),
          (this.running = !0);
      }
      stop() {
        this.getElapsedTime(), (this.running = !1), (this.autoStart = !1);
      }
      getElapsedTime() {
        return this.getDelta(), this.elapsedTime;
      }
      getDelta() {
        let t = 0;
        if (this.autoStart && !this.running) return this.start(), 0;
        if (this.running) {
          const e = xa();
          (t = (e - this.oldTime) / 1e3),
            (this.oldTime = e),
            (this.elapsedTime += t);
        }
        return t;
      }
    })(),
    Tc = () => {
      const t = Ec.getElapsedTime();
      (vc.rotation.y = 1 * t),
        (_c.rotation.x = 0.08 * t * 1),
        Mc > 0 &&
          ((_c.rotation.x = 0.1 * Sc * (8e-4 * t)),
          (_c.rotation.y = 0.1 * Mc * (8e-4 * t))),
        wc.render(uc, bc),
        window.requestAnimationFrame(Tc);
    };
  Tc();
})();
//# sourceMappingURL=bundle.eab63a3ed402d2884767.js.map
