import React from 'react'
import { Container, Flex, HStack, Text, Button,useColorMode } from '@chakra-ui/react'
import { base } from 'framer-motion/client'
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from 'react-icons/io5';
import { LuSun } from 'react-icons/lu';
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    const navigate = useNavigate();

    const location = useLocation();

    const [isLoggedIn, setIsLoggedIn] = React.useState(
        !!localStorage.getItem("token")
    );

    React.useEffect(() => {
        const handleAuthChange = () => {
        setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("authChange", handleAuthChange);

    return () => {
         window.removeEventListener("authChange", handleAuthChange);
    };
    }, []);

    const handleLogout = () => {
  localStorage.removeItem("token");
  setIsLoggedIn(false);
  window.dispatchEvent(new Event("authChange"));
  navigate("/login");
};

  return (
    <Container maxW={"1140px"} px={4} >
        <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
            base:"column",
            sm:"row"
        }}>
            <Text
            fontSize={{ base: "22px", sm: "28px"}}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            textAlign={"center"}
            bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip={"text"}
            >
                <Link to={"/"}>Product Store 🛒</Link>
            </Text>

            <HStack spacing={2} alignItems={"center"}>
                {isLoggedIn && (
                        <Button as={Link} to="/create" variant="ghost">
                            <PlusSquareIcon boxSize={5} />
                        </Button>
                )}
                <Button onClick={toggleColorMode}>
                    {colorMode === "light" ? <IoMoon/> : <LuSun size="20"/>}
                </Button>
                {!isLoggedIn ? (
                    <HStack>
                      <Button as={Link} to="/signup">
                         Signup
                      </Button>

                      <Button as={Link} to="/login" colorScheme="blue">
                         Login
                      </Button>
                    </HStack>
                 ) : (
                    <Button onClick={handleLogout}>
                       Logout
                    </Button>
                 )}
            </HStack>
        </Flex>
    </Container>
  )
}

export default Navbar
