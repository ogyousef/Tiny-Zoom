"use client"
import { useEffect, useRef,useState } from 'react';
import Peer from 'peerjs';
import io from "socket.io-client";

const VideoChat = ({ roomId, userId }) => {


  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const myPeer = new Peer();
  const socket = io('http://localhost:4000');
  const [peerStream2, setPeerStream2] = useState([]);
  const [userId2, setUserId2] = useState("");
  const [streamChange, setStreamChange] = useState({});




  const [state, setState] = useState({
    userId: "",
    stream: {},
    peers: [],
    mode: "cpp",
    code: "",
    input: "",
    output: "",
    status: "RUN",
  }); 

  useEffect(() => {
    myPeer.on("open", (id) => {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then((stream) => {
          addUserIdAndStream(id, stream);
          addVideoStream(id, stream, false);
          socket.on("user-connected", (userId) => {
            connectToNewUser(userId, stream);
            sendDatatoNewUser();
          });
          myPeer.on("call", (call) => {
            call.answer(stream);
            call.on("stream", (userVideoStream) => {
              addVideoStream(call.peer, userVideoStream, false);
            });
            call.on("close", () => {
              const peers = state.peers;
              var peersModified = peers.filter((peer) => {
                return peer.userId !== call.peer;
              });
              setState({ peers: peersModified });
            });
            peers[call.peer] = call;
          });
          socket.emit("join-room", roomId, id);
          socket.on("receive code", (payload) => {
            updateCodeFromSockets(payload);
          });
          socket.on("whiteBoardDataResponse", (data) => {
            console.log(data);
            setDrawingMode(data.imgURL);
          });
          socket.on("receive input", (payload) => {
            updateInputFromSockets(payload);
          });
          socket.on("receive output", (payload) => {
            updateOutputFromSockets(payload);
          });
          socket.on("receive-data-for-new-user", (payload) => {
            updateStateFromSockets(payload);
          });
          socket.on("mode-change-receive", (payload) => {
            updateModeFromSockets(payload);
          });

          socket.on("board-change-receive", (payload) => {
            updateBoarddataFromSockets(payload);
          });
        });
    });
    socket.on("user-disconnected", (userId) => {
      if (peers[userId]) peers[userId].close();
    });
    addVideoStream();
  }, []);

  const addUserIdAndStream = (userId2, stream2) => {
    console.log(userId2, stream2);
    setUserId2(userId2);
    setStreamChange(stream2);
    setState({ userId: userId2, stream: stream2 });
  };


  const addVideoStream = (userId, stream, flag) => {
    if (userId === state.userId) {
      stream.getVideoTracks()[0].enabled = false;
      stream.getAudioTracks()[0].enabled = false;
    }
    const peers = state.peers;
    const peers2 = peerStream2;
    peers.forEach((peer) => {
      if (peer.userId === userId) {
        peer.stream = stream;
        flag = true;
      }
    });
    if (!flag) peers.push({ userId: userId, stream: stream });
    peers2.forEach((peer) => {
      console.log(peer.userId);
      if (peer.userId === userId) {
        peer.stream = stream;
        flag = true;
      }
    });
    if (!flag) peers2.push({ userId: userId, stream: stream });
    setState({ peers: peers });
    setPeerStream2(peers2);
  };


  return (
    <div>
    <video
      className="inline-block m-2 border-2 rounded-lg object-cover"
      height={300}
      width={300}
      autoPlay
      ref={peerStream2}
    >
    </video>
    </div>
  );
};

export default VideoChat;
