#version 330

layout (location = 0) in vec3 position;

uniform mat4 model;
uniform mat4 vp;

void main()
{
	gl_Position = model * vec4(position, 1.0);
}