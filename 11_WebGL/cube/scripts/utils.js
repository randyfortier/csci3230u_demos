function loadFile(file, callback, noCache, isJson) {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState == 1) {
			if (isJson) {
				request.overrideMimeType('application/json');
			}
			request.send();
		} else if (request.readyState == 4) {
			if (request.status == 200) {
				callback(request.responseText);
			} else if (request.status == 404) {
				throw 'File "' + file + '" does not exist.';
			} else {
				throw 'XHR error ' + request.status + '.';
			}
		}
	};
	var url = file;
	if (noCache) {
		url += '?' + (new Date()).getTime();
	}
	request.open('GET', url, true);
}

function loadProgram(vs, fs, callback) {
	var program = gl.createProgram();
	function vshaderLoaded(str) {
		program.vshaderSource = str;
		if (program.fshaderSource) {
			linkProgram(program);
			callback(program);
		}
	}
	function fshaderLoaded(str) {
		program.fshaderSource = str;
		if (program.vshaderSource) {
			linkProgram(program);
			callback(program);
		}
	}
	loadFile(vs, vshaderLoaded, true);
	loadFile(fs, fshaderLoaded, true);
	return program;
}

function linkProgram(program) {
	var vshader = createShader(program.vshaderSource, gl.VERTEX_SHADER);
	var fshader = createShader(program.fshaderSource, gl.FRAGMENT_SHADER);
	gl.attachShader(program, vshader);
	gl.attachShader(program, fshader);
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		throw gl.getProgramInfoLog(program);
	}
}

function createShader(code, type) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, code);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
	throw gl.getShaderInfoLog(shader);
  }
  return shader;
}

function createProgram(vshaderCode, fshaderCode) {
  var program = gl.createProgram();
  var vshader = createShader(vshaderCode, gl.VERTEX_SHADER);
  var fshader = createShader(fshaderCode, gl.FRAGMENT_SHADER);
  gl.attachShader(program, vshader);
  gl.attachShader(program, fshader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
	throw gl.getProgramInfoLog(program);
  }
  return program;
}

function quadWithFaceColour(a, b, c, d, colour) {
    var indices = [a, b, c, a, c, d];
    for (var i = 0; i < indices.length; i++) {
        points.push(vertices[indices[i]]);
        colours.push(vertexColours[colour]);
    }
}

function quadWithVertexColour(a, b, c, d) {
    var indices = [a, b, c, a, c, d];
    for (var i = 0; i < indices.length; i++) {
        points.push(vertices[indices[i]]);
        colours.push(vertexColours[indices[i]]);
    }
}

var lastTime = new Date().getTime();
function requestAnimationFrame(callback) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
    var lastTime = currTime + timeToCall;
    return id;
}

