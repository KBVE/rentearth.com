import { Float, Text3D } from "@react-three/drei";
import { useEffect, useRef } from "react";
import {useStore} from "@nanostores/react";
import { kbve$ } from "@c/appwrite/storage";



export function Words() {

  const $username = useStore(kbve$);

  return (
    <>
      <Float position={[3.75, 5.65, 0.75]} rotation={[0, -0.2, -0.05]} rotationIntensity={0.35} floatIntensity={0.5}>
        <Text3D
          font={"/r3f/fonts/Roboto_Regular.json"}
          size={0.275}
          height={0.065}
          curveSegments={12}
        >
          Rent Earth
          <meshStandardMaterial color={ 0x00FFFF }  />
        </Text3D>
      </Float>

      <Float position={[3.5, 6, 0]} rotation={[0, -0.35, -0.05]} rotationIntensity={0.35} floatIntensity={0.5}>
        <Text3D
          font={"/r3f/fonts/Roboto_Regular.json"}
          size={0.575}
          height={0.065}
          curveSegments={12}
        >
          Enter the Atlas
          <meshStandardMaterial color={[1, 0.15, 0.1]} emissive={[1, 0.1, 0]} />
        </Text3D>
      </Float>


      <Float position={[-2, 6, 5]} rotation={[0, -0.35, -0.05]} rotationIntensity={0.35} floatIntensity={0.5}>
        <Text3D
          font={"/r3f/fonts/Roboto_Regular.json"}
          size={0.575}
          height={0.065}
          curveSegments={12}
        >
          {$username.username || 'Guest'}
          <meshStandardMaterial color={  0x00FFFF } emissive={[0.1, 0.1, 0]} />
        </Text3D>
      </Float>


    </>
  );
}