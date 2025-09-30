"use client"
import { Card, CardContent } from "./UIComponents"

const ActionButtons = ({ uploadedFiles, handleSummarize, isSummarizing }) => {
  if (uploadedFiles.length === 0) return null

  return (
    <div className="flex justify-center animate-slide-up">
      <div
        role="button"
        tabIndex={0}
        onClick={handleSummarize}
        onKeyDown={(e) => e.key === "Enter" && handleSummarize()}
        className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-blue-500/30 group rounded-xl relative w-60"
      >
        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/50 rounded-xl">
          <CardContent className="p-6 text-center">
            {isSummarizing ? (
              <div className="flex flex-col items-center justify-center py-4">
                {/* Loader bar */}
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mb-3">
                  <div className="h-2 bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse w-full"></div>
                </div>
                <span className="text-blue-300 text-sm font-semibold animate-pulse">
                  Summarizing...
                </span>
              </div>
            ) : (
              <>
                <div
                  className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 flex items-center justify-center text-xl group-hover:scale-110 transition-all duration-300 shadow-md"
                >
                  📝
                </div>
                <h3 className="text-lg font-semibold text-white">Summarize</h3>
                <p className="text-white/60 text-xs mt-1">
                  Generate quick insights
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ActionButtons
