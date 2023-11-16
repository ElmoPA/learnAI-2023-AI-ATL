import { useReducer, createContext } from "react";
import { useEffect } from "react";
export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        token:
          action.payload /* information from backend including token and email */,
      };
    case "LOGOUT":
      return { token: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { token: null });
  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem("token"));
    if (token) {
      dispatch({ type: "LOGIN", payload: token });
    }
    console.log(token);
  }, []);
  console.log(state);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
