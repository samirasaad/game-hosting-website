import { Genre } from "@/types/Genre";
import { CheckIcon } from "@heroicons/react/24/solid";

interface Props {
  selectedGenres: Genre[];
  handleSelectCategory: (id: string) => void;
  applyFilters: () => void;
  clearFilters: () => void;
}

function Aside(props: Props) {
  const { selectedGenres, handleSelectCategory, applyFilters, clearFilters } =
    props;

  return (
    <aside className=" border dark:bg-gray-900 shadow rounded-xl p-4 md:p-6 mb-6 lg:mb-0 h-fit">
      <h2 className="text-xl font-semibold mb-4">Filter by Category</h2>

      <ul className="space-y-3 dark:text-gray-300">
        {selectedGenres.map((genre) => (
          <li key={genre.id} className="hover:text-blue-500">
            <input
              className="cursor-pointer"
              id={genre.name}
              name={genre.name}
              type="checkbox"
              checked={genre.isChecked}
              value={genre.id}
              onChange={() => handleSelectCategory(genre.id)}
            />
            <label htmlFor={genre.name} className="mx-2 cursor-pointer">
              {genre.name}
            </label>
          </li>
        ))}
      </ul>
      <div className="flex flex-col sm:flex-row justify-between gap-2 mt-6">
        <button
          onClick={applyFilters}
          className="justify-center align-center flex items-center rounded-md bg-gray-400 px-3 py-2 cursor-pointer"
        >
          <CheckIcon className="w-5 h-5 text-green-400 mr-1" /> Apply
        </button>
        <button
          className="border rounded-md px-4 py-2 cursor-pointer"
          onClick={clearFilters}
        >
          Clear
        </button>
      </div>
    </aside>
  );
}

export default Aside;
