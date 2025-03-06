// import { useState } from 'react'
import SignIn from './pages/SignIn/SignIn.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp/SignUp.jsx'
import Home from './pages/Home.jsx'
import Unauthorized from './pages/Unauthorized.jsx'
function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/unauthorized" element={<Unauthorized />} />{' '}
      </Routes>
    </BrowserRouter>
  )
}

export default App
