import React, {useState} from 'react';
import {Button, Center, Text, Checkbox, Progress, Table, UnstyledButton, Modal, Flex, Space} from "@mantine/core";
import {IconAdjustmentsHorizontal, IconTrash, IconTrashX} from "@tabler/icons-react";
import './HabitsTable.scss'
import {useDisclosure} from "@mantine/hooks";
import {ChangeHabitProgress} from "@/components/ChangeHabitProgress";
import {DeleteHabit} from "@/components/DeleteHabit";
import {IHabit} from "@/models/IHabit";
import styles from './HabitsTable.module.scss'
import useGlobalStore from "@/store/GlobalStore";

export const HabitsTable = ({ type }: {type: string}) => {
    const { habits: TableData } = useGlobalStore()
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    const [openedChange, { open: openChangeModal, close: closeChangeModal }] = useDisclosure(false);
    const [changeItem, setChangeItem] = useState<IHabit | null>(null)

    const [openedDelete, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
    const [deleteItems, setDeleteItems] = useState<number[]>([])
    const rows = TableData.filter((item) => item.type == type).map((item, pos) => (
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
            <Table.Td className={styles.centerBlock}>
                <Button onClick={() => {openChangeModal(); setChangeItem(item)}} visibleFrom={"md"} size={"xs"} aria-label="Settings" leftSection={<IconAdjustmentsHorizontal size={16} stroke={2} />}>
                    Изменить прогресс
                </Button>
                <UnstyledButton onClick={() => {openChangeModal(); setChangeItem(item)}} hiddenFrom={"md"} aria-label="Settings">
                    <IconAdjustmentsHorizontal size={20} stroke={2} />
                </UnstyledButton>
            </Table.Td>
            <Table.Td className={styles.centerBlock}>
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
                        <Table.Th className={styles.centerBlock}>Название</Table.Th>
                        <Table.Th className={styles.centerBlock}>Прогресс</Table.Th>
                        <Table.Th className={styles.centerBlock}>Изменить</Table.Th>
                        <Table.Th className={styles.centerBlock}>Удалить</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
            { TableData.filter((item) => item.type == type).length == 0 ?
                <>
                    <Space h={"xl"} />
                    <h2 className={styles.no_habit}>
                        На данный момент у вас нет
                        {` ${type.slice(0, type.length - 2)}ых `.toLowerCase()}
                        привычек!
                    </h2>
                </>
                : <></>
            }
        </>
    );
}