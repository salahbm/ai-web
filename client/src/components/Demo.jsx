import React, { useState } from "react";
import Hero from "./Hero";
import { linkIcon } from "../assets";
import { useLazyGetSummaryQuery } from "../redux/slicer/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery;

  const handleSubmit = async (e) => {
    const { data } = await getSummary({ articleUrl: article.url });
  };
  return (
    <section className="z-10 min-h-full">
      <Hero />
      <div className="mt-16">
        <div className="flex flex-col w-full gap-2">
          <form
            className="relative flex justify-center items-center"
            onSubmit={handleSubmit}
          >
            <img
              src={linkIcon}
              alt="linkIcon"
              className="absolute left-0 my-2 ml-3 w-5"
            />
            <input
              type="url"
              placeholder="Enter the URL"
              value={article.url}
              onChange={(e) => {
                setArticle({ ...article, url: e.target.value });
              }}
              required
              className="url_input peer-focus:border-gray-700 peer-focus:text-gray-700"
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
