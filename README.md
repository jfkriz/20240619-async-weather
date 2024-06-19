# C3 Async Weather Challenge

See solutions in different languages in the "Templates" directory. Once you decide which language you'd like to use,
simply open that directory in your favorite IDE, and you should be able to run the included unit tests "out of the box".

## The Problem

We are going to be calling the C3 Weather API to explore optimizing performance when needing to make multiple API calls
to retrieve the needed data.

### C3 Weather API Specifics

URL: [https://c3weatherapi.azurewebsites.net/](https://c3weatherapi.azurewebsites.net/)

In order to call the API you must provide an `api-key` header. Please fill this out with your names or a team name. As you progress through the questions below feel free to add a numeric suffix, but keep the suffix the same for all requests in that question.

The weather endpoint takes a specific date in the format YYYY-MM-DD

Unix Curl: `curl -H "api-key: YOUR-TEAM-NAME" https://c3weatherapi.azurewebsites.net/2020-01-01`

For successful calls the data will look like the following

```
{
  "Date": "2020-01-01",
  "TempAverage": null,
  "TempMaximum": 49,
  "TempMinimum": 35,
  "Precipitation": 0,
  "Snow": null,
  "SnowDepth": null
}
```

You can imagine the complex processing on the backend to retrieve and process weather data. We have all the data from Lunken Airport from 1948-08-01 up to and including 2024-06-07.

To measure the time it takes for a single call you can do something like this, or using StopWatch or timer functionality in whatever coding language your are using.
Unix Curl: `time curl -H "api-key: YOUR-TEAM-NAME" https://c3weatherapi.azurewebsites.net/2020-01-01`

In order to make the C3 Weather API available and free of charge to our clients we require the api-key header, and put specific concurrent rate limits on the use of the API.
We allow up to 10 concurrent requests at the same time. If you exceed this limit you will need to wait 10 seconds before being allowed to make additional calls.

### The Questions

Please work through these questions

1. Make a call to the API and get data for January 1st, 2023.
2. Determine the average time for a single API call, and then use that average to make the following calculations by hand
   - How long will it take to load a years worth of data if done serially (one after the other)?
   - How long will it take to load a years worth of data if done parallelly (at the same time) without any rate limiting?
   - How long will it take to load a years worth of data if done parallelly (at the same time) with a maximum of 10 concurrent requests at a time?
3. Make calls to the API and get data for the first 7 days of 2023. Bonus points if you calculate the average TempMaximum field.
   - Initial implementation can be serially
   - Refactor to improve performance / reduce latency of loading all data by parallelizing the calls.
   - Add timing logic to log how long it takes to process each batch of request, and total time for all requests.
4. Make calls to the API and get data for the first 2 weeks / 14 days of 2023.
5. Make calls to the API and get all the data for 2023.
6. Add error handling and retry logic if any API calls fail.
   - You can cause random errors on approximately 2% of requests by adding header `random-errors: true` to all of your requests
   - You can also cause an error by violating the rate limit. If you are constantly sending in 10 concurrent request through your code adding another one through a curl command `curl -H "api-key: YOUR-TEAM-NAME" https://c3weatherapi.azurewebsites.net/2020-01-01` will cause a sustained failure for 10 seconds.
