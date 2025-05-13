import "./Contact.css";
import Whatsapp from "../../components/Whatsapp";

function ContactPage() {
  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Contact Info Card */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-md p-8 rounded-2xl shadow-md">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 mb-6">
              Contact Details
            </h2>

            <div className="space-y-6 text-gray-300">
              <div>
                <h5 className="text-lg font-semibold text-orange-300">Address:</h5>
                <p>
                  Sri Vaari Electrical Building, Karur Main Road, Kalipalayam Post,
                  near Agaram Public School, Dharapuram, Tamil Nadu - 638661
                </p>
              </div>

              <div>
                <h5 className="text-lg font-semibold text-green-400">Whatsapp:</h5>
                <p className="text-white">9788718180</p>
              </div>

              <div>
                <h5 className="text-lg font-semibold text-blue-400">Phone:</h5>
                <p className="text-white">9788718180</p>
              </div>

              <div>
                <h5 className="text-lg font-semibold text-yellow-300">Email:</h5>
                <p className="text-white">gbknits07@gmail.com</p>
              </div>

              <div>
                <h5 className="text-lg font-semibold text-purple-400">Company Open:</h5>
                <p>8 A.M - 8 P.M, Mon - Sat</p>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3936.282064180873!2d77.3618726!3d11.111902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9070049154049%3A0x71ebb6928268048a!2sGB%20Knits!5e0!3m2!1sen!2sin!4v1712816980000!5m2!1sen!2sin"
              style={{ border: 0 }}
              className="w-full h-[400px]"
              allowFullScreen=""
              loading="lazy"
              title="GB Knits Location"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      <Whatsapp />
    </>
  );
}

export default ContactPage;
