import { useNavigate } from "react-router-dom";
import Page from "../../components/Page";
import bike1 from "../../assets/terrotm1.jpg";
import bike2 from "../../assets/terrotm2.jpg";
import bike4 from "../../assets/terrotm3.jpg";
import "../../Pages.css";

function UpcomingBikes() {
  const navigate = useNavigate(); // Hook for navigation

  const upcomingBikes = [
    {
      img: bike1,
      name: "Sino SL-4 TC",
      slug: "bmw-s1000rr",
      desc: "A high-performance machine with cutting-edge technology.",
      specs: [
        "999cc Engine",
        "205 HP",
        "6-Speed Gearbox",
        "Dynamic Traction Control",
      ],
    },
    {
      img: bike2,
      name: "Terrot Group",
      slug: "suzuki-hayabusa",
      desc: "A legendary machines with immense power and aerodynamics.",
      specs: [
        "1340cc Engine",
        "190 HP",
        "Top Speed: 299 km/h",
        "Brembo Brakes",
      ],
    },
    {
      img: bike4,
      name: "Fine gauge ",
      slug: "ktm-duke-990",
      desc: "A powerful and aggressive streetfighter coming soon.",
      specs: [
        "999cc Twin Cylinder",
        "125 HP",
        "Lightweight Chassis",
        "Quick Shifter",
      ],
    },
    {
      img: bike1,
      name: "Terrot Computer Single Jersey",
      slug: "yamaha-r1",
      desc: "A fast and powerful machine.",
      specs: ["998cc Engine", "200 HP", "Lightweight Chassis", "Quick Shifter"],
    },
    {
      img: bike2,
      name: "Sino SL-4 TC",
      slug: "ducati-v8",
      desc: "A premium knitting with high performance.",
      specs: [
        "1103cc Engine",
        "214 HP",
        "Lightweight Chassis",
        "Brembo Brakes",
      ],
    },
    {
      img: bike4,
      name: "Terrot Group",
      slug: "ktm-duke-990",
      desc: "A powerful and aggressive streetfighter coming soon.",
      specs: [
        "999cc Twin Cylinder",
        "125 HP",
        "Lightweight Chassis",
        "Quick Shifter",
      ],
    },
  ];

  return (
    <Page>
      <div className="home-container">
        <h1 className="page-title">🚀 Machines </h1>
        <p className="page-subtitle">Choose an Machine for your need</p>

        <div className="page-container">
          {upcomingBikes.map((bike, index) => (
            <div key={index} className="page-card">
              <img src={bike.img} alt={bike.name} className="page-image" />
              <div className="bike-details">
                <h2>{bike.name}</h2>
                <p className="bike-desc">{bike.desc}</p>
                <ul className="bike-specs">
                  {bike.specs.map((spec, i) => (
                    <li key={i}>✅ {spec}</li>
                  ))}
                </ul>
                <button
                  className="learn-more"
                  onClick={() => navigate(`/bike-details/${bike.slug}`)}
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}

export default UpcomingBikes;
