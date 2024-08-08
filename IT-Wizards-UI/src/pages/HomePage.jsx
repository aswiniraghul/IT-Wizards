import LeftSidebar from '../components/LeftSidebar';
import ItemDisplay from '../components/ItemDisplay';
import RightSidebar from '../components/RightSidebar';

const HomePage = () => {
  return (
    <div className="flex flex-row h-[calc(100vh-5rem)]">
      <div className="w-1/12">
        <LeftSidebar />
      </div>
      <div className="w-5/6 overflow-y-auto">
        <ItemDisplay />
      </div>
      <div className="w-1/12">
        <RightSidebar />
      </div>
    </div>
  );
};

export default HomePage;
