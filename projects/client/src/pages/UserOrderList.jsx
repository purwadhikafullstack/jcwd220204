import { Box, Center, Container, Heading, Text } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { axiosInstance } from "../api"
import UserPage from "../components/user/User"
import { GrLinkPrevious } from "react-icons/gr"
import { Link, useParams } from "react-router-dom"

const UserOrderList = () => {
  const [getUserTransaction, setGetUserTransaction] = useState([])
  console.log(getUserTransaction, "coba")
  const params = useParams()

  const fetchUserTransaction = async () => {
    try {
      const response = await axiosInstance.get(`/transaction/user/${params.id}`)
      console.log(response, "coba10")
      setGetUserTransaction(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchUserTransaction()
  }, [])

  const renderUserTransaction = () => {
    return getUserTransaction.map((val) => {
      return (
        <UserPage
          key={val.id.toString()}
          property_name={val.Property.name}
          address={val.Property.address}
          cities_name={val.Property.City.cities_name}
          start_date={val.start_date}
          end_date={val.end_date}
          status={val.status}
          property_image={val.Property.PropertyImages}
          room_name={val.PropertyItem.item_name}
          capacity={val.PropertyItem.capacity}
          room_image={val.PropertyItem.Images}
          property_id={val.PropertyId}
          transaction_id={val.id}
        />
      )
    })
  }

  return (
    <Center>
      <Container
        width={"-moz-max-content"}
        height="auto"
        mt={{ base: "75px", md: "100px" }}
        maxWidth={{ base: "400px", md: "3xl" }}
      >
        <Box>
          <Link to={`/`}>
            <GrLinkPrevious size={"25px"} />
          </Link>
          <Heading size={"lg"}>Here your order list</Heading>
          {renderUserTransaction()}
        </Box>
      </Container>
    </Center>
  )
}

export default UserOrderList
