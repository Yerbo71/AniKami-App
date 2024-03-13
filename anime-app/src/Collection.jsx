import SidebarWithHeader from "./components/SideBar";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "./App";
import {
    Box,
    Card,
    CardBody, Flex,
    Image,
    Text,
} from "@chakra-ui/react";
import {Link} from "react-router-dom";

export default function Collection () {
    const {id} = useContext(AppContext);
    const [collectionData, setCollectionData] = useState("");
    const token = localStorage.getItem("accessToken");

    const getData = async () => {
        try {
          const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
          const resData = await res.json();
          setCollectionData(resData.data);
          console.log(resData.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      useEffect(() => {
        getData();
      }, [id]); 


    return(
        <SidebarWithHeader>
            {token && collectionData ? (
                <Flex justifyContent="center">
                    <Link to={`/anime/${id}`}>
                    <Card
                        maxW="xs"
                        bg="#212121"
                        border="2px solid rgba(61, 210, 204, 0.4)"
                        textAlign="center"
                        cursor="pointer"
                        _hover={{
                            border: "2px solid #3DD2CC",
                        }}
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
                                p="2px 4px">{collectionData.score}
                            </Box>

                            <Image
                                src={collectionData.images?.jpg?.image_url || ''}
                                alt='animeImage'
                                sizes={['sm', 'md']}
                                borderRadius="lg"
                                objectFit="cover"
                                width="100%"
                                height={"400px"}
                            />

                            <Text color="#666666" mt="15px" fontWeight="bold" isTruncated >
                                {collectionData.title}
                            </Text>
                        </CardBody>
                    </Card>
                    </Link>

                </Flex>
            ) : (
                <div>You dont have token !!!!</div>
            )}

        </SidebarWithHeader> 
    );
}