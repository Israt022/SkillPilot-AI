"use client";

import { useState } from "react";
import { Button, Input, Select, ListBox } from "@heroui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function StudyNotesGenerator() {
    const [topic, setTopic] = useState("");
    const [level, setLevel] = useState("Beginner");
    const [length, setLength] = useState("Medium");

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");

    const handleGenerate = async () => {
        if (!topic) return;

        try {
            setLoading(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ai/study-notes`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        topic,
                        level,
                        length,
                    }),
                }
            );

            const data = await res.json();

            setResult(data.result);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-5xl rounded-3xl border bg-background p-8 shadow">

            <h1 className="text-3xl font-bold">
                AI Study Notes Generator
            </h1>

            <p className="mt-2 text-default-500">
                Generate structured study notes with AI.
            </p>

            <div className="mt-8 space-y-5">

                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Topic
                    </label>

                    <Input
                        placeholder="React Hooks"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    />
                </div>
                {/* Difficulty */}

                <Select
                    defaultSelectedKey="Beginner"
                    onSelectionChange={(key) => {
                        if (key) setLevel(String(key));
                    }}
                >
                    <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                    </Select.Trigger>

                    <Select.Popover>
                        <ListBox>
                            <ListBox.Item id="Beginner">
                                Beginner
                            </ListBox.Item>

                            <ListBox.Item id="Intermediate">
                                Intermediate
                            </ListBox.Item>

                            <ListBox.Item id="Advanced">
                                Advanced
                            </ListBox.Item>

                        </ListBox>
                    </Select.Popover>
                </Select>

                {/* Length */}

                <Select
                    defaultSelectedKey="Medium"
                    onSelectionChange={(key) => {
                        if (key) setLength(String(key));
                    }}
                >
                    <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                    </Select.Trigger>

                    <Select.Popover>
                        <ListBox>

                            <ListBox.Item id="Short">
                                Short
                            </ListBox.Item>

                            <ListBox.Item id="Medium">
                                Medium
                            </ListBox.Item>

                            <ListBox.Item id="Long">
                                Long
                            </ListBox.Item>

                        </ListBox>
                    </Select.Popover>
                </Select>

                <Button
                    onClick={handleGenerate}
                    isDisabled={loading}
                    className="w-full"
                >
                    {loading ? "Generating..." : "Generate Notes"}
                </Button>

            </div>

            {result && (
                <div className="prose mt-10 max-w-none rounded-2xl border bg-default-50 p-6 dark:prose-invert">

                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {result}
                    </ReactMarkdown>

                </div>
            )}

        </div>
    );
}