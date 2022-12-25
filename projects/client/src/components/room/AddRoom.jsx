import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  useToast,
  CloseButton,
  useDisclosure,
  Textarea,
  HStack,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import { BsUpload } from "react-icons/bs"
import { useEffect } from "react"
import { useRef, useState } from "react"
import { axiosInstance } from "../../api"
import { async } from "@firebase/util"
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom"
import { MdOutlineKeyboardBackspace } from "react-icons/md"

const AddRoom = () => {
  const toast = useToast()
  const inputFileRef = useRef()
  const [selectedImages, setSelectedImages] = useState([])
  const [property, setProperty] = useState([])
  const [roomId, setRoomId] = useState([])
  const params = useParams()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  // const [queryParameters] = useSearchParams()
  const search = useLocation().search
  const name = new URLSearchParams(search).get("id")

  //==========================GET ROOM
  // const getPropertyId = async () => {
  //   try {
  //     const response = await axiosInstance.get(`/room/${params.id}`)

  //     setProperty(response.data.PropertyItems)
  //     console.log(response)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  //=========================== Create Room
  // const queryParams = new URLSearchParams(window.location.search)
  // const term = queryParams.get("term")
  // const location = queryParams.get("location")
  console.log(name)
  const formik = useFormik({
    initialValues: {
      item_name: "",
      description: "",
      capacity: "",
      price: "",
      PropertyId: "" || name,
      picture_url: "",
    },

    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        console.log(values.PropertyId)
        let newRoom = new FormData()
        newRoom.append("item_name", values.item_name)
        newRoom.append("description", values.description)
        newRoom.append("capacity", values.capacity)
        newRoom.append("price", values.price)
        newRoom.append("PropertyId", values.PropertyId)
        newRoom.append("picture_url", values.picture_url)
        for (let i = 0; i < values.picture_url.length; i++) {
          newRoom.append("picture_url", values.picture_url[i])
        }
        const response = await axiosInstance.post("/room/createroom", newRoom)
        setRoomId(response)
        console.log(response)
        toast({
          title: "Your room type has been added",
          description: response.message,
          status: "success",
        })
        navigate(`/listing/details/${name}`)
      } catch (err) {
        console.log(err)
        toast({
          title: "Can't added your new room type",
          description: err.response.message,
          status: "error",
        })
      }
    },
  })

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

  return (
    <>
      <Flex zIndex="0" minH="100vh" align="center" justify="center" mt={"50px"}>
        <Stack
          spacing="4"
          w="350px"
          maxW="md"
          rounded="xl"
          boxShadow="lg"
          bg="white"
          p="6"
          my="12"
          border={"2px solid"}
          borderColor="gray.400"
          height={"auto"}
        >
          <HStack
            onClick={() => navigate(-1)}
            bgColor="red"
            borderRadius={"5px"}
            maxWidth={"-webkit-max-content"}
          >
            <MdOutlineKeyboardBackspace color="white" />
            <Text>Back</Text>
          </HStack>
          <Heading lineHeight="1.1" fontSize={{ base: "2xl", md: "3xl" }}>
            Add New Room :
          </Heading>
          <form onSubmit={formik.handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Room type</FormLabel>
              <Textarea
                placeholder="type here"
                type="text"
                onChange={formChangeHandler}
                name="item_name"
                value={formik.values.item_name}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="type here"
                type="text"
                h={"200px"}
                textTransform="full-size-kana"
                onChange={formChangeHandler}
                name="description"
                value={formik.values.description}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Capacity</FormLabel>
              <Textarea
                placeholder="type here"
                type="number"
                onChange={formChangeHandler}
                name="capacity"
                value={formik.values.capacity}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Price</FormLabel>
              <Input
                placeholder="type here"
                type="number"
                name="price"
                onChange={formChangeHandler}
                value={formik.values.price}
              />
            </FormControl>
            <Stack spacing="6">
              <Box>
                <FormControl isRequired>
                  {/* <FormLabel>Upload Picture</FormLabel> */}
                  <Input
                    // placeholder="type here"

                    multiple={true}
                    type="file"
                    accept="image/*"
                    justifyContent={"center"}
                    alignItems="center"
                    onChange={(event) => {
                      formik.setFieldValue("picture_url", event.target.files)
                      onSelectFile(event)
                    }}
                    display="none"
                    ref={inputFileRef}
                  />
                </FormControl>
                <Box mt={"30px"}>
                  <Text>Upload your image</Text>
                  <label onClick={() => inputFileRef.current.click()}>
                    <Flex
                      gap="10px"
                      backgroundColor={"gray.200"}
                      borderRadius="5px"
                      boxShadow={"lg"}
                      boxSize="-webkit-max-content"
                    >
                      <Center
                        backgroundColor={"yellow.400"}
                        width="30px"
                        borderRadius="5px"
                      >
                        <BsUpload color="white " />
                      </Center>
                      <Text>Choose Images</Text>
                    </Flex>
                  </label>
                </Box>
              </Box>
            </Stack>

            <Box
              position={"relative"}
              display="grid"
              gridTemplateColumns="repeat(2, 1fr)"
              justifyContent="space-evenly"
              textAlign="center"
              gridGap="10px"
              mt={"30px"}
            >
              {selectedImages &&
                selectedImages.map((image, index) => {
                  return (
                    <Box
                      // maxW="fit-content"
                      // minW="100%"
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
                      <CloseButton
                        ml={{ base: "110px", md: "38vh" }}
                        mt="5px"
                        position="absolute"
                        border="none"
                        color="white"
                        cursor="pointer"
                        size="sm"
                        onClick={() => deleteHandler(image)}
                        backgroundColor="red.500"
                      />
                      <Image
                        borderRadius="8px"
                        boxSize="100%"
                        objectFit="cover"
                        src={image}
                        alt="upload"
                      />
                      {/* </div> */}
                    </Box>
                  )
                })}
            </Box>
            <Button
              bg="blue.400"
              color="white"
              _hover={{ bg: "blue.500" }}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Stack>
      </Flex>
    </>
  )
}

export default AddRoom
