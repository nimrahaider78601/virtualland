import React, { Component, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import Video from "twilio-video";
import Participant from "./Participant";
import "./Chat_Component_client.css";

export default function Video_Modal(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);

  const params = useParams();
  const AcceptCall = () => {
    console.log(props);
    let token = localStorage.getItem("twilio_token");
    const room_Names = `video_booth/${props.User[0]}/${params.id}`;
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
  };
  useEffect(() => {
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

  // const useAudio = (url) => {
  //   const [audio] = useState(new Audio(url));
  //   const [playing, setPlaying] = useState(false);

  //   const toggle = () => setPlaying(!playing);

  //   useEffect(() => {
  //     playing ? audio.play() : audio.pause();
  //   }, [playing]);

  //   useEffect(() => {
  //     audio.addEventListener("ended", () => setPlaying(false));
  //     return () => {
  //       audio.removeEventListener("ended", () => setPlaying(false));
  //     };
  //   }, []);

  //   return [playing, toggle];
  // };

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
          className="video_chat_body_client"
          style={{ height: "70vh" }}
          closebutton="true"
        >
          <div className="text-white calling w-100 d-flex align-items-center flex-column justify-content-center">
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
          </div>
        </Modal.Body>
      ) : (
        <Modal.Body
          className="video_chat_body_client"
          style={{ height: "23rem" }}
          closebutton="true"
        >
          <div className="text-white calling">
            <div className="w-100 pt-5 d-flex align-items-center flex-column justify-content-center">
              <img
                src="https://manskkp.lv/assets/images/users/4.jpg"
                className="rounded-circle"
                height="17%"
                width="17%"
                alt=""
              />
              <h2 className="text-white py-3">
                {props.User[1] + " " + props.User[2]}
              </h2>
              <p>Calling...</p>
              <div className="action_call">
                <div className="drop_call_div">
                  <i class="fa fa-times mx-4" aria-hidden="true"></i>
                  <i
                    class="fa fa-check mx-4 "
                    aria-hidden="true"
                    onClick={AcceptCall}
                  ></i>
                </div>
              </div>
            </div>

            {/* {remoteParticipants}
        <div className="video_mine">
          <Participant
            className="rounded video_mine_video"
            key={room.localParticipant.sid}
            participant={room.localParticipant}
          /> */}

            {/* </div>
        {remoteParticipants ? null : <></>} */}
          </div>
        </Modal.Body>
      )}
      <Modal.Footer></Modal.Footer>
      {/* ModalEnd */}
    </React.Fragment>
  );
}
