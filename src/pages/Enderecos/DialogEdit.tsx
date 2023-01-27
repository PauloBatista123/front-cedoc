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
import { Endereco } from '../../utils/interfaces';
import {useForm, Controller} from 'react-hook-form';
import * as zod from 'zod';
import { useMutationEdit } from '../../hooks/Endereco/useMutationEdit';
import { validationSchemaEndereco } from '../../utils/schemas';
import { useUnidades } from '../../hooks/Unidade/useUnidades';
import Select from "react-select"

interface DialogEditEnderecoProps{
  isOpen: boolean;
  onClose: () => void;
  endereco: Endereco;
}

// validação do formulario
const updateFormSchema = validationSchemaEndereco;

export type updateFormData = zod.infer<typeof updateFormSchema>;

export function DialogEditEndereco({isOpen, onClose, endereco}: DialogEditEnderecoProps){
  // INICIALIZAÇÃO DO FORMDATA
  const {handleSubmit, register, formState: {errors, isSubmitting}, reset, control} = useForm<updateFormData>({
    values: {
      andar: endereco.andar,
      rua: endereco.rua, 
      avenida: endereco.avenida,
      unidade_id: endereco.unidade_id,
    }
  });

  const { data: dataUnidades } = useUnidades({ page: -1, filter: {} })

  // CHAMADA DE HOOK PARA EDITAR - HOOK
  const updateEnderecoMutation = useMutationEdit(endereco);

  const options = dataUnidades?.unidades.map((item) => {
    return { value: item.id, label: item.nome }
  });


  // FUNÇÃO DISPARADA NO CLIQUE DO BOTÃO SALVAR
  const handlleEditEndereco = async (data: updateFormData) => {
      await updateEnderecoMutation.mutateAsync(data);
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
            Editar Endereco
          </DrawerHeader>

          <DrawerBody>
          {/* formulário de cadastro */}
          <Stack
            spacing={"4"}
          >
            <Text>Informe os dados para realizar o cadastro:</Text>
            <Input
              type='text'
              placeholder='Identificação da Avenida'
              {...register('avenida', { required: true })}
              error={errors.avenida}
            />

            <Input
              type='text'
              placeholder='Identificação da Rua'
              {...register('rua', { required: true })}
              error={errors.rua}
            />

            <Input
              type='text'
              placeholder='Identificação do andar'
              {...register('andar', { required: true })}
              error={errors.andar}
            />

            <Controller
              name='unidade_id'
              control={control}
              render={({ field: { onChange, ref, value, name } }) => (
                <Select
                  onChange={(e) => onChange(e?.value)}
                  options={options}
                  defaultInputValue={String(endereco.unidade.nome)}
                  styles={{
                    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
                      return {
                        ...styles,
                        backgroundColor: isFocused ? '#d1d2dc' : '#eeeef2',
                        color: '#1f2029',
                        fontWeight: isFocused ? 'bold' : 'normal',
                      }
                    },
                    control: (styles, { isFocused }) => ({
                      ...styles,
                      color: '#1f2029',
                      backgroundColor: '#eeeef2',
                      borderColor: '#eeeef2',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                      paddingTop: '4px',
                      paddingBottom: '4px',
                      border: isFocused ? '2px solid #00A091' : '2px solid #eeeef2',
                      "&:hover": {
                        backgroundColor: '#d1d2dc',
                        borderColor: '#d1d2dc',
                      },
                      fontSize: '16px',
                      "&:focus": {
                        backgroundColor: '#d1d2dc',
                        borderColor: '#00A091',
                      }
                    })
                  }}
                />
              )}
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
             onClick={handleSubmit(handlleEditEndereco)}
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