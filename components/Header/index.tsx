import React from 'react';
import {Avatar, Divider, Flex, Group} from "@mantine/core";
import styles from './Header.module.scss'

export const Header = ({ children }: {children: React.ReactNode}) => {
    return (
        <div>
            <Flex
                direction={"row"}
                align={"center"}
                justify={"space-between"}
            >
                {children}
                <h2 className={styles.title}>Страница с привычками</h2>
                <Group>
                    <Avatar radius={"xl"} size={"30"} alt={"Avatar"} />
                </Group>
            </Flex>
            <Divider my="md" />
        </div>
    )
}