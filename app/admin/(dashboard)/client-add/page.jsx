"use client";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Textarea from "@/components/ui/Textarea";
import Textinput from "@/components/ui/Textinput";
import { ApiContext } from "@/context/ApiContext";
import { CLIENT_API } from "@/util/constant";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { useContext, useState } from "react";
import Flatpickr from "react-flatpickr";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const CLientAddPage = () => {
  const [picker, setPicker] = useState(new Date());

  const { getApiData, putApiData, postApiData } = useContext(ApiContext);

  const defaultValues = {
    name: "",
    email: "",
    password: "",
  };
  const [startDate, setStartDate] = useState(new Date());

  const FormValidationSchema = yup
    .object({
      name: yup.string().required("Name is required"),
      email: yup.string().required("Email is required"),
      password: yup.string().required("Password is required"),
      phone: yup.string().required("Phone is required"),
      address: yup.string().required("Address is required"),
      chat_gpt_key: yup.string().required("Chat Gpt Key is required"),
    })
    .required();

  const {
    register,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    defaultValues,
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });

  const onSubmit = async (data) => {
    const originalData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      address: data.address,
      chat_gpt_key: data.chat_gpt_key,
      note: data.note,
      issue_date: dayjs(picker).format('YYYY-MM-DD'),
      note: data.note,
      status:1,

    };

    try {
      const response = await postApiData(CLIENT_API.create, originalData);
      reset();
     
    } catch (error) {
      console.log(error);
      reset();
     
    }
  };

  return (
    <div>
      <Card title="Create new Customer">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
              <div>
                <label htmlFor="default-picker" className=" form-label">
                  Issued Date
                </label>
                <Controller
              name="issue_date"
              control={control}
              render={({ field }) => (

                <Flatpickr
                  className="form-control py-2"
                  value={picker}
                  onChange={(date) => setPicker(date)}
                  id="default-picker"
                />
                )}
                />
              </div>

              <Textinput
                name="name"
                label="Name"
                type="text"
                placeholder="Add your name"
                register={register}
                error={errors.name}
              />

              <Textinput
                name="email"
                label="Email"
                type="email"
                placeholder="Add your Email Address"
                register={register}
                error={errors.email}
              />
              <Textinput
                name="password"
                label="Password"
                type="password"
                placeholder="Add your Password"
                register={register}
                error={errors.password}
              />
              <Textinput
                name="phone"
                label="Phone"
                type="number"
                placeholder="Add your phone"
                register={register}
                error={errors.phone}
              />

              <div className="lg:col-span-2 col-span-1">
                <Textarea
                  name="address"
                  label="Address"
                  type="email"
                  placeholder="address"
                  rows="2"
                  register={register}
                  error={errors.address}
                />
              </div>
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
              <div className="lg:col-span-2 col-span-1">
                <Textarea
                  name="chat_gpt_key"
                  label="CHATGPT KEY"
                  type="text"
                  placeholder="CHATGPT KEY"
                  rows="2"
                  register={register}
                  error={errors.chat_gpt_key}
                />
                <Textarea
                  name="note"
                  label="Additional note"
                  type="text"
                  rows="4"
                  placeholder="Note"
                  register={register}
                />
              </div>
            </div>
          </div>

          <div className="ltr:text-right rtl:text-left space-x-3 rtl:space-x-reverse">
            <Button
              text="Save"
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              isLoading={isSubmitting}
            />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CLientAddPage;
