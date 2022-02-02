import '../styles/style.css';
import * as THREE from 'three';
import { ShaderMaterial } from 'three';

// setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, innerWidth / innerHeight, 0.1, 1000
);
const canvas = document.getElementById("webgl-canvas");
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
window.addEventListener('resize', () => {
    // update camera
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    // update canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// create earth
const earthVertexShader = require('../shaders/earth.vs');
const earthFragmentShader = require('../shaders/earth.fs');
var sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50), 
    new ShaderMaterial({
        vertexShader: earthVertexShader,
        fragmentShader: earthFragmentShader,
        uniforms: {
            earthTexture: {
                value: new THREE.TextureLoader().load("images/earth.jpg")
            }
        }
    })
);

// add the objects to the scene
scene.add(sphere);
camera.position.z = 10;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    // sphere.rotation.y += 0.001;
}
animate();