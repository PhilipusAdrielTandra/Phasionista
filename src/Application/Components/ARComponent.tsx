import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
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

  function calculateBodyCenter(segmentation: BodyPixPersonSegmentation): { x: number; y: number } {
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
      <video ref={videoRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, transform: 'scale(1)' }} />
      <canvas id="video-canvas" ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 4, transform: 'scale(1)' }} />
      <Canvas
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 2, transform: 'scale(1)' }}
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
  const gltf = useLoader(GLTFLoader, 'http://localhost:8080/adamHead.gltf');

  const centerX = (bodyCenter.x / canvasWidth) * 2 - 1;
  const centerY = -(bodyCenter.y / canvasHeight) * 2 + 1;

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.position.x = centerX;
      modelRef.current.position.y = centerY;
      modelRef.current.position.z = -2;
    }
  });

  return <primitive object={gltf.scene} ref={modelRef} />;
};

export default BodyPixComponent;
