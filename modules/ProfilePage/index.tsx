'use client'
import React from 'react';
import {DayStatsChart} from "@/components/DayStatsChart";
import styles from './ProfilePage.module.scss'
import {TimeStatsChart} from "@/components/TimeStatsChart";
import {AspectRatio, Flex, Text, Image} from "@mantine/core";
import useGlobalStore from "@/store/GlobalStore";


export const ProfilePage = () => {
    const { userName } = useGlobalStore()
    return (
        <div className={styles.container}>
            <Flex direction={"column"} align={"center"} className={styles.user}>
                <AspectRatio ratio={1} className={styles.user__icon}>
                    <Image
                        className={styles.user__icon}
                        radius="xl"
                        src="/Avatar.jpg"
                        alt="Avatar"
                    />
                </AspectRatio>
                <Text size={"xl"} fw={600} className={styles.user__userName}>{userName}</Text>
            </Flex>
            <div className={`${styles.charts} ${styles.DayForm}`}>
                <DayStatsChart />
            </div>
            <div className={`${styles.charts} ${styles.TimeForm}`}>
                <TimeStatsChart />
            </div>
            <div className={styles.achivments}>
                <Text size={"xl"} fw={600}>Achivments</Text>
            </div>
        </div>
    )
}