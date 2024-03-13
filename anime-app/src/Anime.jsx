// Anime.jsx
import { useEffect, useState } from "react";
import { Flex, useBreakpointValue } from "@chakra-ui/react";
import { AnimeList } from "./components/AnimeList";
import SidebarWithHeader from "./components/SideBar.jsx";
import Video from "./components/Video.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Filter from "./components/Filter.jsx";
import useDebounce from "./hooks/debounce.js";


const Anime = () => {
  const [animeData, setAnimeData] = useState(null); //data anime for animelist
  const [search, setSearch] = useState(""); // search
  const debouncedSearch = useDebounce(search,1500);
  const [filterData, setFilterData] = useState([]);
  const isMobile = useBreakpointValue({ base: true, sm: false});
  const isTablet = useBreakpointValue({ base: true, md: false});
  const isLarge = useBreakpointValue({ base: true, lg: false});
  const token = localStorage.getItem("accessToken");

  
  const getData = async () => {
    try {
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
  },[debouncedSearch,filterData]);

  const handleSearch = (value) => {
    console.log(value)
    setSearch(value);
  };

  return (
    <SidebarWithHeader>
      {!token ? (

          <>You dont have token !!!!</>
      ) : (
          <>
            {isMobile || isTablet || isLarge ?
                (
                    <Flex
                        flexWrap="wrap"

                    >
                      <SearchBar onSearch={handleSearch} />
                      <Flex
                          w={"100%"}
                          justifyContent={"center"}
                          marginBottom={"20px"}
                          marginTop={"20px"}
                          height="20%"
                          flexWrap="wrap"
                          gap="10px"
                      >
                        <Video />
                        <Flex
                            w={"100%"}
                        >
                          <Filter changeFilter={handleFilterDataChange}/>
                        </Flex>
                        <AnimeList animeList={animeData} />
                      </Flex>

                    </Flex>
                )
                :
                (
                    <Flex
                        flexWrap="wrap"
                        paddingLeft={"2%"}
                        paddingRight={"2%"}
                    >
                      <SearchBar onSearch={handleSearch} />
                      <Flex
                          w={"75%"}
                          justifyContent={"center"}
                          marginBottom={"20px"}
                          marginTop={"20px"}
                          height="20%"
                          flexWrap="wrap"
                          gap="10px"
                      >
                        <Video />
                        <AnimeList animeList={animeData} />
                      </Flex>
                      <Flex
                          w={"22%"}
                          marginLeft={"3%"}
                          height="100%"
                      >
                        <Filter changeFilter={handleFilterDataChange}/>
                      </Flex>

                    </Flex>
                )}
          </>
      )}
    </SidebarWithHeader>
  );
};

export default Anime;
