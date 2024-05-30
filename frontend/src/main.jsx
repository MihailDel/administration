import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './pages/Login';
import App from './App';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import MainPage from './pages/MainPage';
import Employees from './pages/Employees';
import Services from './pages/Services';
import Entries from './pages/Entries';
import AddService from './pages/AddService';
import Success from './pages/Success';
import UpdateServices from './pages/UpdateServices';
import AddEmployee from './pages/AddEmployee';
import UpdateEmployee from './pages/UpdateEmployee';
import AddEntry from './pages/AddEntry';
import UpdateEntry from './pages/UpdateEntry';
import ErrorPage from './pages/Error';
import EmployeesMinMax from './pages/EmployeesMinMax';

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: <Login />
			},
			{
				path: "main/",
				element: <MainPage />
			},
			{
				path: "employees/",
				children: [
					{
						index: true,
						element: <Employees />
					},
					{
						path: "addEmployee/",
						element: <AddEmployee />
					},
					{
						path: "update/:id",
						element: <UpdateEmployee />
					},
					{
						path: "minmax/",
						element: <EmployeesMinMax />
					}
				]
			},
			{
				path: "services/",
				children: [
					{
						index: true,
						element: <Services />
					},
					{
						path: "addServices/",
						element: <AddService />
					},
					{
						path: "update/:id",
						element: <UpdateServices />
					},
				]
			},
			{
				path: "entries/",
				children: [
					{
						index: true,
						element: <Entries />
					},
					{
						path: "addEntry/",
						element: <AddEntry />
					},
					{
						path: "update/:id",
						element: <UpdateEntry />
					}
				]
			},
			{
				path: "success/",
				element: <Success />
			}
			,
			{
				path: "error/",
				element: <ErrorPage />
			}
		]
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
)
