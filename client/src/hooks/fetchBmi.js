export const fetchBMI = async (weight, height) => {
  const url = `https://body-mass-index-bmi-calculator.p.rapidapi.com/metric?weight=${weight}&height=${height}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      "X-RapidAPI-Host": "body-mass-index-bmi-calculator.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to fetch BMI data");
    }
    const data = await response.json();
    return data.bmi;
  } catch (error) {
    throw new Error("Failed to fetch BMI data");
  }
};
