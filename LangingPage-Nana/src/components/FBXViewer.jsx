import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { Box3, Vector3 } from "three";
import { useGLTF, PointerLockControls } from "@react-three/drei";
import CameraRig from "./CameraRig";
import AnimatedGroup from "./Animations";
import { Volume2, VolumeX } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ModelGLB({ onLoaded }) {
  const { scene } = useGLTF("/models/S707.glb");
  const group = useRef();

  useEffect(() => {
    const box = new Box3().setFromObject(scene);
    const center = new Vector3();
    box.getCenter(center);
    scene.position.sub(center);

    const size = new Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 10 / maxDim; // Escala aumentada para maximizar el modelo
    scene.scale.setScalar(scale);

    group.current.add(scene);
    onLoaded();
  }, [scene, onLoaded]);

  return <group ref={group} />;
}

function PlayerControls({ onEnter }) {
  const controls = useRef();
  const direction = new Vector3();
  const move = useRef({ forward: false, backward: false, left: false, right: false });
  const [enabled, setEnabled] = useState(false);

  // Ajuste de las dimensiones y posiciones de las paredes para evitar que el usuario vea el exterior negro
  const walls = [
    new Box3(new Vector3(-4.5, -4.5, -4.5), new Vector3(4.5, 4.5, 4.5)), // Caja principal ajustada
    new Box3(new Vector3(-4.5, -4.5, -4.5), new Vector3(-4.4, 4.5, 4.5)), // Pared izquierda ajustada
    new Box3(new Vector3(4.4, -4.5, -4.5), new Vector3(4.5, 4.5, 4.5)), // Pared derecha ajustada
    new Box3(new Vector3(-4.5, -4.5, -4.5), new Vector3(4.5, -4.4, 4.5)), // Pared inferior ajustada
    new Box3(new Vector3(-4.5, 4.4, -4.5), new Vector3(4.5, 4.5, 4.5)), // Pared superior ajustada
    new Box3(new Vector3(-4.5, -4.5, -4.5), new Vector3(4.5, 4.5, -4.4)), // Pared trasera ajustada
    new Box3(new Vector3(-4.5, -4.5, 4.4), new Vector3(4.5, 4.5, 4.5)), // Pared frontal ajustada
  ];

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.code === "KeyW" || e.code === "ArrowUp") move.current.forward = true;
      if (e.code === "KeyS" || e.code === "ArrowDown") move.current.backward = true;
      if (e.code === "KeyA" || e.code === "ArrowLeft") move.current.left = true;
      if (e.code === "KeyD" || e.code === "ArrowRight") move.current.right = true;

      if ((e.code === "KeyW" || e.code === "ArrowUp") && !enabled) {
        setEnabled(true);
        onEnter();
      }
    };

    const onKeyUp = (e) => {
      if (e.code === "KeyW" || e.code === "ArrowUp") move.current.forward = false;
      if (e.code === "KeyS" || e.code === "ArrowDown") move.current.backward = false;
      if (e.code === "KeyA" || e.code === "ArrowLeft") move.current.left = false;
      if (e.code === "KeyD" || e.code === "ArrowRight") move.current.right = false;
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, [enabled, onEnter]);

  useFrame((state, delta) => {
    if (!enabled || !controls.current) return;

    const speed = 5;
    direction.set(0, 0, 0);
    if (move.current.forward) direction.z -= 1;
    if (move.current.backward) direction.z += 1;
    if (move.current.left) direction.x -= 1;
    if (move.current.right) direction.x += 1;

    direction.normalize().multiplyScalar(speed * delta);

    const tempPosition = controls.current.getObject().position.clone().add(direction);
    const playerBox = new Box3().setFromCenterAndSize(tempPosition, new Vector3(0.5, 1.6, 0.5));

    const hasCollision = walls.some((wall) => wall.intersectsBox(playerBox));
    if (!hasCollision) {
      // Limitar la posición de la cámara dentro del modelo
      tempPosition.clamp(new Vector3(-50, -50, -50), new Vector3(50, 50, 50));
      controls.current.getObject().position.copy(tempPosition);
    } else {
      // Rebote simple: invierte la dirección al tocar una pared
      direction.multiplyScalar(-0.5);
      controls.current.getObject().position.add(direction);
    }
  });

  return <PointerLockControls ref={controls} />;
}

function LoadingScreen({ progress = 0 }) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#ffe4e1', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 2000, color: '#ff69b4', fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '2rem', background: 'linear-gradient(45deg, #ffb6c1, #ff69b4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'pulse 2s infinite' }}>
        Visualizing Nana’s World: Apartment 707 🍓
      </div>
      <div style={{ width: '60px', height: '60px', border: '3px solid rgba(255, 182, 193, 0.1)', borderTop: '3px solid #ff69b4', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '2rem' }} />
      <div style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#ff69b4' }}>Cargando modelo 3D{dots}</div>
      <div style={{ width: '300px', height: '6px', backgroundColor: 'rgba(255, 182, 193, 0.1)', borderRadius: '3px', overflow: 'hidden', marginBottom: '1rem' }}>
        <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg,rgba(255, 182, 193, 0.59), #ff69b4)', borderRadius: '3px', transition: 'width 0.3s ease', animation: 'shimmer 2s infinite' }} />
      </div>
      <div style={{ fontSize: '0.9rem', color: '#ff69b4' }}>{Math.round(progress)}%</div>
      <style jsx>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        @keyframes shimmer { 0% { box-shadow: 0 0 5px rgba(255, 182, 193, 0.3); } 50% { box-shadow: 0 0 20px rgba(255, 105, 180, 0.5); } 100% { box-shadow: 0 0 5px rgba(255, 182, 193, 0.5); } }
      `}</style>
    </div>
  );
}

function GameUI({ entered, loading }) {
  if (loading || entered) return null;

  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#ff69b4', textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0.9)', padding: '30px', borderRadius: '15px', fontSize: '18px', fontFamily: 'Arial, sans-serif', zIndex: 1000, border: '2px solid rgba(255, 105, 180, 0.3)', boxShadow: '0 0 30px rgba(255, 105, 180, 0.2)', backdropFilter: 'blur(10px)' }}>
      <h2 style={{ color: '#ff69b4', marginBottom: '20px', fontSize: '2rem' }}>🏠🍓 Visualizing Nana’s World: Apartment 707</h2>
      <div style={{ marginBottom: '20px', color: '#ff69b4' }}>Tu modelo está listo para explorar</div>
      <div style={{ marginBottom: '15px' }}><strong style={{ color: '#ff69b4' }}>W A S D</strong> - Movimiento</div>
      <div style={{ marginBottom: '15px' }}><strong style={{ color: '#ff69b4' }}>Shift</strong> - Correr | <strong style={{ color: '#ff69b4' }}> Espacio</strong> - Saltar</div>
      <div style={{ marginBottom: '15px' }}><strong style={{ color: '#ff69b4' }}>M</strong> - Activar/Desactivar sonido</div>
      <div style={{ marginBottom: '20px' }}><strong style={{ color: '#ff69b4' }}>H</strong> - Regresar al homepage</div>
      <div style={{ color: '#ff69b4', fontSize: '1.1rem', padding: '15px', backgroundColor: 'rgba(255, 182, 193, 0.1)', borderRadius: '8px', border: '1px solid rgba(255, 105, 180, 0.3)' }}>🚪 Presiona <strong>W</strong> para entrar al apartamento</div>
    </div>
  );
}

export default function GLBViewer() {
  const [startCameraPosition] = useState([0, 1, 10]);
  const [entered, setEntered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const navigate = useNavigate();
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("/bg-music.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [volume]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "KeyM") {
        if (isMuted) {
          audioRef.current.play();
        } else {
          audioRef.current.pause();
        }
        setIsMuted(!isMuted);
      }

      if (e.code === "KeyH") {
        navigate("/");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMuted, navigate]);

  const handleEnter = () => setEntered(true);
  const handleModelLoaded = () => setLoading(false);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {loading && <LoadingScreen progress={loadingProgress} />}
      <Canvas camera={{ position: startCameraPosition, fov: 75 }} style={{ background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
        <color attach="background" args={['#0a0a0a']} />
        <fog attach="fog" args={['#0a0a0a', 10, 50]} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} castShadow />
        <directionalLight position={[-5, 8, -5]} intensity={0.4} />
        <Suspense fallback={null}>
          <ModelGLB onLoaded={handleModelLoaded} />
          {!loading && (
            <>
              <AnimatedGroup distance={2}>
                <mesh position={[0, 1.5, 0]}>
                  <sphereGeometry args={[0.3, 32, 32]} />
                  <meshStandardMaterial color="orange" />
                </mesh>
              </AnimatedGroup>
              <PlayerControls onEnter={handleEnter} />
              <CameraRig />
            </>
          )}
        </Suspense>
      </Canvas>
      <GameUI entered={entered} loading={loading} />
    </div>
  );
}
