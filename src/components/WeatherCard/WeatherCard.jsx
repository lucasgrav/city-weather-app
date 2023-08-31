import style from "./WeatherCard.module.css";

const WeatherCard = ({
  name,
  temp,
  description,
  country,
  humidity,
  state,
  icon,
  timezone,
}) => {
  var currentDate = new Date();

  var timezoneOffset = timezone * 1000;

  var newDate = new Date(currentDate.getTime() + timezoneOffset);

  var hours = newDate.getUTCHours();
  var minutes = newDate.getUTCMinutes();
  return (
    <article className={style.weatherCard}>
      <div>
        <h2 className={style.temperature}>{Math.floor(temp)} ° </h2>
        <img src={icon && `https://openweathermap.org/img/wn/${icon}@2x.png`} />
      </div>

      <h3 className={style.description}>{description} </h3>
      <p>Humidity {humidity} <strong>%</strong></p>
      <p>
        {hours + ":" + (minutes < 10 ? "0" : "") + minutes}{" "}
        {hours >= 12 ? "PM" : "AM"}
      </p>

      <h2 className={style.nameOfCity}>
        {name}, {state ? `${state},` : "" } {country}{" "}
      </h2>
    </article>
  );
};

export default WeatherCard;
