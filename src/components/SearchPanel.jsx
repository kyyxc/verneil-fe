import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ax } from "../api/authentication";
import debounce from "lodash.debounce";

const SearchPanel = ({ isSearching }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = debounce(async (search) => {
    try {
      const res = await ax.get(`api/v1/users?search=${search}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(res.data.users);
    } catch (err) {
      console.log(err);
    }
  }, 500);

  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setSearch(searchValue);
    handleSearch(searchValue);
  };

  return (
    <div
      className={`bg-black fixed hidden sm:block top-0 w-96 h-screen p-6 ${
        isSearching ? "left-[76px]" : "left-[-500px]"
      } transition-all  duration-500 z-50`}
    >
      <div className="text-2xl font-semibold">Search</div>
      <form className="mt-12">
        <input
          type="text"
          className="w-full rounded-md py-2 px-2.5 outline-none bg-btn"
          placeholder="Search"
          name="search"
          value={search}
          onChange={handleSearchChange}
        />
        <hr className="border-t border-t-btn mt-10" />
      </form>
      <div className="mt-10">
        {users &&
          users.map((user) => (
            <div className="flex items-center my-3" key={user.id}>
              <img
                src="images/iambluedee7.jpg"
                className="w-[50px] h-[50px] rounded-full"
              />
              <div>
                <div className="ml-3 flex">
                  <h3 className="text-1 text-sm font-semibold">
                    <Link to={`/${user.username}`}>{user.username}</Link>
                  </h3>
                </div>
                <h5 className="ml-3 text-xs text-1">{user.full_name}</h5>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchPanel;
