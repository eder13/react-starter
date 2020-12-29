import React, {useState, useEffect, Fragment} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

// specify root api rest path
const root = '/api';

// add xsrf cookie to every stuff
axios.interceptors.request.use((req) => {
	if (
		req.method === "post" ||
		req.method === "delete" ||
		req.method === "put" ||
		req.method === "patch"
	) {
		// check if relative to url only
		if (!(/^http:.*/.test(req.url) || /^https:.*/.test(req.url))) {
			req.headers.common = {
				...req.headers.common,
				"X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
			};
		}
	}

	return req;
});

const App = () => {

	const [user, setUser] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [errorLogging, setErrorLogging] = useState("");

	const logout = async (e) => {
		await axios.post("/logout");
		window.location.href = "http://localhost:8081";
	};

	const addExampleData = async (e) => {
		const req = await axios.post("/api/contacts", {
			firstName: "Irvin",
			lastName: "Konjic",
			email: "irvin.konjic@gmail.com",
			date: "2020-12-23",
		}, {
			headers: {
				"Content-Type": "application/json"
			}
		});

		// get reference link of created resource
		const ref = req.data._links.user.href;

		// get email from logged user
		const req2 = await axios.get("/user");
		const { email } = req2.data;

		// get id from logged in user
		const req3 = await axios.get(`/userid?email=${email}`);
		const { id } = req3.data;

		// connect the created contact with the logged in user
		const resp = await axios.put(ref, `/api/users/${id}`, {
			headers: {
				"Content-Type": "text/uri-list"
			}
		});
	}

	useEffect(() => {

		const loadData = async () => {
			return await axios.get("/user");
		}

		loadData().then(async (userData) => {
			setUser(userData.data.email);
			setIsLoggedIn('succeeded');
		}).catch(async e => {
			setIsLoggedIn('failed');
			const req = await axios.get("/error");
			if(req.data !== "") {
				setErrorLogging(req.data);
			}
		});

	}, []);

	useEffect(() => {

		if(isLoggedIn === 'succeeded')
			setIsLoading(false);

		if(isLoggedIn === 'failed')
			setIsLoading(false);

	}, [isLoggedIn])

	if(isLoading) {
		return (
		  <b>Loading ...</b>
		);
	} else {
		if(isLoggedIn === 'succeeded') {
			return (
				<Fragment>
					<div>Hello {user}</div>
					<button onClick={addExampleData}>Add Data</button>
					<button onClick={logout}>Logout</button>
				</Fragment>
			);
		} else {
			return(
				<Fragment>
					<h1>Login</h1>
					<strong style={{color: 'red'}}>
						{ errorLogging !== "" ? errorLogging : "" }
					</strong>
					<div className="container">
						<div>
							With GitHub: <a href="/oauth2/authorization/github">click here</a>
						</div>
					</div>
				</Fragment>
			);
		}
	}
}

export default App;