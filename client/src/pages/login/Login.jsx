import './login.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner'
import { login, reset} from '../../redux/slices/auth/authSlice';



const Login = () => {
  const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const  { user, isLoading, isSuccess, isError, message }= useSelector((state) => state.auth)

   

    useEffect(()=>{
      if (user) {
          navigate('/home')
      }
  }, [navigate, user])


  const handleLogin = async (e)=> {
    e.preventDefault();
      
    try {
      const res = await login({username, password})
        dispatch(res)
        // dispatch(setCredetials())

        if (isSuccess || user) {

          toast.success('User logged in successfully')
          navigate('/home')
        }


  } catch (err) {
      toast.error(err?.data?.message || err.error);
      
  }
  }

  
  return (
    <div className='login'>
      <div className="card">
        <div className="left">
          <h1>Hellow World!</h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione, molestias. Lorem ipsum, dolor sit 
            amet consectetur adipisicing elit. Ratione, molestias.</p>
          <span>Don't  you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder='User Name' name='username' onChange={(e)=> setUsername(e.target.value)}/>
            <input type="password" placeholder='Password' name='password' onChange={(e)=> setPassword(e.target.value)}/>
                
                    {isLoading && <ColorRing
                          visible={true}
                          height="50"
                          width="50"
                          ariaLabel="blocks-loading"
                          wrapperStyle={{}}
                          wrapperClass="blocks-wrapper"
                          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                        />}
                    <button onClick={handleLogin}>Login</button>
                
          </form>
          
        </div>
      </div>
    </div>
  )
}

export default Login



