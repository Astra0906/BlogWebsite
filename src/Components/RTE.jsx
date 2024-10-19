import React from 'react';
import { Controller } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
// Import the CSS for Quill

const RTE = ({ name, control, defaultValue = "", label }) => {
  return (
    <div className='w-full'>
      {label && <label className='inline-block text-blue-200 font-semibold mb-1 pl-1'>{label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <ReactQuill
            value={value}
            onChange={onChange}
            modules={{
              toolbar: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                ['link', 'image'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['clean']
              ],
            }}
            className='bg-white text-black'
            style={{ height: '500px' }} // Customize height
          />
        )}
      />
    </div>
  );
};

export default RTE;
