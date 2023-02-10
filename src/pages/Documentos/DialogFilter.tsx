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
  HStack,
  SimpleGrid,
} from '@chakra-ui/react'
import { ArrowCircleRight } from 'phosphor-react'
import { useForm, useFormContext, Controller } from 'react-hook-form';
import { Input } from '../../components/Form/Input';
import Select, { SingleValue } from "react-select"
import { useUnidades } from '../../hooks/Unidade/useUnidades';
import { Select as SelectForm } from "../../components/Form/Select";
import { useEffect } from 'react';
import { useTipoDocumentos } from '../../hooks/TipoDocumental/useTipoDocumento';
import { optionsSelectStyles } from '../../utils/select-styles';


interface DialogFilterProps {
  isOpen: boolean,
  onClose: () => void,
}

export function DialogFilter({ isOpen, onClose }: DialogFilterProps) {

  const { setValue, getValues: getValuesContext, formState: { isSubmitting } } = useFormContext();
  const { register, getValues: getValueForm, control } = useForm();

  const { data: dataUnidades } = useUnidades({ page: -1, filter: {} });
  const { data: dataTipos } = useTipoDocumentos({ page: -1, filter: {} });

  const allUnidades = dataUnidades?.predios.map((item) => {
    return { value: item.id, label: `Número ${item.id}` }
  });

  const allTipos = dataTipos?.tipos.map((item) => {
    return { value: String(item.id), label: item.descricao }
  });

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
          Filtrar Endereços
        </DrawerHeader>

        <DrawerBody>
          {/* formulário de filtro */}
          <Stack
            spacing={"4"}
          >
            <Text>Informe os dados do filtro:</Text>
            <Text fontSize={"sm"}>A situação do documento por padrão será "AGUARDANDO" caso não exista valor selecionado.</Text>

            <Input
              type='text'
              placeholder='Número do dossiê'
              {...register('filtro.documento')}
            />

            <Input
              type='text'
              placeholder='Número da caixa'
              {...register('filtro.caixa')}
            />

            <Controller
              name='filtro.predio_id'
              control={control}
              render={({ field: { onChange, ref, value, name } }) => (
                <Select
                  // @ts-ignore
                  onChange={(e) => onChange(e?.value)}
                  options={allUnidades}
                  placeholder="Selecione o prédio"
                  styles={optionsSelectStyles}
                />
              )}
            />

            <Controller
              name='filtro.tipo_documento_id'
              control={control}
              render={({ field: { onChange, ref, value, name } }) => (
                <Select
                  // @ts-ignore
                  onChange={(e) => onChange(e?.value)}
                  options={allTipos}
                  placeholder="Selecione o tipo documental"
                  styles={optionsSelectStyles}
                />
              )}
            />

            <Controller
              name='filtro.status'
              control={control}
              render={({ field: { onChange, ref, value, name } }) => (
                <Select
                  // @ts-ignore
                  onChange={(e) => onChange(e?.value)}
                  options={[
                    {value: 'alocar', label: 'ALOCAR'},
                    {value: 'arquivado', label: 'ARQUIVADO'},
                    {value: 'retirar', label: 'RETIRAR'},
                    {value: 'emprestimo', label: 'EMPRÉSTIMO'},
                  ]}
                  placeholder="Selecione a situação do documento"
                  styles={optionsSelectStyles}
                />
              )}
            />

          <SimpleGrid columns={2} spacing={"2"}>
            <Controller
              name='filtro.ordenar_campo'
              control={control}
              render={({ field: { onChange, ref, value, name } }) => (
                <Select
                  // @ts-ignore
                  onChange={(e) => onChange(e?.value)}
                  options={[
                    {value: 'documento', label: 'NUMERO'},
                    {value: 'predio_id', label: 'PRÉDIO'},
                    {value: 'espaco_ocupado', label: 'ESPAÇO OCUPADO'},
                    {value: 'tipo_documento_id', label: 'TIPO DOCUMENTO'},
                  ]}
                  placeholder="Campo de ordenação"
                  styles={optionsSelectStyles}
                />
              )}
            />
            <Controller
              name='filtro.ordenar_direcao'
              control={control}
              render={({ field: { onChange, ref, value, name } }) => (
                <Select
                  // @ts-ignore
                  onChange={(e) => onChange(e?.value)}
                  options={[
                    {value: 'desc', label: 'DESCRESCENTE'},
                    {value: 'asc', label: 'CRESCENTE'},
                  ]}
                  placeholder="Tipo de ordenação"
                  styles={optionsSelectStyles}
                />
              )}
            />
            </SimpleGrid>

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