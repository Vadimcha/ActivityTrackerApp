'use client'
import React, {useState} from 'react';
import {Slider, Space, Switch} from "@mantine/core";
import './ChangeHabitProgress.scss'
import {IHabit} from "@/models/IHabit";
import {useFormik} from "formik";

export const ChangeHabitProgress = ({ item, children }: {item: IHabit, children: React.ReactNode}) => {
    const [progress, setProgress] = useState<number>(item.progress)
    const formik = useFormik({
        initialValues: {
            progress: 0,
        },
        onSubmit: values => {
            let copy = values
            copy.progress = progress
        }
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            { item.maxProgress == 1 ?
                <Switch
                    checked={progress > 0}
                    defaultChecked={item.maxProgress == 1}
                    label="Я выполнил поставленную цель"
                    onChange={(event) => setProgress(event.currentTarget.checked ? 1 : 0)}
                />
                :
                <>
                    <Space h={"md"}/>
                    <Slider
                        value={progress}
                        onChange={setProgress}
                        labelAlwaysOn
                    />
                </>
            }
            <Space h={"md"}/>
            {children}
        </form>
    );
}