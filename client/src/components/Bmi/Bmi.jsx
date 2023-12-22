import React, { useState } from "react";
import { fetchBMI } from "../../hooks/fetchBmi";
import "./Bmi.css";
import backgroundBmiImage from "../../../public/assets/images/bmi.jpeg";
import { toast } from "react-toastify";

const Bmi = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [btnText, setBtnText] = useState("Calculate");
  const [bmi, setBmi] = useState(null);
  const [weightCategory, setWeightCategory] = useState("");

  const handleFetchBMI = async (e) => {
    e.preventDefault();
    setBtnText("Calculating...");

    try {
      const bmiResult = await fetchBMI(weight, height);
      setBmi(bmiResult.toFixed(1));

      if (bmiResult < 18.5) {
        setWeightCategory("Underweight");
      } else if (bmiResult >= 18.5 && bmiResult < 24.9) {
        setWeightCategory("Normal Weight");
      } else if (bmiResult >= 25 && bmiResult < 29.9) {
        setWeightCategory("Overweight");
      } else {
        setWeightCategory("Obese");
      }
    } catch (error) {
      setBmi(null);
      setWeightCategory("");
      toast.error("Failed to calculate BMI. Please try again.");
    }

    setBtnText("Calculate");
    setWeight("");
    setHeight("");
  };

  return (
    <div
      className="bmi-container"
      style={{
        backgroundImage: `url(${backgroundBmiImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="bmi-container-detail">
        <div className="bmi-content-container">
          <div className="bmi-content">
            <h2>CALCULATE YOUR BMI</h2>
            <h5>
              Effortlessly Determine Your BMI with Our Accurate Calculation Tool
            </h5>

            <form className="form-bmi-detail">
              <div className="input-container">
                <input
                  className="bmi-input"
                  type="text"
                  placeholder="Weight e.g 85kg"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
                <input
                  className="bmi-input"
                  type="text"
                  placeholder="Height e.g 1.72cm"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>

              <button className="btn-bmi-detail" onClick={handleFetchBMI}>
                {btnText}
              </button>
            </form>
            <div className="bmi-result-container">
              {bmi && (
                <p className="bmi-result">
                  Your BMI is: <span>{bmi}</span>
                </p>
              )}
              {weightCategory && (
                <p className="bmi-category">
                  Your Weight Category Is: <span>{weightCategory}</span>
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="bmi-table">
          <table>
            <thead>
              <tr>
                <th>BMI </th>
                <th className="last">Weight Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Below 18.5</td>
                <td>Underweight</td>
              </tr>
              <tr>
                <td>18.5 - 24.9</td>
                <td>Normal</td>
              </tr>
              <tr>
                <td>25 - 29.9</td>
                <td>Overweight</td>
              </tr>
              <tr>
                <td>30 and Above</td>
                <td>Obese</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* <div className="bmi-img">
          <img src={bmiImage} alt="Bmi" />
        </div> */}
      </div>
    </div>
  );
};

export default Bmi;
