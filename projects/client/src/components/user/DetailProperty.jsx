import {
  Alert,
  AlertIcon,
  Avatar as Avatar2,
  Badge,
  Box,
  Button as Button2,
  Center,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
  VStack,
  WrapItem,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { GrLinkPrevious, GrAdd } from "react-icons/gr"
import { axiosInstance } from "../../api"
import { async } from "@firebase/util"
import { Carousel } from "antd"
import { GrFormNext } from "react-icons/gr"
import { Calendar, Avatar, List, message, Button, Result } from "antd"
import moment from "moment"

const DetailProperty = () => {
  const reserveModal = useDisclosure()
  const [room, setRoom] = useState([])
  const [property, setProperty] = useState([])
  const [images, setImages] = useState([])
  const [getDateRooms, setGetDateRooms] = useState()

  const params = useParams()

  const fetchRoom = async () => {
    try {
      const response = await axiosInstance.get(`/room/${params.id}`)

      setRoom(response.data.data.PropertyItems)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchProperty = async () => {
    try {
      const response = await axiosInstance.get(`/property/${params.id}`)

      setProperty(response.data.data)
      setImages(response.data.data.PropertyImages)
    } catch (err) {
      console.log(err)
    }
  }

  //=============================

  const getDateRoom = async () => {
    try {
      const responseData = await axiosInstance.get(`/calendar/${params.id}`)
      setGetDateRooms(responseData.data.data)
    } catch (err) {
      console.log(err)
    }
  }
  const newFormatted = getDateRooms?.map((dateRoom) => {
    const date = new Date(dateRoom.startDate)

    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const formattedNewDate = `${year}${month.toString().padStart(2, "0")}${day
      .toString()
      .padStart(2, "0")}`

    dateRoom.formattedNewDate = formattedNewDate
    return formattedNewDate
  })

  // const findDate = (value) => {
  //   console.log(value.format("YYYYMMDD"), "format")
  // }

  const DateCellRender = (date) => {
    const dateStr = date.format("YYYYMMDD")

    let result = ""

    for (let data of newFormatted) {
      if (data.newFormatted === dateStr) {
        result += `${data.PropertyItem.item_name}\n`
      }
    }
    if (result !== "") {
      return (
        <div>
          <Badge
            status="error"
            text={`${result}`}
            style={{ fontSize: "0.5rem" }}
          />
        </div>
      )
    }
  }
  //=============================
  // const getUserReview = property?.Reviews

  const contentStyle = {
    margin: 0,
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
    padding: 0,
  }

  const findId = room.map((val) => <option key={val.id}>{val.name}</option>)

  useEffect(() => {
    fetchRoom()
    fetchProperty()
    getDateRoom()
  }, [])
  return (
    <Center>
      <Container
        width={"-moz-max-content"}
        height="auto"
        mt={"100px"}
        maxW={{ base: "100vw", md: "60vw" }}
      >
        <Link to={`/`}>
          <GrLinkPrevious size={"25px"} />
        </Link>
        <Carousel autoplay effect="fade" dotPosition="bottom" easing="linear">
          {images?.map((val) => (
            <Image
              style={contentStyle}
              //   src={val.image_url}
              src={`http://localhost:8000/public/${val.image_url}`}
              rounded={"md"}
              fit={"cover"}
              align={"center"}
              w={"50%"}
              h={{ base: "350px", sm: "400px", lg: "500px" }}
            />
          ))}
        </Carousel>

        <Divider color={"GrayText"} height="10px" />

        <br />
        <Grid templateColumns={"repeat(2, 2fr)"} gap="10">
          <GridItem>
            <HStack paddingBottom={"10px"}>
              <Avatar2
                name={property?.User?.username}
                src={`http://localhost:8000/public/${property?.User?.profile_picture}`}
              />
              <Text>Hosted by {property.User?.username}</Text>
            </HStack>
            <Text>{property.name}</Text>
            <Badge colorScheme={"linkedin"}>
              {property?.Category?.category_name}
            </Badge>
            <Text fontSize={"12px"}>
              {property?.address}, {property?.City?.cities_name}
            </Text>
            <br />
            <Text fontFamily={"sans-serif"} fontSize={"13.5px"}>
              {property?.description}
            </Text>
            <Button2
              colorScheme={"orange"}
              ml="0"
              width={"100%"}
              color="white"
              onClick={reserveModal.onOpen}
              cursor="pointer"
            >
              Reserve
              <GrFormNext size={"25px"} />
            </Button2>

            <Box color={"blue"} textAlign="center" mt={"50px"}>
              <Text>Full booked day information</Text>
              <Calendar
                // dateCellRender={DateCellRender}
                // onChange={findDate}
                style={{ textTransform: "uppercase", fontSize: "0.7rem" }}
              />
            </Box>
            <Modal
              isOpen={reserveModal.isOpen}
              onClose={reserveModal.onClose}
              size="sm"
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Reservation Form</ModalHeader>
                <ModalCloseButton color={"red"} cursor="pointer" />
                <ModalBody>
                  <FormControl>
                    <FormLabel>Select Room</FormLabel>
                    <Select>
                      {room.map((val) => (
                        <option key={val.id}>{val.item_name}</option>
                      ))}
                    </Select>
                    <FormLabel mt={"5px"}>Amount of Guest</FormLabel>
                    <InputGroup>
                      <Input
                        type={"number"}
                        fontStyle="normal"
                        borderColor={"black"}
                      />
                      <InputRightAddon children="people" />
                    </InputGroup>
                    <FormLabel mt={"5px"}>CheckIn Date</FormLabel>
                    <InputGroup>
                      <Input type={"date"} />
                    </InputGroup>
                    <FormLabel mt={"5px"}>CheckOut Date</FormLabel>
                    <InputGroup>
                      <Input type={"date"} />
                    </InputGroup>
                    <FormLabel mt={"5px"}>Name</FormLabel>
                    <InputGroup>
                      <Input type={"text"} fontStyle="normal" />
                    </InputGroup>
                    <FormLabel mt={"5px"}>Email</FormLabel>
                    <InputGroup>
                      <Input type={"text"} fontStyle="normal" />
                    </InputGroup>
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button2
                    colorScheme="red"
                    mr={3}
                    onClick={reserveModal.onClose}
                    size="sm"
                    cursor={"pointer"}
                  >
                    Close
                  </Button2>
                  <Button2
                    // variant="ghost"
                    color={"white"}
                    colorScheme="whatsapp"
                    size="sm"
                    cursor={"pointer"}
                  >
                    Checkout
                  </Button2>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </GridItem>
          <GridItem>
            <Text>Available rooms:</Text>
            {room.length === 0 ? (
              <Alert status="error">
                <AlertIcon />
                Sorry, no room available now
              </Alert>
            ) : (
              room.map((val) => (
                <Box
                  border={"2px solid"}
                  w={{ base: "200px", md: "300px" }}
                  rounded={"md"}
                  mb={"10px"}
                  borderColor="teal.300"
                  backgroundColor="linkedin.400"
                  color={"white"}
                  fontWeight="extrabold"
                >
                  <Box
                    backgroundColor={"white"}
                    // border="2px solid red"
                    maxHeight={{ base: "200px", md: "300px" }}
                  >
                    <Carousel
                      autoplay
                      effect="fade"
                      dotPosition="left"
                      dots={false}
                      easing="linear"
                      // style={contentStyle}
                    >
                      {val.Images.map((value) => (
                        <Image
                          src={`http://localhost:8000/public/${value.picture_url}`}
                          rounded={"md"}
                          fit={"cover"}
                          align={"center"}
                          maxW={"100%"}
                        />
                      ))}
                    </Carousel>
                  </Box>

                  <Text
                    fontFamily={"sans-serif"}
                    fontSize={{ base: "13.5px", md: "20px" }}
                  >
                    Room: {val.item_name} type
                  </Text>
                  <Text
                    color={"white"}
                    fontSize={{ base: "x-small", md: "md" }}
                  >
                    {new Intl.NumberFormat("ja-JP", {
                      style: "currency",
                      currency: "JPY",
                    }).format(val.price)}
                    / room / night
                  </Text>
                  <Text
                    color={"white"}
                    fontSize={{ base: "x-small", md: "md" }}
                  >
                    Max. capacity: {val.capacity} People
                  </Text>
                  <Text
                    color={"white"}
                    ffontSize={{ base: "x-small", md: "md" }}
                  >
                    {val.description}
                  </Text>
                </Box>
              ))
            )}

            <Text mt={"20px"}>Reviews:</Text>
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={4}
              align="stretch"
              border="1px solid"
              borderColor={"gray.300"}
              borderRadius={"5px"}
            >
              {property?.Reviews?.map((val) => (
                <>
                  <HStack>
                    <Avatar2
                      size={"md"}
                      src={`http://localhost:8000/public/${val.User.profile_picture}`}
                    />
                    <VStack>
                      <Text fontSize={"15px"}>{val.User.username}</Text>
                      <Text fontSize="13px" color={"gray.400"}>
                        {moment(val.createdAt).utc().format("LL")}
                      </Text>
                    </VStack>
                  </HStack>
                  <Text mt={"5px"} fontSize="15px" fontStyle={"italic"}>
                    {val.review}
                  </Text>
                </>
              ))}
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </Center>
  )
}

export default DetailProperty
