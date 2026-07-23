import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { makeBasketballTexture, makeVolleyballTexture } from './proceduralBalls';

type Props = {
  type: 'basket' | 'volley';
  position: [number, number, number];
  radius: number;
  /** Vitesse de rotation propre. */
  spin?: number;
  frozen: boolean;
};

/**
 * Un ballon 3D : sphère texturée procéduralement, en légère lévitation, qui
 * tourne sur elle-même et s'incline vers la souris.
 */
export default function Ball({ type, position, radius, spin = 0.3, frozen }: Props) {
  const ref = useRef<THREE.Mesh>(null);

  // Texture générée une seule fois par type.
  const texture = useMemo(
    () => (type === 'basket' ? makeBasketballTexture() : makeVolleyballTexture()),
    [type]
  );

  const { pointer } = useThree();

  useFrame((state, delta) => {
    const m = ref.current;
    if (!m) return;
    const t = state.clock.elapsedTime;

    if (!frozen) {
      m.rotation.y += delta * spin;
      m.rotation.x += delta * spin * 0.35;
      // Lévitation.
      m.position.y = position[1] + Math.sin(t * 0.9 + position[0]) * 0.18;
    }
    // Inclinaison vers la souris (inertie douce).
    const tiltX = -pointer.y * 0.25;
    const tiltZ = pointer.x * 0.25;
    m.rotation.z += (tiltZ - m.rotation.z) * Math.min(1, delta * 2);
    m.rotation.x += (tiltX - (m.rotation.x % (Math.PI * 2))) * 0.0; // laissé au spin
  });

  return (
    <mesh ref={ref} position={position} castShadow>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        roughness={type === 'basket' ? 0.72 : 0.5}
        metalness={0.02}
      />
    </mesh>
  );
}
