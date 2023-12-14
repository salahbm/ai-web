import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import FormField from '../components/FormField'

const CreatePost = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name:'',
    prompt:"",
    photo:""
  })
  const [generatingImg, setGeneratingImg] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleSubmit=()=>{}
  const handleChange=()=>{}
  const handleSurpriseMe=()=>{}
  return (
<section className='max-w-7xl mx-auto'>
<div>
        <h1 className="font-extrabold text-black text-[32px]">
Create
        </h1>
        <p className="mt-1 pl-2 text-neutral-500 text-[16px] max-w-[500px]">
         Create Imaginative and Stunning Images with AI and share them with the Community
        </p>
      </div>
      <form action="submit" className='max-w-3xl mt-16' onClick={handleSubmit}>

<div className='flex flex-col gap-5'></div>
<FormField labelName='Your Name' type='text' name='name' placeholder='Tony Stark' handleChange={handleChange} value={form.name}/>
<FormField labelName='Prompt' type='text' name='prompt' placeholder='A muscular man sitting in front of the computer' handleChange={handleChange} value={form.prompt} handleSurpriseMe={handleSurpriseMe}/>
      </form>
</section>
  )
}

export default CreatePost