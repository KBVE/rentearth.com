import { useLoader } from '@react-three/fiber';
import { useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function Atlas() {

    // Thanks to Wabbaboy from SketchFab https://sketchfab.com/3d-models/atlas-holding-the-earth-32002a1de62b4b3face6dd55043b6cf6#download
  const gltf = useLoader(GLTFLoader, "/r3f/models/atlas_holding_the_earth.glb");

  useEffect(() => {
    if(!gltf) return;

    let mesh = gltf.scene.children[0];
    mesh.scale.set(0.11,0.11,0.11);
    mesh.position.set(0,-15,-0.65);
    console.log(mesh);

  }, [gltf]);

  
  return (
    <primitive object={gltf.scene} />
  )
}