import React from "react";

const Hero = () => {
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <h1 className="head_text">
        Summarize Articles with <br className="max-md:hidden" />
        <span className="orange_gradient ">OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">
        Simplify your reading with Summarize, an open-source article summarizer
        that transforms lengthy articles into clear and concise summaries
      </h2>
      <h2 className="desc">
        Please copy and paste desired link from article or website, and AI model
        will give you summary of the link
      </h2>
    </div>
  );
};

export default Hero;
