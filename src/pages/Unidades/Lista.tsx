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
  HStack,
  Badge,
  Tooltip,
} from '@chakra-ui/react'
import { Fragment, useEffect, useState } from "react";
import { Pagination } from '../../components/Pagination/Index';
import { useUnidades } from '../../hooks/Unidade/useUnidades';
import {FaTrashAlt, FaPencilAlt} from 'react-icons/fa'
import { SkeletonLista } from './SkeletonLista';
import { ActionList } from './ActionList';
import { AlertDialogDelete } from './DialogDelete';
import { Unidade } from '../../utils/interfaces';
import { ListBlank } from '../../components/ListBlank';
import { useFormContext } from 'react-hook-form';
import { DialogEditUnidade } from './DialogEdit';

export function Lista(){

  const [unidadeDelete, setUnidadeDelete] = useState<undefined | Unidade>(undefined);
  const [unidadeEdit, setUnidadeEdit] = useState<undefined | Unidade>(undefined);
  const {watch} = useFormContext();
  const [filter, setFilter] = useState<{}>({});
  const filtrar = watch("actionFilter");
  const [page, setPage] = useState(1);
  const {data, isLoading} = useUnidades({page, filter});
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
      console.log(filtrar);
    }
  },[filtrar])

  return (
    <Fragment>

    {/* DIALOG DELETE */}
    {unidadeDelete && (
      <AlertDialogDelete 
        isOpen={isOpenDelete}
        mensagem={"Deseja realmente deletar a unidade? Não será possível reverter a ação."}
        onClose={onCloseDelete}
        titulo={"Deletar Unidade"}
        unidades={unidadeDelete}
        key={"deletar-unidade"}
      />
    )}

    {/* DIALOG EDIT */}
    {unidadeEdit && (
      <DialogEditUnidade
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        unidade={unidadeEdit}
        key={"editar-unidade"}
      />
    )}

    {isLoading ? (

      <SkeletonLista />

      ): (
        <Box>
        <ActionList />
        {data?.unidades.length === 0 ? (
          
          <ListBlank />
        ): (

          <>
          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>#ID</Th>
                  <Th>Nome</Th>
                  <Th>Criado em</Th>
                  <Th isNumeric>Status</Th>
                  <Th isNumeric>Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.unidades.map((unidade) => (
                    <Tr key={unidade.id}
                      _hover={{
                        backgroundColor: "gray.25"
                      }}
                    >
                      <Td>
                        {unidade.id}
                      </Td>
                      <Td>
                        {unidade.nome}
                      </Td>
                      <Td>
                        <Tooltip>
                          {unidade.created_at}
                        </Tooltip>
                      </Td>
                      <Td isNumeric textTransform={"uppercase"}>
                      <Badge ml='1' p={"2"} fontSize='0.9rem' colorScheme={unidade.status === 'ativo' ? 'green' : 'red'} borderRadius={"8px"}>
                        {unidade.status}
                      </Badge>
                      </Td>
                      <Td isNumeric>
                        <HStack gap={"2"} align={"end"} justify={"flex-end"}>
                          <IconButton
                            aria-label='Excluir'
                            icon={<FaTrashAlt />}
                            colorScheme={"red"}
                            variant='outline'
                            size='sm'
                            onClick={() => {
                              setUnidadeDelete(unidade);
                              onOpenDelete();
                            }}
                          /> 
                          <IconButton
                            aria-label='Alterar'
                            icon={<FaPencilAlt />}
                            colorScheme={"cyan"}
                            variant='outline'
                            size='sm'
                            onClick={() => {
                              setUnidadeEdit(unidade);
                              onOpenEdit();
                            }}
                          /> 
                        </HStack>
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
            numberOfItens={data?.unidades.length}
            registerPerPage={data?.meta.per_page}
          />
        </>
        )}
    </Box>
    )}
    </Fragment>
  );
}