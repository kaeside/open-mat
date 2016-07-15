import React, { Component } from 'react';
import {GoogleMapLoader, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { connect } from 'react-redux';
const pointer = require('../images/gym_pointer.svg'); // This is how you use images in webpack
                                                      // you then have to use a loader in then
                                                      // webpack.config...crazy, right!?!?!?!

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { // setting local state for the component
      position: null,
      content: null,
      mapWidth: null
    }
  }
  componentWillMount() {
    document.addEventListener('resize', () => {this.handleResize.bind(this)}); // funky way to have the map resize
    setTimeout(() => {this.handleResize.bind(this)}, 1);
  }
  handleResize() {
    this.setState({
      mapWidth: window.innerWidth
    })
  }
  showInfo(position, content) {
    console.log(content);
    this.setState({ // using state to show the info windows. Overwiting previous so only one shows at a time
      position: position,
      content: content
    })
  }
  infoClosed() {
    this.setState({ // clearing out when info is closed, it can be reopened.
      position: null,
      content: null
    })
  }
  render() {
    let info = null
    if (this.state.position) { // only show info window if there's state
      info = <InfoWindow position={this.state.position} content={this.state.content} onCloseclick={this.infoClosed.bind(this)}/>
    }
    // 3 renders. 1) If gyms are found...
    if (this.props.state.nearby && this.props.state.nearby.length > 0) {
      return (
        // map stuff comes from https://github.com/tomchentw/react-google-maps
        <section className="map-container" style={{width: this.state.mapWidth, height: `350px`}}>
          <GoogleMapLoader
            containerElement={
              <div className="map" style={{width: this.state.mapWidth, height: `350px`, border: '5px solid gray'}} />
            }
            googleMapElement={
              <GoogleMap
                defaultZoom={10}
                defaultCenter={{ lat: this.props.state.coords.lat, lng: this.props.state.coords.long }}>

                <Marker title={"You"}
                        position={{
                          lat: this.props.state.coords.lat,
                          lng: this.props.state.coords.long
                        }}
                        />
                {this.props.state.nearby.map((gym, i) => {
                  return (
                    <Marker key={i}
                            position={{lat: gym.geo[1], lng: gym.geo[0]}}
                            icon={pointer}
                            onClick={this.showInfo.bind(this, {lat: gym.geo[1], lng: gym.geo[0]}, `${gym.name} <br> Costs: $${gym.cost}`)}>
                    </Marker>
                  )
                })}
                {info}
              </GoogleMap>
            }
          />
        </section>
      )
    }
    // Render 2) No gyms found
    else if (this.props.state.nearby && this.props.state.nearby.length === 0) {
      return <h1 className="no-results">There's nothing in that search radius, maybe try further afield</h1>
    }
    // 3) No search made
    else {
      return null
    }
  }
}

function mapStateToProps(state, props) {
  return {
    state: state
  }
}

var Container = connect(mapStateToProps)(Map);

export default Container;
