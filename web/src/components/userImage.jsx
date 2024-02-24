import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  const encodedFileName = encodeURIComponent(image);
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`http://localhost:3620/uploads/${encodedFileName}`}
      />
    </Box>
  );
};

export default UserImage;
