"use client"
import React from 'react';
import {inter} from "@/config/fonts";
import {AppShell, Burger, MantineProvider} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import '@mantine/core/styles.css';
import {NavBar} from "@/components/NavBar";

import '@/config/globals.css'
import '@/config/reset.css'
import {Header} from "@/components/Header";
import './Layout.scss'

export default function Layout({children}: {children: React.ReactNode}) {
    const [opened, { toggle }] = useDisclosure();
    return (
        <html lang="en">
        <title>Трекер активностей</title>
            <body className={inter.className}>
                <MantineProvider defaultColorScheme={"dark"}>
                        <AppShell
                            navbar={{
                                width: {md: 300, sm: 250},
                                breakpoint: 'sm',
                                collapsed: { mobile: !opened },
                            }}
                            padding="md"
                        >
                            <AppShell.Navbar p="md">
                                <NavBar>
                                    <Burger
                                        opened={opened}
                                        onClick={toggle}
                                        size="sm"
                                        hiddenFrom="sm"
                                    />
                                </NavBar>
                            </AppShell.Navbar>

                            <AppShell.Main>
                                <Header>
                                    <Burger
                                        opened={opened}
                                        onClick={toggle}
                                        size="sm"
                                        hiddenFrom="sm"
                                    />
                                </Header>
                                {children}
                            </AppShell.Main>
                        </AppShell>
                </MantineProvider>
            </body>
        </html>
    )
}