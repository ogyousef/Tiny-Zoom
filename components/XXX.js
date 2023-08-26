import Peer from "peerjs";
import {useState, useEffect, useRef} from "react";
import { createRef } from "react";



const Video = ({ media}) => {
    let videoRef = createRef();
    useEffect(() => {
      videoRef.current.srcObject = media;
    }, [media]);
  
    return (
      <video
        className="inline-block m-2 border-2 rounded-lg object-cover"
        height={300}
        width={300}
        autoPlay
        ref={videoRef}
      >
      </video>
    );
  };

const localPeer = new Peer();
const Peers = [];

const VideoImplemnt = ({roomId}) => {
    const temp = useRef('');
  const [userId, setUserId] = useState("");
  const [currentStream, setCurrentStream] = useState({});
  const [comingStreams, setComingStreams] = useState([]);
  const [state, setState] = useState({
    userId: "",
    peers: [],
    streamId: "",

  });

  


  console.log(comingStreams)


  const addToStreams = (userId , userStream) => {

    Peers.push({userId: userId, streamId: userStream});

    setState({peers: Peers});

    setComingStreams(Peers);
  };

  const callNewUSer = (userId, userStream) =>{
    const call = localPeer.call(userId, userStream);
    call.on("stream", (userVideoStream) => {
        addToStreams(userId, userStream, false);
    });
   // peers[userId] = call;
  };
  const videoRef = useRef('');
  useEffect(() => {

 


    localPeer.on("open", (id) => {
      navigator.mediaDevices
        .getUserMedia({video: true, audio: true})
        .then((stream) => {
          setUserId(id);
          setCurrentStream(stream);
          setState({userId: id, streamId: stream});
          addToStreams(id,stream);
          callNewUSer(id, stream);

        videoRef.current.srcObject = stream;
        //videoRef.current.play();
          localPeer.on("call", (call)=>{
            // Answer Calls With Current Stream
            call.answer(stream)

            // Stream others call
            call.on("stream",(remoteStream)=>{
                addToStreams(call.peer,remoteStream);
            })

            call.on("close" ,()=>{
                // Implement Later
                alert("CLOSED")
            })

          })
          localPeer.on("call", (call) => {
            call.answer(stream);
            call.on("stream", (userStream) => {});
          });
        });
    });

    
  }
  
  );

  return(
    <div>
      <video height={200} width={200} ref={videoRef} autoPlay></video>
        {
        
        comingStreams.map((stream)=>{
            <div>            <Video  media={stream.streamId}/>
                <p>XXXXXX</p>

            </div>
            
        })}

    </div>
    );
};
export default VideoImplemnt;
