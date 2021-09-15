import iro from '@jaames/iro'
import { attribute, createBuffer, createProgram, createShader, initGL } from './shader'
import fragmentShaderSource from "./shaders/lab1-fragment.glsl?raw"
import vertexShaderSource from "./shaders/lab1-vertex.glsl?raw"
import './style.css'


// @ts-ignore
let colorPicker = new iro.ColorPicker('#picker', {
  width: 200,
  color: "#f00"
});

function getColor() {
  return [colorPicker.color.red / 255, colorPicker.color.green / 255, colorPicker.color.blue / 255,]
}

function addColors(list: any[], n: number) {
  let c = getColor()
  for (let i = 0; i < n; i++) list.push(c)
}


const canvas = document.querySelector<HTMLCanvasElement>('#canvas')


// arrays for vertices
const point_vertices = [] // points
const line_vertices = [] // horizontal and vertical lines
const triangle_vertices = [] // triangles and squares

// arrays for colors
const point_colors = []
const line_colors = []
const triangle_colors = []


const gl = initGL(canvas)
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
const program = createProgram(gl, vertexShader, fragmentShader);
const a_position = attribute(gl, program, "a_position")
const a_color = attribute(gl, program, "a_color")
const itemSize = 3

window.addEventListener("keypress", (e) => {
  switch (e.key) {
    case "c":
      clearScreen()
      break
    case "p":
      drawPoint()
      break
    case "h":
      drawHorizontalLine()
      break
    case "v":
      drawVerticalLine()
      break
    case "t":
      drawTriangle()
      break
    case "q":
      drawSquare()
      break
  }

  drawScene()
})

export function randi(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function r(max: number) {
  return randi(-max, max) / max
}

function clearScreen() {
  point_vertices.length = 0
  line_vertices.length = 0
  triangle_vertices.length = 0
  triangle_colors.length = 0
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
}

function drawPoint() {
  console.log("point")
  point_vertices.push([
    r(canvas.width), r(canvas.height), 0
  ])

  addColors(point_colors, 1)
}

function drawHorizontalLine() {
  let x = r(canvas.width)
  let y = r(canvas.height)

  line_vertices.push([
    x, y, 0,
    x + .3, y, 0
  ])
  addColors(line_colors, 2)
}

function drawVerticalLine() {
  let x = r(canvas.width)
  let y = r(canvas.height)

  line_vertices.push([
    x, y, 0,
    x, y + .3, 0
  ])
  addColors(line_colors, 2)

}

function drawTriangle() {
  let x = r(canvas.width)
  let y = r(canvas.height)

  triangle_vertices.push([
    x, y, 0,
    x - .1, y - .2, 0,
    x + .1, y - .2, 0
  ])

  addColors(triangle_colors, 3)
}
function drawSquare() {
  let x = r(canvas.width)
  let y = r(canvas.height)

  triangle_vertices.push([
    x, y, 0,
    x + .1, y, 0,
    x + .1, y - .1, 0,

    x, y, 0,
    x + .1, y - .1, 0,
    x, y - .1, 0,
  ])
  addColors(triangle_colors, 6)
}




function drawScene() {
  let pointVerticesBuffer = createBuffer(gl, new Float32Array(point_vertices.flat()))
  let pointColorsBuffer = createBuffer(gl, new Float32Array(point_colors.flat()))

  let linesVerticesBuffer = createBuffer(gl, new Float32Array(line_vertices.flat()))
  let linesColorsBuffer = createBuffer(gl, new Float32Array(line_colors.flat()))

  let triangleVerticesBuffer = createBuffer(gl, new Float32Array(triangle_vertices.flat()))
  let triangleColorsBuffer = createBuffer(gl, new Float32Array(triangle_colors.flat()))

  gl.bindBuffer(gl.ARRAY_BUFFER, pointVerticesBuffer)
  gl.vertexAttribPointer(a_position, itemSize, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, pointColorsBuffer)
  gl.vertexAttribPointer(a_color, itemSize, gl.FLOAT, false, 0, 0);
  gl.drawArrays(gl.POINTS, 0, point_vertices.length); // draw two triangles that involve 6 vertices  


  gl.bindBuffer(gl.ARRAY_BUFFER, linesVerticesBuffer)
  gl.vertexAttribPointer(a_position, itemSize, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, linesColorsBuffer)
  gl.vertexAttribPointer(a_color, itemSize, gl.FLOAT, false, 0, 0);
  gl.drawArrays(gl.LINES, 0, line_vertices.length * 2); // draw two triangles that involve 6 vertices 


  gl.bindBuffer(gl.ARRAY_BUFFER, triangleVerticesBuffer)
  gl.vertexAttribPointer(a_position, itemSize, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleColorsBuffer)
  gl.vertexAttribPointer(a_color, itemSize, gl.FLOAT, false, 0, 0);
  gl.drawArrays(gl.TRIANGLES, 0, triangle_vertices.flat().length / 3); // draw two triangles that involve 6 vertices  
}



