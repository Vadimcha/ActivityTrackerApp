'use client'
import React, {useState} from 'react';
import {Space, Switch} from "@mantine/core";
import {useFormik} from "formik";

export const DeleteHabit = ({ids, children}: {ids: number[], children: React.ReactNode}) => {
    const [save, setSave] = useState<boolean>(false)
    const formik = useFormik({
        initialValues: {
            save: false,
        },
        onSubmit: values => {
            let copy = values;
            copy.save = save;
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