import {createBrowserRouter} from 'react-router-dom';
import { Dashboard } from '../Layout/Dashboard';
import { TipoDocumentos } from '../pages/TipoDocumentos';
import { Unidades } from '../pages/Unidades';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
    children: [
      {
        path: 'tipo-documentos',
        element: <TipoDocumentos />
      },
      {
        path: 'unidades',
        element: <Unidades />
      }
    ]
  }
])