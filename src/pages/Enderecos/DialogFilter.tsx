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
  FormControl,
} from '@chakra-ui/react'
import { ArrowCircleRight } from 'phosphor-react'
import { useForm, useFormContext, Controller } from 'react-hook-form';
import { Input } from '../../components/Form/Input';
import Select from "react-select"
import { useUnidades } from '../../hooks/Unidade/useUnidades';
import { Select as SelectForm } from "../../components/Form/Select";
import { useEffect } from 'react';


interface DialogFilterProps {
  isOpen: boolean,
  onClose: () => void,
}

export function DialogFilter({ isOpen, onClose }: DialogFilterProps) {

  const { setValue, getValues: getValuesContext, formState: { isSubmitting } } = useFormContext();
  const { register, getValues: getValueForm, control } = useForm();

  const handlleFilter = () => {
    setValue('actionFilter', getValueForm('filtro'));
    onClose();
  }

  const { data: dataUnidades } = useUnidades({ page: -1, filter: {} })

  const options = dataUnidades?.unidades.map((item) => {
    return { value: item.id, label: item.nome }
  });

  const optionsOrder = [
    { value: 'avenida', optionText: 'ID' },
    { value: 'id', optionText: 'AVENIDA' },
    { value: 'rua', optionText: 'RUA' },
    { value: 'andar', optionText: 'ANDAR' },
    { value: 'unidade_id', optionText: 'UNIDADE' },
    { value: 'created_at', optionText: 'DATA DE CRIAÇÃO' }
  ]

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
          Filtrar Endereços
        </DrawerHeader>

        <DrawerBody>
          {/* formulário de cadastro */}
          <Stack
            spacing={"4"}
          >
            <Text>Informe os dados do filtro:</Text>

            <Input
              type='text'
              placeholder='Identificação da Avenida'
              {...register('filtro.avenida', { required: true })}
            />

            <Input
              type='text'
              placeholder='Identificação da Rua'
              {...register('filtro.rua', { required: true })}
            />

            <Input
              type='text'
              placeholder='Identificação do andar'
              {...register('filtro.andar', { required: true })}
            />

            <Controller
              name='filtro.unidade_id'
              control={control}
              render={({ field: { onChange, ref, value, name } }) => (
                <Select
                  onChange={(e) => onChange(e?.value)}
                  options={options}
                  placeholder="Selecione unidade"
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

            <FormControl>
              <SelectForm placeholder='Ordenar por:' {...register('filtro.ordem')} options={optionsOrder} />
            </FormControl>

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
                <ArrowCircleRight />
              }
              onClick={() => handlleFilter()}
              isLoading={isSubmitting}
              loadingText={"Enviando..."}
            >
              Filtrar
            </Button>
          </Box>

        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}