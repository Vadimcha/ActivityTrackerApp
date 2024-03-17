import React from 'react';
import {Space, Switch} from "@mantine/core";

export const DeleteHabit = ({ids, children}: {ids: number[], children: React.ReactNode}) => {
    return (
        <div>
            <Switch
                label="Сохранить историю"
            />
            <Space h={"md"}/>
            {children}
        </div>
    )
}