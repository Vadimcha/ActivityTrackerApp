import React, {useEffect} from 'react';
import styles from './TimeStatsChart.module.scss'
import {Flex, Text} from "@mantine/core";
import {BarChart} from "@mantine/charts";
import useGlobalStore from "@/store/GlobalStore";
import {ChartTooltipProps} from "@mantine/charts";
import {Paper} from "@mantine/core";

export const TimeStatsChart = () => {
    const { timeStats, getTimeStats } = useGlobalStore()
    useEffect(() => {
        getTimeStats()
    }, [])
    function ChartTooltip({ label, payload }: ChartTooltipProps) {
        if (!payload) return null;
        return (
            <Paper px="xs" py="xs" withBorder shadow="xs" radius="sm">
                <Text fw={500} size={"sm"}>{label}</Text>
            </Paper>
        );
    }
    return (
        <div>
            <Flex align={"center"} direction={"column"} gap={"5px"}>
                <Text size={"sm"} fw={500}>Временная активность за неделю</Text>
                <BarChart
                    className={styles.chart}
                    h={300}
                    data={timeStats}
                    dataKey="date"
                    series={[
                        { name: 'maxValue', color: 'transparent' },
                        { name: 'quantity', color: 'var(--mantine-primary-color-filled)' },
                    ]}
                    tooltipProps={{
                        content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                    }}
                    tickLine="y"
                />
            </Flex>
        </div>
    )
}