import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { counterContextObj } from "../contexts/ContextProvider";

function EditEmployee() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();

  //get empObj from navigate hook
  const { state } = useLocation();
  // console.log(state);

  useEffect(() => {
    setValue("name", state.name);
    setValue("email", state.email);
    setValue("mobile", state.mobile);
    setValue("designation", state.designation);
    setValue("companyName", state.companyName);
  }, []);

  const saveModifiedEmp = async (modifiedEmp) => {
    // console.log(modifiedEmp);
    //make HTTP PUT req
    const res = await fetch(`/api/employees/${state._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(modifiedEmp),
    });
    if (res.status === 200) {
      //navigate to ListOfEMps
      navigate("/list");
    }
  };

  return (
    <div>
      <h1 className="text-5xl text-center text-yellow-600">Edit Employee</h1>
      {/* form */}
      <form className=" max-w-md mx-auto mt-10" onSubmit={handleSubmit(saveModifiedEmp)}>
        <input
          type="text"
          placeholder="Enter name "
          {...register("name")}
          className="mb-3 border-2 p-3 w-full rounded-2xl"
        />
        <input
          type="email"
          placeholder="Enter Email "
          {...register("email")}
          className="mb-3 border-2 p-3 w-full rounded-2xl"
        />

        <input
          type="number"
          placeholder="Enter mobile number"
          {...register("mobile")}
          className="mb-3 border-2 p-3 w-full rounded-2xl"
        />
        <input
          type="text"
          placeholder="Enter designation"
          {...register("designation")}
          className="mb-3 border-2 p-3 w-full rounded-2xl"
        />
        <input
          type="text"
          placeholder="Enter name of the company"
          {...register("companyName")}
          className="mb-3 border-2 p-3 w-full rounded-2xl"
        />

        <button type="submit" className="text-2xl rounded-2xl bg-green-800 text-white block mx-auto p-4">
          Save
        </button>
      </form>
    </div>
  );
}

export default EditEmployee;
/*
  const res=await fetch()
  const obj=await res.json()

*/

/*
  const res=await axios.get()
  const obj=res.data

*/