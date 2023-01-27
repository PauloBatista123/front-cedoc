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
  Text,
} from '@chakra-ui/react'
import { FloppyDisk } from 'phosphor-react';
import { useForm, Controller } from 'react-hook-form';
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../../components/Form/Input';
import { useMutationAdd } from '../../hooks/Endereco/useMutationAdd';
import { useUnidades } from '../../hooks/Unidade/useUnidades';
import Select from 'react-select'
import { validationSchemaEndereco } from '../../utils/schemas';

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
}


// validação do formulario
const newFormSchema = validationSchemaEndereco;

export type newFormData = zod.infer<typeof newFormSchema>;


export function ModalForm({ isOpen, onClose }: ModalFormProps) {

  const { register, formState: { errors, isSubmitting }, handleSubmit, reset, control, getValues } = useForm<newFormData>({
    resolver: zodResolver(newFormSchema),
    defaultValues: { avenida: undefined, rua: undefined, andar: undefined, unidade_id: undefined },
  });

  const createEndereco = useMutationAdd();
  const { data: dataUnidades } = useUnidades({ page: -1, filter: {} })

  const handlleCreateNewEndereco = async (inputs: newFormData) => {
    await createEndereco.mutateAsync(inputs);
    reset();
    onClose();
  }

  const options = dataUnidades?.unidades.map((item) => {
    return { value: item.id, label: item.nome }
  });

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
          Criar novo endereço
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
              onClick={handleSubmit(handlleCreateNewEndereco)}
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