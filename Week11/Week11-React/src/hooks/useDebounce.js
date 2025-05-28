import { useEffect } from "react";
import { useState } from "react";


export function useDebounce(value,delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay)

        return () => {
            clearTimeout(handler);
        }
    })

    return debouncedValue;
}