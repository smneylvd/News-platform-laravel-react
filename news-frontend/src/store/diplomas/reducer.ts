import {
    FETCH_CANCEL_FILTER_SAGA,
    FETCH_NEWS_SAGA,
    FETCH_NEWS_SUCCESS,
    FETCH_SEARCH_SAGA,
    FETCH_SEARCH_SUCCESS
} from "./types/types";

interface NewsInterface {
    news_list: Array<any>,
    isFetching: boolean,
    q: string,
    categories: string,
    sources: string,
    date_from: string,
    date_to: string,
    category_list: Array<any>,
    sources_list: Array<any>,
}

const initialState: NewsInterface = {
    news_list: Array(),
    isFetching: false,
    q: "",
    categories: "",
    sources: "",
    date_from: "",
    date_to: "",
    category_list: [],
    sources_list: [],
};

const newsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case FETCH_NEWS_SAGA:
            return {
                ...state,
                isFetching: true,
                iinValidated: false
            };
        case FETCH_NEWS_SUCCESS:
            return {
                ...state,
                news_list: action.data,
                isFetching: false,
            };
        case FETCH_CANCEL_FILTER_SAGA:
            return {
                ...state,
                filtered_names: []
            };
        case FETCH_SEARCH_SAGA:
            return {
                ...state,
                q: action.payload.q,
                categories: action.payload.categories,
                sources: action.payload.sources,
                date_from: action.payload.date_from,
                date_to: action.payload.date_to,
            };
        case FETCH_SEARCH_SUCCESS:
            console.log(action.data);
            return {
                ...state,
                news_list: action.data,
            };
        default:
            return state; // Add this line to return the current state for unhandled actions
    }
};

export default newsReducer;
