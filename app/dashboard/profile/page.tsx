'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import profileImg from '../../../assets/scores.png';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Tultuli');
  const [email, setEmail] = useState('tultuli@gmail.com');
  const [phone, setPhone] = useState('01100000000');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <div className='flex flex-col items-center p-4'>
      <div className='relative w-24 h-24 rounded-full overflow-hidden'>
        <Image src={profileImg} alt='profile photo' layout='fill' />
      </div>
      <h2 className='text-2xl font-bold mt-4'>{name}</h2>
      <p className='mb-2'>{email}</p>
      <p className='mb-4'>{phone}</p>
      {isEditing ? (
        <div className='flex flex-col items-center'>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='mb-2 border-b border-gray-400 focus:outline-none'
          />
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='mb-2 border-b border-gray-400 focus:outline-none'
          />
          <input
            type='tel'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className='mb-2 border-b border-gray-400 focus:outline-none'
          />
          <button
            onClick={handleSaveClick}
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
          >
            Save
          </button>
        </div>
      ) : (
        <button
          onClick={handleEditClick}
          className='bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300'
        >
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default ProfilePage;
