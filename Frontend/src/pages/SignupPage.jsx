import React, { useState } from "react";
import { Container, VStack, Input, Button, Heading,useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const toast = useToast();
const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        toast({
            title: "Signup successful",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top",
            });
        navigate("/login");
      } else {
        toast({
        title: "Signup failed",
        description: data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
        });
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <Container maxW="sm">
      <VStack spacing={4} mt={10}>
        <Heading>Signup</Heading>

        <Input
          placeholder="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <Input
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <Input
          placeholder="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />

        <Button colorScheme="blue" w="full" onClick={handleSignup}>
          Signup
        </Button>
      </VStack>
    </Container>
  );
};

export default Signup;