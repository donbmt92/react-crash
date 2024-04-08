import MainHeader from '../components/MainHeader';
import { Outlet } from 'react-router-dom';
function RootLayout(params) {
  return (
    <>
      <MainHeader />
      <Outlet/>
    </>
  );
}
export default RootLayout