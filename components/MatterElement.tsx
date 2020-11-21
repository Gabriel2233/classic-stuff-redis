import { Button, Flex, Heading, Icon } from "@chakra-ui/react";

import { FiHeart } from "react-icons/fi";
import { mutate } from "swr";
import { TodoDataProps } from "../pages";

export const MatterElement = ({
  matterData,
}: {
  matterData: TodoDataProps;
}) => {
  const upvote = async (id: string) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
      };

      const res = await fetch("/api/vote", requestOptions);

      const body = await res.json();

      console.log(body);

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
        {matterData.name}
      </Heading>

      <Button
        bg="white"
        color="red.500"
        _hover={{ bg: "red.100" }}
        mx={4}
        onClick={() => upvote(matterData.id)}
      >
        <Icon as={FiHeart} mr={2} /> {matterData.score}
      </Button>
    </Flex>
  );
};
