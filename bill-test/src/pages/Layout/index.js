import { Outlet } from "react-router-dom";
import { Button } from "antd-mobile";
const Layout = () => {
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