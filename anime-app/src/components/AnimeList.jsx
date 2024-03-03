import { Card, CardBody, Image, Text, Spinner,Box, } from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const AnimeList = ({ animeList }) => {
  const [selectedAnime, setSelectedAnime] = useState(null);

  const handleCardClick = (anime) => {
    setSelectedAnime(anime);

  };
  return (
    <>
      {animeList ? (
        animeList.map((anime, index) => {
          return (
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
              <CardBody display="flex" flexWrap="wrap" alignItems="center" justifyContent="center" minW="300">
                <Box 
                color="#666666" 
                bg="#212121" 
                mt="-20px" 
                mb="20px" 
                border="1px solid yellow" 
                borderRadius="5" 
                borderTopRadius="0"
                p="2px 4px">{anime.score}
                </Box>

                <Image
                  src={anime.images?.jpg?.image_url || ''}
                  alt='animeImage'
                  sizes={['sm', 'md']}
                  borderRadius="lg"
                  objectFit="cover"
                  width="100%"
                  height={"400px"}
                />
                
                <Text color="#666666" mt="15px" fontWeight="bold" isTruncated >
                  {anime.title}
                </Text>
              </CardBody>
            </Card>
            </Link>
 
          );
        })
      ) : <Spinner color='#3DD2CC' />}




    </>
  );
};
