import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { 
    Avatar,
    AvatarBadge,
    Box,
    CloseButton,
    Drawer,
    DrawerContent,
    Flex,
    HStack,
    Icon,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    VStack,
    Image,
    Badge,
    Heading,

} from "@chakra-ui/react";

import {     
    FiBell,
    FiHome,
    FiMenu,
    FiTrash } from "react-icons/fi"

import { FaBook, FaFire } from "react-icons/fa";
import { BsCollectionFill } from "react-icons/bs";
import { jwtDecode } from "jwt-decode";


const token = localStorage.getItem("accessToken")
const decoded = token && jwtDecode(token);



export default function SidebarWithHeader({ children }) {
    const {isOpen, onOpen, onClose} = useDisclosure();



    return (
        <Box minH="100vh" bg="#191919">
            <SidebarContent
                onClose={() => onClose}
                display={{base: 'none', md: 'block'}}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={() => onClose()}  
                returnFocusOnClose={false}
                onOverlayClick={() => onClose()}  
                size="full"
            >
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen} />
            <Box ml={{base: 0, md: 60}} p="4">
                {children}
            </Box>
        </Box>
    );
}


const SidebarContent = ({onClose, ...rest}) => {
    return (
        <Box
        transition="1s ease"
        bg="#212121"
        borderRight="1px"
        borderRightColor="#3DD2CC"
        w={{base:"full" , md: 60}}
        pos="fixed"
        h="full"
        borderRightRadius="30px"
        color="#666666"
        {...rest}>
            <Flex
            h="20"
            flexDirection="column"
            alignItems="center"
            mx="8"
            mb={75}
            mt={5}
            justifyContent="space-between">
                <Heading style={{
                    color:"#3DD2CC",
                    marginTop:"100px"
                    
                    }}>AniKami</Heading>
                <CloseButton display={{base: 'flex', md: 'none'}} onClick={onClose}/>
            </Flex>
                <NavItem  route={"/anime"} icon={FiHome} >
                    Home
                </NavItem>
                <NavItem  route={"/topAnime"} icon={FaFire} >
                    Anime
                </NavItem>
                <NavItem  route={"/topManga"} icon={FaBook}>
                    Manga
                </NavItem>
                <NavItem  route={"/collection"} icon={BsCollectionFill}>
                    Collection
                </NavItem>

        </Box>
    );
}

const NavItem = ({icon, route, children,element,...rest}) => {
    return (
        <>
            <Link
                to={route}
                style={{ textDecoration: 'none' }}
                _focus={{ boxShadow: 'none' }}>
                <Flex
                    align="center"
                    paddingLeft="12"
                    py="5"
                    role="group"
                    cursor="pointer"
                    gap="2"
                    _hover={{
                        bg: 'rgba(61, 210, 204, 0.4)',
                        color: '#3DD2CC',
                    }}
                    {...rest}>
                    {icon && (
                        <Icon
                            mr="4"
                            fontSize="16"
                            _groupHover={{
                                color: '#3DD2CC',
                            }}
                            as={icon}
                        />
                    )}
                    {children}
                </Flex>
            </Link>
            <Routes>
                <Route path={route}  />
            </Routes>
        </>

    );
};

const MobileNav = ({ onOpen, customerId, ...rest}) => {

    
    const [isProfileModalOpen, setProfileModalOpen] = useState(false);
    const {
        isOpen: isNotificationsModalOpen,
        onOpen: onNotificationsModalOpen,
        onClose: onNotificationsModalClose,
    } = useDisclosure();
    const [notifications, setNotifications] = useState([
        'Developers are trying to improve the app every day',
        'You have successfully logged into the application!!!',
        // ... (more notifications)
    ]);

    const handleProfileClick = () => {
        setProfileModalOpen(true);
    };

    const handleCloseProfileModal = () => {
        setProfileModalOpen(false);
    };
    const handleNotificationsClick = () => {
        onNotificationsModalOpen();
    };

    const handleCloseNotificationsModal = () => {
        onNotificationsModalClose();
    };

    const handleDeleteNotification = (index) => {
        const updatedNotifications = [...notifications];
        updatedNotifications.splice(index, 1);
        setNotifications(updatedNotifications);
    };


    return (
        <Flex
            ml={{base: 0, md: 60}}
            px={{base: 4, md: 4}}
            height="20"
            alignItems="center"
            bg="#191919"
            justifyContent={{base: 'space-between', md: 'flex-end'}}
            {...rest}>
            <IconButton
                display={{base: 'flex', md: 'none'}}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu color="#3DD2CC"/>}
            />

            <Text
                display={{base: 'flex', md: 'none'}}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold"
                color="#3DD2CC"
                >
                Anime
            </Text>

            <HStack spacing={{base: '0', md: '6'}}>
                <HStack spacing="2">
                    <IconButton
                        size="md"
                        variant="ghost"
                        borderRadius="50%"
                        aria-label="open notifications"
                        icon={<FiBell color= '#3DD2CC'/>}
                        onClick={handleNotificationsClick}
                        bg="#212121"
                        position="relative"
                        _hover={{
                            bg: 'rgba(61, 210, 204, 0.4)',
                            color: '#3DD2CC',
                        }}
                    >
                    <Badge size="2xs" onClick={handleNotificationsClick} borderRadius="50%" bg="#3DD2CC">
                        {notifications.length}
                    </Badge>
                    </IconButton>
                </HStack>


                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{ boxShadow: 'none' }}
                        >
                            <HStack>
                                <Avatar size="md" src="https://i.pinimg.com/736x/20/e5/4c/20e54c30f7bf4e8b082abd6b9d51d3d4.jpg"  />
                            </HStack>
                        </MenuButton>

                        <MenuList
                            bg="#212121"
                            borderColor="#3DD2CC">
                            <MenuItem
                                onClick={handleProfileClick}
                                aria-label="open profile modal"
                                bg="#212121"
                                color="#666666"
                                _hover={{
                                bg: 'rgba(61, 210, 204, 0.4)',
                                color: '#3DD2CC',
                            }}>Profile
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>

            {/* Profile Modal */}
            <Modal isOpen={isProfileModalOpen} onClose={handleCloseProfileModal} size="md">
                <ModalOverlay />
                <ModalContent textAlign={'center'} bg="#212121" color="#666666">
                    <ModalHeader>Profile</ModalHeader>
                    <ModalCloseButton 
                        _hover={{
                            bg: 'rgba(61, 210, 204, 0.4)',
                            color: '#3DD2CC',}}
                    />
                    <ModalBody>
                        {/* Customize the profile  */}
                        <VStack spacing="4" align="stretch">
                            <Avatar size="xl" src="https://i.pinimg.com/736x/20/e5/4c/20e54c30f7bf4e8b082abd6b9d51d3d4.jpg" alignSelf={'center'} >
                                <AvatarBadge boxSize='1em' bg='green.500' />
                            </Avatar>
                            <Text fontSize="lg" fontWeight="bold">
                            {decoded?.sub}
                            </Text>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>


            <Modal isOpen={isNotificationsModalOpen} onClose={handleCloseNotificationsModal} size="md">
                <ModalOverlay />
                <ModalContent bg="#212121" color="#666666">
                    <ModalHeader textAlign={'center'}>Notifications</ModalHeader>
                    <ModalCloseButton 
                        _hover={{
                            bg: 'rgba(61, 210, 204, 0.4)',
                            color: '#3DD2CC',}}
                    />
                    <ModalBody>
                        {/* Display the number of notifications */}
                        <Text mb="4" fontSize="lg" fontWeight="bold">
                            {notifications.length} Notifications
                        </Text>

                        {/* Display notifications and allow deletion */}
                        <VStack spacing="4" align="stretch">
                            {notifications.map((notification, index) => (
                                <Flex key={index} justifyContent="space-between" alignItems="center">
                                    <Text fontSize="lg">{notification}</Text>
                                    <IconButton
                                        size="sm"
                                        variant="ghost"
                                        aria-label="delete notification"
                                        bg='rgba(61, 210, 204, 0.4)'
                                        icon={<FiTrash />}
                                        onClick={() => handleDeleteNotification(index)}
                                        _hover={{
                                            bg: '#3DD2CC',
                                            color: 'white',
                                        }}
                                    />
                                </Flex>
                            ))}
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Flex>
    );
};