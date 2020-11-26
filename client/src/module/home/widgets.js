import React from "react";
import WeatherCityMeteo from "./components/widgets/WeatherCityMeteo";
import CovidCountryCase from "./components/widgets/CovidCountryCase";
import CovidSummaryCountry from "./components/widgets/CovidSummaryCountry";
import TwitterLastTweets from "./components/widgets/TwitterLastTweets";
import TwitterSearchTweets from "./components/widgets/TwitterSearchTweets";
import YoutubeChannelVideo from "./components/widgets/YoutubeChannelVideo";
import YoutubeCommentsVideo from "./components/widgets/YoutubeCommentsVideo";
import YoutubeStatisticsVideo from "./components/widgets/YoutubeStatisticsVideo";
import YoutubeStatisticsChannel from "./components/widgets/YoutubeStatisticsChannel";

export const widgets = {
    'City meteo weather': function (id, index, parentState, onClickDelete) { return (
        <WeatherCityMeteo id={id} parentState={parentState} onClickDelete={onClickDelete}/>
    )},
    'Country case covid': function (id, index, parentState, onClickDelete) { return (
        <CovidCountryCase id={id} parentState={parentState} onClickDelete={onClickDelete}/>
    )},
    'Summary country covid': function (id, index, parentState, onClickDelete) { return (
        <CovidSummaryCountry id={id} parentState={parentState} onClickDelete={onClickDelete}/>
    )},
    'Last tweets twitter': function (id, index, parentState, onClickDelete) { return (
        <TwitterLastTweets id={id} parentState={parentState} onClickDelete={onClickDelete}/>
    )},
    'Search tweets twitter': function (id, index, parentState, onClickDelete) { return (
        <TwitterSearchTweets id={id} parentState={parentState} onClickDelete={onClickDelete}/>
    )},
    'Channels videos youtube': function (id, index, parentState, onClickDelete) { return (
        <YoutubeChannelVideo id={id} parentState={parentState} onClickDelete={onClickDelete}/>
    )},
    'Comments video youtube': function (id, index, parentState, onClickDelete) { return (
        <YoutubeCommentsVideo id={id} parentState={parentState} onClickDelete={onClickDelete}/>
    )},
    'Statistics video youtube': function (id, index, parentState, onClickDelete) { return (
        <YoutubeStatisticsVideo id={id} parentState={parentState} onClickDelete={onClickDelete}/>
    )},
    'Statistics channel youtube': function (id, index, parentState, onClickDelete) { return (
        <YoutubeStatisticsChannel id={id} parentState={parentState} onClickDelete={onClickDelete}/>
    )},
};