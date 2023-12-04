import { ChangeEvent, useState } from "react"

export type EditableSpanPropsType = {
    value: string
    callBack: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    let [title, setTitle] = useState(props.value);
    const [status, setStatus] = useState<boolean>(true);

    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const setViewMode = () => {
        setStatus(true)
        props.callBack(title)
    }

    const setChangeMode = () => {
        setStatus(false)
    }

    return (
        <div>
            {
                status
                    ? <span onDoubleClick={setChangeMode}>{title}</span>
                    : <input value={title} autoFocus onBlur={setViewMode} onChange={onChangeTitle} />
            }
        </div>
    )
}