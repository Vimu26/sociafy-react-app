import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/widgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import axios from "axios";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3620/api/users/${userId}/friends`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = response.data;
      dispatch(setFriends({ friends: data.data }));
    } catch (error) {
      console.error("Friends Getting failed:", error);
    }
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends?.map((friend) => (
          <Friend
            key={`friend-${friend._id}`}
            friendId={friend._id || ""}
            name={
              friend.name
                ? `${friend.name.first_name}  ${friend.name.last_name}`
                : ""
            }
            subtitle={friend.occupation}
            userPicturePath={friend.picture_path}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
