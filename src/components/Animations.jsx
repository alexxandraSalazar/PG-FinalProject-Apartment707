import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

/**
 * AnimatedGroup: Se anima solo si el jugador se acerca
 * @param {ReactNode} children - Elementos a animar
 * @param {number} distance - Distancia mínima para activar animación
 */
export default function AnimatedGroup({ children, distance = 2 }) {
  const groupRef = useRef();
  const { camera, scene } = useThree();
  const [isNear, setIsNear] = useState(false);
  const [targetScale] = useState(new THREE.Vector3(1, 1, 1));

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Distancia del jugador a este grupo
    const playerPos = new THREE.Vector3().copy(camera.position);
    const objectPos = new THREE.Vector3().setFromMatrixPosition(groupRef.current.matrixWorld);
    const dist = playerPos.distanceTo(objectPos);
    const near = dist < distance;

    // Evita renders innecesarios
    if (near !== isNear) setIsNear(near);

    if (!near) {
      groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      return;
    }

    // Animaciones activadas por cercanía

    // Rotación
    groupRef.current.rotation.y += 0.5 * delta;

    // Flotación
    const time = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(time * 3) * 0.15 + 1.5;

    // Pulso (scale animado)
    const scaleFactor = 1 + 0.05 * Math.sin(time * 5);
    targetScale.set(scaleFactor, scaleFactor, scaleFactor);
    groupRef.current.scale.lerp(targetScale, 0.2);

    // Cambiar color a todos los MeshStandardMaterial cuando esté cerca
    groupRef.current.traverse((child) => {
      if (child.isMesh && child.material && child.material.color) {
        child.material.color.lerp(new THREE.Color("#fca311"), 0.1);
      }
    });
  });

  return <group ref={groupRef}>{children}</group>;
}