import { Result } from "postcss";
import React, { useState } from "react";

const logo = require('../src/assets/gps.webp') ;

const api = {
  key: "98921991d88bc3b801bf5395d85842e8",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setquery] = useState("");
  const [weather, setweather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setweather(result);
          setquery("");
          console.log(result);
        });
    }
  };

  //Function for current date
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <div className="main w-screen h-screen px-10">
        <input
          type="text"
          className="w-full mb-5 search focus:outline-0 focus:bg-slate-50 text-3xl p-2 "
          placeholder="Search..."
          onChange={(e) => setquery(e.target.value)}
          value={query}
          onKeyPress={search}
        />
{(typeof weather.main !=="undefined") ?(
         <div>
          <h1 className="text-4xl text-center mt-6 uppercase location">
            {weather.name},{weather.sys.country}
          </h1>
          <h1 className="text-2xl text-center mt-3 date uppercase text-zinc-900">
            {dateBuilder(new Date())}
          </h1>

          <div className="temp  flex  flex-col justify-center items-center my-7  ">
            <h1 className="text-white text-8xl my-6">{Math.round(weather.main.temp)}°c</h1>
            <h1 className="text-white weather text-6xl mb-7">{weather.weather[0].main}</h1>
          </div>
        </div>)
         :(
          <div className="temp px-5 py-5 flex  flex-col justify-center items-center my-7">
            <img src={logo} className="w-2/4" />
            <h1 className="text-white hero text-2xl font-semibold">Get current Weather in your location </h1>
          </div>
         )}
        
      </div>
    </div>
  );
}

export default App;
