import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { Box3, Vector3 } from "three";
import { useGLTF, PointerLockControls } from "@react-three/drei";
import CameraRig from "./CameraRig"; 

// Rama Didier
function ModelGLB() {
  const { scene } = useGLTF("/707.glb");
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
  const velocity = useRef(new Vector3());
  const direction = new Vector3();
  const move = useRef({ forward: false, backward: false, left: false, right: false });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.code === "KeyW" && !enabled) {
        setEnabled(true);
        onEnter(); // Notificar al componente padre que ya entró
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
    if (!enabled) return;

    const speed = 5;
    direction.set(0, 0, 0);

    if (move.current.forward) direction.z -= 1;
    if (move.current.backward) direction.z += 1;
    if (move.current.left) direction.x -= 1;
    if (move.current.right) direction.x += 1;

    direction.normalize().multiplyScalar(speed * delta);
    controls.current.getObject().position.add(direction);
  });

  return <PointerLockControls ref={controls} />;
}

export default function GLBViewer() {
  const [startCameraPosition] = useState([0, 1, 10]); // frente a la puerta
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
        <PointerLockControls />
        <CameraRig />
      </Suspense>
    </Canvas>
  );

}