import './App.css';
import React from 'react';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      commits: []
    };
  }

  componentDidMount() {
    fetch("https://api.github.com/repos/EstephanyPerez/fulltimeforce-test/commits")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            commits: result
          });
        },

        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
      
  }

  render() {
    const { error, isLoaded, commits } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h1 class="display-6 ms-3">List of commits</h1>
          <ul class="list-group  list-group-numbered">
            {commits.map(commit => (
              <li class="list-group-item d-flex justify-content-between align-items-start" key={commit.commit.url}>
                <div class="ms-2 me-auto">
                  <div class="fw-bold">URL: {commit.commit.url}</div>
                  Message: {commit.commit.message}
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }

} export default App;
