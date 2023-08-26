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
        });
    })