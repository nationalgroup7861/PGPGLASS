import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import Textinput from "@/components/ui/Textinput";
import { ApiContext } from "@/context/ApiContext";
import { CLIENT_API } from "@/util/constant";
import { yupResolver } from "@hookform/resolvers/yup";
import ls from "localstorage-slim";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export default function ProfileForm({ userInfo }) {
  const { getApiData, postApiData } = useContext(ApiContext);

  const router = useRouter();

  const personalInfoSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.number().required("Mobile number is required"),
    address: yup.string().required("Address is required"),
  });

  const changePasswordSchema = yup.object({
    password: yup.string().required("Current Password is required"),
    new_password: yup.string().required("New Password is required"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("new_password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  // Personal Information form
  const {
    register: personalInfoRegister,
    handleSubmit: personalInfoHandleSubmit,
    setValue: personalInfoSetValue,
    formState: {
      errors: personalInfoErrors,
      isSubmitting: personalInfoIsSubmitting,
    },
  } = useForm({
    resolver: yupResolver(personalInfoSchema),
    mode: "all",
  });

  // Change Password form
  const {
    register: changePasswordRegister,
    handleSubmit: changePasswordHandleSubmit,
    setValue: changePasswordSetValue,
    reset:changePasswordReset,
    formState: {
      errors: changePasswordErrors,
      isSubmitting: changePasswordIsSubmitting,
    },
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
    mode: "all",
  });

  useEffect(() => {
    personalInfoSetValue("name", userInfo?.name);
    personalInfoSetValue("email", userInfo?.email);
    personalInfoSetValue("phone", userInfo?.phone);
    personalInfoSetValue("address", userInfo?.address);
  }, [userInfo]);

  // Personal Information form submission function
  const handlePersonalInfoSubmit = async (value) => {
    const data = {
      name: value?.name,
      email: value?.email,
      phone: value?.phone,
      address: value?.address,
      id: userInfo?.id,
    };
    await Updateprofile(data);
    changePasswordReset();
  };

  async function Updateprofile(data) {
    try {
      const response = await postApiData(CLIENT_API.updateprofile, data);
      if (response) {
        const data = response.data.result;
        ls.set("pgp_user", data, { encrypt: true });
        changePasswordReset();
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Change Password form submission function
  const handleChangePasswordSubmit = async (value) => {
    console.log("Change Password:", value);
    const data={
      password:value?.password,
      new_password:value?.new_password,
      confirm_password:value?.confirm_password,
      id: userInfo?.id,
    }
    await Updatepassword(data);
  };


  async function Updatepassword(data) {
    try {
      const response = await postApiData(CLIENT_API.updatepassword, data);
      if (response) {
        const data = response.data.result;
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <div className="mt-6 px-4 sm:px-6 lg:px-8">
        <div className="divide-y divide-red-500">
          <div className="grid  grid-cols-1  gap-y-1 px-1 py-2 sm:px-6 md:grid-cols-3 ">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-500">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-700">
                Use a permanent address where you can receive mail.
              </p>
            </div>

            <form
              onSubmit={personalInfoHandleSubmit(handlePersonalInfoSubmit)}
              className="md:col-span-2"
            >
              <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:max-w-xl sm:grid-cols-6">
                <div className="col-span-full flex items-center gap-x-8">
                  <img
                    src="/nlogo.png"
                    alt=""
                    className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                  />
                  {/* <div>
                    <Button
                      type="button"
                      text="Change avatar"
                      className="rounded-md  bg-[#ff6600]  hover:bg-[#ff66002d] px-3 py-2 text-sm font-semibold text-white shadow-sm "
                    />
                    <p className="mt-2 text-xs leading-5 text-gray-500">
                      JPG, GIF or PNG. 1MB max.
                    </p>
                  </div> */}
                </div>

                <div className="sm:col-span-3">
                  <Textinput
                    name="name"
                    label="name"
                    type="text"
                    placeholder="Enter Your Full Name"
                    className="rounded-md shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-50"
                    register={personalInfoRegister}
                    error={personalInfoErrors?.name}
                  />
                </div>

                <div className="sm:col-span-3">
                  <Textinput
                    name="phone"
                    label="Mobile Number"
                    type="number"
                    placeholder="Enter Mobile Number"
                    className="rounded-md shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-50"
                    register={personalInfoRegister}
                    error={personalInfoErrors?.phone}
                  />
                </div>
                <div className="sm:col-span-3">
                  <Textinput
                    name="email"
                    label="email"
                    type="email"
                    disabled={true}
                    placeholder="Enter Email Address"
                    className="rounded-md shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-50"
                    register={personalInfoRegister}
                    error={personalInfoErrors?.email}
                  />
                </div>

                <div className="col-span-full">
                  <Textarea
                    name="address"
                    label="Address"
                    placeholder="Address"
                    register={personalInfoRegister}
                    error={personalInfoErrors?.address}
                    className="rounded-md shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-50"
                  />
                </div>
              </div>

              <div className="mt-8 flex">
                <Button
                  type="submit"
                  text="Save"
                  isLoading={personalInfoIsSubmitting}
                  // isLoading={false}
                  className="rounded-md bg-[#ff6600] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                />
              </div>
            </form>
          </div>

          <div className="grid  grid-cols-1  gap-y-1 px-1 py-2 sm:px-6 md:grid-cols-3 ">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-500">
                Change password
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-700">
                Update your password associated with your account.
              </p>
            </div>

            <form
              onSubmit={changePasswordHandleSubmit(handleChangePasswordSubmit)}
              className="md:col-span-2"
            >
              <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:max-w-xl sm:grid-cols-6">
                <div className="col-span-full">
                  <Textinput
                    name="password"
                    label="Current Password"
                    type="password"
                    placeholder="Enter Current password"
                    className="rounded-md shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-50"
                    register={changePasswordRegister}
                    error={changePasswordErrors?.password}
                  />
                </div>
                <div className="col-span-full">
                  <Textinput
                    name="new_password"
                    label="New Password"
                    type="password"
                    placeholder="Enter New Password"
                    className="rounded-md shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-50"
                    register={changePasswordRegister}
                    error={changePasswordErrors?.new_password}
                  />
                </div>
                <div className="col-span-full">
                  <Textinput
                    name="confirm_password"
                    label="Confirm password"
                    type="password"
                    placeholder="Enter Confirm Password"
                    className="rounded-md shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-50"
                    register={changePasswordRegister}
                    error={changePasswordErrors?.confirm_password}
                  />
                </div>
              </div>
              <div className="mt-8 flex">
                <Button
                  type="submit"
                  text="Save"
                  isLoading={changePasswordIsSubmitting}
                  className="rounded-md bg-[#ff6600] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
