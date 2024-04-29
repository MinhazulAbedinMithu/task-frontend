"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import profileImg from "../../../assets/scores.png";
import { AUTH_API } from "@/apiConfig";
import Cookies from "js-cookie";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<any>({
    name: "",
    email: "",
    phone: "",
  });
  const cookieToken = Cookies.get("token") || "{}";
  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch(`${AUTH_API.PROFILE}`, {
        headers: {
          Authorization: `${cookieToken}`,
        },
      });
      const data = await res.json();

      setProfileData(data);
      console.log(data);
    };
    fetchTasks();
    //@ts-ignore
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="relative w-24 h-24 rounded-full overflow-hidden">
        <Image src={profileImg} alt="profile photo" layout="fill" />
      </div>
      <h2 className="text-2xl font-bold mt-4">{profileData.name}</h2>
      <p className="mb-2">{profileData.email}</p>
      <p className="mb-4">{profileData.phone}</p>
      {isEditing ? (
        <div className="flex flex-col items-center">
          <input
            type="text"
            value={profileData.name}
            onChange={(e) =>
              setProfileData({ ...profileData, name: e.target.value })
            }
            className="mb-2 border-b border-gray-400 focus:outline-none"
          />
          <input
            type="email"
            value={profileData.email}
            onChange={(e) =>
              setProfileData({ ...profileData, email: e.target.value })
            }
            className="mb-2 border-b border-gray-400 focus:outline-none"
          />
          <input
            type="tel"
            value={profileData.phone}
            onChange={(e) =>
              setProfileData({ ...profileData, phone: e.target.value })
            }
            className="mb-2 border-b border-gray-400 focus:outline-none"
          />
          <button
            onClick={handleSaveClick}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      ) : (
        <button
          onClick={handleEditClick}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default ProfilePage;
