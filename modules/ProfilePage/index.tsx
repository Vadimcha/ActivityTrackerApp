'use client'
import React, {useEffect, useState} from 'react';
import useGlobalStore from "@/store/GlobalStore";
import {IDayChartStat} from "@/models/IDayStat";
import { AreaChart } from '@mantine/charts';
import '@mantine/charts/styles.css';


export const ProfilePage = () => {
    const [stats, setStats] = useState<IDayChartStat[]>([])
    const { getDayStats } = useGlobalStore()
    useEffect(() => {
        setStats(getDayStats())
    }, [getDayStats, stats])
    return (
        <div>
            Это твой профиль
            <AreaChart
                h={300}
                data={stats}
                dataKey="date"
                series={[
                    { name: '', color: 'teal.6' },
                ]}
                curveType="linear"
            />
        </div>
    )
}