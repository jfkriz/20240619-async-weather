import axios, { Axios } from 'axios'
import { format } from 'date-fns'

export class WeatherService {
    private readonly client: Axios
    constructor() {
        this.client = axios.create({
            baseURL: 'https://c3weatherapi.azurewebsites.net',
            headers: {
                'api-key': 'the-krizzle'
            }
        })
    }

    public async getWeatherForDate(date: string): Promise<WeatherResponse> {
        const resp = await this.client.get<WeatherResponse>(date)
        return resp.data
    }

    public async getWeatherForDateRange(start: string, endInclusive: string): Promise<Array<WeatherResponse>> {
        const dates = this.getDatesInRange(start, endInclusive);
        const weatherResponses: Array<WeatherResponse> = [];

        for (let i = 0; i < dates.length; i += 10) {
            const chunk = dates.slice(i, i + 10);
            // Map each date in the chunk to a promise calling getWeatherForDate
            const promises = chunk.map(date => this.getWeatherForDate(date));
            // Await all promises in the chunk and then push the results into weatherResponses
            const results = await Promise.all(promises);
            weatherResponses.push(...results);
        }

        return weatherResponses;
    }

    private getDatesInRange(start: string, endInclusive: string): string[] {
        const startDate = new Date(start);
        const endDate = new Date(endInclusive);
        const dates: string[] = [];

        while (startDate <= endDate) {
            dates.push(format(startDate, 'yyyy-MM-dd'));
            startDate.setDate(startDate.getDate() + 1);
        }

        return dates;
    }
}

export type WeatherResponse = {
    Date: string;
    TempAverage: number | null;
    TempMaximum: number;
    TempMinimum: number;
    Precipitation: number | null;
    Snow: number | null;
    SnowDepth: number | null;
}