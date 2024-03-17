import React from "react";
import {IconActivity, IconBuildingStore, IconUser} from "@tabler/icons-react";

export interface INavLink {
    label: string,
    icon?: React.ReactNode,
    src: string,
}

export const NavLinks = [
    {
        label: "Профиль",
        icon: <IconUser stroke={2} size={20} />,
        src: "/profile",
    },
    {
        label: "Привычки",
        icon: <IconActivity stroke={2} size={20} />,
        src: "/habits",
    },
    {
        label: "Магазин",
        icon: <IconBuildingStore stroke={2} size={20} />,
        src: "/shop",
    },
]