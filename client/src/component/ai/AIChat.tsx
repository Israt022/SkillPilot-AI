"use client";

import { useState } from "react";

export default function AIChat() {

    const [prompt, setPrompt] = useState("");
    const [answer, setAnswer] = useState("");

    const askAI = async () => {

        const res = await fetch(
            "http://localhost:5000/api/ai",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    prompt
                })
            }
        );


        const data = await res.json();

        setAnswer(data.result);
    }


    return (
        <div>

            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />

            <button onClick={askAI}>
                Ask AI
            </button>


            <div>
                {answer}
            </div>

        </div>
    )

}