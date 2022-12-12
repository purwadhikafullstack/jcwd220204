import React, { useEffect, useRef, useState } from "react"
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Image,
  HStack,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  VStack,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Flex,
  CloseButton,
} from "@chakra-ui/react"
import { BsThreeDotsVertical, BsUpload } from "react-icons/bs"
import { axiosInstance } from "../../api"
import { Link, useParams } from "react-router-dom"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { BiEditAlt } from "react-icons/bi"
import { TfiTrash } from "react-icons/tfi"
import { useFormik } from "formik"
import { BiUpload } from "react-icons/bi"

const RoomCard = ({
  item_name,
  price,
  capacity,
  description,
  images,
  picture_url,
  onDelete,
  id,
}) => {
  const params = useParams()
  const toast = useToast()
  const roomId = id
  console.log(roomId)
  const inputFileRef = useRef()
  const [selectedImages, setSelectedImages] = useState([])
  const [room, setRoom] = useState([])

  // const { isOpen, onOpen, onClose } = useDisclosure()
  const modalDelete = useDisclosure()
  const modalEditInfo = useDisclosure()
  const modalImage = useDisclosure()
  const modalImageAsk = useDisclosure()
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [closeModalEdit, setCloseModalEdit] = useState(false)
  const [openImageId, setOpenImageId] = useState(null)
  const [getImg, setGetImg] = useState([])
  const [zeroImg, setZeroImg] = useState([])

  const cancelRef = React.useRef()
  const initialRef = React.useRef()
  const finalRef = React.useRef()
  const deleteRef = useRef()

  const confirmDeleteBtnHandler = () => {
    // onClose()
    modalDelete.onClose()
    onDelete()
  }

  //=======================UPDATE ROOM INFO
  const formik = useFormik({
    initialValues: {
      item_name: item_name,
      description: description,
      capacity: capacity,
      price: price,
    },
    onSubmit: async ({ item_name, description, capacity, price }) => {
      try {
        const response = await axiosInstance.patch(`/room/editroom/${roomId}`, {
          item_name,
          description,
          capacity,
          price,
        })
        window.location.reload(true)
        toast({
          title: "Success to edit room info",
          status: "success",
        })
      } catch (err) {
        console.log(err)
        toast({
          title: "Failed to edit room info",
          status: "error",
        })
      }
    },
  })

  //==========================DELETE ROOM IMAGE
  // const fetchRoom = images.map((val) => val.picture_url)
  // console.log(fetchRoom)
  const getImages = async () => {
    try {
      const responseImg = await axiosInstance.get(`/room`)
      console.log(responseImg.data)
      setRoom(responseImg.data.data)
    } catch (err) {
      console.log(err)
    }
  }
  const getImagesNew = room.map(
    (val) => `http://localhost:8000/public/${val.picture_url}`
  )
  console.log(getImagesNew)

  const deleteRoomImg = async (id) => {
    try {
      await axiosInstance.delete(`/room/deleteimage/${openImageId.id}`)
      getImages()
      setOpenImageId(null)
      // fetchRoom()

      toast({
        title: "Image deleted",
        status: "info",
      })
      // fetchRoom()
      modalImageAsk.onClose()
      // getImg()
      // window.location.reload(false)
    } catch (err) {
      console.log(err)
    }
  }
  const reload = () => {
    return window.location.reload(false)
  }
  //==============================POST IMAGE
  const handleSubmit = async (event) => {
    try {
      let newImgRoom = new FormData()
      newImgRoom.append("picture_url", event)
      const responseImg = await axiosInstance.post(
        `/room/addimageroom/${roomId}`,
        newImgRoom
      )

      setGetImg(responseImg.data.data.picture_url)

      images.push(responseImg?.data?.data)
      console.log(images)
      console.log(event.target)
      console.log(responseImg.data.data)
      toast({
        title: "Image has been added",
        status: "success",
      })

      // window.location.reload(false)
      // event.preventDefault()
    } catch (err) {
      console.log(err)
    }
  }
  console.log(getImg)

  useEffect(
    () => {
      getImages()
    },
    [openImageId],
    [getImg],
    [getImagesNew]
  )

  const formChangeHandler = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files
    const selectedFilesArray = Array.from(selectedFiles)

    const imageArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file)
    })
    setSelectedImages((previousImage) => previousImage.concat(imageArray))
  }
  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e != image))
    URL.revokeObjectURL(image)
  }

  console.log(formik)
  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 2,
  }

  return (
    <Center py={2}>
      <Box
        maxW={"445px"}
        w={"full"}
        h="600px"
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Stack>
          <Box
            h={"270px"}
            bg={"gray.100"}
            mt={-6}
            mx={-6}
            mb={20}
            pos={"relative"}
          >
            <Popover>
              <PopoverTrigger>
                <IconButton
                  background={"blue.500"}
                  _hover="none"
                  width={"30px"}
                >
                  <BsThreeDotsVertical color="white" size={"20px"} />
                </IconButton>
              </PopoverTrigger>
              <PopoverContent
                w="fit-content"
                border={"none"}
                _focus={{ boxShadow: "none" }}
              >
                <PopoverArrow />

                <PopoverBody>
                  <VStack>
                    <Button
                      w="194px"
                      variant="ghost"
                      rightIcon={<BiEditAlt />}
                      justifyContent="space-between"
                      fontWeight="normal"
                      fontSize="sm"
                      // onClick={() => setOpenModalEdit(true)}
                      onClick={modalEditInfo.onOpen}
                    >
                      Edit Room Info
                    </Button>

                    <Modal
                      isOpen={modalEditInfo.isOpen}
                      onClose={modalEditInfo.onClose}
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Edit your room information</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <FormControl isRequired>
                            <FormLabel>Room type</FormLabel>
                            <Input
                              placeholder="type here"
                              type="text"
                              name="item_name"
                              defaultValue={item_name}
                              onChange={formChangeHandler}
                            />
                          </FormControl>
                          <FormControl isRequired>
                            <FormLabel>Description</FormLabel>
                            <Input
                              placeholder="type here"
                              type="text"
                              h={"200px"}
                              textTransform="full-size-kana"
                              name="description"
                              defaultValue={description}
                              onChange={formChangeHandler}
                            />
                          </FormControl>
                          <FormControl isRequired>
                            <FormLabel>Capacity</FormLabel>
                            <Input
                              placeholder="type here"
                              type="number"
                              name="capacity"
                              defaultValue={capacity}
                              onChange={formChangeHandler}
                            />
                          </FormControl>
                          <FormControl isRequired>
                            <FormLabel>Price</FormLabel>
                            <Input
                              placeholder="type here"
                              type="number"
                              name="price"
                              defaultValue={price}
                              onChange={formChangeHandler}
                            />
                          </FormControl>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            colorScheme={"red"}
                            onClick={modalEditInfo.onClose}
                            // onClose={closeModalEdit}
                            // isOpen={() => setCloseModalEdit(false)}
                          >
                            Close
                          </Button>

                          <Button
                            colorScheme={"blue"}
                            type="submit"
                            onClick={formik.handleSubmit}
                          >
                            Save
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>

                    <Button
                      w="194px"
                      variant="ghost"
                      rightIcon={<BiEditAlt />}
                      justifyContent="space-between"
                      fontWeight="normal"
                      fontSize="sm"
                      onClick={modalImage.onOpen}
                    >
                      Edit Room Images
                    </Button>
                    <Modal
                      isOpen={modalImage.isOpen}
                      onClose={modalImage.onClose}
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Edit Your Room Photo</ModalHeader>
                        <ModalBody>
                          <Stack spacing="6">
                            <Box>
                              <Input
                                // placeholder="type here"

                                multiple={true}
                                type="file"
                                accept="image/*"
                                justifyContent={"center"}
                                alignItems="center"
                                display="none"
                                onChange={(event) => {
                                  handleSubmit(event.target.files[0])
                                }}
                                ref={inputFileRef}
                                onClick={getImg}
                              />

                              <Box
                                mt={"30px"}
                                backgroundColor={"green.500"}
                                boxSize="-webkit-max-content"
                                borderRadius={"5px"}
                                mb="10px"
                              >
                                <label
                                  onClick={() => inputFileRef.current.click()}
                                >
                                  <Flex
                                    gap="10px"
                                    borderRadius="5px"
                                    boxShadow={"lg"}
                                    boxSize="-webkit-max-content"
                                  >
                                    <Center width="30px" borderRadius="5px">
                                      <BiUpload color="white " size={"30px"} />
                                    </Center>
                                    <Text textAlign={"center"}>
                                      Choose Images
                                    </Text>
                                  </Flex>
                                </label>
                              </Box>
                            </Box>
                          </Stack>

                          {images.map((val) => (
                            <Box
                              w="100%"
                              borderWidth="1px"
                              rounded="lg"
                              shadow="370px"
                              display="flex"
                              p="4px"
                              mb="24px"
                              boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 20px"}
                              borderRadius="8px"
                            >
                              <Image
                                borderRadius="8px"
                                boxSize="100%"
                                objectFit="cover"
                                src={`http://localhost:8000/public/${val.picture_url}`}
                                alt="upload"
                              />

                              <CloseButton
                                position="absolute"
                                border="none"
                                color="white"
                                cursor="pointer"
                                size="sm"
                                // onClick={() => deleteHandler(image)}
                                backgroundColor="red.500"
                                onClick={() => {
                                  setOpenImageId(val)
                                  modalImageAsk.onOpen()
                                }}
                              />
                              {/* </div> */}

                              <AlertDialog
                                isCentered
                                isOpen={modalImageAsk.isOpen}
                                // leastDestructiveRef={cancelRef}
                                onClose={modalImageAsk.onClose}
                              >
                                <AlertDialogOverlay
                                  backgroundColor={"white"}
                                  boxSize="-webkit-max-content"
                                  justifyItems={"center"}
                                  alignSelf="center"
                                  borderRadius={"10px"}
                                  isCentered
                                >
                                  <AlertDialogHeader
                                    fontSize={"md"}
                                    fontWeight="bold"
                                  >
                                    Delete Room Image
                                  </AlertDialogHeader>
                                  <AlertDialogBody>
                                    Are you sure to delete this image room ?
                                  </AlertDialogBody>
                                  <AlertDialogFooter>
                                    <Button
                                      ref={cancelRef}
                                      // onClick={onClose}
                                      onClick={modalImageAsk.onClose}
                                      colorScheme="gray"
                                      color={"black"}
                                    >
                                      Cancel
                                    </Button>

                                    <Button
                                      colorScheme={"red"}
                                      onClick={() => {
                                        deleteRoomImg(val.id)

                                        // console.log(fetchRoom)
                                      }}

                                      // ref={deleteRef}
                                    >
                                      Delete
                                    </Button>
                                  </AlertDialogFooter>
                                </AlertDialogOverlay>
                              </AlertDialog>
                            </Box>
                          ))}
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            onClick={modalImage.onClose}
                            colorScheme="red"
                          >
                            Cancel
                          </Button>

                          <Button colorScheme={"blue"} onClick={reload}>
                            Save
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>

                    <Button
                      w="194px"
                      variant="ghost"
                      rightIcon={<TfiTrash />}
                      justifyContent="space-between"
                      fontWeight="normal"
                      colorScheme="red"
                      fontSize="sm"
                      // onClick={onOpen}
                      onClick={modalDelete.onOpen}
                      position="relative"
                    >
                      Delete
                    </Button>

                    <AlertDialog
                      isCentered
                      // isOpen={isOpen}
                      isOpen={modalDelete.isOpen}
                      leastDestructiveRef={cancelRef}
                      // onClose={onClose}
                      onClose={modalDelete.onClose}
                    >
                      <AlertDialogOverlay
                        backgroundColor={"white"}
                        boxSize="-webkit-max-content"
                        justifyItems={"center"}
                        alignSelf="center"
                        borderRadius={"10px"}
                        isCentered
                      >
                        <AlertDialogHeader fontSize={"md"} fontWeight="bold">
                          Delete Room
                        </AlertDialogHeader>
                        <AlertDialogBody>
                          Are you sure to delete this room ?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                          <Button
                            ref={cancelRef}
                            // onClick={onClose}
                            onClick={modalDelete.onClose}
                            colorScheme="gray"
                            color={"black"}
                          >
                            Cancel
                          </Button>
                          <Button
                            colorScheme={"red"}
                            onClick={confirmDeleteBtnHandler}
                          >
                            Delete
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogOverlay>
                    </AlertDialog>
                  </VStack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <Slider {...settings}>
              {images.map((val) => (
                <Image
                  // src={val.picture_url}
                  src={`http://localhost:8000/public/${val.picture_url}`}
                  maxHeight="250px"
                  borderRadius={"15px"}

                  // layout={"fill"}
                />
              ))}
            </Slider>
          </Box>

          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            {item_name || "name"}
          </Heading>
          <HStack>
            <Text color={"green.500"} fontWeight={800} fontSize={"sm"}>
              {new Intl.NumberFormat("ja-JP", {
                style: "currency",
                currency: "JPY",
              }).format(price)}
            </Text>
            <Text color={"gray.500"} fontSize={"smaller"}>
              / room / night
            </Text>
          </HStack>

          <Text color={"blackAlpha.500"} fontWeight={800} fontSize={"sm"}>
            {capacity || "capacity"} Guests
          </Text>
          <Text color={"gray.500"}>{description || "description"}</Text>
        </Stack>
      </Box>
    </Center>
  )
}

export default RoomCard
