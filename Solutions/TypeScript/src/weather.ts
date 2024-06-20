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

        for (const date of dates) {
            const resp = await this.getWeatherForDate(date);
            weatherResponses.push(resp);
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

    private chunk<T>(array: T[], size: number): T[][] {
        const arr: T[][] = []
        for (let i = 0, j = array.length; i < j; i += size) {
            arr.push(array.slice(i, i + size));
        }
        return arr
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