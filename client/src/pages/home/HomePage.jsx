import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bike1 from "../../assets/terrot1.png";
import bike2 from "../../assets/unitex.jpg";
import bike3 from "../../assets/Mayer.jpg";
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
    { img: bike6, name: "Mayer & Cie" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bikeImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [bikeImages.length]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section with Premium Carousel */}
      <div className="relative h-[600px] w-full overflow-hidden">
        {/* Background Glow Effect */}
        <div className="animate-gradient-shift absolute inset-0 z-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>

        {/* Background Pattern */}
        <div className="absolute h-full w-full scale-[1.2] transform bg-[url('./assets/home-coro2.png')] bg-cover opacity-10 blur-2xl"></div>

        {/* Carousel */}
        <div className="relative h-full w-full">
          {bikeImages.map((item, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                idx === currentImage
                  ? "translate-x-0 scale-100 opacity-100"
                  : "translate-x-full scale-95 opacity-0"
              }`}
            >
              <img
                src={item.img}
                alt={item.name}
                className="h-full w-full origin-center transform object-cover brightness-95 transition-transform duration-[1500ms] hover:rotate-[1deg] hover:scale-[1.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 z-10 w-full p-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center">
              <div className="mr-4 h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <h1 className="animate-pulse-glow mb-2 text-5xl font-bold tracking-tight text-white">
                <span className="animate-shine inline-block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  {bikeImages[currentImage].name}
                </span>
              </h1>
            </div>
            <p className="mb-6 ml-20 text-xl text-gray-200">
              Premium textile machinery for exceptional performance and
              reliability
            </p>
            <button
              className="ml-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(120,120,255,0.7)]"
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
              className={`h-3 w-3 rounded-full transition-all ${
                currentImage === idx
                  ? "animate-pulse-glow w-8 bg-white"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Section Title */}
      <div className="bg-black/40 py-16 text-center backdrop-blur-sm">
        <h2 className="animate-gradient-shift inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-3xl font-bold text-transparent">
          Our Premium Collections
        </h2>
        <div className="animate-pulse-glow mx-auto mt-2 h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      </div>

      {/* Featured Cards with Premium Design */}
      <div className="w-full bg-gradient-to-b from-black/90 to-gray-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Terrot",
                desc: "Latest textile machines model in Terrot!",
                img: bike1,
                path: "/upcoming-bikes",
              },
              {
                title: "Unitex",
                desc: "Explore our range of available machines.",
                img: bike2,
                path: "/available-bikes",
              },
              {
                title: "Mayer & Cie",
                desc: "Find high-quality accessories.",
                img: bike3,
                path: "/bike-accessories",
              },
              {
                title: "Orizio",
                desc: "Latest textile machines model in Orizio!",
                img: bike0,
                path: "/service-records",
              },
            ].map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(item.path)}
                className="glass-effect group relative transform cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 transition-all duration-500 hover:-rotate-1 hover:scale-105 hover:shadow-[0_15px_40px_rgba(59,130,246,0.3)]"
              >
                {/* Card Inner Content */}
                <div className="relative z-10 h-full">
                  {/* Image Container */}
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="h-full w-full transform object-cover transition-transform duration-700 group-hover:rotate-2 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-xl font-semibold text-transparent">
                      {item.title}
                    </h3>
                    <p className="mb-4 text-gray-300">{item.desc}</p>
                    <div className="flex items-center font-medium text-blue-400">
                      <span>Learn more</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-1 h-4 w-4 transform transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Card Glowing Border Effect on Hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-blue-500 to-purple-500 p-[1px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                {/* Card Glow Overlay */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Premium Footer */}
      <footer className="w-full bg-gradient-to-b from-gray-900 to-black py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 pb-12 md:grid-cols-4">
            <div>
              <h4 className="mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-xl font-bold text-transparent">
                Textile Company
              </h4>
              <p className="text-gray-400">
                Premium textile machinery solutions for industry leaders
                worldwide.
              </p>
            </div>
            <div>
              <h5 className="mb-4 font-semibold">Products</h5>
              <ul className="space-y-2 text-gray-400">
                <li className="transition-colors hover:text-blue-400">
                  <a href="#">Circular Knitting</a>
                </li>
                <li className="transition-colors hover:text-blue-400">
                  <a href="#">Flat Knitting</a>
                </li>
                <li className="transition-colors hover:text-blue-400">
                  <a href="#">Weaving</a>
                </li>
                <li className="transition-colors hover:text-blue-400">
                  <a href="#">Accessories</a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="mb-4 font-semibold">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li className="transition-colors hover:text-blue-400">
                  <a href="#">Documentation</a>
                </li>
                <li className="transition-colors hover:text-blue-400">
                  <a href="#">Maintenance</a>
                </li>
                <li className="transition-colors hover:text-blue-400">
                  <a href="#">Training</a>
                </li>
                <li className="transition-colors hover:text-blue-400">
                  <a href="./ContactPage">Contact</a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="mb-4 font-semibold">Connect</h5>
              <div className="flex space-x-4">
                {["Instagram", "Facebook", "Twitter", "LinkedIn"].map(
                  (platform) => (
                    <a
                      key={platform}
                      href="#"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition-colors duration-300 hover:scale-110 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600"
                    >
                      <span className="sr-only">{platform}</span>
                      {/* Simple placeholder for social icons */}
                      <div className="h-5 w-5 text-center text-xs">
                        {platform.charAt(0)}
                      </div>
                    </a>
                  ),
                )}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            <p>&copy; 2025 Textile Company. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
