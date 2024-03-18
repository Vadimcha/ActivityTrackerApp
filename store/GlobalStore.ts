import {create} from "zustand";
import {mountStoreDevtool} from "simple-zustand-devtools";
import {persist} from "zustand/middleware";
import {IHabit} from "@/models/IHabit";
import {IHistoryItem} from "@/models/IHistoryItem";
import {IAchivment} from "@/models/IAchivment";
import {IDayChartStat, IDayStat} from "@/models/IDayStat";
import {formatDate} from "@/utils/FormatDateToChartType";

interface GlobalStore {
    habits: IHabit[],
    history: IHistoryItem[],
    achivments: IAchivment[],
    getNewId: () => Number,
    addNewHabit: (habit: IHabit) => void,
    deleteHabits: (ids: Number[], save: boolean) => void,
    changeHabitProgress: (id: number, progress: number) => void,
    getDayStats: () => IDayChartStat[],
}

const useGlobalStore = create<GlobalStore>()(
    persist(
        (set, get) => ({
            habits: [],
            history: [],
            achivments: [],
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
                const stats = [] as IDayChartStat[]
                for(let i = 30; i > 0; --i) {
                    let date = new Date()
                    date.setDate(date.getDate() - i)
                    const history = get().history.filter(item => (item.time == date))
                    const unique = new Set(history.map(item => item.id))
                    let quantity = 0;
                    unique.forEach(item => {
                        const historyItem = history.findLast(obj => obj.id == item)
                        if(historyItem) {
                            quantity += (
                                historyItem.recentProgress != historyItem.maxProgress &&
                                historyItem.updatedProgress != historyItem.maxProgress ? 1 : 0
                            )
                        }
                    })
                    const processedDate = formatDate(date)
                    stats.push({ date: processedDate, quantity: quantity })
                }
                return stats as IDayChartStat[];
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