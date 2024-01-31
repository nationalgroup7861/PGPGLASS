import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { setSession } from "@/util/utils";

const initialUsers = () => {
  if (typeof window !== "undefined") {
    const item = window?.localStorage.getItem("users");
    return item
      ? JSON.parse(item)
      : [
          {
            id: uuidv4(),
            name: "dashcode",
            email: "dashcode@gmail.com",
            password: "dashcode",
          },
        ];
  }
  return [
    {
      id: uuidv4(),
      name: "dashcode",
      email: "dashcode@gmail.com",
      password: "dashcode",
    },
  ];
};
// save users in local storage

const initialIsAuth = () => {
  if (typeof window !== "undefined") {
    const item = window?.localStorage.getItem("isAuth");
    return item ? JSON.parse(item) : false;
  }
  return false;
};


export const authSlice = createSlice({
  name: "auth",
  initialState: {
    users: initialUsers(),
    isAuth: initialIsAuth(),
  },
  reducers: {
    handleRegister: (state, action) => {
      const { name, email, password } = action.payload;
      const user = state.users.find((user) => user.email === email);
      if (user) {
        toast.error("User already exists", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        state.users.push({
          id: uuidv4(),
          name,
          email,
          password,
        });
        if (typeof window !== "undefined") {
          window?.localStorage.setItem("users", JSON.stringify(state.users));
        }
        toast.success("User registered successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    },

    handleLogin: (state, action) => {
      state.isAuth = true;
      state.users = action.payload.data;
      const user_type=action.payload.type;
      if (typeof window !== "undefined") {
        window?.localStorage.setItem("isAuth", JSON.stringify(state.isAuth));
        if(user_type=="user")
        {

          // window?.localStorage.setItem("pgp_user", JSON.stringify(state.users));
          window?.localStorage.setItem("user_type",true);
        }
        if(user_type=="admin")
        {
          // window?.localStorage.setItem("pgp_admin", JSON.stringify(state.users));
          window?.localStorage.setItem("admin_type",true);
        }
      }
      toast.success("User logged in successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    handleLogout: (state, action) => {
      state.isAuth = false;
      if (typeof window !== "undefined") {
        setSession();
        window?.localStorage.removeItem("isAuth");
        const user_type=action.payload.type;
        console.log(user_type)

        if(user_type=="user")
        {
          window?.localStorage.removeItem("pgp_user");
          window?.localStorage.removeItem("user_type");
        }
        if(user_type=="admin")
        {
          window?.localStorage.removeItem("pgp_admin");
          window?.localStorage.removeItem("admin_type");
        }
      }
      window?.localStorage.removeItem("pgp_admin");
      window?.localStorage.removeItem("admin_type");
      toast.success("Log out successfully", {
        position: "top-right",
      });
    },
  },
});

export const { handleRegister, handleLogin, handleLogout } = authSlice.actions;
export default authSlice.reducer;
