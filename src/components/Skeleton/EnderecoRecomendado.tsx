import { TabList, Tabs, Tab, TabPanel, TabPanels, SimpleGrid, Card, Box, CardHeader, Flex, Text, CardBody, CardFooter, Button, Badge, Skeleton, Grid, Input, SkeletonText } from "@chakra-ui/react";

export function EnderecoRecomendadoSkeleton(){
  return (
    <Tabs isFitted variant='enclosed-colored' mt={"4"} bg={"white"} borderRadius={"8px"} border={"1px solid #c0c0c065"}>
      <TabList mb='1em'>
        <Tab>Próximo endereço</Tab>
        <Tab>Endereços recomendados</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
        {/* FORMULARIO ENDEREÇAMENTO */}
        <Box 
      mt={"4"} 
      bgColor={"white"}
      p={"6"}
      borderRadius={"8px"}
      >
      <Grid templateColumns={"repeat(2, 1fr)"} gap={"4"}>
          <Box >
            <Skeleton height='40px' mt={"4"}/>
            <Skeleton height='40px' mt={"4"}/>
            <Skeleton height='40px' mt={"4"}/>
            <Button 
              colorScheme={"green"}
              type="button"
              size={"lg"}
              variant={"solid"}
              fontSize={"md"}
              paddingLeft={"8"}
              paddingRight={"8"}
              alignItems={"center"}
              isLoading={true}
              loadingText={"Buscando..."}
              width={"100%"}
              mt={"4"}
            >
            Endereçar
          </Button>
        </Box>

        <Box flexDir={"column"}>
          <SkeletonText mt='4' noOfLines={8} spacing='4' skeletonHeight='2' />
        </Box>

      </Grid>
  </Box>
        </TabPanel>
        <TabPanel>
          {/* LISTA ENDEREÇOS */}

          <Box mt={"8"}>
            <SimpleGrid spacing={10} columns={3} >
                <Card 
                  border={"1px solid #d1d2dc"}
                  boxShadow={"rgba(105, 105, 105, 0.16) 0px 3px 6px, rgba(87, 87, 87, 0.23) 0px 3px 6px;"}
                  borderRadius={"6px"}
                  bg={"gray.25"}
                >
                  <CardHeader>
                    <Flex justify={"space-between"} align="center">
                      <Skeleton m={"1"}><Text fontWeight={"bold"} fontSize={"2xl"} color={"gray.500"}>Caixa Nº</Text></Skeleton>
                      <Skeleton><Badge borderRadius={"8px"} p="2" colorScheme={"green"}>Disponível</Badge></Skeleton>
                    </Flex>
                    <Flex align={"start"}>
                    <Skeleton m={"1"}><Text color={"gray.400"} fontSize={"sm"} mr={"2"}>Prédio </Text></Skeleton>
                    <Skeleton m={"1"}> <Text color={"gray.400"} fontSize={"sm"}>Andar </Text></Skeleton>
                    </Flex>
                  </CardHeader> 
                  <CardBody>
                    <Flex direction={"column"} justify={"start"}>
                    <Skeleton><Text>Quantidade de Documentos na caixa: </Text></Skeleton>
                    </Flex>
                  </CardBody>
                  <CardFooter>
                  <Button variant='solid' colorScheme='blue' isLoading={true}>
                    Arquivar
                  </Button>
                  </CardFooter>
                </Card>
                <Card 
                  border={"1px solid #d1d2dc"}
                  boxShadow={"rgba(105, 105, 105, 0.16) 0px 3px 6px, rgba(87, 87, 87, 0.23) 0px 3px 6px;"}
                  borderRadius={"6px"}
                  bg={"gray.25"}
                >
                  <CardHeader>
                    <Flex justify={"space-between"} align="center">
                      <Skeleton m={"1"}><Text fontWeight={"bold"} fontSize={"2xl"} color={"gray.500"}>Caixa Nº</Text></Skeleton>
                      <Skeleton><Badge borderRadius={"8px"} p="2" colorScheme={"green"}>Disponível</Badge></Skeleton>
                    </Flex>
                    <Flex align={"start"}>
                    <Skeleton m={"1"}><Text color={"gray.400"} fontSize={"sm"} mr={"2"}>Prédio </Text></Skeleton>
                    <Skeleton m={"1"}> <Text color={"gray.400"} fontSize={"sm"}>Andar </Text></Skeleton>
                    </Flex>
                  </CardHeader> 
                  <CardBody>
                    <Flex direction={"column"} justify={"start"}>
                    <Skeleton><Text>Quantidade de Documentos na caixa: </Text></Skeleton>
                    </Flex>
                  </CardBody>
                  <CardFooter>
                  <Button variant='solid' colorScheme='blue' isLoading={true}>
                    Arquivar
                  </Button>
                  </CardFooter>
                </Card>
                <Card 
                  border={"1px solid #d1d2dc"}
                  boxShadow={"rgba(105, 105, 105, 0.16) 0px 3px 6px, rgba(87, 87, 87, 0.23) 0px 3px 6px;"}
                  borderRadius={"6px"}
                  bg={"gray.25"}
                >
                  <CardHeader>
                    <Flex justify={"space-between"} align="center">
                      <Skeleton m={"1"}><Text fontWeight={"bold"} fontSize={"2xl"} color={"gray.500"}>Caixa Nº</Text></Skeleton>
                      <Skeleton><Badge borderRadius={"8px"} p="2" colorScheme={"green"}>Disponível</Badge></Skeleton>
                    </Flex>
                    <Flex align={"start"}>
                    <Skeleton m={"1"}><Text color={"gray.400"} fontSize={"sm"} mr={"2"}>Prédio </Text></Skeleton>
                    <Skeleton m={"1"}> <Text color={"gray.400"} fontSize={"sm"}>Andar </Text></Skeleton>
                    </Flex>
                  </CardHeader> 
                  <CardBody>
                    <Flex direction={"column"} justify={"start"}>
                    <Skeleton><Text>Quantidade de Documentos na caixa: </Text></Skeleton>
                    </Flex>
                  </CardBody>
                  <CardFooter>
                  <Button variant='solid' colorScheme='blue' isLoading={true}>
                    Arquivar
                  </Button>
                  </CardFooter>
                </Card>
            </SimpleGrid >
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}