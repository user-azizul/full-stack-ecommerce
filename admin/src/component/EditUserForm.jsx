import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import {
  errorNotification,
  successNotification
} from "../util/showNotification";
import { userGlobalContext } from "../context/GlobalContext";

export default function EditUserForm({
  isOpen,
  setIsOpen,
  userList, // A function to fetch the user list
  selected
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const { backendUrl, token } = userGlobalContext();

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    if (selected) {
      setFormData({
        _id: selected._id || "",
        name: selected.name || "",
        email: selected.email || "",
        password: "" // Don't pre-fill password for editing
      });
    } else {
      setFormData({
        name: "",
        email: "",
        password: ""
      });
    }
  }, [selected]);

  const handleUpdateAndEditUser = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      return errorNotification("All fields are required");
    }

    // Only send password if it's provided
    const updateData = {
      ...formData,
      password: formData.password ? formData.password : undefined
    };

    try {
      const _id = selected?._id;
      let response;
      if (selected) {
        // Editing existing user
        response = await axios.put(
          `${backendUrl}/user/update/`,
          updateData,
          {
            headers: { Authorization: `Bearer ${token}` }
          },
          { _id }
        );
      } else {
        // Adding new user
        response = await axios.post(`${backendUrl}/user/register`, updateData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      const { data } = response;
      if (data.success) {
        successNotification(data.message);
        setIsOpen(false);
        userList(); // Assuming this re-fetches the user list
      } else {
        errorNotification(data.message);
      }
    } catch (error) {
      console.error(error);
      errorNotification(
        error.message || "An error occurred while updating the user."
      );
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed w-full min-h-screen bg-black/70 top-0 left-0">
          <Dialog
            open={isOpen}
            as="div"
            onClose={() => setIsOpen(false)}
            className="relative z-10 focus:outline-none"
          >
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <DialogPanel className="w-full max-w-xl rounded-lg px-10 py-5 bg-white shadow-md shadow-orange-200 border border-gray-200 text-black">
                  <div className="flex min-h-full items-center justify-between p-4 ">
                    <DialogTitle className="font-semibold text-lg">
                      {selected ? "Edit User" : "Add User"}
                    </DialogTitle>
                    <IoMdClose
                      className="text-lg hover:text-red-600 cursor-pointer duration-300"
                      onClick={() => setIsOpen(false)}
                    />
                  </div>
                  <div className="p-4">
                    <form
                      className="flex flex-col gap-5"
                      onSubmit={handleUpdateAndEditUser}
                    >
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="name"
                          className="text-sm font-semibold tracking-wide"
                        >
                          Enter Name
                        </label>
                        <input
                          className="border px-4 py-1 border-gray-500 rounded-md max-w-lg"
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Enter name"
                          value={formData.name}
                          onChange={handleValueChange}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="email"
                          className="text-sm font-semibold tracking-wide"
                        >
                          Enter Email
                        </label>
                        <input
                          className="border px-4 py-1 border-gray-500 rounded-md max-w-lg"
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Enter email"
                          value={formData.email}
                          onChange={handleValueChange}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="password"
                          className="text-sm font-semibold tracking-wide"
                        >
                          Enter Password (Optional)
                        </label>
                        <input
                          className="border px-4 py-1 border-gray-500 rounded-md max-w-lg"
                          type="password"
                          id="password"
                          name="password"
                          placeholder="Enter password"
                          value={formData.password}
                          onChange={handleValueChange}
                        />
                      </div>
                      <Button
                        className="mt-2 py-2 px-4 rounded-md text-white bg-black"
                        type="submit"
                      >
                        {selected ? "Update" : "Add"} User
                      </Button>
                    </form>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        </div>
      )}
    </>
  );
}
