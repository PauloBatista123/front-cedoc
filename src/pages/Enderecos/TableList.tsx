import { Badge, HStack, IconButton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tooltip, Tr, VStack } from "@chakra-ui/react";
import { useCallback } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { MdOutlineStore } from "react-icons/md";
import { Pagination } from "../../components/Pagination/Index";
import { MetaPagination, Endereco } from "../../utils/interfaces";

interface TableListProps {
  enderecos: Endereco[] | undefined;
  meta: MetaPagination | undefined;
  setEnderecoDelete: (endereco: Endereco) => void;
  onOpenDelete: () => void;
  setEnderecoEdit: (endereco: Endereco) => void;
  onOpenEdit: () => void;
  onPageChange?: (page: number) => void;
}

export function TableList({enderecos, meta, setEnderecoDelete, onOpenDelete, setEnderecoEdit, onOpenEdit, onPageChange}: TableListProps) {

  const handleDelete = useCallback((endereco: Endereco) => {
    setEnderecoDelete(endereco);
    onOpenDelete();
  }, []);

  const handleEdit = useCallback((endereco: Endereco) => {
    setEnderecoEdit(endereco);
    onOpenEdit();
  }, []);
  
  return (
    <>
    <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>#ID</Th>
            <Th>Avenida</Th>
            <Th>Rua</Th>
            <Th>Andar</Th>
            <Th>Unidade</Th>
            <Th>Criado em</Th>
            <Th isNumeric>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {enderecos?.map((endereco) => (
              <Tr key={endereco.id}
                _hover={{
                  backgroundColor: "gray.25"
                }}
              >
                <Td>
                  {endereco.id}
                </Td>
                <Td>
                  {endereco.avenida}
                </Td>
                <Td>
                    {endereco.rua}
                </Td>
                <Td>
                    {endereco.andar}
                </Td>
                <Td>
                  <HStack gap={"2"} align={"center"}>
                    <MdOutlineStore size={20}/>
                    <Text fontWeight={"bold"} color={"gray.500"}>{endereco.unidade.nome}</Text>
                  </HStack>
                </Td>
                <Td>
                  <VStack align={"start"}>
                  <Text>{endereco.created_at}</Text>
                  <Text mt={"0.2"} fontSize={"xs"} color={"gray.300"}>Alterado em {endereco.updated_at}</Text>
                  </VStack>
                </Td>
                <Td isNumeric>
                  <HStack gap={"2"} align={"end"} justify={"flex-end"}>
                    <IconButton
                      aria-label='Excluir'
                      icon={<FaTrashAlt />}
                      colorScheme={"red"}
                      variant='outline'
                      size='sm'
                      onClick={() => handleDelete(endereco)}
                    /> 
                    <IconButton
                      aria-label='Alterar'
                      icon={<FaPencilAlt />}
                      colorScheme={"cyan"}
                      variant='outline'
                      size='sm'
                      onClick={() => handleEdit(endereco)}
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
      numberOfItens={enderecos?.length}
      registerPerPage={meta?.per_page}
    />
  </>
  )
}