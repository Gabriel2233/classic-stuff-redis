import {
  Button,
  CloseButton,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Layout } from "../components/Layout";

import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  url: yup.string().required(),
  description: yup.string().required(),
});

type FormValues = {
  name: string;
  url: string;
  description: string;
};

export default function CreateClassic() {
  const { back } = useRouter();
  const { errors, handleSubmit, register } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  const createClassic = handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <Layout>
      <Header>
        <CloseButton onClick={() => back()} mx={4} />
      </Header>

      <Heading w="full" textAlign="center" my={6}>
        Create a new Classic
      </Heading>

      <Flex w="full" align="center" justify="center" p={16}>
        <Flex
          w="50%"
          align="center"
          justify="center"
          flexDir="column"
          as="form"
          onSubmit={createClassic}
        >
          <FormControl isInvalid={errors && errors.name}>
            <Input
              placeholder="Classic Name"
              p={6}
              my={2}
              name="name"
              ref={register}
            />
            <FormErrorMessage>{"Classic Name is required"}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors && errors.url}>
            <Input
              placeholder="Classic Image (URL)"
              p={6}
              my={2}
              name="url"
              ref={register}
            />
            <FormErrorMessage>
              {"Classic Image URL is required"}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors && errors.description}>
            <Textarea
              my={2}
              placeholder="What is it used for?"
              name="description"
              p={6}
              resize="none"
              minH="125px"
              ref={register}
            />

            <FormErrorMessage>
              {"Classic Description is required"}
            </FormErrorMessage>
          </FormControl>

          <Button
            w="100%"
            p={6}
            bg="blue.500"
            color="white"
            borderWidth={2}
            _hover={{
              bg: "white",
              color: "blue.500",
              borderColor: "blue.500",
            }}
            type="submit"
          >
            Save
          </Button>
        </Flex>

        <Flex w="50%" align="center" justify="center" flexDir="column">
          a
        </Flex>
      </Flex>
    </Layout>
  );
}
