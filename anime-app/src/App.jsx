import {Route, Routes} from "react-router-dom";
import Collection from "./Collection.jsx";
import Anime from "./Anime.jsx";
import SidebarWithHeader from "./components/SideBar.jsx";
import PageAnime from "./components/PageAnime.jsx";
import Popular from "./TopAnime.jsx";
import TopManga from "./TopManga.jsx";
import Login from "./components/Security/Login.jsx";
import Register from "./components/Security/Register.jsx";
import { createContext, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({children}) => {
    const [id, setId] = useState(1);

    return(
        <AppContext.Provider value={{id, setId}}>
            {children}
        </AppContext.Provider>
    )
}
function App () {
    return(
        <>
            <AppProvider>
                <Routes>
                        <Route path="/" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/anime" element={<Anime/>}/>
                        <Route path="/anime/:id" element={<PageAnime/>}/>
                        <Route path="/topAnime" element={<Popular/>}/>
                        <Route path="/topManga" element={<TopManga/>}/>
                        <Route path="/collection" element={<Collection/>}/>
                        <Route path="/side" element={<SidebarWithHeader/>}/>
                </Routes>
            </AppProvider>
        </>

    );

}
export default App;