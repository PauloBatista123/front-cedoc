import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  IconButton,
  useDisclosure,
  HStack,
  Badge,
  Tooltip,
} from '@chakra-ui/react'
import { Fragment, useEffect, useState } from "react";
import { Pagination } from '../../components/Pagination/Index';
import { useUnidades } from '../../hooks/Unidade/useUnidades';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa'
import { SkeletonLista } from './SkeletonLista';
import { ActionList } from './ActionList';
import { AlertDialogDelete } from './DialogDelete';
import { Unidade } from '../../utils/interfaces';
import { ListBlank } from '../../components/ListBlank';
import { useFormContext } from 'react-hook-form';
import { DialogEditUnidade } from './DialogEdit';
import { TableList } from './TableList';

export function Lista() {

  const [unidadeDelete, setUnidadeDelete] = useState<undefined | Unidade>(undefined);
  const [unidadeEdit, setUnidadeEdit] = useState<undefined | Unidade>(undefined);
  const { watch } = useFormContext();
  const [filter, setFilter] = useState<{}>({});
  const filtrar = watch("actionFilter");
  const [page, setPage] = useState(1);
  const { data, isLoading } = useUnidades({ page, filter });
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

      {/* DIALOG DELETE */}
      {unidadeDelete && (
        <AlertDialogDelete
          isOpen={isOpenDelete}
          mensagem={"Deseja realmente deletar a unidade? Não será possível reverter a ação."}
          onClose={onCloseDelete}
          titulo={"Deletar Unidade"}
          unidades={unidadeDelete}
          key={"deletar-unidade"}
        />
      )}

      {/* DIALOG EDIT */}
      {unidadeEdit && (
        <DialogEditUnidade
          isOpen={isOpenEdit}
          onClose={onCloseEdit}
          unidade={unidadeEdit}
          key={"editar-unidade"}
        />
      )}

      {isLoading ? (

        <SkeletonLista />

      ) : (
        <Box>
          <ActionList />

          {data?.unidades.length === 0
            ?
            <ListBlank />
            :
            <TableList
              meta={data?.meta}
              unidades={data?.unidades}
              onOpenDelete={onOpenDelete}
              onOpenEdit={onOpenEdit}
              onPageChange={setPage}
              setUnidadeDelete={setUnidadeDelete}
              setUnidadeEdit={setUnidadeEdit}
            />
          }

        </Box>
      )}
    </Fragment>
  );
}