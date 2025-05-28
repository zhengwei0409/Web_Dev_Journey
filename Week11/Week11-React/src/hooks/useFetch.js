import { useEffect } from "react";
import { useState } from "react";

export function useFetch(url) {
    const [post, setPost] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setLoading(false)
            const respond = await fetch(url);
            const data = await respond.json();
            setPost(data);
            setLoading(true);
        })() //IIFE
    },[url])

    // useEffect(() => {
    //     setInterval()

    //     return () => {
    //         clearInterval(); 
    //     }
    // },[])

    return {post,loading};
}
