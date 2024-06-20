import { beforeEach, expect, test, jest } from '@jest/globals'
import { WeatherService } from './weather'
import { toDate } from 'date-fns'

let fixture: WeatherService

beforeEach(() => {
    fixture = new WeatherService()
})

// test('Should return response for 2024-01-01', async () => {
//     const resp = await fixture.getWeatherForDate('2024-01-01')
//     expect(resp).not.toBeUndefined()
//     expect(resp).toEqual({ "Date": "2024-01-01", "TempAverage": null, "TempMaximum": 40, "TempMinimum": 33, "Precipitation": null, "Snow": null, "SnowDepth": null })
// })

// test('Should return 41 for dates 2024-01-01 through 2024-01-07', async () => {
//     const startDate = toDate('2024-01-01')
//     const endDate = toDate('2024-01-07')
//     let sum = 0
//     for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
//         const resp = await fixture.getWeatherForDate(date.toISOString().split('T')[0])
//         sum += resp.TempMaximum
//     }
//     const average = Math.floor(sum / 7)
//     expect(average).toEqual(41)
// }, 60000)

// test('Should return 41 for dates 2024-01-01 through 2024-01-07 making parallel calls', async () => {
//     const resp = await fixture.getWeatherForDateRange('2024-01-01', '2024-01-07')
//     const sum = resp.reduce((acc, curr) => acc + curr.TempMaximum, 0)
//     const average = Math.floor(sum / 7)
//     expect(average).toEqual(41)
// }, 60000)

test('Should return 41 for dates 2024-01-01 through 2024-12-31 making parallel calls', async () => {
    const resp = await fixture.getWeatherForDateRange('2024-01-01', '2024-12-31')
    const sum = resp.reduce((acc, curr) => acc + curr.TempMaximum, 0)
    const average = Math.floor(sum / 7)
    expect(average).toEqual(41)
}, 300000)