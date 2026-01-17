import { Routes, Route } from "react-router-dom"
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import User from "./pages/User"
import EditProfile from './pages/EditProfile'
import './styles/main.scss';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/user" element={<User />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
