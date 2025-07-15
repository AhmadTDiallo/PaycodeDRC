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
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());

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

    // Create 3D Credit Card - Appropriately sized and centered
    const cardGroup = new THREE.Group();

    // Card body - More reasonable size
    const cardGeometry = new THREE.BoxGeometry(4.2, 2.6, 0.12);
    const cardMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x1e3a8a,
      shininess: 80 
    });
    const card = new THREE.Mesh(cardGeometry, cardMaterial);
    card.castShadow = true;
    cardGroup.add(card);

    // Card chip
    const chipGeometry = new THREE.BoxGeometry(0.6, 0.5, 0.04);
    const chipMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffd700,
      shininess: 100 
    });
    const chip = new THREE.Mesh(chipGeometry, chipMaterial);
    chip.position.set(-1.2, 0.4, 0.06);
    cardGroup.add(chip);

    // Card stripe
    const stripeGeometry = new THREE.BoxGeometry(4.2, 0.3, 0.001);
    const stripeMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x000000 
    });
    const stripe = new THREE.Mesh(stripeGeometry, stripeMaterial);
    stripe.position.set(0, -0.4, -0.06);
    cardGroup.add(stripe);

    // Card details
    const cardDetailGeometry = new THREE.BoxGeometry(3.8, 0.15, 0.015);
    const cardDetailMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x2563eb,
      transparent: true,
      opacity: 0.3
    });
    const cardDetail = new THREE.Mesh(cardDetailGeometry, cardDetailMaterial);
    cardDetail.position.set(0, -0.7, 0.061);
    cardGroup.add(cardDetail);

    // Add PAYCODE DRC text on the card
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 128;
    
    if (context) {
      context.fillStyle = 'rgba(0, 0, 0, 0)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      context.font = 'bold 48px Arial';
      context.fillStyle = 'white';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText('PAYCODE DRC', canvas.width / 2, canvas.height / 2);
    }
    
    const textTexture = new THREE.CanvasTexture(canvas);
    const textMaterial = new THREE.MeshBasicMaterial({ 
      map: textTexture,
      transparent: true
    });
    const textGeometry = new THREE.PlaneGeometry(2.5, 0.6);
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(0, 0.1, 0.061);
    cardGroup.add(textMesh);

    // Add PayCode logo on the card
    const logoGeometry = new THREE.CircleGeometry(0.2, 16);
    const logoMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x3498db 
    });
    const logo = new THREE.Mesh(logoGeometry, logoMaterial);
    logo.position.set(1.5, 0.5, 0.061);
    cardGroup.add(logo);

    // Position the card in center
    cardGroup.position.set(0, 0, 0);
    cardGroup.rotation.y = 0;
    cardGroup.rotation.z = 0.05;
    cardGroup.userData = { type: 'card', isClicked: false };
    scene.add(cardGroup);

    // Mouse interaction - only for card now
    const onMouseClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects([cardGroup], true);

      if (intersects.length > 0) {
        cardGroup.userData.isClicked = !cardGroup.userData.isClicked;
        console.log('Credit Card clicked!');
      }
    };

    // Add mouse event listener
    renderer.domElement.addEventListener('click', onMouseClick);
    renderer.domElement.style.cursor = 'pointer';

    // Animation - only for card now
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      // Gentle rotation for the centered card
      const baseRotationCard = Math.sin(Date.now() * 0.0015) * 0.2;
      
      // Add interactive rotation if clicked
      cardGroup.rotation.y = baseRotationCard + (cardGroup.userData.isClicked ? Math.sin(Date.now() * 0.01) * 0.15 : 0);
      
      // Subtle floating animation with interactive bounce
      const baseFloatCard = Math.sin(Date.now() * 0.001) * 0.15;
      
      cardGroup.position.y = baseFloatCard + (cardGroup.userData.isClicked ? Math.sin(Date.now() * 0.005) * 0.1 : 0);
      
      // Card gentle rotation with interactive effect
      cardGroup.rotation.z = 0.05 + Math.sin(Date.now() * 0.0005) * 0.03 + (cardGroup.userData.isClicked ? Math.sin(Date.now() * 0.008) * 0.05 : 0);
      
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (renderer.domElement) {
        renderer.domElement.removeEventListener('click', onMouseClick);
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