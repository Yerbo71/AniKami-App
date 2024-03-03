import { Box, AspectRatio, Button } from "@chakra-ui/react";
import poster from "./../assets/Poster_Jujutsu.jpg";
import trailer from "./../assets/Trailer_Jujutsu.mp4";
import { useState, useRef } from "react";

function Video() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <AspectRatio ratio={9 / 3} w='100%'>
      <Box
        position="relative"
        sx={{
          borderRadius: "50px",
          border: "2px solid rgba(61, 210, 204, 0.4)"
        }}
      >
        <video
          ref={videoRef}
          controls={false}
          poster={poster}
          alt='Jujutsu'
          style={{ width: "100%" }}
          onClick={handlePlayPause}
        >
          <source src={trailer} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {!isPlaying && (
          <Button
            onClick={handlePlayPause}
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            colorScheme="teal"
            size="lg"
          >
            Play
          </Button>
        )}
      </Box>
    </AspectRatio>
  );
}

export default Video;
