import { Avatar, Box, Divider, Flex, Image, Text } from "@chakra-ui/react";
import logoNova from "../../assets/logo_nova.png";


export function Header(){
  return(
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
            <Image src={logoNova} />
          </Box>

          <Flex
            direction={"row"}
            gap={"2"}
            alignItems={"center"}
          >
            <Divider orientation='vertical' color={"gray.300"} mx={"4"}/>
            
            <Box 
              my={"4"}
            >
              <Avatar name="Paulo Henrique"  bg={"#003641"} size={"sm"} color={"white"}/>
              
            </Box>
            <Text>Paulo Henrique</Text>
          </Flex>

      </Flex>
      
    </Flex>
  );
}