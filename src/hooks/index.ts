import { useDispatch } from "react-redux";
import { AppDispatch } from "../components/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();