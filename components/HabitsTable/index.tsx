import React, {useState} from 'react';
import {Button, Center, Text, Checkbox, Progress, Table, UnstyledButton, Modal, Flex} from "@mantine/core";
import {IconAdjustmentsHorizontal, IconTrash, IconTrashX} from "@tabler/icons-react";
import './HabitsTable.scss'
import {useDisclosure} from "@mantine/hooks";
import {ChangeHabitProgress} from "@/components/ChangeHabitProgress";
import {DeleteHabit} from "@/components/DeleteHabit";
import {IHabit} from "@/models/IHabit";
import {AddHabit} from "@/components/AddHabit";
import styles from './HabitsTable.module.scss'

const TableData: IHabit[] = [
    {
        id: 1,
        name: 'Какая-то првычка',
        type: "day",
        progress: 25,
        maxProgress: 100,
    },
    {
        id: 2,
        name: 'Какая-то првычка',
        type: "day",
        progress: 0,
        maxProgress: 1,
    }
]

export const HabitsTable = () => {
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    const [openedChange, { open: openChangeModal, close: closeChangeModal }] = useDisclosure(false);
    const [changeItem, setChangeItem] = useState<IHabit | null>(null)

    const [openedDelete, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
    const [deleteItems, setDeleteItems] = useState<number[]>([])
    const rows = TableData.map((item, pos) => (
        <Table.Tr
            key={item.id}
            bg={selectedRows.includes(item.id) ? 'var(--mantine-color-blue-light)' : undefined}
        >
            <Table.Td className={styles.checkboxBox}>
                <Checkbox
                    aria-label="Select row"
                    checked={selectedRows.includes(item.id)}
                    onChange={(event) =>
                        setSelectedRows(
                            event.currentTarget.checked
                                ? [...selectedRows, item.id]
                                : selectedRows.filter((position) => position !== item.id)
                        )
                    }
                />
            </Table.Td >
            <Table.Td>{item.name}</Table.Td>
            <Table.Td className={styles.progressWrap}>
                <div className={styles.progress}>
                    <Text className={styles.progress} size={"xs"}>
                        { item.maxProgress == 1 ?
                        (item.progress == 0 ? "Не выполнено" : "Выполнено"):
                        `${item.progress}/${item.maxProgress}`
                    }</Text>
                    <Progress className={styles.progressBar} value={(item.progress / item.maxProgress) * 100}/>
                </div>
            </Table.Td>
            <Table.Td>
                <Button onClick={() => {openChangeModal(); setChangeItem(item)}} visibleFrom={"md"} size={"xs"} aria-label="Settings" leftSection={<IconAdjustmentsHorizontal size={16} stroke={2} />}>
                    Изменить прогресс
                </Button>
                <UnstyledButton onClick={() => {openChangeModal(); setChangeItem(item)}} hiddenFrom={"md"} aria-label="Settings">
                    <IconAdjustmentsHorizontal size={20} stroke={2} />
                </UnstyledButton>
            </Table.Td>
            <Table.Td>
                <Button onClick={() => {openDeleteModal(); setDeleteItems([item.id])}} visibleFrom={"md"} size={"xs"} aria-label="Delete" leftSection={<IconTrash size={20} stroke={2} />}>
                    Удалить
                </Button>
                <UnstyledButton onClick={() => {openDeleteModal(); setDeleteItems([item.id])}} hiddenFrom={"md"} aria-label="Delete">
                    <IconTrash size={20} stroke={2} />
                </UnstyledButton>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            {changeItem != null ?
                <Modal opened={openedChange} onClose={closeChangeModal} title="Изменить прогресс">
                    <ChangeHabitProgress item={changeItem}>
                        <Button
                            onClick={closeChangeModal}
                            type={'submit'}
                        >Сохранить изменения</Button>
                    </ChangeHabitProgress>
                </Modal>
                : <></>}
            {deleteItems != null ?
                <Modal opened={openedDelete} onClose={closeDeleteModal} title="Удалить привычку">
                    <DeleteHabit ids={deleteItems}>
                        <Button
                            onClick={closeDeleteModal}
                            type={'submit'}
                        >Удалить</Button>
                    </DeleteHabit>
                </Modal>
                : <></>}

            <Table withColumnBorders>
                <Table.Thead>
                    <Table.Tr className={styles.checkboxBoxWrap}>
                        <Table.Th className={styles.checkboxBox}>
                            <UnstyledButton
                                hidden={selectedRows.length == 0}
                                onClick={() => {
                                    openDeleteModal();
                                    setDeleteItems(selectedRows)
                                }}
                            >
                                <IconTrashX size={16} stroke={2} />
                            </UnstyledButton>
                        </Table.Th>
                        <Table.Th>Название</Table.Th>
                        <Table.Th>Прогресс</Table.Th>
                        <Table.Th>Изменить</Table.Th>
                        <Table.Th>Удалить</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </>
    );
}