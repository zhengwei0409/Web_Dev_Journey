import { useEffect } from "react";
import axios from 'axios'
import { useState } from "react";



export function Question2() {

    const [data, setData] = useState();


    useEffect(() => {
        const respond = async () => {
            try {
                const respond = await axios.get("https://randomuser.me/api");
                setData(respond.data);
            }catch(e) {
                console.log("err: " + e);
            }
        }

        respond()

    },[])

    return (
        <div>{JSON.stringify(data)}</div>
    )
}