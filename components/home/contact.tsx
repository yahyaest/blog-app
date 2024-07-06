"use client";
import React, { useRef, useState } from "react";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { TextArea } from "../ui/TextArea";
import { useToast } from "../ui/Toast";
import { IoMailOutline, IoPhonePortraitOutline } from "react-icons/io5";
import emailjs from "@emailjs/browser";
import { cx } from "@/utils";

export default function Contact() {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const formRef = useRef();
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
    emailjs
      .sendForm(
        "service_8o4isz6",
        "template_xpf2kht",
        formRef.current as any,
        "xVIc3EjoNkj2ZSyBN"
      )
      .then(
        (result) => {
          setSuccess(true);
          showToast("Message Sent Successfully");
          (formRef.current as any).reset();
        },
        (error) => {
          setError(true);
        }
      );
  };
  return (
    <div
      className="flex md:flex-row flex-col items-center justify-center max-w-4xl w-full mx-auto rounded-2xl p-4 md:p-8 shadow-input text-light dark:text-dark bg-dark dark:bg-light"
      id="contact"
    >
      <div className="w-full md:w-1/2 md:my-10  ">
        <h1 className="heading text-light dark:text-dark">
          Let&apos;s work
          <br className="hidden md:block" />
          <span className="text-crimson"> together</span>
        </h1>
        <div className="my-10">
          <div className="flex mt-2">
            <IoMailOutline className="text-light dark:text-dark self-center mr-4" />
            <p className="text-light dark:text-dark text-xl font-bold max-w-sm">
              Mail
            </p>
          </div>
          <p className="text-light dark:text-dark text-md  max-w-sm mt-2">
            machatyahya@gmail.com
          </p>
        </div>

        <div className="my-10">
          <div className="flex mt-2">
            <IoPhonePortraitOutline className="text-light dark:text-dark self-center mr-4" />
            <p className="text-light dark:text-dark text-xl font-bold max-w-sm">
              Phone
            </p>
          </div>
          <p className="text-light dark:text-dark text-md  max-w-sm mt-2">
            +216 58 66 89 89
          </p>
        </div>
      </div>

      <form
        className="w-full md:w-1/2 md:my-8"
        onSubmit={handleSubmit}
        ref={formRef as any}
      >
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              id="firstname"
              placeholder="First name"
              name="first_name"
              type="text"
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              id="lastname"
              placeholder="Last name"
              name="last_name"
              type="text"
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="example@gmail.com"
            name="email"
            type="email"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="Message">Message</Label>
          <TextArea id="message" placeholder="Message" name="message" />
        </LabelInputContainer>

        <button
          className="bg-crimson hover:bg-red-500 transition duration-500 w-full text-black rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-700)_inset]"
          type="submit"
        >
          Send &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cx("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
