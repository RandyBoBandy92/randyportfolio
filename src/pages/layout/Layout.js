import { Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header>
        <img src="" alt="" />
      </header>
      <main>
        {/* want to embed https://github.dev/RandyBoBandy92/moviedatabase */}
        <h1>Movie Database</h1>
        {/* how do i embed that website within this page? */}
        <iframe
          style={{ height: "500px", width: "100%" }}
          title="Movie Database"
          src="https://github1s.com/RandyBoBandy92/moviedatabase"
          frameborder="0"
        />
      </main>
      <footer>
        <nav>
          <ul>
            <li>About</li>
            <li>Contact</li>
            <li>Projects</li>
            <li>
              <a href="https://blog.randygulak.com">Blog</a>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
};

export default Layout;
