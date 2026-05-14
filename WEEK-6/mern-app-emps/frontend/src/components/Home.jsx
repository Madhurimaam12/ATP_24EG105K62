function Home() {
  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold text-blue-600 mb-8">Employee Management System</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Create Employee</h3>
          <p className="text-gray-600">Add new employees to your database</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">View Employees</h3>
          <p className="text-gray-600">See all your employees in a grid view</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Edit Details</h3>
          <p className="text-gray-600">Update employee information</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Delete Records</h3>
          <p className="text-gray-600">Remove employees from the system</p>
        </div>
      </div>
    </div>
  )
};
export default Home