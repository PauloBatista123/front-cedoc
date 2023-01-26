import { ChakraProvider, Flex } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { theme } from "./styles/theme";
import {QueryClientProvider} from '@tanstack/react-query';
import { queryClient } from "./lib/reactQuery";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />

        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  );
}