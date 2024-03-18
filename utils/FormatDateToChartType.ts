export function formatDate(date: Date): string {
    const months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthIndex: number = date.getMonth();
    const day: number = date.getDate();
    const month: string = months[monthIndex];
    return `${month} ${day}`;
}