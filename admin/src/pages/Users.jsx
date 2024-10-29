import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import {
  successNotification,
  errorNotification,
} from "./../util/showNotification";
import { userGlobalContext } from "../context/GlobalContext";

function Users() {
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const { backendUrl, token } = userGlobalContext();

  async function fetchList() {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/user/get-user`, {
        headers: { token },
      });
      if (data.success) {
        setUserList(data.userData);
      }
    } catch (error) {
      errorNotification("Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center p-2 md:p-4">
      <p className="mb-4 text-base md:text-lg font-semibold">All Users</p>

      {loading ? (
        <ClipLoader color={"#000"} loading={loading} size={50} />
      ) : (
        <div className="w-full max-w-3xl flex flex-col gap-2">
          {/* Header */}
          <div className="hidden md:grid grid-cols-3 md:grid-cols-[2fr_1fr_1fr_0.5fr_0.5fr] py-2 px-4 border-b bg-gray-100 font-medium text-sm">
            <p>Name</p>
            <p>Email</p>
            <p>Role</p>
            <p className="text-center">Remove</p>
            <p className="text-center">Edit</p>
          </div>

          {/* User List */}
          {userList.length > 0 ? (
            userList.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_0.5fr_0.5fr] items-center py-2 px-4 border-b text-sm md:text-base"
              >
                <p className="truncate">{item.name}</p>
                <p className="truncate">{item.email}</p>
                <p className="hidden md:block">
                  {item.isAdmin ? "Admin" : "User"}
                </p>

                <button className="text-red-500 cursor-pointer text-xs md:text-sm">
                  Remove
                </button>
                <button className="text-blue-500 cursor-pointer text-xs md:text-sm">
                  Edit
                </button>
              </div>
            ))
          ) : (
            <p className="text-center py-4">No users found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Users;
