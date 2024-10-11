import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryValue, setSearchValue, Clear } from "../../Actions/filter.actions";
import { FaFilter } from "react-icons/fa";

export default (props) => {
  const dispatch = useDispatch();

  const Categories = ["All Products", "Tablet","Laptop","PC","Headban","Earbud"];
  const Search = useSelector((state) => state?.filterReducer?.Search ?? null);
  const Category = useSelector((state) => state?.filterReducer?.Category ?? null);
  
  // State to manage filter visibility on small screens
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(Clear());
      
    };
  }, []);

  return (
    <div className="relative">
    
      <div className="md:hidden flex justify-end mt-4 absolute rigth-1 -top-10 ">
        <FaFilter 
          className="text-2xl cursor-pointer" 
          onClick={() => setShowFilter(!showFilter)} 
        />
      </div>

     
      <form
        onSubmit={(e) => e.preventDefault()}
        className={`max-w-md px-4 mx-auto flex flex-col md:flex-row justify-between items-center gap-6 mt-7 md:mt-0 
        ${showFilter ? 'block' : 'hidden'} md:flex`}
      >
        <div className="relative w-full md:w-[350px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search by name"
            value={Search}
            name="Search"
            onChange={(e) => dispatch(setSearchValue(e.target.value))}
            className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-white focus:bg-white focus:border-indigo-600"
          />
        </div>

        <div className="relative w-full md:w-72 max-w-full mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 bottom-0 w-5 h-5 my-auto text-gray-400 right-1 md:rigth-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          <select
            className="w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"
            value={Category}
            name="Category"
            onChange={(e) => dispatch(setCategoryValue(e.target.value))}
          >
            {Categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};
