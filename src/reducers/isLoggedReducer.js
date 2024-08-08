import { isAuthBoolean } from "../helpers/auth";

const isLoggedReducer = (state = isAuthBoolean(), action) => {
    switch (action.type) {
        case "LOGIN":
            return true;
        case "LOGOUT":
            return false;
        default:
            return state;
    }
};

export default isLoggedReducer;