export default function Contact() {
    return (
      <div className="max-w-screen-lg mx-auto py-20 px-5">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
  
        {/* Introduction */}
        <p className="text-lg text-gray-700 text-center mb-12">
          Have questions, feedback, or just want to say hi? We're here to help! 
          Feel free to get in touch with us through the form below or using the contact details provided.
        </p>
  
        {/* Contact Form */}
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send Us a Message</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Your Name</label>
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-green-300"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Your Email</label>
              <input
                type="email"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-green-300"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Your Message</label>
              <textarea
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-green-300"
                rows="5"
                placeholder="Write your message"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
  
        {/* Contact Details */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Contact Details</h2>
          <p className="text-lg text-gray-700">
            <strong>Email:</strong> support@eatthissheet.com
          </p>
          <p className="text-lg text-gray-700">
            <strong>Phone:</strong> +1 (123) 456-7890
          </p>
          <p className="text-lg text-gray-700">
            <strong>Address:</strong> 123 Food Street, Taste City, FL 98765
          </p>
        </div>
  
        {/* Map Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Find Us on the Map</h2>
          <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0835674441254!2d-122.41941548468135!3d37.77492977975862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c1b80d83b%3A0x8b153ea78f74b5e2!2sFood%20Street!5e0!3m2!1sen!2sus!4v1680123456789!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    );
  }
  