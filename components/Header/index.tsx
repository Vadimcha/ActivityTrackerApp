import React, {useEffect, useState} from 'react';
import {Avatar, Divider, Flex, Group} from "@mantine/core";
import styles from './Header.module.scss'
import {NavLinks} from "@/components/NavBar/NavLinks";

export const Header = ({ children }: {children: React.ReactNode}) => {
    const [label, setLabel] = useState<string>('Ошибка')
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
                <Group>
                    <Avatar radius={"xl"} size={"30"} alt={"Avatar"} />
                </Group>
            </Flex>
            <Divider my="md" />
        </div>
    )
}