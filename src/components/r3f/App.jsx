import { Canvas } from '@react-three/fiber';
import { SceneContainer } from './SceneContainer';

function App() {
  return <Canvas className='h-full'>
    <SceneContainer />
  </Canvas>;
}

export default App;