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
    <aside className="lg:col-span-1 border dark:bg-gray-900 shadow rounded-xl p-4 h-fit ">
      <h2 className="text-xl font-semibold mb-4">Filter by Category</h2>

      <ul className="space-y-3  dark:text-gray-300">
        {selectedGenres.map((genre) => (
          <li key={genre.id} className="hover:text-blue-500 ">
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
      <div className="flex justify-between mt-6">
        <button
          onClick={applyFilters}
          className="flex rounded-md bg-gray-400 ps-2 pe-3 py-2 cursor-pointer align-baseline"
        >
          <CheckIcon className="w-5 h-5 text-green-400 cursor-pointer" /> Apply
        </button>

        <button className="border rounded-md px-4 py-2 cursor-pointer" onClick={clearFilters}>
          Clear
        </button>
      </div>
    </aside>
  );
}

export default Aside;
