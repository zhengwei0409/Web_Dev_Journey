import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    async function signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        const respond = await axios.post(BACKEND_URL + '/api/v1/signup', {
            username,
            password
        })

        navigate("/signin");

        alert(respond);
    }

    return(
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border border-gray-300 min-w-48 p-8">
                <Input reference={usernameRef} placeholder="Username" />
                <Input reference={passwordRef} placeholder="Password" />

                <div>
                    <Button onClick={signup} loading={false} variant="primary" text="Signup" fullWidth={true}></Button>
                </div>
            </div>

        </div>
    )
}