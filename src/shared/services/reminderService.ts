import { reminderMock } from '../mock/reminderMock';

export const reminderService = {
    async getAll() {
        return reminderMock;
    },
};