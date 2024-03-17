import {create} from "zustand";
import {mountStoreDevtool} from "simple-zustand-devtools";
import {persist} from "zustand/middleware";
import {IHabit} from "@/models/IHabit";

interface GlobalStore {
    habits: IHabit[],
    getNewId: () => Number,
    addNewHabit: (habit: IHabit) => void,
    deleteHabits: (ids: Number[], save: boolean) => void,
    changeHabitProgress: (id: number, progress: number) => void,
}

const useGlobalStore = create<GlobalStore>()(
    persist(
        (set, get) => ({
            habits: [],
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
                let copy = get().habits
                copy[foundInd].progress = new_progress as number;
                set({ habits: copy })
            }
        }),
        {
            name: 'habits',
        },
    ),
)

mountStoreDevtool('Store', useGlobalStore);
export default useGlobalStore;