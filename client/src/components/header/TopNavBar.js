import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TopEventSearch from './TopEventSearch';
import TopHeader from './TopHeader';


const TopNavBar = (props) => {
  const { user } = props;
  return (
    <div className="reactHeader">
      {user && <TopEventSearch user={user} />}
      <TopHeader />
    </div>
  );
};

TopNavBar.defaultProps = {
  user: 'undefined',
};

TopNavBar.propTypes = {
  user: PropTypes.object,
};


const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps)(TopNavBar);
