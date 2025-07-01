import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import CreateGroup from "./pages/CreateGroup";
import JoinGroup from "./pages/JoinGroup";
import GroupDashboard from "./pages/GroupDashboard";
import RevealPage from "./pages/RevealPage";
import WishlistAssistant from "./pages/WishlistAssistant";
import { Header } from "@/components/Header.tsx";

function App() {
    const location = useLocation();

    return (
        <div className={"min-h-screen"}>
            {location.pathname !== "/" && (
                <Header />
            )}
            <main>
                <Routes>
                    <Route path={"/"} element={<Home />} />
                    <Route path={"/create"} element={<CreateGroup />} />
                    <Route path={"/join"} element={<JoinGroup />} />
                    <Route path={"/group/:groupId"} element={<GroupDashboard />} />
                    <Route path={"/reveal/:uniqueId"} element={<RevealPage />} />
                    <Route path={"/wishlist"} element={<WishlistAssistant />} />
                </Routes>
            </main>
        </div>
    );
}

export default App; 