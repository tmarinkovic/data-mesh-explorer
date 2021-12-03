import logo from './logo.svg';
import './App.css';
import {useEffect} from "react";

const App = () => {

    const lambdaUrl = "https://vm7kzvbmg5.execute-api.eu-west-2.amazonaws.com/dev/"

    useEffect(() => {
        fetch(lambdaUrl)
            .then(response => response.json())
            .then(data => console.log(data));

// empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
