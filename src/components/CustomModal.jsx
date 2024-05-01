"use client";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";

export function CustomModal({ children, openModal, setOpenModal }) {
  //   function onCloseModal() {
  //     setOpenModal(false);
  //   }

  return (
    <>
      {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
      <Modal show={openModal} size="lg" onClose={setOpenModal} popup>
        <Modal.Header />
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
}
