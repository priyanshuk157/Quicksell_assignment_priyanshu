import "./App.css";
import { useState, useEffect, useCallback } from "react";
import DashBoard from "./Components/DashBoard";
import Nav from "./Components/Nav";
import Loading from "./Components/Loading";

const API = "https://api.quicksell.co/v1/internal/frontend-assignment";

function App() {
  const [tickets, setTickets] = useState([]);
  const [userData, setUserData] = useState([]);
  const [gridData, setGridData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [grouping, setGrouping] = useState("status");
  const [ordering, setOrdering] = useState("priority");

  useEffect(() => {
    loadSettings(); // load settings after reload.
    fetch(API)
      .then((res) => res.json()) // get data from API.
      .then((res) => {
        console.log(res);
        const { tickets, users } = res;
        setTickets(tickets); //store tickets.

        let group = users.reduce((accumulator, user) => {
          // make a map (userid) -> (userdata).
          accumulator[user.id] = user;
          return accumulator;
        }, {});

        setUserData(group); // store user mapping.
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!tickets.length) return;

    let ordTickets;
    if (ordering === "priority") {
      // order the tickets according to selected mode (by priority), (by title).
      ordTickets = priorityOrder(tickets);
    } else {
      ordTickets = titleOrder(tickets);
    }

    if (grouping === "status") {
      // group the tickets according to selected mode (by status), (by priority), (by userID).
      const groups = ordTickets.reduce(
        (result, ticket) => {
          if (!result[ticket.status]) {
            result[ticket.status] = [];
          }
          result[ticket.status].push(ticket);
          return result;
        },
        { Backlog: [], Todo: [], "In progress": [], Done: [], Cancelled: [] }
      );
      setGridData(groups); //set the data in a grid to send to child components.
    } else if (grouping === "priority") {
      const groups = ordTickets.reduce(
        (result, ticket) => {
          let priority = "No priority";
          if (ticket.priority === 1) { // get the priority in text format from priority in number. (for efficient arrangement in future).
            priority = "Low";
          } else if (ticket.priority === 2) {
            priority = "Medium";
          } else if (ticket.priority === 3) {
            priority = "High";
          } else if (ticket.priority === 4) {
            priority = "Urgent";
          }

          if (!result[priority]) {
            result[priority] = [];
          }
          result[priority].push(ticket);
          return result;
        },
        { "No priority": [], Low: [], Medium: [], High: [], Urgent: [] } // given proper labels for efficient arrangement in Grid and Column components.
      );

      setGridData(groups);
    } else {
      const groups = ordTickets.reduce((result, ticket) => {  
        if (!result[ticket.userId]) {
          result[ticket.userId] = [];
        }
        result[ticket.userId].push(ticket);  // push a ticket in array corresponding to its user id.
        return result;
      }, {});

      setGridData(groups);
    }
    
    setLoading(false);
  }, [grouping, ordering, tickets]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSetGrouping = useCallback((value) => { // change the grid layout whenever grouping is change by user.
    setLoading(true);
    setGrouping(value);
    saveSettings({ grouping: value });
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const onSetOrdering = useCallback((value) => { // change the grid layout whenever ordering is change by user.
    setLoading(true);
    setOrdering(value);
    saveSettings({ ordering: value });
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const priorityOrder = (tickets) =>
    tickets.sort((a, b) => (a.priority > b.priority ? -1 : 1)); // sort the tickets by priority.
  const titleOrder = (tickets) =>
    tickets.sort((a, b) => (a.title < b.title ? -1 : 1)); // sort the tickets by title.

  const saveSettings = useCallback((data) => {    // save the settings to localstorage so they can be retained even after reloading.
    for (let key in data) localStorage.setItem(key, data[key]);
  }, []);

  const loadSettings = useCallback(() => { // load the settings from localstorage if they are available else set some default value.
    setGrouping(localStorage.getItem("grouping") || "status");
    setOrdering(localStorage.getItem("ordering") || "priority");
  }, []);

  return (
    <div className="App">
      <Nav            
        grouping={grouping}
        setGrouping={onSetGrouping}
        ordering={ordering}
        setOrdering={onSetOrdering}
      /> 
      {loading ? (
        <Loading />
      ) : (
        <DashBoard gridData={gridData} grouping={grouping} userData={userData} />
      )}
    </div>
  );
}

export default App;
