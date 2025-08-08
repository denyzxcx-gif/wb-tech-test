import { Routes, Route, Navigate } from "react-router";
import UsersTableDisplay from "./pages/UsersTableDisplayPage";
import UserInfoPage from "./pages/UserInfoPage";

interface RouteConfig {
    name: string;
    path: string;
    element: React.ReactNode; // Добавим элемент, который будет рендериться
}

const routes: RouteConfig[] = [
    {
        name: "Home",
        path: "/",
        element: <Navigate to="/users" />,
    },
    {
        name: "UsersTableDisplay",
        path: "users",
        element: <UsersTableDisplay />,
    },
    {
        name: "UserInfo",
        path: "users/:userId",
        element: <UserInfoPage />,
    },
];

function App() {
    return (
        <>
            <main>
                <Routes>
                    {routes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={route.element}
                        />
                    ))}
                </Routes>
            </main>
        </>
    );
}

export default App;
