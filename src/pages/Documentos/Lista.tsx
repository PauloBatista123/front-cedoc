import { Box, useDisclosure } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import {useFormContext} from "react-hook-form";
import { ListBlank } from "../../components/ListBlank";
import { useDocumentos } from "../../hooks/Documento/useDocumento";
import { Documento, Endereco } from "../../utils/interfaces";
import { ActionList } from "./ActionList";
import { DrawerDetalhes } from "./DrawerDetalhes";
import { SkeletonLista } from "./SkeletonLista";
import { TableList } from "./TableList";

export function Lista(){
  const [docDetalhes, setDocDetalhes] = useState<undefined | Documento>(undefined);
  const { watch } = useFormContext();
  const [filter, setFilter] = useState<{}>({});
  const filtrar = watch("actionFilter");
  const [page, setPage] = useState(1);
  const { data, isLoading } = useDocumentos({ page, filter });
  const { onClose: onCloseDetalhes, isOpen: isOpenDetalhes, onOpen: onOpenDetalhes } = useDisclosure();
  const { onClose: onCloseEdit, isOpen: isOpenEdit, onOpen: onOpenEdit } = useDisclosure();

  useEffect(() => {
    if (filtrar !== undefined) {
      setFilter(filtrar);
    }
  }, [filtrar]);

  return (
    <Fragment>

    {/* DETALHES */}
    {docDetalhes && (
          <DrawerDetalhes 
            isOpen={isOpenDetalhes}
            onClose={onCloseDetalhes}
            id={docDetalhes.id}
            key={"editar-tipo"}
          />
    )}

      {isLoading ? (

        <SkeletonLista />

      ) : (
        <Box>
          <ActionList />
          
          {data?.documentos.length === 0
            ?
            <ListBlank />
            :
            <TableList
              meta={data?.meta}
              documentos={data?.documentos}
              onPageChange={setPage}
              onOpenDetalhes={onOpenDetalhes}
              setDocDetalhes={setDocDetalhes}
            />
          }

        </Box>
      )}
    </Fragment>
  );
}