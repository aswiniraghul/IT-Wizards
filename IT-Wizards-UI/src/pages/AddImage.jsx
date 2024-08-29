import axios from 'axios';

const AddImage = () => {
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/images/add`, 'image');
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
              class="form-control"
              id="image"
              name="image"
              aria-describedby="inputGroupFileAddon04"
              aria-label="Upload"
              required="required"
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
