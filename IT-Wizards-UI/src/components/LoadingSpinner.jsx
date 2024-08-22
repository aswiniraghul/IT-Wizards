import MoonLoader from 'react-spinners/MoonLoader';

const override = {
  display: 'block',
  margin: '100px auto',
};

const LoadingSpinner = ({ loading }) => {
  return (
    <MoonLoader
      color="#a3e635"
      loading={loading}
      cssOverride={override}
      size={120}
    />
  );
};

export default LoadingSpinner;
