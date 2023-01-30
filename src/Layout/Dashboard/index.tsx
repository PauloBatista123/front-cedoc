import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Outlet } from 'react-router-dom';
import { NavBar } from "../../components/NavBar";
import { Footer } from "../../components/Footer";

export function Dashboard(){
  return (
    <Flex
      width={'100%'}
      flexDirection="column"
      sx={{
        "background-image": "linear-gradient(359deg, rgba(25, 25, 25, .02) 0%, rgba(25, 25, 25, .02) 8%, transparent 8%, transparent 27%, rgba(152, 152, 152, .02) 27%, rgba(152, 152, 152, .02) 80%, rgba(142, 142, 142, .02) 80%, rgba(142, 142, 142, .02) 100%), linear-gradient(250deg, rgba(9, 9, 9, .02) 0%, rgba(9, 9, 9, .02) 33%, transparent 33%, transparent 40%, rgba(240, 240, 240, .02) 40%, rgba(240, 240, 240, .02) 68%, rgba(141, 141, 141, .02) 68%, rgba(141, 141, 141, .02) 100%), linear-gradient(107deg, rgba(229, 229, 229, .02) 0%, rgba(229, 229, 229, .02) 12%, transparent 12%, transparent 24%, rgba(89, 89, 89, .02) 24%, rgba(89, 89, 89, .02) 38%, rgba(206, 206, 206, .02) 38%, rgba(206, 206, 206, .02) 100%), linear-gradient(64deg, rgba(49, 49, 49, .02) 0%, rgba(49, 49, 49, .02) 33%, transparent 33%, transparent 73%, rgba(191, 191, 191, .02) 73%, rgba(191, 191, 191, .02) 78%, rgba(83, 83, 83, .02) 78%, rgba(83, 83, 83, .02) 100%), linear-gradient(90deg, rgb(255, 255, 255), rgb(255, 255, 255))"
      }}
      minHeight={"100vh"}

    >
      <Header />
      <NavBar />
      {/* render children routes from dashboard */}

    <Box
      maxW={"1440px"}
      justifyContent="center"
      margin={"0 auto"}
      width="100%"
      mt={"4"}
      mb={"24"}
    >
      <Outlet />
    </Box>

      
      {/* render children routes from dashboard */}
    </Flex>
  );
}