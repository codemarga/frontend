/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { Roboto } from "next/font/google";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FloatingLabelInput from "@/components/floatingInput";

const roboto = Roboto({
    weight: ["400", "500", "700"],
    subsets: ["latin"],
});

/** SIGNUP COMPONENT */
function Signup() {
    const router = useRouter();

    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setButtonDisabled(
            user.name === "" || user.email === "" || user.password === ""
        );
    }, [user]);

    const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(
                process.env.NEXT_PUBLIC_REGISTER_URL!,
                {
                    username: user.name,
                    email: user.email,
                    password: user.password,
                },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            toast.success("Signup successful! Please login to continue.");
            router.push("/login");
        } catch (error: any) {
            console.error(error);

            if (error.response) {
                const statusCode = error.response.status;
                const errorMessage =
                    error.response.data?.error ||
                    (statusCode === 400
                        ? "Invalid details, please check and try again."
                        : "An error occurred. Please try again later.");
                toast.error(errorMessage);
            } else {
                toast.error("Network error. Please check your connection.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative w-full min-h-screen overflow-hidden bg-[#f8f3f0]">
            <div
                className="bg-white z-10 absolute top-[50px] left-[50px] bottom-[50px] right-[50px] flex items-start border-gray-300 rounded-3xl"
                style={{ boxShadow: "0 5px 7px rgba(100, 100, 100, 0.5)" }}
            >
                <div className="flex relative w-[850px] h-full">
                    <Image
                        priority={true}
                        src="/sycas-logo.svg"
                        alt="Logo"
                        width={800}
                        height={240}
                        className="absolute left-[30px] top-[13%] rounded-l-3xl"
                    />
                    <div className="absolute bottom-[15%] left-[10%] flex flex-col">
                        <h1 className="text-[36px] font-bold text-[#1f1f1f] pb-2">Join Us</h1>
                        <p className="text-[16px] text-[#1f1f1f]">
                            Please sign up using the form on the right.
                        </p>
                    </div>
                </div>

                <div className="bg-white h-full rounded-r-3xl flex flex-1 flex-col justify-center">
                    <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6">
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col gap-2 items-center mb-[40px]">
                                <h2
                                    className={`${roboto.className} text-center text-[40px] font-bold leading-9 tracking-tight text-[#17c8b9]`}
                                >
                                    {loading ? "Loading..." : "Create an Account"}
                                </h2>
                            </div>
                            <FloatingLabelInput
                                id="name"
                                name="name"
                                value={user.name}
                                placeholder="Full Name"
                                onChange={handleChanges}
                            />
                            <FloatingLabelInput
                                id="email"
                                name="email"
                                value={user.email}
                                placeholder="Email"
                                onChange={handleChanges}
                            />
                            <FloatingLabelInput
                                id="password"
                                name="password"
                                value={user.password}
                                placeholder="Password"
                                onChange={handleChanges}
                            />

                            <div>
                                <button
                                    type="submit"
                                    disabled={buttonDisabled}
                                    className={`${buttonDisabled ? "bg-[#17c8b9]" : "bg-[#e16e28]"
                                        } flex w-full max-w-xs mx-auto justify-center rounded-md py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#4ae0d3]`}
                                    onClick={handleSubmit}
                                >
                                    {loading ? "Signing up..." : "Sign Up"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Signup;
