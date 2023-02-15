import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import Header from "../components/Header";

export default function success() {
    const router = useRouter();
    return (
        <div className="bg-gray-100 h-screen">
            <Header/>
            <main className="max-w-screen-lg mx-auto">
                 <div className="flex flex-col p-10 bg-white">
                    <div className="flex items-center space-x-2">
                        <CheckCircleIcon className="text-green-500 h-10"/>
                        <h1 className="text-3xl">Thank you,your order has been confirmed</h1>
                    </div>
                    <p className="mt-3">
                        Thank you for shopping with us,We'll send a confirmation once your item has been shipped.
                        if you would like to check the status of your order please press the link below.
                    </p>
                    <button className="button mt-8" onClick={()=>router.push("/orders")}>Go to my orders</button>
                 </div>
            </main>
        </div>
    )
}