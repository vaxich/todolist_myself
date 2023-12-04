import { ChangeEvent, KeyboardEvent, useState } from "react"

export type AddItemFormPropsType = {
    callBack: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {

    let [title, setTitle] = useState("");
    let [error, seterror] = useState<string | null>(null);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
        seterror("")
    }

    const onPresshandler = (event: KeyboardEvent<HTMLInputElement>) => {
       
        if (event.key === "Enter") {
            addItem()
        }
        
    }
    const addItem = () => {
        if (title.trim() !== "") {
            seterror(null)

            props.callBack(title.trim());
            setTitle("")
        }
         else {
            seterror("Title is requare")
        }

    }


    return (
        <div>
            <input
                className={error ? "error" : ""}
                onKeyPress={onPresshandler}
                onChange={onChangeHandler}
                value={title} />

            <button onClick={addItem}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}


