import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainLayout from "../pages/Main"
import Main from "../pages/Main"
import Layout from "../layout/Layout"



const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Main />}/>
                </Route>            
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes