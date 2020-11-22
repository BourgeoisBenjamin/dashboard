export let services = [
    {
        name: 'Twitter',
        url: '/home/widget/twitter/',
        connected: false,
        widgets: [
            {
                name: 'Last tweets',
                urlClient: '/home/widget/twitter/last-tweets/',
                urlRequest: '/service/twitter/last-tweets/'
            },
            {
                name: 'Search',
                urlClient: '/home/widget/twitter/search/',
                urlRequest: '/service/twitter/search/'
            }
        ]
    },
    {
        name: 'Youtube',
        url: '/home/widget/youtube/',
        connected: false,
        widgets: [
            {
                name: 'Last videos of a channel',
                urlClient: '/home/widget/youtube/last-videos-of-a-channel/',
                urlRequest: '/service/youtube/last-videos-channel/'
            },
            {
                name: 'Display channel subscribers',
                urlClient: '/home/widget/youtube/display-channel-subscribers/',
                urlRequest: '/service/youtube/channel-subscribers/'
            }
        ]
    },
    {
        name: 'Weather',
        url: '/home/widget/weather/',
        connected: true,
        widgets: [
            {
                name: 'City\'s Weather in Celsius or Fahrenheit',
                urlClient: '/home/widget/weather/city-weather/',
                urlRequest: '/service/weather/city-meteo/'
            }
        ]
    },
    {
        name: 'Covid',
        url: '/home/widget/covid/',
        connected: true,
        widgets: [
            {
                name: 'Case per country',
                urlClient: '/home/widget/covid/country-case/',
                urlRequest: '/service/covid/country-case/'
            },
            {
                name: 'Summary case',
                urlClient: '/home/widget/covid/summary-country/',
                urlRequest: '/service/covid/summary-country/'
            }
        ]
    }
];