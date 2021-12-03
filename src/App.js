import "./styles.css";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((response) => response.json());

export default function App() {
  const [gameTitle, setGameTitle] = useState("");
  const [searchedGame, setSearchedGame] = useState([]);

  const { data } = useSWR(
    "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=20&pageSize=3",
    fetcher
  );

  const searchGame = () => {
    fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=3`)
      .then((response) => response.json())
      .then((items) => {
        setSearchedGame(items);
      });
  };

  const totalGames = searchedGame.length !== 0 ? true : false;

  return (
    <div className="App">
      <section className="searchSection">
        <header>
          <h1>Search For A Game</h1>
        </header>
        <input
          type="text"
          placeholder="Car..."
          onChange={(event) => setGameTitle(event.target.value)}
        />
        <button onClick={searchGame}>Search Game</button>

        {totalGames ? "" : "NO GAME FOUND"}

        <section className="games">
          {searchedGame.map((games, key) => {
            return (
              <aside className="game" key={key}>
                {games.external}
                <img src={games.thumb} alt={games.external} />${games.cheapest}
              </aside>
            );
          })}
        </section>
      </section>
      <h1>
        Lastest Deals{" "}
        <img
          src="https://emojipedia-us.s3.amazonaws.com/source/skype/289/fire_1f525.png"
          width="30"
          alt="Fire Emoji"
        />
      </h1>
      <section className="dealsSection">
        <article className="dealsSection">
          {data &&
            data.map((deals, key) => {
              return (
                <aside className="game" id="deals" key={key}>
                  {" "}
                  <img src={deals.thumb} alt="" />
                  <h3>{deals.title}</h3>
                  <p>Normal Price: $ {deals.normalPrice}</p>
                  <p>Sale Price: $ {deals.salePrice}</p>
                  <p>YOU SAVE: {deals.savings.substr(0, 2)}%</p>
                </aside>
              );
            })}
        </article>
      </section>
    </div>
  );
}
