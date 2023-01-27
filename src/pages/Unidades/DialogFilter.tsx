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
  InputLeftElement,
  Input,
  Select,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import { ArrowCircleRight, MagnifyingGlass } from 'phosphor-react'
import { useCallback } from 'react';
import { useForm, useFormContext } from 'react-hook-form';

interface DialogFilterProps {
  isOpen: boolean,
  onClose: () => void,
}

interface filterFormData {
  nome: string
}

export function DialogFilter({ isOpen, onClose}: DialogFilterProps){

  const {setValue, getValues: getValuesContext, formState: {isSubmitting}} = useFormContext();
  const { register, getValues: getValueForm } = useForm();

  const handlleFilter = useCallback(() => {
    setValue('actionFilter', getValueForm('filtro'));
    onClose();
  }, []);

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
            Filtrar Unidades
          </DrawerHeader>

          <DrawerBody>
            {/* formulário de cadastro */}
              <Stack
                spacing={"4"}
              >
                <Text>Informe os dados do filtro:</Text>
               
                <FormControl>
                  <FormLabel>Nome:</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<MagnifyingGlass />}
                    />
                    <Input type='text' placeholder='Pesquisar descrição' {...register('filtro.nome')} />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel>Ordenação:</FormLabel>
                    <Select placeholder='Ordenar por:' {...register('filtro.ordem')}>
                      <option value='nome'>Nome</option>
                      <option value='id'>ID</option>
                      <option value='created_at'>Data de Criação</option>
                      <option value='status'>Status</option>
                    </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Status:</FormLabel>
                    <Select placeholder='Selecione:' {...register('filtro.status')}>
                      <option value='ativo'>ATIVO</option>
                      <option value='inativo'>INATIVO</option>
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