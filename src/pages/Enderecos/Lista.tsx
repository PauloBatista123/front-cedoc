import { Box, useDisclosure } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import {useFormContext} from "react-hook-form";
import { ListBlank } from "../../components/ListBlank";
import { useEnderecos } from "../../hooks/Endereco/useEndereco";
import { Endereco } from "../../utils/interfaces";
import { ActionList } from "./ActionList";
import { AlertDialogDelete } from "./DialogDelete";
import { DialogEditEndereco } from "./DialogEdit";
import { SkeletonLista } from "./SkeletonLista";
import { TableList } from "./TableList";

export function Lista(){
  const [enderecoDelete, setEnderecoDelete] = useState<undefined | Endereco>(undefined);
  const [enderecoEdit, setEnderecoEdit] = useState<undefined | Endereco>(undefined);
  const { watch } = useFormContext();
  const [filter, setFilter] = useState<{}>({});
  const filtrar = watch("actionFilter");
  const [page, setPage] = useState(1);
  const { data, isLoading } = useEnderecos({ page, filter });
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

      {enderecoDelete && (
        <AlertDialogDelete
          isOpen={isOpenDelete}
          mensagem={"Deseja realmente deletar o endereco? Não será possível reverter a ação."}
          onClose={onCloseDelete}
          titulo={"Deletar Endereco"}
          endereco={enderecoDelete}
          key={"deletar-endereco"}
        />
      )}

      {enderecoEdit && (
        <DialogEditEndereco
          isOpen={isOpenEdit}
          onClose={onCloseEdit}
          endereco={enderecoEdit}
          key={"editar-endereco"}
        />
      )}

      {isLoading ? (

        <SkeletonLista />

      ) : (
        <Box>
          <ActionList />
          
          {data?.enderecos.length === 0
            ?
            <ListBlank />
            :
            <TableList
              meta={data?.meta}
              enderecos={data?.enderecos}
              onOpenDelete={onOpenDelete}
              onOpenEdit={onOpenEdit}
              onPageChange={setPage}
              setEnderecoDelete={setEnderecoDelete}
              setEnderecoEdit={setEnderecoEdit}
            />
          }

        </Box>
      )}
    </Fragment>
  );
}