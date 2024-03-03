// Anime.jsx
import { useEffect, useState } from "react";
import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import { AnimeList } from "./components/AnimeList";
import SidebarWithHeader from "./components/SideBar.jsx";
import Video from "./components/Video.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Filter from "./components/Filter.jsx";

const Anime = () => {
  const [animeData, setAnimeData] = useState(null);
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);

  const isMobile = useBreakpointValue({ base: true, sm: false });

  const getData = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve,1000))
      const res = await fetch(`https://api.jikan.moe/v4/anime?&genres=${filterData}&q=${search}&limit=20`);
      const resData = await res.json();
      setAnimeData(resData.data);
      console.log(resData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFilterDataChange = (filter) => {
    setFilterData(filter);
  }

  useEffect(() => {
    getData();
  }, [search, filterData]);

  const handleSearch = (value) => {
    setSearch(value);
  };

  return (
    <SidebarWithHeader>
      <Flex
        flexWrap="wrap"
        paddingLeft={isMobile ? "0" : "2%"}
        paddingRight={isMobile ? "0" : "2%"}
      >
        <SearchBar onSearch={handleSearch} />
        <Flex 
        w={isMobile ? "100%" : "75%"} 
        justifyContent={"center"}
        alignItems={"center"}
        marginBottom={"20px"}
        marginTop={"20px"}
        >
          <Video />
        </Flex>
        <Flex w={isMobile ? "100%" : "22%"} marginLeft={isMobile ? "0" : "3%"}>
          <Filter changeFilter={handleFilterDataChange}/>
        </Flex>
        <Flex
          flexWrap="wrap"
          p="2"
          gap="5"
          justifyContent="center"
          w={isMobile ? "100%" : "80%"}
        >
          <AnimeList animeList={animeData} />
        </Flex>
      </Flex>
    </SidebarWithHeader>
  );
};

export default Anime;
