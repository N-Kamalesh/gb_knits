import Page from "../../components/Page";
import helmet from "../../assets/helmet.jpg";
import gloves from "../../assets/glove.jpg";
import "../../Pages.css";

function BikeAccessories() {
  const accessories = [
    {
      img: helmet,
      name: "Racing Helmet",
      desc: "Top-quality protective gear.",
    },
    {
      img: gloves,
      name: "Riding Gloves",
      desc: "Comfortable and durable gloves for bikers.",
    },
  ];

  return (
    <Page>
      <h1 className="page-title">Bike Accessories</h1>
      <div className="page-container">
        {accessories.map((item, index) => (
          <div key={index} className="page-card">
            <img src={item.img} alt={item.name} className="page-image" />
            <h2>{item.name}</h2>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </Page>
  );
}

export default BikeAccessories;
