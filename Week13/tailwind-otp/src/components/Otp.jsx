import { useRef } from "react";


export function Otp() {
    const ref = useRef();
    const ref2 = useRef();
    const ref3 = useRef();


    return (
        <>
        <div className="">
            <SubOtpBox reference={ref} OnDone={() => {
                ref2.current.focus();
            }} />
            <SubOtpBox reference={ref2} OnDone={() => {
                ref3.current.focus();
            }} />
             <SubOtpBox reference={ref3} OnDone={() => {
                ref3.current.focus();
            }} />

        </div>
            
            
        
        </>
    )
    

}

function SubOtpBox({
    reference,
    OnDone
}) {
    return (
        <>
            <input 
            type="text" 
            ref={reference} 
            onChange={OnDone}
            className="m-1 w-[40px] h-[50px] rounded-xl outline-none px-4 text-white bg-blue-500"
            />

        </>
    )
}