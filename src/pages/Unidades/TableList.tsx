import { Badge, HStack, IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tooltip, Tr } from "@chakra-ui/react";
import { useCallback } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { Pagination } from "../../components/Pagination/Index";
import { MetaPagination, Unidade } from "../../utils/interfaces";

interface TableListProps {
  unidades: Unidade[] | undefined;
  meta: MetaPagination | undefined;
  setUnidadeDelete: (unidade: Unidade) => void;
  onOpenDelete: () => void;
  setUnidadeEdit: (unidade: Unidade) => void;
  onOpenEdit: () => void;
  onPageChange?: (page: number) => void;
}

export function TableList({unidades, meta, setUnidadeDelete, onOpenDelete, setUnidadeEdit, onOpenEdit, onPageChange}: TableListProps) {

  const handleDelete = useCallback((unidade: Unidade) => {
    setUnidadeDelete(unidade);
    onOpenDelete();
  }, []);

  const handleEdit = useCallback((unidade: Unidade) => {
    setUnidadeEdit(unidade);
    onOpenEdit();
  }, []);
  
  return (
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
          {unidades?.map((unidade) => (
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
                    {unidade.created_at}
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
                      onClick={() => handleDelete(unidade)}
                    /> 
                    <IconButton
                      aria-label='Alterar'
                      icon={<FaPencilAlt />}
                      colorScheme={"cyan"}
                      variant='outline'
                      size='sm'
                      onClick={() => handleEdit(unidade)}
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
      totalCountofRegisters={meta?.total}
      currentPage={meta?.current_page}
      onPageChange={onPageChange}
      numberToPage={meta?.to}
      lastPage={meta?.last_page}
      numberOfItens={unidades?.length}
      registerPerPage={meta?.per_page}
    />
  </>
  )
}