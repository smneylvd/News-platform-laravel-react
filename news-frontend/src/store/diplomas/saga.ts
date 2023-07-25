import {newsApi} from "@src/service/api";
import {getRequestError} from "@src/utils/getRequestError";
import {all, call, put, takeLatest} from "redux-saga/effects";
import {setSnackbar} from "../generals/actionCreators";
import {
    FETCH_NEWS_ERROR,
    FETCH_NEWS_SAGA,
    FETCH_NEWS_SUCCESS,
    FETCH_SEARCH_ERROR,
    FETCH_SEARCH_SAGA,
    FETCH_SEARCH_SUCCESS,
} from "./types/types";


export function* fetchSearchRequest(action: any) {
    try {
        if (!action.payload
            && !action.payload.q
            && !action.payload.category
            && !action.payload.source
            && !action.payload.date_from
            && !action.payload.date_to) {
            return;
        }
        console.log("SAGA", action.payload)
        const {data} = yield call(newsApi.search, action.payload);

        yield put({type: FETCH_SEARCH_SUCCESS, data});
        if (data.length === 0) {
            yield put(setSnackbar({visible: true, message: "No results", status: "info"}));
            yield put({type: FETCH_NEWS_SAGA});
        } else {
            yield put(setSnackbar({visible: true, message: "Success!", status: "success"}));
        }


    } catch (e) {
        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
        yield put({type: FETCH_SEARCH_ERROR});
    }
}

export function* fetchNewsRequest(action: any) {
    try {
        const {data} = yield call(newsApi.getNews);
        yield put({type: FETCH_NEWS_SUCCESS, data});

    } catch (e) {
        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
        yield put({type: FETCH_NEWS_ERROR});
    }
}


export function* diplomaSaga() {
    yield all([
        takeLatest(FETCH_NEWS_SAGA, fetchNewsRequest),
        takeLatest(FETCH_SEARCH_SAGA, fetchSearchRequest),
    ]);
}
