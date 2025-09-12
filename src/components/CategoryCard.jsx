import React from 'react'
import WidgetCard from './WidgetCard'

export default function CategoryCard({ category, onAdd, onRemoveWidget }){
  return (
    <div className="bg-white rounded-xl shadow-md p-6 min-h-[250px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{category.name}</h3>
        <div className="flex items-center gap-2">
          <button className="text-sm px-2 py-1 border rounded" onClick={onAdd}>+ Add Widget</button>
        </div>
      </div>

      {category.widgets.length === 0 ? (
        <div className="text-sm text-gray-500">No widgets. Click + Add Widget to create one.</div>
      ) : (
        <div className="grid gap-3">
          {category.widgets.map(w => (
            <WidgetCard key={w.id} widget={w} onRemove={() => onRemoveWidget(w.id)} />
          ))}
        </div>
      )}
    </div>
  )
};