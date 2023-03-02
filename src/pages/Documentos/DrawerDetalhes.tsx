import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  Alert,
  AlertIcon,
  Card,
  CardBody,
  Box,
  Grid,
  GridItem,
} from '@chakra-ui/react'

import { useFindDocumento } from "../../hooks/Documento/useFindDocumento";

interface DetalhesProps {
  id: number;
  isOpen: boolean;
  onClose: () => void;
}

export function DrawerDetalhes({id, onClose, isOpen}: DetalhesProps){

  const {data, isLoading} = useFindDocumento({id});
  
  return (
  <Drawer placement={"left"} onClose={onClose} isOpen={isOpen} size={"xl"}>
    <DrawerOverlay />
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader borderBottomWidth='1px'>
        <Text fontSize={"2xl"} color={"gray.600"}>Dossiê Número {data?.documento.documento}</Text>
      </DrawerHeader>
      <DrawerBody>
        {/* DRAWER BODY */}
        <Alert rounded={"md"} status={'info'} variant='solid'>
          <AlertIcon />
          O dossiê está com status: 
          <Text textTransform={"uppercase"} fontWeight={"bold"} ml={"2"}>{data?.documento.status}</Text>
        </Alert>

      <Text mt={"4"} fontSize={"small"} color={"gray.400"}>Dossiê</Text>
        <Card variant={"elevated"}>
          <CardBody>
            <Grid gap={4} templateColumns={"repeat(3, 1fr)"}>
              <Box flexDir={"column"}>
                <Text fontSize={"small"}>Cooperado:</Text>
                <Text fontWeight={"bold"}>{data?.documento.nome_cooperado}</Text>
              </Box>
              <Box flexDir={"column"}>
                <Text fontSize={"small"}>CPF:</Text>
                <Text fontWeight={"bold"}>{data?.documento.cpf_cooperado}</Text>
              </Box>
              <Box flexDir={"column"}>
                <Text fontSize={"small"}>Vecimento:</Text>
                <Text fontWeight={"bold"}>{data?.documento.vencimento_operacao ?? 'Não possui previsão cadastrada'}</Text>
              </Box>
              <Box flexDir={"column"}>
                <Text fontSize={"small"}>Valor:</Text>
                <Text fontWeight={"bold"}>{data?.documento.valor_operacao ?? 'Nada consta'}</Text>
              </Box>
              <Box flexDir={"column"}>
                <Text fontSize={"small"}>Última alteração:</Text>
                <Text fontWeight={"bold"}>{data?.documento.updated_at}</Text>
              </Box>
              <Box flexDir={"column"}>
                <Text fontSize={"small"}>Data de criação:</Text>
                <Text fontWeight={"bold"}>{data?.documento.created_at}</Text>
              </Box>
              <GridItem colSpan={3}>
                <Box flexDir={"column"}>
                  <Text fontSize={"small"}>Observação:</Text>
                  <Text fontWeight={"bold"}>{data?.documento.observacao}</Text>
                </Box>
              </GridItem>
            </Grid>
          </CardBody>
        </Card>
        
        <Text mt={"4"} fontSize={"small"} color={"gray.400"}>Tipo Documental</Text>
        <Card variant={"elevated"}>
          <CardBody>
            <Grid gap={4} templateColumns={"repeat(2, 1fr)"}>
              <Box flexDir={"column"}>
                <Text fontSize={"small"}>Descrição:</Text>
                <Text fontWeight={"bold"}>{data?.documento.tipo_documento.descricao}</Text>
              </Box>
              <Box flexDir={"column"}>
                <Text fontSize={"small"}>Temporalidade:</Text>
                <Text fontWeight={"bold"}>{data?.documento.tipo_documento.temporalidade} dias</Text>
              </Box>
            </Grid>
          </CardBody>
        </Card>

        <Text mt={"4"} fontSize={"small"} color={"gray.400"}>Caixa</Text>
          <Card variant={"elevated"}>
            <CardBody>
              {data?.documento.caixa ? (
              <Grid gap={4} templateColumns={"repeat(3, 1fr)"}>
                <Box flexDir={"column"}>
                  <Text fontSize={"small"}>Número:</Text>
                  <Text fontWeight={"bold"}>{data?.documento.caixa.numero}</Text>
                </Box>
                <Box flexDir={"column"}>
                  <Text fontSize={"small"}>Ordem do documento:</Text>
                  <Text fontWeight={"bold"}>{data?.documento.ordem}</Text>
                </Box>
                <Box flexDir={"column"}>
                  <Text fontSize={"small"}>Andar:</Text>
                  <Text fontWeight={"bold"}>{data?.documento.caixa.andar_id}</Text>
                </Box>
                <Box flexDir={"column"}>
                  <Text fontSize={"small"}>Prédio:</Text>
                <Text fontWeight={"bold"}>{data?.documento.caixa.predio_id}</Text>
                </Box>
                <Box flexDir={"column"}>
                  <Text fontSize={"small"}>Espaço Disponível:</Text>
                  <Text fontWeight={"bold"}>{data?.documento.caixa.espaco_disponivel} cm</Text>
                </Box>
                <Box flexDir={"column"}>
                  <Text fontSize={"small"}>Espaço Ocupado:</Text>
                  <Text fontWeight={"bold"}>{data?.documento.caixa.espaco_ocupado} cm</Text>
                </Box>
                <Box flexDir={"column"}>
                  <Text fontSize={"small"}>Quantidade de Dossiês:</Text>
                  <Text fontWeight={"bold"}>{data?.documento.caixa.documentos_count}</Text>
                </Box>
              </Grid>
            ): (
              <Text>Aguardando endereçamento</Text>  
            )}
            </CardBody>
          </Card>

          <Text mt={"4"} fontSize={"small"} color={"gray.400"}>Prédio</Text>
          <Card variant={"elevated"}>
            <CardBody>
              {data?.documento.predio ? (
              <Grid gap={4} templateColumns={"repeat(3, 1fr)"}>
                <Box flexDir={"column"}>
                  <Text fontSize={"small"}>Número:</Text>
                  <Text fontWeight={"bold"}>{data?.documento.caixa.predio_id}</Text>
                </Box>
                <Box flexDir={"column"}>
                  <Text fontSize={"small"}>Quantidade de Caixas:</Text>
                  <Text fontWeight={"bold"}>{data?.documento.caixa.predio.caixas_count}</Text>
                </Box>
                <Box flexDir={"column"}>
                  <Text fontSize={"small"}>Quantidade de Dossiês:</Text>
                  <Text fontWeight={"bold"}>{data?.documento.caixa.predio.documentos_count}</Text>
                </Box>
              </Grid>
            ): (
              <Text>Aguardando endereçamento</Text>  
            )}
            </CardBody>
          </Card>
          
        
      </DrawerBody>
    </DrawerContent>
  </Drawer>
  )
}