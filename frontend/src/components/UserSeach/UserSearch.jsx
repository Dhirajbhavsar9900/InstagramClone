import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LeftSidebar from "../HomePage/LeftSidebar";
import BottomNav from "../HomePage/BottomNav";
import SearchIcon from "@mui/icons-material/Search";
import ProfilePostLoader from "../Loaders/ProfilePostLoader";
import { BASE_URL } from "../../utils/config";

function UserSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearchInputChange = (event) => {
    setQuery(event.target.value);
  };

  const fetchSearchResults = async () => {
    if (query.trim() === "") {
      setResults([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${BASE_URL}/searchuser?query=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data = await response.json();
      console.log("Search results:", data.users);
      setResults(data.users || []);
    } catch (err) {
      setError("Unable to fetch search results. Please try again.");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchSearchResults();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="flex h-screen flex-row">
      <LeftSidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="w-full max-w-5xl mx-auto px-1 py-2 sticky top-0 border-b border-gray-500 bg-black z-10 sm:border-b-0">
          <div className="flex items-center rounded-lg px-4 py-2">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-black text-sm ml-2 focus:outline-none outline-0"
              value={query}
              onChange={handleSearchInputChange}
            />
            <SearchIcon className="text-gray-200 p-1" />
          </div>
        </div>
        <div className="relative w-full max-w-5xl mx-auto px-6 pt-1 pb-16">
          {isLoading && (
            <div className="absolute inset-0 flex justify-center items-center">
              <ProfilePostLoader />
            </div>
          )}
          {!isLoading && error && (
            <p className="text-center text-red-500">{error}</p>
          )}
          {!isLoading && !error && query.trim() && results.length === 0 && (
            <p className="text-center text-gray-500">No users found</p>
          )}
          {!isLoading &&
            results.map((user) => {
              return (
                <Link
                  to={`/user/${user.userName}`} // 👈 LINK BY userName
                  key={user._id}
                  className="flex items-center space-x-4 py-3 hover:bg-gray-100 rounded cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                    <img
                      src={`https://via.placeholder.com/150?text=${encodeURIComponent(
                        user.name || user.userName
                      )}`}
                      alt={user.name || user.userName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                      {user.userName}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {user.name}
                    </p>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

export default UserSearch;
