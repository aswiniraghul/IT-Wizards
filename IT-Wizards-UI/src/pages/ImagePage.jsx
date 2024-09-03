import { useEffect, useState } from 'react';
import { getImages } from '../services/imageService';
import { Buffer } from 'buffer';

const ImagePage = () => {
  const [images, setImages] = useState('');

  useEffect(() => {
    fetchImages();
  });

  const fetchImages = async () => {
    try {
      const data = await getImages();
      // console.log(data);
      setImages(data);
      console.log(images);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }

    // } finally {
    //   setLoading(false);
    // }
  };

  // const base64Flag = 'data:image/jpeg;base64,';
  

  // const image = new Blob(images, {type: 'image/jpeg'})

  // const imageURL = URL.createObjectURL(image);

  return (
    <div className="mt-5">
      <h1 className="text-center">View Images</h1>
      <div className="container">
        <div className="my-3">
          <a href="images/add">
            <button type="button" className="btn btn-primary">
              Add Image
            </button>
          </a>
        </div>
        <table className="table border">
          <thead>
            <tr>
              <th scope="col">Image</th>
            </tr>
          </thead>

          <tbody>
            {/* {images.map((image) => ( */}
            <tr>
              <td>
                <img
                  height="250px"
                  width="250px"
                  // src={`data:image/jpeg;base64,charset=utf-8;${imageStr}`}
                  src='http://localhost:8080/images/display?id=1'
                ></img>
              </td>
            </tr>
            {/* ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ImagePage;
