import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Route, Routes } from "react-router-dom"
import { axiosInstance } from "./api"

import SignInTenant from "./components/sign-in-form-Tenant/sign-in.component"
import SignIn from "./components/sign-in-form/sign-in.component"

import { login } from "./redux/features/authSlice"

function App() {
  const [authCheck, setAuthCheck] = useState(false)
  const dispatch = useDispatch()
  const keepUserLoggedIn = async () => {
    try {
      const auth_token = localStorage.getItem("auth_token")

      if (!auth_token) {
        setAuthCheck(true)
        return
      }

      const response = await axiosInstance.get("/auth/refresh-token", {
        headers: {
          authorization: `Bearer ${auth_token}`,
        },
      })
      console.log(response)

      dispatch(login(response.data.data))
      localStorage.setItem("auth_token", response.data.token)
    } catch (err) {
      console.log(err)
      setAuthCheck(true)
    }
  }
  useEffect(() => {
    keepUserLoggedIn()
  }, [])
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/logintenant" element={<SignInTenant />} />
    </Routes>
  )
}

export default App
