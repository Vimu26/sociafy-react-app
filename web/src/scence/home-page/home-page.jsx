import { Box } from "@mui/material";
import NavbarPage from "scence/navbar/navbar.page";
import UserWidget from "scence/widgets/UserWidget"


const HomePage = () => {
  return (<Box> 
    <NavbarPage></NavbarPage>
    <UserWidget/> </Box>);
};
export default HomePage