import React from 'react';
import {Avatar, Flex, Group} from "@mantine/core";

export const Header = ({ children }: {children: React.ReactNode}) => {
    return (
        <div>
            <Flex
                direction={"row"}
                align={"center"}
                justify={"space-between"}
            >
                {children}
                <h2>Страница с привычками</h2>
                <Group>
                    <p>Username</p>
                    <Avatar radius={"xl"} alt={"Avatar"} />
                </Group>
            </Flex>
        </div>
    )
}