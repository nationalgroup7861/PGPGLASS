import Modal from "@/components/ui/Modal";
import Textarea from "@/components/ui/Textarea";
import Textinput from "@/components/ui/Textinput";
import { ApiContext } from "@/context/ApiContext";
import { CLIENT_API } from "@/util/constant";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";



const UserModal = ({ open, closeDialog, referenceData }) => {
    const { getApiData, putApiData, postApiData } = useContext(ApiContext);
  const defaultValues = {
    name: referenceData.name,
    email: referenceData.email,
    password: referenceData.password,
    phone: referenceData.phone,
    address: referenceData.address,
    chat_gpt3_key: referenceData.chat_gpt3_key,
    chat_gpt4_key: referenceData.chat_gpt4_key,
    note: referenceData.note,
  };

  const FormValidationSchema = yup
    .object({
      name: yup.string().required("Name is required"),
      email: yup.string().required("Email is required"),
      password: yup.string().required("Password is required"),
      phone: yup.string().required("Phone is required"),
      address: yup.string().required("Address is required"),
      chat_gpt3_key: yup.string().required("Chat Gpt Key is required"),
    })
    .required();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues,
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });

  const onSubmit = async (values) => {
const data={
    name: values.name,
    email: values.email,
    password: values.password,
    phone: values.phone,
    address: values.address,
    chat_gpt3_key: values.chat_gpt3_key,
    chat_gpt4_key: values.chat_gpt4_key,
    note: values.note,
    id:referenceData?.id

}
try {
    const response = await postApiData(CLIENT_API.update, data);
    closeDialog({status:false,update:true})
  } catch (error) {
    console.log(error);
  }
  };
  return (
    <div>
      <Modal
        title="Update User"
        labelclassName="btn-outline-dark"
        activeModal={open}
        onClose={closeDialog}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
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

          <Textarea
            name="address"
            label="Address"
            placeholder="address"
            rows="2"
            register={register}
            error={errors.address}
          />
          <Textarea
            name="chat_gpt3_key"
            label="CHATGPT KEY"
            type="text"
            placeholder="CHATGPT KEY"
            rows="2"
            register={register}
            error={errors.chat_gpt3_key}
          />
            <Textarea
            name="chat_gpt4_key"
            label="CHATGPT KEY"
            type="text"
            placeholder="CHATGPT KEY"
            rows="2"
            register={register}
            error={errors.chat_gpt4_key}
          />
          <Textarea
            name="note"
            label="Additional note"
            type="text"
            rows="4"
            placeholder="Note"
            register={register}
          />

          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark  text-center">Submit</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UserModal;
