import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { MainPage } from "../pages/mainpage.tsx";
import { About } from "../pages/about.tsx";


export const Router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<MainPage />}>
			<Route path="/about" element={<About />} />
		</Route>
	)
);

