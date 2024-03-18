export interface IAchivment {
    completed: boolean,
    name: string,
    symbol: string,
    condition: () => boolean,
}