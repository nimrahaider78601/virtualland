import React, { Component, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import Video from "twilio-video";
import Participant from "./Participant";

export default function Vide_Modal(props) {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const params = useParams();
  const my_id = localStorage.getItem("my_id");
  const room_Names = `video_booth/${my_id}/${params.id}`;
  let token = localStorage.getItem("twilio_token");

  useEffect(() => {
    function participantConnected(participant) {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    }
    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };
    Video.connect(token, {
      name: room_Names,
    }).then((room) => {
      setRoom(room);
      room.on("participantConnected", participantConnected);
      room.on("participantDisconnected", participantDisconnected);
      room.participants.forEach(participantConnected);
    });
    return () => {
      setRoom((currentRoom) => {
        if (currentRoom && currentRoom.localParticipant.state === "connected") {
          currentRoom.localParticipant.tracks.forEach(function (
            trackPublication
          ) {
            trackPublication.track.stop();
          });
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [room_Names, token]);
  const remoteParticipants = participants.map((participant) => (
    <Participant
      className="rounded user_video"
      key={participant.sid}
      participant={participant}
    />
  ));
  console.log("video-modal", remoteParticipants);
  return (
    <React.Fragment>
      {room ? (
        <Modal.Body
          className="video_chat_body"
          style={{ height: "70vh" }}
          closebutton="true"
        >
          <div className="text-white calling w-100 pt-5  d-flex align-items-center flex-column justify-content-center">
            {remoteParticipants.length ? (
              remoteParticipants
            ) : (
              <>
                {" "}
                <h2 className="text-white py-3">
                  {props.fName + " " + props.lName}
                </h2>
                <p>Calling...</p>
              </>
            )}
          </div>
          <div className="drop_call_div">
            <i class="drop_call fa fa-phone" aria-hidden="true"></i>
          </div>
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
        </Modal.Body>
      ) : (
        <div className="w-100 text-center">●●●</div>
      )}

      <Modal.Footer></Modal.Footer>
    </React.Fragment>
  );
}
