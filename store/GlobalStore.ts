import {create} from "zustand";
import {mountStoreDevtool} from "simple-zustand-devtools";
import {persist} from "zustand/middleware";
import {IHabit} from "@/models/IHabit";

interface GlobalStore {
    habits: IHabit[],
    getNewId: () => Number,
    addNewHabit: (habit: IHabit) => void,

}

const useGlobalStore = create<GlobalStore>()(
    persist(
        (set, get) => ({
            habits: [],
            getNewId: () => { return ((
                Math.max(...get().habits.map(habit => habit.id)) === null ?
                    -1 :
                    Math.max(...get().habits.map(habit => habit.id)))
                + 1) },
            addNewHabit: (habit: IHabit) => {
                set({ habits: [...get().habits, habit]})
            },

        }),
        {
            name: 'habits',
        },
    ),
)

mountStoreDevtool('Store', useGlobalStore);
export default useGlobalStore;