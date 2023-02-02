import { Badge, HStack, IconButton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tooltip, Tr, VStack } from "@chakra-ui/react";
import { useCallback } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { MdOutlineStore } from "react-icons/md";
import { Pagination } from "../../components/Pagination/Index";
import { MetaPagination, Documento } from "../../utils/interfaces";

interface TableListProps {
  documentos: Documento[] | undefined;
  meta: MetaPagination | undefined;
  setDocumentoDelete: (documento: Documento) => void;
  onOpenDelete: () => void;
  setDocumentoEdit: (documento: Documento) => void;
  onOpenEdit: () => void;
  onPageChange?: (page: number) => void;
}

export function TableList({documentos, meta, setDocumentoDelete, onOpenDelete, setDocumentoEdit, onOpenEdit, onPageChange}: TableListProps) {

  const handleDelete = useCallback((documento: Documento) => {
    setDocumentoDelete(documento);
    onOpenDelete();
  }, []);

  const handleEdit = useCallback((documento: Documento) => {
    setDocumentoEdit(documento);
    onOpenEdit();
  }, []);
  
  return (
    <>
    <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Status</Th>
            <Th>Arquivamento</Th>
            <Th>Criado em</Th>
            <Th isNumeric>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {documentos?.map((documento) => (
              <Tr key={documento.id}
                _hover={{
                  backgroundColor: "gray.25"
                }}
              >
                <Td>
                  <Text fontWeight={"bold"}>Número: {documento.documento}</Text>
                  <Text fontSize={"sm"}>ID:{documento.id}</Text>
                </Td>
                <Td>
                  <Badge
                    borderRadius={"6px"}
                    p={1}
                    colorScheme={documento.status === 'arquivado' ? 'green' : 'red'}
                  >
                    {documento.status}
                  </Badge>
                </Td>
                <Td>
                  {documento.caixa ? (
                    <VStack align={"start"}>
                      <Text>Caixa: {documento.caixa.numero}</Text>
                      <Text>Prédio: {documento.caixa.predio.numero}</Text>
                    </VStack>
                  ): (
                    <Text>Aguardando arquivamento</Text>
                  )}
                    
                </Td>
                <Td>
                  <VStack align={"start"}>
                  <Text>{documento.created_at}</Text>
                  <Text mt={"0.2"} fontSize={"xs"} color={"gray.300"}>Alterado em {documento.updated_at}</Text>
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
                      onClick={() => handleDelete(documento)}
                    /> 
                    <IconButton
                      aria-label='Alterar'
                      icon={<FaPencilAlt />}
                      colorScheme={"cyan"}
                      variant='outline'
                      size='sm'
                      onClick={() => handleEdit(documento)}
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
      numberOfItens={documentos?.length}
      registerPerPage={meta?.per_page}
    />
  </>
  )
}