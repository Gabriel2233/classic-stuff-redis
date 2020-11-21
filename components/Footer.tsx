import { Flex, Link } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Flex
      w="full"
      align="center"
      justify="center"
      my={8}
      p={4}
      color="gray.500"
    >
      Made with ❤ by{" "}
      <Link href="https://github.com/Gabriel2233" target="_blank" ml={1}>
        Gabriel Tiso
      </Link>
    </Flex>
  );
};
