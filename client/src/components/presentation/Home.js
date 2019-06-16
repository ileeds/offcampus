import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class Home extends Component {
  render() {
    return (<div>
      <div>
        <Link to={`/homes/${this.props.data._id}`}>
          <b>{this.props.data.title}</b>
        </Link>
      </div>
      <div>{this.props.data.description}</div>
    </div>)
  }
}

Home.propTypes = {
  data: PropTypes.shape({_id: PropTypes.string.isRequired, title: PropTypes.string.isRequired, description: PropTypes.string.isRequired})
}

export default Home
