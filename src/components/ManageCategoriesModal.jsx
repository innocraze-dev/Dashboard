import React from 'react'

export default function ManageCategoriesModal({ open, onClose, categories = [], widgets = [], onToggle, onDeleteCategory }) {
  if(!open) return null

  return (
    <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center">
      <div className="bg-white w-11/12 md:w-3/4 lg:w-2/3 p-4 rounded shadow-lg max-h-[80vh] overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Manage Categories</h3>
          <button onClick={onClose} className="px-2 py-1 border rounded">Close</button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {categories.map(cat => (
            <div key={cat.id} className="p-3 border rounded bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium">{cat.name}</div>
                {}
                <button
                  onClick={() => {
                    if(window.confirm(`Delete category "${cat.name}"?`)) {
                      onDeleteCategory(cat.id)
                    }
                  }}
                  className="px-2 py-1 text-red-600 border border-red-600 rounded text-sm"
                >
                  Delete
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {widgets.map(w => {
                  const inCat = !!cat.widgets.find(x => x.id === w.id)
                  return (
                    <label key={w.id} className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={inCat}
                        onChange={(e)=> onToggle(cat.id, w.id, e.target.checked)}
                      />
                      <div className="text-sm">{w.title}</div>
                    </label>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};
