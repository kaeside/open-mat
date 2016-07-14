import React, { Component } from 'react';
import {GoogleMapLoader, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { connect } from 'react-redux';
const pointer = require('../images/gym_pointer.png'); // This is how you use images in webpack
                                                      // you then have to use a loader in then
                                                      // webpack.config...crazy, right!?!?!?!

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: null,
      content: null
    }
  }
  showInfo(position, content) {
    console.log(content);
    this.setState({
      position: position,
      content: content
    })
  }
  infoClosed() {
    this.setState({
      position: null,
      content: null
    })
  }
  render() {
    let info = null
    if (this.state.position) {
      info = <InfoWindow position={this.state.position} content={this.state.content} onCloseclick={this.infoClosed.bind(this)}/>
    }
    if (this.props.state.nearby && this.props.state.nearby.length > 0) {
      return (
        <section className="map-container" style={{width: `350px`, height: `350px`}}>
          <GoogleMapLoader
            containerElement={
              <div className="map" style={{width: `350px`, height: `350px`, border: '5px solid gray'}} />
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
                            animation={'DROP'}
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
    else if (this.props.state.nearby && this.props.state.nearby.length === 0) {
      return <h1>There's nothing in that search radius, maybe try further afield</h1>
    }
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
