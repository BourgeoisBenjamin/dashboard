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
                name: 'Search tweets',
                urlClient: '/home/widget/twitter/search-tweets/',
                urlRequest: '/service/twitter/search-tweets/'
            }
        ]
    },
    {
        name: 'Youtube',
        url: '/home/widget/youtube/',
        connected: false,
        widgets: [
            {
                name: 'Statistics channel',
                urlClient: '/home/widget/youtube/statistics-channel/',
                urlRequest: '/service/youtube/statistics-channel/'
            },
            {
                name: 'Statistics video',
                urlClient: '/home/widget/youtube/statistics-video/',
                urlRequest: '/service/youtube/statistics-video/'
            },
            {
                name: 'Comments video',
                urlClient: '/home/widget/youtube/comments-video/',
                urlRequest: '/service/youtube/comments-video/'
            },
            {
                name: 'Channel videos',
                urlClient: '/home/widget/youtube/channel-videos/',
                urlRequest: '/service/youtube/channel-videos/'
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
    },
    {
        name: 'Spotify',
        url: '/home/widget/spotify/',
        connected: true,
        widgets: [
            {
                name: 'Top tracks user',
                urlClient: '/home/widget/spotify/top-tracks-user/',
            },
            {
                name: 'Top artists user',
                urlClient: '/home/widget/spotify/top-artists-user/',
            },
            {
                name: 'Recently played tracks user',
                urlClient: '/home/widget/spotify/recently-played-tracks-user/',
            }
        ]
    }
];