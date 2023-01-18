import React, { useEffect, useState } from "react"
import ListingRow from "../../components/room/ListingRow"
import { axiosInstance } from "../../api"
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Grid,
  Heading,
  HStack,
  Menu,
  MenuButton,
  Text,
  VStack,
} from "@chakra-ui/react"
import { GrLinkPrevious, GrAdd } from "react-icons/gr"
import { Link, NavLink, useParams } from "react-router-dom"
import { useSelector } from "react-redux"

const Listing = () => {
  const authSelector = useSelector((state) => state.auth)
  const [listing, setListing] = useState([])
  const [city, setCity] = useState([])
  const params = useParams()

  const fetchListing = async () => {
    try {
      const response = await axiosInstance.get(`/tenant/${params.id}`)

      setListing(response.data.data.Properties)
    } catch (error) {
      console.log(error)
    }
  }

  const renderListingRow = () => {
    return listing.map((val) => {
      return (
        <ListingRow
          id={val.id}
          name={val.name}
          properties={val.PropertyImages}
          address={val.address}
          city={val.City}
        />
      )
    })
  }
  const Menu = ["Properties", "Order", "Finances"]

  useEffect(() => {
    fetchListing()
  }, [])

  return (
    <Center>
      <Box
        mt={{ base: "100px", md: "200px" }}
        boxShadow={
          "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
        }
        padding={"10px"}
        maxW={{ base: "350px", md: "900px" }}
        backgroundColor={"whiteAlpha.900"}
        // ml={{ base: "5vw", md: "10vw" }}
        // mb="10vh"
        height="fit-content"
      >
        <VStack>
          <Box
            maxW="350px"
            borderRadius={"15px"}
            mb={"20px"}
            mt={{ base: "5px", md: "0px" }}
            padding="10px"
          >
            <Center>
              <HStack spacing={"-5"} as="nav" cursor={"pointer"} gap="2rem">
                <Link to="/">
                  <Button
                    color={"white"}
                    cursor="pointer"
                    backgroundColor={"orange.400"}
                    _hover={{ backgroundColor: "orange.300" }}
                    fontSize={"15px"}
                  >
                    Properties
                  </Button>
                </Link>
                <Link to={`/orderlist?id=${authSelector.id}`}>
                  <Button
                    color={"white"}
                    cursor="pointer"
                    _hover={{ backgroundColor: "orange.300" }}
                    backgroundColor={"orange.400"}
                    fontSize={"15px"}
                  >
                    Order List
                  </Button>
                </Link>
                {/* <Link to={`/finances/${params.id}`}> */}
                <Link to={`/`}>
                  <Button
                    color={"white"}
                    cursor="pointer"
                    _hover={{ backgroundColor: "orange.300" }}
                    backgroundColor={"orange.400"}
                    fontSize={"15px"}
                  >
                    Finances
                  </Button>
                </Link>
              </HStack>
            </Center>
          </Box>
          <Box>
            <Center>
              <Heading
                fontFamily={"sans-serif"}
                fontWeight="bold"
                fontSize={"2xl"}
                position="absolute"
              >
                Your List of Properties
              </Heading>
            </Center>
            <HStack mb="2" p="3" pl="1" pr="1" justifyContent={"space-between"}>
              <Link to="/">{/* <GrLinkPrevious size={"15px"} /> */}</Link>
              <Link to="/property-form">
                <GrAdd size={"25px"} />
              </Link>
            </HStack>
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(4, 2fr)",
              }}
              padding="5px"
              gap={{ base: "0", md: "10px" }}
            >
              {renderListingRow()}
            </Grid>
          </Box>
        </VStack>
      </Box>
    </Center>
  )
}

export default Listing
