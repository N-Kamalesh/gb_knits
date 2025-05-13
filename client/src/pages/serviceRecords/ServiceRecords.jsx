import Page from "../../components/Page";
import "./Sr.css";

function ServiceRecords() {
  const records = [
    {
      name: "Yamaha R1",
      date: "2024-02-10",
      service: "Oil Change",
      cost: "₹3,500",
      nextService: "2024-08-10",
      mechanic: "John's Garage",
    },
    {
      name: "Ducati Panigale",
      date: "2024-01-20",
      service: "Full Service",
      cost: "₹12,000",
      nextService: "2024-07-20",
      mechanic: "Speed Motors",
    },
    {
      name: "Kawasaki Ninja ZX-10R",
      date: "2023-12-15",
      service: "Brake Pad Replacement",
      cost: "₹7,500",
      nextService: "2024-06-15",
      mechanic: "Moto Works",
    },
    {
      name: "KTM Duke 390",
      date: "2024-01-05",
      service: "Chain Lubrication & Engine Tuning",
      cost: "₹2,000",
      nextService: "2024-07-05",
      mechanic: "KTM Service Hub",
    },
  ];

  return (
    <Page>
      <div className="home-container">
        <h1 className="page-title">🔧 Service Records</h1>
        <p className="page-subtitle">
          Keep track of your bike&apos;s maintenance history and upcoming
          service dates.
        </p>

        <div className="service-list">
          {records.map((record, index) => (
            <div key={index} className="service-card">
              <h2>{record.name}</h2>
              <p>
                <strong>Last Serviced:</strong> {record.date}
              </p>
              <p>
                <strong>Service Type:</strong> {record.service}
              </p>
              <p>
                <strong>Service Cost:</strong> {record.cost}
              </p>
              <p>
                <strong>Next Service Due:</strong> {record.nextService}
              </p>
              <p>
                <strong>Serviced At:</strong> {record.mechanic}
              </p>
              <button className="book-service">Book Next Service</button>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}

export default ServiceRecords;
