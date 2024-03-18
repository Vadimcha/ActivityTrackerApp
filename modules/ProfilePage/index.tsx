'use client'
import React from 'react';
import {DayStatsChart} from "@/components/DayStatsChart";
import styles from './ProfilePage.module.scss'
import {TimeStatsChart} from "@/components/TimeStatsChart";


export const ProfilePage = () => {
    return (
        <div>
            <div className={styles.charts}>
                <DayStatsChart />
                <TimeStatsChart />
            </div>
        </div>
    )
}