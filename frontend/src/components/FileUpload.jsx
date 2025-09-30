"use client"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button } from "./UIComponents"
import { motion, AnimatePresence } from "framer-motion"

const FileUpload = ({ uploadedFiles, setUploadedFiles, handleFileUpload }) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [popup, setPopup] = useState({ show: false, message: "", type: "" })

  const triggerPopup = (message, type = "success") => {
    setPopup({ show: true, message, type })
    setTimeout(() => setPopup({ show: false, message: "", type: "" }), 2500)
  }

  const processFiles = async (files) => {
    for (let file of files) {
      try {
        await handleFileUpload(file) // ✅ parent handles auth + upload
        triggerPopup(`✅ ${file.name} uploaded successfully!`, "success")
      } catch (err) {
        console.error("Upload failed:", err)

        // 👉 If error is "unauthorized", don't show red popup
        if (err.message && err.message.toLowerCase().includes("unauthorized")) {
          // Chat.jsx already shows the auth popup
          return
        }

        triggerPopup(`❌ ${file.name} failed to upload.`, "error")
      }
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = e.dataTransfer.files
    processFiles(files)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleChange = (e) => {
    processFiles(e.target.files)
  }

  const removeFile = (fileId) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  return (
    <>
      <Card className="animate-slide-up">
        <CardHeader>
          <CardTitle>Upload Documents</CardTitle>
          <CardDescription>
            Drag and drop files or click to browse. Supports PDF, DOC, TXT, CSV, and more formats.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-500 ${
              isDragOver
                ? "border-blue-400 bg-blue-400/10 scale-105"
                : "border-white/20 hover:border-blue-400/50 hover:bg-blue-400/5 hover:scale-102"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="text-8xl mb-6 animate-pulse-slow">📁</div>
            <p className="text-xl mb-3 font-semibold">Drop files here or click to browse</p>
            <p className="text-base text-white/60 mb-8">Supports PDF, DOC, TXT, CSV, and more</p>
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleChange}
              id="file-upload"
            />
            <Button size="lg" onClick={() => document.getElementById("file-upload").click()}>
              Browse Files
            </Button>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {uploadedFiles.map((file, index) => (
                <Card
                  key={file.id || `${file.name}-${file.size}-${index}-${crypto.randomUUID()}`}
                  className="animate-slide-up hover:scale-105 transition-transform duration-300"
                >
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">📄</div>
                      <div>
                        <p className="font-semibold truncate max-w-32 text-white">{file.name}</p>
                        <p className="text-sm text-white/60">{(file.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      ✕
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ✅ Popup Notification */}
      <AnimatePresence>
        {popup.show && (
          <motion.div
            className={`fixed bottom-6 right-6 px-6 py-3 rounded-xl shadow-lg text-white font-semibold ${
              popup.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            {popup.message}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default FileUpload
