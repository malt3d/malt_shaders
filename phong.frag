#version 330

uniform vec3 ambient;
uniform vec3 diffuse;
uniform vec3 specular;
uniform float phong_exponent;

out vec4 color;

void main()
{
	color = vec4(diffuse, 1.0f);
}