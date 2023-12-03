import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Calculator from './Page/Calculator';
import Support from './Page/Support';

function App() {

  const router = createBrowserRouter([
    {
      path:"/",
      element:<Calculator/>
    },
    {
      path:"/support",
      element:<Support/>
    }
  ])

  return (
    <RouterProvider router={router}/>
  );
}

export default App;