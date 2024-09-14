import { Button, Container, Flex, HStack, Text, useColorMode, useColorModeValue} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PlusSquareIcon, MoonIcon, SunIcon } from "@chakra-ui/icons"

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
  <Container maxW={"1140px"} px={4} bg={useColorModeValue("gray.100", "gray.900")}>
    <Flex 
      h={16} 
      alignItems={"center"} 
      justifyContent={"space-between"}
      flexDir={{
        base:"column",
        sm:"row"
      }}>

        <Text 
          bgGradient='linear(to-r, gray.300, yellow.400, pink.200)'
          bgClip='text'
          fontSize='6xl'
          fontWeight='extrabold'
        >
          <Link to={"/"}>Product Store</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <PlusSquareIcon fontSize={20} />
            </Button>
          </Link>
          <Button onClick={ toggleColorMode }>
              {colorMode === "light" ? <MoonIcon fontSize={20} /> : <SunIcon fontSize={20} />}
          </Button>
        </HStack>
    </Flex>
  </Container>
)};

export default Navbar