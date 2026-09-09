"use client";

import { useState } from "react";
import { Button, Input, Select, ListBox } from "@heroui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

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

            {/* {result && (
                <div className="prose mt-10 max-w-none rounded-2xl border bg-default-50 p-6 dark:prose-invert">

                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {result}
                    </ReactMarkdown>

                </div>
            )} */}
            {result && (
                <div className="prose mt-10 max-w-none rounded-2xl border bg-default-50 p-6 dark:prose-invert">

                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h1({ children }) {
                                return (
                                    <h1 className="mt-8 mb-4 text-3xl font-bold text-primary">
                                        🚀 {children}
                                    </h1>
                                );
                            },

                            h2({ children }) {
                                return (
                                    <h2 className="mt-7 mb-3 text-2xl font-bold text-primary">
                                        ✨ {children}
                                    </h2>
                                );
                            },

                            h3({ children }) {
                                return (
                                    <h3 className="mt-6 mb-2 text-xl font-semibold">
                                        🔹 {children}
                                    </h3>
                                );
                            },

                            p({ children }) {
                                return (
                                    <p className="my-3 leading-7 text-default-600">
                                        {children}
                                    </p>
                                );
                            },

                            ul({ children }) {
                                return (
                                    <ul className="my-4 ml-5 list-disc space-y-2 text-default-600">
                                        {children}
                                    </ul>
                                );
                            },

                            ol({ children }) {
                                return (
                                    <ol className="my-4 ml-5 list-decimal space-y-2 text-default-600">
                                        {children}
                                    </ol>
                                );
                            },

                            blockquote({ children }) {
                                return (
                                    <blockquote className="my-5 rounded-xl border-l-4 border-primary bg-primary/10 p-4 italic">
                                        💡 {children}
                                    </blockquote>
                                );
                            },

                            table({ children }) {
                                return (
                                    <div className="my-6 overflow-x-auto rounded-xl border">
                                        <table className="w-full border-collapse">
                                            {children}
                                        </table>
                                    </div>
                                );
                            },

                            th({ children }) {
                                return (
                                    <th className="border bg-primary/10 px-4 py-3 text-left font-semibold">
                                        {children}
                                    </th>
                                );
                            },

                            td({ children }) {
                                return (
                                    <td className="border px-4 py-3 text-default-600">
                                        {children}
                                    </td>
                                );
                            },

                            code({ className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || "");

                                return match ? (
                                    <div className="my-5 overflow-hidden rounded-xl border shadow">
                                        <div className="flex items-center justify-between bg-zinc-800 px-4 py-2 text-xs text-white">
                                            <span>💻 {match[1]}</span>
                                            <span>SkillPilot AI</span>
                                        </div>

                                        <SyntaxHighlighter
                                            style={oneDark}
                                            language={match[1]}
                                            PreTag="div"
                                            className="!m-0"
                                        >
                                            {String(children).replace(/\n$/, "")}
                                        </SyntaxHighlighter>
                                    </div>
                                ) : (
                                    <code
                                        className="rounded-md bg-default-200 px-2 py-1 text-sm"
                                        {...props}
                                    >
                                        {children}
                                    </code>
                                );
                            },
                        }}
                    >
                        {result}
                    </ReactMarkdown>

                </div>
            )}

        </div>
    );
}
