import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContent() {
    const [contents, setContents] = useState([]);

    async function refresh() {
        try {
            const respond = await axios.get(`${BACKEND_URL}/api/v1/content`,{
                headers: {
                    "token": localStorage.getItem("token")
                }
            })
            setContents(respond.data.content);
        } catch(e) {
            console.log("Error fetching content:" + e);
        }
    }

    useEffect(() => {
        refresh();

        const interval = setInterval(() => {
            refresh();
        }, 10 * 1000);

        return () => {
            clearInterval(interval);
        }
    },[]);

    return {contents, refresh};
}