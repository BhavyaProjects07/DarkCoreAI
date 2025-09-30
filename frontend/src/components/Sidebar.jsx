"use client"

import { useEffect, useState } from "react"
import { Plus, MessageSquare, X } from "lucide-react"

export default function Sidebar({
  onSelectSession,
  onCreateLocalSession,
  refreshTrigger = null,
  externalSessions = null,
  isOpen
}) {
  const [sessions, setSessions] = useState([])
  const [activeId, setActiveId] = useState(null)
  
  const BASE_URL = import.meta.env.VITE_BASIC_URL || ""
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

  useEffect(() => {
    if (!document.querySelector("#sidebar-animations")) {
      const style = document.createElement("style")
      style.id = "sidebar-animations"
      style.textContent = `
        @keyframes float { 0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)} }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .session-card { transition: all .22s cubic-bezier(.2,.9,.2,1); }
        .session-card:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(2,6,23,0.5); }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
      `
      document.head.appendChild(style)
    }
  }, [])

  async function fetchSessions() {
    if (!token) {
      setSessions([])
      return
    }
    try {
      const url = `${BASE_URL.replace(/\/?$/, "/")}documents/summaries/`
      const res = await fetch(url, { headers: { Authorization: `Token ${token}` } })
      if (!res.ok) {
        console.warn("Could not fetch summaries, status:", res.status)
        setSessions([])
        return
      }
      const data = await res.json()
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data.results)
        ? data.results
        : data.summaries || []
      setSessions(list.slice().reverse())
    } catch (err) {
      console.error("Failed to load sessions:", err)
      setSessions([])
    }
  }

  useEffect(() => {
    fetchSessions()
    const onStorage = () => fetchSessions()
    window.addEventListener("storage", onStorage)

    const onNew = (e) => {
      try {
        const s = e.detail
        if (!s || !s.id) return
        setSessions((prev) => {
          if (prev.find((p) => String(p.id) === String(s.id))) return prev
          return [s, ...prev]
        })
      } catch (err) {
        console.error("summaries:added handler err", err)
      }
    }
    window.addEventListener("summaries:added", onNew)

    return () => {
      window.removeEventListener("storage", onStorage)
      window.removeEventListener("summaries:added", onNew)
    }
  }, [refreshTrigger, token])

  useEffect(() => {
    if (!Array.isArray(externalSessions) || externalSessions.length === 0) return
    setSessions((prev) => {
      const map = {}
      const merged = [...externalSessions, ...prev]
      const out = []
      for (const s of merged) {
        const key = String(s.id)
        if (!map[key]) {
          map[key] = true
          out.push(s)
        }
      }
      return out
    })
  }, [externalSessions])

  const handleSelect = (s) => {
    setActiveId(s.id)
    if (onSelectSession) onSelectSession(s)
  }

  const handleNewChat = () => {
    const local = {
      id: `local-${Date.now()}`,
      title: "New Chat",
      created_at: new Date().toISOString(),
      summary_text: "",
      is_local: true,
    }
    setSessions((prev) => [local, ...prev])
    setActiveId(local.id)
    if (onCreateLocalSession) onCreateLocalSession(local)
  }

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-16 bottom-0 left-0 bg-gray-900 border-r border-gray-800 p-4 flex flex-col z-40 w-72 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
        aria-label="Summarization sidebar"
      >
        {/* subtle floating background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-4 w-2 h-2 bg-purple-500 rounded-full animate-float opacity-60" />
          <div
            className="absolute top-32 right-8 w-1 h-1 bg-blue-400 rounded-full animate-float opacity-40"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="relative z-10 flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-700/10">
              <MessageSquare size={18} className="text-purple-300" />
            </div>
            <span className="font-bold text-lg text-white">Summarizations</span>
          </div>

          <div className="flex items-center gap-2">
            {/* New Chat button now first */}
            <button
              title="New Chat"
              onClick={handleNewChat}
              className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition animate-pulse-glow"
            >
              <Plus size={16} />
            </button>
            {/* Close button on the far right */}
            <button
              title="Close Sidebar"
             
              className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto relative z-10 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
          {sessions.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600/50 flex items-center justify-center">
                <MessageSquare size={24} className="text-slate-400" />
              </div>
              <p className="text-slate-400 text-sm font-medium">No summarizations yet</p>
              <p className="text-slate-500 text-xs mt-1">Create your first chat to get started</p>
            </div>
          ) : (
            sessions.map((s) => (
              <div key={s.id} className="mb-3">
                <div
                  className={`p-2 rounded-2xl transition-colors duration-200 ${
                    activeId === s.id
                      ? "bg-gradient-to-br from-purple-800/20 to-blue-800/10 border border-purple-700/20"
                      : "bg-slate-800/30 hover:bg-slate-800/50"
                  }`}
                >
                  <div
                    onClick={() => handleSelect(s)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") handleSelect(s)
                    }}
                    className={`session-card p-4 rounded-lg cursor-pointer relative ${
                      activeId === s.id ? "ring-1 ring-purple-500/30" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-sm font-semibold text-white truncate">
                        {s.title || `Summarization ${s.id}`}
                      </h3>
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 opacity-60 ml-2 flex-shrink-0" />
                    </div>

                    <div className="text-xs text-slate-400 mb-2 font-medium">
                      {s.created_at ? new Date(s.created_at).toLocaleString() : "—"}
                    </div>

                    {(s.summary_text || s.summary) && (
                      <div className="text-xs text-slate-300 leading-relaxed line-clamp-3 opacity-80 transition-opacity">
                        {s.summary_text || s.summary}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  )
}
