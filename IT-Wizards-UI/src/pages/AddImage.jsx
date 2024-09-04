import axios from 'axios';
import { useState } from 'react';

const AddImage = () => {
  const [newImage, setNewImage] = useState()
  const formData = new FormData();

    const onInputChange = (e) => {
      setNewImage(e.target.value);
    };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const file = document.getElementById('image').files[0];
    formData.append('image', file);

    try {
      await axios.post('http://localhost:8080/images/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className="my-5">
      <div className="mx-auto w-25 ">
        <h2 className="text-center mb-3">Add Image</h2>
        <form onSubmit={(e) => handleOnSubmit(e)} encType="multipart/form-data">
          <div className="input-group">
            <input
              type="file"
              className="form-control"
              id="image"
              name="image"
              aria-describedby="inputGroupFileAddon04"
              aria-label="Upload"
              required="required"
              onChange={(e) => onInputChange(e)}
            />
            <button className="btn btn-outline-secondary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddImage;
