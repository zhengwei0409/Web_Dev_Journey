import { useState } from "react";
import { usePrev } from "./hooks/usePrev";

export function CustomHook2() {
    const [count, setCount] = useState(0);
    const prev = usePrev(count);

    return (
        <>
        <div>Count: {count}</div>
        <button onClick={() => setCount(c => c+1)}>Add</button>
        <p>Previous value is {prev}</p>
        </>
    )
}