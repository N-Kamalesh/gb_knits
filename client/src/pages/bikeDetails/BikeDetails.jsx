import { useParams, Link } from "react-router-dom";
import Page from "../../components/Page";
import bike1 from "../../assets/terrotm1.jpg";
import bike2 from "../../assets/terrotm2.jpg";
import bike4 from "../../assets/terrotm3.jpg";
import bike7 from "../../assets/terrotm4.avif";
import bike6 from "../../assets/bike6.jpg";
import "./BikeDetails.css";

const bikeData = {
  "bmw-s1000rr": {
    name: "Sino SL-4 TC ",
    img: bike1,
    engine: "999cc, 4-cylinder",
    tyre: "Bridgestone Battlax",
    groundClearance: "140mm",
    mileage: "Double racking ",
    topSpeed: "1.5m/s",
    rpm: "13,500 RPM",
    power: "205 HP",
    oilCapacity: "16.5L",
    headlight: "LED",
    indicators: "LED",
    suspension: "Fully adjustable front & rear suspension",
  },
  "suzuki-hayabusa": {
    name: "Terrot Group ",
    img: bike2,
    engine: "1340cc, 4-cylinder",
    tyre: "Bridgestone Battlax Hypersport",
    groundClearance: "120mm",
    mileage: "11 km/l",
    topSpeed: "312 km/h",
    rpm: "11,500 RPM",
    power: "190 HP",
    oilCapacity: "20L",
    headlight: "LED",
    indicators: "LED",
    suspension: "Inverted front fork, monoshock rear",
  },
  "ktm-duke-990": {
    name: "Fine gauge",
    img: bike4,
    engine: "999cc, Twin Cylinder",
    tyre: "Metzeler Sportec M7",
    groundClearance: "150mm",
    mileage: "18 km/l",
    topSpeed: "250 km/h",
    rpm: "12,000 RPM",
    power: "125 HP",
    oilCapacity: "14L",
    headlight: "LED",
    indicators: "LED",
    suspension: "WP APEX front & rear",
  },
  "yamaha-r1": {
    name: "Terrot Computer Single Jersey",
    img: bike7,
    engine: "998cc, 4-cylinder",
    tyre: "Michelin Power RS",
    groundClearance: "130mm",
    mileage: "14 km/l",
    topSpeed: "299 km/h",
    rpm: "13,500 RPM",
    power: "200 HP",
    oilCapacity: "17L",
    headlight: "LED",
    indicators: "LED",
    suspension: "KYB front & rear",
  },
  "ducati-v8": {
    name: "Sino SL-4 TC",
    img: bike6,
    engine: "1103cc, V4",
    tyre: "Pirelli Diablo Supercorsa",
    groundClearance: "125mm",
    mileage: "12 km/l",
    topSpeed: "320 km/h",
    rpm: "14,000 RPM",
    power: "214 HP",
    oilCapacity: "16L",
    headlight: "Full LED",
    indicators: "Dynamic LED",
    suspension: "Ohlins fully adjustable",
  },
};

function BikeDetails() {
  const { slug } = useParams();
  const bike = bikeData[slug];

  if (!bike) {
    return (
      <Page>
        <h1>Bike not found!</h1>
      </Page>
    );
  }

  return (
    <Page>
      <div className="bike-details-container">
        <div className="bike-image-wrapper">
          <img src={bike.img} alt={bike.name} className="bike-details-image" />
          <Link to="/enquiry" className="bike-details-button">
            Enquire Now
          </Link>
        </div>

        <div className="bike-info">
          <h1 className="bike-title">{bike.name}</h1>
          <div className="specs-grid">
            <p>
              <strong>Engine:</strong> {bike.engine}
            </p>
            <p>
              <strong>Bed Configuration:</strong> {bike.tyre}
            </p>
            <p>
              <strong>Mechanism:</strong> {bike.mileage}
            </p>
            <p>
              <strong>Top Speed:</strong> {bike.topSpeed}
            </p>
            <p>
              <strong>RPM:</strong> {bike.rpm}
            </p>
            <p>
              <strong>Power:</strong> {bike.power}
            </p>
            <p>
              <strong>Oil Capacity:</strong> {bike.oilCapacity}
            </p>
            <p>
              <strong>Indicators:</strong> {bike.indicators}
            </p>
            <p>
              <strong>Suspension:</strong> {bike.suspension}
            </p>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default BikeDetails;
