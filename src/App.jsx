import React, { useState, useMemo } from 'react'
import './App.css'
import AddWidgetPanel from './components/AddWidgetPanel'
import WidgetCard from './components/WidgetCard'

const initialData = {
  categories: [
    {
      id: 'cspm',
      name: 'CSPM Executive Dashboard',
      widgets: [
        { id: 'w-1', title: 'Cloud Accounts', text: 'Connected: 2\nNot Connected: 0' },
        { id: 'w-2', title: 'Cloud Account Risk Assessment', text: 'Random risk summary' }
      ]
    },
    {
      id: 'registry',
      name: 'Registry Scan',
      widgets: [
        { id: 'w-3', title: 'Image Risk Assessment', text: '1470 vulnerabilities' }
      ]
    },
    {
      id: 'vuln',
      name: 'Vulnerability Dashboard',
      widgets: [
        { id: 'w-4', title: 'Critical Vulnerabilities', text: '5 critical issues' },
        { id: 'w-5', title: 'Medium Vulnerabilities', text: '12 medium issues' }
      ]
    }
  ],
  library: [
    { id: 'w-1', title: 'Cloud Accounts', text: 'Connected: 2' },
    { id: 'w-2', title: 'Cloud Account Risk Assessment', text: 'Random risk summary' },
    { id: 'w-3', title: 'Image Risk Assessment', text: '1470 vulnerabilities' },
    { id: 'w-4', title: 'Critical Vulnerabilities', text: '5 critical issues' },
    { id: 'w-5', title: 'Medium Vulnerabilities', text: '12 medium issues' }
  ]
}

const sectionColors = ['#E3F6F5', '#FCEFEF', '#FFF5E5']


const cardColors = ['#B2E0DD', '#F6C6C6', '#FFD9B3']

function App() {
  const [data, setData] = useState(initialData)
  const [panelOpen, setPanelOpen] = useState(false)
  const [search, setSearch] = useState('')

  function generateId() {
    return 'w-' + Math.random().toString(36).slice(2, 9) + '-' + Date.now()
  }

  function addWidgetToCategories(widget, categoryIds = []) {
    setData(prev => {
      const libHas = prev.library.some(l => l.id === widget.id)
      const newLib = libHas ? prev.library : [...prev.library, widget]

      const newCats = prev.categories.map(cat => {
        if (!categoryIds.includes(cat.id)) return cat
        const already = cat.widgets.some(w => w.id === widget.id)
        if (already) return cat
        return { ...cat, widgets: [...cat.widgets, widget] }
      })

      return { ...prev, library: newLib, categories: newCats }
    })
  }

  function removeWidgetFromCategory(categoryId, widgetId) {
    setData(prev => ({
      ...prev,
      categories: prev.categories.map(cat => {
        if (cat.id !== categoryId) return cat
        return { ...cat, widgets: cat.widgets.filter(w => w.id !== widgetId) }
      })
    }))
  }

  function handleAddFromPanel({ title, text, assignToCategoryIds = [] }) {
    const id = generateId()
    const widget = { id, title, text }
    addWidgetToCategories(widget, assignToCategoryIds)
    setPanelOpen(false)
  }

  return (
    <div className="min-h-screen p-6 bg-[#FAF9EE]">
      {}
      <header className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-[#333333]">CNAPP Dashboard</h1>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button
            onClick={() => setPanelOpen(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
          >
            + Add Widget
          </button>
          <input
            type="text"
            placeholder="Search widgets..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-[#EEEEEE] shadow-sm flex-1 focus:outline-none focus:ring-2 focus:ring-[#DCCFC0]"
          />
        </div>
      </header>

      {}
      <main className="space-y-10">
        {data.categories.map((cat, idx) => {
          const filteredWidgets = cat.widgets.filter(w =>
            w.title.toLowerCase().includes(search.toLowerCase())
          )

         
          const displayWidgets = filteredWidgets.slice(0, 2)
          return (
            <section
              key={cat.id}
              className="p-6 rounded-xl shadow-lg"
              style={{ background: sectionColors[idx % sectionColors.length] }}
            >
              {}
              <h2 className="text-2xl font-semibold mb-6 text-left text-[#222222]">{cat.name}</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {displayWidgets.map((w, i) => (
                  <WidgetCard
                    key={w.id}
                    widget={w}
                    onRemove={() => removeWidgetFromCategory(cat.id, w.id)}
                    style={{
                      minHeight: '200px',
                      maxHeight: '200px',
                      width: '100%',
                      minWidth: '0',
                      backgroundColor: cardColors[idx % cardColors.length],
                      color: '#222'
                    }}
                  />
                ))}

                {}
                <div
                  onClick={() => setPanelOpen(true)}
                  className="flex items-center justify-center cursor-pointer rounded-lg bg-[#A1C4FD] text-white font-medium hover:bg-[#6C8EDB] transition min-h-[200px]"
                >
                  + Add Widget
                </div>
              </div>

              {filteredWidgets.length === 0 && (
                <div className="mt-4 text-sm text-gray-700 italic">
                  No widgets found in this category.
                </div>
              )}
            </section>
          )
        })}
      </main>

      {}
      <AddWidgetPanel
        open={panelOpen}
        categories={data.categories}
        onClose={() => setPanelOpen(false)}
        onAdd={handleAddFromPanel}
      />
    </div>
  )
}

export default App
