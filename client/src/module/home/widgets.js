import React from "react";
import WeatherCityMeteo from "./components/widgets/WeatherCityMeteo";
import CovidCountryCase from "./components/widgets/CovidCountryCase";
import CovidSummaryCountry from "./components/widgets/CovidSummaryCountry";
import TwitterLastTweets from "./components/widgets/TwitterLastTweets";
import TwitterSearchTweets from "./components/widgets/TwitterSearchTweets";

export const widgets = {
    'City meteo weather': function (id, index, parentState) { return (
        <WeatherCityMeteo id={id} parentState={parentState}/>
    )},
    'Country case covid': function (id, index, parentState) { return (
        <CovidCountryCase id={id} parentState={parentState}/>
    )},
    'Summary country covid': function (id, index, parentState) { return (
        <CovidSummaryCountry id={id} parentState={parentState}/>
    )},
    'Last tweets twitter': function (id, index, parentState) { return (
        <TwitterLastTweets id={id} parentState={parentState}/>
    )},
    'Search tweets twitter': function (id, index, parentState) { return (
        <TwitterSearchTweets id={id} parentState={parentState}/>
    )},
};