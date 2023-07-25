import {call, put, takeLatest} from "redux-saga/effects";
import {
    FETCH_AUTH_LOGIN_ERROR,
    FETCH_AUTH_LOGIN_SAGA,
    FETCH_AUTH_LOGIN_SUCCESS,
    FETCH_AUTH_LOGOUT,
    FETCH_AUTH_LOGOUT_SAGA,
    FETCH_AUTH_REGISTER_ERROR,
    FETCH_AUTH_REGISTER_SAGA,
    FETCH_AUTH_REGISTER_SUCCESS,
    FETCH_AUTH_VALIDATE_EMAIL_ERROR,
    FETCH_AUTH_VALIDATE_EMAIL_SAGA,
    FETCH_AUTH_VALIDATE_EMAIL_SUCCESS, FETCH_GET_OTP_ERROR, FETCH_GET_OTP_SAGA, FETCH_GET_OTP_SUCCESS,
    FETCH_RESET_PASSWORD_ERROR,
    FETCH_RESET_PASSWORD_SAGA,
    FETCH_RESET_PASSWORD_SUCCESS, FETCH_VALIDATE_EMAIL_ERROR, FETCH_VALIDATE_EMAIL_SAGA, FETCH_VALIDATE_EMAIL_SUCCESS
} from "./types/actionTypes";
import {setSnackbar} from "@src/store/generals/actionCreators";
import {authApi} from "@src/service/api";
import {getRequestError} from "@src/utils/getRequestError";

export function* fetchAuthLogout() {
    yield put({type: FETCH_AUTH_LOGOUT});
}

export function* fetchAuthLogin(action: any) {
    try {
        const {data} = yield call(authApi.login, action.payload);

        yield put({type: FETCH_AUTH_LOGIN_SUCCESS, payload: data});
        yield put(setSnackbar({visible: true, message: "Welcome!", status: "success"}));

    } catch (e) {
        yield put({type: FETCH_AUTH_LOGIN_ERROR});
        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
    }
}

export function* fetchAuthRegister(action: any) {
    try {
        const {data} = yield call(authApi.register, action.payload);
        if (data.message && data.message.includes("success")) {
            yield put({type: FETCH_AUTH_REGISTER_SUCCESS});
        }
        // yield put(setSnackbar({visible: true, message: "Успешно зарегистрирован!", status: "success"}));
    } catch (e: any) {
        yield put({type: FETCH_AUTH_REGISTER_ERROR});
        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
    }
}

export function* fetchAuthValidateEmail(action: any) {
    try {
        const {data} = yield call(authApi.validateEmail, action.payload);
        yield put({type: FETCH_AUTH_VALIDATE_EMAIL_SUCCESS});
        fetchAuthLogin(action.payload);
        yield put(setSnackbar({visible: true, message: "Валидация пройдена!", status: "success"}));
    } catch (e) {
        yield put({type: FETCH_AUTH_VALIDATE_EMAIL_ERROR});

        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
    }
}

export function* fetchValidateEmail(action: any) {
    try {
        const {data} = yield call(authApi.validateEmail, action.payload);
        yield put({type: FETCH_VALIDATE_EMAIL_SUCCESS});
        yield put(setSnackbar({visible: true, message: "Валидация пройдена!", status: "success"}));
    } catch (e) {
        yield put({type: FETCH_VALIDATE_EMAIL_ERROR});

        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
    }
}

export function* fetchResetPassword(action: any) {
    try {
        const {data} = yield call(authApi.resetPassword, action.payload);
        if (data && data.includes("success")) {
            yield put({type: FETCH_RESET_PASSWORD_SUCCESS});
            yield put(setSnackbar({visible: true, message: "Пароль обновлен!", status: "success"}));
        }
    } catch (e) {
        yield put({type: FETCH_RESET_PASSWORD_ERROR});
        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
    }
}

export function* fetchGetOtp(action: any) {
    try {
        const {data} = yield call(authApi.getOtp, action.payload);
        yield put({type: FETCH_GET_OTP_SUCCESS});
        yield put(setSnackbar({visible: true, message: "Код отправлен!", status: "success"}));
    } catch (e) {
        yield put({type: FETCH_GET_OTP_ERROR});
        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
    }
}

export function* authSagas() {
    yield takeLatest(FETCH_AUTH_LOGIN_SAGA, fetchAuthLogin);
    yield takeLatest(FETCH_AUTH_REGISTER_SAGA, fetchAuthRegister);
    yield takeLatest(FETCH_AUTH_LOGOUT_SAGA, fetchAuthLogout);
    yield takeLatest(FETCH_AUTH_VALIDATE_EMAIL_SAGA, fetchAuthValidateEmail);
    yield takeLatest(FETCH_VALIDATE_EMAIL_SAGA, fetchValidateEmail);
    yield takeLatest(FETCH_RESET_PASSWORD_SAGA, fetchResetPassword);
    yield takeLatest(FETCH_GET_OTP_SAGA, fetchGetOtp);
}