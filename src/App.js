import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// or less ideally
import { Button, Table } from "react-bootstrap";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios

      .get("https://restcountries.com/v2/all")
      .then((response) => setCountries(response.data))
      .catch((error) => console.log({ error }));
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Country</th>
            <th>Capital</th>
            <th>Region</th>
            <th>Flag</th>
          </tr>
        </thead>
        {countries
          .filter((country) => {
            console.log("Country" + country.capital);
            if (search === "") {
              return country;
            } else if (
              country.name.toLowerCase().includes(search.toLowerCase())
            ) {
              return country;
            }
          })
          .map((country, key) => {
            return (
              <tbody key={key}>
                <tr style={{ width: "100%" }}>
                  <td>{country.name}</td>
                  <td>{country.capital}</td>
                  <td>{country.region}</td>
                  <td>
                    <img
                      style={{ width: "100px", backgroundColor: "black" }}
                      src={country.flag}
                    />
                  </td>
                </tr>
              </tbody>
            );
          })}
      </Table>
    </div>
  );
}

export default App;
