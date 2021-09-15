import iro$1 from "../node_modules/@jaames/iro/dist/iro.es.js";
import { initGL, createShader, createProgram, attribute, r, createBuffer } from "./shader.js";
import fragmentShaderSource from "./shaders/lab1-fragment.js";
import vertexShaderSource from "./shaders/lab1-vertex.js";
let colorPicker = new iro$1.ColorPicker("#picker", {
  width: 200,
  color: "#f00"
});
//! get color from the color picker
function getColor() {
  return [colorPicker.color.red / 255, colorPicker.color.green / 255, colorPicker.color.blue / 255];
}
//! helper function to add one color per vertex
function addColors(list, n) {
  let c = getColor();
  for (let i = 0; i < n; i++)
    list.push(c);
}
//! arrays for vertices
const point_vertices = [];
//! points
const line_vertices = [];
//! horizontal and vertical lines
const triangle_vertices = [];
//! triangles and squares
//! arrays for colors
const point_colors = [];
const line_colors = [];
const triangle_colors = [];
//! set up webgl
const canvas = document.querySelector("#canvas");
const gl = initGL(canvas);
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
const program = createProgram(gl, vertexShader, fragmentShader);
const a_position = attribute(gl, program, "a_position");
const a_color = attribute(gl, program, "a_color");
const itemSize = 3;
//! respond to keyboard events
window.addEventListener("keypress", (e) => {
  switch (e.key) {
    case "c":
      clearScreen();
      break;
    case "p":
      drawPoint();
      break;
    case "h":
      drawHorizontalLine();
      break;
    case "v":
      drawVerticalLine();
      break;
    case "t":
      drawTriangle();
      break;
    case "q":
      drawSquare();
      break;
  }
  drawScene();
});
function clearScreen() {
  point_vertices.length = 0;
  line_vertices.length = 0;
  triangle_vertices.length = 0;
  triangle_colors.length = 0;
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}
function drawPoint() {
  console.log("point");
  point_vertices.push([
    r(canvas.width),
    r(canvas.height),
    0
  ]);
  addColors(point_colors, 1);
}
function drawHorizontalLine() {
  let x = r(canvas.width);
  let y = r(canvas.height);
  line_vertices.push([
    x,
    y,
    0,
    x + 0.3,
    y,
    0
  ]);
  addColors(line_colors, 2);
}
function drawVerticalLine() {
  let x = r(canvas.width);
  let y = r(canvas.height);
  line_vertices.push([
    x,
    y,
    0,
    x,
    y + 0.3,
    0
  ]);
  addColors(line_colors, 2);
}
function drawTriangle() {
  let x = r(canvas.width);
  let y = r(canvas.height);
  triangle_vertices.push([
    x,
    y,
    0,
    x - 0.1,
    y - 0.2,
    0,
    x + 0.1,
    y - 0.2,
    0
  ]);
  addColors(triangle_colors, 3);
}
function drawSquare() {
  let x = r(canvas.width);
  let y = r(canvas.height);
  triangle_vertices.push([
    x,
    y,
    0,
    x + 0.1,
    y,
    0,
    x + 0.1,
    y - 0.1,
    0,
    x,
    y,
    0,
    x + 0.1,
    y - 0.1,
    0,
    x,
    y - 0.1,
    0
  ]);
  addColors(triangle_colors, 6);
}
function drawScene() {
  let pointVerticesBuffer = createBuffer(gl, new Float32Array(point_vertices.flat()));
  let pointColorsBuffer = createBuffer(gl, new Float32Array(point_colors.flat()));
  let linesVerticesBuffer = createBuffer(gl, new Float32Array(line_vertices.flat()));
  let linesColorsBuffer = createBuffer(gl, new Float32Array(line_colors.flat()));
  let triangleVerticesBuffer = createBuffer(gl, new Float32Array(triangle_vertices.flat()));
  let triangleColorsBuffer = createBuffer(gl, new Float32Array(triangle_colors.flat()));
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleVerticesBuffer);
  gl.vertexAttribPointer(a_position, itemSize, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleColorsBuffer);
  gl.vertexAttribPointer(a_color, itemSize, gl.FLOAT, false, 0, 0);
  gl.drawArrays(gl.TRIANGLES, 0, triangle_vertices.flat().length / 3);
  gl.bindBuffer(gl.ARRAY_BUFFER, pointVerticesBuffer);
  gl.vertexAttribPointer(a_position, itemSize, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, pointColorsBuffer);
  gl.vertexAttribPointer(a_color, itemSize, gl.FLOAT, false, 0, 0);
  gl.drawArrays(gl.POINTS, 0, point_vertices.length);
  gl.bindBuffer(gl.ARRAY_BUFFER, linesVerticesBuffer);
  gl.vertexAttribPointer(a_position, itemSize, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, linesColorsBuffer);
  gl.vertexAttribPointer(a_color, itemSize, gl.FLOAT, false, 0, 0);
  gl.drawArrays(gl.LINES, 0, line_vertices.length * 2);
}
