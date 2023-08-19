import { Canvas } from "@react-three/fiber";
import { SceneContainer } from "./SceneContainer";
import { R3FSkeleton } from "./R3FSkeleton";
export const App = () => {
  return (
    <>
      <Canvas className="h-full">
        <SceneContainer />
      </Canvas>
      
    </>
  );
};

export default App;
