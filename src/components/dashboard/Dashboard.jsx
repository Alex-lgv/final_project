import React from 'react';
import styles from './dashboard.module.css';
import imgLoader from './../../img/imgLoaderSpinner/loader.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import imgUser from './../../img/imgUser/imgUser.svg';

class Dashboard extends React.Component {
  constructor(...props) {
    super(props);
    this.startGetURL = true;
  }

  state = {
    usedCompanyCount: -1,
    companyLimit: -1,
  };

  async getDataInfo() {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    const res = await axios.get(
      'https://gateway.scan-interfax.ru/api/v1/account/info',
      config
    );
    const { data } = res;
    setTimeout(
      function () {
        this.setState({
          usedCompanyCount: data.eventFiltersInfo.usedCompanyCount,
          companyLimit: data.eventFiltersInfo.companyLimit,
        });
      }.bind(this),
      10000
    );
    this.startGetURL = false;
  }

  logOut = (e) => {
    localStorage.removeItem('token');
    this.props.mSetIsAutor(false);
  };

  thisIsRender() {
    if (this.props.isAuthorization) {
      return <div>{this.getAsAuthorize()}</div>;
    } else {
      return <div>{this.getNotAuthorize()}</div>;
    }
  }

  dashboardInfo() {
    if (this.startGetURL) {
      this.getDataInfo();
      return (
        <div className={styles.dashboard__info__text}>
          <img src={imgLoader} className={styles.loader} alt="Loader" />
        </div>
      );
    } else {
      return (
        <div className={styles.dashboard__info__text}>
          <p>
            Использовано компаний{' '}
            <span className={styles.dashboard__black}>
              {this.state.usedCompanyCount}
            </span>
          </p>
          <p>
            Лимит по компаниям{' '}
            <span className={styles.dashboard__green}>
              {this.state.companyLimit}
            </span>
          </p>
        </div>
      );
    }
  }

  getAsAuthorize() {
    return (
      <ul className={styles.dashboard__list__info}>
        <div className={styles.dashboard__info}>{this.dashboardInfo()}</div>

        <li className={styles.dashboard__item__user}>
          <p className={styles.dashboard__name}>Алексей А.</p>
          <Link to="/">
            <button
              onClick={this.logOut}
              className={styles.dashboard__button__out}
            >
              Выйти
            </button>{' '}
          </Link>
        </li>
        <li className={styles.dashboard__item}>
          <img
            src={imgUser}
            className={styles.dashboard__foto}
            alt="User foto"
          />
        </li>
      </ul>
    );
  }

  getNotAuthorize() {
    return (
      <ul className={styles.dashboard__list}>
        <li className={styles.dashboard__item}>
          <a href="#!" className={styles.dashboard__link_disabled}>
            Зарегистрироваться
          </a>
        </li>
        <li className={styles.dashboard__item}>
          <span className={styles.separator}></span>
        </li>

        <Link to="/authorization">
          <li className={styles.dashboard__item}>
            <button className={styles.dashboard__button}>Войти</button>
          </li>
        </Link>
      </ul>
    );
  }

  render() {
    return <div>{this.thisIsRender()}</div>;
  }
}

export default Dashboard;
