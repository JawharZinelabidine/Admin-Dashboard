import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { setNotificationBadge } from "../features/notificationSlice.js";
import axios from "../services/axiosInterceptor.js";
import { useSelector, useDispatch } from "react-redux";

function Navbar() {


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { notificationBadge } = useSelector((state) => state.notification);
    const [selectedOption, setSelectedOption] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    const checkNotification = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:3000/api/admin/notification`
            );
            dispatch(setNotificationBadge(data));

            console.log(notificationBadge);
        } catch (error) {
            console.log(error);
            if (error.response.status === 403 || error.response.status === 401) {
                localStorage.clear();
                navigate("/");
            }
        }

    };

    const removeNotificationBadge = async () => {
        try {
            const { data } = await axios.put(
                `http://localhost:3000/api/admin/notification`
            );
            dispatch(setNotificationBadge(data));
        } catch (error) {
            console.log(error);
            if (error.response.status === 403 || error.response.status === 401) {
                localStorage.clear();
                navigate("/");
            }
        }
    };

    const logout = () => {
        localStorage.clear();
        navigate('/login')
    };

    useEffect(() => {
        checkNotification()
    }, [])


    const handleOptionChange = (option) => {
        setIsDropdownOpen(false); // Close the dropdown after selecting an option
    
        if (option === 'banned') {
       
          navigate('/ban');
        }
    
      };
      const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
      };
    
  



    return (
        <>
            <header className="flex items-center h-20 px-6 sm:px-10 bg-white shadow-lg border border-red-600">
            
                <div className="relative w-full sm:-ml-2 flex">
                    <Link to="/dashboard">
                        <button className="mx-8 inline-flex px-5 py-3 text-black hover:text-black focus:text-black hover:bg-gray-200 focus:bg-red-100 rounded-md mb-3 ">
                            Home
                        </button>
                    </Link>
                    <div className="relative inline-flex mx-8">
                        <Link to="/NewApplication">
                            <button className="px-5 py-3 text-black hover:text-black focus:text-black hover:bg-gray-200 focus:bg-red-100 rounded-md mb-3"
                                onClick={removeNotificationBadge}>
                                New applications
                            </button>
                        </Link>
                        {notificationBadge && (
                            <>
                                <span className="absolute top-0 right-0 h-2 w-2 mt-1 bg-red-500 rounded-full" />
                                <span className="absolute top-0 right-0 h-2 w-2 mt-1 bg-red-500 rounded-full animate-ping" />
                            </>
                        )}
                    </div>
                    <Link to="/history">
                        <button className="mx-8 inline-flex px-5 py-3 text-black hover:text-black focus:text-black hover:bg-gray-200 focus:bg-red-100 rounded-md mb-3">
                            History
                        </button>
                    </Link>
                    <div className="flex flex-shrink-0 items-center ml-auto">
                <div className="relative inline-block text-black">
        <button
        className="inline-flex items-center p-2 hover:bg-gray-100 focus:bg-gray-100 rounded-lg"
          onClick={toggleDropdown}
        >
          <span className="font-semibold">Admin-Dashboard</span>
        </button>
        <div
          className={`absolute mt-2 bg-white border rounded-md shadow-lg ${
            isDropdownOpen ? '' : 'hidden'
          }`}
        >
          <div
            className="p-2 cursor-pointer hover:bg-gray-100"
            onClick={() => handleOptionChange('banned') }
          >
            Ban List
          </div>
        </div>
      </div>
      </div>
                    <div className="border-l pl-3 ml-3 space-x-1">

                        <button className="relative p-2 text-black hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full"
                            onClick={() => { logout() }}>
                            <span className="sr-only">Log out</span>
                            <svg
                                aria-hidden="true"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Navbar
