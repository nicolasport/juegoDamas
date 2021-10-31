/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ExampleComponent } from '~/components/ExampleComponent';

class ExampleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  
  render() {
    return (
      <div className="ExampleContainer">
        <ExampleComponent />
      </div>
    );
  }
}

const mapStateToProps = state => ({ reduxState: state });

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    //
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ExampleContainer);
