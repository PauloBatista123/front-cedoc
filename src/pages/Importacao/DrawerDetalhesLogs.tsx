import { Box, Button, Card, CardBody, Grid, Text, Stack } from "@chakra-ui/react";
import { useState } from "react";
import InfinitScroll from "react-infinite-scroller";
import { RegistrosImportacao } from "../../utils/interfaces";

interface DrawerProps {
  registros?: RegistrosImportacao[];
  errors?: string;
};

export function DrawerDetalhesLogs({errors, registros}: DrawerProps){

  const itemsPerPage = 20;
  const [records, setRecords] = useState(itemsPerPage);
  const [hasMore, setHasMore] = useState(true);

  const showItens = (outputs?: {documento: number; status: string}[]) => {
    if(!outputs || !registros) return;
    var items = [];
    for (var i = 0; i < records; i++) {
      if(outputs[i] === undefined) continue;

      items.push(
          <Box flexDir={"column"} key={i} color={outputs[i].status.includes('erros') ? 'red.600' : ''}>
              <Text fontSize={"small"}>{outputs[i].documento}:</Text>
              <Text fontWeight={"bold"}>{outputs[i].status}</Text>
          </Box>
      )
    }

    return items;
  }

  const loadMore = () => {
    if(records === registros!.length){
      setHasMore(false);
    }else{
      setRecords(records + itemsPerPage);
    }
  }

  return (
    <Card variant={"elevated"}>
      <CardBody>
        {errors ? (
          <Text>{errors}</Text>
        ): (
          <InfinitScroll 
            pageStart={0}
            loadMore={() => loadMore}
            hasMore={hasMore}
            loader={<Stack my={"2"}><Button variant={"outline"} onClick={() => loadMore()}>Carregar mais...</Button></Stack>
            }
            useWindow={false}
          >
            <Grid gap={1} templateColumns={"repeat(3, 1fr)"}>
            {showItens(registros)}
            </Grid>
          </InfinitScroll>    
        )}
          
        
      </CardBody>
    </Card>
  )
  
}