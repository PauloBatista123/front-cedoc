import { Icon, Badge, Box, Card, CardBody, CardFooter, CardHeader, Flex, IconButton, Text, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { AiOutlineColumnWidth, AiOutlineFolderView } from "react-icons/ai";
import { IoMdOptions } from "react-icons/io";
import { Documento } from "../../utils/interfaces";

interface ItemProps {
  documento: Documento;
  handleDetalhes: (documento: Documento) => void;
}

export function Item({documento, handleDetalhes}: ItemProps){
  return (
    <>
    <Card
      border={"1px solid #d1d2dc"}
      role={"group"}
      _hover={{backgroundColor:
      'gray.25'}}
      key={documento.id}
      marginTop={"6"}
      bg={"gray.50"}
      borderRadius={"base"}
    >
    <Box top={"-1.5"} marginTop={"-6"}>
      <Text
        fontWeight={"bold"}
        p={1}
        m={0}
        as={"span"}
        bgColor={"gray.50"}
        borderTopRightRadius={"lg"}
        borderTopLeftRadius={"lg"}
        borderLeft={"1px solid #d1d2dc"}
        borderRight={"1px solid #d1d2dc"}
        _groupHover={{
          backgroundColor: 'gray.25'
        }}
      >{documento.documento}</Text>
    </Box>
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
        {documento.status == 'arquivado' && (
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
        )}
      </CardBody>
      {documento.status === 'arquivado' && (
        <CardFooter borderTop={"1px solid #d1d1d15a"}>
          <Box flexDir={"row"} display={"flex"} justifyContent={"flex-start"} flex={"1"} alignItems={"center"}>
              <Icon as={AiOutlineColumnWidth} mr={"2"}/>
              <Text as={"span"}> Espaço ocupado na caixa de <Text as={"span"} fontWeight={"bold"} color={"red.400"}>{documento.espaco_ocupado}</Text> cm</Text>
          </Box>
        </CardFooter>
      )}
    </Card>
    </>
  )
}