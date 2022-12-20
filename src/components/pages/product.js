import {
    Text,
    Divider,
    Box,
    Image,
    Button,
    SimpleGrid,
    Stack,
    Flex,
    Card,
    Heading,
  } from "@chakra-ui/react";
  import { FiShoppingCart, FiShoppingBag } from "react-icons/fi";
  import { useState, useEffect } from "react";
  import Butter from "buttercms";
  
  const butter = Butter(process.env.REACT_APP_BUTTER_ECOMMERCE);
  
  const Product=()=> {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      async function fetchData() {
        const res = await butter.content.retrieve(["cookies"], {
          order: "name",
        });
        const { data } = await res.data;
        const allProducts = data.cookies;
        setProducts(allProducts);
      }
      fetchData();
    }, []);
  
    return (
      <Box >
        <Flex justifyContent="space-between" alignContent="center">
          <Text
            as="a"
            fontSize="2rem"
            color="gray.900"
            fontFamily="Robo"
            my="5px"
          >
          MY SHOP
          </Text>
          <Button
            my="5px"
            colorScheme="green"
            variant="ghost"
            leftIcon={<FiShoppingBag size="24px" />}
            size="lg"
            p={2}
            className="snipcart-checkout"
          >
            View Cart
          </Button>
        </Flex>
        <Divider />
        <Box mt={2}>
          <SimpleGrid columns={[4]} 
            align="center"
            justify="center"
            spacing="10px"
          >
            {products.map((product) => (
              <Card
                bg="white"
                h='350px'
                w='300px'
                borderWidth="1px"
                rounded="lg"
                shadow="lg"
                _hover={{ shadow: "dark-lg" }}
                key={product.id}
              >
                <Image
                  h="150px"
                  fit="cover"
                  src={product.image}
                  alt={`Picture of ${product.name}`}
                  roundedTop="lg"
                />
  
                <Stack mt='2' spacing='1'>
                    <Heading
                      fontSize="xl"
                      fontWeight="semibold"
                      textTransform="uppercase"
                      fontFamily='sans-serif'
                    >
                      {product.name}
                    </Heading>
                    <Text>

                        {product.description}
                    </Text>
                  <Text
                      fontSize="xl"
                      fontWeight="bold"
                      color="teal.600"
                    >
                      ${product.price}
                    </Text>
                    
                  <Button
                    leftIcon={<FiShoppingCart size="24px" />}
                    size="lg"
                    mt={4}
                    isFullWidth
                    colorScheme="blue"
                    variant="outline"
                    alignSelf={"center"}
                    className="snipcart-add-item"
                    data-item-id={product.id}
                    data-item-image={product.image}
                    data-item-name={product.name}
                    data-item-url="/"
                    data-item-description={product.description}
                    data-item-price={product.price}
                  >
                    Add to Cart
                  </Button>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    );
  }
  
  export default Product;