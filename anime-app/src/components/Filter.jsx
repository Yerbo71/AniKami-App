import { Box, Spinner, Checkbox, Stack, Button,Flex ,Heading} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Filter = ({changeFilter}) => {
  const [filterData, setFilterData] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [visibleGenres, setVisibleGenres] = useState(6);

  const getData = async () => {
    try {
      const res = await fetch(`https://api.jikan.moe/v4/genres/anime`);
      const resData = await res.json();
      setFilterData(resData.data);
      console.log(resData);
    } catch (error) {
      console.error("Fetching data error", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleCheckboxChange = (genre) => {
    const updatedGenres = [...selectedGenres];
    const genreIndex = updatedGenres.indexOf(genre);

    if (genreIndex === -1) {
      updatedGenres.push(genre);
    } else {
      updatedGenres.splice(genreIndex, 1);
    }

    setSelectedGenres(updatedGenres);
    changeFilter(updatedGenres);
  };

  const filteredGenres =
    filterData &&
    filterData.filter((filter) => filter.count > 50).slice(0, visibleGenres);

  const handleLoadMore = () => {
    setVisibleGenres((prev) => prev + 6);
  };

  return (
    <Box w={"100%"}>
        <Heading style={{color:"#E8E8E8",fontSize:"20px",fontWeight:"500",marginBottom:"20px"}}>Categories</Heading>
      {filterData ? (
        <div style={{
            color:"#E8E8E8",
            padding:"20px",
            backgroundColor:"#212121",
            borderRadius:"15px",
            width:"100%"

        }}>
          {filteredGenres.map((filter, index) => (
            <Box key={index} style={{
                display:"flex",
                width:"100%",
                justifyContent:"space-between",
                alignItems:"center",
                borderBottom:"1px solid #666666",
                padding:"10px 0px",
                fontWeight:"500",
                fontSize:"15px"
                }}>
                {filter.name }
              <Checkbox
                isChecked={selectedGenres.includes(filter.mal_id)}
                onChange={() => handleCheckboxChange(filter.mal_id)}
                colorScheme="teal"
                size="lg"
              >
              </Checkbox>
            </Box>

          ))}
          {filterData.length > visibleGenres && (
            <div>
                <div onClick={handleLoadMore} style={{
                color:"#666666",
                fontSize:"13px",
                alignSelf:"center",
                width:"100%",
                display:"flex",
                justifyContent:"center",
                alignContent:"center",
                marginTop:"15px"
                }}>
                Load More
                </div>
            </div>
          )}
        </div>
      ) : (
        <Spinner color="#3DD2CC" />
      )}
    </Box>
  );
};

export default Filter;
