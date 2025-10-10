"use client";
import { Button, Input } from "@heroui/react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import React, { useState } from "react";
import { Eye, EyeOff } from "@deemlol/next-icons";
import useHook from "./useHook";

export default function ({ openModalLogin, closeModalLogin }) {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const { handleSubmit, field, handleChange } = useHook();
  return (
    <div>
      <Modal
        isOpen={openModalLogin}
        onOpenChange={closeModalLogin}
        backdrop="blur"
        classNames={{ footer: "flex justify-center px-[54px] pb-[40px]" }}
      >
        <ModalContent>
          {(closeModalLogin) => (
            <form onSubmit={handleSubmit}>
              <ModalHeader className="flex flex-col gap-1 text-center pt-[40px] text-2xl">
                Login
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4 px-[30px]">
                  <Input
                    isRequired
                    errorMessage={({ validationDetails }) => {
                      if (validationDetails.valueMissing) {
                        return "Please enter your email";
                      }
                      if (validationDetails.typeMismatch) {
                        return "Please enter a valid email address";
                      }
                    }}
                    label="User Name"
                    labelPlacement="outside"
                    name="user_name"
                    value={field.user_name}
                    onChange={handleChange}
                    placeholder="Enter your user name"
                    type="text"
                    size="lg"
                  />
                  <Input
                    endContent={
                      <button
                        aria-label="toggle password visibility"
                        className="focus:outline-solid outline-transparent"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <Eye className="text-xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeOff className="text-xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    labelPlacement="outside"
                    label="Password"
                    placeholder="Enter your password"
                    type={isVisible ? "text" : "password"}
                    size="lg"
                    name="password"
                    value={field.password}
                    onChange={handleChange}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  color="success"
                  variant="ghost"
                >
                  Login
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
