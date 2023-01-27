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
import { Endereco } from '../../utils/interfaces';
import { useMutationDelete } from '../../hooks/Endereco/useMutationDelete';

interface AlertDialogProps {
  mensagem: string;
  titulo: string;
  isOpen: boolean;
  onClose: () => void;
  endereco: Endereco | undefined;
}



export function AlertDialogDelete({mensagem, titulo, isOpen, endereco, onClose}: AlertDialogProps) {
  
  const cancelRef = useRef<any>();
  const DeletarEndereco = useMutationDelete();
  
  async function onDeletarEndereco(enderecoId: string){
    await DeletarEndereco.mutateAsync(enderecoId);
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
            {titulo} {endereco?.id}
          </AlertDialogHeader>

          <AlertDialogBody>
            {mensagem}
          </AlertDialogBody>

          <AlertDialogFooter borderTop="1px solid #ece7e7a9" mt={"2"}>
            <Button onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme='red' ml={3} onClickCapture={() => {onDeletarEndereco(String(endereco?.id)), onClose()}} isLoading={DeletarEndereco.isLoading} loadingText={"Deletando..."}>
              Deletar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}