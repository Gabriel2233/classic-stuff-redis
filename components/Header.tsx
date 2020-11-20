import { Flex, Heading, Icon } from "@chakra-ui/react";
import { ReactNode } from "react";
import { ImEarth } from "react-icons/im";

export const Header = ({ children }: { children: ReactNode }) => {
  return (
    <Flex w="60%" align="center" justify="space-between" p={6} my={4}>
      <Flex align="center">
        <Icon as={ImEarth} fontSize="33px" />
        <Heading size="md" mx={2}>
          Earth Helper
        </Heading>
      </Flex>

      <Flex align="center">{children}</Flex>
    </Flex>
  );
};
