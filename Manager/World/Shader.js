export default {
  vertexShader: `
  #include <common>
  #include <fog_pars_vertex>
  #include <shadowmap_pars_vertex>
  varying vec2 vUv; 

  void main() {
      vUv = uv; 
      vec3 objectNormal = vec3( normal );
      vec3 transformedNormal = normalMatrix * objectNormal;
      #include <begin_vertex>
      #include <project_vertex>
      #include <worldpos_vertex>
      #include <shadowmap_vertex>
      #include <fog_vertex>
    }
  `,

  fragmentShader: `
    #include <common>
    #include <packing>
    #include <fog_pars_fragment>
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
      #include <fog_fragment>
      #include <dithering_fragment>
    }
  `,
};
