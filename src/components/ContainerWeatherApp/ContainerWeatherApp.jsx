import { useState } from "react";
import InputSearch from "../InputSearchCountry/InputSearch";
import WeatherCard from "../WeatherCard/WeatherCard";
import style from "./ContainerWeather.module.css";
import useInputSearch from "./customHook/useInputSearch";
import Loader from "../Loader/Loader";

const ContainerWeatherApp = () => {
  const {
    handleInput,
    fetchData,
    weather,
    country,
    error,
    valueInput,
    loaderSearching,
  } = useInputSearch();

  return (
    <div className={style.containerWeather}>
      <div className={style.containerTittle}>
        <h2 className={style.cityTittle}>city</h2>
        <h2 className={style.weatherTittle}>weather</h2>
      </div>

      <InputSearch
        handleInput={handleInput}
        fetchData={fetchData}
        error={error}
        valueInput={valueInput}
      />

      {!country ? (
        loaderSearching ? (
          <Loader />
        ) : (
          <div className={style.containerWelcome}>
            <h2>welcome,</h2>
            <h2>search the city,</h2>
            <h2 className={style.lookTittle}>look</h2>
            <h2>at</h2>
            <h2 className={style.lookTittle}>the weather</h2>
          </div>
        )
      ) : (
        <>
          {loaderSearching ? (
            <div className={style.containerNotFound}>
              <Loader />
            </div>
          ) : (
            <>
              {country?.length === 0 && (
                <div className={style.containerNotFound}>
                  {" "}
                  <h2>The city was not found</h2>
                </div>
              )}
            </>
          )}
        </>
      )}
      <div className={style.containerCards}>
        {!loaderSearching &&
          weather?.map((weather, index) => (
            <WeatherCard
              name={country[index]?.name}
              state={country[index]?.state}
              temp={weather.main.temp}
              description={weather.weather[0].description}
              country={country[index]?.country}
              humidity={weather.main.humidity}
              icon={weather.weather[0].icon}
              timezone={weather.timezone}
              key={index}
            />
          ))}
      </div>
    </div>
  );
};
export default ContainerWeatherApp;
