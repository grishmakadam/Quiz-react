import { createContext, useReducer } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const userReducer = (state, action) => {
    if (action.type == "login") {
      return {
        user: { ...action.payload },
      };
    } else {
      return {
        user: null,
      };
    }
  };

  const [state, dispatch] = useReducer(userReducer, {
    user: null,
  });

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
