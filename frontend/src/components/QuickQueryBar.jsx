"use client"
import { useState } from "react"
import { Card, CardContent, Input, Button } from "./UIComponents"

const QuickQueryBar = ({ activeSessionId }) => {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)

  const BASE_URL = import.meta.env.VITE_BASIC_URL || ""
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null

  async function handleSubmit(e) {
    e.preventDefault()

    // 🔹 clear error handling
    if (!query.trim()) {
      alert("Query cannot be empty")
      return
    }

    if (!activeSessionId) {
      alert("Please select or create a summarization session first")
      return
    }

    setLoading(true)
    try {
      const url = `${BASE_URL.replace(
        /\/?$/,
        "/"
      )}documents/summaries/${activeSessionId}/chat/`
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ query }),
      })
 
      const data = await res.json()
      if (!res.ok) {
        console.error("Gemini chat failed:", data)
        alert(data.error || "Something went wrong")
        return
      }

      // 🔹 store in localStorage per-session
      const existing = JSON.parse(localStorage.getItem("chatResults") || "{}")
      const chats = existing[activeSessionId] || []
      const entry = {
        q: query,
        a: data.answer || data.reply || data.result || "",
        timestamp: new Date().toISOString(),
      }
      existing[activeSessionId] = [...chats, entry]
      localStorage.setItem("chatResults", JSON.stringify(existing))

      // 🔹 trigger storage event so ResultsDisplay updates
      window.dispatchEvent(new Event("storage"))
    } catch (err) {
      console.error("Error chatting with Gemini:", err)
      alert("Network error while contacting AI")
    } finally {
      setLoading(false)
      setQuery("")
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-6">
      <Card className="shadow-2xl border-white/20">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                activeSessionId
                  ? "Ask Gemini about this summary..."
                  : "Select a summary to ask questions"
              }
              className="flex-1"
              disabled={!activeSessionId}
            />
            <Button
              type="submit"
              disabled={!query.trim() || !activeSessionId || loading}
              size="lg"
            >
              {loading ? "Thinking..." : "Ask AI"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default QuickQueryBar
