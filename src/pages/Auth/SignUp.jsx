import { Link, useLocation, useNavigate } from 'react-router'

import { FcGoogle } from 'react-icons/fc';
import { TbFidgetSpinner } from 'react-icons/tb';
import { FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi'; // Added icons
import useAuth from '../../hooks/useAuth';
import Heading from '../../components/Shared/Heading';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import axios from 'axios';
import Swal from 'sweetalert2';

const SignUp = () => {
  const { createUser, updateUserProfile, signInGoogle, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || '/';
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleSignUp = async (data) => {
    const { photo } = data;
    const profileImg = photo[0];

    createUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append('image', profileImg);

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

        axios.post(image_API_URL, formData)
          .then(res => {
            const photoURL = res.data.data.url;

            // Save user to database
            const userInfo = {
              email: data.email,
              displayName: data.name,
              photoURL: photoURL,
              role: 'user'
            };

            axiosSecure.post('/users', userInfo)
              .then(() => {
                // Update Firebase profile
                updateUserProfile({ displayName: data.name, photoURL })
                  .then(() => {
                    Swal.fire({
                      position: "top-center",
                      icon: "success",
                      title: "Sign Up Successfully",
                      showConfirmButton: false,
                      timer: 1500
                    });
                    navigate(from, { replace: true });
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
              });
          })
          .catch(() => {
            Swal.fire({
              position: "top-center",
              icon: "warning",
              title: "Image upload failed",
              showConfirmButton: false,
              timer: 1500
            });
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

  const handleGoogleSignIn = () => {
    signInGoogle()
      .then(result => {
        const userInfo = {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          role: 'user'
        };

        axiosSecure.post('/users', userInfo)
          .then(() => {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Google Sign Up Successfully",
              showConfirmButton: false,
              timer: 1500
            });
            navigate(from, { replace: true });
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
            <Heading center={true} title="Create Account" subtitle="Join Infratrack today" />
          </div>

          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-6">
            <div className="space-y-5">
              {/* Name */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
              </div>

              {/* Profile Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-all">
                  <FiCamera className="mx-auto text-3xl text-gray-400 mb-2" />
                  <input
                    type="file"
                    accept="image/*"
                    {...register("photo", { required: "Profile photo is required" })}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <p className="text-sm text-gray-600">Click to upload (PNG, JPG up to 2MB)</p>
                </div>
                {errors.photo && <p className="text-red-600 text-xs mt-1">{errors.photo.message}</p>}
              </div>

              {/* Email */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" }
                    })}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Password must be at least 6 characters" },
                      pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/, message: "Must include uppercase, lowercase, and special character" }
                    })}
                    placeholder="Create a strong password"
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
              {loading ? <TbFidgetSpinner className="animate-spin mx-auto text-xl" /> : 'Sign Up'}
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-1 h-px bg-gray-300"></div>
            <p className="px-4 text-sm text-gray-600">Or sign up with</p>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 py-3.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <FcGoogle size={28} />
            <span className="font-medium text-gray-800">Continue with Google</span>
          </button>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              state={from}
              className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;