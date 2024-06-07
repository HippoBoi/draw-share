interface changeSearch {
    type: "CHANGE";
    search: string;
}

interface removeSearch {
    type: "REMOVE";
}

export type searchAction = changeSearch | removeSearch;

const searchReducer = (state: string, action: searchAction) => {
    switch(action.type) {
        case "CHANGE":
            return action.search;
        case "REMOVE":
            return "";
    }
    return state;
}

export default searchReducer;