import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";

const API_BASE_URL = "https://mern-app-emps-backend-8tsc.onrender.com";

function CreateEmp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onFormSubmit = async (newEmpObj) => {
    try {
      setLoading(true);
      let res = await fetch(`${API_BASE_URL}/emp-api/employees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmpObj),
      });
      if (res.status === 201) {
        navigate("/list");
      } else {
        let errorRes = await res.json();
        throw new Error(errorRes.reason);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center text-4xl">Loading....</p>;
  if (error) return <p className="text-red-500 text-center text-3xl">{error}</p>;

  return (
    <div>
      <h1 className="text-5xl text-center text-gray-600">Create New Employee</h1>
      <form className="max-w-md mx-auto mt-10" onSubmit={handleSubmit(onFormSubmit)}>
        <input type="text" placeholder="Enter name" {...register("name", { required: "Name is required" })} className="mb-3 border-2 p-3 w-full rounded-2xl" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <input type="email" placeholder="Enter Email" {...register("email", { required: "Email is required" })} className="mb-3 border-2 p-3 w-full rounded-2xl" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <input type="number" placeholder="Enter mobile number" {...register("mobile")} className="mb-3 border-2 p-3 w-full rounded-2xl" />
        <input type="text" placeholder="Enter designation" {...register("designation", { required: "Designation is required" })} className="mb-3 border-2 p-3 w-full rounded-2xl" />
        {errors.designation && <p className="text-red-500">{errors.designation.message}</p>}
        <input type="text" placeholder="Enter name of the company" {...register("companyName", { required: "Company name is required" })} className="mb-3 border-2 p-3 w-full rounded-2xl" />
        {errors.companyName && <p className="text-red-500">{errors.companyName.message}</p>}
        <button type="submit" className="text-2xl rounded-2xl bg-gray-600 text-white block mx-auto p-4">Add Emp</button>
      </form>
    </div>
  );
}

export default CreateEmp;
