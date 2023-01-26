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
  useToast,
  InputLeftElement,
  Input,
  Select,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query';
import { ArrowCircleRight, FloppyDisk, MagnifyingGlass } from 'phosphor-react'
import { useRef } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { api } from '../../lib/axios';

interface DialogFilterProps {
  isOpen: boolean,
  onClose: () => void,
}

interface filterFormData {
  descricao: string
}

export function DialogFilter({ isOpen, onClose}: DialogFilterProps){

  const {setValue, getValues: getValuesContext, formState: {isSubmitting}} = useFormContext();
  const { register, getValues: getValueForm } = useForm();

  const handlleFilter = () => {
    setValue('actionFilter', getValueForm('filtro'));
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
            Filtrar Tipos
          </DrawerHeader>

          <DrawerBody>
            {/* formulário de cadastro */}
              <Stack
                spacing={"4"}
              >
                <Text>Informe os dados do filtro:</Text>
               
                <FormControl>
                  <FormLabel>Descrição:</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<MagnifyingGlass />}
                    />
                    <Input type='text' placeholder='Pesquisar descrição' {...register('filtro.descricao')} />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel>Ordenação:</FormLabel>
                    <Select placeholder='Ordenar por:' {...register('filtro.ordem')}>
                      <option value='descricao'>Descrição</option>
                      <option value='id'>ID</option>
                      <option value='created_at'>Data de Criação</option>
                      <option value='temporalidade'>Temporalidade</option>
                    </Select>
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