import { Box, useDisclosure } from "@chakra-ui/react";
import { ListBlank } from "../../components/ListBlank";
import {Fragment, useEffect, useState} from 'react'
import { SkeletonLista } from "./SkeletonLista";
import { TableList } from "./TableList";
import { useImportacao } from "../../hooks/Importacao/useImportacao";
import { DrawerDetalhes } from "./DrawerDetalhes";
import { Importacao } from "../../utils/interfaces";
import { DialogAdd } from "./DialogAdd";
import { ActionList } from "./ActionList";

export function Lista(){
  const [importDetalhes, setImportDetalhes] = useState<undefined | Importacao>(undefined);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useImportacao({ page, filter: {} });
  const { onClose: onCloseDetalhes, isOpen: isOpenDetalhes, onOpen: onOpenDetalhes } = useDisclosure();
  const { onClose: onCloseAdicionar, isOpen: isOpenAdicionar, onOpen: onOpenAdicionar } = useDisclosure();

  return (
    <Fragment>
    {/* DETALHES */}
    {importDetalhes && (
        <DrawerDetalhes 
          isOpen={isOpenDetalhes}
          onClose={onCloseDetalhes}
          id={importDetalhes.id}
          key={"editar-arquivo"}
        />
    )}

      {isLoading ? (

        <SkeletonLista />

      ) : (
        <Box>
          <ActionList />
          {data?.registros.length === 0
            ?
            <ListBlank />
            :
            <TableList
              meta={data?.meta}
              registros={data?.registros}
              onPageChange={setPage}
              onOpenDetalhes={onOpenDetalhes}
              setImportDetalhes={setImportDetalhes}
            />
          }

        </Box>
      )}
    </Fragment>
  );
}