
// Add an attribute
export function attribute(gl: WebGLRenderingContext, program: WebGLProgram, name: string) {
    let attrib = gl.getAttribLocation(program, name);
    gl.enableVertexAttribArray(attrib);
    if (attrib < 0) {
        throw new Error(`Attribute "${name}" not found in program.`)
    }
    return attrib
}

//! Add a uniform
export function uniform(gl: WebGLRenderingContext, program: WebGLProgram, name: string) {
    let attrib = gl.getUniformLocation(program, name);
    if (attrib < 0) {
        throw new Error(`Attribute "${name}" not found in program.`)
    }
    return attrib
}

export function createBuffer(gl: WebGLRenderingContext, data: Float32Array) {
    let buffer_id = gl.createBuffer()
    if (!buffer_id) throw new Error("Failed to create buffer.")

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer_id)
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)

    return buffer_id
}

export function initGL(canvas: HTMLCanvasElement): WebGLRenderingContext {
    let gl = canvas.getContext("webgl") as WebGLRenderingContext
    gl.canvas.width = canvas.width;
    gl.canvas.height = canvas.height;
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    return gl
}

export function createShader(gl: WebGLRenderingContext, type: any, source: string): WebGLShader {
    let shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    console.log(shader)
    if (success) {
        return shader;
    }

    let e = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    console.log(source)
    throw e
}


export function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram {
    let program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(program);
    return program
}

function randi(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

export function r(max: number) {
    return randi(-max, max) / max
}