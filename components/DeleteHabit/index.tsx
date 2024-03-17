'use client'
import React, {useState} from 'react';
import {Space, Switch} from "@mantine/core";
import {useFormik} from "formik";
import useGlobalStore from "@/store/GlobalStore";

export const DeleteHabit = ({ids, children}: {ids: number[], children: React.ReactNode}) => {
    const [save, setSave] = useState<boolean>(false)
    const {deleteHabits} = useGlobalStore()
    const formik = useFormik({
        initialValues: {},
        onSubmit: () => {
            deleteHabits(ids, save)
        }
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <Switch
                label="Сохранить историю"
                checked={save}
                onChange={(event) => setSave(event.target.checked)}
            />
            <Space h={"md"}/>
            {children}
        </form>
    )
}