import { Badge, Box, Card, CardBody, CardFooter, CardHeader, Flex, SimpleGrid, Text, Progress, ProgressLabel } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { Pagination } from "../../components/Pagination/Index";
import { MetaPagination, Importacao } from "../../utils/interfaces";
import { ItemProgress } from "./Item/Progress";
import { ItemSucess } from "./Item/Success";


interface TableListProps {
  registros: Importacao[] | undefined;
  meta: MetaPagination | undefined;
  onPageChange?: (page: number) => void;
  onOpenDetalhes: () => void;
  setImportDetalhes: (registro: Importacao) => void;
}

export function TableList({registros, meta, onPageChange, onOpenDetalhes, setImportDetalhes}: TableListProps) {

  const [progress, setProgress] = useState(0);

  const handleDetalhes = useCallback((registro: Importacao) => {
    setImportDetalhes(registro);
    onOpenDetalhes();
  }, []);

  const loadProgress = useCallback(() => {
    setInterval(() => {

    });
  }, []);

  return (
    <>
    <SimpleGrid columns={{md: 2, lg: 3}} gap={"3"}>
    {registros?.map((registro) => (
      registro.input.status === 'progress' 
      ? 
      <ItemProgress key={registro.id} handleDetalhes={handleDetalhes} registro={registro} /> 
      : 
      <ItemSucess key={registro.id} handleDetalhes={handleDetalhes} registro={registro} /> 
    ))}
    </SimpleGrid>
    

    <Pagination 
      totalCountofRegisters={meta?.total}
      currentPage={meta?.current_page}
      onPageChange={onPageChange}
      numberToPage={meta?.to}
      lastPage={meta?.last_page}
      numberOfItens={registros?.length}
      registerPerPage={meta?.per_page}
    />
  </>
  )
}