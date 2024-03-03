import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardBody,
  Image,
  Text,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
} from "@chakra-ui/react";
import SidebarWithHeader from "./components/SideBar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const Popular = () => {
  const [animeData, setAnimeData] = useState(null);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (anime) => {
    setSelectedAnime(anime);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getData = async () => {
    try {
      const res = await fetch(`https://api.jikan.moe/v4/top/anime?&limit=10`);
      const resData = await res.json();
      setAnimeData(resData.data);
      console.log(resData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };




  useEffect(() => {
    getData();
  }, []);

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  return (
    <SidebarWithHeader>
        <Box marginLeft={"30px"} marginRight={"30px"} padding={"0px 80px"}>
        <Text color={"#3DD2CC"} fontSize={30} marginBottom={5}>TOP ANIME</Text>
        <Slider {...sliderSettings}>
        {animeData ? (
          animeData.map((anime, index) => (
            <Link to={`/anime/${anime.mal_id}`} key={index}>
              <Card
                key={index}
                maxW="xs"
                bg="#212121"
                border="2px solid rgba(61, 210, 204, 0.4)"
                textAlign="center"
                cursor="pointer"
                _hover={{
                  border: "2px solid #3DD2CC",
                }}
                onClick={() => handleCardClick(anime)}
              >
                <CardBody
                  display="flex"
                  flexWrap="wrap"
                  alignItems="center"
                  justifyContent="center"
                  minW="300"
                >
                  <Box
                    color="#666666"
                    bg="#212121"
                    mt="-20px"
                    mb="20px"
                    border="1px solid yellow"
                    borderRadius="5"
                    borderTopRadius="0"
                    p="2px 4px"
                  >
                    {anime.score}
                  </Box>

                  <Image
                    src={anime.images?.jpg?.image_url || ""}
                    alt="animeImage"
                    sizes={["sm", "md"]}
                    borderRadius="lg"
                    objectFit="cover"
                    width="100%"
                    height="400px"
                  />

                  <Text color="#666666" mt="15px" fontWeight="bold" isTruncated>
                    {anime.title}
                  </Text>
                </CardBody>
              </Card>
              </Link>
          ))
        ) : (
          <Spinner color="#3DD2CC" />
        )}
      </Slider>


     </Box>
    </SidebarWithHeader>
  );
};

export default Popular;
