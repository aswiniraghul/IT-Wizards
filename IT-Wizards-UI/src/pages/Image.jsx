import { useEffect, useState } from 'react';
import { getImages } from '../services/imageService';

const Image = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  });

  const fetchImages = async () => {
      try {
          const data = await getImages(1);
          setImages(data);
      } catch (error) {
          console.error('Failed to fetch data', error);
      }
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="mt-5">
      <h1 className="text-center">View Images</h1>
      <div className="container">
        <div className="my-3">
          <a href="/add">
            <button type="button" className="btn btn-primary">
              Add Image
            </button>
          </a>
        </div>
        <table className="table border">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Image</th>
              <th scope="col">Created AT</th>
            </tr>
          </thead>

          <tbody>
            {/* {images.map((image) => ( */}
            <tr>
              <td>{images.id}</td>
              <td>
                <img height="250px">{images.data}</img>
              </td>
              <td>{images.date}</td>
            </tr>
            {/* ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Image;
