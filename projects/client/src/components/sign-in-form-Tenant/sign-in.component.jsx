import React from "react"
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { axiosInstance } from "../../api"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../../redux/features/authSlice"

//===================firebase=====================
import { signInAuthUserWithEmailAndPassword } from "../../config/firebase"

import FormInput from "../input/from-input.component"

//===================firebase=====================

const SignInTenant = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authSelector = useSelector((state) => state.auth)
  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ email, password }) => {
      try {
        const signInResult = await signInAuthUserWithEmailAndPassword(
          email,
          password
        )

        const idToken = await signInResult.user.getIdToken()

        const response = await axiosInstance.post("/auth/login-tenant", {
          googleToken: idToken,
        })
        console.log(response)
        if (response.name === "AxiosError") {
          throw new Error(
            response.message,
            toast({
              title: "Login failed",
              description: "Tenant not Found",
              status: "error",
            })
          )
        }

        localStorage.setItem("auth_token", response.data.token)
        dispatch(
          login({
            id: response.data.data.id,
            email: response.data.data.email,
            role: response.data.data.role,
            is_verified: response.data.data.is_verified,
          })
        )

        toast({
          title: "Login success",
          description: response.data.message,
          status: "success",
        })
      } catch (err) {
        console.log(err)
        toast({
          title: "Login Failed",
          description: err.response.data.message,
          status: "error",
        })
      }
    },
    validationSchema: Yup.object({
      email: Yup.string().required().email(),
      password: Yup.string().required(),
    }),
    validateOnChange: false,
  })

  const formChangeHandler = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }

  if (authSelector.role === "tenant") {
    navigate(`/tenant/${authSelector.id}`)
  }

  return (
    <Center>
      <Box
        display="flex"
        flexDir="column"
        width={{ base: "355px", sm: "450px" }}
        alignSelf="center"
        h={{ base: "550px", sm: "650px" }}
        mt={{ sm: "150px", base: "100px" }}
        justifyContent="center"
        boxShadow="0px 1px 10px 0px black"
        borderRadius="10px"
        textAlign="center"
        // margin="auto"
      >
        <Box margin="auto">
          <VStack>
            <Text fontSize="3xl" fontWeight="bold">
              LOGIN{" "}
            </Text>
            <Text fontSize="xl" fontWeight="bold" mb="10px">
              Already have an account?
            </Text>
            <Text>Sign in with your email and password</Text>
            <form onSubmit={formik.handleSubmit}>
              <Box>
                <FormControl
                  isInvalid={formik.errors.email}
                  style={{ marginLeft: "10px" }}
                >
                  <FormInput
                    label="Email"
                    type="email"
                    onChange={formChangeHandler}
                    name="email"
                    value={formik.values.email}
                  />
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={formik.errors.password}
                  style={{ marginLeft: "10px" }}
                >
                  <FormInput
                    label="Password"
                    type="password"
                    onChange={formChangeHandler}
                    name="password"
                    value={formik.values.password}
                  />
                  <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                </FormControl>
              </Box>

              <Button
                type="submit"
                width="fit-content"
                minW="330px"
                color="white"
                backgroundColor="blue.500"
                _hover={{ backgroundColor: "blue.400" }}
                h="45px"
              >
                Sign In
              </Button>
              <br />
              <br />
              <Text fontSize="20px" mr="20px">
                Not a tenant? <Link to="/register">Sign Up</Link>
              </Text>
            </form>
          </VStack>
        </Box>
      </Box>
    </Center>
  )
}

export default SignInTenant
