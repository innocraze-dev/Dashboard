import React from 'react'

export default function WidgetCard({ widget, onRemove }){
  return (
    <div className="border rounded p-3 bg-gray-50 relative">
      <button onClick={onRemove} title="Remove widget" className="absolute -top-2 -right-2 bg-white border rounded-full w-6 h-6 flex items-center justify-center text-xs">✕</button>
      <div className="font-medium">{widget.title}</div>
      <div className="text-sm mt-1 whitespace-pre-line text-gray-600">{widget.text}</div>
    </div>
  )
}