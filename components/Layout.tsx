import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Flex w="full" h="full" align="center" justify="center" flexDir="column">
      {children}
    </Flex>
  );
};
