import React, {useState, useEffect, Fragment} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Modal from 'react-modal';
import EmployeeList from "./components/EmployeeList";

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

	const [employees, setEmployees] = useState([]);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastname] = useState("");
	const [description, setDescription] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [pageSize, setPageSize] = useState(5);
	const [links, setLinks] = useState({ first: null, next: null, prev: null, last: null });
	const [modalIsOpen, setIsOpen] = useState(false);
	const [user, setUser] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [errorLogging, setErrorLogging] = useState("");

	Modal.setAppElement('#root');

	const openModal = () => {
		setIsOpen(true);
	}

	function closeModal(){
		setIsOpen(false);
	}

	const updateTable = async (e) => {
		console.log(e.target.id);
		const data = await loadFromServer(e.target.id);
		updateState(data);
	}

	const removeEntry = async (e) => {
		await deleteFromServer(e.target.id);
		const data = await loadFromServer({rel: 'employees', params: {size: pageSize, sort: 'firstName,desc'}});
		updateState(data);
	}

	const formChange = (e) => {
		if(e.target.id === "firstName") {
			setFirstName(e.target.value);
		} else if(e.target.id === "lastName") {
			setLastname(e.target.value);
		} else {
			setDescription(e.target.value);
		}
	}

	const logout = async (e) => {
		await axios.post("/logout");
		window.location.href = "http://localhost:8081";
	};

	const addEmployee = (e) => {
		// make a post with axios
		addToServer({rel: 'employees'}, {firstName, lastName, description}).then(() => {
			closeModal();
			setDescription("");
			setLastname("");
			setFirstName("");
		});

		e.preventDefault();
	}

	const updateState = (data) => {
		const { first, next, prev,  last } = data._links;
		const { number, totalPages } = data.page;

		// "first case"
		if(next && !prev) {
			setLinks({first, next, prev: null, last});
		}
		// "middle case"
		else if(next && prev) {
			setLinks({first, next, prev, last});
		}
		// "last case"
		else if(!next && prev) {
			setLinks({first, next: null, prev, last});
		} else {
			setLinks({first: null, next: null, prev: null, last: null});
		}

		setEmployees(data._embedded.employees);
		setCurrentPage(number+1);
		setTotalPages(totalPages);
	}

	useEffect(() => {

		const loadData = async () => {
			// could also load more data -> array in loadFromServer -> with reduce method (givin root response) - iterate every response
			const data = await loadFromServer({rel: 'employees', params: {size: pageSize, sort: 'firstName,desc'}});
			console.log(data);
			return data;
		}

		loadData().then(async (data) => {
			updateState(data);
			const userData = await axios.get("/user");
			setUser(userData.data.name);
			setIsLoggedIn('succeeded');
		}).catch(async e => {
			console.info(e.toString());
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
					<button onClick={logout}>Logout</button>
					<div>page {currentPage} of {totalPages}</div>
					<button onClick={openModal}>Add</button>
					<Modal isOpen={modalIsOpen}
						   onRequestClose={closeModal}
						   contentLabel="Alter Modal"
					>
						<h2>Create new Employee</h2>
						<form>
							<input id="firstName" onChange={formChange} type="text" placeholder="first name"/>
							<input id="lastName" onChange={formChange} type="text" placeholder="last name"/>
							<input id="description" onChange={formChange} type="text" placeholder="description name"/>
						</form>
						<button style={{ color: 'red' }} onClick={closeModal}>discard</button>
						<button onClick={addEmployee}>add</button>
					</Modal>
					<EmployeeList employees={employees} links={links} updateTable={updateTable} removeEntry={removeEntry} />
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

const loadFromServer = async (apiCall) => {

  // root api call
  const resp = await axios.get(root);
  const rootResp = resp.data;
  console.log(rootResp);

  // api call with parameter/endpoint
  const rel = typeof apiCall === 'string' ? apiCall : apiCall.rel;
  const a = await traverseNext(rootResp, rel, apiCall);
  console.log(a);
  return a;

}

const deleteFromServer = async (href) => {
	const resp = await axios.delete(href);
	console.log(resp.status);
}

const addToServer = async (apiCall, data) => {
	console.log(root + "/" + apiCall.rel);
	console.log(data);
	const resp = await axios.post(root + "/" + apiCall.rel, data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
	console.log(resp.status);
}

function traverseNext (rootResp, rel, endpoint) {

	const func1 = async (rootResp, rel) => {
		const resp = await axios.get(rel);
		return resp.data;
	}

	const func2 = async (rootResp, rel, params) => {

		const resp = await axios.get(rootResp._links[rel].href.replace(/{\?.*}/, ""), { params, headers: { 'Accept': 'application/hal+json' } });
		return resp.data;
	}

	if (hasEmbeddedRel(rootResp, rel)) {
		console.log("hasEmbeddedRel");
		return rootResp._embedded[rel];
	}

	if(!rootResp._links) {
		console.error("no _links! Got no HAL formatted response! Please setup backend!");
		return [];
	}

	// case, URL was appended only
	if (typeof endpoint === 'string') {
		console.log("This will not kick in because it's object");
		return func1(rootResp, rel);
	}
	// case with parameters - e.g. /api/employees
	else {
		console.log("It will try to do this i guees");


		return func2(rootResp, rel, endpoint.params)
	}
}

function hasEmbeddedRel (rootResp, rel) {
	return rootResp._embedded && rootResp._embedded.hasOwnProperty(rel);
}

export default App;