// an attribute will receive data from a buffer
attribute vec3 a_position;
attribute vec3 a_color;
varying vec4 vColor;

void main(void) {

  gl_Position = vec4(a_position, 1.0);
  gl_PointSize = 3.0;
  vColor = vec4(a_color, 1.0);
}