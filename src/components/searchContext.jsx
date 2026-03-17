import { createContext, useState } from "react";

export const SearchContext = createContext();

// SearchContext.js
export function SearchProvider({ children }) {
  const [query, setQuery] = useState("Search by Creator Name Only");
  const [submittedQuery, setSubmittedQuery] = useState(""); // Only updates on Enter

  return (
    <SearchContext.Provider value={{ query, setQuery, submittedQuery, setSubmittedQuery }}>
      {children}
    </SearchContext.Provider>
  );
}
