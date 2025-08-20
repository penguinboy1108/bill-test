import { Outlet } from "react-router-dom";
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

      <footer>
        <p>© 2023 My Application</p>
      </footer>
    </div>
  );
};

export default Layout;