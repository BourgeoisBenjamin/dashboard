import React from "react";
import WeatherCityMeteo from "./components/widgets/WeatherCityMeteo";

export const widgets = {
    'City meteo weather': function (id) { return <WeatherCityMeteo id={id} /> }
};