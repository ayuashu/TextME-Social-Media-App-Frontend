import React from "react";
import { TbSocial } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";
import { useForm } from "react-hook-form";
import { BsMoon, BsSunFill } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { SetTheme } from "../redux/theme";
import { Logout } from "../redux/userSlice";
import { fetchPosts } from "../utils";

const TopBar = () => {
  const { theme } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleTheme = () => {
    const themeValue = theme === "light" ? "dark" : "light";

    dispatch(SetTheme(themeValue));
  };

  const handleSearch = async (data) => {
    await fetchPosts(user.token,dispatch,"",data);
  };

  return (
    <div className='topbar w-full flex items-center justify-between py-3 md:py-4 mt-4 px-4 bg-primary rounded-lg shadow-xl'>
      <Link to='/' className='flex gap-2 items-center'>
        <div className='p-1 md:p-2 bg-[#4f3a8a] rounded text-white'>
          <TbSocial />
        </div>
        <span className='text-xl md:text-2xl text-[#a399c0] font-semibold'>
          TextME
        </span>
      </Link>

      <form
        className='hidden md:flex items-center justify-center'
        onSubmit={handleSubmit(handleSearch)}
      >
        <TextInput
          placeholder='Search...'
          styles='w-[18rem] lg:w-[38rem] rounded-l-full py-3 outline-none px-4 border border-[#666] '
          register={register("search")}
        />
        <CustomButton
          title='Search'
          type='submit'
          containerStyles='bg-[#4f3a8a] text-white px-6 py-2.5 mt-2 rounded-r-full border border-[#666]'
        />
      </form>

      {/* ICONS */}
      <div className='flex gap-6 items-center text-ascent-1 text-md md:text-xl'>
        <button onClick={() => handleTheme()}>
          {theme ? <BsMoon /> : <BsSunFill />}
        </button>
        <div className='hidden lg:flex'>
          <IoMdNotificationsOutline />
        </div>

        <div>
          <CustomButton
            onClick={() => dispatch(Logout())}
            title='Log Out'
            containerStyles='text-sm text-ascent-1 font-semibold px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full hover:bg-[#4f3a8a] hover:text-white'
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;