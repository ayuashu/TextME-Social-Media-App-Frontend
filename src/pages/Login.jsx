import React, { useState } from "react";
import { TbSocial } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loading from "../components/Loading";
import { CustomButton, TextInput } from "../components";
import { BgImage } from "../assets";
import { BsShare } from "react-icons/bs";
import { ImConnection } from "react-icons/im";
import { AiOutlineInteraction } from "react-icons/ai";
import { UserLogin } from "../redux/userSlice.js";
import { apiRequest } from "../utils/index.js";

const Login = () => {
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await apiRequest({
        url: "/auth/login",
        data: data,
        method: "POST",
      });
      console.log(res);
      if (res.status === "failed") {
        setErrMsg(res);
      } else {
        setErrMsg("");
        const newData = { token: res.token, user: res.user };
        dispatch(UserLogin(newData));
        window.location.replace("/");
      }
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-bgColor w-full h-[100vh] flex items-center justify-center p-6">
      <div className="w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex bg-primary rounded-xl overflow-hidden shadow-xl">
        {/* Left */}
        <div className="w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center">
          <div className="w-full flex gap-2 items-center mb-6">
            <div className="p-2 bg-[#4f3a8a] rounded text-white">
              <TbSocial />
            </div>
            <span className="text-2xl text-[#a399c0] font-semibold">
              TextME
            </span>
          </div>
          <p className="text-ascent-1 -mt-4 text-base font-semibold">
            Log in to your account
          </p>
          <span className="text-sm mt-2 text-ascent-2 font-semibold">Welcome back</span>
          <form
            className="py-8 flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextInput 
              name="email"
              placeholder="email@example.com"
              label="Email Address"
              type="email"
              register={register("email", {
                required: "Email Address is required",
              })}
              styles="w-full h-10 rounded-full -mt-1"
                labelStyles="text-sm text-ascent-1 font-semibold"
              error={errors.email ? errors.email.message : ""}
            />
            <TextInput
              name="password"
              placeholder="password"
              label="Password"
              type="password"
              register={register("password", {
                required: "Password is required",
              })}
              styles="w-full h-10 rounded-full -mt-1"
                labelStyles="text-sm text-ascent-1 font-semibold"
              error={errors.password ? errors.password.message : ""}
            />

            <Link
              to="/reset-password"
              className="text-sm text-[#a399c0] text-right hover:text-ascent-1 font-semibold -mt-2"
            >
              Forgot Password ?
            </Link>

            {errMsg?.message && (
              <span
                className={`text-sm ${
                  errMsg?.status === "failed" ? "text-red-500" : "text-white"
                } mt-0.5`}
              >
                {errMsg?.message}
              </span>
            )}

            {isSubmitting ? (
              <Loading />
            ) : (
              <CustomButton
                type="submit"
                containerStyles={`inline-flex justify-center mt-2 rounded-md bg-[#4f3a8a] px-8 py-2 text-sm font-medium text-white outline-none`}
                title="Login"
              />
            )}
          </form>
          <p className="text-ascent-2 -mt-5 text-sm text-center">
            Don't have an account ?
            <Link
              to="/register"
              className="text-[#a399c0] font-semibold ml-2 cursor-pointer hover:text-white"
            >
              Create Account
            </Link>
          </p>
        </div>
        {/* Right */}
        <div className="hidden w-1/2 h-full lg:flex flex-col items-center justify-center ">
          <div className="relative w-full flex justify-center items-center">
            <img
              src={BgImage}
              alt="BgImage"
              className="w-48 2xl:w-64 h-48 2xl:h-64 rounded-full object-cover"
            />

            <div className="absolute flex items-center gap-1 bg-white right-20 top-2 px-5 py-2 rounded-full">
              <BsShare size={14} />
              <span className="text-xs font-semibold">Share</span>
            </div>

            <div className="absolute flex items-center gap-1 bg-white left-10 top-6 px-5 py-2 rounded-full">
              <ImConnection />
              <span className="text-xs font-semibold">Connect</span>
            </div>

            <div className="absolute flex items-center gap-1 bg-white left-11 bottom-6 px-5 py-2 rounded-full">
              <AiOutlineInteraction />
              <span className="text-xs font-semibold">Interact</span>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-white text-base">
              Connect with friends & have a chat
            </p>
            <span className="text-sm text-white/80">
              Share memories with friends and the world.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
