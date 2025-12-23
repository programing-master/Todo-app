import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Title from "../../components/Title";

export default function LoginPage() {
  const { err, isAuthenticated, signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const OnSubmit = handleSubmit(async (values) => {
    signIn(values);
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      return navigate("/");
    }
  }, [isAuthenticated]);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Title title={"Test - Login"} />
      <form
        onSubmit={OnSubmit}
        className="border w-[95vw] sm:w-1/2 md:w-1/3   rounded border-gray-300  p-4 flex flex-col gap-4"
      >
        <ul className=" flex flex-col gap-1">
          {err &&
            err[0].map((item, index) => (
              <p className="bg-red-500 p-2 rounded text-white">{item}</p>
            ))}
        </ul>
        <h3 className="">Sign In</h3>
        <hr className="text-gray-300" />
        <section className="flex flex-col gap-2">
          <label className="">
            <span className="text-gray-500 text-sm">Email</span>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded p-1 outline-none text-sm text-gray-400 transition duration-300 hover:ring-1"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}
          </label>
          <label className="">
            <span className="text-gray-500 text-sm">Password</span>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded p-1 outline-none text-sm text-gray-400  transition duration-300 hover:ring-1"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">Password is required</p>
            )}
          </label>
        </section>
        <button
          type={"submit"}
          className={`bg-blue-500 cursor-pointer text-white p-1 rounded transition hover:bg-blue-600 text-sm w-full flex items-center justify-center gap-1 `}
        >
          <img
            src="/assets/icons/log-in.svg"
            className="text-white "
            alt="SignUp Icon"
          />{" "}
          Login
        </button>
        <p className="text-sm">
          Dont't have an account{" "}
          <Link
            to="/register"
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
