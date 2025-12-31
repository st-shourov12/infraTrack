import { Link } from 'react-router';
import rrro from '../../assets/error-404.png'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full text-center">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 md:p-16">
          {/* <h1 className="text-8xl md:text-9xl font-bold text-blue-700 mb-4">404</h1> */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Oops! This page seems to be missing – kind of like an unreported pothole on a quiet street. 
            Our crew is working hard to fix things around here!
          </p>

          {/* Optional illustration space – you can replace with an actual image */}
          <div className="my-12 bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center text-gray-400">
            <img src={rrro} alt="error" />
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-10">
            <Link
              to="/"
              className="inline-block bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-10 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              Back to Home
            </Link>
            <Link
              to="/issues"
              className="inline-block bg-white border-2 border-blue-600 text-blue-600 font-semibold py-4 px-10 rounded-lg shadow-lg hover:shadow-xl hover:bg-blue-50 transform hover:-translate-y-1 transition-all duration-200"
            >
              View All Issues
            </Link>
          </div>

          <p className="mt-12 text-gray-500">
            Still lost? <Link to="/contact" className="text-blue-600 hover:underline font-medium">Contact us</Link> for help.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;