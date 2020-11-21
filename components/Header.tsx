import { Flex, Heading, Icon } from "@chakra-ui/react";
import { ReactNode } from "react";
import { ImEarth } from "react-icons/im";

export const Header = ({ children }: { children: ReactNode }) => {
  return (
    <Flex
      w={["100%", null, "60%"]}
      align="center"
      justify="space-between"
      py={8}
    >
      <Flex align="center">
        <Icon as={ImEarth} fontSize="33px" />
        <Heading size="md" mx={2}>
          Global Todo List
        </Heading>
      </Flex>

      <Flex align="center">{children}</Flex>
    </Flex>
  );
};
