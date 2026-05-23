import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
  Text,
  useColorModeValue,
  useToast
} from "@chakra-ui/react";
const API_URL = import.meta.env.VITE_API_URL;


function LoginPage() {
    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const toast = useToast();
  

  const bg = useColorModeValue("white", "gray.800");
  const shadow = useColorModeValue("lg", "dark-lg");
  

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    console.log(data);

    if (data.success) {
        toast({
            title: "Login successful",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top",
            });
      localStorage.setItem("token", data.token);
      window.dispatchEvent(new Event("authChange"));
      navigate("/");
    } else {
      toast({
        title: "Login failed",
        description: data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
        });
    }
  };

  return (
    <Container maxW="md" mt={20}>
      <Box
        bg={bg}
        p={8}
        borderRadius="2xl"
        boxShadow={shadow}
        border="1px solid"
        borderColor="gray.200"
      >
        <VStack spacing={5}>
          <Heading size="lg">Welcome Back 👋</Heading>

          <Text fontSize="sm" color="gray.500">
            Login to continue to Product Store
          </Text>

          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="lg"
          />

          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="lg"
          />

          <Button
            colorScheme="blue"
            width="full"
            size="lg"
            onClick={handleLogin}
          >
            Login
          </Button>

          <Text fontSize="sm" color="gray.500">
            Don’t have an account? Sign up
          </Text>
        </VStack>
      </Box>
    </Container>
  );
}

export default LoginPage;