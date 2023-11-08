import Authorization from './pages/authorization/Authorization';
import Main from './pages/main/Main';
import Search from './pages/search/Search';
import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import Header from './components/header/Header';
import Output from './pages/output/Output';
import Footer from './components/footer/Footer';

class App extends React.Component {
  state = {
    isAuthorization: false,
    isFirstLoaded: true,
  };

  firstLoaded() {
    this.setState({ isFirstLoaded: false });
  }

  setAuth = (isAuthorize) => {
    this.setState({
      isAuthorization: isAuthorize,
    });
  };

  init() {
    const token = localStorage.getItem('token');
    if (this.state.isFirstLoaded) {
      if (token) {
        this.setAuth(true);
      } else {
        this.setAuth(false);
      }
      this.firstLoaded();
    }
  }

  render() {
    this.init();
    return (
      <div className="App">
        <Header
          isAuthorization={this.state.isAuthorization}
          mSetIsAutor={this.setAuth}
        />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/authorization"
            element={
              <Authorization
                isAuthorization={this.state.isAuthorization}
                mSetIsAutor={this.setAuth}
              />
            }
          />
          <Route path="/search" element={<Search />} />
          <Route path="/histograms" element={<Output />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default App;
