import React, {useEffect} from 'react';
import useGlobalStore from "@/store/GlobalStore";
import {AreaChart, ChartTooltipProps, getFilteredChartTooltipPayload} from "@mantine/charts";
import {Flex, Paper, Text} from "@mantine/core"
import '@mantine/charts/styles.css';
import styles from './DayStatsChart.module.scss'

export const DayStatsChart = () => {
    const { dayStats, getDayStats } = useGlobalStore()
    useEffect(() => {
        getDayStats()
    }, [])
    function ChartTooltip({ label, payload }: ChartTooltipProps) {
        if (!payload) return null;
        return (
            <Paper px="xs" py="xs" withBorder shadow="xs" radius="sm">
                <Text fw={500} size={"sm"}>{label}</Text>
                {getFilteredChartTooltipPayload(payload).map((item: any) => (
                    item.name != 'maxValue' ?
                        <Text key={"Количество"} c={item.color} size={"xs"}>
                            {"Количество"}: {item.value}
                        </Text> : <></>
                ))}
            </Paper>
        );
    }
    return (
        <Flex align={"center"} direction={"column"} gap={"5px"}>
            <Text size={"sm"} fw={500}>Количество выполненных задач</Text>
            <AreaChart
                className={styles.chart}
                data={dayStats}
                dataKey="date"
                series={[
                    { name: 'maxValue', color: 'transparent' },
                    { name: 'quantity', color: 'var(--mantine-primary-color-filled)' },
                ]}
                tooltipProps={{
                    content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                }}
                curveType="linear"
                gridAxis="x"
                connectNulls
            />
        </Flex>
    )
}