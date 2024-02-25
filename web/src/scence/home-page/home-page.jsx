import { Box, useMediaQuery } from "@mui/material";
// import { useSelector } from "react-redux";
import NavbarPage from "scence/navbar/navbar.page";
import UserWidget from "scence/widgets/UserWidget";
import MyPostWidget from "scence/widgets/MyPostWidget";
import PostsWidget from "scence/widgets/PostsWidget";
import FriendListWidget from "scence/widgets/FriendListWidget";
import { useSelector } from "react-redux";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const user = useSelector((state) => state.user);
  return (
    <Box>
      <NavbarPage></NavbarPage>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget />
          {/* <UserWidget userId={_id} picturePath={picture_path}/> */}
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget
          //  picturePath={picturePath}
          />
          <PostsWidget />
        </Box>
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <FriendListWidget userId={user._id} />
        </Box>
      </Box>
    </Box>
  );
};
export default HomePage;
