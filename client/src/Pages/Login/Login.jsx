
import { useContext } from 'react'
import LoginForm from './components/LoginForm'
import { AuthStore } from '../../Store/AuthStore'

const Login = () => {

    const {user} = useContext(AuthStore)
    console.log("sdfsdf",user);
    

  return (
    <div className="flex flex-col gap-5 items-center justify-center bg-gray-800 min-h-screen">
      <h1 className="card-title font-bold text-2xl text-gray-200">
        Dummy Project
      </h1>
      <div className="card w-96 bg-base-100 card-md border-2 shadow-xl border-gray-200">
        <div className="card-body">
          <h2 className="card-title font-bold">Login</h2>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default Login