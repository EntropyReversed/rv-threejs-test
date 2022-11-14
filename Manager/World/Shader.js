export default {
  vertexShader: `
  #include <common>
  #include <shadowmap_pars_vertex>

  varying vec2 vUv; 

  void main() {
      vUv = uv; 
      vec3 objectNormal = vec3( normal );
      vec3 transformedNormal = normalMatrix * objectNormal;
      gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

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

    uniform sampler2D texture1;

    uniform float progress;

    float circle(in vec2 _st, in float _radius){
      vec2 dist = _st-vec2(0.5);
      return 1.-smoothstep(_radius-(_radius*0.005),
                           _radius+(_radius*0.005),
                           dot(dist,dist)*4.0);
    }

    void main() {
      // ------------------------------
      vec2 uv = vUv;

      vec4 color = texture2D(texture1, vUv);
      vec3 finalColor = vec3(color.rgb);
      
      vec3 shadowColor = vec3(0, 0, 0);
      float shadowPower = 0.4;

      uv.y = 1.0 - uv.y;
      
      vec3 circleMask = vec3(circle(uv,1.0));

      uv.y += (sin(uv.y*10.0)/10.0);

      vec3 alphaMask = circleMask * smoothstep(progress,progress+.05,(uv.x + uv.y) / 2.0);

      // ------------------------------


      gl_FragColor = vec4( mix(finalColor, shadowColor, (1.0 - getShadowMask() ) * shadowPower), alphaMask);

    }
  `,
};
