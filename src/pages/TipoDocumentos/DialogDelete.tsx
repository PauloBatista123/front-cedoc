import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useToast,
} from '@chakra-ui/react'
import { useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { queryClient } from '../../lib/reactQuery';
import { TipoDocumento } from '../../utils/interfaces';

interface AlertDialogProps {
  mensagem: string;
  titulo: string;
  isOpen: boolean;
  onClose: () => void;
  tipoDocumento: TipoDocumento | undefined;
}



export function AlertDialogDelete({mensagem, titulo, isOpen, tipoDocumento, onClose}: AlertDialogProps) {
  
  const toast = useToast();
  const cancelRef = useRef<any>();
  const DeletarTipoDocumento = useMutation(async (tipoId: string) => {
    const response = await api.delete(`tipo-documento/${tipoId}`);
    return response;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tipo-documentos']);
      toast({
        title: 'Sucesso!',
        description: `Tipo documental deletado com sucesso!`,
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: "top-right",
      })
    },
    onError: (err: Error) => {
      toast({
        title: 'Erro!',
        description: err.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: "top-right",
      })
    }
  })
  
  async function onDeletarTipoDocumento(tipoId: string){
    await DeletarTipoDocumento.mutateAsync(tipoId);
  }
  
  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
      motionPreset='slideInBottom'
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold' borderBottom="1px solid #ece7e7a9" mb={"4"}>
            {titulo} {tipoDocumento?.descricao}
          </AlertDialogHeader>

          <AlertDialogBody>
            {mensagem}
          </AlertDialogBody>

          <AlertDialogFooter borderTop="1px solid #ece7e7a9" mt={"2"}>
            <Button onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme='red' ml={3} onClickCapture={() => {onDeletarTipoDocumento(String(tipoDocumento?.id)), onClose()}} isLoading={DeletarTipoDocumento.isLoading} loadingText={"Deletando..."}>
              Deletar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}