import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Input } from "./Input";
import { Button } from "./Button";
import axios from "axios";
import { BACKEND_URL } from "../config";

type ContentType = 'Youtube' | 'Twitter';

interface CreateContentModelProps {
    open: boolean;
    onClose: () => void;
}



export function CreateContentModel({open, onClose}: CreateContentModelProps) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);

    const [type, setType] = useState<ContentType | undefined>();

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            link,
            title,
            type
        }, {
            headers: {
                "token" : localStorage.getItem('token') || ""
            }
        })
    }

    return (
        <div>

            {
                open && (
                    <div>
                        <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center"></div>
                        <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
                            <div className="flex flex-col justify-center">
                                <span className="bg-white opacity-100 p-4 rounded fixed">
                                    <div className="flex justify-end">
                                        <div onClick={onClose} className="cursor-pointer">
                                            <CrossIcon />
                                        </div>
                                    </div>
                                    <div>
                                        <Input reference={titleRef} placeholder="Title" />
                                        <Input reference={linkRef} placeholder="Link" />
                                    </div>
                                    <div>
                                        <h1>Type</h1>
                                        <div className="flex gap-1 justify-center pb-2">
                                            <Button text="Youtube" variant={type === 'Youtube' ? 'primary' : 'secondary'} onClick={() => setType('Youtube')} />
                                            <Button text="Twitter" variant={type === 'Twitter' ? 'primary' : 'secondary'} onClick={() => setType('Twitter')} />
                                         </div>
                                    </div>
                                    <div className="flex justify-center">
                                        <Button onClick={addContent} variant="primary" text="Submit" />
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    )
}