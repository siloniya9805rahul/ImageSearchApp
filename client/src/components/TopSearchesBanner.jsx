
export default function TopSearchesBanner({ items = [] }) {
  if (!items.length) return null;

  return (
    <div className="flex gap-3 p-3 mb-4 overflow-x-auto bg-gray-100 rounded-xl scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      {items.map((i) => (
        <div
          key={i.term}
          className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-full shadow-sm hover:bg-gray-50 transition"
        >
          <span>{i.term}</span>
          <span className="text-xs text-gray-500">({i.count})</span>
        </div>
      ))}
    </div>
  );
}
