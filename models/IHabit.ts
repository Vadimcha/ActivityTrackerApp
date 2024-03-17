export interface IHabit {
    id: number,
    name: string,
    type: string,
    category?: string,
    progress: number,
    maxProgress: number,
}