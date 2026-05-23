import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./Components-frontend/Navbar";
import { useColorModeValue } from "@chakra-ui/react";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import ProtectedRoute from "./Components-frontend/ProtectedRoute";


function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<HomePage/>} />
        <Route path="/create" element={<ProtectedRoute><CreatePage /></ProtectedRoute>} />
      </Routes>
    </Box>
  );
}

export default App;