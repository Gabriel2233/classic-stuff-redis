import { Button, Flex, Grid, Input, Textarea } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Layout } from "../components/Layout";

import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <Header>
        <Link href="/create-classic">
          <Button
            bg="blue.500"
            color="white"
            p={4}
            mx={6}
            _hover={{ bg: "blue.400" }}
          >
            New Classic
          </Button>
        </Link>
      </Header>

      <Flex w="full" align="center" justify="center" my={8} flexDir="column">
        <Grid
          pt={8}
          gridTemplateColumns={"repeat(auto-fit, minmax(300px, 1fr))"}
          bg="red"
          maxW="980px"
          m="auto"
          w="90%"
          gap="15px"
        >
          {[1, 2, 3, 4, 5].map((el) => (
            <Flex w="74" h="74" key={el} background="red.500">
              Test
            </Flex>
          ))}
        </Grid>
      </Flex>
    </Layout>
  );
}
