import "../styles/App.css";
import Home from "./Home/Home";
import Aside from "./Navbar/Aside";
import Header from "./Navbar/Header";

function App() {
  return (
    <div className="">
      <Header />
      <div className="flex relative">

      <Aside/>
      <Home/>

      </div>
    </div>
  );
}

export default App;
