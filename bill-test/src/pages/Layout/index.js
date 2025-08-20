import { Outlet } from "react-router-dom";
import { Button } from "antd-mobile";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { getBillList } from "@/store/modules/billStore";
const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log('Fetching bill list...');
    dispatch(getBillList());
  }, [dispatch]);

  return (
    <div>
      <header>
        <Outlet />
        <h1>My Application</h1>
      </header>
      <main>
        <p>Welcome to my application!</p>

      </main>
      <Button color="primary">Click Me</Button>

      <footer>
        <p>© 2023 My Application</p>
      </footer>
    </div>
  );
};

export default Layout;