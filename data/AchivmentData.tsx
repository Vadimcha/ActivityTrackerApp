import {IAchivment} from "@/models/IAchivment";

export const AchivmentData: IAchivment[] = [
    {
        completed: false,
        name: 'Выполнить 1 задачу',
        symbol: '&#128512;',
        condition: () => { return false },
    },
]