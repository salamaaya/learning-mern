import React from 'react'
import { Container, VStack, Text, SimpleGrid } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useProductStore } from '../store/product';
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products",products);

  return (
    <Container maxW='container.x1' py={12}>
      <VStack spacing={8}>
      <Text 
          bgGradient='linear(to-r, gray.300, yellow.400, pink.200)'
          bgClip='text'
          fontSize='6xl'
          fontWeight='extrabold'
        >
          Current Products
        </Text>

        <SimpleGrid
          columns={{
            base:1,
            md:2,
            lg:3
          }}
          spacing={10}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length == 0 && (
          <Text fontSize={"x1"} textAlign={"center"} fontWeight={'bold'} color={'gray.500'}>
            No products found :( {" "}
              <Link to={"/create"}>
                <Text as={'span'} color={'blue.500'} _hover={{ textDecoration: "underline" }}>
                  Create a product
                </Text>
              </Link>
          </Text>
        )}
      </VStack>
    </Container>
  )
}

export default HomePage