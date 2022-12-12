import React, { useEffect, useState } from "react"
import "./Home.scss"
import RoomCard from "../room/RoomCard"
import ListingDetails from "../../pages/listing/ListingDetails"
import Listing from "../../pages/listing/Listing"
import { axiosInstance } from "../../api"
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react"
import { FaArrowRight, FaArrowLeft } from "react-icons/fa"

var data = require("../../db/cities_name_data.json")

const Home = () => {
  const [startDate, setStartDate] = useState(new Date())

  const [property, setProperty] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState("")
  const [value, setValue] = useState("")
  const [maxPage, setMaxPage] = useState(0)

  return (
    <>
      <div>
        <div>
          <section className="home" id="home">
            <div className="secContainer container">
              <div className="homeText">
                <h1 className="title">Stay Cheapest Full Happiness</h1>
                <p className="subTitle">
                  Stay with us and add your new memorable experiences
                </p>
                <button className="btn">
                  <a href="#">Explore</a>
                </button>
              </div>
            </div>
          </section>
        </div>
        <Box display={"block"}></Box>

        <div>
          {/* {property.length >= maxPage ? null : (
            <button
              onClick={setMoreBtnHandler}
              style={{
                marginTop: "320px",
                marginLeft: "130px",
              }}
            >
              See More
            </button>
          )} */}
        </div>
        <div>
          {/* {!property.length ? (
          <Alert
            status="warning"
            marginTop={"200px"}
            backgroundColor="red.500"
            color={"white"}
          >
            <AlertTitle>No Property on your location filter</AlertTitle>
          </Alert>
        ) : null} */}
        </div>
      </div>
    </>
  )
}

export default Home
