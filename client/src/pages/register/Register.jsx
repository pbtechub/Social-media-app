import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect} from 'react';
import './register.scss'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner'
import { register, reset } from '../../redux/slices/auth/authSlice';


const Register = () => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
 

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const  { user, isLoading, isSuccess, isError, message }= useSelector((state) => state.auth)

  

  useEffect(()=>{
      if (isError) {
          toast.error(message)
      }

      dispatch(reset())
  }, [ user, isError, isLoading, isSuccess, message, navigate, dispatch])

  const handleRegister = async (e) => {
    e.preventDefault();

      try {
          const res = await register({username, email, name, password})
            dispatch(res)

            if (isSuccess) {

              toast.success('User registered')
              navigate('/login')
            }
    
      } catch (err) {
          toast.error(err?.data?.message || err.error);
          
      }

    

  }

 
  return (
    <div className='register'>
      <div className="card">
        <div className="left">
          <h1>Bhiman social</h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione, molestias. Lorem ipsum, dolor sit 
            amet consectetur adipisicing elit. Ratione, molestias.</p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder='User Name' value={username} name='username' onChange={(e)=> setUsername(e.target.value)}/>
            <input type="email" placeholder='Email' value={email} name='email' onChange={(e)=> setEmail(e.target.value)}/>
            <input type="text" placeholder='Name' value={name} name='name' onChange={(e)=> setName(e.target.value)}/>
            <input type="password" placeholder='Password' value={password} name='password' onChange={(e)=> setPassword(e.target.value)}/>
           
            {isLoading && <ColorRing
                          visible={true}
                          height="50"
                          width="50"
                          ariaLabel="blocks-loading"
                          wrapperStyle={{}}
                          wrapperClass="blocks-wrapper"
                          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                        />}
            <button onClick={handleRegister}>Register</button>
          
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register