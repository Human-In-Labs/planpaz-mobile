import {
    weatherCardsMock,
    weatherSummaryMock,
} from '../mock/weatherMock';

export const weatherService = {

    async getForecast() {
        return weatherCardsMock;
    },

    async getSummary() {
        return weatherSummaryMock;
    },

};