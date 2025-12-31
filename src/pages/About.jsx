import { Link } from 'react-router';

const About = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">About InfraTrack</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Building Smarter, Safer Cities Together
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-10 mb-12">
          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
            InfraTrack is a user-friendly digital platform that empowers citizens to report everyday public infrastructure issues directly to authorities. From potholes and broken streetlights to water leaks, overflowing garbage, and damaged sidewalks—anyone can submit reports with photos, locations, and details in just a few taps.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Common Issues We Help Fix</h2>
          <p className="text-center text-gray-600 mb-8">Citizens often encounter frustrating problems that impact daily life:</p>
          {/* Image carousel or grid here in your actual implementation */}
        </section>

        <section className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">How It Works</h2>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <div>
                  <strong>Report Easily:</strong> Citizens upload issues via the app or website.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <div>
                  <strong>Manage Efficiently:</strong> Government staff and admins use a powerful dashboard to verify, assign, track, and resolve reports.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <div>
                  <strong>Stay Updated:</strong> Real-time notifications and public tracking keep everyone informed.
                </div>
              </li>
            </ul>
          </div>
          {/* Dashboard/Smart city images here */}
        </section>

        <section className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-10">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Key Benefits</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="font-semibold text-xl mb-2">Greater Transparency</h3>
              <p className="text-gray-600">Track issue status publicly for accountability and trust.</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="font-semibold text-xl mb-2">Faster Response Times</h3>
              <p className="text-gray-600">Prioritized workflows reduce delays.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="font-semibold text-xl mb-2">Data-Driven Decisions</h3>
              <p className="text-gray-600">Analyze trends to prevent future problems.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">🏙️</span>
              </div>
              <h3 className="font-semibold text-xl mb-2">Efficient Municipal Services</h3>
              <p className="text-gray-600">Better resource allocation for proactive maintenance.</p>
            </div>
          </div>
        </section>

        <div className="text-center mt-16">
          <p className="text-2xl font-semibold text-gray-800 mb-6">
            Ready to make a difference?
          </p>
          <Link
            to="/issues"
            className="inline-block bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-10 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
          >
            Explore All Issues
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;