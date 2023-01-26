import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  IconButton,
  useDisclosure,
  SimpleGrid,
} from '@chakra-ui/react'
import { NotePencil, Trash } from 'phosphor-react';
import { Fragment, useEffect, useState } from 'react';
import { Pagination } from '../../components/Pagination/Index';
import { useTipoDocumentos } from '../../hooks/TipoDocumental/useTipoDocumento';
import { formatTemporalidade } from '../../utils/formatter';
import { ActionList } from './ActinoList';
import { AlertDialogDelete } from './DialogDelete';
import { DialogEditTipoDocumento } from './DialogEdit';
import { SkeletonLista } from './SkeletonLista';
import {useFormContext} from 'react-hook-form';

interface TipoDocumento {
  id: number;
  descricao: string;
  temporalidade: number;
  created_at: string;
  updated_at: string;
}

export function Lista() {
  const {watch} = useFormContext();
  const [filter, setFilter] = useState<{}>({});
  const filtrar = watch("actionFilter");
  const [page, setPage] = useState(1);
  const {data, isLoading} = useTipoDocumentos({page, filter});
  const [tipoDelete, setTipoDelete] = useState<undefined | TipoDocumento>(undefined);
  const [tipoEdit, setTipoEdit] = useState<undefined | TipoDocumento>(undefined);
  const {
    onClose: onCloseDelete, 
    isOpen: isOpenDelete, 
    onOpen: onOpenDelete,
  } = useDisclosure();
  const {
    onClose: onCloseEdit,
    isOpen: isOpenEdit, 
    onOpen: onOpenEdit,
  } = useDisclosure();

  // monitorar campo e setar estado do filtro
  useEffect(() => {
    if(filtrar !== undefined){
      setFilter(filtrar);
    }
  },[filtrar])

  return (
    <Fragment>

    {/* DIALOG DELETE */}
    {tipoDelete && (
      <AlertDialogDelete 
        isOpen={isOpenDelete}
        mensagem={"Deseja realmente deletar o tipo documental? Não será possível reverter a ação."}
        onClose={onCloseDelete}
        titulo={"Deletar Tipo Documental"}
        tipoDocumento={tipoDelete}
        key={"deletar-tipo"}
      />
    )}

     {/* DIALOG EDIT */}
     {tipoEdit && (
      <DialogEditTipoDocumento 
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        tipoDocumento={tipoEdit}
        key={"editar-tipo"}
      />
    )}

    {isLoading ? (

      <SkeletonLista />

      ): (

      <Box>
      <ActionList />
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>#ID</Th>
              <Th>Descrição</Th>
              <Th>Criado em</Th>
              <Th isNumeric>Temporalidade</Th>
              <Th isNumeric>Tempo de Guarda</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.tipos.map((tipo) => (
                <Tr key={tipo.id}
                  _hover={{
                    backgroundColor: "gray.25"
                  }}
                >
                  <Td>
                    {tipo.id}
                  </Td>
                  <Td>
                    {tipo.descricao}
                  </Td>
                  <Td>
                    {tipo.created_at}
                  </Td>
                  <Td isNumeric>
                    {tipo.temporalidade} dias
                  </Td>
                  <Td isNumeric>
                    {formatTemporalidade(tipo.temporalidade) ?? `${tipo.temporalidade} dias`}
                  </Td>
                  <Td>
                    <SimpleGrid gap={"2"} columns={2}>
                      <IconButton
                        aria-label='Excluir'
                        icon={<Trash />}
                        colorScheme={"red"}
                        variant='outline'
                        size='sm'
                        onClick={() => {
                          onOpenDelete();
                          setTipoDelete(tipo);
                        }}
                      /> 
                      <IconButton
                        aria-label='Alterar'
                        icon={<NotePencil />}
                        colorScheme={"cyan"}
                        variant='outline'
                        size='sm'
                        onClick={() => {
                          onOpenEdit();
                          setTipoEdit(tipo);
                        }}
                      /> 
                    </SimpleGrid>
                  </Td>
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      </TableContainer>

      <Pagination 
        totalCountofRegisters={data?.meta.total}
        currentPage={data?.meta.current_page}
        onPageChange={setPage}
        numberToPage={data?.meta.to}
        lastPage={data?.meta.last_page}
        numberOfItens={data?.tipos.length}
        registerPerPage={data?.meta.per_page}
      />
    </Box>
    )}
    </Fragment>
  );
}