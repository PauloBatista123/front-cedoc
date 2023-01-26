import { Box, Flex, Image } from "@chakra-ui/react";

export function Footer(){
  return (
    <Flex
      height={"70px"}
      
      bg={"#00A091"}
      p={"4"}
      color={"white"}
      sx={{
        "box-shadow": "rgba(7, 53, 78, 0.568) 0px 35px 15px -32px;"
      }}
      
    >
      <Flex
        justifyContent={"space-between"}
        width={"100%"}
        maxW={"1440px"}
        margin={"0 auto"}

      >

          <Box boxSize={"28"}>
            <Image src={""} />
          </Box>
      </Flex>
      
    </Flex>
  );
}