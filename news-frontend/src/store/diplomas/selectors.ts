import {RootState} from "../store";

export const selectNewsList = (state: RootState) => state.diploma.news_list;
export const selectSearchText = (state: RootState) => state.diploma.q;

