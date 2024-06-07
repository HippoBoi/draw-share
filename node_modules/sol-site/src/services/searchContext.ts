import React, { Dispatch } from "react";
import { searchAction } from "./searchReducer";

interface SearchContextType {
    search: string;
    dispatch: Dispatch<searchAction>;
}

const SearchContext = React.createContext<SearchContextType>({} as SearchContextType);

export default SearchContext;