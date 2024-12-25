import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

export default function EditUserForm({
  isOpen,
  setIsOpen,
  close,
  userList,
  selected,
}) {
  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      {isOpen && (
        <div className="fixed w-full min-h-screen bg-black/70 top-0 left-0">
          <Dialog
            open={isOpen}
            as="div"
            onClose={close}
            className="relative z-10 focus:outline-none"
          >
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <DialogPanel className="w-full max-w-xl rounded-lg px-10 py-5 bg-white shadow-md shadow-orange-200 border border-gray-200 text-black">
                  <div className="flex min-h-full items-center justify-between p-4">
                    <DialogTitle>
                      {selected ? "Edit user" : " Add User"}
                    </DialogTitle>
                    <IoMdClose
                      className="text-lg hover:text-red-600 cursor-pointer duration-300"
                      onClick={() => setIsOpen(false)}
                    />
                  </div>
                  <div className="mt-3">
                    <form className="flex flex-col gap-5">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="">Enter Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Enter name"
                        />
                      </div>
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
