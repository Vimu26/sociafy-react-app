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
      console.log(posts);
      dispatch(setPosts({ posts: data }));
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
      console.log(posts);
      dispatch(setPosts({ posts: data }));
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

  //   return (
  //     <>
  //       {posts.map(
  //         ({
  //           _id,
  //           user,
  //           description,
  //           location,
  //           picture_path,
  //           likes,
  //           comments,
  //         }) => (
  //           <PostWidget
  //             key={_id}
  //             postId={_id}
  //             postUserId={user._id}
  //             name={`${user.first_name} ${user.last_name}`}
  //             description={description}
  //             location={location}
  //             picturePath={picture_path}
  //             userPicturePath={user.picture_path}
  //             likes={likes}
  //             comments={comments}
  //           />
  //         )
  //       )}
  //     </>
  //   );
};

export default PostsWidget;
