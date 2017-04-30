#version 330

layout (location = 0) in vec3 position;
layout (location = 1) in vec3 normal;

out vec4 world_position;
out vec4 world_normal;

uniform mat4 model;
uniform mat4 vp;

void main()
{
    world_position = model * vec4(position, 1.0);
    world_normal = transpose(inverse(model)) * vec4(normal, 0.0f);
	gl_Position = model * vp * vec4(position, 1.0);
}