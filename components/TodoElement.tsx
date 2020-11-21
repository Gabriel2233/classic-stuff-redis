import { Button, Flex, Heading, Icon, useToast } from "@chakra-ui/react";

import { FiHeart } from "react-icons/fi";
import { mutate } from "swr";
import { TodoDataProps } from "../pages";

export const TodoElement = ({ todoData }: { todoData: TodoDataProps }) => {
  const toast = useToast();

  const upvote = async (id: string) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
      };

      const res = await fetch("/api/vote", requestOptions);

      const data = await res.json();

      toast({
        title: data.body === "1" ? "Success" : "Error",
        status: data.body === "1" ? "success" : "error",
        duration: 3000,
        position: "top-right",
        isClosable: true,
        description:
          data.body === "1" ? "Successfully upvoted this todo" : data.body,
      });

      mutate("/api/list");
    } catch (err) {
      alert(err.message);
    }
  };

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
        {todoData.name}
      </Heading>

      <Button
        bg="white"
        color="red.500"
        _hover={{ bg: "red.100" }}
        mx={4}
        onClick={() => upvote(todoData.id)}
      >
        <Icon as={FiHeart} mr={2} /> {todoData.score}
      </Button>
    </Flex>
  );
};
