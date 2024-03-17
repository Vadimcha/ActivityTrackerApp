'use client'
import React, {useState} from 'react';
import {Slider, Space, Switch} from "@mantine/core";
import './ChangeHabitProgress.scss'
import {IHabit} from "@/models/IHabit";

export const ChangeHabitProgress = ({ item, children }: {item: IHabit, children: React.ReactNode}) => {
    const [progress, setProgress] = useState<number>(item.progress)
    return (
        <>
            { item.maxProgress == 1 ?
                <Switch
                    defaultChecked={item.maxProgress == 1}
                    label="Я выполнил поставленную цель"
                    onChange={(event) => setProgress(event.currentTarget.checked ? 1 : 0)}
                />
                :
                <>
                    <Space h={"md"}/>
                    <Slider
                        defaultValue={item.progress}
                        onChange={setProgress}
                        labelAlwaysOn
                    />
                </>
            }
            <Space h={"md"}/>
            {children}
        </>
    );
}