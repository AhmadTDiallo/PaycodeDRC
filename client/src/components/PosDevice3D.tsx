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
    camera.position.set(0, 3, 5);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(400, 300);
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

    // Main body (handheld design) - Made bigger
    const bodyGeometry = new THREE.BoxGeometry(1.8, 4.5, 0.75);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x2c3e50,
      shininess: 50 
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0;
    body.castShadow = true;
    posGroup.add(body);

    // Screen (small LCD display) - Made bigger
    const screenGeometry = new THREE.BoxGeometry(1.5, 0.9, 0.08);
    const screenMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x1a1a1a 
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(0, 1.2, 0.375);
    screen.castShadow = true;
    posGroup.add(screen);

    // Screen display (glowing blue) - Made bigger
    const displayGeometry = new THREE.PlaneGeometry(1.2, 0.6);
    const displayMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x3498db,
      transparent: true,
      opacity: 0.9
    });
    const display = new THREE.Mesh(displayGeometry, displayMaterial);
    display.position.set(0, 1.2, 0.415);
    posGroup.add(display);

    // Add simple screen elements instead of text
    const screenElementGeometry = new THREE.PlaneGeometry(0.8, 0.1);
    const screenElementMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffffff,
      transparent: true,
      opacity: 0.4
    });
    const screenElement = new THREE.Mesh(screenElementGeometry, screenElementMaterial);
    screenElement.position.set(0, 1.2, 0.416);
    posGroup.add(screenElement);

    // Keypad area - Made bigger and lighter for better key visibility
    const keypadGeometry = new THREE.BoxGeometry(1.5, 1.8, 0.08);
    const keypadMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x2c3e50 
    });
    const keypad = new THREE.Mesh(keypadGeometry, keypadMaterial);
    keypad.position.set(0, 0, 0.375);
    keypad.castShadow = true;
    posGroup.add(keypad);

    // Individual keys (4x3 layout) - Made bigger with numbers
    const keyNumbers = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['*', '0', '#']
    ];
    
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        const keyGeometry = new THREE.BoxGeometry(0.22, 0.22, 0.04);
        const keyMaterial = new THREE.MeshPhongMaterial({ 
          color: 0xecf0f1,
          shininess: 30
        });
        const key = new THREE.Mesh(keyGeometry, keyMaterial);
        key.position.set(
          -0.37 + j * 0.37,
          0.37 - i * 0.3,
          0.39
        );
        key.castShadow = true;
        posGroup.add(key);

        // Add number/symbol on key - make it very visible with better contrast
        const numberGeometry = new THREE.PlaneGeometry(0.12, 0.12);
        const numberMaterial = new THREE.MeshBasicMaterial({ 
          color: 0x2c3e50,
          transparent: false,
          opacity: 1.0
        });
        const number = new THREE.Mesh(numberGeometry, numberMaterial);
        number.position.set(
          -0.37 + j * 0.37,
          0.37 - i * 0.3,
          0.41
        );
        posGroup.add(number);
      }
    }

    // Card slot at the bottom - Made bigger
    const slotGeometry = new THREE.BoxGeometry(1.2, 0.08, 0.15);
    const slotMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x1a1a1a 
    });
    const slot = new THREE.Mesh(slotGeometry, slotMaterial);
    slot.position.set(0, -1.8, 0.375);
    posGroup.add(slot);

    // PayCode logo - Made bigger
    const logoGeometry = new THREE.CircleGeometry(0.12, 16);
    const logoMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x3498db 
    });
    const logo = new THREE.Mesh(logoGeometry, logoMaterial);
    logo.position.set(0, 0.45, 0.39);
    posGroup.add(logo);

    // Position the POS device
    posGroup.position.set(-3.5, 0, 0);
    posGroup.rotation.y = 0.3;
    scene.add(posGroup);

    // Create 3D Credit Card - Made bigger
    const cardGroup = new THREE.Group();

    // Card body - Made bigger
    const cardGeometry = new THREE.BoxGeometry(3.15, 1.95, 0.08);
    const cardMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x1e3a8a,
      shininess: 80 
    });
    const card = new THREE.Mesh(cardGeometry, cardMaterial);
    card.castShadow = true;
    cardGroup.add(card);

    // Card chip - Made bigger
    const chipGeometry = new THREE.BoxGeometry(0.45, 0.38, 0.03);
    const chipMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffd700,
      shininess: 100 
    });
    const chip = new THREE.Mesh(chipGeometry, chipMaterial);
    chip.position.set(-0.9, 0.3, 0.04);
    cardGroup.add(chip);

    // Card stripe - Made bigger
    const stripeGeometry = new THREE.BoxGeometry(3.15, 0.22, 0.001);
    const stripeMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x000000 
    });
    const stripe = new THREE.Mesh(stripeGeometry, stripeMaterial);
    stripe.position.set(0, -0.3, -0.04);
    cardGroup.add(stripe);

    // Remove the mock card number and text - keep it clean
    // Just add some subtle embossed rectangles to simulate card details
    const cardDetailGeometry = new THREE.BoxGeometry(2.8, 0.1, 0.01);
    const cardDetailMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x2563eb,
      transparent: true,
      opacity: 0.3
    });
    const cardDetail = new THREE.Mesh(cardDetailGeometry, cardDetailMaterial);
    cardDetail.position.set(0, -0.5, 0.041);
    cardGroup.add(cardDetail);

    // Position the card
    cardGroup.position.set(3.5, 0, 0);
    cardGroup.rotation.y = -0.3;
    cardGroup.rotation.z = 0.1;
    scene.add(cardGroup);

    // Animation
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      // Swing left to right instead of full rotation
      posGroup.rotation.y = 0.3 + Math.sin(Date.now() * 0.002) * 0.4;
      cardGroup.rotation.y = -0.3 + Math.sin(Date.now() * 0.0015) * 0.4;
      
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
        style={{ width: '400px', height: '300px' }}
      />
    </div>
  );
}