export default {
  vertexShader: `
  #include <common>
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
    }
  `,

  fragmentShader: `
    #include <common>
    #include <packing>
    #include <bsdfs>
    #include <lights_pars_begin>
    #include <shadowmap_pars_fragment>
    #include <shadowmask_pars_fragment>

    varying vec2 vUv;

    uniform vec2 uvOffset;
    uniform sampler2D texture1;

    void main() {
      // ------------------------------
      vec4 color = texture2D(texture1, vUv);
      vec3 finalColor = vec3(color.rgb);
      

      vec3 shadowColor = vec3(0, 0, 0);
      float shadowPower = 0.4;
      // ------------------------------

      gl_FragColor = vec4( mix(finalColor, shadowColor, (1.0 - getShadowMask() ) * shadowPower), 0.0);
    }
  `,
};
