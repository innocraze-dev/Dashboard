import React, { useState, useEffect } from 'react'

export default function AddWidgetPanel({ open, onClose, onAdd, categories = [] }){
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [assign, setAssign] = useState([])

  useEffect(()=>{
    if(!open){ setTitle(''); setText(''); setAssign([]) }
  },[open])

  function toggleCat(id){
    setAssign(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  function handleSubmit(e){
    e.preventDefault()
    if(!title.trim()) return alert('Title required')
    onAdd({ title: title.trim(), text: text.trim(), assignToCategoryIds: assign })
  }

  return (
    <div className={`fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform transition-transform z-50 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-4 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Add Widget</h3>
          <button className="px-2 py-1 rounded border" onClick={onClose}>Close</button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-auto">
          <label className="block text-sm font-medium">Title</label>
          <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full px-3 py-2 border rounded mb-3" />

          <label className="block text-sm font-medium">Description</label>
          <textarea value={text} onChange={e=>setText(e.target.value)} rows={5} className="w-full px-3 py-2 border rounded mb-3" />

          <div className="mb-3">
            <div className="text-sm font-medium mb-2">Assign to categories</div>
            <div className="flex flex-col gap-2">
              {categories.length === 0 && <div className="text-sm text-gray-500">Create a category first</div>}
              {categories.map(cat => (
                <label key={cat.id} className="inline-flex items-center gap-2">
                  <input type="checkbox" checked={assign.includes(cat.id)} onChange={()=>toggleCat(cat.id)} />
                  <span>{cat.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button type="submit" className="px-3 py-2 bg-indigo-600 text-white rounded">Add Widget</button>
            <button type="button" onClick={onClose} className="px-3 py-2 border rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
};