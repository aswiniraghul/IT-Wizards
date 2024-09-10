import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getImages } from '../services/imageService';

const ImagePage = () => {
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const data = await getImages();
      // console.log(data);
      setImageList(data);
      console.log(imageList);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }

    // } finally {
    //   setLoading(false);
    // }
  };

  const imgBaseURL = 'http://localhost:8080/images/display'

  return (
    <div className="mt-5">
      <h1 className="text-center">View Images</h1>
      <div className="container">
        <div className="my-3">
          <Link to="/images/add">
            <button type="button" className="btn btn-primary">
              Add Image
            </button>
          </Link>
        </div>
        <table className="table border">
          <thead>
            <tr>
              <th scope="col">Image</th>
            </tr>
          </thead>

          <tbody>
            {imageList.map((image, index) => (
            <tr key={index}>
              <td>
                <img
                  height="250px"
                  width="250px"
                  src={`${imgBaseURL}?id=${image}`}
                  // src='http://localhost:8080/images/display?id=1'
                ></img>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ImagePage;
