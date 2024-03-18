import {create} from "zustand";
import {mountStoreDevtool} from "simple-zustand-devtools";
import {persist} from "zustand/middleware";
import {IHabit} from "@/models/IHabit";
import {IHistoryItem} from "@/models/IHistoryItem";
import {IAchivment} from "@/models/IAchivment";
import {IDayStat} from "@/models/IDayStat";
import {formatDate} from "@/utils/FormatDateToChartType";
import {ITimeStat} from "@/models/ITimeStat";

interface GlobalStore {
    habits: IHabit[],
    history: IHistoryItem[],
    achivments: IAchivment[],
    dayStats: IDayStat[],
    timeStats: ITimeStat[],

    getNewId: () => Number,
    addNewHabit: (habit: IHabit) => void,
    deleteHabits: (ids: Number[], save: boolean) => void,
    changeHabitProgress: (id: number, progress: number) => void,
    getDayStats: () => void,
    getTimeStats: () => void,
}

const useGlobalStore = create<GlobalStore>()(
    persist(
        (set, get) => ({
            habits: [],
            history: [],
            achivments: [],
            dayStats: [],
            timeStats: [],

            getNewId: () => { return ((
                    get().habits.length == 0 ?
                    0 :
                    Math.max(...get().habits.map(habit => habit.id)))
                + 1) },
            addNewHabit: (habit: IHabit) => {
                set({ habits: [...get().habits, habit]})
            },
            deleteHabits: (ids: Number[], save: boolean) => {
                let copy = get().habits.filter((item) => !(ids.includes(item.id)))
                set({ habits: copy })
            },
            changeHabitProgress: (id: Number, new_progress: Number) => {
                let foundInd = get().habits.findIndex(habit => habit.id == id)
                let copy = get().habits, habit = copy[foundInd], recentProgress = habit.progress
                const date = new Date()
                copy[foundInd].progress = new_progress as number;
                set({ habits: copy, history: [...get().history, {
                        id: habit.id,
                        recentProgress: recentProgress,
                        updatedProgress: new_progress as number,
                        maxProgress: habit.maxProgress,
                        time: date,
                    }] })
            },
            getDayStats: () => {
                const stats = [] as IDayStat[]
                for(let i = 7; i > -1; --i) {
                    let date = new Date()
                    date.setDate(date.getDate() - i)
                    const history = get().history.filter(item => {
                        const A = new Date(item.time)
                        return A.getDate() == date.getDate()
                    })
                    let unique = new Set(history.map(item => item.id)), uniqueArr = Array.from(unique);
                    let quantity = 0;
                    for(let j = 0; j < uniqueArr.length; ++j) {
                        const historyItem = history.findLast(obj => obj.id == Number(uniqueArr[j]))
                        if(historyItem) {
                            quantity += (
                                historyItem.updatedProgress === historyItem.maxProgress ? 1 : 0
                            )
                        }
                    }
                    const processedDate = formatDate(date)
                    stats.push({
                        date: processedDate,
                        maxValue: Math.max(quantity, 10),
                        quantity: quantity
                    })
                }
                set({ dayStats: stats })
            },
            getTimeStats: () => {
                const stats = [] as ITimeStat[]
                for(let j = 0; j < 23; ++j)
                    stats.push({
                        date: `${j < 10 ? `0${j}:00` : `${j}:00`}`,
                        maxValue: 0,
                        quantity: 0,
                    })
                for(let i = 7; i > -1; --i) {
                    let date = new Date()
                    date.setDate(date.getDate() - i)
                    const history = get().history.filter(item => {
                        const A = new Date(item.time)
                        return A.getDate() == date.getDate()
                    })
                    for(let j = 0; j < 23; ++j) {
                        const quantity = history.filter((item) => {
                            let curDate = new Date(item.time), curHour = curDate.getHours()
                            return curHour == j
                        }).length;
                        stats[j].quantity += quantity
                        stats[j].maxValue = stats[j].quantity  + 1
                    }
                }
                set({ timeStats: stats })
            },
            checkAchivments: () => {

            }
        }),
        {
            name: 'habits',
        },
    ),
)

mountStoreDevtool('Store', useGlobalStore);
export default useGlobalStore;