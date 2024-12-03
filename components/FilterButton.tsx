import { useState } from 'react'

interface FilterButtonProps {
  setFilter: (filter: string) => void
  currentFilter: string
}

export default function FilterButton({ setFilter, currentFilter }: FilterButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const categories = ['All', 'Electronics', 'Clothing', 'Home']

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
      >
        <span>Filter: {currentFilter || 'All'}</span>
        <svg className="fill-current h-4 w-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setFilter(category === 'All' ? '' : category)
                setIsOpen(false)
              }}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

