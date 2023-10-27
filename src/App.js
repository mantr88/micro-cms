import React, { Suspense, lazy, useEffect, useState } from "react";
import {
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loyout from "./components/Loyout/Loyout";
import Home from "./tabs/Home";

function App() {
  const [tabs, setTabs] = useState([]);
  const [currentTab, setCurrentTab] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { tabId } = useParams();
  console.log("🚀 ~ file: App.js:27 ~ App ~ tabId:", tabId);

  useEffect(() => {
    fetch("https://65398a9fe3b530c8d9e87f25.mockapi.io/tabs")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTabs(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (currentTab === null) return;
    loadTab(currentTab);
    renderTab();
  }, [currentTab]);

  const loadTab = (currentTab) => {
    import(`./${currentTab.path}`)
      .then(() => navigate(`/${currentTab.id}`))
      .catch((error) => console.log(`Error loading tab: ${error}`));
  };

  const renderTab = () => {
    console.log(`${tabs}`);
    const tab = tabs.find((t) => t.id === tabId);
    console.log(`in renderTab: ${tab}`);
    if (tab) {
      return (
        <Suspense fallback={<div>LOADING...</div>}>
          {lazy(() => import(`./${tab.path}`))}
        </Suspense>
      );
    } else {
      return <div>Not Found</div>;
    }
  };

  return (
    <div>
      <Link to={"/"}>Home</Link>
      <ul>
        {tabs.map((tab) => (
          <li key={tab.id} onClick={() => setCurrentTab(tab)}>
            <Link to={`/${tab.id}`}>{tab.title}</Link>
          </li>
        ))}
      </ul>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:tabId" element={renderTab()} />
      </Routes>
      {location.pathname === "/" && <p>Select a tab to view its content</p>}
      <Outlet />
    </div>
  );
}

export default App;
