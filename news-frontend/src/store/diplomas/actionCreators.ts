import {
    FETCH_CANCEL_FILTER_SAGA,
    FETCH_NEWS_SAGA,
    FETCH_SEARCH_SAGA
} from "./types/types";

export const fetchNews = () => ({type: FETCH_NEWS_SAGA});
export const cancelFilters = () => ({type: FETCH_CANCEL_FILTER_SAGA});
export const fetchSearch = (payload: any) => ({type: FETCH_SEARCH_SAGA, payload});
