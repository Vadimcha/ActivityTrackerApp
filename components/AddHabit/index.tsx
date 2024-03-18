import React, {useState} from 'react';
import {Flex, Group, Text, NumberInput, Select, Space, Switch, TextInput, Button} from "@mantine/core";
import {useFormik} from "formik";
import useGlobalStore from "@/store/GlobalStore";

export const AddHabit = ({ close }: {close: () => void}) => {
    const [error, setError] = useState('')
    const [progress, setProgress] = useState<boolean>(false)
    const [category, setCategory] = useState<string>('')
    const {getNewId, addNewHabit} = useGlobalStore()
    const [type, setType] = useState<string>('Ежедневная')
    const formik = useFormik({
        initialValues: {
            id: 0,
            progress: 0,
            name: '',
            category: '',
            maxProgress: 0,
            type: 'Ежедневная',
        },
        onSubmit: values => {
            console.log(`BREAKPOINT 1`)
            if(!values.name) {
                console.log(`BREAKPOINT 2`)
                setError("Введите название")
                return
            }
            let copy = values
            copy.type = type
            copy.category = category
            copy.id = getNewId() as number
            copy.progress = 0
            copy.maxProgress = (copy.maxProgress == 0 ? 1 : copy.maxProgress);
            addNewHabit(copy)
            console.log(`BREAKPOINT 3`)
            close()
        }
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <Flex
                direction={"column"}
                gap={"md"}
            >
                <TextInput
                    size={"xs"}
                    radius="md"
                    label="Название"
                    placeholder="Введите название привычки"
                    name={'name'}
                    error={error}
                    value={formik.values.name}
                    onChange={(e) => {
                        formik.handleChange(e)
                        setError('')
                    }}
                    withAsterisk
                />
                <Select
                    size={"xs"}
                    label="Период привычки"
                    placeholder="Выберите период привычки"
                    data={['Ежедневная', 'Еженедельная', 'Ежемесячная']}
                    allowDeselect={false}
                    checkIconPosition={"right"}
                    defaultValue={'Ежедневная'}
                    value={type}
                    onChange={(e) => setType(String(e))}
                    withAsterisk
                />
                <Select
                    size={"xs"}
                    label="Категория"
                    placeholder="Введите категорию"
                    value={category}
                    checkIconPosition={"right"}
                    allowDeselect={false}
                    onSearchChange={setCategory}
                    withCheckIcon={true}
                    data={['Здоровье', 'Учёба', 'Развлечение']}
                    searchable
                    clearable
                />
                <Group align={"center"} gap={"5px"}>
                    <Flex align={"center"}>
                        <Text size={"xs"}>Включить прогресс</Text>
                        <Switch
                            defaultChecked={false}
                            size={"xs"}
                            onChange={(e) => setProgress(e.target.checked)}
                        />
                    </Flex>
                    <NumberInput
                        style={{width: "80%"}}
                        rightSection={<></>}
                        disabled={!progress}
                        size={"xs"}
                        radius="md"
                        name={'maxProgress'}
                        value={formik.values.maxProgress}
                        onChange={(e) => formik.values.maxProgress = Number(e) }
                        label="Максимальный прогресс"
                        placeholder="Введите максимальный прогресс для привычки"
                    />
                </Group>
            </Flex>
            <Space h={"xl"} />
            <Button
                type={"submit"}
            >Сохранить</Button>
        </form>
    )
}