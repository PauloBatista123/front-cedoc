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
  Input,
  Select,
} from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react';
import { useFindImportacao } from '../../hooks/Importacao/useFindImportacao';
import { DrawerDetalhesLogs } from './DrawerDetalhesLogs';

interface DetalhesProps {
  id: number;
  isOpen: boolean;
  onClose: () => void;
}

export function DrawerDetalhes({id, onClose, isOpen}: DetalhesProps){

  const [filter, setFilter] = useState<string>('');
  const {data, isLoading} = useFindImportacao({id, filter});

  const handleKeyUpFilter = (e: ChangeEvent) => {
    setFilter((e.target as HTMLInputElement).value);
  }
  
  return (
  <Drawer placement={"left"} onClose={onClose} isOpen={isOpen} size={"xl"}>
    <DrawerOverlay />
    <DrawerContent>
      <DrawerCloseButton />
      {isLoading ? (
        <Box display={"flex"} flexDir={"row"} justifyContent={"center"} height={"100vh"}>
          <Text fontSize={"2xl"} fontWeight={"bold"}>Carregando...</Text>
        </Box>
      ): (

        <>
        <DrawerHeader borderBottomWidth='1px'>
          <Text fontSize={"2xl"} color={"gray.600"}>Importação número {data?.registro.id}</Text>
        </DrawerHeader>
        <DrawerBody>
          {/* DRAWER BODY */}
          <Alert rounded={"md"} status={data?.registro.input.status === 'error' ? 'error' : 'success'} variant='solid'>
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

            <Select id='filter_output' onChange={handleKeyUpFilter} disabled={data?.registro.output.error != 'false'? true : false}>
              <option value="todos" selected={filter === 'todos' && true}>Todos os registros</option>
              <option value="erros" selected={filter === 'erros' && true}>Processado com erros</option>
              <option value="enviado" selected={filter === 'enviado' && true}>Registro cadastrado</option>
            </Select>
            
            <DrawerDetalhesLogs 
              registros={data?.registro.output.registros}
              errors={data?.registro.output.error}
            />

        </DrawerBody>
        </>
        )}
      </DrawerContent>
    </Drawer>
  )
}