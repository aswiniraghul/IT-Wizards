import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <section className="text-center bg-purple-400 py-96 flex flex-col justify-center items-center h-96">
      <div>
        <FaExclamationTriangle className="container text-yellow-400 items-center text-6xl" />
        <h1 className="text-6xl font-bold my-4">404 Not Found</h1>
        <p className="text-xl font-semibold mb-10">This page does not exist</p>
        <Link
          to="/"
          className="text-white bg-indigo-700 hover:bg-indigo-900 rounded-md px-3 py-2 mt-4"
        >
          Return to shop
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
