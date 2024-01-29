//register user
const register = async (req, res) => {
    try {
        console.log("register")
    //   const user = await userService.createUser({
    //     first_name: req.body.first_name,
    //     last_name: req.body.last_name,
    //     email: req.body.email,
    //     contact_number: req.body.contact_number,
    //     address: req.body.address,
    //     password: req.body.password,
    //   });
    //   res.status(201).json({
    //     status: true,
    //     message: "User Registered Successfully",
    //     data: user,
    //   });
    } catch (error) {
    //   if (!error.code == 11000) {
    //     console.error("An error occurred", error.message);
    //     return res.status(500).json({ status: false, message: error.message });
    //   }
    //   res.status(409).json({
    //     status: false,
    //     message: "An error occurred Because of Duplicate Creation",
    //     error: error.message,
    //   });
    }
  };
  
  export default { register };