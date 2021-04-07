import React, { Component, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import Video from "twilio-video";
import Participant from "./Participant";

export default function Video_Modal(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const my_id = localStorage.getItem("my_id");
  const params = useParams();
  useEffect(() => {
    let token = localStorage.getItem("twilio_token");
    const room_Names = `video_booth/${my_id}/${params.id}`;
    console.log(Video, token);
    Video.connect(token, {
      name: room_Names,
    })
      .then((room) => {
        console.log("VConnectName", room);
        setRoom(room);
        room.on("participantConnected", participantConnected);
        room.on("participantDisconnected", participantDisconnected);
        room.participants.forEach(participantConnected);
      })
      .catch((error) => {
        console.log("videoConnectError", error);
      });
    function participantConnected(participant) {
      console.log("ParticipantConnected", participant);
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    }
    const participantDisconnected = (participant) => {
      console.log("participantDisConnected", participant);
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };
    return () => {
      setRoom((currentRoom) => {
        if (currentRoom && currentRoom.localParticipant.state === "connected") {
          console.log(currentRoom);
          currentRoom.localParticipant.tracks.forEach(function (
            trackPublication
          ) {
            trackPublication.track.stop();
          });
          currentRoom.disconnect();
          return console.log("RoomDisconnect");
        } else {
          return currentRoom;
        }
      });
    };
  }, []);
  console.log("incoming_video-modal", room);
  const remoteParticipants = participants.map((participant) => (
    <Participant
      className="rounded user_video"
      key={participant.sid}
      participant={participant}
    />
  ));
  return (
    <React.Fragment>
      {room ? (
        <Modal.Body
          className="video_chat_body"
          style={{ height: "30rem" }}
          closebutton="true"
        >
          <div className="text-white calling w-100 d-flex align-items-center flex-column justify-content-center">
            {remoteParticipants ? (
              remoteParticipants
            ) : (
              <>
                <h2 className="text-white py-3">
                  {" "}
                  {props.User[1] + " " + props.User[2]}
                </h2>
                <p>Calling...</p>
              </>
            )}
            <div className="video_mine">
              <Participant
                className="rounded video_mine_video"
                key={room.localParticipant.sid}
                participant={room.localParticipant}
              />
              {/* <img
              src="https://manskkp.lv/assets/images/users/4.jpg"
              className="rounded"
              height="27%"
              width="27%"
              alt=""
            /> */}
            </div>
          </div>
          <div className="drop_call_div">
            <i class="drop_call fa fa-phone" aria-hidden="true"></i>
          </div>
        </Modal.Body>
      ) : (
        <div className="text-center w-100">●●●</div>
      )}
      <Modal.Footer></Modal.Footer>
      {/* ModalEnd */}
    </React.Fragment>
  );
}
