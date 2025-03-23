import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import HotelDash from './components/HotelDash'
import Home from './components/Home'
import HotelOwner from './components/HotelOwner'
import AdminDashboard from './components/AdminDashboard'
import BookingList from './components/BookingList'
import BookingForm from './components/BookingForm'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <NavBar/>
         <Routes>
         <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/hoteldash" element={<HotelDash/> }/>
          <Route path="/sign" element={<SignUp/>} />
          <Route path="/hotelowner" element={<HotelOwner/>} />
          <Route path="/AdminDashboard" element={<AdminDashboard/>}/>
          <Route path="/bookings" element={<BookingList/>} />
          <Route path="/booking" element={<BookingForm/>} />

        </Routes>
      </div>
    </>
  )
}

export default App
