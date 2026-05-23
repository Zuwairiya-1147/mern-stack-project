import { Container, VStack, Text, SimpleGrid, Skeleton, Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product.js';
import ProductCard from "../Components-frontend/ProductCard";

const HomePage = () => {
  const store = useProductStore();
  const { fetchProducts, products, loading } = useProductStore();

  useEffect(() => {
    if (fetchProducts) {
      fetchProducts();
    }
  }, []);

  console.log("products", products);

  const ProductSkeleton = () => (
    <Box
      height="250px"
      borderRadius="xl"
      overflow="hidden"
      border="1px solid"
      borderColor="gray.200"
      p={4}
    >
      <Skeleton height="150px" mb={4} />
      <Skeleton height="20px" mb={2} />
      <Skeleton height="20px" width="60%" />
    </Box>
  );

 return (
  <Container maxW='container.xl' py={12}>
    <VStack spacing={8}>
      
      <Text
        fontSize={"30px"}
        fontWeight={"bold"}
        bgGradient={"linear(to-r, cyan.400, blue.500)"}
        bgClip={"text"}
        textAlign={"center"}
      >
        Current Products 🚀
      </Text>

      {/* LOADING STATE */}
      {loading && (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w="full">
          {[...Array(6)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </SimpleGrid>
      )}

      {/* PRODUCTS GRID */}
      {!loading && (
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={10}
          w="full"
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>
      )}

      {/* EMPTY STATE */}
      {!loading && products.length === 0 && (
        <Text fontSize='xl' textAlign="center" fontWeight="bold" color='gray.500'>
          No Products Found 😟{" "}
          <Link to="/create">
            <Text as="span" color="blue.500" _hover={{ textDecoration: "underline" }}>
              Create a product
            </Text>
          </Link>
        </Text>
      )}

    </VStack>
  </Container>
);
};

export default HomePage;