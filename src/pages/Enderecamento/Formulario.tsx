
import { ListaEnderecos } from "./ListaEnderecos";
import { Enderecamenento } from "./Form/Enderecamento";
import { SearchForm } from "./Form/SearchForm";
import { Alert, AlertIcon, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useToast } from "@chakra-ui/react";
import { useEnderecamento } from "../../hooks/Documento/useEnderecamento";
import { useEffect, useState } from "react";
import { EnderecoRecomendadoSkeleton } from "../../components/Skeleton/EnderecoRecomendado";
import { newFormDataEnderecamentoSearch } from "../../utils/schemas";
import { useFormContext } from "react-hook-form";

export function Formulario() {

  const {watch} = useFormContext<newFormDataEnderecamentoSearch>();
  const [search, setSearch] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<newFormDataEnderecamentoSearch>();
  const {data, isLoading, status, error, isError} = useEnderecamento({ filter: filter, page });
  const [tabIndex, setTabIndex] = useState(0);
  const watchFilterPredio = watch("predio_id");
  const toast = useToast();

   
  const handleClickSearch = (filterData: newFormDataEnderecamentoSearch) => {
    setFilter(filterData);
    !search && setSearch(true);
  }

  const handleSearchClose = () => {
    console.log(search);
    setSearch(false);
  }

  useEffect(() => {
    watchFilterPredio !== undefined && setFilter((prevState) => {
      return {
        numero: prevState!.numero, 
        espaco_ocupado: prevState!.espaco_ocupado, 
        cpf_cooperado: prevState!.cpf_cooperado, 
        tipo_documento_id: prevState!.tipo_documento_id,
        predio_id: watchFilterPredio
      }
    });
  }, [watchFilterPredio]);

  return (
    <>
      <SearchForm handleSearch={handleClickSearch} />
      {isError && search && (
         <Alert status='info' rounded={"base"} m={"1"}>
            <AlertIcon />
            {error.response?.data.error}
          </Alert>
        )
      }
      {isLoading ? (
        <EnderecoRecomendadoSkeleton/>
      ) : (
        search && data?.proximoEndereco && status === 'success' && (
        <>
        <Tabs onChange={(index) => setTabIndex(index)} index={tabIndex} isFitted variant='enclosed-colored' mt={"4"} bg={"white"} borderRadius={"8px"} border={"1px solid #c0c0c065"}>
          <TabList mb='1em'>
            <Tab>Próximo endereço</Tab>
            <Tab>Endereços recomendados</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
                <Enderecamenento
                  proximoEndereco={data?.proximoEndereco}
                  setSearch={handleSearchClose}
                  documento={data?.documento}
                />
            </TabPanel>
            <TabPanel>
                <ListaEnderecos
                  caixas={data?.caixas}
                  onPageChange={setPage}
                  {...data?.proximoEndereco}
                  setSearch={setSearch}
                />
            </TabPanel>
          </TabPanels>
        </Tabs>
        </>
        )
      )}
    </>
  );
}