import React from "react";
import WeatherCityMeteo from "./components/widgets/WeatherCityMeteo";
import CovidCountryCase from "./components/widgets/CovidCountryCase";

export const widgets = {
    'City meteo weather': function (id) { return <WeatherCityMeteo id={id} /> },
    'Country case covid': function (id) { return <CovidCountryCase id={id} /> },
};