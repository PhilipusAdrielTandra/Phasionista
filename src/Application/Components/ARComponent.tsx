import React, { useEffect, useRef } from 'react';
import * as bodyPix from '@tensorflow-models/body-pix';
import { BodyPixPersonSegmentation } from '@tensorflow-models/body-pix/dist/body_pix_model';
import { Keypoint } from '@tensorflow-models/body-pix/dist/types';
import '@tensorflow/tfjs';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const BodyPixComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const objectRef = useRef<THREE.Object3D>(null);
  const objectPosition = new THREE.Vector3(0, 0, -2); 
  const objectRotation = new THREE.Euler(0, 0, 0); 


  function calculateBodyCenter(segmentation: BodyPixPersonSegmentation): { x: number, y: number } {
    const { allPoses, height, width } = segmentation;
    const { keypoints } = allPoses[0];
  
    let centerX = 0;
    let centerY = 0;
  
    keypoints.forEach((keypoint: Keypoint) => {
      centerX += keypoint.position.x;
      centerY += keypoint.position.y;
    });
  
    centerX /= keypoints.length;
    centerY /= keypoints.length;
  
    const videoCanvas = document.getElementById('video-canvas');
    const videoCanvasWidth = videoCanvas?.clientWidth ?? 0;
    const videoCanvasHeight = videoCanvas?.clientHeight ?? 0;
  
    const scaleX = videoCanvasWidth / width;
    const scaleY = videoCanvasHeight / height;
  
    centerX *= scaleX;
    centerY *= scaleY;

    return { x: centerX, y: centerY };
  }

  useEffect(() => {
    const loadBodyPixAndStartVideo = async () => {
      try {
        const net = await bodyPix.load();
        const videoElement = videoRef.current;
        const canvasElement = canvasRef.current;

        if (!videoElement || !canvasElement) return;

        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoElement.srcObject = stream;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, 5); 
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth * 0.5, window.innerHeight * 0.5);
        renderer.setClearColor(0x000000, 0);
        document.body.appendChild(renderer.domElement);

        // Load a 3D object
        const loader = new GLTFLoader();
          let obj: THREE.Object3D;
          loader.load('http://localhost:8080/adamHead.gltf', (gltf) => {
            obj = gltf.scene;
            obj.scale.set(1, 1, 1); 
            scene.add(obj);
            obj.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                child.renderOrder = 2; 
              }
            });
          });

        videoElement.onloadedmetadata = () => {
          videoElement.play();
        
          const drawBodySegmentation = async () => {
            const segmentation = await net.segmentPerson(videoElement);
            const coloredPartImage = bodyPix.toColoredPartMask(segmentation);
            bodyPix.drawMask(canvasElement, videoElement, coloredPartImage);
        
            // console.log('Segmentation:', segmentation);
            // console.log('Keypoints:', segmentation.allPoses[0]?.keypoints);
        
            if (obj && segmentation.allPoses && segmentation.allPoses.length > 0 && segmentation.allPoses[0]?.keypoints) {
              const bodyCenter = calculateBodyCenter(segmentation);
              console.log(bodyCenter)
              obj.position.set(-2, 1, objectPosition.z); 
              obj.rotation.copy(objectRotation); 
              obj.renderOrder = 30;
              const leftShoulder = segmentation.allPoses[0].keypoints.find((k: Keypoint) => k.part === 'leftShoulder');
              const rightShoulder = segmentation.allPoses[0].keypoints.find((k: Keypoint) => k.part === 'rightShoulder');
              if (leftShoulder && rightShoulder) {
                const deltaX = rightShoulder.position.x - leftShoulder.position.x;
                const deltaY = rightShoulder.position.y - leftShoulder.position.y;
                objectRotation.z = Math.atan2(deltaY, deltaX) + Math.PI / 2; // Adjust the object rotation based on the body orientation
                obj.rotation.copy(objectRotation);
              }
            }
        
            renderer.render(scene, camera);
        
            requestAnimationFrame(drawBodySegmentation);
          };
        
          requestAnimationFrame(drawBodySegmentation);
        };
        
      } catch (err) {
        console.error('Error loading BodyPix or starting video:', err);
      }
    };

    loadBodyPixAndStartVideo();
  }, []);

  return (
    <div style={{ position: 'relative' }}>
    <video ref={videoRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, transform: 'scale(1)' }} />
    <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 2, transform: 'scale(1)' }} />
  </div>
  );
};

export default BodyPixComponent;
