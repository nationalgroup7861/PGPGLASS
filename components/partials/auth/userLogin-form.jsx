import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Textinput from "@/components/ui/Textinput";
import { ApiContext } from "@/context/ApiContext";
import { CLIENT_API } from "@/util/constant";
import { yupResolver } from "@hookform/resolvers/yup";
import ls from 'localstorage-slim';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { handleLogin } from "./store";
import { setSession } from "@/util/utils";


const UserLoginForm = () => {
  const dispatch = useDispatch();
  const { getApiData, postApiData } = useContext(ApiContext);
  const { users } = useSelector((state) => state.auth);
  const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup.string().required("Password is Required"),
  })
  .required();

  const {
    register,
    formState: { errors, isLoading, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: "all",
  });

  const router = useRouter();
  const onSubmit = async (data) => {
    try {
      const response = await postApiData(CLIENT_API.login, data,false);
      const result = response.data;
      if (result.status === 200) {
        setSession(result.result);
        ls.set('pgp_user', result.result, { encrypt: true }); 
        dispatch(handleLogin({ data: result.result, type: "user" }));
        setTimeout(() => {
          router.push("/service");
        }, 2);
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
      console.log(error);
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
          href="/"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          Forgot Password?{" "}
        </Link>
      </div>

      <Button
        text="Sign in"
        type="submit"
        disabled={isSubmitting}
        className={`btn btn-dark flex items-center justify-center w-full text-center ${
          isSubmitting ? "bg-gray-500" : "bg-[#ff6600]"
        }`}
        isLoading={isSubmitting}
      />
     
    </form>
  );
};

export default UserLoginForm;
