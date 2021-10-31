import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Board from './components/Board';
import history from '~/history';
import BoardState from '~/context/Board/BoardState';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const { location } = this.props;
    return (
      <BoardState>
        <div className="brandHolder">
          <Router history={history}>
            <Switch>
              <Route exact path="/" location={location} component={Board} />
            </Switch>
          </Router>
        </div>
      </BoardState>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
