import React, { Component } from "react";
import RingingBell from "react-ringing-bell";

export default class Ringing extends Component {
  componentDidMount() {
    // You can trigger the bell/elements to ring here, or any where else! (with the use of "ref")
    setInterval(() => {
      this._ringingBell.triggerRing();
    }, 10000);
    // After every 10 seconds, the bell will ring, but you can trigger this ringing-effect elsewhere!
  }
  render() {
    return (
      <RingingBell
        effectDuration={8000}
        ref={(thisBell) => {
          this._ringingBell = thisBell;
        }}
      >
        <img
          src="https://manskkp.lv/assets/images/users/4.jpg"
          className="rounded-circle"
          height="17%"
          width="17%"
          alt=""
        />
      </RingingBell>
    );
  }
}
