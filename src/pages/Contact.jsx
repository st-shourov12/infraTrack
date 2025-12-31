import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';

const Contact = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're Here to Help – Reach Out Anytime
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all">
            <div className="bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <FiMail className="text-3xl text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-gray-600">support@infratrack.com</p>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all">
            <div className="bg-indigo-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <FiPhone className="text-3xl text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p className="text-gray-600">+880 1234-567890</p>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all">
            <div className="bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <FiMapPin className="text-3xl text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Address</h3>
            <p className="text-gray-600">123 Civic Center, <br /> Dhaka-1000, Bangladesh</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-10 max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Send Us a Message</h2>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-6 py-4 rounded-lg border border-gray-300 bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-6 py-4 rounded-lg border border-gray-300 bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>

            <input
              type="text"
              placeholder="Subject"
              className="w-full px-6 py-4 rounded-lg border border-gray-300 bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />

            <textarea
              rows="6"
              placeholder="Your Message"
              className="w-full px-6 py-4 rounded-lg border border-gray-300 bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              required
            ></textarea>

            <div className="text-center">
              <button
                type="submit"
                className="inline-flex items-center gap-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-10 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
              >
                <FiSend className="text-xl" />
                Send Message
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-gray-600 mt-12">
          We typically respond within 24-48 hours. Thank you for helping improve our cities!
        </p>
      </div>
    </div>
  );
};

export default Contact;