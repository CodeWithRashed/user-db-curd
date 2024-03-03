"use client";

import toast from "react-hot-toast";
import { useGlobalDataContext } from "../Context/GlobalDataContext";

const AddEmployee = () => {
  const { setData, data } = useGlobalDataContext();

  console.log();

  const handleAddEmployee = (event) => {
    event.preventDefault();
    try {
      const form = event.target;
      const key = (data.length + 1).toString();
      const name = form.name.value;
      const email = form.email.value;
      const phone = form.phone.value;
      const isBlocked = false;

      const employee = {
        key,
        name,
        email,
        phone,
        isBlocked,
      };

      const newData = [...data, employee];
      setData(newData);
      form.reset()
      toast.success("Employee Added Successfully");
    } catch (error) {
      toast.error("Saved Unsuccessful!!");
    }
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
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
