import { useState, useEffect } from "react";
import Page from "../../components/Page";
import "./AboutPage.css";


function AboutPage() {
  const localStorageKey = "gb-showroom-reviews";

  const defaultReviews = [
    { name: "Kavin Kumar", rating: 5, feedback: "Amazing service and a great selection of machines!" },
    { name: "Harish", rating: 4, feedback: "Good experience, but wish they had more accessories." },
    { name: "Manoj Kumar", rating: 5, feedback: "Best textile showroom in town!" }
  ];
 
  const [reviews, setReviews] = useState(() => {
    const stored = localStorage.getItem(localStorageKey);
    return stored ? JSON.parse(stored) : defaultReviews;
  });

  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(reviews));
  }, [reviews]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && feedback) {
      const newReview = { name, rating, feedback };
      setReviews([...reviews, newReview]);
      setName("");
      setRating(5);
      setFeedback("");
    } else {
      alert("Please enter your name and feedback.");
    }
  };

  const handleDelete = (indexToDelete) => {
    const updatedReviews = reviews.filter((_, index) => index !== indexToDelete);
    setReviews(updatedReviews);
  };
  
  

  return (
    <Page>
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4 py-12">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Header */}
          <section className="text-center">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500">
              Welcome to GB Knits
            </h1>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Discover a premium range of textile machinery and accessories designed for unmatched performance and quality.
            </p>
          </section>

          {/* Feedback Section */}
          <section>
            <h2 className="text-3xl font-bold text-center text-orange-400 mb-10">Customer Feedback</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Reviews */}
              <div className="space-y-6">
                {reviews.map((review, index) => (
                  <div key={index} className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-xl shadow-md hover:shadow-purple-700/20 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-white">{review.name}</h3>
                      <p className="text-yellow-400 text-sm">{'⭐'.repeat(review.rating)}</p>
                    </div>
                    <p className="text-gray-300 italic">"{review.feedback}"</p>
                    <button
                      onClick={() => handleDelete(index)}
                      className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm transition"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>

              {/* Feedback Form */}
              <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-xl shadow-md">
                <h3 className="text-2xl font-bold mb-4 text-white">Leave Your Feedback</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400"
                    required
                  />
                  <select
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                    className="w-full p-3 rounded bg-gray-800 text-white"
                  >
                    {[5, 4, 3, 2, 1].map(num => (
                      <option key={num} value={num}>{num} Stars</option>
                    ))}
                  </select>
                  <textarea
                    placeholder="Your Feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400"
                    rows="4"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-full text-white font-semibold hover:shadow-lg transition"
                  >
                    Submit Feedback
                  </button>
                </form>
              </div>
            </div>
          </section>

          {/* Company Info */}
          <section>
            <h2 className="text-3xl font-bold text-orange-400 mb-8 text-center">About Our Company</h2>
            <div className="flex flex-col md:flex-row items-center gap-10">
              <img
                src="./assets/Mayer.jpg"
                alt="Our Company"
                className="rounded-xl shadow-lg w-full md:w-1/2 object-cover max-h-[300px]"
              />
              <p className="text-gray-300 text-lg leading-relaxed">
                GB Knits is a pioneer in the textile industry, providing state-of-the-art machinery and unmatched support.
                We empower businesses with innovative solutions and world-class customer service. With years of expertise
                and a commitment to excellence, we’re proud to be the go-to destination for textile professionals across the globe.
              </p>
            </div>
          </section>
        </div>
      </div>
    </Page>
  );
}

export default AboutPage;

