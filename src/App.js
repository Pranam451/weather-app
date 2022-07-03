import { Result } from "postcss";
import React, { useState } from "react";
import { dateBuilder } from "./utils";

const logo = require("../src/assets/gps.webp");
const bg = require("../src/assets/bg.jpg");
const rain = require("../src/assets/rain.jpg");
const cloud = require("../src/assets/cloud.jpg");
const haze = require("../src/assets/haze.jpg");
const clear = require("../src/assets/clear.jpg");

const api = {
  key: `${process.env.REACT_APP_KEY}`,
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

  return (
    <div className="">
      {!weather.weather && (
        <img src={bg} alt="" className="w-screen h-screen absolute -z-10" />
      )}
      {typeof weather.main != "undefined" &&
        weather.weather[0]?.main == "Rain" && (
          <img src={rain} alt="" className="w-screen h-screen absolute -z-10" />
        )}
      {typeof weather.main != "undefined" &&
        weather.weather[0]?.main == "Clear" && (
          <img
            src={clear}
            alt=""
            className="w-screen h-screen absolute -z-10"
          />
        )}
      {typeof weather.main != "undefined" &&
        weather.weather[0]?.main == "Clouds" && (
          <img
            src={cloud}
            alt=""
            className="w-screen h-screen absolute -z-10"
          />
        )}
      {typeof weather.main != "undefined" &&
        weather.weather[0]?.main == "Haze" && (
          <img src={haze} alt="" className="w-screen h-screen absolute -z-10" />
        )}

      <div className="main w-screen h-screen px-10">
        <input
          type="text"
          className="w-full mb-5 search focus:outline-0 focus:bg-slate-50 text-3xl p-2 "
          placeholder="Search..."
          onChange={(e) => setquery(e.target.value)}
          value={query}
          onKeyPress={search}
        />
        {weather.main ? (
          <div>
            <h1 className="text-4xl text-center mt-6 uppercase location">
              {weather.name},{weather.sys.country}
            </h1>

            <h1 className="text-2xl text-center mt-3 date uppercase text-zinc-900">
              {dateBuilder(new Date())}
            </h1>

            <div className="temp  flex  flex-col justify-center items-center my-7  ">
              <h1 className="text-white text-8xl my-6">
                {Math.round(weather.main.temp)}°c
              </h1>

              <div className="flex">
                {weather.weather[0].main == "Clouds" && (
                  <i
                    className={"fa fa-cloud text-5xl mt-1 px-2 text-white"}
                  ></i>
                )}
                {weather.weather[0].main == "Rain" && (
                  <i
                    className={"fa fa-cloud-rain text-5xl mt-1 px-2 text-white"}
                  ></i>
                )}
                {weather.weather[0].main == "Haze" && (
                  <i
                    className={"fa fa-cloud-fog text-5xl mt-1 px-2 text-white"}
                  ></i>
                )}
                {weather.weather[0].main == "Clear" && (
                  <i
                    className={"fa fa-cloud-sun text-5xl mt-1 px-2 text-white"}
                  ></i>
                )}

                <h1 className="text-white weather text-6xl mb-7">
                  {weather.weather[0].main}
                </h1>
              </div>
            </div>
          </div>
        ) : (
          <div className="temp px-5 py-5 flex  flex-col justify-center items-center my-7">
            <img src={logo} className="w-2/4" />
            <h1 className="text-white hero text-2xl font-semibold">
              Get current Weather in your location{" "}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
