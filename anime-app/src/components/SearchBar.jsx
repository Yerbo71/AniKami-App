// SearchBar.jsx
import React from "react";
import { Input, Flex, Button } from "@chakra-ui/react";

const SearchBar = ({ onSearch }) => {
  const handleSearch = () => {
    onSearch();
  };

  return (
    <Flex width="full" m="5">
      <Input
        type="search"
        id="animeSearch"
        name="animeSearch"
        placeholder="Search your anime"
        border="2px solid rgba(61, 210, 204, 0.4)"
        borderRightRadius="0"
        color="white"
        _hover={{
          border: "2px solid #3DD2CC",
        }}
        onChange={(e) => onSearch(e.target.value)}
      />
      <Button
        onClick={handleSearch}
        borderLeftRadius="0"
        border="2px solid rgba(61, 210, 204, 0.4)"
        bg="#212121"
        color="#666666"
        _hover={{
          bg: "#3DD2CC",
          color: "white",
        }}
      >
        Search
      </Button>
    </Flex>
  );
};

export default SearchBar;
