import { Box, useDisclosure } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import {useFormContext} from "react-hook-form";
import { ListBlank } from "../../components/ListBlank";
import { useDocumentos } from "../../hooks/Documento/useDocumento";
import { Documento, Endereco } from "../../utils/interfaces";
import { ActionList } from "./ActionList";
import { SkeletonLista } from "./SkeletonLista";
import { TableList } from "./TableList";

export function Lista(){
  const [enderecoDelete, setDocumentoDelete] = useState<undefined | Documento>(undefined);
  const [enderecoEdit, setDocumentoEdit] = useState<undefined | Documento>(undefined);
  const { watch } = useFormContext();
  const [filter, setFilter] = useState<{}>({});
  const filtrar = watch("actionFilter");
  const [page, setPage] = useState(1);
  const { data, isLoading } = useDocumentos({ page, filter });
  const { onClose: onCloseDelete, isOpen: isOpenDelete, onOpen: onOpenDelete } = useDisclosure();
  const { onClose: onCloseEdit, isOpen: isOpenEdit, onOpen: onOpenEdit } = useDisclosure();

  // monitorar campo e setar estado do filtro
  useEffect(() => {
    if (filtrar !== undefined) {
      setFilter(filtrar);
    }
  }, [filtrar])

  return (
    <Fragment>

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
              onOpenDelete={onOpenDelete}
              onOpenEdit={onOpenEdit}
              onPageChange={setPage}
              setDocumentoDelete={setDocumentoDelete}
              setDocumentoEdit={setDocumentoEdit}
            />
          }

        </Box>
      )}
    </Fragment>
  );
}