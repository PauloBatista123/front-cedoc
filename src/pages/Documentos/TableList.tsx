import { SimpleGrid } from "@chakra-ui/react";
import { useCallback } from "react";
import { Pagination } from "../../components/Pagination/Index";
import { MetaPagination, Documento } from "../../utils/interfaces";
import { Item } from "./Item";


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
        <Item 
          documento={documento}
          handleDetalhes={handleDetalhes}        
        />
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