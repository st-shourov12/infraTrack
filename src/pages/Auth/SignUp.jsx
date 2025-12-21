import { Link, useLocation, useNavigate } from 'react-router'
import { FcGoogle } from 'react-icons/fc'

import { TbFidgetSpinner } from 'react-icons/tb'
import useAuth from '../../hooks/useAuth'
import Heading from '../../components/Shared/Heading'
import { useForm } from 'react-hook-form'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import axios from 'axios'


const SignUp = () => {
  const { createUser, updateUserProfile, signInGoogle, loading } = useAuth();
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state || '/';
  const axiosSecure = useAxiosSecure()

  const { register, handleSubmit, formState: { errors } } = useForm();

  // form submit handler
  const handleSignUp = async(data) => {

      const {photo} = data;
      const profileImg = photo[0];  
      
        // // 1. store the image in form data
        // const formData = new FormData();
        // formData.append('image', profileImg);
        // // 2. send the photo to store and get the ul
        // const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`
        // const res =  await axios.post(image_API_URL, formData);
        // const photoURL = res.data.data.url;
        // const photoURL = await imageUpload(profileImg);
        // // create user and show toast and store in mongodb database
        // createUser(data.email, data.password).
        // then(res => 
        //   console.log(res.user)
        // )
        // toast.success('User created successfully');
        // // update user profile to firebase
        // const userProfile = {
        //     displayName: data.name,
        //     photoURL: photoURL
        // }
        // await updateUserProfile(userProfile);
        // navigate(from, { replace: true });
      

        createUser(data.email, data.password)
            .then(() => {

                // 1. store the image in form data
                const formData = new FormData();
                formData.append('image', profileImg);

                // 2. send the photo to store and get the ul
                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`

                axios.post(image_API_URL, formData)
                    .then(res => {
                        const photoURL = res.data.data.url;

                        // create user in the database
                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: photoURL
                        }
                        axiosSecure.post('/users', userInfo)
                        .then(res =>{
                            if(res.data.insertedId){
                                console.log('user created in the database');
                            }
                        })


                        // update user profile to firebase
                        const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL
                        }

                        updateUserProfile(userProfile)
                            .then(() => {
                                console.log('user profile updated done.')
                                navigate(location.state || '/');
                            })
                            .catch(error => console.log(error))
                    })



            })
            .catch(error => {
                console.log(error)
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
                    photoURL: result.user.photoURL
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
      <div className='flex flex-col max-w-md p-6 rounded-xl sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          {<Heading title="Sign Up" subtitle="Welcome to Infratrack"></Heading>}
        </div>
        <form
          onSubmit={handleSubmit(handleSignUp)}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label className='block mb-2 text-sm'>
                Name
              </label>
              <input
                type='text'
                {...register("name", { required: true })}
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-500 bg-gray-100 text-gray-900'
                data-temp-mail-org='0'
              />
              {
                errors.name?.type === 'required' && <p className="text-red-500 my-1 text-xs">Name is required</p>
              }
            </div>
            {/* Image */}
            <div>
              <label
                
                className='block mb-2 text-sm font-medium text-gray-700'
              >
                Profile Image
              </label>
              <input
                type="file" {...register('photo', { required: true })}
                accept='image/*'
                className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4  file:rounded-md file:border-0  file:text-sm file:font-semibold  file:bg-blue-50 file:text-blue-700  hover:file:bg-blue-100  bg-gray-100 border border-dashed border-blue-300 rounded-md cursor-pointer  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 p-1'
              />
              <p className='mt-1 text-xs text-gray-400'>
                PNG, JPG or JPEG (max 2MB)
              </p>
              {
                errors.photo?.type === 'required' && <p className="text-red-500 my-1 text-xs">Photo is required</p>
              }
            </div>
            <div>
              <label className='block mb-2 text-sm'>
                Email
              </label>
              <input
                type='email'
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                placeholder='Email'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-500 bg-gray-100 text-gray-900'
              />
              {errors.email && <p className="text-red-500 my-1 text-xs">{errors.email.message}</p>}
            </div>
            <div>
              <div className='flex justify-between'>
                <label className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type="password"
                {...register('password', {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  },
                  pattern : {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/
                      ,
                      message: 'Password must have at least one small, capital letters and special character'
                    }

                })}
                placeholder='Password'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-500 bg-gray-100 text-gray-900'
              />
              {errors.password && <p className="text-red-500 my-1 text-xs">{errors.password.message}</p>}
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 w-full rounded-md py-3 text-white'
            >
              {loading ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : (
                'Sign Up'
              )}
            </button>
          </div>
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Signup with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <div
          onClick={handleGoogleSignIn}
          className='flex justify-center items-center space-x-2 border my-3 py-2 border-gray-300 rounded-xl cursor-pointer hover:bg-blue-200'
        >
          <FcGoogle size={32} />

          <p>Sign Up with Google</p>
        </div>
        <p className='px-6 text-sm text-center text-gray-700'>
          Already have an account?{' '}
          <Link
            state={from}
            to='/login'
            className='hover:underline font-medium hover:text-blue-500 text-gray-800'
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default SignUp