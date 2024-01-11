import Checkbox from "@/components/ui/Checkbox";
import Textinput from "@/components/ui/Textinput";
import { ApiContext } from "@/context/ApiContext";
import { CLIENT_API } from "@/util/constant";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { handleLogin } from "./store";
const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup.string().required("Password is Required"),
  })
  .required();
const UserLoginForm = () => {
  const dispatch = useDispatch();
  const { getApiData, postApiData } = useContext(ApiContext);
  const { users } = useSelector((state) => state.auth);
  const {
    register,
    formState: { errors, isLoading },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: "all",
  });
  const router = useRouter();
  const onSubmit = async (data) => {
    try {
      const response = await postApiData(CLIENT_API.login, data);
      const result = response.data;
      if (result.status === 200) {
        // dispatch(handleLogin(result.result));
        dispatch(handleLogin({ data: result.result, type: "user" }));
        setTimeout(() => {
          router.push("/service");
        }, 100);
      } else {
        toast.error("Account is Disabled,Please Contact Admin", {
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
    } catch (error) {
      toast.error("Invalid credentials", {
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
  };

  const [checked, setChecked] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <Textinput
        name="email"
        label="email"
        type="email"
        placeholder="Enter Email Address"
        register={register}
        error={errors?.email}
      />
      <Textinput
        name="password"
        label="passwrod"
        type="password"
        placeholder="Enter Password"
        register={register}
        error={errors.password}
      />
      <div className="flex justify-between">
        <Checkbox
          value={checked}
          onChange={() => setChecked(!checked)}
          label="Keep me signed in"
        />
        <Link
          href="/admin/forgot-password"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          Forgot Password?{" "}
        </Link>
      </div>

    

<button
      className={`btn btn-dark flex items-center justify-center w-full text-center ${
        isLoading ? 'bg-gray-500' : 'bg-[#ff6600]'
      }`}
      type="submit"
      disabled={isLoading}
      >
        {isLoading ? (
          
          <svg
          className={`animate-spin  h-7 w-7 `}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        ):

        'Sign in'

      }
      </button>
    </form>
  );
};

export default UserLoginForm;
