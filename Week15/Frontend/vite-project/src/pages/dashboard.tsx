import { useEffect, useState } from "react";
import { useContent } from "../CustumHook/useContent";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { ShareIcon } from "../icons/shareIcon";
import { PlusIcon } from "../icons/plusIcon";
import { Sidebar } from "../components/Sidebar";
import { CreateContentModel } from "../components/CreateContentModel";

export function Dashboard() {
    const [modelOpen, setModelOpen] = useState(false);
    const {contents, refresh} = useContent();

    useEffect(() => {
        refresh()
    },[modelOpen])


    return (
        <>
        
        <Sidebar />
        <div className='p-4 ml-72 min-h-screen bg-gray-100 border-2 border-gray-200'>

            <CreateContentModel open={modelOpen} onClose={() => setModelOpen(false)} />

            <div className='flex justify-end gap-4'>
            <Button variant='secondary' text='Share Brain' startIcon={<ShareIcon/>}></Button>
            <Button variant='primary' text='Add Content' startIcon={<PlusIcon/>} onClick={() => {setModelOpen(true)}}></Button>
            </div>

            <div className='flex gap-4 flex-wrap'>
            {
                contents.map(({title, link, type}) => {
                return (<Card
                    key={title}
                    type={type}
                    link={link}
                    title={title}
                />)
            })
            }
            </div>
        </div>
        </>
    )
}