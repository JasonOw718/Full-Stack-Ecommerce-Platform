import { FaEnvelope, FaMapMarkedAlt, FaPhone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Contact() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-b from-white to-gray-50">
      <h1 className="text-slate-800 text-4xl md:text-5xl font-bold text-center mb-16 relative">
        <span className="relative inline-block after:content-[''] after:absolute after:w-24 after:h-1 after:bg-indigo-500 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded-full pb-4">
          Contact Us
        </span>
      </h1>

      <div className="flex flex-col lg:flex-row justify-between items-center mb-16 gap-12">
        <div className="w-full lg:w-1/2">
          <div className="relative overflow-hidden rounded-xl shadow-2xl">
            <img
              src="https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Contact Us"
              className="w-full h-auto transform transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="bg-white shadow-md rounded-xl p-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We would love to hear from you! Please fill out the form below or
              contact us directly through our contact information.
            </p>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  rows="4"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button className="cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-md hover:shadow-lg">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="py-12 space-y-10 bg-white rounded-2xl shadow-sm px-6 mb-12">
        <h2 className="text-slate-800 text-3xl md:text-4xl font-bold text-center relative">
          <span className="relative inline-block after:content-[''] after:absolute after:w-20 after:h-1 after:bg-indigo-500 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded-full pb-4">
            Contact Information
          </span>
        </h2>

        <p className="text-gray-600 text-center max-w-2xl mx-auto">
          Reach out to us directly through any of the following channels.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm flex flex-col items-center transform transition-all duration-300 hover:-translate-y-2">
            <div className="bg-indigo-100 p-4 rounded-full mb-4">
              <FaPhone className="text-indigo-600 text-xl" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Phone</h3>
            <p className="text-gray-600 text-center">+60 12-345 6789</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow-sm flex flex-col items-center transform transition-all duration-300 hover:-translate-y-2">
            <div className="bg-indigo-100 p-4 rounded-full mb-4">
              <FaEnvelope className="text-indigo-600 text-xl" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Email</h3>
            <p className="text-gray-600 text-center">
              contact@malaysiaoffice.my
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow-sm flex flex-col items-center transform transition-all duration-300 hover:-translate-y-2">
            <div className="bg-indigo-100 p-4 rounded-full mb-4">
              <FaMapMarkedAlt className="text-indigo-600 text-xl" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Address</h3>
            <p className="text-gray-600 text-center">
              456 Jalan Ampang, Kuala Lumpur, Malaysia
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate("/")}
            className="cursor-pointer bg-white hover:bg-gray-100 text-indigo-600 font-semibold py-3 px-8 rounded-lg border border-indigo-600 transition duration-300 shadow-md hover:shadow-lg flex items-center"
          >
            Back to Home
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
