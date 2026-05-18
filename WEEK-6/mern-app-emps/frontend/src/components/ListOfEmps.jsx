import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function ListOfEmps() {
  const [emps, setEmps] = useState([]);
  const navigate = useNavigate();

  const gotoEmpoyee = (empObj) => {
    //navigate to /employee along with selected emp obj
    navigate("/employee", { state: empObj });
  };

  const gotoEditEmpoyee = (empObj) => {
    //navigate to /edit-emp along with selected emp obj
    navigate("/edit-emp", { state: empObj });
  };

  const deleteEmployee = async (empId) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      let res = await fetch(`/api/employees/${empId}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        // Remove from local state
        setEmps(emps.filter(emp => emp._id !== empId));
      }
    }
  };

  useEffect(() => {
    async function getEmps() {
      let res = await fetch("/api/employees");
      if (res.status === 200) {
        let resObj = await res.json();
        setEmps(resObj.payload);
      }
    }
    getEmps();
  }, []);

  return (
    <div>
      <h1 className="text-4xl text-center">List of Employees</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {emps.map((empObj) => (
          <div key={empObj._id} className=" bg-white p-5 text-center text-2xl rounded-2xl shadow-2xl ">
            <p>{empObj.email}</p>
            <p className="mb-4">{empObj.name}</p>
            {/* 3 buttons */}
            <div className="flex justify-around">
              <button onClick={() => gotoEmpoyee(empObj)} className="bg-green-600 p-2 rounded-2xl text-white">View</button>
              <button onClick={()=>gotoEditEmpoyee(empObj)} className="bg-yellow-600 p-2 rounded-2xl text-white">Edit</button>
              <button onClick={() => deleteEmployee(empObj._id)} className="bg-red-600 p-2 rounded-2xl text-white">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListOfEmps;