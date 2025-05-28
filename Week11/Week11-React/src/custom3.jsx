import { useEffect } from "react";

import { useState } from "react";
import { useDebounce } from "./hooks/useDebounce";


export function CustomHook3() {
    const [inputVal, setInputVal] = useState();
    const debounceValue = useDebounce(inputVal,300);

    useEffect(() => {
        console.log("Expensive operation")
    },[debounceValue])


    return (
        <>
            <input onChange={(e) => setInputVal(e.target.value)} type="text" />
        </>
    )
}