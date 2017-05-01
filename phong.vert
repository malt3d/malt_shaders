#version 330

layout (location = 0) in vec3 position;
layout (location = 1) in vec3 normal;

out vec3 world_position;
out vec3 world_normal;

uniform mat4 model;
uniform mat4 vp;

void main()
{
    world_position = (model * vec4(position, 1.0f)).xyz;
    world_normal = mat3(transpose(inverse(model))) * normal;
	gl_Position = vp * vec4(world_position, 1.0f);
}