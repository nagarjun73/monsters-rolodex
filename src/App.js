// import { Component } from "react";
import { useState, useEffect } from "react";

import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.components";
import "./App.css";

//FUNCTIONAL COMPONENT
const App = () => {
  const [searchField, setSearchField] = useState(" "); //[ value, setvalue]
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState([]);
  console.log("render");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monst) => {
      return monst.name.toLowerCase().includes(searchField);
    });

    setFilteredMonsters(newFilteredMonsters);

    console.log("fire");
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder="search monsters"
        className="monster-search-box"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

//CLASS COMPONENT
/*
class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: " ",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((users) =>
        this.setState(() => {
          return { monsters: users };
        })
      );
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLowerCase();

    this.setState(() => {
      return { searchField };
    });
  };

  render() {
    const { searchField, monsters } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monst) => {
      return monst.name.toLowerCase().includes(searchField);
    });
    return (
      <div className="App">
        <h1 className="app-title">Monsters Rolodex</h1>
        <SearchBox
          onChangeHandler={onSearchChange}
          placeholder="search monsters"
          className="monster-search-box"
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}
*/
export default App;
