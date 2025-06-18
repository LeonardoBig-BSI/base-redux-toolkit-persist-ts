import { all, call, delay, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { fetchUsersFromApiSuccess, fetchUsersFromApiFailure,
         fetchUserByIdSuccess, fetchUserByIdFailure,
 } from './slice';
import type { UserApi } from '../../interfaces/UserApi';
import type { PayloadAction } from '@reduxjs/toolkit';

//API USERS: https://jsonplaceholder.typicode.com/users

function* handleFetchUsersFromApi() {
    try {
        yield delay(1500);

        const response: { data: UserApi[] } = yield call(
            axios.get, 
            "https://jsonplaceholder.typicode.com/users"
        );

        yield put(fetchUsersFromApiSuccess(response.data));
    }
    catch (error: unknown) {
        yield put(fetchUsersFromApiFailure());
        if (error instanceof Error) {
            console.error("Erro na API:", error.message);
        } else {
            console.error("Erro desconhecido na API:", error);
        }
    }
}

function* handleFetchUserById(action: PayloadAction<number>) {
    try {
        yield delay(1500);

        const userId = action.payload;
        const response: { data: UserApi } = yield call(
            axios.get, 
            `https://jsonplaceholder.typicode.com/users/${userId}`
        );

        yield put(fetchUserByIdSuccess(response.data));
    }
    catch (error: unknown) {
        yield put(fetchUserByIdFailure());
        if (error instanceof Error) {
            console.error("Erro na API:", error.message);
        } else {
            console.error("Erro desconhecido na API:", error);
        }
    }
}

export default function* userSaga() {
    yield all([
        takeLatest("user/fetchUsersFromApi", handleFetchUsersFromApi),
        takeLatest("user/fetchUserById", handleFetchUserById),
    ]);
}