"use client";

import { Button } from "@heroui/react";
import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Bot,
  Camera,
  Image as ImageIcon,
  Send,
  X,
  Sparkles,
} from "lucide-react";

// export default function AIChat() {
//   const [prompt, setPrompt] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [loading, setLoading] = useState(false);


//   const handleAskAI = async () => {
//     if (!prompt.trim()) return;

//     try {
//       setLoading(true);

//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ai`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             prompt,
//           }),
//         }
//       );


//       const data = await res.json();

//       setAnswer(data.result);

//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };


//   return (
//     <div className="m-12 rounded-2xl border border-default-200 bg-background p-6 shadow-lg">

//       <h2 className="text-2xl font-bold">
//         Ask SkillPilot AI 🤖
//       </h2>


//       <textarea
//         value={prompt}
//         onChange={(e) => setPrompt(e.target.value)}
//         placeholder="Ask about career, skills, roadmap..."
//         className="mt-5 min-h-32 w-full rounded-xl border p-4 outline-none"
//       />


//       <Button
//         onClick={handleAskAI}
//         isDisabled={loading}
//         className="mt-4 rounded-xl bg-primary px-6 py-3 text-white"
//       >
//         {
//           loading
//             ? "Thinking..."
//             : "Ask AI"
//         }
//       </Button>


//       {
//         answer && (
//           <div className="mt-6 rounded-xl bg-default-100 p-5">

//             <h3 className="font-semibold text-lg">
//               🤖 AI Response
//             </h3>

//             <div className="mt-4 prose max-w-none dark:prose-invert">

//               <ReactMarkdown
//                 remarkPlugins={[remarkGfm]}
//                 components={{

//                   h1({ children }) {
//                     return (
//                       <h1 className="mt-8 mb-4 flex items-center gap-2 text-3xl font-bold text-primary">
//                         🚀 {children}
//                       </h1>
//                     );
//                   },

//                   h2({ children }) {
//                     return (
//                       <h2 className="mt-7 mb-3 flex items-center gap-2 text-2xl font-bold text-primary">
//                         ✨ {children}
//                       </h2>
//                     );
//                   },

//                   h3({ children }) {
//                     return (
//                       <h3 className="mt-6 mb-2 flex items-center gap-2 text-xl font-semibold">
//                         🔹 {children}
//                       </h3>
//                     );
//                   },


//                   p({ children }) {
//                     return (
//                       <p className="my-3 leading-7 text-default-600">
//                         {children}
//                       </p>
//                     );
//                   },


//                   ul({ children }) {
//                     return (
//                       <ul className="my-4 ml-5 list-disc space-y-2 text-default-600">
//                         {children}
//                       </ul>
//                     );
//                   },


//                   ol({ children }) {
//                     return (
//                       <ol className="my-4 ml-5 list-decimal space-y-2 text-default-600">
//                         {children}
//                       </ol>
//                     );
//                   },


//                   blockquote({ children }) {
//                     return (
//                       <blockquote className="my-5 rounded-xl border-l-4 border-primary bg-primary/10 p-4 italic">
//                         💡 {children}
//                       </blockquote>
//                     );
//                   },


//                   table({ children }) {
//                     return (
//                       <div className="my-6 overflow-x-auto rounded-xl border">
//                         <table className="w-full border-collapse">
//                           {children}
//                         </table>
//                       </div>
//                     );
//                   },


//                   th({ children }) {
//                     return (
//                       <th className="border bg-primary/10 px-4 py-3 text-left font-semibold">
//                         {children}
//                       </th>
//                     );
//                   },


//                   td({ children }) {
//                     return (
//                       <td className="border px-4 py-3 text-default-600">
//                         {children}
//                       </td>
//                     );
//                   },


//                   code({ className, children, ...props }) {

//                     const match = /language-(\w+)/.exec(className || "");


//                     return match ? (

//                       <div className="my-5 overflow-hidden rounded-xl border shadow">

//                         <div className="flex items-center justify-between bg-zinc-800 px-4 py-2 text-xs text-white">
//                           <span>💻 {match[1]}</span>
//                           <span>SkillPilot AI</span>
//                         </div>


//                         <SyntaxHighlighter
//                           style={oneDark}
//                           language={match[1]}
//                           PreTag="div"
//                           className="!m-0"
//                         >
//                           {String(children).replace(/\n$/, "")}
//                         </SyntaxHighlighter>

//                       </div>

//                     ) : (

//                       <code
//                         className="rounded-md bg-default-200 px-2 py-1 text-sm"
//                         {...props}
//                       >
//                         {children}
//                       </code>

//                     );
//                   },

//                 }}
//               >
//                 {answer}
//               </ReactMarkdown>

//             </div>

//           </div>
//         )
//       }

//     </div>
//   );
// }
export default function AIChat() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB.");
      return;
    }

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result as string);
      };

      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  };

  const handleAskAI = async () => {
    if (!prompt.trim() && !image) return;

    try {
      setLoading(true);
      setAnswer("");

      let imageBase64 = "";

      if (image) {
        imageBase64 = await fileToBase64(image);
      }

      // const res = await fetch(
      //   `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ai`,
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       prompt: prompt.trim(),
      //       image: imageBase64 || undefined,
      //     }),
      //   }
      // );

      // const data = await res.json();

      // if (!res.ok) {
      //   throw new Error(data.message || "AI request failed");
      // }
      console.log("API URL:", `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ai`);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ai`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: prompt.trim(),
            image: imageBase64 || undefined,
          }),
        }
      );

      console.log("STATUS:", res.status);
      console.log("CONTENT-TYPE:", res.headers.get("content-type"));

      const responseText = await res.text();

      console.log("RAW RESPONSE:", responseText);

      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(
          `Server returned non-JSON response. Status: ${res.status}`
        );
      }

      if (!res.ok) {
        throw new Error(data.message || "AI request failed");
      }

      setAnswer(data.result);

      setAnswer(data.result);
    } catch (error) {
      console.error(error);
      setAnswer("Sorry, something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-full px-4 py-6 md:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Bot className="text-primary" size={34} />
          </div>

          <h1 className="text-3xl font-bold md:text-4xl">
            Ask SkillPilot AI 🤖
          </h1>

          <p className="mx-auto mt-2 max-w-2xl text-default-500">
            Ask questions, get career guidance, explain code, analyze
            screenshots, and learn smarter with AI.
          </p>
        </div>

        {/* Chat Card */}
        <div className="rounded-3xl border border-default-200 bg-background p-5 shadow-lg md:p-7">

          {/* Prompt */}
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask about career, skills, roadmap, coding, errors..."
              className="min-h-40 w-full resize-none rounded-2xl border border-default-200 bg-default-50 p-5 pr-5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="relative mt-4 w-fit overflow-hidden rounded-2xl border border-default-200">
              <img
                src={imagePreview}
                alt="Selected image"
                className="max-h-52 max-w-xs object-cover"
              />

              <button
                type="button"
                onClick={removeImage}
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-2">

              {/* Image Upload */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />

              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                isDisabled={loading}
                className="rounded-xl"
              >
                <ImageIcon size={18} />
                <span>Upload Image</span>
              </Button>

              <span className="hidden text-xs text-default-400 sm:block">
                PNG, JPG • Max 5MB
              </span>
            </div>

            {/* Ask Button */}
            <Button
              type="button"
              onClick={handleAskAI}
              isDisabled={loading || (!prompt.trim() && !image)}
              className="rounded-xl bg-primary px-7 text-white"
            >
              {loading ? (
                <>
                  <Sparkles size={18} />
                  Thinking...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Ask AI
                </>
              )}
            </Button>

          </div>
        </div>

        {/* Suggestions */}
        {!answer && !loading && (
          <div className="mt-6 grid gap-3 sm:grid-cols-3">

            <div className="rounded-2xl border border-default-200 bg-background p-4">
              <span className="text-xl">💻</span>
              <p className="mt-2 font-medium">Explain Code</p>
              <p className="mt-1 text-sm text-default-500">
                Upload a screenshot and ask what the code does.
              </p>
            </div>

            <div className="rounded-2xl border border-default-200 bg-background p-4">
              <span className="text-xl">🎯</span>
              <p className="mt-2 font-medium">Career Guidance</p>
              <p className="mt-1 text-sm text-default-500">
                Get personalized learning and career suggestions.
              </p>
            </div>

            <div className="rounded-2xl border border-default-200 bg-background p-4">
              <span className="text-xl">🐛</span>
              <p className="mt-2 font-medium">Debug Errors</p>
              <p className="mt-1 text-sm text-default-500">
                Upload an error screenshot and ask for a solution.
              </p>
            </div>

          </div>
        )}

        {/* AI Response */}
        {answer && (
          <div className="mt-8 rounded-3xl border border-default-200 bg-background p-5 shadow-lg md:p-7">

            <div className="mb-5 flex items-center gap-3 border-b border-default-200 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Bot className="text-primary" size={22} />
              </div>

              <div>
                <h2 className="font-semibold">
                  AI Response
                </h2>
                <p className="text-xs text-default-400">
                  Generated by SkillPilot AI
                </p>
              </div>
            </div>

            <div className="prose max-w-none dark:prose-invert">

              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{

                  h1({ children }) {
                    return (
                      <h1 className="mb-4 mt-8 flex items-center gap-2 text-3xl font-bold text-primary">
                        🚀 {children}
                      </h1>
                    );
                  },

                  h2({ children }) {
                    return (
                      <h2 className="mb-3 mt-7 flex items-center gap-2 text-2xl font-bold text-primary">
                        ✨ {children}
                      </h2>
                    );
                  },

                  h3({ children }) {
                    return (
                      <h3 className="mb-2 mt-6 flex items-center gap-2 text-xl font-semibold">
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
                    const match = /language-(\w+)/.exec(
                      className || ""
                    );

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
        )}

      </div>
    </main>
  );
}