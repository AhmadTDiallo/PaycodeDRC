import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface PosDevice3DProps {
  className?: string;
}

export default function PosDevice3D({ className = '' }: PosDevice3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      500 / 400,
      0.1,
      1000
    );
    camera.position.set(0, 3, 8);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(500, 400);
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Create handheld POS device
    const posGroup = new THREE.Group();

    // Main body (handheld design)
    const bodyGeometry = new THREE.BoxGeometry(1.2, 3, 0.5);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x2c3e50,
      shininess: 50 
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0;
    body.castShadow = true;
    posGroup.add(body);

    // Screen (small LCD display)
    const screenGeometry = new THREE.BoxGeometry(1, 0.6, 0.05);
    const screenMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x1a1a1a 
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(0, 0.8, 0.25);
    screen.castShadow = true;
    posGroup.add(screen);

    // Screen display (glowing blue)
    const displayGeometry = new THREE.PlaneGeometry(0.8, 0.4);
    const displayMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x3498db,
      transparent: true,
      opacity: 0.9
    });
    const display = new THREE.Mesh(displayGeometry, displayMaterial);
    display.position.set(0, 0.8, 0.276);
    posGroup.add(display);

    // Keypad area
    const keypadGeometry = new THREE.BoxGeometry(1, 1.2, 0.05);
    const keypadMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x34495e 
    });
    const keypad = new THREE.Mesh(keypadGeometry, keypadMaterial);
    keypad.position.set(0, 0, 0.25);
    keypad.castShadow = true;
    posGroup.add(keypad);

    // Individual keys (4x3 layout)
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        const keyGeometry = new THREE.BoxGeometry(0.15, 0.15, 0.02);
        const keyMaterial = new THREE.MeshPhongMaterial({ 
          color: 0x95a5a6 
        });
        const key = new THREE.Mesh(keyGeometry, keyMaterial);
        key.position.set(
          -0.25 + j * 0.25,
          0.25 - i * 0.2,
          0.26
        );
        key.castShadow = true;
        posGroup.add(key);
      }
    }

    // Card slot at the bottom
    const slotGeometry = new THREE.BoxGeometry(0.8, 0.05, 0.1);
    const slotMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x1a1a1a 
    });
    const slot = new THREE.Mesh(slotGeometry, slotMaterial);
    slot.position.set(0, -1.2, 0.25);
    posGroup.add(slot);

    // PayCode logo
    const logoGeometry = new THREE.CircleGeometry(0.08, 16);
    const logoMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x3498db 
    });
    const logo = new THREE.Mesh(logoGeometry, logoMaterial);
    logo.position.set(0, 0.3, 0.26);
    posGroup.add(logo);

    // Position the POS device
    posGroup.position.set(-2, 0, 0);
    posGroup.rotation.y = 0.3;
    scene.add(posGroup);

    // Create 3D Credit Card
    const cardGroup = new THREE.Group();

    // Card body
    const cardGeometry = new THREE.BoxGeometry(2.1, 1.3, 0.05);
    const cardMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x1e3a8a,
      shininess: 80 
    });
    const card = new THREE.Mesh(cardGeometry, cardMaterial);
    card.castShadow = true;
    cardGroup.add(card);

    // Card chip
    const chipGeometry = new THREE.BoxGeometry(0.3, 0.25, 0.02);
    const chipMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffd700,
      shininess: 100 
    });
    const chip = new THREE.Mesh(chipGeometry, chipMaterial);
    chip.position.set(-0.6, 0.2, 0.026);
    cardGroup.add(chip);

    // Card stripe
    const stripeGeometry = new THREE.BoxGeometry(2.1, 0.15, 0.001);
    const stripeMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x000000 
    });
    const stripe = new THREE.Mesh(stripeGeometry, stripeMaterial);
    stripe.position.set(0, -0.2, -0.026);
    cardGroup.add(stripe);

    // Card number simulation (white rectangles)
    for (let i = 0; i < 4; i++) {
      const numberGeometry = new THREE.BoxGeometry(0.3, 0.08, 0.001);
      const numberMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffffff,
        transparent: true,
        opacity: 0.8
      });
      const number = new THREE.Mesh(numberGeometry, numberMaterial);
      number.position.set(-0.7 + i * 0.5, -0.4, 0.026);
      cardGroup.add(number);
    }

    // Position the card
    cardGroup.position.set(2, 0, 0);
    cardGroup.rotation.y = -0.3;
    cardGroup.rotation.z = 0.1;
    scene.add(cardGroup);

    // Animation
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      // Rotate both objects slowly
      posGroup.rotation.y += 0.003;
      cardGroup.rotation.y += 0.002;
      
      // Subtle floating animation
      posGroup.position.y = Math.sin(Date.now() * 0.001) * 0.2;
      cardGroup.position.y = Math.sin(Date.now() * 0.001 + Math.PI) * 0.15;
      
      // Card gentle rotation
      cardGroup.rotation.z = 0.1 + Math.sin(Date.now() * 0.0005) * 0.05;
      
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div 
        ref={mountRef} 
        className="rounded-lg overflow-hidden"
        style={{ width: '500px', height: '400px' }}
      />
    </div>
  );
}