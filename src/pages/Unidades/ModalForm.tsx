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
import { useForm } from 'react-hook-form';
import * as zod from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { Input } from '../../components/Form/Input';
import { useMutationAdd } from '../../hooks/Unidade/useMutationAdd';


interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
}


// validação do formulario
const newFormSchema = zod.object({
  nome: zod.string({required_error: "O campo nome não pode ser vazio."}).max(191, { message: "O campo pode conter no máxiom 191 caracteres"}).min(1, { message: "O campo pode conter no mínimo 1 caracteres"}),
});

export type newFormData = zod.infer<typeof newFormSchema>;


export function ModalForm({isOpen, onClose}: ModalFormProps) {

  const {register, formState: {errors, isSubmitting}, handleSubmit, reset} = useForm<newFormData>({
    resolver: zodResolver(newFormSchema),
    defaultValues: { nome: undefined },
  });

  const createUnidade = useMutationAdd();

  const handlleCreateNewTipo = async (data: newFormData) => {
    await createUnidade.mutateAsync(data);
    reset();
    onClose();
  }
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
            Criar nova unidade
          </DrawerHeader>

          <DrawerBody>
            {/* formulário de cadastro */}
            <Stack
              spacing={"4"}
            >
              <Text>Informe os dados para realizar o cadastro:</Text>
              <InputGroup>
                <Input
                  type='text'
                  placeholder='Nome da unidade'
                  {...register('nome', {required: true})}
                  error={errors.nome}
                />
              </InputGroup>           
              
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
             onClick={handleSubmit(handlleCreateNewTipo)}
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