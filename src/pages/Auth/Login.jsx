import { Link, Navigate, useLocation, useNavigate } from 'react-router'

import { FcGoogle } from 'react-icons/fc'
import { TbFidgetSpinner } from 'react-icons/tb'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import useAuth from '../../hooks/useAuth'
import Heading from '../../components/Shared/Heading'
import { useForm } from 'react-hook-form'
import { ToastContainer } from 'react-toastify'
import useAxiosSecure from '../../hooks/useAxiosSecure'

const Login = () => {
  const { signIn, signInGoogle, loading, user, setLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const axiosSecure = useAxiosSecure();

  const from = location.state || '/'

  if (loading) return <LoadingSpinner />
  if (user) return <Navigate to={from} replace={true} />

  // form submit handler
  const handlelogIn = data => {
    signIn(data.email, data.password)
      .then(() => {
        navigate(from, { replace: true })
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
        // toast.error(err?.message)
      })
  }

  // Handle Google Signin
  const handleGoogleSignIn = async () => {
    signInGoogle()
    .then(result => {
                console.log(result.user);
                

                // create user in the database
                const userInfo = {
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL,
                    role: 'user'
                }

                axiosSecure.post('/users', userInfo)
                    .then(res => {
                        console.log('user data has been stored', res.data)
                        navigate(location.state || '/');
                    })

            })
            .catch(error => {
                console.log(error)
            })
    
  
  }
  return (
    <div className='flex justify-center items-center min-h-screen bg-white'>
      <div className='flex flex-col max-w-md p-6 rounded-xl sm:p-10 bg-gray-50 text-gray-900'>
        <div className='mb-8 text-center'>
          
          <Heading center={true} title="Log In" subtitle="Sign in to access your account"></Heading>
        </div>
        <form
          onSubmit={handleSubmit(handlelogIn)}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label  className='block mb-2 text-sm'>
                Email
              </label>
              <input
                type='email'
                {...register(
                  "email", 
                  { required: "Email is required" 
                  ,
                    pattern: { value : (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) , message: 'Please enter valid email'}
                  }
                 
                )}
                
               
                placeholder='Email'
                className='w-full px-3 py-2 border rounded-md border-gray-200 focus:outline-blue-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
              {errors.email && <p className="text-red-600 text-xs my-1">{errors.email.message}</p> } 
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              
              <input
                type='password'
                {...register(
                  "password", 
                  { required: "Password is required" ,
                    minLength: {
                      value : 6 ,
                      message: 'Password must be in 6 characters'
                    },
                    pattern : {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/
                      ,
                      message: 'Password must have at least one small, capital letters and special character'
                    }
                    
                  })}
                placeholder='Password'
                className='w-full px-3 py-2 border rounded-md border-gray-200 focus:outline-blue-500 bg-gray-200 text-gray-900'
              />
              {errors.password && <p className="text-red-600 my-1 text-xs">{errors.password.message}</p> } 
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='bg-blue-500 w-full rounded-md py-3 text-white hover:bg-blue-700'
            >
              {loading ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </form>
        <div className='space-y-1'>
          <button className='text-sm mt-2 hover:underline hover:text-blue-500 text-gray-700 cursor-pointer'>
            Forgot password?
          </button>
        </div>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-md dark:text-gray-600'>
            Login with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <button
          onClick={handleGoogleSignIn}
          className='flex justify-center items-center space-x-2 border my-3 p-2 border-gray-300 rounded-lg cursor-pointer hover:bg-blue-200'
        >
          <FcGoogle size={32} />

          <p>Sign In with Google</p>
        </button>
        <p className='px-6 text-sm text-center text-gray-500'>
          Don&apos;t have an account yet?{' '}
          <Link
            state={from}
            to='/signup'
            className='hover:underline hover:text-blue-500 font-semibold text-gray-600'
          >
            Sign up
          </Link>
          .
        </p>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login