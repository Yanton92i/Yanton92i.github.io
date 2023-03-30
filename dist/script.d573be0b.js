// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/script.js":[function(require,module,exports) {
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var debounce = function debounce(callback, duration) {
  var timer;
  return function (event) {
    clearTimeout(timer);
    timer = setTimeout(function () {
      callback(event);
    }, duration);
  };
};
var loadTexs = function loadTexs(imgs, callback) {
  var texLoader = new THREE.TextureLoader();
  var length = Object.keys(imgs).length;
  var loadedTexs = {};
  var count = 0;
  texLoader.crossOrigin = 'anonymous';
  var _loop = function _loop() {
    var k = key;
    if (imgs.hasOwnProperty(k)) {
      texLoader.load(imgs[k], function (tex) {
        tex.repeat = THREE.RepeatWrapping;
        loadedTexs[k] = tex;
        count++;
        if (count >= length) callback(loadedTexs);
      });
    }
  };
  for (var key in imgs) {
    _loop();
  }
};
var Fog = /*#__PURE__*/function () {
  function Fog() {
    _classCallCheck(this, Fog);
    this.uniforms = {
      time: {
        type: 'f',
        value: 0
      },
      tex: {
        type: 't',
        value: null
      }
    };
    this.num = 200;
    this.obj = null;
  }
  _createClass(Fog, [{
    key: "createObj",
    value: function createObj(tex) {
      // Define Geometries
      var geometry = new THREE.InstancedBufferGeometry();
      var baseGeometry = new THREE.PlaneBufferGeometry(1100, 1100, 20, 20);

      // Copy attributes of the base Geometry to the instancing Geometry
      geometry.addAttribute('position', baseGeometry.attributes.position);
      geometry.addAttribute('normal', baseGeometry.attributes.normal);
      geometry.addAttribute('uv', baseGeometry.attributes.uv);
      geometry.setIndex(baseGeometry.index);

      // Define attributes of the instancing geometry
      var instancePositions = new THREE.InstancedBufferAttribute(new Float32Array(this.num * 3), 3, 1);
      var delays = new THREE.InstancedBufferAttribute(new Float32Array(this.num), 1, 1);
      var rotates = new THREE.InstancedBufferAttribute(new Float32Array(this.num), 1, 1);
      for (var i = 0, ul = this.num; i < ul; i++) {
        instancePositions.setXYZ(i, (Math.random() * 2 - 1) * 850, 0, (Math.random() * 2 - 1) * 300);
        delays.setXYZ(i, Math.random());
        rotates.setXYZ(i, Math.random() * 2 + 1);
      }
      geometry.addAttribute('instancePosition', instancePositions);
      geometry.addAttribute('delay', delays);
      geometry.addAttribute('rotate', rotates);

      // Define Material
      var material = new THREE.RawShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: "\n        attribute vec3 position;\n        attribute vec2 uv;\n        attribute vec3 instancePosition;\n        attribute float delay;\n        attribute float rotate;\n\n        uniform mat4 projectionMatrix;\n        uniform mat4 modelViewMatrix;\n        uniform float time;\n\n        varying vec3 vPosition;\n        varying vec2 vUv;\n        varying vec3 vColor;\n        varying float vBlink;\n\n        const float duration = 200.0;\n\n        mat4 calcRotateMat4Z(float radian) {\n          return mat4(\n            cos(radian), -sin(radian), 0.0, 0.0,\n            sin(radian), cos(radian), 0.0, 0.0,\n            0.0, 0.0, 1.0, 0.0,\n            0.0, 0.0, 0.0, 1.0\n          );\n        }\n        vec3 convertHsvToRgb(vec3 c) {\n          vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\n          vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\n          return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\n        }\n\n        void main(void) {\n          float now = mod(time + delay * duration, duration) / duration;\n\n          mat4 rotateMat = calcRotateMat4Z(radians(rotate * 360.0) + time * 0.1);\n          vec3 rotatePosition = (rotateMat * vec4(position, 1.0)).xyz;\n\n          vec3 moveRise = vec3(\n            (now * 2.0 - 1.0) * (2500.0 - (delay * 2.0 - 1.0) * 2000.0),\n            (now * 2.0 - 1.0) * 2000.0,\n            sin(radians(time * 50.0 + delay + length(position))) * 30.0\n            );\n          vec3 updatePosition = instancePosition + moveRise + rotatePosition;\n\n          vec3 hsv = vec3(time * 0.1 + delay * 0.2 + length(instancePosition) * 100.0, 0.5 , 0.8);\n          vec3 rgb = convertHsvToRgb(hsv);\n          float blink = (sin(radians(now * 360.0 * 20.0)) + 1.0) * 0.88;\n\n          vec4 mvPosition = modelViewMatrix * vec4(updatePosition, 1.0);\n\n          vPosition = position;\n          vUv = uv;\n          vColor = rgb;\n          vBlink = blink;\n\n          gl_Position = projectionMatrix * mvPosition;\n        }\n      ",
        fragmentShader: "\n        precision highp float;\n\n        uniform sampler2D tex;\n\n        varying vec3 vPosition;\n        varying vec2 vUv;\n        varying vec3 vColor;\n        varying float vBlink;\n\n        void main() {\n          vec2 p = vUv * 2.0 - 1.0;\n\n          vec4 texColor = texture2D(tex, vUv);\n          vec3 color = (texColor.rgb - vBlink * length(p) * 0.8) * vColor;\n          float opacity = texColor.a * 0.36;\n\n          gl_FragColor = vec4(color, opacity);\n        }\n      ",
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });
      this.uniforms.tex.value = tex;

      // Create Object3D
      this.obj = new THREE.Mesh(geometry, material);
    }
  }, {
    key: "render",
    value: function render(time) {
      this.uniforms.time.value += time;
    }
  }]);
  return Fog;
}();
var resolution = new THREE.Vector2();
var canvas = document.getElementById('canvas-webgl');
var renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
  canvas: canvas
});
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera();
var clock = new THREE.Clock();
camera.far = 50000;
camera.setFocalLength(24);
var texsSrc = {
  fog: 'https://ykob.github.io/sketch-threejs/img/sketch/fog/fog.png'
};
var fog = new Fog();
var render = function render() {
  var time = clock.getDelta();
  fog.render(time);
  renderer.render(scene, camera);
};
var renderLoop = function renderLoop() {
  render();
  requestAnimationFrame(renderLoop);
};
var resizeCamera = function resizeCamera() {
  camera.aspect = resolution.x / resolution.y;
  camera.updateProjectionMatrix();
};
var resizeWindow = function resizeWindow() {
  resolution.set(window.innerWidth, window.innerHeight);
  canvas.width = resolution.x;
  canvas.height = resolution.y;
  resizeCamera();
  renderer.setSize(resolution.x, resolution.y);
};
var on = function on() {
  window.addEventListener('resize', debounce(resizeWindow), 1000);
};
var init = function init() {
  loadTexs(texsSrc, function (loadedTexs) {
    fog.createObj(loadedTexs.fog);
    scene.add(fog.obj);
    renderer.setClearColor(0x111111, 1.0);
    camera.position.set(0, 0, 1000);
    camera.lookAt(new THREE.Vector3());
    clock.start();
    on();
    resizeWindow();
    renderLoop();
  });
};
init();
},{}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64571" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/script.js"], null)
//# sourceMappingURL=/script.d573be0b.js.map