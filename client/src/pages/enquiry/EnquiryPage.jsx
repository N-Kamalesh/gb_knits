import { useState } from "react";
import "./EnquiryPage.css";

function EnquiryPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    model: "",
    quantity: 1,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order Submitted:", formData);
    alert("Your enquiry has been submitted!");
    // Reset form
    setFormData({
      name: "",
      email: "",
      model: "",
      quantity: 1,
      message: "",
    });
  };

  return (
    <div className="enquiry-container">
      <h1>Order Machine</h1>
      <form onSubmit={handleSubmit} className="enquiry-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Machine Model:
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
          />
        </label>
        <label>
          Message:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
          />
        </label>
        <button type="submit">Submit Enquiry</button>
      </form>
    </div>
  );
}

export default EnquiryPage;
