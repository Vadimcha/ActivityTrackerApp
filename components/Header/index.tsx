import React, {useEffect, useState} from 'react';
import {Anchor, Avatar, Divider, Flex, Group} from "@mantine/core";
import styles from './Header.module.scss'
import {NavLinks} from "@/components/NavBar/NavLinks";
import useGlobalStore from "@/store/GlobalStore";

export const Header = ({ children }: {children: React.ReactNode}) => {
    const [label, setLabel] = useState<string>('Ошибка')
    const {avatar} = useGlobalStore()
    useEffect(() => {
        const curLink = NavLinks.find(link => link.src == window.location.pathname)
        if(curLink != undefined)
            setLabel(curLink.label)
    }, [children])
    return (
        <div>
            <Flex
                direction={"row"}
                align={"center"}
                justify={"space-between"}
            >
                {children}
                <h2 className={styles.title}>
                    { label }
                </h2>
                <Anchor href={"/profile"}>
                    <Avatar
                        src={"/Avatar.jpg"}
                        radius={"xl"}
                        size={"30"}
                    />
                </Anchor>
            </Flex>
            <Divider my="md" />
        </div>
    )
}