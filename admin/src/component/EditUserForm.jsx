import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

export default function EditUserForm({ isOpen, setIsOpen, close, userList }) {
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
                <DialogPanel className="w-full max-w-xl rounded-lg px-10 py-5 bg-white">
                  <div className="flex min-h-full items-center justify-center">
                    <DialogTitle> Add User</DialogTitle>
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
