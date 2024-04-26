import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/App.css";
import Home from "./Home/Home";
import Aside from "./Navbar/Aside";
import Header from "./Navbar/Header";
import Premium from "../Premium/Premium";
import ResponsiveHeader from "./Home/ResponsiveHeader";
import { ContextAPIContext } from "./Context/ContextAPIContext ";

function App() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); 
  const{darkMode}=useContext(ContextAPIContext)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize); 
    };
  }, []);

  return (
    <div className= {`${darkMode ? 'bg-[#0B1416]' : "bg-white"}`}>
      {!isMobile && <Header />}
     {isMobile&& <ResponsiveHeader/>}
      <div className="flex relative">
        {location.pathname !== "/premium" ? (
          <>
         {!isMobile && <Aside />}
            <Home />
          </>
        ) : (
          <Premium />
        )}
      </div>
    </div>
  );
}

export default App;
