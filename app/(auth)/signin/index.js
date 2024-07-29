"use client"
import Image from "next/image";
import Link from "next/link";

import { yupResolver } from "@hookform/resolvers/yup";
import ls from 'localstorage-slim';
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import brandImg from "../../../public/images/brand/brand-t.png";
import logo from "../../../public/images/logo/logowhite.svg";
import userImg from "../../../public/images/logo/pgpgptlogo.png";
import { ApiContext } from "@/app/context/ApiContext";
import { CLIENT_API, USER_API } from "@/app/util/constant";
import { setSession } from "@/app/util/utils";


const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup.string().required("Password is Required"),
  })
  .required();

const SigninPage = () => {

  const { getApiData, postApiData } = useContext(ApiContext);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const router = useRouter();
  const onSubmit = async (data) => {
    try {
      const response = await postApiData(CLIENT_API.login, data);
      const result = response.data;`
      setSession(result.result);`
      if (result.status === 200) {
        ls.set('pgp_user', result.result, { encrypt: true });
        ls.set('isAuth', true);
        router.push("/service");
      }
      else {
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
      console.log(error)
      // toast.error("Invalid credentials", {
      //   position: "top-right",
      //   autoClose: 1500,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
    }

  };


  return (
    <>
      <main className="page-wrapper">
        <div className="signup-area">
          <div className="wrapper">
            <div className="row">
              <div className="col-lg-6 bg-color-blackest left-wrapper">
                <div className="sign-up-box">
                  <div className="signup-box-top">
                    <Image
                      src={logo}
                      width={193}
                      height={50}
                      alt="sign-up logo"
                    />
                  </div>
                  <div className="signup-box-bottom">
                    <div className="signup-box-content">
                      <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="input-section mail-section">
                          <div className="icon">
                            <i className="fa-sharp fa-regular fa-envelope"></i>
                          </div>
                          <input
                            type="email"
                            placeholder="Enter email address"
                            {...register('email')}
                          />
                        </div>
                        {errors.email && <p className="error ">{errors.email.message}</p>}

                        <div className="input-section password-section">
                          <div className="icon">
                            <i className="fa-sharp fa-regular fa-lock"></i>
                          </div>
                          {/* <input type="password" placeholder="Password" /> */}
                          <input
                            type="password"
                            placeholder="Password"
                            {...register('password')}
                          />

                        </div>
                        {errors.password && <p className="error">{errors.password.message}</p>}

                        <div className="forget-text">
                          <a className="btn-read-more" href="#">
                            <span>Forgot password</span>
                          </a>
                        </div>
                        <button type="submit" className="btn-default">
                          Sign In
                        </button>
                      </form>
                    </div>
                    <div className="signup-box-footer">
                      <div className="bottom-text">
                        Don't have an account?{" "}
                        <a className="btn-read-more ml--5" href="/">
                          <span>Sign Up</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 right-wrapper">
                <div className="client-feedback-area">
                  <div className="single-feedback">
                    <div className="inner">
                      <div className="meta-img-section">
                        <a className="image" href="#">
                          <Image
                            src={userImg}
                            width={200}
                            height={200}
                            alt="User Image"
                          />
                        </a>
                      </div>
                      <div className="rating">
                        <a href="#rating">
                          <i className="fa-sharp fa-solid fa-star"></i>
                        </a>
                        <a href="#rating">
                          <i className="fa-sharp fa-solid fa-star"></i>
                        </a>
                        <a href="#rating">
                          <i className="fa-sharp fa-solid fa-star"></i>
                        </a>
                        <a href="#rating">
                          <i className="fa-sharp fa-solid fa-star"></i>
                        </a>
                        <a href="#rating">
                          <i className="fa-sharp fa-solid fa-star"></i>
                        </a>
                      </div>
                      <div className="content">
                        <p className="description">
                          Pgpgpt is now a crucial component of our work!
                          We made it simple to collaborate across departments by
                          grouping our work
                        </p>
                        {/* <div className="bottom-content">
                          <div className="meta-info-section">
                            <h4 className="title-text mb--0">Guy Hawkins</h4>
                            <p className="desc mb--20">Nursing Assistant</p>
                            <div className="desc-img">
                              <Image
                                src={brandImg}
                                width={83}
                                height={23}
                                alt="Brand Image"
                              />
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link className="close-button" href="/">
            <i className="fa-sharp fa-regular fa-x"></i>
          </Link>
        </div>
      </main>
    </>
  );
};

export default SigninPage;
