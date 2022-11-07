// export default {
//   vertexShader: `
//   #include <common>
//   #include <shadowmap_pars_vertex>
//   varying vec2 vUv; 

//   void main() {
//       vUv = uv; 
//       vec3 objectNormal = vec3( normal );
//       vec3 transformedNormal = normalMatrix * objectNormal;
//       #include <begin_vertex>
//       #include <project_vertex>
//       #include <worldpos_vertex>
//       #include <shadowmap_vertex>

//     }
//   `,

//   fragmentShader: `
//     #include <common>
//     #include <packing>

//     #include <bsdfs>
//     #include <lights_pars_begin>
//     #include <shadowmap_pars_fragment>
//     #include <shadowmask_pars_fragment>
//     #include <dithering_pars_fragment>
//     uniform vec2 uvOffset;
//     uniform sampler2D texture1;
//     varying vec2 vUv;

//     void main() {
//       // CHANGE THAT TO YOUR NEEDS
//       // ------------------------------

//       vec4 color = texture2D(texture1, vUv);
//       vec3 finalColor = vec3(color.r, color.g, color.b);
//       vec3 shadowColor = vec3(0, 0, 0);
//       float shadowPower = 0.4;
//       // ------------------------------
      
//       // it just mixes the shadow color with the frag color
//       gl_FragColor = vec4( mix(finalColor, shadowColor, (1.0 - getShadowMask() ) * shadowPower), 1.0);

//       #include <dithering_fragment>
//     }
//   `,
// };


// varying vec2 vUv;
// varying vec3 vecPos;
// varying vec3 vecNormal;
 
// void main() {
//   vUv = uv;
//   // Since the light is in camera coordinates,
//   // I'll need the vertex position in camera coords too
//   vecPos = (modelViewMatrix * vec4(position, 1.0)).xyz;
//   // That's NOT exacly how you should transform your
//   // normals but this will work fine, since my model
//   // matrix is pretty basic
//   vecNormal = (modelViewMatrix * vec4(normal, 0.0)).xyz;
//   gl_Position = projectionMatrix *
//                 vec4(vecPos, 1.0);
// }

export default {
  vertexShader: `
  #include <common>
  #include <shadowmap_pars_vertex>
  varying vec2 vUv; 
  varying vec3 vecPos;
  varying vec3 vecNormal;

  void main() {
      vUv = uv; 
      vUv = uv;
      // Since the light is in camera coordinates,
      // I'll need the vertex position in camera coords too
      vecPos = (modelViewMatrix * vec4(position, 1.0)).xyz;
      // That's NOT exacly how you should transform your
      // normals but this will work fine, since my model
      // matrix is pretty basic
      vecNormal = (modelViewMatrix * vec4(normal, 0.0)).xyz;
      gl_Position = projectionMatrix * vec4(vecPos, 1.0);
      vec3 objectNormal = vec3( normal );
      vec3 transformedNormal = normalMatrix * objectNormal;
      #include <begin_vertex>
      #include <project_vertex>
      #include <worldpos_vertex>
      #include <shadowmap_vertex>

    }
  `,

  fragmentShader: `
    #include <common>
    #include <packing>

    #include <bsdfs>
    #include <lights_pars_begin>
    #include <shadowmap_pars_fragment>
    #include <shadowmask_pars_fragment>
    #include <dithering_pars_fragment>
    uniform vec2 uvOffset;
    uniform sampler2D texture1;
    varying vec2 vUv;

    void main() {
      // CHANGE THAT TO YOUR NEEDS
      // ------------------------------

      vec4 color = texture2D(texture1, vUv);
      vec3 finalColor = vec3(color.r, color.g, color.b);
      vec3 shadowColor = vec3(0, 0, 0);
      float shadowPower = 0.4;
      // ------------------------------
      
      // it just mixes the shadow color with the frag color
      gl_FragColor = vec4( mix(finalColor, shadowColor, (1.0 - getShadowMask() ) * shadowPower), 1.0);

      #include <dithering_fragment>
    }
  `,
};
