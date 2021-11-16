import { lazy, Suspense } from 'react'
import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";
const JSProfiling = lazy(() => import("./js-profiling"));
const ReactProfiling = lazy(() => import("./react-profiling"));


function Nav() {
  return (
    <div>
      <h1>Click a link below to start a scenario</h1>
      <ul>
        <li>
          <NavLink to="/js-profile">Javascript profiling</NavLink>
        </li>
        <li>
          <NavLink to="/react-profile">React profiling</NavLink>
        </li>
      </ul>
    </div>
  );
}

function BackHome() {
  return <Link to="/">Back home</Link>;
}

export default function App() {
  return (
    <BrowserRouter>
      <BackHome />
      <Suspense fallback="Loading example">
        <Routes>
          <Route path="/" element={<Nav />} />
          <Route path="/js-profile" element={<JSProfiling />} />
          <Route path="/react-profile" element={<ReactProfiling />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
