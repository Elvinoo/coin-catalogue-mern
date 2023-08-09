import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Main/HomePage/HomePage";
import React /* , { useEffect } */ from "react";

//import CoinDescription from "./Pages/Main/CoinsDescription/CoinDescription";
import ListOfCoins from "./Pages/Main/ListOfCoins/ListOfCoins";
import CoinsByCategory from "./Pages/Main/ShowAll/CoinsByCategory";
import AdminPanelLogin from "./Pages/AdminPage/Login/AdminPanelLogin";
import AdminPanelEdit from "./Pages/AdminPage/EditCoins/AdminPanelEdit";
import EditCoin from "./Pages/AdminPage/CoinEditing/EditCoin";
import CoinDescription from "./Pages/Main/CoinDescription/CoinDescription";
import AdvancedSearchPage from "./Pages/Main/ADV-Filter/AdvancedSearchPage";
import AdminPanelAdd from "./Pages/AdminPage/AddCoin/AdminPanelAdd";
//import Register from "./Pages/AdminPage/Register/Register";
//import { fetchData } from "./Redux/Features/dataSlice/dataSlice";
import { /* useDispatch, */ useSelector } from "react-redux";

function App() {
  const data = useSelector((state) => state.data);
  const coins = data.slice(0, 3);
  /*  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]); */
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage coins={coins} />} />
          {/* <Route path="/elvin" element={<Elvin />} /> */}
          <Route path="/adv-search" element={<AdvancedSearchPage />} />
          <Route path="/coins/:category" element={<CoinsByCategory />} />
          <Route path="/coin/:id" element={<CoinDescription />} />
          <Route path="/search" element={<ListOfCoins />} />
          <Route path="/admin-panel/login" element={<AdminPanelLogin />} />
          {/*   <Route path="/admin-panel/register" element={<Register />} /> */}
          <Route path="/admin-panel/editCoin" element={<AdminPanelEdit />} />
          <Route path="/admin-panel/editCoin/:id" element={<EditCoin />} />
          <Route path="/admin-panel/addCoin" element={<AdminPanelAdd />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
