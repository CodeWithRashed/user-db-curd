import { Spin } from 'antd';

const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col gap-2 justify-center items-center">
    <Spin />
    <p>Loading...</p>
  </div>
);

export default LoadingSpinner;