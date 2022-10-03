import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setProfileRoute } from "../utils/APIRouters";
export const SetProfile = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  }, []);

  const setProfilePicture = async () => {
    if (selectedProfile === undefined) {
      toast.error("Please select an Profile", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      // console.log("user", user);
      const { data } = await axios.post(`${setProfileRoute}/${user._id}`, {
        image: profiles[selectedProfile],
      });
      // console.log("imageData", data);
      if (data.isSet) {
        user.isProfileImageSet = true;
        user.profileImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting Profile. Please try again.", toastOptions);
      }
    }
  };
  const getData = async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      await axios
        .get(`https://source.unsplash.com/random/200x200?sig=${i}`)
        .then((res) => {
          // console.log("res",res.data)
          data.push(res.request.responseURL);
        });
    }
    setProfiles(data);
    setIsLoading(false);
  };
  useEffect(() => {
    getData();
    // console.log("profiles_11",profiles);
  }, []);

  // console.log("profiles", profiles);

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick any image for your profile picture</h1>
          </div>
          <div className="profiles">
            {profiles?.length > 0 &&
              profiles.map((elem, index) => {
                return (
                  <div
                    key={index}
                    className={`profile ${
                      selectedProfile === index ? "selected" : ""
                    }`}
                  >
                    <img
                      src={`${elem}`}
                      alt="Profile_error"
                      key={index}
                      onClick={() => setSelectedProfile(index)}
                    />
                  </div>
                );
              })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 90vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .profiles {
    display: flex;
    gap: 2rem;
    .profile {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        border-radius: 50%;
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
