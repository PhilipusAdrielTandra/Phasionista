import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { useGLTF } from '@react-three/drei';
import * as bodyPix from '@tensorflow-models/body-pix';
import '@tensorflow/tfjs-backend-webgl';
import { BodyPixPersonSegmentation } from '@tensorflow-models/body-pix/dist/body_pix_model';
import { Keypoint } from '@tensorflow-models/body-pix/dist/types';

const BodyPixComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const modelRef = useRef<THREE.Object3D | undefined>();

  const [bodyCenter, setBodyCenter] = useState({ x: 0, y: 0 });
  const objectPosition = { x: 0, y: 0, z: -2 };

  // Store previous positions to calculate the moving average
  let previousPositionsX: any = [];
  let previousPositionsY: any = [];

  // Define the number of previous positions to consider in the moving average
  const movingAverageSize = 2;

  function calculateBodyCenter(segmentation: BodyPixPersonSegmentation): { x: number; y: number } {
    const { allPoses, height, width } = segmentation;
    const { keypoints } = allPoses[0];
  
    const rightShoulder = keypoints.find((keypoint: Keypoint) => keypoint.part === 'rightShoulder');
    const leftShoulder = keypoints.find((keypoint: Keypoint) => keypoint.part === 'leftShoulder');
  
    if (!rightShoulder || !leftShoulder) {
      return { x: 0, y: 0 };
    }
  
    // Calculate the center position between the two shoulders
    let centerX = (rightShoulder.position.x + leftShoulder.position.x) / 2;
    let centerY = (rightShoulder.position.y + leftShoulder.position.y) / 2;
  
    const videoCanvas = document.getElementById('video-canvas');
    const videoCanvasWidth = videoCanvas?.clientWidth ?? 0;
    const videoCanvasHeight = videoCanvas?.clientHeight ?? 0;
  
    const scaleX = videoCanvasWidth / width;
    const scaleY = videoCanvasHeight / height;
  
    centerX *= scaleX;
    centerY *= scaleY;
  
    // Add the new position to the previous positions
    previousPositionsX.push(centerX);
    previousPositionsY.push(centerY);
  
    // Only keep the last movingAverageSize positions
    if (previousPositionsX.length > movingAverageSize) {
      previousPositionsX.shift();
      previousPositionsY.shift();
    }
  
    // Calculate the moving average
    const averageX = previousPositionsX.reduce((a: any, b: any) => a + b, 0) / previousPositionsX.length;
    const averageY = previousPositionsY.reduce((a: any, b: any) => a + b, 0) / previousPositionsY.length;
  
    return { x: averageX, y: averageY };
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

        videoElement.onloadedmetadata = () => {
          videoElement.play();

          const drawBodySegmentation = async () => {
            const segmentation = await net.segmentPerson(videoElement);
            const coloredPartImage = bodyPix.toColoredPartMask(segmentation);
            bodyPix.drawMask(canvasElement, videoElement, coloredPartImage);

            if (segmentation.allPoses && segmentation.allPoses.length > 0 && segmentation.allPoses[0]?.keypoints) {
              const newBodyCenter = calculateBodyCenter(segmentation);
              setBodyCenter(newBodyCenter);
            }

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
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <video ref={videoRef} style={{ position: 'absolute', top: '18vh', left: '22vw', zIndex: 1, transform: 'scale(1)' }} />
      <canvas
        id="video-canvas"
        ref={canvasRef}
        style={{ position: 'absolute', top: '18vh', left: '22vw', zIndex: 0, transform: 'scale(1)' }}
      />
      <Canvas
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 6, transform: 'scale(0.9)' }}
        camera={{ position: [0, 0, 5] }}
        onCreated={({ gl }) => {
          gl.setSize(window.innerWidth, window.innerHeight);
        }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        {bodyCenter && (
          <Model
            bodyCenter={bodyCenter}
            modelRef={modelRef}
            canvasWidth={window.innerWidth}
            canvasHeight={window.innerHeight}
          />
        )}
      </Canvas>
    </div>
  );
};

interface ModelProps {
  bodyCenter: { x: number; y: number };
  modelRef: React.MutableRefObject<THREE.Object3D | undefined>;
  canvasWidth: number;
  canvasHeight: number;
}

const Model: React.FC<ModelProps> = ({ bodyCenter, modelRef, canvasWidth, canvasHeight }) => {
  const { scene } = useGLTF('http://localhost:8080/shirt.glb');

  const centerX = (bodyCenter.x / canvasWidth) * 2 - 1;
  const centerY = -(bodyCenter.y / canvasHeight) * 2 + 1;

  const [rotationAngle, setRotationAngle] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        setRotationAngle((prevAngle) => prevAngle - Math.PI / 180); // Rotate left by 1 degree
      } else if (event.key === 'ArrowRight') {
        setRotationAngle((prevAngle) => prevAngle + Math.PI / 180); // Rotate right by 1 degree
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useFrame(() => {
    if (modelRef.current) {
      // Adjust the model's y position to align with the shoulders
      modelRef.current.position.y = -centerY;
      modelRef.current.position.x = centerX;
      modelRef.current.position.z = -2;
      modelRef.current.rotation.y = rotationAngle;
    }
  });


  return <primitive object={scene} ref={modelRef} />;
};


export default BodyPixComponent;
