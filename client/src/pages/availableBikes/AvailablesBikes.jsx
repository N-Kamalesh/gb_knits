import Page from "../../components/Page";
import bike1 from "../../assets/terrotm1.jpg";
import bike2 from "../../assets/terrotm2.jpg";
import bike3 from "../../assets/terrotm3.jpg";
import bike4 from "../../assets/terrotm4.avif";
import "../../Pages.css";

function AvailableBikes() {
  const availableBikes = [
    {
      img: bike1,
      name: "Sino SL-4 TC",
      desc: "A fast and powerful sportbike with cutting-edge performance.",
      price: "₹20,39,000",
      onRoadPrice: "₹22,50,000",
    },
    {
      img: bike2,
      name: "Terrot Group",
      desc: "A premium superbike with aggressive design and high-end tech.",
      price: "₹27,41,000",
      onRoadPrice: "₹30,25,000",
    },
    {
      img: bike3,
      name: "Fine gauge",
      desc: "A track-focused superbike with exceptional speed and handling.",
      price: "₹16,30,000",
      onRoadPrice: "₹18,50,000",
    },
    {
      img: bike4,
      name: "Terrot Computer Single Jersey",
      desc: "A race-ready superbike designed for ultimate power and aerodynamics.",
      price: "₹19,80,000",
      onRoadPrice: "₹21,90,000",
    },
    {
      img: bike1,
      name: "Fine gauge ",
      desc: "A lightweight and agile sportbike perfect for everyday riding.",
      price: "₹3,16,000",
      onRoadPrice: "₹3,55,000",
    },
  ];

  return (
    <Page>
      <h1 className="page-title">🏍️ Available Bikes</h1>
      <p className="page-subtitle">
        Explore our range of high-performance superbikes available now!
      </p>

      <div className="page-container">
        {availableBikes.map((bike, index) => (
          <div key={index} className="page-card">
            <img src={bike.img} alt={bike.name} className="page-image" />
            <div className="bike-details">
              <h2>{bike.name}</h2>
              <p className="bike-desc">{bike.desc}</p>
              <p className="bike-price">
                <strong>Ex-Showroom Price:</strong> {bike.price}
              </p>
              <p className="bike-onroad-price">
                <strong>On-Road Price:</strong> {bike.onRoadPrice}
              </p>
              <button className="buy-now">Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
}

export default AvailableBikes;
