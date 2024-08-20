import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const UnauthorizedPage = () => {
  return (
    <section className="bg-purple-400 text-center py-96 flex flex-col justify-center items-center h-96">
      <div className='absolute flex flex-col justify-center items-center'>
        <FaExclamationTriangle className=" text-red-600 text-6xl mb-4" />
        <h1 className="text-white text-6xl font-bold mb-4">Unauthorized</h1>
        <p className="text-xl text-white mb-5">You do not have access to view this page!</p>
        <Link
          to="/"
          className="text-white bg-indigo-700 hover:bg-indigo-900 rounded-md px-3 py-2 mt-4"
        >
          Return to Shop
        </Link>
      </div>
    </section>
  );
};

export default UnauthorizedPage;
