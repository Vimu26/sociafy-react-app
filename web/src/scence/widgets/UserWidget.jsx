import {
  ManageAccountsOutlined,
  EditOutlined,
  WorkOutlineOutlined
} from "@mui/icons-material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import React, { useEffect, useState } from "react";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/userImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/widgetWrapper";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserWidget = () => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    console.log(token);
    try {
      const response = await axios.get("http://localhost:3620/api/users/user", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(response.data);
      console.log(response.data);
    } catch (err) {
      //
    }
  };
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) {
    return null;
  }

  const {
    name = {},
    address = {},
    occupation,
    viewed_profiles,
    impressions,
    friends,
    picture_path
  } = user.data;

  const { salutation = "", first_name = "", last_name = "" } = name;

  const { no = "", street1 = "", street2 = "", city = "" } = address;

  return (
    <WidgetWrapper>
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${user.data._id}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picture_path} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer"
                }
              }}
            >
              {salutation + " " + first_name + " " + last_name}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>
      <Divider />
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem " mb="0.5rem">
          <LocationOnOutlinedIcon fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>
            {no + " " + street1 + " " + street2 + " " + city}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem " mb="0.5rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box p="1rem 0">
        <FlexBetween mb="0.5 rem">
          <Typography color={medium}>Who's Viewed Your Profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewed_profiles}
          </Typography>
        </FlexBetween>
        <FlexBetween mb="0.5 rem">
          <Typography color={medium}>Impression's On Your Posts</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>
      <Divider />
      <Box p="1rem 0">
        <Typography fontSize="1rem" fontWeight="500" color={main} mb="1rem">
          Social Profiles
        </Typography>
        <FlexBetween gap="1rem" mb="0.5 rem">
          <FlexBetween gap="1rem">
            <img src="/assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium} fontWeight="500">
                Social Network
              </Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
        <Divider />
        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="/assets/linkedin.png" alt="Linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium} fontWeight="500">
                Network Platform
              </Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
