import React, { useEffect, useState } from "react";
import FormField from "../components/FormField";
import Loader from "../components/Loader";
import Card from "../components/Card";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0)
    return data.map((post) => <Card key={post._id} {...post} />);
  return (
    <h2 className="text-[#6449ff] mt-5 text-bold text-xl uppercase">{title}</h2>
  );
};
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5175/api/v1/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item?.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item?.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <section className=" max-w-7xl mx-auto">
      <div className="flex items-center justify-center flex-col">
        <h1 className="font-extrabold text-black text-[32px]">
          The Community Show Case
        </h1>
        <p className="mt-1 pl-2 text-neutral-500 text-[16px] max-w-[500px]">
          Browse through the stunning images generated by AI{" "}
        </p>
      </div>
      <div className="mt-16">
        <FormField
          labelName={"Search Posts"}
          handleChange={handleSearchChange}
          type={"text"}
          name={"text"}
          placeholder={"Search Posts"}
          value={searchText}
        />
      </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-neutral-500 text-xl mb-3">
                Showing Result For{" "}
                <span className="text-black">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3 ">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title={"No search results found"}
                />
              ) : (
                <RenderCards data={allPosts} title="No posts are found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
