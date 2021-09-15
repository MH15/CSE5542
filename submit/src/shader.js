function attribute(gl, program, name) {
  let attrib = gl.getAttribLocation(program, name);
  gl.enableVertexAttribArray(attrib);
  if (attrib < 0) {
    throw new Error(`Attribute "${name}" not found in program.`);
  }
  return attrib;
}
function createBuffer(gl, data) {
  let buffer_id = gl.createBuffer();
  if (!buffer_id)
    throw new Error("Failed to create buffer.");
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer_id);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  return buffer_id;
}
function initGL(canvas) {
  let gl = canvas.getContext("webgl");
  gl.canvas.width = canvas.width;
  gl.canvas.height = canvas.height;
  gl.clearColor(1, 1, 1, 1);
  return gl;
}
function createShader(gl, type, source) {
  let shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  console.log(shader);
  if (success) {
    return shader;
  }
  let e = gl.getShaderInfoLog(shader);
  gl.deleteShader(shader);
  console.log(source);
  throw e;
}
function createProgram(gl, vertexShader, fragmentShader) {
  let program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    alert("Could not initialise shaders");
  }
  gl.useProgram(program);
  return program;
}
function randi(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
function r(max) {
  return randi(-max, max) / max;
}
export { attribute, createBuffer, createProgram, createShader, initGL, r };
