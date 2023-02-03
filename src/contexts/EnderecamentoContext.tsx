import { useToast } from "@chakra-ui/react";
import { AxiosError, AxiosResponse } from "axios";
import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { api } from "../lib/axios";
import { newFormData } from "../pages/Enderecamento/Form/SearchForm";
import { AxiosErrorData, Caixa, ProximoEndereco } from "../utils/interfaces";

interface EnderecamentoContextProps {
  children: ReactNode;
}
export interface CaixasResponseProps {
    data: Caixa[],
    current_page: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
}

type EnderecamentoContext = {
  caixas ?: CaixasResponseProps,
  proximoEndereco: ProximoEndereco | undefined,
  buscarEnderecos: (data: newFormData) => void,
  salvarEnderecamento: () => void,
  onPageChange: (page: number) => void
}

export interface SalvarEnderecamentoProps {
  numero: string, espaco_ocupado: string
}

export const EnderecamentoContext = createContext({} as EnderecamentoContext);

export function EnderecamentoProvider({ children }: EnderecamentoContextProps) {
  const [page, setPage] = useState<number>(1);
  const [caixas, setCaixas] = useState<CaixasResponseProps>();
  const [proximoEndereco, setProximoEndereco] = useState<ProximoEndereco | undefined>(undefined);
  const toast = useToast();

  const buscarEnderecos = async (data: newFormData) => {
    const response = await api.get('documento/espaco-disponivel', {
        params: {
          ...data,
          page,
        }
    }).then(response => {
        setCaixas(response.data.caixas);
        setProximoEndereco({
          caixa_id: response.data.proximo_endereco.caixa_id,
          predio_id: response.data.proximo_endereco.predio_id,
          andar_id: response.data.proximo_endereco.andar_id,
          ultima_caixa: response.data.ultima_caixa,
          espaco_disponivel_predio: response.data.predio.espaco_disponivel_total,
          total_documentos_predio: response.data.predio.total_documentos,
          total_caixas_predio: response.data.predio.total_caixas,
          espaco_ocupado_documento: data.espaco_ocupado,
          numero_documento: response.data.documento.documento,
        });
    }).catch((error: AxiosErrorData) => {
      toast({title: 'Erro ao processar!', description: `${error.response.data.detalhes}`, status: 'info', duration: 5000, isClosable: true, position: "top-right"});
    })
  };

  const onPageChange = (pageNumber: number) => {
    buscarEnderecos({
      numero: String(proximoEndereco?.numero_documento), 
      espaco_ocupado: String(proximoEndereco?.espaco_ocupado_documento)
    });
    setPage(pageNumber);
  }

  const salvarEnderecamento = useCallback(async () => {
    const response = await api.post('documento/enderecar', {
      numero: proximoEndereco?.numero_documento, 
      espaco_ocupado: proximoEndereco?.espaco_ocupado_documento, 
      numero_caixa: proximoEndereco?.caixa_id, 
      predio_id: proximoEndereco?.predio_id, 
      andar_id: proximoEndereco?.andar_id
    }).then((response: AxiosResponse) => {
      toast({title: 'Endereço enviado!', description: `${response.data.msg}`, status: 'success', duration: 5000, isClosable: true, position: "top-right"});
    }).catch((error: AxiosErrorData) => {
      toast({title: 'Erro ao processar!', description: `${error.response.data.detalhes}`, status: 'info', duration: 5000, isClosable: true, position: "top-right"});
    });
  }, [proximoEndereco?.caixa_id, proximoEndereco?.predio_id, proximoEndereco?.andar_id, proximoEndereco?.numero_documento, proximoEndereco?.espaco_ocupado_documento]);

  return (
    <EnderecamentoContext.Provider value={{ caixas, proximoEndereco, buscarEnderecos, salvarEnderecamento, onPageChange }}>
      {children}
    </EnderecamentoContext.Provider>
  )
}

export const useEnderecamento = () => useContext(EnderecamentoContext);