var vertexShaderSource = "// an attribute will receive data from a buffer\r\nattribute vec3 a_position;\r\nattribute vec3 a_color;\r\nvarying vec4 vColor;\r\n\r\nvoid main(void) {\r\n\r\n  gl_Position = vec4(a_position, 1.0);\r\n  gl_PointSize = 3.0;\r\n  vColor = vec4(a_color, 1.0);\r\n}";
export { vertexShaderSource as default };
