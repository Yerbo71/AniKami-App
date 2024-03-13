import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import SidebarWithHeader from "./SideBar";
import {AspectRatio, Box, Flex, useBreakpointValue} from "@chakra-ui/react";
import like from "./../assets/Like.svg";
import liked from "./../assets/Liked.svg"
import share from "./../assets/Share.svg";
import bookmark from "./../assets/Bookmark.svg";
import bookmarked from "./../assets/Bookmarked.svg";
import star from "./../assets/Star.svg";
import tickets from "./../assets/Tickets.svg";
import lists  from "./../assets/List.svg";
import gojo from "./../assets/gojo.jpg";
import { AppContext } from "../App";

const PageAnime = () => {
  const { setId } = useContext(AppContext);
  const { id } = useParams();
  const [animeData, setAnimeData] = useState(null);
  const [isLiked, setLiked] = useState(false);
  const [isShared, setShared] = useState(false);
  const [isBookmarked, setBookmarked] = useState(false);

  const isMobile = useBreakpointValue({ base: true, sm: false});
  const isTablet = useBreakpointValue({ base: true, md: false});
  const isLarge = useBreakpointValue({ base: true, lg: false});

  const toggleLike = () => {
    setLiked((prev) => !prev);
  };
  
  const toggleShare = () => {
    setShared((prev) => !prev);
  };
  
  const toggleBookmark = () => {
    console.log("Clicked ", id);
    setId(id);
    setBookmarked((prev) => !prev);
  };

  const getData = async () => {
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
      const resData = await res.json();
      setAnimeData(resData.data);
      console.log(resData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SidebarWithHeader>
      {animeData ? (
          <>
            {isMobile || isTablet || isLarge ?
                (
                    <>
                      {animeData.trailer && (
                          <AspectRatio ratio={16 / 9}>
                            <iframe
                                title={animeData.title}
                                src={animeData.trailer.embed_url}
                                allowFullScreen
                                style={{
                                  borderRadius: "50px",
                                  border: "2px solid rgba(61, 210, 204, 0.4)"
                                }}
                            >
                            </iframe>

                          </AspectRatio>
                      )}
                      <Flex width={"100%"} marginTop={"10px"} flexWrap="wrap" justifyContent="center">
                        <Flex style={{
                          fontWeight: '400',
                          fontSize: '23px',
                          width: "100%",
                          flexDirection: 'row',
                          color:"#E8E8E8",
                          justifyContent:"center",
                          flexWrap:"wrap",
                        }}>
                          <ul style={{ display: 'flex', flexDirection: 'row', padding: "5px", gap: "10px",cursor:"pointer",flexWrap:"wrap" }}>
                            <li onClick={toggleLike} ><img src={isLiked ? liked : like}/></li>
                            <li><img src={share}/></li>
                            <li onClick={toggleBookmark} ><img src={isBookmarked ?  bookmarked : bookmark}/></li>
                            <li><img src={star}/></li>
                            <li>{animeData.score}</li>
                            <li style={{color:"#666666"}}>{"|" + animeData.members}</li>
                          </ul>
                        </Flex>
                        <Flex style={{
                          fontWeight: '400',
                          fontSize: '23px',
                          width: "100%",
                          color:"#E8E8E8",
                          alignItems:"center",
                          justifyContent:"center",
                        }}>
                          <ul style={{ display: 'flex', flexDirection: 'row', padding: "5px", gap: "10px" }}>
                            <li>{animeData.title} &middot;</li>
                            <li>{animeData.year} &middot;</li>
                            <li>{animeData.episodes + "ep"} &middot;</li>
                            <li>{animeData.duration}</li>
                          </ul>
                        </Flex>
                        <Flex style={{
                          fontWeight: '400',
                          width: "100%",
                          color:"#E8E8E8",
                          alignItems:"center",
                          justifyContent:"center",
                          gap:"10px",
                          marginTop:"10px"
                        }}>
                          {animeData.genres.slice(0, 3).map((genre, index) => (
                              <div style={{
                                border:"1px solid gray",
                                borderRadius: "15px",
                                display:"flex",
                                alignItems:"center",
                                fontSize:"20px",
                                padding:"0px 10px",
                                margin:"0px"
                              }} key={index}>{genre.name}</div>
                          ))}
                        </Flex>

                        <Flex width={"100%"} marginTop={"22px"}>
                          <div style={{
                            backgroundColor:"#3DD2CC",
                            width:"100%",
                            display: 'flex',
                            justifyContent:'center',
                            alignContent:'center',
                            textAlign:'center',
                            padding:"10px",
                            borderRadius:"10px",
                            color:"white",
                            fontWeight:"500",
                            fontSize:"20px"
                          }}>
                            <img src={tickets} style={{marginTop:"4px"} }/>
                            See Showtimes
                          </div>
                        </Flex>

                        <Flex width={"100%"} marginTop={"15px"}>
                          <div style={{
                            backgroundColor:"#121212",
                            width:"100%",
                            display: 'flex',
                            justifyContent:'center',
                            alignContent:'center',
                            textAlign:'center',
                            padding:"10px",
                            borderRadius:"10px",
                            color:"white",
                            fontWeight:"500",
                            fontSize:"20px"

                          }}>
                            <img src={lists} style={{marginTop:"4px"}}/>
                            More watch options
                          </div>
                        </Flex>

                        <Flex width={"100%"} marginTop={"15px"}>
                          <img src={gojo} style={{width:"100%",height:"300px",borderRadius:"12px"}}/>
                        </Flex>
                        <Flex marginTop={"20px"} width={"100%"} color="#E8E8E8" flexWrap="wrap">
                          <h3 style={{width:"100%"}}>Synopsis</h3>
                          {animeData.synopsis}
                        </Flex>
                        <Flex width={"100%"} color="#E8E8E8">
                          <div style={{
                            width: "100%",
                            display:"flex",
                            gap:"10px",
                            borderTop:"1px solid gray",
                            marginTop:"20px",
                            padding:"10px 2px",
                            fontSize:"20px",
                          }}>
                            <div>Studio :</div>
                            <div>
                              {animeData.studios.slice(0, 1).map((studio, index) => (
                                  <div style={{
                                    color:"#3DD2CC"
                                  }} key={index}>{studio.name}</div>
                              ))}
                            </div>
                          </div>
                        </Flex>
                        <Flex width={"100%"} color="#E8E8E8" >
                          <div style={{
                            width: "100%",
                            display:"flex",
                            gap:"10px",
                            borderTop:"1px solid gray",
                            padding:"10px 2px",
                            fontSize:"20px",
                          }}>
                            <div>Licensor :</div>
                            <div>
                              {animeData.licensors.slice(0, 1).map((studio, index) => (
                                  <div style={{
                                    color:"#3DD2CC"
                                  }} key={index}>{studio.name}</div>
                              ))}
                            </div>
                          </div>
                        </Flex>
                        <Flex width={"100%"} color="#E8E8E8" >
                          <div style={{
                            width: "100%",
                            display:"flex",
                            gap:"10px",
                            borderTop:"1px solid gray",
                            borderBottom:"1px solid gray",
                            padding:"10px 2px",
                            fontSize:"20px",
                          }}>
                            <div>Producers :</div>
                            <div>
                              {animeData.producers.slice(0, 1).map((studio, index) => (
                                  <div style={{
                                    color:"#3DD2CC"
                                  }} key={index}>{studio.name}</div>
                              ))}
                            </div>
                          </div>
                        </Flex>
                        <Flex width={"100%"}  marginTop={"20px"}>
                          <div style={{
                            backgroundColor:"#3DD2CC",
                            padding:"8px 20px",
                            borderRadius:"8px"
                          }}>
                            {"Top rated anime" + "#" + animeData.rank}
                          </div>
                        </Flex>

                      </Flex>
                    </>
                )
                :
                (<div style={{marginLeft:"2%",marginRight:"2%"}}>
                      {/* Video Studio */}
                      {animeData.trailer && (
                          <AspectRatio ratio={9 / 3}>
                            <iframe
                                title={animeData.title}
                                src={animeData.trailer.embed_url}
                                allowFullScreen
                                style={{
                                  borderRadius: "50px",
                                  border: "2px solid rgba(61, 210, 204, 0.4)"
                                }}
                            >
                            </iframe>

                          </AspectRatio>
                      )}
                      <Flex width={"100%"}>
                        <Box w='70%' color="#E8E8E8" m={2}>
                          <Flex style={{
                            fontWeight: '400',
                            fontSize: '23px',
                            width: "100%",
                            flexDirection: 'row',
                            color:"#E8E8E8",
                            alignItems:"center",
                          }}>
                            <ul style={{ display: 'flex', flexDirection: 'row', padding: "5px", gap: "10px" }}>
                              <li>{animeData.title} &middot;</li>
                              <li>{animeData.year} &middot;</li>
                              <li>{animeData.episodes + "ep"} &middot;</li>
                              <li>{animeData.duration}</li>
                              {animeData.genres.slice(0, 2).map((genre, index) => (
                                  <div style={{
                                    border:"1px solid gray",
                                    borderRadius: "15px",
                                    display:"flex",
                                    alignItems:"center",
                                    fontSize:"15px",
                                    padding:"0px 10px",
                                    margin:"0px"
                                  }} key={index}>{genre.name}</div>
                              ))}
                            </ul>
                          </Flex>
                          <Flex marginTop={"20px"} width={"100%"}>
                            {animeData.synopsis}
                          </Flex>
                          <Flex width={"100%"} >
                            <div style={{
                              width: "100%",
                              display:"flex",
                              gap:"10px",
                              borderTop:"1px solid gray",
                              marginTop:"20px",
                              padding:"10px 2px",
                              fontSize:"20px",
                            }}>
                              <div>Studio :</div>
                              <div>
                                {animeData.studios.slice(0, 1).map((studio, index) => (
                                    <div style={{
                                      color:"#3DD2CC"
                                    }} key={index}>{studio.name}</div>
                                ))}
                              </div>
                            </div>
                          </Flex>
                          <Flex width={"100%"} >
                            <div style={{
                              width: "100%",
                              display:"flex",
                              gap:"10px",
                              borderTop:"1px solid gray",
                              padding:"10px 2px",
                              fontSize:"20px",
                            }}>
                              <div>Licensor :</div>
                              <div>
                                {animeData.licensors.slice(0, 1).map((studio, index) => (
                                    <div style={{
                                      color:"#3DD2CC"
                                    }} key={index}>{studio.name}</div>
                                ))}
                              </div>
                            </div>
                          </Flex>
                          <Flex width={"100%"} >
                            <div style={{
                              width: "100%",
                              display:"flex",
                              gap:"10px",
                              borderTop:"1px solid gray",
                              borderBottom:"1px solid gray",
                              padding:"10px 2px",
                              fontSize:"20px",
                            }}>
                              <div>Producers :</div>
                              <div>
                                {animeData.producers.slice(0, 1).map((studio, index) => (
                                    <div style={{
                                      color:"#3DD2CC"
                                    }} key={index}>{studio.name}</div>
                                ))}
                              </div>
                            </div>
                          </Flex>
                          <Flex width={"100%"}  marginTop={"20px"}>
                            <div style={{
                              backgroundColor:"#3DD2CC",
                              padding:"8px 20px",
                              borderRadius:"8px"
                            }}>
                              {"Top rated anime" + "#" + animeData.rank}
                            </div>
                          </Flex>
                        </Box>

                        {/*  Right side of the page */}
                        <Box width={"28%"} marginTop={"10px"} marginLeft={"20px"}>
                          <Flex style={{
                            fontWeight: '400',
                            fontSize: '23px',
                            width: "100%",
                            flexDirection: 'row',
                            color:"#E8E8E8",
                            justifyContent:"center",
                            flexWrap:"wrap",
                          }}>
                            <ul style={{ display: 'flex', flexDirection: 'row', padding: "5px", gap: "10px",cursor:"pointer",flexWrap:"wrap" }}>
                              <li onClick={toggleLike} ><img src={isLiked ? liked : like}/></li>
                              <li><img src={share}/></li>
                              <li onClick={toggleBookmark} ><img src={isBookmarked ?  bookmarked : bookmark}/></li>
                              <li><img src={star}/></li>
                              <li>{animeData.score}</li>
                              <li style={{color:"#666666"}}>{"|" + animeData.members}</li>
                            </ul>
                          </Flex>
                          <Flex width={"100%"} marginTop={"22px"}>
                            <div style={{
                              backgroundColor:"#3DD2CC",
                              width:"100%",
                              display: 'flex',
                              justifyContent:'center',
                              alignContent:'center',
                              textAlign:'center',
                              padding:"10px",
                              borderRadius:"10px",
                              color:"white",
                              fontWeight:"500",
                              fontSize:"20px"

                            }}>
                              <img src={tickets} style={{marginTop:"4px"} }/>
                              See Showtimes
                            </div>
                          </Flex>
                          <Flex width={"100%"} marginTop={"15px"}>
                            <div style={{
                              backgroundColor:"#121212",
                              width:"100%",
                              display: 'flex',
                              justifyContent:'center',
                              alignContent:'center',
                              textAlign:'center',
                              padding:"10px",
                              borderRadius:"10px",
                              color:"white",
                              fontWeight:"500",
                              fontSize:"20px"

                            }}>
                              <img src={lists} style={{marginTop:"4px"}}/>
                              More watch options
                            </div>
                          </Flex>

                          <Flex width={"100%"} marginTop={"15px"}>
                            <img src={gojo} style={{width:"100%",height:"300px",borderRadius:"12px"}}/>
                          </Flex>

                        </Box>
                      </Flex>

                    </div>
                )
            }

          </>
      )
      :
          (
              <>AnimeData is not found !!! </>
          )
      }
    </SidebarWithHeader>
  );
};

export default PageAnime;
