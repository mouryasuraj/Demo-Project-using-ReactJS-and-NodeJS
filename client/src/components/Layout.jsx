
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
        <h1>Navbar</h1>
        <Outlet />
        <h1>Footer</h1>
    </div>
  )
}

export default Layout