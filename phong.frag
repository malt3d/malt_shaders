#version 330

in vec4 world_position;
in vec4 world_normal;
in vec2 frag_uv;

out vec4 final_color;

struct PointLight
{
    vec3 intensity;
    vec3 position;
};

struct DirectionalLight
{
    vec3 intensity;
    vec3 direction;
};

struct Material
{
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
    float phong_exponent;
};

uniform Material material;
uniform vec3 ambient_light;
uniform PointLight point_light[8];
uniform int number_of_point_lights;
uniform DirectionalLight directional_light;
uniform vec3 camera_position;
uniform sampler2D tex;

vec3 computeRadiancePointLight(PointLight pointlight, float distance);
vec3 computeRadianceDirectionalLight(DirectionalLight directional_light);
vec3 computeDiffuseReflectance(Material material, vec3 to_light, vec3 normal);
vec3 computeReflectance(Material material, vec3 to_light, vec3 normal, vec3 to_eye);

void main()
{
    vec3 color = material.ambient * ambient_light;

    vec3 to_eye = normalize(camera_position - world_position);

    for (int i = 0; i < number_of_point_lights; ++i)
    {
        vec3 to_light = point_light[i].position - world_position;
        float distance = length(to_light);
        to_light /= distance;
        color += computeReflectance(material, to_light, world_normal, to_eye) * computeRadiancePointLight(point_light[i], distance);
    }

    vec3 to_light = -directional_light.direction;
    color += computeReflectance(material, to_light, world_normal, to_eye) * computeRadianceDirectionalLight(directional_light);

	final_color = vec4(color, 1.0f);
}

vec3 computeRadiancePointLight(PointLight point_light, float distance)
{
    return point_light.intensity / (distance * distance);
}

vec3 computeRadianceDirectionalLight(DirectionalLight directional_light)
{
    return directional_light.intensity;
}

vec3 computeReflectance(Material material, vec3 to_light, vec3 normal, vec3 to_eye)
{
    vec3 diffuse_reflectance = max(dot(to_light, normal), 0.0f) * texture(tex, frag_uv).rgb;
    vec3 specular_reflectance = pow(max(dot(normalize(to_light + to_eye), normal), 0.0f), material.phong_exponent) * material.specular;

    return diffuse_reflectance + specular_reflectance;
}