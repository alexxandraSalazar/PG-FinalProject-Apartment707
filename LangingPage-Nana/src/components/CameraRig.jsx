import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { Vector3, Raycaster, Euler } from "three";

export default function CameraRig() {
  const { camera } = useThree();
  const raycaster = useRef(new Raycaster());
  const direction = useRef(new Vector3());
  
  const [moveForward, setMoveForward] = useState(false);
  const [moveBackward, setMoveBackward] = useState(false);
  const [moveLeft, setMoveLeft] = useState(false);
  const [moveRight, setMoveRight] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  /*Se configuran parámetros como velocidad al caminar/correr,
   altura de los ojos (posición Y de la cámara), aqui esta integrado lo de las colisiones, 
   falta poder usarlo */
  const walkSpeed = 2.5;
  const runSpeed = 5.0;
  const eyeHeight = 1.7;
  const headBobSpeed = 8;
  const headBobHeight = 0.05;
  const collisionDistance = 0.5;

  // Inicia la posición de la cámara
  useEffect(() => {
    camera.position.set(0, eyeHeight, 5); // alejamos un poco para ver el modelo
    const handleKeyDown = (e) => {
      switch (e.code) {
        case 'KeyW': setMoveForward(true); break;
        case 'KeyS': setMoveBackward(true); break;
        case 'KeyA': setMoveLeft(true); break;
        case 'KeyD': setMoveRight(true); break;
        case 'ShiftLeft': setIsRunning(true); break;
      }
    };

    /*Se definen estados para saber si el jugador está presionando 
    las teclas de movimiento (W, A, S, D) */
    const handleKeyUp = (e) => {
      switch (e.code) {
        case 'KeyW': setMoveForward(false); break;
        case 'KeyS': setMoveBackward(false); break;
        case 'KeyA': setMoveLeft(false); break;
        case 'KeyD': setMoveRight(false); break;
        case 'ShiftLeft': setIsRunning(false); break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [camera]);

  useFrame((state, delta) => {
    const currentSpeed = (isRunning ? runSpeed : walkSpeed) * delta;
    const moveDirection = new Vector3();

    if (moveForward) moveDirection.z -= 1;
    if (moveBackward) moveDirection.z += 1;
    if (moveLeft) moveDirection.x -= 1;
    if (moveRight) moveDirection.x += 1;

    if (moveDirection.length() > 0) {
      moveDirection.normalize();
      moveDirection.applyEuler(new Euler(0, camera.rotation.y, 0));
      direction.current.copy(moveDirection).normalize();
      raycaster.current.set(camera.position, direction.current);

      const moveVector = moveDirection.multiplyScalar(currentSpeed);
      camera.position.x += moveVector.x;
      camera.position.z += moveVector.z;

      const bobbing = Math.sin(state.clock.elapsedTime * headBobSpeed) * 
                      (isRunning ? headBobHeight * 1.5 : headBobHeight);
      camera.position.y = eyeHeight + bobbing;
    }
  });

  return null;
}
