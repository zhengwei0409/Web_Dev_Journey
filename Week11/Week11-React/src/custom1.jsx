

import { useState } from 'react';
import './App.css'

import { useFetch } from './hooks/useFetch';


function CustomHook() {
    const [postNum, setPostNum] = useState(1);
    const {post, loading} = useFetch("https://jsonplaceholder.typicode.com/posts/" + postNum);

    return (
        <>
            <button onClick={() => setPostNum(1)}>1</button>
            <button onClick={() => setPostNum(2)}>2</button>
            <button onClick={() => setPostNum(3)}>3</button>
            {loading? JSON.stringify(post) : "loading...."}
        </>
    )
}

export default CustomHook;