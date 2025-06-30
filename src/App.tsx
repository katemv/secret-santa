import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateGroup from "./pages/CreateGroup";
import JoinGroup from "./pages/JoinGroup";
import GroupDashboard from "./pages/GroupDashboard";
import RevealPage from "./pages/RevealPage";
import WishlistAssistant from "./pages/WishlistAssistant";

function App() {
    return (
        <div className={"min-h-screen"}>
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