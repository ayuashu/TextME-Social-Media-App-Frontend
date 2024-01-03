import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { CustomButton, TextInput } from "../components";
import { BgImage } from "../assets";
import { BsShare } from "react-icons/bs";
import { ImConnection } from "react-icons/im";
import { AiOutlineInteraction } from "react-icons/ai";
import { apiRequest } from "../utils/index.js";
import { TbSocial } from "react-icons/tb";

const Register = () => {
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await apiRequest({
        url: "/auth/register",
        data: data,
        method: "POST",
      });
      console.log(res);
      if (res.status === "failed") {
        setErrMsg(res);
      } else {
        setErrMsg(res);
        setTimeout(() => {
          window.location.replace("/login");
        }, 5000);
      }
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-bgColor w-full h-[105vh] flex items-center justify-center p-6">
      <div className="w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex flex-row-reverse bg-primary rounded-xl overflow-hidden shadow-xl">
        {/* Left */}
        <div className="w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center">
          <div className="w-full flex flex-row-reverse gap-2 items-center mb-1">
            <span className="text-2xl text-[#a399c0] font-semibold">
              TextME
            </span>
            <div className="p-2 bg-[#4f3a8a] rounded text-white">
              <TbSocial />
            </div>
          </div>
          <p className="text-ascent-1 text-base font-semibold text-right">
            Create your account
          </p>

          <form
            className="py-1 flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextInput
              name="firstName"
              placeholder="First Name"
              label="First Name"
              type="text"
              register={register("firstName", {
                required: "First Name is required",
              })}
              styles="w-full h-8 rounded-full -mt-1"
              labelStyles="text-sm text-ascent-1 font-semibold"
              error={errors.firstName ? errors.firstName.message : ""}
            />
            <TextInput
              name="lastName"
              placeholder="Last Name"
              label="Last Name"
              type="text"
              register={register("lastName", {
                required: "Last Name is required",
              })}
              styles="w-full h-8 rounded-full -mt-1"
              labelStyles="text-sm text-ascent-1 font-semibold"
              error={errors.lastName ? errors.lastName.message : ""}
            />
            <TextInput
              name="email"
              placeholder="email@example.com"
              label="Email Address"
              type="email"
              register={register("email", {
                required: "Email Address is required",
              })}
              styles="w-full h-8 rounded-full -mt-1"
              labelStyles="text-sm text-ascent-1 font-semibold"
              error={errors.email ? errors.email.message : ""}
            />

            <div className="w-full flex flex-col lg:flex-row gap-1 md:gap-2">
              <TextInput
                placeholder="password"
                label="Password"
                type="password"
                register={register("password", {
                  required: "Password is required",
                })}
                styles="w-full h-8 rounded-full -mt-1"
                labelStyles="text-sm text-ascent-1 font-semibold"
                error={errors.password ? errors.password.message : ""}
              />
              <TextInput
                placeholder="password"
                label="Confirm Password"
                type="password"
                register={register("cpassword", {
                  validate: (value) => {
                    const { password } = getValues();
                    if (password !== value) {
                      return "Password does not match";
                    }
                  },
                })}
                error={
                  errors.cpassword && errors.cpassword.type === "validate"
                    ? errors.cpassword?.message
                    : ""
                }
                styles="w-full h-8 rounded-full -mt-1"
                labelStyles="text-sm text-ascent-1 font-semibold"
              />
            </div>

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
                containerStyles={`inline-flex justify-center mt-4 rounded-md bg-[#4f3a8a] px-8 py-2 text-sm font-medium text-white outline-none`}
                title="Create Account"
              />
            )}
          </form>
          <p className="text-ascent-2 text-sm text-center">
            Already has an account ?
            <Link
              to="/login"
              className="text-[#a399c0] font-bold ml-2 cursor-pointer hover:text-white"
            >
              Login
            </Link>
          </p>
        </div>
        {/* Right */}
        <div className="hidden w-1/2 h-full lg:flex flex-col items-center justify-center">
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

export default Register;
