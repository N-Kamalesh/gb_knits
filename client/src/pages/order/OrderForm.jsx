import { useState } from "react";
import "./OrderForm.css";

import cottonred from "../../assets/fabricPreviews/cotton_red.jpg";
import cottonblue from "../../assets/fabricPreviews/cotton_blue.jpg";
import cottongreen from "../../assets/fabricPreviews/cotton_green.jpg";
import woolred from "../../assets/fabricPreviews/wool_red.jpg";
import woolblue from "../../assets/fabricPreviews/wool_blue.jpg";
import woolgreen from "../../assets/fabricPreviews/wool_green.webp";
import polyesterred from "../../assets/fabricPreviews/polyester_red.jpg";
import polyesterblue from "../../assets/fabricPreviews/polyester_blue.jpg";
import polyestergreen from "../../assets/fabricPreviews/polyester_green.jpg";

import unitexImg from "../../assets/unitex.jpg";
import terrotImg from "../../assets/terrot1.png";
import mayerImg from "../../assets/Mayer.jpg";

const { VITE_API_URL } = import.meta.env;

function OrderForm() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [machineType, setMachineType] = useState("");
  const [brand, setBrand] = useState("");
  const [fabric, setFabric] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState("");
  const [diameter, setDiameter] = useState("");

  const getRate = () => {
    if (
      machineType === "loop knit" &&
      brand === "unitex" &&
      fabric === "cotton"
    ) {
      return 10;
    } else if (
      machineType === "single jersey" &&
      brand === "unitex" &&
      fabric === "cotton"
    ) {
      return 12;
    } else if (machineType === "loop knit") {
      return 11;
    } else if (machineType === "single jersey") {
      return 13;
    }
    return 15;
  };

  const rate = getRate();
  const amount = quantity * rate;

  const fabricImages = {
    cotton_red: cottonred,
    cotton_blue: cottonblue,
    cotton_green: cottongreen,
    wool_red: woolred,
    wool_blue: woolblue,
    wool_green: woolgreen,
    polyester_red: polyesterred,
    polyester_blue: polyesterblue,
    polyester_green: polyestergreen,
  };

  const brandImages = {
    unitex: unitexImg,
    terrot: terrotImg,
    mayer: mayerImg,
  };

  const fabricKey = `${fabric}_${color}`.toLowerCase();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleProceedToPayment = async () => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    const orderData = {
      name,
      address,
      machineType,
      brand,
      fabric,
      color,
      quantity,
      diameter,
      amount,
    };

    const options = {
      key: "rzp_test_xJn1KfhqB0jUwu", // Replace with live key in prod
      amount: amount * 100,
      currency: "INR",
      name: "GB KNITS",
      description: "Textile Order Payment",
      handler: async function (response) {
        try {
          const token = sessionStorage.getItem("token");
          const res = await fetch(`${VITE_API_URL}/order/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              ...orderData,
              paymentId: response.razorpay_payment_id,
            }),
          });

          const data = await res.json();
          if (!data.success) {
            alert("Order creation failed: " + data.error);
          } else {
            alert("Payment successful and order placed!");
            // Reset form (optional)
            setName("");
            setAddress("");
            setMachineType("");
            setBrand("");
            setFabric("");
            setColor("");
            setQuantity("");
            setDiameter("");
          }
        } catch (err) {
          console.error(err);
          alert("Payment succeeded but order creation failed.");
        }
      },
      prefill: {
        name: name,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="order-form-container">
      <div className="form-box">
        <h2>Place Your Textile Order</h2>

        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Address</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <label>Machine Type</label>
        <select
          value={machineType}
          onChange={(e) => setMachineType(e.target.value)}
        >
          <option value="">Select machine type</option>
          <option value="loop knit">Single Jersey Loop Knit</option>
          <option value="interlock">Interlock</option>
          <option value="rib">Rib Knit</option>
        </select>

        <label>Machine Brand</label>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          <option value="">Select brand</option>
          <option value="unitex">Unitex</option>
          <option value="terrot">Terrot</option>
          <option value="mayer">Mayer & Cie</option>
        </select>

        <label>Fabric Type</label>
        <select value={fabric} onChange={(e) => setFabric(e.target.value)}>
          <option value="">Select fabric</option>
          <option value="cotton">Cotton</option>
          <option value="wool">Wool</option>
          <option value="polyester">Polyester</option>
        </select>

        <label>Color</label>
        <select value={color} onChange={(e) => setColor(e.target.value)}>
          <option value="">Select color</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
        </select>

        <label>Diameter (in inches)</label>
        <input
          type="text"
          value={diameter}
          onChange={(e) => setDiameter(e.target.value)}
        />

        <label>Quantity (kgs)</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <div className="amount-display p-0">
          Amount: <strong>₹{amount}</strong>
        </div>

        <button onClick={handleProceedToPayment} className="mt-6 w-full">
          Proceed to Payment
        </button>
      </div>

      <div className="preview-image-box">
        <h4>Live Preview</h4>

        {fabric && color && fabricImages[fabricKey] && (
          <div className="preview-block">
            <p className="preview-label">
              Fabric: {fabric} ({color})
            </p>
            <img src={fabricImages[fabricKey]} alt="Fabric Preview" />
          </div>
        )}

        {brand && brandImages[brand] && (
          <div className="preview-block">
            <p className="preview-label">Machine: {brand}</p>
            <img src={brandImages[brand]} alt="Machine Preview" />
          </div>
        )}

        {(!fabric || !color) && !brand && (
          <p className="placeholder-text">
            Select fabric + color and/or brand to see preview.
          </p>
        )}
      </div>
    </div>
  );
}

export default OrderForm;
