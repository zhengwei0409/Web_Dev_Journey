export function SideBarClass1() {
    return <div className="flex">

        <div className="duration-700 md:w-64 bg-blue-300 w-0 h-screen">Sidebar</div>
        <div className="bg-red-300 w-full h-screen">Content <Button/></div>
     </div>
}

function Button() {
    return <div>
        <button className="transition-all duration-1000 bg-red-500 hover:bg-green-500 p-4 hover:p-8">Click Me</button>
    </div>
}