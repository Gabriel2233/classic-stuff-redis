import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Icon,
  Input,
  Skeleton,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Layout } from "../components/Layout";
import { TodoElement } from "../components/TodoElement";

import { BsCheckCircle } from "react-icons/bs";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useSWR, { mutate } from "swr";
import { FormEvent, useState } from "react";
import createRouteLoader from "next/dist/client/route-loader";
import { Footer } from "../components/Footer";

export type TodoDataProps = {
  id: string;
  name: string;
  score: string;
};

type FormValues = {
  name: string;
};

const validationSchema = yup.object().shape({
  name: yup.string().required(),
});

const fetcher = async (url: string) => {
  const res = await fetch(url);

  const data = await res.json();

  return data;
};

export default function Home() {
  const { errors, register, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  const [creationLoading, setCreationLoading] = useState<boolean>(false);

  // Use this function to create a new Todo
  // On the Form: onSubmit={handleSubmit(onCreate)}

  const onCreate = async (data: { name: string }) => {
    setCreationLoading(true);

    try {
      const requestOptions: RequestInit = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name }),
      };

      const res = await fetch("/api/create-todo", requestOptions);

      if (res.ok) {
        toast({
          title: "Success!",
          status: "success",
          duration: 3000,
          position: "top-right",
          description: "Your todo was created!",
        });
      }

      mutate("/api/list");

      setCreationLoading(false);
    } catch (err) {
      toast({
        title: "Error",
        status: "error",
        description: err.message,
        duration: 3000,
        position: "top-right",
      });
    }
  };

  const { data, error } = useSWR("/api/list", fetcher);

  const toast = useToast();

  if (error) return "Error while fetching";

  const notAvailableMessage = (e: FormEvent) => {
    e.preventDefault();
    toast({
      title: "Not Available",
      status: "error",
      duration: 6000,
      position: "top-right",
      isClosable: true,
      description:
        "For the sake of the demo, I removed this functionality, but everything works perfectly in the original project.",
    });
  };

  return (
    <Layout>
      <Header>{}</Header>

      <Flex
        w={["80%", null, "50%"]}
        align="center"
        justify="center"
        my={6}
        flexDir="column"
      >
        {data
          ? data.map((todo: TodoDataProps) => (
              <TodoElement key={todo.id} todoData={todo} />
            ))
          : [1, 2, 3].map((fake) => (
              <Skeleton
                p={4}
                my={4}
                w="full"
                h="80px"
                startColor="gray.500"
                endColor="gray.200"
                key={fake}
              />
            ))}
      </Flex>

      <Flex
        w={["80%", null, "50%"]}
        align="center"
        justify="center"
        flexDir="column"
        as="form"
        onSubmit={notAvailableMessage}
      >
        <FormControl
          isInvalid={errors && errors.name && errors.name.message && true}
        >
          <Input
            placeholder="Add a new Todo"
            p={6}
            my={2}
            name="name"
            ref={register}
          />
          <FormErrorMessage>
            {errors && errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>

        <Button
          bg="blue.500"
          color="white"
          alignSelf="start"
          my={2}
          _hover={{ bg: "blue.400" }}
          type="submit"
        >
          {creationLoading ? (
            <Spinner />
          ) : (
            <>
              <Icon as={BsCheckCircle} mr={2} /> Confirm
            </>
          )}
        </Button>
      </Flex>

      <Footer />
    </Layout>
  );
}
