import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import axios from "axios";

const PostsWidget = ({ isProfile = false }) => {
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getAllPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3620/api/posts/", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = response.data;
      dispatch(setPosts({ posts: data.data }));
    } catch (error) {
      console.error("Post Showing failed:", error);
    }
  };

  const getAllUserPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3620/api/posts/", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          userId: user_id._id
        }
      });

      const data = response.data;
      dispatch(setPosts({ posts: data.data }));
    } catch (error) {
      console.error("Post Showing failed:", error);
    }
  };
  useEffect(() => {
    if (isProfile) {
      getAllUserPosts();
    } else {
      getAllPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
      <>
        {posts.map(
          (post) => (
            <PostWidget
              key={post._id}
              postId={post._id}
              postUserId={post.user._id}
              name={`${post.user.name.first_name}  ${post.user.name.last_name}`}
              description={post.description}
              location={post.user.address.city}
              picturePath={post.picture_path}
              userPicturePath={post.user.picture_path}
              likes={post.likes}
              comments={post.comments}
            />
          )
        )}
      </>
    );
};

export default PostsWidget;
