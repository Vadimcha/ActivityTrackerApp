"use client"
import React from 'react';
import {ActionIcon, Button, Group, Space, Tabs} from "@mantine/core";
import {IconCalendar, IconCalendarMonth, IconCalendarWeek, IconPlus} from "@tabler/icons-react";
import {HabitsTable} from "@/components/HabitsTable";
import {useDisclosure} from "@mantine/hooks";
import {AddHabit} from "@/components/AddHabit";
import {Modal} from "@mantine/core";

export const HabitsPage = () => {
    const [openedAdd, { open: openAddModal, close: closeAddModal }] = useDisclosure(false);
    return (
        <div>
            <Modal opened={openedAdd} onClose={closeAddModal} title="Добавить привычку">
                <AddHabit>
                    <Button
                        onClick={closeAddModal}
                        type={"submit"}
                    >Сохранить</Button>
                </AddHabit>
            </Modal>
            <div>
                <Tabs defaultValue={"today"}>
                    <Tabs.List>
                        <Group align={"center"} gap={"5px"}>
                            <Group gap={0}>
                                <Tabs.Tab value="today" leftSection={<IconCalendar stroke={2} size={20} />}>
                                    Ежедневные
                                </Tabs.Tab>
                                <Tabs.Tab value="week" leftSection={<IconCalendarWeek stroke={2} size={20} />}>
                                    Еженедельные
                                </Tabs.Tab>
                                <Tabs.Tab value="month" leftSection={<IconCalendarMonth stroke={2} size={20} />}>
                                    Ежемесячные
                                </Tabs.Tab>
                                <ActionIcon onClick={openAddModal} variant="filled" aria-label="Settings" size={"sm"}>
                                    <IconPlus stroke={2} size={18} />
                                </ActionIcon>
                            </Group>
                        </Group>
                    </Tabs.List>
                    <Space h="md" />

                    <Tabs.Panel value="today">
                        <HabitsTable type={"Ежедневная"} />
                    </Tabs.Panel>

                    <Tabs.Panel value="week">
                        <HabitsTable type={"Еженедельная"} />
                    </Tabs.Panel>

                    <Tabs.Panel value="month">
                        <HabitsTable type={"Ежемесячная"} />
                    </Tabs.Panel>
                </Tabs>
            </div>
        </div>
    )
}