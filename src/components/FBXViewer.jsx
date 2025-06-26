import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { Box3, Vector3 } from "three";
import { useGLTF, PointerLockControls } from "@react-three/drei";
import CameraRig from "./CameraRig";
import AnimatedGroup from "./Animations"; // Tu componente con animación por proximidad

function ModelGLB() {
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
    const scale = 4 / maxDim;
    scene.scale.setScalar(scale);

    group.current.add(scene);
  }, [scene]);

  return <group ref={group} />;
}

function PlayerControls({ onEnter }) {
  const controls = useRef();
  const direction = new Vector3();
  const move = useRef({ forward: false, backward: false, left: false, right: false });
  const [enabled, setEnabled] = useState(false);

  // Áreas de colisión
  const walls = [
    new Box3(new Vector3(-5, 0, -5), new Vector3(5, 5, -4.5)),
    new Box3(new Vector3(-5, 0, 4.5), new Vector3(5, 5, 5)),
    new Box3(new Vector3(-5, 0, -5), new Vector3(-4.5, 5, 5)),
    new Box3(new Vector3(4.5, 0, -5), new Vector3(5, 5, 5)),
  ];

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.code === "KeyW" && !enabled) {
        setEnabled(true);
        onEnter();
      }
      switch (e.code) {
        case "KeyW": move.current.forward = true; break;
        case "KeyS": move.current.backward = true; break;
        case "KeyA": move.current.left = true; break;
        case "KeyD": move.current.right = true; break;
      }
    };

    const onKeyUp = (e) => {
      switch (e.code) {
        case "KeyW": move.current.forward = false; break;
        case "KeyS": move.current.backward = false; break;
        case "KeyA": move.current.left = false; break;
        case "KeyD": move.current.right = false; break;
      }
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
      controls.current.getObject().position.copy(tempPosition);
    }
  });

  return <PointerLockControls ref={controls} />;
}

export default function GLBViewer() {
  const [startCameraPosition] = useState([0, 1, 10]);
  const [entered, setEntered] = useState(false);

  const handleEnter = () => {
    setEntered(true);
  };

  return (
    <Canvas camera={{ position: startCameraPosition, fov: 40 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 13, 5]} intensity={1} />
      <Suspense fallback={null}>
        <ModelGLB />

        {/* 🎯 Ejemplo de objeto animado dentro del apartamento */}
        <AnimatedGroup distance={2}>
          <mesh position={[0, 1.5, 0]}>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial color={"orange"} />
          </mesh>
        </AnimatedGroup>

        <PlayerControls onEnter={handleEnter} />
        <CameraRig />
      </Suspense>
    </Canvas>
  );
}
