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
import { useFindImportacao } from '../../hooks/Importacao/useFindImportacao';
import { DrawerDetalhesLogs } from './DrawerDetalhesLogs';

interface DetalhesProps {
  id: number;
  isOpen: boolean;
  onClose: () => void;
}

export function DrawerDetalhes({id, onClose, isOpen}: DetalhesProps){

  const {data, isLoading} = useFindImportacao({id});
  console.log(data);
  return (
  <Drawer placement={"left"} onClose={onClose} isOpen={isOpen} size={"xl"}>
    <DrawerOverlay />
    <DrawerContent>
      <DrawerCloseButton />
      {isLoading ? (
        <Text>Carregando...</Text>
      ): (

        <>
        <DrawerHeader borderBottomWidth='1px'>
          <Text fontSize={"2xl"} color={"gray.600"}>Importação número {data?.registro.id}</Text>
        </DrawerHeader>
        <DrawerBody>
          {/* DRAWER BODY */}
          <Alert rounded={"md"} status={'info'} variant='solid'>
            <AlertIcon />
            Status: 
            <Text textTransform={"uppercase"} fontWeight={"bold"} ml={"2"}>{data?.registro.input.status}</Text>
          </Alert>

        <Text mt={"4"} fontSize={"small"} color={"gray.400"}>Informações</Text>
          <Card variant={"elevated"}>
            <CardBody>
              <Grid gap={4} templateColumns={"repeat(3, 1fr)"}>
                <Box flexDir={"column"}>
                  <Text fontSize={"small"}>Total registros:</Text>
                  <Text fontWeight={"bold"}>{data?.registro.progress_max}</Text>
                </Box>
                <Box flexDir={"column"}>
                  <Text fontSize={"small"}>Total processados:</Text>
                  <Text fontWeight={"bold"}>{data?.registro.progress_now}</Text>
                </Box>
                <Box flexDir={"column"}>
                  <Text fontSize={"small"}>Data da importação:</Text>
                  <Text fontWeight={"bold"}>{data?.registro.created_at}</Text>
                </Box>
                <Box flexDir={"column"}>
                  <Text fontSize={"small"}>Data da conclusão:</Text>
                  <Text fontWeight={"bold"}>{data?.registro.updated_at}</Text>
                </Box>
              </Grid>
            </CardBody>
          </Card>
          

          <Text mt={"4"} fontSize={"small"} color={"gray.400"}>Processamento:</Text>
          <DrawerDetalhesLogs 
            registros={data?.registro.output}
          />
        </DrawerBody>
        </>
        )}
      </DrawerContent>
    </Drawer>
  )
}