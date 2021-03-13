import React from "react";
import axios from "axios";

// COMPONENTS
import CardItem from "./components/CardItem.component";

// STYLES
import "./app.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cats: [
        {
          id: 1,
          name: "Marvin",
          email: "marvin@mail.com",
          geo: {
            lng: 81.1496,
          },
        },
        // url: "https://robohash.org/1?set=set4&size=80x80",

        {
          id: 2,
          name: "Darvin",
          email: "darvin@mail.com",
          geo: {
            lng: 81.1496,
          },
        },
        // url: "https://robohash.org/2?set=set4&size=80x80",

        {
          id: 3,
          name: "Harry Potter",
          email: "harry@mail.com",
          geo: {
            lng: 81.1496,
          },
        },
        // url: "https://robohash.org/3?set=set4&size=80x80",

        {
          id: 4,
          name: "Kitty",
          email: "harry@mail.com",
          address: {
            geo: {
              lng: 81.1496,
            },
          },
          // url: "https://robohash.org/3?set=set4&size=80x80",
        },
        {
          id: 5,
          name: "Petya",
          email: "harry@mail.com",
          address: {
            geo: {
              lng: 81.1496,
            },
          },
          // url: "https://robohash.org/3?set=set4&size=80x80",
        },
      ],
      catsFromServer: [],
      arrayOfSelectedCats: [],
      sum: 0,
    };

    console.log("Constructor...");
  }

  componentDidMount() {
    const response = axios.get("https://jsonplaceholder.typicode.com/users");
    response
      .then((result) => {
        const data = result.data;
        this.setState({ catsFromServer: data });
      })
      .catch((err) => {
        setTimeout(() => {
          this.setState({
            errorMessage: "Something went wrong",
            isLoading: false,
          });
        }, 2000);
      });
  }

  deleteCatHandle = (id) => {
    const cats = [...this.state.catsFromServer];

    const selectedUserIndex = this.state.catsFromServer.findIndex((item) => {
      return item.id === id;
    });
    let selectedCat = cats.splice(selectedUserIndex, 1);
    this.setState({ catsFromServer: cats });
    let joined = this.state.arrayOfSelectedCats.concat(selectedCat);
    this.setState({ arrayOfSelectedCats: joined });

    // let sum = 0;
    // this.state.arrayOfSelectedCats.map((object) => {
    //   let num = Number(object.address.geo.lng);

    //   return (sum += Math.floor(num));
    // });
    // this.setState({ sum });
  };

  addToCatsFromServer = (id) => {
    const catArr = [...this.state.arrayOfSelectedCats];
    const cardIdx = this.state.arrayOfSelectedCats.findIndex((item) => {
      return item.id === id;
    });
    let removeCat = catArr.splice(cardIdx, 1);

    this.setState({ arrayOfSelectedCats: catArr });

    let addCatsFromSever = this.state.catsFromServer.concat(removeCat);
    this.setState({ catsFromServer: addCatsFromSever });
  };

  render() {
    return (
      <div className="app">
        <h1 className="app__header">Aveliable cats</h1>

        <main className="app__main">
          <ul className="app__main-list">
            {!!this.state.catsFromServer.length &&
              this.state.catsFromServer.map((cat) => {
                return (
                  <CardItem
                    key={cat.id}
                    cat={cat}
                    handleCardClick={this.deleteCatHandle}
                  />
                );
              })}
          </ul>
          <h1 className="selected-cats">
            Selected cats ({this.state.arrayOfSelectedCats.length}) sum (
            {this.state.sum})
          </h1>
          <ul className="app__main-list">
            {!!this.state.arrayOfSelectedCats.length &&
              this.state.arrayOfSelectedCats.map((cat) => {
                return (
                  <CardItem
                    key={cat.id}
                    cat={cat}
                    handleCardClick={this.addToCatsFromServer}
                  />
                 
                );
              })}
          </ul>
        </main>
      </div>
    );
  }
}

export default App;
