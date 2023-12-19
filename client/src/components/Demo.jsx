import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../redux/slicer/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
  const [copy, setCopy] = useState("");

  useEffect(() => {
    const articlesFromStorage = JSON.parse(localStorage.getItem("articles"));
    if (articlesFromStorage) {
      setAllArticles(articlesFromStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data?.summary };
      const updatedAllArticles = [newArticle, ...allArticles];
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };

  const handleCopy = async (copyUrl) => {
    setCopy(copyUrl);
    navigator.clipboard.writeText(copyUrl);

    setTimeout(() => {
      setCopy(false);
    }, 3000);
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
      <div className="flex flex-col gap-1 max-h-60 overflow-y-auto ">
        {allArticles.map((item, index) => (
          <div
            key={index}
            onClick={() => setArticle(item)}
            className="link_card"
          >
            <div className="copy_btn" onClick={() => handleCopy(item.url)}>
              <img
                src={copy === item.url ? tick : copy}
                alt="copy"
                className="w-[40%] h-{40%] object-contain "
              />
            </div>
            <p className="flex-1 font-satoshi text-purple-700  truncate text-sm font-medium">
              {item.url}
            </p>
          </div>
        ))}
      </div>
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img
            src={loader}
            alt="Loading"
            className="w-20 h-20 object-contain"
          />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Well, I guess there is the problem with Billing 💸 or API
            fetching... 😩
            <br />
            <span className="font-satoshi font-normal text-red-300">
              {error?.data.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
