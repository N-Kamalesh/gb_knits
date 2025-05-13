import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bike1 from "../../assets/terrot1.png";
import bike2 from "../../assets/unitex.jpg";
import bike3 from "../../assets/mayer.jpg";
import bike4 from "../../assets/home-coro1.png";
import bike5 from "../../assets/home-coro2.png";
import bike6 from "../../assets/images.jpeg";
import bike0 from "../../assets/orizio.png";

import "./HomePage.css";

const Index = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  const bikeImages = [
    { img: bike4, name: "Fine gauge" },
    { img: bike5, name: "Terrot" },
    { img: bike6, name: "Mayer & Cie" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bikeImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [bikeImages.length]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white overflow-x-hidden">
      {/* Hero Section with Premium Carousel */}
      <div className="w-full h-[600px] relative overflow-hidden">
        {/* Background Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20 z-0 animate-gradient-shift"></div>
        
        {/* Background Pattern */}
        <div className="absolute w-full h-full transform scale-[1.2] opacity-10 bg-[url('./assets/home-coro2.png')] bg-cover blur-2xl"></div>
        
        {/* Carousel */}
        <div className="relative h-full w-full">
          {bikeImages.map((item, idx) => (
            <div 
              key={idx} 
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                idx === currentImage 
                  ? "opacity-100 translate-x-0 scale-100" 
                  : "opacity-0 translate-x-full scale-95"
              }`}
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-[1500ms] transform origin-center hover:scale-[1.1] hover:rotate-[1deg] brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          ))}
        </div>
        
        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-8 z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center">
              <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-4"></div>
              <h1 className="text-5xl font-bold mb-2 text-white tracking-tight animate-pulse-glow">
                <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 animate-shine">
                  {bikeImages[currentImage].name}
                </span>
              </h1>
            </div>
            <p className="text-xl text-gray-200 mb-6 ml-20">
              Premium textile machinery for exceptional performance and reliability
            </p>
            <button 
              className="ml-20 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-medium 
                        transition-all duration-300 hover:shadow-[0_0_20px_rgba(120,120,255,0.7)] hover:scale-105"
              onClick={() => navigate("/explore")}
            >
              Explore Collection
            </button>
          </div>
        </div>
        
        {/* Carousel Indicators */}
        <div className="absolute bottom-6 right-6 flex space-x-2">
          {bikeImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentImage === idx 
                  ? "bg-white w-8 animate-pulse-glow" 
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Section Title */}
      <div className="text-center py-16 bg-black/40 backdrop-blur-sm">
        <h2 className="text-3xl font-bold inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text animate-gradient-shift">
          Our Premium Collections
        </h2>
        <div className="w-24 h-1 mx-auto mt-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse-glow"></div>
      </div>

      {/* Featured Cards with Premium Design */}
      <div className="w-full bg-gradient-to-b from-black/90 to-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[ 
              { title: "Terrot", desc: "Latest textile machines model in Terrot!", img: bike1, path: "/upcoming-bikes" },
              { title: "Unitex", desc: "Explore our range of available machines.", img: bike2, path: "/available-bikes" },
              { title: "Mayer & Cie", desc: "Find high-quality accessories.", img: bike3, path: "/bike-accessories" },
              { title: "Orizio", desc: "Latest textile machines model in Orizio!", img: bike0, path: "/service-records" }
            ].map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(item.path)}
                className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden cursor-pointer glass-effect transition-all duration-500 transform hover:scale-105 hover:-rotate-1 hover:shadow-[0_15px_40px_rgba(59,130,246,0.3)]"
              >
                {/* Card Inner Content */}
                <div className="relative z-10 h-full">
                  {/* Image Container */}
                  <div className="overflow-hidden h-48">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 mb-4">
                      {item.desc}
                    </p>
                    <div className="flex items-center text-blue-400 font-medium">
                      <span>Learn more</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Card Glowing Border Effect on Hover */}
                <div className="absolute inset-0 rounded-xl p-[1px] bg-gradient-to-r from-transparent via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Card Glow Overlay */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Premium Footer */}
      <footer className="w-full bg-gradient-to-b from-gray-900 to-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 pb-12">
            <div>
              <h4 className="font-bold text-xl mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Textile Company
              </h4>
              <p className="text-gray-400">
                Premium textile machinery solutions for industry leaders worldwide.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Products</h5>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-blue-400 transition-colors"><a href="#">Circular Knitting</a></li>
                <li className="hover:text-blue-400 transition-colors"><a href="#">Flat Knitting</a></li>
                <li className="hover:text-blue-400 transition-colors"><a href="#">Weaving</a></li>
                <li className="hover:text-blue-400 transition-colors"><a href="#">Accessories</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-blue-400 transition-colors"><a href="#">Documentation</a></li>
                <li className="hover:text-blue-400 transition-colors"><a href="#">Maintenance</a></li>
                <li className="hover:text-blue-400 transition-colors"><a href="#">Training</a></li>
                <li className="hover:text-blue-400 transition-colors"><a href="./ContactPage">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Connect</h5>
              <div className="flex space-x-4">
                {["Instagram", "Facebook", "Twitter", "LinkedIn"].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-colors duration-300 hover:scale-110"
                  >
                    <span className="sr-only">{platform}</span>
                    {/* Simple placeholder for social icons */}
                    <div className="w-5 h-5 text-center text-xs">{platform.charAt(0)}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-8 text-center text-sm text-gray-500 border-t border-gray-800">
            <p>&copy; 2025 Textile Company. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;