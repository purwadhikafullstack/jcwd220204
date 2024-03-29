import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react"
import { useRef, useState } from "react"
import { useEffect } from "react"
import { BsUpload } from "react-icons/bs"
import { useNavigate, useParams } from "react-router-dom"
import { axiosInstance } from "../../api"

const PaymentProof = () => {
  const params = useParams()
  const [expired_date, setExpired_date] = useState()
  const [price, setPrice] = useState("")
  const [status, setStatus] = useState("")

  const [image, setImage] = useState({ preview: "", data: "" })
  const toast = useToast()
  const inputFileRef = useRef()
  const navigate = useNavigate()

  // ======================== GET EXP DATE =================================
  const paymentExpDate = async () => {
    const response = await axiosInstance.get(`/transaction/data/${params.id}`)
    setExpired_date(response.data.expDate)
    setStatus(response.data.getTransactionData.status)
    setPrice(response.data.getPrice)
  }

  // console.log(status)
  // ======================== Upload Payment =================================

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const formData = new FormData()
      formData.append("payment_proof", image.data)
      const responsePaymentProof = await axiosInstance.patch(
        `/transaction/post/${params.id}`,
        formData
      )

      if (responsePaymentProof.name === "AxiosError") {
        throw new Error(responsePaymentProof.message)
      }

      // console.log(responsePaymentProof)
      navigate("/")
      toast({
        status: "success",
        description: "Payment proof successful uploaded",
        title: "Success",
      })
    } catch (err) {
      console.log(err)
      toast({
        status: "error",
        description: "File size and Type is not valid",
        title: "Failed to post payment proof",
      })
    }
  }

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }

  useEffect(() => {
    paymentExpDate()
  }, [])

  return (
    <Box mt="150px" mb="100px">
      <Text fontSize="40px" fontWeight="bold" textAlign="center">
        Complete your payment
      </Text>
      <br />
      <Text fontSize="20px" fontWeight="bold" textAlign="center">
        Before: {expired_date}
      </Text>
      <br />
      <Text fontSize="40px" fontWeight="bold" textAlign="center">
        Total Price
      </Text>
      <Text fontSize="20px" fontWeight="bold" textAlign="center">
        Rp. {price}
      </Text>
      <Center>
        <Box width="45em" mt="100px">
          <Text fontSize="20px" fontWeight="bold" textAlign="center">
            Virtual Account
          </Text>
          <br />
          <Accordion allowToggle>
            <AccordionItem color="black">
              <Text color="black">
                <AccordionButton
                  backgroundColor="transparent"
                  borderTop="none"
                  borderLeft="none"
                  borderRight="none"
                  _hover={{ backgroundColor: "white" }}
                >
                  <Box as="span" flex="1" textAlign="left">
                    {" "}
                    BCA
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Text>
              <AccordionPanel pb={4}>
                102371037123813
                <Button
                  border="none"
                  backgroundColor="transparent"
                  color="black"
                  ml={{ base: "180px", sm: "500px" }}
                  size="50px"
                  _hover={{ backgroundColor: "transparent" }}
                >
                  Copy
                </Button>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <Text color="white">
                <AccordionButton
                  backgroundColor="transparent"
                  borderTop="none"
                  borderLeft="none"
                  borderRight="none"
                  _hover={{ backgroundColor: "white" }}
                >
                  <Box as="span" flex="1" textAlign="left">
                    {" "}
                    Mandiri
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Text>
              <AccordionPanel pb={4}>
                102371037123813
                <Button
                  border="none"
                  backgroundColor="transparent"
                  color="black"
                  ml={{ base: "180px", sm: "500px" }}
                  size="50px"
                  _hover={{ backgroundColor: "transparent" }}
                >
                  Copy
                </Button>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <Text color="white">
                <AccordionButton
                  backgroundColor="transparent"
                  borderTop="none"
                  borderLeft="none"
                  borderRight="none"
                  _hover={{ backgroundColor: "white" }}
                >
                  <Box as="span" flex="1" textAlign="left">
                    {" "}
                    BRI
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Text>
              <AccordionPanel pb={4}>
                102371037123813
                <Button
                  border="none"
                  backgroundColor="transparent"
                  color="black"
                  ml={{ base: "180px", sm: "500px" }}
                  size="50px"
                  _hover={{ backgroundColor: "transparent" }}
                >
                  Copy
                </Button>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <Text color="white">
                <AccordionButton
                  backgroundColor="transparent"
                  borderTop="none"
                  borderLeft="none"
                  borderRight="none"
                  _hover={{ backgroundColor: "white" }}
                >
                  <Box as="span" flex="1" textAlign="left">
                    {" "}
                    BNI
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Text>
              <AccordionPanel pb={4}>
                102371037123813
                <Button
                  border="none"
                  backgroundColor="transparent"
                  color="black"
                  ml={{ base: "180px", sm: "500px" }}
                  size="50px"
                  _hover={{ backgroundColor: "transparent" }}
                >
                  Copy
                </Button>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </Center>
      {status === "waiting for payment" ? (
        <form onSubmit={handleSubmit}>
          <Center mt="100px">
            <Box textAlign="center" w="xl">
              <Text fontSize="20px" fontWeight="bold">
                After finish your payment
              </Text>
              <Text fontSize="20px" fontWeight="bold" mb="10px">
                Please upload your payment proof
              </Text>
              <Text color="red" fontSize="12px" mb="30px">
                Maximum size is 1MB and file type jpeg and png
              </Text>
              {image.preview && (
                <Image src={image.preview} h="100%" width="100%" mb="10px" />
              )}
              <Input
                type="file"
                display="none"
                onChange={handleFileChange}
                ref={inputFileRef}
                required
              />
              <Button
                w="150px"
                backgroundColor="linkedin.500"
                _hover={{ backgroundColor: "linkedin.400" }}
                color="white"
                onClick={() => {
                  inputFileRef.current.click()
                }}
                mr="10px"
              >
                <Flex gap="10px">
                  <BsUpload />
                  Choose File
                </Flex>
              </Button>
              <Button
                w="150px"
                type="submit"
                backgroundColor="linkedin.500"
                _hover={{ backgroundColor: "linkedin.400" }}
                color="white"
              >
                Submit
              </Button>
            </Box>
          </Center>
        </form>
      ) : (
        // <Center>
        <Box mt="50px">
          <Text fontSize="50px" fontWeight="bold" textAlign="center">
            Your Status :
          </Text>
          <Text
            fontSize="30px"
            fontWeight="bold"
            textAlign="center"
            textTransform="capitalize"
          >
            {status}
          </Text>
        </Box>
        // </Center>
      )}
    </Box>
  )
}

export default PaymentProof
