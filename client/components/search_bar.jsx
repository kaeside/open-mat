import React, {Component} from 'react';
import { connect } from 'react-redux';
import nearActions from '../redux/actions/nearby_actions';
import general from '../redux/actions/general_actions'

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.geoSuccess = this.geoSuccess.bind(this);
    this.geoError = this.geoError.bind(this);
    this.changeDiscipline = this.changeDiscipline.bind(this);
    this.changeDistance = this.changeDistance.bind(this);
    this.state = {
      noCoords: true,
      buttonText: "Waiting for location..."
    }
  }
  componentWillMount() {
    window.navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError)
  }
  componentDidMount() {
    this.distance = +this.refs.initialDistance.value;
    this.discipline = this.refs.initialDiscipline.value;
  }
  geoSuccess(position) {
    this.props.saveCoords({
      longitude: position.coords.longitude,
      latitude: position.coords.latitude
    });
    this.setState({
      noCoords: false,
      buttonText: "GO!!!"
    });
    console.log("Ready to Go");
  }
  geoError() {
    console.log("Error in finding your coords");
  }
  changeDiscipline(e) {
    this.discipline = e.target.value;
    console.log(this.discipline);
  }
  changeDistance(e) {
    this.distance = +e.target.value;
    console.log(this.distance);
  }
  search(e) {
    e.preventDefault()
    this.props.findNearby({
      longitude: this.props.state.coords.long,
      latitude: this.props.state.coords.lat,
      distance: this.distance,
      discipline: this.discipline
    });
  }
  render() {
    return (
      <form id="searchForm" onSubmit={this.search}>
        <span>Find me a gym specializing in </span>
        <select onChange={this.changeDiscipline} name="discipline" form="searchForm" ref="initialDiscipline" defaultValue="BJJ">
          <option value="BJJ">BJJ</option>
          <option value="Killing with a Spoon">Killing with a Spoon</option>
        </select>
        <span> that's within </span>
        <select onChange={this.changeDistance} name="distance" form="searchForm" ref="initialDistance" defaultValue="5">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="200">200</option>
        </select>
        <span> km's of me. </span>
        <button type="submit" ref="submitButton" disabled={this.state.noCoords}>{this.state.buttonText}</button>
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
    },
    saveCoords: (pos) => {
      dispatch(general.saveCoords(pos))
    }
  }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(SearchBar);

export default Container
