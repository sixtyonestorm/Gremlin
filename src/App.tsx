import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './index.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex justify-center items-center gap-4 mt-8"> {/* Tailwind classes for layout */}
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="h-12 w-12 rounded-full" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="h-12 w-12 rounded-full" alt="React logo" />
        </a>
      </div>

      <h1 className="text-3xl text-center font-bold mt-4">Vite + React</h1>

      <div className="card bg-gray-200 p-4 rounded shadow-md flex flex-col items-center"> {/* Tailwind classes for card styling */}
        <button
          onClick={() => setCount((count) => count + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-blue-700"
        >
          Count is {count}
        </button>
        <p className="text-gray-600 mt-2">
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs text-center text-blue-500 mt-4 underline">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
