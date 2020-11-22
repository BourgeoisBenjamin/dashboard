import React from "react";
import WeatherCityMeteo from "./components/widgets/WeatherCityMeteo";
import CovidCountryCase from "./components/widgets/CovidCountryCase";
import CovidSummaryCountry from "./components/widgets/CovidSummaryCountry";

export const widgets = {
    'City meteo weather': function (id) { return <WeatherCityMeteo id={id} /> },
    'Country case covid': function (id) { return <CovidCountryCase id={id} /> },
    'Summary country covid': function (id) { return <CovidSummaryCountry id={id} /> },
};