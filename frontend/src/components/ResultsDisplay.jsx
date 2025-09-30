"use client"
import { useEffect, useState, Fragment } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Button, // ⬅️ already here
} from "./UIComponents"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Dialog } from "@headlessui/react"   // ✅ added for modal

const ResultsDisplay = ({ results }) => {
  const [chatResults, setChatResults] = useState({})
  const [audioData, setAudioData] = useState({})
  const [loadingAudio, setLoadingAudio] = useState(null)
  const [showLangModal, setShowLangModal] = useState(false) // ✅ new
  const [pendingSummaryId, setPendingSummaryId] = useState(null) // ✅ new

  const BASE_URL = import.meta.env.VITE_BASIC_URL || ""
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

  useEffect(() => {
    function loadChats() {
      const stored = JSON.parse(localStorage.getItem("chatResults") || "{}")
      setChatResults(stored)
    }

    loadChats()
    window.addEventListener("storage", loadChats)
    return () => window.removeEventListener("storage", loadChats)
  }, [])

  async function handleAudioSummarize(summaryId, lang) { // ✅ now accepts lang
    if (!token) {
      alert("You must be logged in to use audio summarization")
      return
    }

    setLoadingAudio(summaryId)
    try {
      const url = `${BASE_URL.replace(/\/?$/, "/")}documents/summaries/${summaryId}/audio/`
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ language: lang }),
      })

      const data = await res.json()
      if (!res.ok) {
        console.error("Audio summarize failed:", data)
        alert(data.error || "Something went wrong generating audio")
        return
      }
      setAudioData((prev) => ({
        ...prev,
        [summaryId]: { url: data.audio_url, narration: data.narration },
      }))
    } catch (err) {
      console.error("Error summarizing audio:", err)
      alert("Network error while generating audio")
    } finally {
      setLoadingAudio(null)
      setShowLangModal(false)
      setPendingSummaryId(null)
    }
  }

  return (
    <div className="space-y-8">
      {/* ✅ Language Selection Modal */}
      <Dialog
        as="div"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
        open={showLangModal}
        onClose={() => setShowLangModal(false)}
      >
        <Dialog.Panel className="bg-gray-900 p-6 rounded-2xl shadow-2xl w-full max-w-sm text-center">
          <Dialog.Title className="text-lg font-bold text-white mb-4">
            Choose Narration Language 🎧
          </Dialog.Title>
          <div className="flex justify-center gap-4">
            <Button onClick={() => handleAudioSummarize(pendingSummaryId, "en")}>
              English 🇬🇧
            </Button>
            <Button onClick={() => handleAudioSummarize(pendingSummaryId, "hi")}>
              Hindi 🇮🇳
            </Button>
          </div>
          <Button
            variant="ghost"
            onClick={() => setShowLangModal(false)}
            className="mt-4 text-gray-400"
          >
            Cancel
          </Button>
        </Dialog.Panel>
      </Dialog>

      <Tabs defaultValue="summaries" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="w-full max-w-md">
            <TabsTrigger value="summaries">Summaries</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="summaries" className="space-y-6">
          {results.summaries.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="text-6xl mb-4 opacity-50">📋</div>
                <p className="text-white/60 text-lg">
                  No summaries yet. Upload files and run summarize to see results here.
                </p>
              </CardContent>
            </Card>
          ) : (
            results.summaries.map((item) => {
              const chats = chatResults[item.id] || []
              const audio = audioData[item.id]

              return (
                <Card key={item.id} className="animate-slide-up shadow-lg">
                  <CardHeader className="border-b border-white/20 pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl font-bold text-blue-300">
                        Summary Result
                      </CardTitle>
                      <Badge variant="secondary">{item.timestamp}</Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="prose prose-invert max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ node, ...props }) => (
                          <h1
                            className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mt-8 mb-4"
                            {...props}
                          />
                        ),
                        h2: ({ node, ...props }) => (
                          <h2
                            className="text-2xl font-semibold text-blue-200 mt-6 mb-3 border-b border-white/20 pb-1"
                            {...props}
                          />
                        ),
                        h3: ({ node, ...props }) => (
                          <h3
                            className="text-xl font-semibold text-indigo-300 mt-4 mb-2"
                            {...props}
                          />
                        ),
                        ul: ({ node, ...props }) => (
                          <ul
                            className="list-disc list-inside space-y-2 ml-4 marker:text-blue-400"
                            {...props}
                          />
                        ),
                        ol: ({ node, ...props }) => (
                          <ol
                            className="list-decimal list-inside space-y-2 ml-4 marker:text-green-400"
                            {...props}
                          />
                        ),
                        li: ({ node, ...props }) => (
                          <li className="leading-relaxed text-white/90" {...props} />
                        ),
                        blockquote: ({ node, ...props }) => (
                          <blockquote
                            className="bg-white/5 border-l-4 border-blue-400 pl-4 italic rounded-lg py-3 my-3 text-white/80"
                            {...props}
                          />
                        ),
                        strong: ({ node, ...props }) => (
                          <strong
                            className="text-yellow-300 font-semibold bg-white/10 px-1 rounded"
                            {...props}
                          />
                        ),
                        p: ({ node, ...props }) => (
                          <p className="leading-relaxed text-white/80 my-3" {...props} />
                        ),
                      }}
                    >
                      {item.content}
                    </ReactMarkdown>
                  </CardContent>

                  {/* 🔹 Audio Summarize Button (only if summary exists) */}
                  {item.content && (
                    <CardContent className="mt-2">
                      <Button
                        onClick={() => {
                          setPendingSummaryId(item.id)
                          setShowLangModal(true) // ✅ open modal instead of prompt
                        }}
                        disabled={loadingAudio === item.id}
                      >
                        {loadingAudio === item.id ? "Generating Audio..." : "🎧 Audio Summarize"}
                      </Button>

                      {audio && (
                        <div className="mt-3 space-y-2">
                          <audio controls className="w-full">
                            <source src={audio.url} type="audio/mpeg" />
                            Your browser does not support the audio element.
                          </audio>
                          <p className="text-sm text-gray-400">
                            Narration: {audio.narration.slice(0, 120)}...
                          </p>
                        </div>
                      )}
                    </CardContent>
                  )}

                  {/* 🔹 Gemini Q&A Section */}
                  {chats.length > 0 && (
                    <CardContent className="mt-6 border-t border-white/10 pt-6">
                      <h3 className="text-lg font-semibold text-gray-200 mb-5 flex items-center gap-2">
                        <span>💬</span> Q&A with Gemini
                      </h3>
                      <div className="space-y-6">
                        {chats.map((c, i) => (
                          <div key={i} className="space-y-3">
                            <div className="max-w-[85%] ml-auto rounded-xl bg-gray-700 p-4 text-right shadow-sm">
                              <p className="text-sm text-gray-100 font-medium">❓ {c.q}</p>
                              <p className="text-[11px] text-gray-400 mt-2">
                                {new Date(c.timestamp).toLocaleString()}
                              </p>
                            </div>
                            <div className="max-w-[90%] mr-auto rounded-xl bg-gray-800 p-5 shadow-sm border border-gray-700">
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {c.a}
                              </ReactMarkdown>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              )
            })
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ResultsDisplay
