"use client";

import GPT3 from "@/section/front/gpt";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function GPTPAGE() {
  return (
    <>
      <GPT3 />
    </>
  );
}
