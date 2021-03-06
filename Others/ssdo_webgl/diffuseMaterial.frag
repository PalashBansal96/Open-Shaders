#ifdef GL_ES
precision highp float;
#endif

// Lights properties
uniform vec3 lightsPos[2];
uniform vec4 lightsColor[2];
uniform float lightsIntensity[2];

// Material properties
uniform float matDiffuse;
uniform vec4 matDiffuseColor;
uniform sampler2D diffMap;
uniform int isTextured;

// 3D point properties
varying vec4 worldPos;
varying vec3 worldNormal;
varying vec2 vUv;

void main() {
	gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
	
	vec3 p = vec3(worldPos);
	vec3 n = normalize(worldNormal);
	
	// for each light
	for (int i = 0 ; i < 2 ; i++) {
		vec3 l = normalize(lightsPos[i] - p);
		float diffuse = max(dot(l, n), 0.0);
		
		vec4 matDiff = matDiffuse * matDiffuseColor;
		if (isTextured == 1)
			matDiff *= texture2D(diffMap, vUv);
	
		gl_FragColor += diffuse * matDiff * lightsColor[i] * lightsIntensity[i];
	}
}
