"use client"
import React from 'react';
import {ActionIcon, Flex, Group, NavLink, Space, useMantineColorScheme} from "@mantine/core";
import {INavLink, NavLinks} from "@/components/NavBar/NavLinks";
import {IconMoon, IconSun} from "@tabler/icons-react";

export const NavBar = ({ children }: { children: React.ReactNode }) => {
    const { setColorScheme, colorScheme } = useMantineColorScheme();
    return (
        <div>
            <Flex
                justify={"space-between"}
            >
                <Group>
                    <h2>Logo</h2>
                    <ActionIcon
                        radius={"xl"}
                        size={"md"}
                        onClick={() => { setColorScheme(colorScheme== "light" ? "dark" : "light" ) }}
                    >
                        { colorScheme == "light" ?
                            <IconSun size={18} stroke={2} /> :
                            <IconMoon size={18} stroke={2} />
                        }
                    </ActionIcon>
                </Group>
                {children}
            </Flex>
            <Space h="md" />
            <div>
                <Flex
                    direction={"column"}
                >
                    { NavLinks.map((link: INavLink) => {
                        return (
                            <NavLink
                                key={link.src}
                                href={link.src}
                                label={link.label}
                                leftSection={link.icon}
                            />
                        )
                    }) }
                </Flex>
            </div>
        </div>
    )
}