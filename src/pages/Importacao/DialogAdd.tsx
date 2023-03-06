import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormErrorMessage, Input, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FloppyDisk } from "phosphor-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutationAdd } from "../../hooks/Importacao/useMutationAdd";
import { newFormDataImportarDossies, validationSchemaImportarDossies } from "../../utils/schemas";

interface DialogAddProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DialogAdd({isOpen, onClose}: DialogAddProps){

  const {register, formState: {isSubmitting}, handleSubmit, reset} = useForm<newFormDataImportarDossies>({
    resolver: zodResolver(validationSchemaImportarDossies)
  });

  const mutationAdd = useMutationAdd(); 

  const handleImportDossies = (data: newFormDataImportarDossies) => {
    mutationAdd.mutateAsync(data);
    mutationAdd.isSuccess && reset();
  }

  return(
    <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        size={"lg"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader
           borderBottom="1px solid #ece7e7a9"
          >
            Importar novo arquivo
          </DrawerHeader>

          <DrawerBody>
            {/* formulário de cadastro */}
            <Stack
              spacing={"4"}
            >
              <Text>Selecione o arquivo para enviar:</Text>
                
              <Input 
                placeholder="Arquivo..."
                type={"file"}
                variant={"flushed"}
                accept={".xlsx"}
                {...register("arquivo", {required: true})}
              />
            </Stack>
            {/* formulário de cadastro */}
          </DrawerBody>

          <DrawerFooter>

          <Box
            display={"flex"}
            flex={"1"}
            justifyContent={"flex-end"}
          >
          <Button
              variant={'outline'}
              borderColor={"gray.200"}
              size={'lg'}
              width={"50%"}
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
             variant={'solid'}
             borderColor={"gray.200"}
             size={'lg'}
             width={"50%"}
             ml={"2"}
             bgColor={"blue.700"}
             color={"white"}
             _hover={{
              bgColor: "blue.500"
             }}
             rightIcon={
              <FloppyDisk />
             }
             onClick={handleSubmit(handleImportDossies)}
             isLoading={mutationAdd.isLoading}
             loadingText={"Estamos enviando o arquivo..."}
            >
              Salvar
            </Button>
          </Box>

          </DrawerFooter>
        </DrawerContent>
      </Drawer>
  )
}