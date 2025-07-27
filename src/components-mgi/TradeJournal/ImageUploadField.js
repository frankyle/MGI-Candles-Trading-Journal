import React from 'react';

const ImageUploadField = ({ label, onChange }) => (
  <div>
    <label className="block text-gray-700 mb-1">
      {label}
    </label>
    <input type="file" accept="image/*" onChange={onChange} />
  </div>
);

export default ImageUploadField;
