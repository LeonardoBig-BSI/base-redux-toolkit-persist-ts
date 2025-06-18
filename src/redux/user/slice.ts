import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../interfaces/User";
import { toast } from "react-toastify";
import type { UserApi } from "../../interfaces/UserApi";

interface UserState {
    user: User | null;
    users: UserApi[];
    userById: UserApi | null;
    loading: boolean;
}

const initialState: UserState = {
    user: null,
    users: [],
    userById: null,
    loading: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        createUser: (state, action: PayloadAction<{ name: string, email: string }>) => {
            return {
                ...state,
                user: {
                    name: action.payload.name,
                    email: action.payload.email,
                    address: null,
                }
            };
        },
        logoutUser: (state) => {
            return {
                ...state,
                user: null,
            };
        },
        addAddress: (state, action: PayloadAction<{ location: string, number: string }>) => {
            if(action.payload.location === "" || action.payload.number === "") {
                toast.error("Bloqueado: Preencha todos os campos.");
                return { ...state }
            }

            if(state.user === null) {
                toast.error("Bloqueado: realize o login e, posteriormente, cadastre um novo endereço.");
                return { ...state }
            }

            toast.success("Endereço cadastrado com sucesso!");

            return {
                ...state,
                user: {
                    ...state.user,
                    address: {
                        location: action.payload.location,
                        number: action.payload.number,
                    },
                },
            }
        },
        deleteAddress: (state) => {
            if(state.user) {
                state.user.address = null;
            }
        },
        fetchUsersFromApi: (state) => {
            console.log("Chamou fetchUsersFromApi");
            state.loading = true;
        },
        fetchUsersFromApiSuccess: (state, action: PayloadAction<UserApi[]>) => {
            console.log(action.payload);
            state.users = action.payload;
            state.loading = false;
        },
        fetchUsersFromApiFailure: (state) => {
            console.log("FAILURE.");
            state.loading = false;
        },
        fetchUserById: (state, action: PayloadAction<number>) => {
            console.log("Chamou fetchUsersById com ID", action.payload);
            state.loading = true;
        },
        fetchUserByIdSuccess: (state, action: PayloadAction<UserApi>) => {
            console.log(`Usuário com ID ${action.payload.id} ---> ${action.payload.name}`);

            state.userById = action.payload;
            state.loading = false;
        },
        fetchUserByIdFailure: (state) => {
            console.log("FAILURE -> fetchUsersByIdFailure.");
            state.loading = false;
        },
    }
});

export const { createUser, logoutUser, addAddress, deleteAddress,
    fetchUsersFromApi, fetchUsersFromApiSuccess, fetchUsersFromApiFailure,
    fetchUserById, fetchUserByIdSuccess, fetchUserByIdFailure
 } = userSlice.actions;
export default userSlice.reducer;