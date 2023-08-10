import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    email: "",
    name:""
}
const userSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {
        logIn: (state, action)=>{
            state.name = action.payload.name
            state.email=action.payload.email
        },
        logOut: (state) => {
            state.name = ""
            state.email=""
        }
    }
})


export  const userReducer = userSlice.reducer 
export const {logIn,logOut}=userSlice.actions
