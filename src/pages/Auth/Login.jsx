// import { Link, Navigate, useLocation, useNavigate } from 'react-router'

// import { FcGoogle } from 'react-icons/fc'
// import { TbFidgetSpinner } from 'react-icons/tb'
// import LoadingSpinner from '../../components/Shared/LoadingSpinner'
// import useAuth from '../../hooks/useAuth'
// import Heading from '../../components/Shared/Heading'
// import { useForm } from 'react-hook-form'
// import { ToastContainer } from 'react-toastify'
// import useAxiosSecure from '../../hooks/useAxiosSecure'
// import Swal from 'sweetalert2'

// const Login = () => {
//   const { signIn, signInGoogle, loading, user, setLoading } = useAuth()
//   const navigate = useNavigate()
//   const location = useLocation()
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const axiosSecure = useAxiosSecure();

//   const from = location.state || '/'

//   if (loading) return <LoadingSpinner />
//   if (user) return <Navigate to={from} replace={true} />

//   // form submit handler
//   const handlelogIn = data => {
//     signIn(data.email, data.password)
//       .then(() => {
//         Swal.fire({
//           position: "top-center",
//           icon: "success",
//           title: "SignIn Successfully",
//           showConfirmButton: false,
//           timer: 1500
//         });
//         navigate(from, { replace: true })
//       })
//       .catch(err => {
//         Swal.fire({
//           position: "top-center",
//           icon: "warning",
//           title: `${err.message}`,
//           showConfirmButton: false,
//           timer: 1500
//         });
//         setLoading(false)
//         // toast.error(err?.message)
//       })
//   }

//   // Handle Google Signin
//   const handleGoogleSignIn = async () => {
//     signInGoogle()
//       .then(result => {
//         Swal.fire({
//           position: "top-center",
//           icon: "success",
//           title: "Google SignIn Successfully",
//           showConfirmButton: false,
//           timer: 1500
//         });


//         // create user in the database
//         const userInfo = {
//           email: result.user.email,
//           displayName: result.user.displayName,
//           photoURL: result.user.photoURL,
//           role: 'user'
//         }

//         axiosSecure.post('/users', userInfo)
//           .then(res => {
//             console.log('user data has been stored', res.data)
//             navigate(location.state || '/');
//           })

//       })
//       .catch(error => {
//         Swal.fire({
//           position: "top-center",
//           icon: "warning",
//           title: `${error.message}`,
//           showConfirmButton: false,
//           timer: 1500
//         });
//       })


//   }
//   return (
//     <div className='flex justify-center items-center min-h-screen bg-white'>
//       <div className='flex flex-col max-w-md p-6 rounded-xl sm:p-10 bg-gray-50 text-gray-900'>
//         <div className='mb-8 text-center'>

//           <Heading center={true} title="Log In" subtitle="Sign in to access your account"></Heading>
//         </div>
//         <form
//           onSubmit={handleSubmit(handlelogIn)}
//           noValidate=''
//           action=''
//           className='space-y-6 ng-untouched ng-pristine ng-valid'
//         >
//           <div className='space-y-4'>
//             <div>
//               <label className='block mb-2 text-sm'>
//                 Email
//               </label>
//               <input
//                 type='email'
//                 {...register(
//                   "email",
//                   {
//                     required: "Email is required"
//                     ,
//                     pattern: { value: (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/), message: 'Please enter valid email' }
//                   }

//                 )}


//                 placeholder='Email'
//                 className='w-full px-3 py-2 border rounded-md border-gray-200 focus:outline-blue-500 bg-gray-200 text-gray-900'
//                 data-temp-mail-org='0'
//               />
//               {errors.email && <p className="text-red-600 text-xs my-1">{errors.email.message}</p>}
//             </div>
//             <div>
//               <div className='flex justify-between'>
//                 <label htmlFor='password' className='text-sm mb-2'>
//                   Password
//                 </label>
//               </div>

//               <input
//                 type='password'
//                 {...register(
//                   "password",
//                   {
//                     required: "Password is required",
//                     minLength: {
//                       value: 6,
//                       message: 'Password must be in 6 characters'
//                     },
//                     pattern: {
//                       value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/
//                       ,
//                       message: 'Password must have at least one small, capital letters and special character'
//                     }

//                   })}
//                 placeholder='Password'
//                 className='w-full px-3 py-2 border rounded-md border-gray-200 focus:outline-blue-500 bg-gray-200 text-gray-900'
//               />
//               {errors.password && <p className="text-red-600 my-1 text-xs">{errors.password.message}</p>}
//             </div>
//           </div>

//           <div>
//             <button
//               type='submit'
//               className='bg-blue-500 w-full rounded-md py-3 text-white hover:bg-blue-700'
//             >
//               {loading ? (
//                 <TbFidgetSpinner className='animate-spin m-auto' />
//               ) : (
//                 'Sign In'
//               )}
//             </button>
//           </div>
//         </form>
//         <div className='space-y-1'>
//           <button className='text-sm mt-2 hover:underline hover:text-blue-500 text-gray-700 cursor-pointer'>
//             Forgot password?
//           </button>
//         </div>
//         <div className='flex items-center pt-4 space-x-1'>
//           <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
//           <p className='px-3 text-md dark:text-gray-600'>
//             Login with social accounts
//           </p>
//           <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
//         </div>
//         <button
//           onClick={handleGoogleSignIn}
//           className='flex justify-center items-center space-x-2 border my-3 p-2 border-gray-300 rounded-lg cursor-pointer hover:bg-blue-200'
//         >
//           <FcGoogle size={32} />

//           <p>Sign In with Google</p>
//         </button>
//         <p className='px-6 text-sm text-center text-gray-500'>
//           Don&apos;t have an account yet?{' '}
//           <Link
//             state={from}
//             to='/signup'
//             className='hover:underline hover:text-blue-500 font-semibold text-gray-600'
//           >
//             Sign up
//           </Link>
//           .
//         </p>
//       </div>
//       <ToastContainer />
//     </div>
//   )
// }

// export default Login



import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import { TbFidgetSpinner } from 'react-icons/tb';
import { FiMail, FiLock } from 'react-icons/fi'; // Added icons for inputs
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import useAuth from '../../hooks/useAuth';
import Heading from '../../components/Shared/Heading';
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Login = () => {
  const { signIn, signInGoogle, loading, user, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const axiosSecure = useAxiosSecure();

  const from = location.state || '/';

  if (loading) return <LoadingSpinner />;
  if (user) return <Navigate to={from} replace={true} />;

  const handlelogIn = data => {
    signIn(data.email, data.password)
      .then(() => {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Sign In Successfully",
          showConfirmButton: false,
          timer: 1500
        });
        navigate(from, { replace: true });
      })
      .catch(err => {
        Swal.fire({
          position: "top-center",
          icon: "warning",
          title: `${err.message}`,
          showConfirmButton: false,
          timer: 1500
        });
        setLoading(false);
      });
  };

  const handleGoogleSignIn = async () => {
    signInGoogle()
      .then(result => {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Google Sign In Successfully",
          showConfirmButton: false,
          timer: 1500
        });

        const userInfo = {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          role: 'user'
        };

        axiosSecure.post('/users', userInfo)
          .then(res => {
            console.log('user data has been stored', res.data);
            navigate(location.state || '/');
          });
      })
      .catch(error => {
        Swal.fire({
          position: "top-center",
          icon: "warning",
          title: `${error.message}`,
          showConfirmButton: false,
          timer: 1500
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8 md:p-10 border border-white/20">
          <div className="text-center mb-8">
            <Heading center={true} title="Welcome Back" subtitle="Sign in to continue to your account" />
          </div>

          <form onSubmit={handleSubmit(handlelogIn)} className="space-y-6">
            <div className="space-y-5">
              {/* Email Field */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Please enter a valid email' }
                    })}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
              </div>

              {/* Password Field */}
              <div className="relative">
                {/* <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <button type="button" className="text-sm text-blue-600 hover:underline">Forgot password?</button>
                </div> */}
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: 'Password must be at least 6 characters' },
                      pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/, message: 'Password must include uppercase, lowercase, and special character' }
                    })}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70"
            >
              {loading ? <TbFidgetSpinner className="animate-spin mx-auto text-xl" /> : 'Sign In'}
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-1 h-px bg-gray-300"></div>
            <p className="px-4 text-sm text-gray-600">Or continue with</p>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 py-3.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <FcGoogle size={28} />
            <span className="font-medium text-gray-800">Sign in with Google</span>
          </button>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/signup"
              state={from}
              className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;