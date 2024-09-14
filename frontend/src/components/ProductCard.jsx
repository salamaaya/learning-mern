import { Card, CardBody, Image, Stack, Heading, 
    Text, Divider, CardFooter, Button, 
    useColorModeValue, 
    useToast} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { Modal, ModalOverlay, ModalHeader,
    ModalContent, ModalCloseButton,
    ModalBody, FormControl, FormLabel,
    Input, ModalFooter
 } from '@chakra-ui/react';
 import { useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";

const ProductCard = ({ product }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const bg = useColorModeValue("white", "gray.800");

    const {deleteProduct, editProduct} = useProductStore();
    const toast = useToast();

    const [updateProduct, setUpdateProduct] = useState(product);

    const handleEditProduct = async (productId, updatedProduct) => {
        const {success, message} = await editProduct(productId, updatedProduct);
        if(!success) {
            toast({
                title:"Error",
                description: message,
                status:"error",
                isClosable:true,
              });
        }
        else {
            toast({
                title:"Success",
                description: message,
                status:"success",
                isClosable:true,
              });
        };
        onClose();
    };

    const handleDeleteProduct = async (productId) => {
        const {success, message} = await deleteProduct(productId);
        if(!success) {
            toast({
                title:"Error",
                description: message,
                status:"error",
                isClosable:true,
              });
        }
        else {
            toast({
                title:"Success",
                description: message,
                status:"success",
                isClosable:true,
              });
        }
    };

  return (
    <Card maxW='sm' bg={bg}>
        <CardBody>
            <Image
            src={product.image}
            alt={product.name}
            borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
                <Heading size='md'>{product.name}</Heading>
                <Text color='blue.600' fontSize='2xl'>
                    {product.price}
                </Text>
            </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
            <>
            <Button onClick={onOpen} variant='solid' colorScheme='blue'> Edit </Button>
  
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Edit Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input ref={initialRef} placeholder='Name' value={updateProduct.name} 
                        onChange={(e) => setUpdateProduct({ ...updateProduct, name: e.target.value })}/>
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Price</FormLabel>
                        <Input placeholder='Price' value={updateProduct.price}
                        onChange={(e) => setUpdateProduct({ ...updateProduct, price: e.target.value })}/>
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Image URL</FormLabel>
                        <Input placeholder='Image URL' value={updateProduct.image}
                        onChange={(e) => setUpdateProduct({ ...updateProduct, image: e.target.value })}/>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={() => handleEditProduct(product._id, updateProduct)} colorScheme='blue' mr={3}>
                    Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
            </>
           
            <Button onClick={() => handleDeleteProduct(product._id)} variant='ghost' colorScheme='red'>
                Delete
            </Button>
        </CardFooter>
    </Card>
  )
};

export default ProductCard;