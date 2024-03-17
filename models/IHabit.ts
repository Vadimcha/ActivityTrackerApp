export interface IHabit {
    id: number,
    name: string,
    type: "day" | "week" | "month",
    progress: number,
    maxProgress: number,
}