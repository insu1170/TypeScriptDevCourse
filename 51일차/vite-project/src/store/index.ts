import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer/reducer";
// import { useSelector } from "react-redux";

const store = configureStore({ reducer })



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// const logger = useSelector((state: RootState) => state.logger);

store.getState();

export default store;




