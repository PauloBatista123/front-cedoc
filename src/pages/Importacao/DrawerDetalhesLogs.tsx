import { Box, Button, Card, CardBody, Grid, Text, Stack } from "@chakra-ui/react";
import { useState } from "react";
import InfinitScroll from "react-infinite-scroller";

interface DetalhesLogsProps {
  registros?: {
    documento: number;
    status: string;
  }[]
}

export function DrawerDetalhesLogs({registros}: DetalhesLogsProps){
  const itemsPerPage = 20;
  const [records, setRecords] = useState(itemsPerPage);
  const [hasMore, setHasMore] = useState(true);

  const showItens = (outputs?: {documento: number; status: string}[]) => {
    if(!outputs || !registros) return;
    var items = [];
    for (var i = 0; i < records; i++) {
      if(outputs[i] === undefined) continue;

      items.push(
          <Box flexDir={"column"} key={i}>
              <Text fontSize={"small"}>{outputs[i].documento}:</Text>
              <Text fontWeight={"bold"}>{outputs[i].status}</Text>
          </Box>
      )
    }

    return items;
  }

  const loadMore = () => {
    if(records === registros!.length){
      console.log(hasMore);
      setHasMore(false);
    }else{
      setRecords(records + itemsPerPage);
    }
  }

  return (
    <Card variant={"elevated"}>
      <CardBody>
        
        <InfinitScroll 
          pageStart={0}
          loadMore={() => loadMore}
          hasMore={hasMore}
          loader={<Stack my={"2"}><Button variant={"outline"} onClick={() => loadMore()}>Carregar mais...</Button></Stack>
          }
          useWindow={false}
        >
          <Grid gap={1} templateColumns={"repeat(4, 1fr)"}>
          {showItens(registros)}
          </Grid>
        </InfinitScroll>
        
      </CardBody>
    </Card>
  )
}