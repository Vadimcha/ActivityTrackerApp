import {create} from "zustand";
import {mountStoreDevtool} from "simple-zustand-devtools";

interface GlobalStore {

}

const useGlobalStore = create<GlobalStore>(
    (set) => ({

    })
)

mountStoreDevtool('Store', useGlobalStore);
export default useGlobalStore;