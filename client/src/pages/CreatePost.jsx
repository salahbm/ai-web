import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import Loader from "../components/Loader";
import { getRandomPrompt } from "../utils";
import { preview } from "../assets";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      try {
        setLoading(true);
        const response = await fetch("http//:localhost:5175/api/v1/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        await response.json();
        navigate("/");
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt();
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImg = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch("http://localhost:5175/api/v1/dalle", {
          // Fix: Correct the URL
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error.message);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please Enter Prompt");
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-black text-[32px]">Create</h1>
        <p className="mt-1 pl-2 text-neutral-500 text-[16px] max-w-[500px]">
          Create Imaginative and Stunning Images with AI and share them with the
          Community
        </p>
      </div>
      <form action="submit" className="max-w-3xl mt-16" onClick={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Tony Stark"
            handleChange={handleChange}
            value={form.name}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A muscular man sitting in front of the computer"
            handleChange={handleChange}
            value={form.prompt}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-[#6469ff] focus:ring-blue-500 w-64 p-3 h-64 flex justify-center items-center mt-2">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}
            {generatingImg && (
              <div className="absolute flex justify-center items-center bg-[rgb(0,0,0,0.5)] inset-0 z-0">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="button "
            className="text-white bg-green-700 font-medium rounded-md sm:w-auto text-sm w-full text-center p-2"
            onClick={generateImg}
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>
        <div className="mt-2">
          <p className=" text-neutral-500 text-sm">
            Once you you have created Image that you want, you can share it with
            the Community
          </p>
          <button
            type="submit"
            disabled={form.photo}
            className="mt-2 text-white bg-[#6469ff] font-medium rounded-md text-md w-full sm:w-auto px-5 py-2 text-center"
          >
            {loading ? "Loading..." : "Share with the Community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
