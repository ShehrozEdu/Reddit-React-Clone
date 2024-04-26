import axios from 'axios';
import React, { useState } from 'react';

const Demo = () => {
  const [title, setTitle] = useState('');
  const [post, setPost] = useState('');
  const [name, setName] = useState('');
  const [imageFiles, setImageFiles] = useState(null);
  const [isLoadingPost, setIsLoadingPost] = useState(false);
  const [errorPost, setErrorPost] = useState('');

  // const handleImageFilesChange = function (event) {
  //   setImageFiles(event.target.files);
  // };

  const addPostHandler = async (event) => {
    event.preventDefault(); 
  
    let formDataObject = new FormData(); // Define formDataObject here
  
    // if (imageFiles) {
    //   for (const image of imageFiles) {
    //     formDataObject.append("images", image);
    //   }
    // }
    
    formDataObject.append('title', title); // Append other form data fields
    formDataObject.append('content', post);
    formDataObject.append('name', name);
  
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://academics.newtonschool.co/api/v1/reddit/channel",
        formDataObject,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "t0v7xsdvt1j1",
          },
        }
      );
  
      console.log("Community created successfully:", response.data);
    } catch (error) {
      console.error("Error creating community:", error);
    }
  };
  



  return (
    <div>
      <h2>Create Community</h2>
      <form onSubmit={addPostHandler}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* <input
          type="file"
          id='images'
          multiple
          onChange={handleImageFilesChange}
        /> */}
        <button type="submit" >Create</button>
      </form>
    </div>
  );
};

export default Demo;
