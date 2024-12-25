import React, { useState, useEffect } from "react";
import axios from "axios";

import { ClipLoader } from "react-spinners";
import {
  successNotification,
  errorNotification,
} from "./../util/showNotification";
import { userGlobalContext } from "../context/GlobalContext";
import EditUserForm from "../component/EditUserForm";

function Users() {
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { backendUrl, token } = userGlobalContext();

  async function fetchList() {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/user/get-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
  console.log(userList);

  const handleRemoveUser = async (_id) => {
    if (!_id) {
      errorNotification("User ID is required.");
      return;
    }

    const confirmRemoveUser = window.confirm(
      "Are you sure you want to remove this user?"
    );

    if (confirmRemoveUser) {
      setLoading(true); // Start loading state
      try {
        const res = await axios.post(
          `${backendUrl}/user/remove`,
          { _id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = res.data;
        if (data?.success) {
          successNotification(data?.message);
          await fetchList(); // Refresh the user list
        } else {
          errorNotification(data?.message || "Failed to remove user.");
        }
      } catch (error) {
        console.error("Error during user removal:", error);
        const errorMessage =
          error.response?.data?.message || "An unexpected error occurred";
        errorNotification(errorMessage);
      } finally {
        setLoading(false); // End loading state
      }
    }
  };

  const openEditForm = () => {
    setSelected(null);
    setIsOpen(true);
  };
  const closeEditForm = () => {
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-2 md:p-4">
      <div className="flex justify-between w-full mb-4">
        <p className=" text-base md:text-lg font-semibold">All Users</p>
        <button
          onClick={openEditForm}
          className="bg-black/80 text-white px-5 py-2 hover:bg-black  duration-300 ease-in-out   rounded-lg"
        >
          Add User
        </button>
      </div>

      {loading ? (
        <ClipLoader color={"#000"} loading={loading} size={50} />
      ) : (
        <div className="w-full max-w-3xl flex flex-col gap-2">
          <div className="hidden md:grid grid-cols-3 md:grid-cols-[1fr_2fr_1fr_0.5fr_0.5fr] py-2 px-4 border-b bg-gray-100 font-medium text-sm">
            <p className="hidden md:inline-block">Name</p>
            <p>Email</p>
            <p className="hidden md:inline-block">Role</p>
            <p className="text-center">Remove</p>
            <p className="text-center">Edit</p>
          </div>

          {userList.length > 0 ? (
            userList.map((item, index) => {
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
                      console.log(item._id);
                      handleRemoveUser(item._id);
                    }}
                    className="text-red-500 cursor-pointer text-xs md:text-sm"
                  >
                    Remove
                  </button>
                  <button
                    className="text-blue-500 cursor-pointer text-xs md:text-sm"
                    onClick={() => {
                      setSelected(item);
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
        selected={selected}
      />
    </div>
  );
}

export default Users;
