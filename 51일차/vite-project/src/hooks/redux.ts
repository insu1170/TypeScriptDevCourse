import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import { type AppDispatch, type RootState } from "../store";

// const dispatch = useDispatch();

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch = () => useDispatch<AppDispatch>();

// const logger = useTypedSelector((state) => state.logger);

