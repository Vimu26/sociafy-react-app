import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  TextField
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/widgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import axios from "axios";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import UserImage from "components/userImage";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments
}) => {
  const [isComments, setIsComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const user = useSelector((state) => state.user);
  const isLiked = Boolean(likes?.[loggedInUserId.toString()] ?? false);
  const likeCount = likes ? Object.keys(likes).length : 0;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const addLike = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3620/api/posts/${postId}/like`,
        { user: loggedInUserId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      console.log(response.data);
      dispatch(setPost({ post: response.data }));
    } catch (error) {
      console.error("Liking Failed:", error);
    }
  };

  const addComment = async (comment) => {
    console.log(comment);
    try {
      const response = await axios.patch(
        `http://localhost:3620/api/posts/${postId}`,
        { comments: { user: user, comment: comment } },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      console.log(response.data);
      dispatch(setPost({ post: response.data }));
    } catch (error) {
      console.error("Commenting Failed:", error);
    }
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3620/uploads/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={addLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      <Divider />
      {isComments && (
        <>
          <Box mt="1rem">
            <TextField
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              multiline
              minRows={1}
              fullWidth
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => {
                      if (commentText.trim() !== "") {
                        addComment(commentText);
                        setCommentText("");
                      }
                    }}
                    disabled={commentText.trim() === ""}
                  >
                    <SendOutlinedIcon />
                  </IconButton>
                )
              }}
            />
          </Box>
          <Divider />
          <Box mt="0.75rem">
            {comments.map((comment, i) => (
              <Box key={`${name}-${i}`} x={{ mt: "1rem" }}>
                <FlexBetween>
                  <FlexBetween>
                    <UserImage image={comment.user.picture_path} size="55px" />
                    <Box>
                      <Typography color={main} variant="h5" fontWeight="500">
                        {comment.user.name.first_name +
                          " " +
                          comment.user.name.last_name}
                      </Typography>
                      <Typography color={main} fontSize="0.75rem">
                        {comment.comment}
                      </Typography>
                    </Box>
                  </FlexBetween>
                </FlexBetween>
              </Box>

              // <Box key={`${name}-${i}`}>
              //   <Divider />
              //   <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
              //     {comment}
              //   </Typography>
              // </Box>
            ))}
          </Box>
        </>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
