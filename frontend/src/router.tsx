import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { MainPage } from "./pages/mainpage.tsx";


export const Router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<MainPage />}>
		</Route>
	)
);

