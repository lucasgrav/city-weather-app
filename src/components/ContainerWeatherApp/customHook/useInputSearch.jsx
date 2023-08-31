import { useState } from "react";
import axios from "axios";

const useInputSearch = () => {
  const [valueInput, setValueInput] = useState();
  const [weather, setWeather] = useState();
  const [country, setCountry] = useState();
  const [error, setError] = useState("");
  const [loaderSearching, setLoaderSearching] = useState(false);

  const handleError = (event) => {
    if (!/^[^0-9!@#$%^&*()_+=[\]{};':"\\|,.<>/?]*$/.test(event.target.value)) {
      setError("Please do not type special characters.");
    } else if (!/^(?:(?!\s{2,}).)*$/.test(event.target.value)) {
      setError("Do not use double space.");
    } else {
      setError("");
    }
  };
  const handleInput = (event) => {
    setValueInput(event.target.value);
    handleError(event);
  };

  const fetchData = async () => {
    try {
      setLoaderSearching(true);
      const { data } = await axios(
        `https://api.openweathermap.org/geo/1.0/direct?q=${valueInput}&limit=5&appid=${import.meta.env.VITE_API_KEY}&units=metric`
      );
      if (data.length || data.length === 0) {
        setLoaderSearching(false);
      }
      setCountry(data);

      const weatherData = await Promise.all(
        data.map(async (country) => {
          const { data } = await axios(
            `https://api.openweathermap.org/data/2.5/weather?lat=${country.lat}&lon=${country.lon}&appid=${import.meta.env.VITE_API_KEY}&units=metric`
          );
          return data;
        })
      );
      setWeather(weatherData);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    valueInput,
    handleInput,
    fetchData,
    weather,
    country,
    error,
    loaderSearching,
  };
};

export default useInputSearch;
