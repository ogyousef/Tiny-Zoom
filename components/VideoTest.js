import React, {useEffect, useRef, useState} from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import Image from "next/image";

const StyledVideo = styled.video`
  height: 100%;
  width: 100%;
`;

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <StyledVideo playsInline autoPlay ref={ref} />;
};


const Room = ({RoomIDx}) => {
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  //const roomID = props.match.params.roomID;
  const roomID = RoomIDx;
  console.log(RoomIDx, "LL");
  useEffect(() => {
    socketRef.current = io.connect(`https://finalplease.onrender.com/`);
    navigator.mediaDevices
      .getUserMedia({video: true, audio: true})
      .then((stream) => {
        userVideo.current.srcObject = stream;
        socketRef.current.emit("join room", roomID);
        socketRef.current.on("all users", (users) => {
          const peers = [];
          users.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push(peer);
          });
          setPeers(peers);
        });

        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          setPeers((users) => [...users, peer]);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
      });
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", {signal, callerID});
    });

    peer.signal(incomingSignal);

    return peer;
  }

  return (
    <div className="flex flex-col ">
    <div className=" mt-10  flex flex-row border-solid border-red-300 border-2">
      <div className="flex ">
        <StyledVideo muted ref={userVideo} autoPlay playsInline />
      </div>
     
      {peers.map((peer, index) => {
        return <div className="flex"><Video key={index} peer={peer} /></div> ;
      })}
    </div>
    <div className="mt-10 border-solid border-black border-2 items-center text-center">Chat Box: Comming SOOOOOON ;)) </div>
    </div>
  );
};

export default Room;
