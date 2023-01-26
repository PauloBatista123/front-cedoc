import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'
import { useRef } from 'react';
import { Unidade } from '../../utils/interfaces';
import { useMutationDelete } from '../../hooks/Unidade/useMutationDelete';

interface AlertDialogProps {
  mensagem: string;
  titulo: string;
  isOpen: boolean;
  onClose: () => void;
  unidades: Unidade | undefined;
}



export function AlertDialogDelete({mensagem, titulo, isOpen, unidades, onClose}: AlertDialogProps) {
  
  const cancelRef = useRef<any>();
  const DeletarTipoDocumento = useMutationDelete();
  
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
            {titulo} {unidades?.nome}
          </AlertDialogHeader>

          <AlertDialogBody>
            {mensagem}
          </AlertDialogBody>

          <AlertDialogFooter borderTop="1px solid #ece7e7a9" mt={"2"}>
            <Button onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme='red' ml={3} onClickCapture={() => {onDeletarTipoDocumento(String(unidades?.id)), onClose()}} isLoading={DeletarTipoDocumento.isLoading} loadingText={"Deletando..."}>
              Deletar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}