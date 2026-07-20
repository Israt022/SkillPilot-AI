"use client";

import { Button } from "@heroui/react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function AIChat() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);


  const handleAskAI = async () => {
    if (!prompt.trim()) return;

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ai`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt,
          }),
        }
      );


      const data = await res.json();

      setAnswer(data.result);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="m-12 rounded-2xl border border-default-200 bg-background p-6 shadow-lg">

      <h2 className="text-2xl font-bold">
        Ask SkillPilot AI 🤖
      </h2>


      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask about career, skills, roadmap..."
        className="mt-5 min-h-32 w-full rounded-xl border p-4 outline-none"
      />


      <Button
        onClick={handleAskAI}
        isDisabled={loading}
        className="mt-4 rounded-xl bg-primary px-6 py-3 text-white"
      >
        {
          loading
            ? "Thinking..."
            : "Ask AI"
        }
      </Button>


      {
        answer && (
          <div className="mt-6 rounded-xl bg-default-100 p-5">

            <h3 className="font-semibold text-lg">
              🤖 AI Response
            </h3>

            <div className="mt-4 prose max-w-none dark:prose-invert">

              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{

                  h1({ children }) {
                    return (
                      <h1 className="mt-8 mb-4 flex items-center gap-2 text-3xl font-bold text-primary">
                        🚀 {children}
                      </h1>
                    );
                  },

                  h2({ children }) {
                    return (
                      <h2 className="mt-7 mb-3 flex items-center gap-2 text-2xl font-bold text-primary">
                        ✨ {children}
                      </h2>
                    );
                  },

                  h3({ children }) {
                    return (
                      <h3 className="mt-6 mb-2 flex items-center gap-2 text-xl font-semibold">
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
                {answer}
              </ReactMarkdown>

            </div>

          </div>
        )
      }

    </div>
  );
}