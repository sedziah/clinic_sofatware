import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { LuClock3 } from "react-icons/lu";
import { FiUserCheck } from "react-icons/fi";
import { LuUsers2 } from "react-icons/lu";
import { GrAdd } from "react-icons/gr";
import { FaChevronDown } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import PatientModal from "../components/SelectClinicModal";
import SearchModalUnfilled from "../components/SearchModalUnfilled";
import { useAuth } from "../hooks/AuthProvider";

import { useAppointments } from "../services/queries/appointments-query";
import LoadingSpinner from "../components/LoadingSpinner";

const Dashboard = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Track dropdown state
  const { user, logOut } = useAuth(); // Access the authenticated user and logOut



  const {data:appointments, isLoading}  = useAppointments();


  const isTable = true;

  const pendingAppointments = appointments?.data?.today_appointments?.data?.filter((appointment)=>appointment?.status  === 'Scheduled');


  const completedAppointments = appointments?.data?.today_appointments?.data?.filter((appointment)=>appointment?.status  === 'Completed');


  const handleConsult = (appointment) => {
    if (!appointment) {
      console.error("Appointment is undefined.");
      return;
    }
  
    const { id: appointmentId, patient } = appointment;
  
    // Navigate to the case history page with state
    navigate(`/case-history/${appointmentId}`, {
      state: { patient, appointment },
    });
  };

  // const dates = appointmentsDetails.filter((date)=> date?.appointment_date == today);

  // const date
  // const upcomingDates = appointmentsDetails.filter((date)=> date?.appointment_date > today);

  // const todaysAppointments  = appointmentsDetails?.filter((appointment)=>appointment?.appointment_date  === today);
  // console.log(todaysAppointments);

  const handleLogout = () => {
    // e.preventDefault();
    logOut();
  };

  const openModal = () => setIsModalOpen(true);

  const [isSearchModalVisible, setSearchModalVisibility] = useState(false);
  const openSearchModal = () => {
    setSearchModalVisibility(true);
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown

  return (
    <div className="px-8 ml-72 flex flex-col mt-4 gap-8 bg-[#f9fafb] w-full">
      {isModalOpen && <PatientModal setIsModalOpen={setIsModalOpen} />}

      {isSearchModalVisible && (
        <SearchModalUnfilled
          setSearchModalVisibility={setSearchModalVisibility}
        />
      )}

      <div className="dashboard_header grid items-center grid-cols-12 max-h-[10%]">
        <div className='col-span-4'>
          <h2 className='text-[1.3vw] font-bold grid-'>
            Good {`${new Date().getHours() < 12 ? "Morning" : new Date().getHours() < 18 ? "Afternoon" : "Evening"}`} , 
            <span>{user?.first_name  || "User"}</span> 👋🏾 
          </h2>
        </div>

        <div className="flex items-center justify-end gap-5 h-14 col-span-7 w-90 border-[#d0d5dd]">
          <div className="flex bg-white items-center text-left gap-0 w-2/3 px-2 border rounded-md">
            <CiSearch title="Search" className="h-5 bg-white cursor-pointer" />
            <input
              type="search"
              name="search"
              readOnly
              placeholder="Search"
              className="p-4 focus:outline-none"
              onClick={openSearchModal}
            />
          </div>
          <div className="flex items-center">
            <button
              className="flex items-center p-4 max-h-14 text-white bg-[#2f3192] gap-2 rounded-md text-sm"
              type="button"
              onClick={openModal}
            >
              <GrAdd />
              Add New Patient
            </button>
          </div>
        </div>
        <div className="relative flex items-end justify-end gap-12 col-span-1">
          <div className="flex justify-end gap-3 items-center">
            <span className="bg-[#ffe7cc] px-5 py-2 w-14 h-14 text-[#3e3838] flex justify-center items-center rounded-[100%] font-semibold text-xl">
              {`${user?.first_name[0] || "K"}${user?.last_name[0] || "D"}`}{" "}
              {/* Display user's initials */}
            </span>
            <FaChevronDown
              title="Menu"
              className="cursor-pointer font-800 h-6 w-6"
              onClick={toggleDropdown} // Toggle the dropdown
            />
          </div>
          {/* Dropdown for Logout */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-14 bg-white border rounded-lg p-2 shadow-lg">
              <form action="" onSubmit={handleLogout}>
                <button
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
                  type="submit"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-9 w-full">
        <div className="bg-[#ececf9]  p-4 h-36 col-span-4 w-full">
          <h3 className="flex items-center text-base gap-[12px] font-normal">
            <LuUsers2 className="w-6 h-6" />
            Today's Appointments
          </h3>

          {isLoading && <LoadingSpinner />}
          <span className="text-[50px] font-bold text-[#2f3192]">
            {appointments?.data?.today_appointments?.count}
          </span>
        </div>
        <div className="bg-[#fbeae9] p-4 h-36 w-full col-span-4">
          <h3 className="flex items-center text-base gap-[12px] font-normal">
            <LuClock3 className="w-6 h-6" />
            Pending Appointments
          </h3>

          {isLoading && <LoadingSpinner />}
          <span className="text-[50px] font-bold text-[#d42620]">
            {appointments?.data?.pending_appointments}
          </span>
        </div>
        <div className="bg-[#e7f6ec] p-4 h-36 w-full flex flex-col col-span-4">
          <h3 className="flex items-center text-base gap-[12px] font-normal">
            <FiUserCheck className="w-6 h-6" />
            Completed Appointments
          </h3>

          {isLoading && <LoadingSpinner />}
          <span className="text-[50px] font-bold text-[#0f973d]">
            {appointments?.data?.completed_appointments}
          </span>
        </div>
      </div>

      <div>
        <div className="flex flex-col gap-20">
          <div className="">
            <div className="flex justify-between my-[15px]">
              <h2 className="font-bold text-xl">Upcoming Appointments</h2>
              <Link
                to="/appointments"
                className="text-[#2f3192] text-right font-semibold"
              >
                See all
              </Link>
            </div>
            <table className="w-full">
              <thead className="text-black uppercase text-left h-16 bg-[#f0f2f5]">
                <tr className="rounded-lg">
                  <th
                    scope="col"
                    className="px-3 min-w-40 py-3 text-base font-semibold normal-case"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-3 min-w-40 py-3 text-base font-semibold normal-case"
                  >
                    Patient’s ID
                  </th>
                  <th
                    scope="col"
                    className="px-3 min-w-40 py-3 text-base font-semibold normal-case"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 min-w-40 py-3 text-base font-semibold normal-case"
                  >
                    Appointment Type
                  </th>
                  <th scope="col" className="px-3 min-w-40 py-3 text-base font-semibold normal-case">
                    Status
                  </th>
                  <th scope="col" className="px-3 min-w-40 py-3 text-base font-semibold normal-case"></th>
                </tr>
              </thead>
              <tbody>
              {
            isLoading &&  <LoadingSpinner isTable={isTable} className='flex justify-center' />
          }
  {pendingAppointments
    ?.slice(0, 5) // Extract the first 5 items from the array
    .map((appointment) => (
      <tr className="text-left" key={appointment?.id || appointment?.patient?.patient_id}>
        <td className="px-3 py-3 border border-l-0 border-t-0 border-r-0 border-b-[#d9d9d9]">
          {appointment?.appointment_date}
        </td>
        <td className="px-3 py-3 border border-l-0 border-t-0 border-r-0 border-b-[#d9d9d9]">
          {appointment?.patient?.patient_id}
        </td>
        <td className="px-3 py-3 border border-l-0 border-t-0 border-r-0 border-b-[#d9d9d9]">
          {appointment?.patient?.first_name} {appointment?.patient?.last_name}
        </td>
        <td className="px-3 py-3 border border-l-0 border-t-0 border-r-0 border-b-[#d9d9d9]">
          {appointment?.appointment_type}
        </td>
        <td className="px-3 py-3 border border-l-0 border-t-0 border-r-0 border-b-[#d9d9d9]">
        <span className={`px-6 rounded-full py-2 text-base font-medium text-white w-5 ${checkStatus(appointment?.status)}`}>
          {appointment?.status}

            </span>
        </td>
        <td className="py-3 flex justify-end gap-4 border border-l-0 border-t-0 border-r-0 border-b-[#d9d9d9] items-center text-center">
          <Link
            to="#"
            className="font-medium text-[#2f3192] px-4 flex justify-center py-2 border border-solid rounded-lg w-14 border-[#2f3192]"
          >
            Edit
          </Link>
          <Link to="#" className="text-white bg-[#2f3192] px-4 py-2 rounded-lg">
            Attend to Patient
          </Link>
        </td>
      </tr>
    ))}
</tbody>

            </table>
          </div>

          <div className="my-5">
            <div className='flex justify-between my-4'>
            <h2 className='font-bold text-xl'>Completed Appointments</h2>
            <Link to='/appointments' className='text-[#2f3192] text-right font-semibold'>See all</Link>
            </div>
            <table className="w-full">
              <thead className="text-black uppercase text-left rounded-[8px] h-16 bg-[#f0f2f5]">
                <tr>
                  <th
                    scope="col"
                    className="px-3 min-w-[168px] py-3 text-base font-semibold normal-case"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-3 min-w-[168px] py-3 text-base font-semibold normal-case"
                  >
                    Patient’s ID
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 min-w-[168px] text-base font-semibold normal-case"
                  >
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3 min-w-[168px] text-base font-semibold normal-case">
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 min-w-[168px] text-base font-semibold normal-case"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>

              {
            isLoading &&  <LoadingSpinner isTable={isTable} className='flex justify-center' />
          }

              {completedAppointments
    ?.slice(0, 5) // Extract the first 5 items from the array
    .map((appointment) => (
                <tr className="text-left">
                  <td className="px-3 py-3 border border-l-0 border-t-0 border-r-0 border-b-[#d9d9d9]">{appointment?.appointment_date}</td>
                  <td className="px-3 py-3 my-3 border border-l-0 border-t-0 border-r-0 border-b-[#d9d9d9]">{appointment?.patient?.patient_id}</td>
                  <td className="px-3 py-3 my-3 border border-l-0 border-t-0 border-r-0 border-b-[#d9d9d9]">{appointment?.patient?.first_name} {appointment?.patient?.last_name}</td>
                  <td className="px-3 py-3 my-3 border border-l-0 border-t-0 border-r-0 border-b-[#d9d9d9]">{appointment?.appointment_type}</td>
                  <td className="px-3 py-3 border border-l-0 border-t-0 border-r-0 border-b-[#d9d9d9]">
        <span className={`px-6 rounded-full py-2 text-base font-medium text-white w-5 ${checkStatus(appointment?.status)}`}>
          {appointment?.status}

            </span>
        </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



const checkStatus = (status)  =>{
  switch(status){
    case  'Completed': return 'bg-green-600';
    case  'Cancelled': return 'bg-red-600';

    default: case  'Scheduled': return 'bg-yellow-400';
  }
};