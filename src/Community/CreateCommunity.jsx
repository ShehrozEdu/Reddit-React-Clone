  import React, { useContext, useState } from "react";
  import axios from "axios";
  import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
  } from "@material-tailwind/react";
  import { ContextAPIContext } from "../components/Context/ContextAPIContext ";
import { toast } from "react-toastify";


  const CreateCommunity = () => {
    const {darkMode}=useContext(ContextAPIContext)
    const [communityName, setCommunityName] = useState("");
    const [inputFocused, setInputFocused] = useState(false); 
    const maxCharacters = 21;
    const [checked, setChecked] = useState(false);
    const [imageFiles, setImageFiles] = useState(null);

   
    const handleChangeInput = (e) => {
      // const inputText = e.target.value;
      // if (inputText.length <= maxCharacters && inputText.startsWith("r/")) {
      //   setCommunityName(inputText);
      // }
      setCommunityName(e.target.value)
    };

    const handleInputFocus = () => {
      setInputFocused(true);
    };

    const handleInputBlur = () => {
      setInputFocused(false);
    };

  
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);

    const handleCreateCommunity = async (event) => {
      event.preventDefault(); 
    
      const formDataObject = new FormData();
      // formDataObject.append('title', communityName);
      formDataObject.append('content', 'postContent');
      formDataObject.append('name', communityName);
    
      try {
        // const imageData = document.getElementById('images').files[0];
        formDataObject.append('images', "/images/svgs/defaultProfile.svg");
    
        const token = localStorage.getItem("token");
        
        if (!token) {
          
          toast.error("User is not logged in.");
          return;
        }
        
        const response = await fetch(
          "https://academics.newtonschool.co/api/v1/reddit/channel/",
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'projectId': 't0v7xsdvt1j1',
            },
            body: formDataObject,
          }
        );
    
        const data = await response.json();
        console.log("Community created successfully:", data);
        if(data.status==="success"){

          toast.success(`${data.data.name} has been created successfully!`)
        }else{
          toast.error(`Channel with this name already exists`)

        }
        setTimeout(() => {
         location.href="/" 
        }, 2000);
      } catch (error) {
        console.error("Error creating community:", error);
      }
    };
    
    return (
      <>
        <div
          onClick={handleOpen}
          className="flex text-black shadow-none items-center"
        >
          <img src={`${darkMode?"/images/svgs/darkModeSvgs/dark-plus.svg":"/images/svgs/plus.svg"}`} alt="" width={15} className="mr-2" />
          <span className="capitalize dark:text-white">Create Community</span>
        </div>
        <Dialog open={open} handler={handleOpen} className="dark:bg-[#0B1416]">
          <DialogHeader className="text-md font-normal text-black dark:text-white">
            Create a Community
          </DialogHeader>
          <hr />
          <DialogBody>
            <form>
              <div className="flex flex-col">
                <div className="text-black dark:text-white">Name</div>
                <div className="text-xs text-black dark:text-white">
                  Community names including capitalization cannot be changed.
                </div>
              </div>
              <div className="w-72 ">
                <Input
                  type="text"
                  id="communityName"
                  value={communityName}
                  onChange={handleChangeInput}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  placeholder="r/"
                  className="border border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:border-gray-900 focus:border-t-gray-900 focus:ring-gray-900/10"
                />
                {inputFocused && communityName.length === 2 && (
                  <p className="text-red-500 text-sm">
                    A community name is required
                  </p>
                )}
                <p className="text-xs text-black">
                  {maxCharacters - communityName.length} Characters remaining
                </p>
                {!inputFocused && communityName.length === 2 && (
                  <p className="text-red-500 text-sm invisible">
                    A community name is required
                  </p>
                )}
                <div className="flex flex-col items-center justify-start xl:w-[33rem] lg:w-[33rem] w-96">
                  <div>
                    <p className="font-normal text-black dark:text-white">Community type</p>
                    <div>
                      <label className="block mb-2 dark:text-white">
                        <input
                          type="radio"
                          name="access"
                          value="public"
                          className="mr-2"
                        />
                        <strong className="text-black mr-2 dark:text-white">Public</strong>{" "}
                        <span className="text-sm text-black dark:text-white">
                          {" "}
                          Anyone can view, post, and comment to this community
                        </span>
                      </label>

                      <label className="block mb-2 dark:text-white">
                        <input
                          type="radio"
                          name="access"
                          value="restricted"
                          className="mr-2"
                        />
                        <strong className="text-black mr-2 dark:text-white">Restricted</strong>{" "}
                        <span className="text-sm text-black dark:text-white">
                          {" "}
                          Anyone can view this community, but only approved users
                          can post
                        </span>
                      </label>

                      <label className="block mb-2 dark:text-white">
                        <input
                          type="radio"
                          name="access"
                          value="private"
                          className="mr-2"
                        />
                        <strong className="text-black mr-2 dark:text-white">Private</strong>{" "}
                        <span className="text-sm text-black dark:text-white">
                          {" "}
                          Only approved users can view and submit to this community
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <p className="text-black font-normal dark:text-white">Adult content</p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => setChecked(!checked)}
                      className="form-checkbox h-4 w-5 text-red-500"
                    />
                    <span className="inline-block p-0.5 bg-red-500 text-white rounded ">
                      NSFW
                    </span>
                    <span className="text-black dark:text-white">18+ year old community</span>
                  </div>
                </div>
              </div>
            </form>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="blue"
              onClick={handleOpen}
              className="mr-1 capitalize rounded-3xl border border-blue-700"
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="gradient"
              color="blue"
              onClick={handleCreateCommunity}
              className="rounded-3xl"
            >
              <span className="capitalize">Create Community</span>
            </Button>
          </DialogFooter>
        </Dialog>

      </>
    );
  };

  export default CreateCommunity;
