import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Icon,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Layout } from "../components/Layout";

import { BsCheckCircle } from "react-icons/bs";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useSWR, { mutate } from "swr";
import { MatterElement } from "../components/MatterElement";

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

  const onCreate = async (data: { name: string }) => {
    try {
      const requestOptions: RequestInit = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name }),
      };

      const res = await fetch("/api/create-matter", requestOptions);

      if (res.ok) {
        toast({
          title: "Success!",
          status: "success",
          duration: 3000,
          position: "top-right",
          description: "Your matter was created!",
        });
      }

      mutate("/api/list");
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
  if (!data) return "Loadinf data...";

  return (
    <Layout>
      <Header>{}</Header>

      <Flex w="50%" align="center" justify="center" my={8} flexDir="column">
        {data.map((matter: TodoDataProps) => (
          <MatterElement key={matter.id} matterData={matter} />
        ))}
      </Flex>

      <Flex
        w="50%"
        align="center"
        justify="center"
        flexDir="column"
        as="form"
        onSubmit={handleSubmit(onCreate)}
      >
        <FormControl isInvalid={errors && errors.name && errors.name.message}>
          <Input
            placeholder="Add a new Matter"
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
          <Icon as={BsCheckCircle} mr={2} /> Confirm
        </Button>
      </Flex>
    </Layout>
  );
}
