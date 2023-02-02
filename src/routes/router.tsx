import {createBrowserRouter} from 'react-router-dom';
import { EnderecamentoContext, EnderecamentoProvider } from '../contexts/EnderecamentoContext';
import { NavBarContextProvider } from '../contexts/NavBarContext';
import { Dashboard } from '../Layout/Dashboard';
import { Documentos } from '../pages/Documentos';
import { Enderecamento } from '../pages/Enderecamento';
import { Enderecos } from '../pages/Enderecos';
import { TipoDocumentos } from '../pages/TipoDocumentos';
import { Unidades } from '../pages/Unidades';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <NavBarContextProvider><Dashboard /></NavBarContextProvider>,
    children: [
      {
        path: 'tipo-documentos',
        element: <TipoDocumentos />
      },
      {
        path: 'unidades',
        element: <Unidades />
      },
      {
        path: 'documentos',
        element: <Documentos />
      },
      {
        path: 'enderecamento',
        element: <EnderecamentoProvider><Enderecamento /></EnderecamentoProvider>
      },
    ]
  }
])