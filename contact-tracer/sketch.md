# Contact Tracer Application - Notes

The Frontend is served on the server-endpoint `/` and is an SPA powered by React.

**Requirements**

* Login System (with Registration) -> OAuth2
* Show Content only to authorized users
* Each user has its own data (contacts)
    * Add, Remove, Delete and Alter Data
        * (optional) allow only on own endpoint(s)
        * (optional) implement an administrator
    * Form to do so
    * Filtering contacts (frontend)
* State Management 
* Routes and Protected Routes

**Database**

![alt text](tables.png "Relationship")

**API Endpoints (Backend)**

Login System
* Login with Github: `/oauth2/authorization/github`
* Logout of any service (POST): `/logout` <!-- TODO: HTTP 404 Not Found Custom Error (Not found does not return any JSON Data!), same with /login --> 
* Authorization errors: `/error` <!-- TODO: HTTP 999 map to Not found -->
* Try To Access Data when unauthenticated: redirect to homepage with message you have to be logged in (see TODO in spring)

REST
* Root: `/api`
* contacts (this options be useful for an Admin): `/api/contacts{?page,size,sort}`
    * "all contacts" (5 contacts per page):  `/api/contacts?page=0&size=5`
        * option to sort: -> `&sort=date` or `&sort=date,desc`
    * list contact with id=1: `/api/contacts/1`
    
* users:
    * logged in user: `/user` (returns email)
    * get userid from user (by email): `/userid?email=loggedInUserEmail`
    * 1:n to contacts - get all contacts from user with id=1: `/api/users/1/contacts`
        * sadly, paging and sorting does not work here - have to implement it by myself
    * Add contacts for user with id=1 (POST + PUT):
        1. post to the contacts repo without Relation (user_id is NULL): POST `/api/contacts`
        2. get reference of created resource: `const ref = req.data._links.user.href;`
        3. get the id of currently logged user (byEmail - se above endpoint)
        4. Set Relation using: PUT `/api/users/{id}` with `"Content-Type": "text/uri-list"`


* *API queries should be accessible via Relationships (HATEOAS principle)*

* *Implementing XSS and XSRF Protection*

* *Implement Try/Catch Blocks when doing requests from client -> Handle Errors with header status*

**Designing the store (Redux)**

