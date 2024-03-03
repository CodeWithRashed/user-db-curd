"use client";
export const dynamic = "force-dynamic";
import toast from "react-hot-toast";
import { useGlobalDataContext } from "../Context/GlobalDataContext";
import { useState } from "react";
import axios from "axios";

const AddEmployee = () => {
  const { setData, data } = useGlobalDataContext();
  const [loading, setLoading] = useState(false);

  const handleAddEmployee = (event) => {
    event.preventDefault();
    setLoading(true);

    //GETTING FORM DATA
    const form = event.target;
    const key = (data.length + 1).toString();
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const isBlocked = false;


    //CREATING EMPLOYEE
    const employee = {
      key,
      name,
      email,
      phone,
      isBlocked,
    };


    //SAVING EMPLOYEE
    axios
      .post("/api/employee/add", employee)
      .then((response) => {
        if (response.status === 200) {
          const newData = [...data, response?.data?.newEmployee];
          setData(newData);
          form.reset();
          toast.success(response?.data?.message);
        } else {
          toast.error("Failed to add employee");
        }
      })
      .catch((error) => {
        toast.error("Saved Unsuccessful!!");
      })
      .finally(() => {
        setLoading(false);
      });
  };


  return (
    <div className="max-w-xs lg:w-96 bg-white mx-auto rounded-md my-auto">
      <form
        onSubmit={handleAddEmployee}
        className="shadow-md rounded p-4 md:p-8 lg:p-14"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            placeholder="Enter Employee Name"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Employee Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            placeholder="Enter Employee Email"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Employee Phone
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type="text"
            name="phone"
            placeholder="Enter Employee Phone"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {loading ? <p>Adding...</p> : <p>Add Employee</p>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
