
import { ListaEnderecos } from "./ListaEnderecos";
import { Enderecamenento } from "./Form/Enderecamento";
import { SearchForm } from "./Form/SearchForm";
import { Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { useEnderecamento } from "../../hooks/Documento/useEnderecamento";
import { useState } from "react";
import { EnderecoRecomendadoSkeleton } from "../../components/Skeleton/EnderecoRecomendado";
import { newFormDataEnderecamentoSearch } from "../../utils/schemas";

export function Formulario() {

  const [search, setSearch] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<newFormDataEnderecamentoSearch>();
  const {data, isLoading, status } = useEnderecamento({ filter: filter, page });
  const [tabIndex, setTabIndex] = useState(0)

  const handleClickSearch = (filterData: newFormDataEnderecamentoSearch) => {
    setFilter(filterData);
    !search && setSearch(true);
  }

  return (
    <>
      <SearchForm handleSearch={handleClickSearch} />
      {isLoading ? (
        <EnderecoRecomendadoSkeleton/>
      ) : (
        data?.proximoEndereco && status === 'success' && (
        <Tabs onChange={(index) => setTabIndex(index)} index={tabIndex} isFitted variant='enclosed-colored' mt={"4"} bg={"white"} borderRadius={"8px"} border={"1px solid #c0c0c065"}>
          <TabList mb='1em'>
            <Tab>Próximo endereço</Tab>
            <Tab>Endereços recomendados</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
                <Enderecamenento
                  proximoEndereco={data?.proximoEndereco}
                  setSearch={setSearch}
                />
            </TabPanel>
            <TabPanel>
              {data?.caixas.data.length > 0 ? (
                <ListaEnderecos
                  caixas={data?.caixas}
                  onPageChange={setPage}
                  {...data?.proximoEndereco}
                  setSearch={setSearch}
                />
              ) : (
                <Text>Não encontramos caixas disponíveis...</Text>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
        )
      )}
    </>
  );
}