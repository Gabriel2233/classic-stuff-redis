import { Button, Flex, Heading, Icon } from "@chakra-ui/react";

import { FiHeart } from "react-icons/fi";

export const MatterElement = () => {
  return (
    <Flex
      w="full"
      align="center"
      justify="space-between"
      my={4}
      borderWidth={2}
      borderColor="gray.200"
      rounded="4px"
      py={6}
    >
      <Heading size="md" px={4}>
        Matter Test test
      </Heading>

      <Button bg="white" color="red.500" _hover={{ bg: "red.100" }} mx={4}>
        <Icon as={FiHeart} mr={2} />0
      </Button>
    </Flex>
  );
};
