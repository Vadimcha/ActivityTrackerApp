import React from 'react';
import {Avatar, Divider, Flex, Group} from "@mantine/core";

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
                    <Avatar radius={"xl"} alt={"Avatar"} />
                </Group>
            </Flex>
            <Divider my="md" />
        </div>
    )
}