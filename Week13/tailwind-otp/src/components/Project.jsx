import { useState } from "react";
import { SidebarIcon } from "./icon/SidebarIcon"

export function Mains() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return(
        <div className="flex">

            
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <MainContent />
        </div>
    )
}


function Sidebar({sidebarOpen, setSidebarOpen}) {
   if(sidebarOpen) {
     return (
        <>
            <div className="w-64 h-screen bg-red-100 duration-100">
                <div className="cursor-pointer hover:bg-slate-200" onClick={() => {
                    setSidebarOpen(s => !s)
                }}>
                    <SidebarIcon/>
                </div>
            </div>
        </>
    )
   } else {
    return (
        <>
            <div className='w-10 h-screen bg-red-100 duration-100'>
                <div className="cursor-pointer hover:bg-slate-200" onClick={() => {
                    setSidebarOpen(s => !s)
                }}>
                    <SidebarIcon/>
                </div>
            </div>
        </>
    )
   }
}

function MainContent() {

    return (
        <div className="w-full">
            <div className="h-36 bg-black"></div>
            <div className="grid grid-cols-11 gap-8 p-8">
                <div className="h-96 rounded-2xl bg-red-200 md:col-span-2 col-span-11 -translate-y-24 shadow-lg hidden md:block">

                </div>
                <div className="h-96 rounded-2xl shadow-lg bg-green-200 md:col-span-6 col-span-11">

                </div>
                <div className="h-96 rounded-2xl shadow-lg bg-yellow-200 md:col-span-3 col-span-11">

                </div>
            </div>
        </div>
    )
}