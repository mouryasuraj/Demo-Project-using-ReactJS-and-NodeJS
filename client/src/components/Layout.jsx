
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'

const Layout = () => {
  return (
    <div className='min-h-screen flex flex-col bg-gray-800 justify-between'>
        <Navbar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Layout