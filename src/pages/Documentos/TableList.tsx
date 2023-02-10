import { Icon, Badge, Box, Card, CardBody, CardFooter, CardHeader, Flex, HStack, IconButton, SimpleGrid, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tooltip, Tr, VStack, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { useCallback } from "react";
import { AiOutlineColumnWidth, AiOutlineFolderView } from "react-icons/ai";
import { Pagination } from "../../components/Pagination/Index";
import { MetaPagination, Documento } from "../../utils/interfaces";
import {IoMdOptions} from "react-icons/io";


interface TableListProps {
  documentos: Documento[] | undefined;
  meta: MetaPagination | undefined;
  onPageChange?: (page: number) => void;
  onOpenDetalhes: () => void;
  setDocDetalhes: (documento: Documento) => void;
}

export function TableList({documentos, meta, onOpenDetalhes, onPageChange, setDocDetalhes}: TableListProps) {

  const handleDetalhes = useCallback((documento: Documento) => {
    setDocDetalhes(documento);
    onOpenDetalhes();
  }, []);
  
  return (
    <>
    <SimpleGrid columns={{md: 2, lg: 3}} gap={"3"}>
    {documentos?.map((documento) => (
          <Card _hover={{backgroundColor: 'gray.25'}}>
            <CardHeader borderBottom={"1px solid #dedede7d"}>
              <Flex justify={"space-between"}>
              <Box>
                <Text fontWeight={"bold"} fontSize={"2xl"} color={"gray.800"}>{documento.nome_cooperado}</Text>
                <Text>CPF:{documento.cpf_cooperado}</Text>
              </Box>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label='Options'
                    icon={<IoMdOptions />}
                    variant='ghost'
                    size={"sm"}
                    ml={"2"}
                  />
                  <MenuList>
                    <MenuItem 
                    icon={<AiOutlineFolderView size={"1.5rem"}/>}
                    onClick={() => handleDetalhes(documento)}
                    >
                      Detalhes
                    </MenuItem>
                  </MenuList>
                </Menu>            
              </Flex>
            </CardHeader>
            <CardBody>
            <Flex justify={"space-between"} mb={"4"}>
                <Box>
                  <Text fontWeight={"bold"} fontSize={"lg"}>Dossiê número {documento.documento}</Text>
                  <Text fontSize={"sm"}>Tipo documental {documento.tipo_documento.descricao}</Text>
                </Box>
                <Box>
                  <Badge
                    fontSize={"sm"}
                    rounded={"md"}
                    variant={"outline"}
                    colorScheme={documento.status === 'arquivado'? 'green' : 'red'}
                    color={documento.status === 'arquivado'? 'green.400' : 'red.400'}>
                      {documento.status}
                  </Badge>
                </Box>
              </Flex>
              <Box justifyContent={"space-between"} display={"flex"}>
                <Text as={"span"}>
                  Caixa: {documento.status == 'arquivado' ? documento.caixa.id : 'Aguardando...'}
                </Text>
                <Text as={"span"}>
                  Prédio: {documento.status == 'arquivado' ? documento.caixa.predio_id : 'Aguardando...'}
                </Text>
                <Text as={"span"}>
                  Andar: {documento.status == 'arquivado' ? documento.caixa.andar_id : 'Aguardando...'}
                </Text>
              </Box>
            </CardBody>
            <CardFooter borderTop={"1px solid #d1d1d15a"}>
              <Box flexDir={"row"} display={"flex"} justifyContent={"flex-start"} flex={"1"} alignItems={"center"}>
                {documento.status === 'arquivado' ? (
                  <>
                  <Icon as={AiOutlineColumnWidth} mr={"2"}/>
                  <Text as={"span"}> Espaço ocupado na caixa de <Text as={"span"} fontWeight={"bold"} color={"red.400"}>{documento.espaco_ocupado}</Text> cm</Text>
                  </>
                ):(
                  <>
                  <Icon as={AiOutlineColumnWidth} mr={"2"}/>
                  <Text> Ainda não foi informado espaço ocupado!</Text>
                  </>
                )}
              </Box>
            </CardFooter>
          </Card>
        ))}
    </SimpleGrid>
    

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