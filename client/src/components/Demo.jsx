import React from "react";
import Hero from "./Hero";
import { linkIcon } from "../assets";

const Demo = () => {
  return (
    <section className="z-10 min-h-full">
      <Hero />
      <div className="mt-16">
        <div className="flex flex-col w-full gap-2">
          <form
            className="relative flex justify-center items-center"
            onSubmit={() => {}}
          >
            <img
              src={linkIcon}
              alt="linkIcon"
              className="absolute left-0 my-2 ml-3 w-5"
            />
            <input
              type="url"
              placeholder="Enter the URL"
              value={""}
              onChange={() => {}}
              className="url_input peer"
            />
            <button className="submit_btn " type="submit">
              🔍
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Demo;
