import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Main
import Lobby from "./Components/Lobby/Lobby";
import Booth from "./Components/Booth/Booth";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register";
import Testing from "./Components/NotFound/Testing";
import NotFound from "./Components/NotFound/NotFound";
import PageNotFound from "./Components/NotFound/PageNotFound";
import Events from "./Components/EventPage/EventPage.jsx";
import IntoBooth from "./Components/Booth/IntoBooth/Main.jsx";
import VideoPpt from "./Components/EventPage/Components/VideoPpt";
import Networking from "./Components/Networking/Networking";

// Admin
import BoothList from "./Components/Admin/BoothList";
import CreateBooth from "./Components/Admin/CreateBooth";
import EditBooth from "./Components/Admin/EditBooth/EditBooth";

// Client Booth
import ClientBoothList from "./Components/Client/BoothList";
import ClientCreateBooth from "./Components/Client/CreateBooth";
import ClientEditBooth from "./Components/Client/EditBooth/EditBooth";

// Client Theater
import ClientTheaterList from "./Components/Client/EditTheater/TheaterList";
import ClientCreateTheater from "./Components/Client/EditTheater/CreateTheater.jsx";
import ClientEditTheater from "./Components/Client/EditTheater/EditTheater.jsx";

// Admin Theater
import AdminTheaterList from "./Components/Admin/EditTheater/TheaterList";
import AdminCreateTheater from "./Components/Admin/EditTheater/CreateTheater";
import AdminEditTheater from "./Components/Admin/EditTheater/EditTheater";

// Admin Lobby
import AdminLobby from "./Components/Admin/Edit_Lobby/Edit_Lobby";
import LoginHandler from "./Components/Login/LoginHandler";
import RegisterHandler from "./Components/Register/RegisterHandler";
function App() {
  // const getToken = React.useState(localStorage.getItem("token") || "");
  const getUserType = localStorage.getItem("user_type");
  // console.log("getToken", getToken);
  // console.log("UserType", getUserType[0]);
  return (
    <Router>
      <>
        {/* Main */}
        <Switch>
          <Route exact path="/booth" component={Booth} />
          <Route exact path="/booth/IntoBooth/:id" component={IntoBooth} />

          <Route exact path="/testing" component={Testing} />

          <Route exact path="/loginHandler" component={LoginHandler} />
          <Route exact path="/registerHandler" component={RegisterHandler} />

          <Route exact path="/lobby" component={Lobby} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={getUserType ? Lobby : Login} />

          <Route exact path="/register" component={Register} />

          <Route exact path="/NotFound" component={NotFound} />

          <Route exact path="/events" component={Events} />
          <Route exact path="/networking" component={Networking} />
          <Route exact path="/events/videoPpt/:id" component={VideoPpt} />

          {/* Admin Routes */}

          <Route exact path="/admin" component={BoothList} />
          <Route exact path="/admin/create-booth" component={CreateBooth} />
          <Route exact path="/admin/EditBooth/:id" component={EditBooth} />
          <Route
            exact
            path="/admin/EditBooth/EditName/:id"
            component={EditBooth}
          />
          <Route
            exact
            path="/admin/EditBooth/AboutUs/:id"
            component={EditBooth}
          />
          <Route
            exact
            path="/admin/EditBooth/EditDocument/:id"
            component={EditBooth}
          />
          <Route
            exact
            path="/admin/EditBooth/EditVideo/:id"
            component={EditBooth}
          />
          <Route
            exact
            path="/admin/EditBooth/EditLogo/:id"
            component={EditBooth}
          />
          <Route
            exact
            path="/admin/EditBooth/EditImage/:id"
            component={EditBooth}
          />

          {/* Client EditBooth Routes */}

          <Route exact path="/client" component={ClientBoothList} />
          <Route
            exact
            path="/client/create-booth"
            component={ClientCreateBooth}
          />
          <Route
            exact
            path="/client/EditBooth/:id"
            component={ClientEditBooth}
          />
          <Route
            exact
            path="/client/EditBooth/EditName/:id"
            component={ClientEditBooth}
          />
          <Route
            exact
            path="/client/EditBooth/AboutUs/:id"
            component={ClientEditBooth}
          />
          <Route
            exact
            path="/client/EditBooth/EditDocument/:id"
            component={ClientEditBooth}
          />
          <Route
            exact
            path="/client/EditBooth/EditVideo/:id"
            component={ClientEditBooth}
          />
          <Route
            exact
            path="/client/EditBooth/EditLogo/:id"
            component={ClientEditBooth}
          />
          <Route
            exact
            path="/client/EditBooth/EditImage/:id"
            component={ClientEditBooth}
          />

          {/* Client EditTheater Routes */}

          <Route
            exact
            path="/client/TheaterList"
            component={ClientTheaterList}
          />
          <Route
            exact
            path="/client/create-theater"
            component={ClientCreateTheater}
          />
          <Route
            exact
            path="/client/EditTheater/:id"
            component={ClientEditTheater}
          />
          <Route
            exact
            path="/client/EditTheater/EditInfo/:id"
            component={ClientEditTheater}
          />
          <Route
            exact
            path="/client/EditTheater/EditPpt/:id"
            component={ClientEditTheater}
          />

          {/* admin EditTheater Routes */}

          <Route exact path="/admin/TheaterList" component={AdminTheaterList} />
          <Route
            exact
            path="/admin/create-theater"
            component={AdminCreateTheater}
          />
          <Route
            exact
            path="/admin/EditTheater/:id"
            component={AdminEditTheater}
          />
          <Route
            exact
            path="/admin/EditTheater/EditBg/:id"
            component={AdminEditTheater}
          />

          {/* admin EditTheater Routes */}

          <Route exact path="/admin/EditLobby" component={AdminLobby} />
          <Route exact path="/admin/EditLobby/EditBg" component={AdminLobby} />
          <Route
            exact
            path="/admin/EditLobby/EditVideo"
            component={AdminLobby}
          />
          <Route component={PageNotFound} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
