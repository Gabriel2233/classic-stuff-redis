import { Flex, Heading, Icon } from "@chakra-ui/react";
import { ReactNode } from "react";
import { GiOldKing } from "react-icons/gi";

export const Header = ({ children }: { children: ReactNode }) => {
  return (
    <Flex
      w="full"
      align="center"
      justify="space-between"
      p={6}
      borderWidth={2}
      borderColor="gray.200"
    >
      <Flex align="center">
        <Icon as={GiOldKing} fontSize="33px" />
        <Heading size="md" mx={2}>
          Classic Stuff
        </Heading>
      </Flex>

      <Flex align="center">{children}</Flex>
    </Flex>
  );
};
