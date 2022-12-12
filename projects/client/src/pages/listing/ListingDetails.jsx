import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  Divider,
  HStack,
  Tag,
  IconButton,
  Toast,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { axiosInstance } from "../../api"
import { Link, useParams } from "react-router-dom"
import RoomCard from "../../components/room/RoomCard"
import { GrLinkPrevious, GrAdd } from "react-icons/gr"
import { BiEditAlt } from "react-icons/bi"
import Slider from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useSelector } from "react-redux"
import { useFormik } from "formik"
import { async } from "@firebase/util"
import axios from "axios"

const ListingDetails = () => {
  const authSelector = useSelector((state) => state.auth)
  const [listing, setListing] = useState([])
  const [room, setRoom] = useState([])
  const [propertyPhoto, setPropertyPhoto] = useState([])
  const [images, setImages] = useState([])
  const params = useParams()
  const toast = useToast()

  const fetchListingDetails = async () => {
    try {
      const response = await axiosInstance.get(`/property/${params.id}`)

      setListing(response.data.data)
      setPropertyPhoto(response.data.data)
      setImages(response.data.data.PropertyImages)
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }
  console.log(images)

  const fetchRoom = async () => {
    try {
      const response = await axiosInstance.get(`/room/${params.id}`)

      setRoom(response.data.data.PropertyItems)
      console.log(response, "coba")
    } catch (err) {
      console.log(err)
    }
  }
  //===============================DELETE ROOM
  const deleteRoom = async (id) => {
    try {
      await axiosInstance.delete(`/room/delete/${id}`)

      window.location.reload(false)
      toast({ title: "Post deleted", status: "success" })
    } catch (err) {
      console.log(err)
    }
  }

  const renderRoomCard = () => {
    return room.map((val) => {
      return (
        <RoomCard
          id={val.id}
          item_name={val.item_name}
          capacity={val.capacity}
          price={val.price}
          description={val.description}
          images={val.Images}
          onDelete={() => deleteRoom(val.id)}
        />
      )
    })
  }
  // console.log(listing)
  // console.log(images)
  console.log(room)

  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    arrows: true,
  }

  useEffect(() => {
    fetchListingDetails()
    fetchRoom()
  }, [])

  return (
    <Container maxW={"7xl"} marginRight="200px" mt={"75px"}>
      <HStack p="3" pl="1" pr="1" justifyContent={"space-between"}>
        {/* <Link to="/listing"> */}
        <Link to={`/tenant/${authSelector.id}`}>
          <GrLinkPrevious size={"25px"} />
        </Link>
        <Link to="/edit">
          <BiEditAlt size={"25px"} />
        </Link>
      </HStack>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        pt={{ base: 18, md: 17 }}
      >
        <Slider {...settings}>
          {images?.map((val) => (
            <Image
              src={val.image_url}
              // src={`http://localhost:8000/public/${val.image_url}`}
              rounded={"md"}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={{ base: "350px", sm: "400px", lg: "500px" }}
            />
          ))}

          {/* </Carousel> */}
        </Slider>

        <Stack spacing={{ base: 6, md: 5 }}>
          <VStack as={"header"} alignItems="start">
            <Heading
              //lineHeight={2}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {listing.name}
            </Heading>

            <Text
              color={useColorModeValue("gray.500", "gray.400")}
              fontSize={"md"}
              fontWeight={"300"}
            >
              {listing.address}, {listing?.City?.cities_name}
            </Text>
            <Tag
              size={"md"}
              variant="solid"
              colorScheme="yellow"
              fontSize={"xl"}
            >
              {/* {listing?.User?.Properties[0].Category?.category_name} */}
              {/* {getCategory} */}
              {listing?.Category?.category_name}
            </Tag>
          </VStack>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <Text fontSize={"md"}>{listing.description}</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
      <Box py={{ base: 18, md: 7 }}>
        <Divider borderColor={useColorModeValue("gray.200", "gray.600")} />
        <HStack justifyContent={"space-between"}>
          <Text
            fontSize={{ base: "16px", lg: "18px" }}
            color={useColorModeValue("yellow.500", "yellow.300")}
            fontWeight={"500"}
            textTransform={"uppercase"}
            my={"4"}
          >
            Rooms
          </Text>
          <IconButton backgroundColor={"unset"} _hover={"unset"}>
            {/* {`/tenant/${authSelector.id}`} */}
            <Link to={`/inputroom?id=${listing.id}`}>
              <GrAdd size="25px" />
            </Link>
          </IconButton>
        </HStack>

        <SimpleGrid columns={[1, 2, 3]} spacing={5}>
          {renderRoomCard()}
        </SimpleGrid>
      </Box>
    </Container>
  )
}

export default ListingDetails
