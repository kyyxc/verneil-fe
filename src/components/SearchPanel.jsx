import React from 'react'

const SearchPanel = ({isSearching}) => {
  return (
    <div
    className={`bg-black fixed hidden sm:block top-0 w-96 h-screen p-6 ${
      isSearching ? "left-[76px]" : "left-[-500px]"
    } transition-all  duration-500`}
  >
    <div className="text-2xl font-semibold">Search</div>
    <form className="mt-12">
      <input
        type="text"
        className="w-full rounded-md py-2 px-2.5 outline-none bg-btn"
        placeholder="Search"
      />
      <hr className="border-t border-t-btn mt-10" />
    </form>
  </div>
  )
}

export default SearchPanel