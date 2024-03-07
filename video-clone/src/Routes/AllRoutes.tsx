import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import SinglePlayer from "../Pages/SinglePlayer";
// import {SinglePlayer} from "../Pages/SinglePlayer";
export default function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/singleplayer/:id" element={<SinglePlayer/>}/>
      </Routes>
    </div>
  )
}
