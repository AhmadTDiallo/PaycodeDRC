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
      400 / 300,
      0.1,
      1000
    );
    camera.position.set(0, 2, 5);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(400, 300);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Create POS Device
    const group = new THREE.Group();

    // Base (main body)
    const baseGeometry = new THREE.BoxGeometry(2, 0.3, 1.5);
    const baseMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x2c3e50,
      shininess: 30 
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.15;
    base.castShadow = true;
    base.receiveShadow = true;
    group.add(base);

    // Screen
    const screenGeometry = new THREE.BoxGeometry(1.6, 1, 0.1);
    const screenMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x1a1a1a 
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(0, 0.8, 0.7);
    screen.rotation.x = -0.2;
    screen.castShadow = true;
    group.add(screen);

    // Screen display (glowing effect)
    const displayGeometry = new THREE.PlaneGeometry(1.4, 0.8);
    const displayMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x3498db,
      transparent: true,
      opacity: 0.8
    });
    const display = new THREE.Mesh(displayGeometry, displayMaterial);
    display.position.set(0, 0.8, 0.76);
    display.rotation.x = -0.2;
    group.add(display);

    // Keypad
    const keypadGeometry = new THREE.BoxGeometry(1.2, 0.8, 0.05);
    const keypadMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x34495e 
    });
    const keypad = new THREE.Mesh(keypadGeometry, keypadMaterial);
    keypad.position.set(0, 0.325, 0.4);
    keypad.castShadow = true;
    group.add(keypad);

    // Individual keys
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        const keyGeometry = new THREE.BoxGeometry(0.15, 0.15, 0.02);
        const keyMaterial = new THREE.MeshPhongMaterial({ 
          color: 0x95a5a6 
        });
        const key = new THREE.Mesh(keyGeometry, keyMaterial);
        key.position.set(
          -0.3 + j * 0.3,
          0.45 - i * 0.15,
          0.43
        );
        key.castShadow = true;
        group.add(key);
      }
    }

    // Card slot
    const slotGeometry = new THREE.BoxGeometry(0.8, 0.05, 0.1);
    const slotMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x1a1a1a 
    });
    const slot = new THREE.Mesh(slotGeometry, slotMaterial);
    slot.position.set(0, 0.32, 0.75);
    group.add(slot);

    // Receipt printer
    const printerGeometry = new THREE.BoxGeometry(0.4, 0.2, 0.2);
    const printerMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x2c3e50 
    });
    const printer = new THREE.Mesh(printerGeometry, printerMaterial);
    printer.position.set(0.8, 0.4, 0);
    printer.castShadow = true;
    group.add(printer);

    // Add PayCode logo simulation (blue accent)
    const logoGeometry = new THREE.CircleGeometry(0.1, 16);
    const logoMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x3498db 
    });
    const logo = new THREE.Mesh(logoGeometry, logoMaterial);
    logo.position.set(0.6, 0.32, 0.31);
    logo.rotation.x = -Math.PI / 2;
    group.add(logo);

    // Add the group to scene
    scene.add(group);

    // Ground plane for shadows
    const groundGeometry = new THREE.PlaneGeometry(10, 10);
    const groundMaterial = new THREE.ShadowMaterial({ 
      opacity: 0.3 
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.1;
    ground.receiveShadow = true;
    scene.add(ground);

    // Animation
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      // Rotate the POS device slowly
      group.rotation.y += 0.005;
      
      // Subtle floating animation
      group.position.y = Math.sin(Date.now() * 0.001) * 0.1;
      
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
        className="rounded-lg shadow-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200"
        style={{ width: '400px', height: '300px' }}
      />
    </div>
  );
}