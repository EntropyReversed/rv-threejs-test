export default {
  vertexShader: `
    precision mediump float;
    attribute vec3 a_vertex;
    attribute vec3 a_normal;
    attribute vec2 a_coord;
    varying vec2 v_coord;
    varying vec3 v_normal;
    varying vec3 v_pos;
    uniform vec3 u_eye;
    uniform mat4 u_mvp;
    uniform mat4 u_model;
    uniform mat4 u_viewprojection;
    uniform vec3 u_light_dir;
    uniform vec4 u_light_color;
    uniform float u_alpha_threshold;
    uniform vec4 vec4_11;
    void main() {
      v_coord = a_coord;
      v_normal = (u_model * vec4(a_normal, 0.0)).xyz;
      vec3 pos = a_vertex;
      v_pos = (u_model * vec4(pos,1.0)).xyz;
      gl_Position = u_mvp * vec4(pos,1.0);
    }
  `,

  fragmentShader: `

    precision mediump float;
    varying vec2 v_coord;
    varying vec3 v_normal;
    varying vec3 v_pos;
    uniform vec3 u_eye;
    uniform vec4 u_color;
    uniform vec3 u_light_dir;
    uniform vec4 u_light_color;
    uniform float u_alpha_threshold;
    uniform vec4 vec4_11;
    uniform samplerCube u_cube_default_texture;
    void main() {
      vec3 normal = normalize(v_normal);
      vec3 view_dir = normalize(v_pos - u_eye);
      vec3 light_dir = normalize(u_light_dir);
      vec3 half_dir = normalize(view_dir + light_dir);
      float float_9 = 41.300;
      vec3 pixel_normal_ws = normal;
      vec3 reflected_vector = reflect(view_dir,pixel_normal_ws);
      vec4 color_17 = textureCube(u_cube_default_texture, reflected_vector);
      float float_18 = 0.629;
      vec4 mix_18 = mix(vec4_11,color_17,float_18);
      float specular_intensity = 1.0;
      float gloss = float_9;
      vec3 diffuse_color = mix_18.xyz;
      float lambertian = max(dot(light_dir,normal), 0.0);
      vec3 diffuse_light = lambertian * vec3(1.0);
      float ambient_intensity = 0.2;
      vec3 ambient_light =  vec3(1.0) * ambient_intensity;
      vec3 reflect_dir = reflect(light_dir, normal);
      float spec_angle = max(dot(reflect_dir, view_dir), 0.0);
      float specular_light = pow(spec_angle, gloss) * specular_intensity;
      vec3 specular_color = u_light_color.xyz * specular_light;
      vec3 refraction_color = vec3(0.0);
      vec3 emission = vec3(0.0);
      gl_FragColor = vec4( emission + refraction_color + specular_color + (ambient_light + diffuse_light) * diffuse_color, 1.0 );
    }
  `,
};
