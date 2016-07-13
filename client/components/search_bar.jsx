import React, {Component} from 'react';
import { connect } from 'react-redux';
import nearActions from '../redux/actions/nearby_actions';

class SearchBar extends Component {
  constructor() {
    super();
    this.search = this.search.bind(this);
    this.geoSuccess = this.geoSuccess.bind(this);
    this.geoError = this.geoError.bind(this);
    this.longditude = null;
    this.latitude = null;
  }
  componentWillMount() {
    window.navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError)
  }
  geoSuccess(position) {
    this.longitude = position.coords.longitude;
    this.latitude = position.coords.latitude;
    console.log("Ready to Go");
  }
  geoError() {
    console.log("Error in finding your coords");
  }
  search(e) {
    e.preventDefault()
    var searchTerm = this.refs.searchTerm.value
    this.props.findNearby({longitude: this.longitude, latitude: this.latitude, distance: 200});
  }
  render() {
    return (
      <form onSubmit={this.search}>
        <input placeholder="Find me a Gym" ref="searchTerm" />
        <button type="submit">Search</button>
      </form>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    state: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    findNearby: (coords) => {
      dispatch(nearActions.getNearbyGyms(coords))
    }
  }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(SearchBar);

export default Container
