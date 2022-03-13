import { useState } from 'react'

export default function Example() {
  const [selectedMeasurement, setSelectedMeasurement] = useState()

  return (
    <div>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        </div>
        <div className="flex justify-between">
          <div className="flex">
            <input
              type="number"
              name="measurement"
              id="measurement"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-2/5 mr-1 sm:text-sm border-gray-300 rounded-md"
              placeholder="1.25"
            />

            <div className="block inset-y-0 right-0 flex items-center">
              <label htmlFor="measurementType" className="sr-only">
                type
              </label>
              <select
                id="measurementType"
                name="measurementType"
                className="focus:ring-indigo-500 focus:border-indigo-500 w-30 h-full py-0 border-gray-300 bg-transparent text-gray-500 sm:text-sm rounded-md"
              >
                <option>tbsp</option>
                <option>cup</option>
                <option>tspn</option>
                <option>pinch</option>
                <option>ml</option>
                <option>g</option>
                <option>whole</option>
              </select>
            </div>
          </div>
          <input
            type="text"
            name="ingredientName"
            id="ingredientName"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-4/5 pl-7 pr-1 sm:text-sm border-gray-300 rounded-md"
            placeholder="ingredient name"
          />
        </div>
      </div>
    </div>
  )
}