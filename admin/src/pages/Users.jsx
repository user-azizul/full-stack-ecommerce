import React, { useState, useEffect } from "react";
import axios from "axios";

import { ClipLoader } from "react-spinners";
import {
  successNotification,
  errorNotification
} from "./../util/showNotification";
import { userGlobalContext } from "../context/GlobalContext";
import EditUserForm from "../component/EditUserForm";

function Users() {
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { backendUrl, token } = userGlobalContext();

  async function fetchList() {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/user/get-user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("Fetched user data:", data); // Log the response structure

      if (data.success) {
        setUserList(data.userData);
      }
    } catch (error) {
      console.error("Error fetching user list:", error);
      errorNotification(
        error.response?.data?.message || "Failed to load users"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  const handleRemoveUser = async (email) => {
    if (!email) {
      console.error("No user email provided.");
      return;
    }

    const confirmRemoveUser = window.confirm(
      "Are you sure you want to remove this user?"
    );
    if (confirmRemoveUser) {
      try {
        console.log("Starting to remove user with email:", email);
        const res = await axios.post(
          `${backendUrl}/user/remove`,
          { email: email }, // Use email for removal
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        console.log("Response received:", res);

        const data = res.data;
        if (data?.success) {
          setLoading(false);
          successNotification(data?.message);
          await fetchList(); // Refresh the user list
        } else {
          errorNotification(data?.message);
        }
      } catch (error) {
        if (error.response) {
          console.error("Backend responded with an error:", error.response);
        } else {
          console.error("Request failed without a response:", error);
        }
        errorNotification(error.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }
  };
  const openEditForm = () => {
    setIsOpen(true);
  };
  const closeEditForm = () => {
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-2 md:p-4">
      <p className="mb-4 text-base md:text-lg font-semibold">All Users</p>

      {loading ? (
        <ClipLoader color={"#000"} loading={loading} size={50} />
      ) : (
        <div className="w-full max-w-3xl flex flex-col gap-2">
          <div className="hidden md:grid grid-cols-3 md:grid-cols-[1fr_2fr_1fr_0.5fr_0.5fr] py-2 px-4 border-b bg-gray-100 font-medium text-sm">
            <p>Name</p>
            <p>Email</p>
            <p>Role</p>
            <p className="text-center">Remove</p>
            <p className="text-center">Edit</p>
          </div>

          {userList.length > 0 ? (
            userList.map((item, index) => {
              console.log("User item:", item); // Log the user object
              return (
                <div
                  key={index}
                  className="grid grid-cols-2 md:grid-cols-[1fr_2fr_1fr_0.5fr_0.5fr] items-center py-2 px-4 border-b text-sm md:text-base"
                >
                  <p className="truncate">{item.name}</p>
                  <p className="truncate">{item.email}</p>
                  <p className="hidden md:block">
                    {item.isAdmin ? "Admin" : "User"}
                  </p>

                  <button
                    onClick={() => {
                      // Use email to remove the user
                      handleRemoveUser(item.email);
                    }}
                    className="text-red-500 cursor-pointer text-xs md:text-sm"
                  >
                    Remove
                  </button>
                  <button
                    className="text-blue-500 cursor-pointer text-xs md:text-sm"
                    onClick={() => {
                      setIsOpen(true);
                    }}
                  >
                    Edit
                  </button>
                </div>
              );
            })
          ) : (
            <p className="text-center py-4">No users found.</p>
          )}
        </div>
      )}
      <EditUserForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        close={closeEditForm}
        userList={userList}
      />
    </div>
  );
}

export default Users;
