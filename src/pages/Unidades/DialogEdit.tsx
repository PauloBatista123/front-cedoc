import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Button,
  Stack,
  InputGroup,
  Text,
} from '@chakra-ui/react'
import { FloppyDisk } from 'phosphor-react';
import { Input } from '../../components/Form/Input';
import { Unidade } from '../../utils/interfaces';
import {useForm} from 'react-hook-form';
import * as zod from 'zod';
import { useMutationEdit } from '../../hooks/Unidade/useMutationEdit';
import { Select } from '../../components/Form/Select';

interface DialogEditTipoDocumentoProps{
  isOpen: boolean;
  onClose: () => void;
  unidade: Unidade;
}

// validação do formulario
const updateFormSchema = zod.object({
  nome: zod.string({required_error: "O campo nome não pode ser vazio."}).max(191, { message: "O campo pode conter no máxiom 191 caracteres"}).min(1, { message: "O campo pode conter no mínimo 1 caracteres"}),
  status: zod.enum(['ativo', 'inativo'], {required_error: "O campo status não pode ser vazio.", invalid_type_error: "O campo status deve ser um número."}),
});

export type updateFormData = zod.infer<typeof updateFormSchema>;

export function DialogEditUnidade({isOpen, onClose, unidade}: DialogEditTipoDocumentoProps){
  // INICIALIZAÇÃO DO FORMDATA
  const {handleSubmit, register, formState: {errors, isSubmitting}, reset} = useForm<updateFormData>({
    values: {
      nome: unidade.nome,
      status: unidade.status, 
    }
  });

  // CHAMADA DE HOOK PARA EDITAR - HOOK
  const updateTipoDocumentoMutation = useMutationEdit(unidade);


  // FUNÇÃO DISPARADA NO CLIQUE DO BOTÃO SALVAR
  const handlleEditTipoDocumento = async (data: updateFormData) => {
      await updateTipoDocumentoMutation.mutateAsync(data);
      onClose();
      reset();
  }

  // VIEW
  return (
    <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        size={"lg"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader
           borderBottom="1px solid #ece7e7a9"
          >
            Editar Unidade
          </DrawerHeader>

          <DrawerBody>
            {/* formulário de cadastro */}
            <Stack
              spacing={"4"}
            >
              <Text>Informe os dados necessários:</Text>
              <InputGroup>
                <Input
                  type='text'
                  placeholder='Descrição do tipo documental'
                  {...register('nome', {required: true})}
                  error={errors.nome}
                />
              </InputGroup>
              
                
                <Select
                  placeholder='Status'
                  {...register('status')}
                  error={errors.status}
                  options={[
                    { value: 'ativo', optionText: 'ATIVO' },
                    { value: 'inativo', optionText: 'INATIVO' },
                  ]}
                  size={"lg"}
                />
              
            </Stack>
            {/* formulário de cadastro */}
          </DrawerBody>

          <DrawerFooter>

          <Box
            display={"flex"}
            flex={"1"}
            justifyContent={"flex-end"}
          >
          <Button
              variant={'outline'}
              borderColor={"gray.200"}
              size={'lg'}
              width={"50%"}
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
             variant={'solid'}
             borderColor={"gray.200"}
             size={'lg'}
             width={"50%"}
             ml={"2"}
             bgColor={"blue.700"}
             color={"white"}
             _hover={{
              bgColor: "blue.500"
             }}
             rightIcon={
              <FloppyDisk />
             }
             onClick={handleSubmit(handlleEditTipoDocumento)}
             isLoading={isSubmitting}
             loadingText={"Enviando..."}
            >
              Salvar
            </Button>
          </Box>

          </DrawerFooter>
        </DrawerContent>
      </Drawer>
  );
}