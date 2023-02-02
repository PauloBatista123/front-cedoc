
import { ListaEnderecos } from "./ListaEnderecos";
import { Enderecamenento } from "./Form/Enderecamento";
import { useEnderecamento } from "../../contexts/EnderecamentoContext";
import { SearchForm } from "./Form/SearchForm";
import { Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";

export function Formulario(){

  const {caixas, proximoEndereco, buscarEnderecos, salvarEnderecamento} = useEnderecamento();

  return (
    <>
    <SearchForm handleSearch={buscarEnderecos}/>

    {proximoEndereco && (
      <Tabs isFitted variant='enclosed-colored' mt={"4"} bg={"white"} borderRadius={"8px"} border={"1px solid #c0c0c065"}>
      <TabList mb='1em'>
        <Tab>Próximo endereço</Tab>
        <Tab>Endereços recomendados</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
        {proximoEndereco && (
          <Enderecamenento 
            {...proximoEndereco}
            salvar={salvarEnderecamento}

          />
        )}
        </TabPanel>
        <TabPanel>
        {caixas?.length > 0 ? (
          <ListaEnderecos
            caixas={caixas}
          />
        ): (
          <Text>Não encontramos caixas disponíveis...</Text>
        )}
        </TabPanel>
      </TabPanels>
    </Tabs>
    )}
    </>
  );
}