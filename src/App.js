// import React, { useState } from "react";

// function LoginPage({ handleLogin }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     handleLogin(username, password);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label style={{ marginLeft: "10px", paddingRight: "10px" }}>
//         Username :{" "}
//         <input
//           type="text"
//           value={username}
//           onChange={(event) => setUsername(event.target.value)}
//         />
//       </label>
//       <label style={{ marginLeft: "10px", paddingRight: "10px" }}>
//         Password :{" "}
//         <input
//           type="password"
//           value={password}
//           onChange={(event) => setPassword(event.target.value)}
//         />
//       </label>
//       <button type="submit">Log In</button>
//     </form>
//   );
// }

// function HomeScreen() {
//   return (
//     <div>
//       <h1>Welcome to the Home Screen!</h1>
//       <p>Here is some content for the home screen.</p>
//     </div>
//   );
// }

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLogin = (username, password) => {
//     // Perform authentication logic here
//     if (username === "user" && password === "123") {
//       setIsLoggedIn(true);
//     } else {
//       alert("Incorrect username or password");
//     }
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//   };

//   return (
//     <div>
//       {isLoggedIn ? (
//         <div>
//           <nav>
//             <ul>
//               {/* <li>
//                 <a href="#">Home</a>
//               </li> */}
//               <li>
//                 <a href="" onClick={handleLogout}>
//                   Log Out
//                 </a>
//               </li>
//             </ul>
//           </nav>
//           <HomeScreen />
//         </div>
//       ) : (
//         <div>
//           <nav>
//             <ul>
//               {/* <li>
//                 <a href="">Log In</a>
//               </li> */}
//             </ul>
//           </nav>
//           <LoginPage handleLogin={handleLogin} />
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Checkbox,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import logo from "./assests/wissenlogo.PNG";
import { LOGINURL, BASEURL } from "./constants/Constants";

const App = () => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userList, setUserList] = useState([]);

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const fetchLoginData = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email: userEmail, password: password }),
      };
      const response = await fetch(LOGINURL, requestOptions);
      const data = await response.json();
      if (data.status === 204) {
        setToken(data.token);

        try {
          const requestOptions1 = {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
              "Content-type": "application/json",
            },
          };
          const response = await fetch(BASEURL, requestOptions1);
          const data = await response.json();
          setUserList(data.data);
        } catch {
          alert("No");
          console.log("data error");
        }
      } else if (data.status !== 204) {
        alert("User Not Found");
      }
    } catch (error) {
      alert(error);
      console.log("error login");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userEmail !== "" && password !== "") {
      fetchLoginData();
      setUserEmail(" ");
      setPassword(" ");
    } else {
      alert("User Email or Password can't be empty");
    }
  };

  useEffect(() => {
    userList.map((data) => {
      console.log("user name list fetch from API : " + data.name);
      return data.name;
    });
  }, [userList]);

  return (
    <Box style={{ margin: "10px", display: "flex", justifyContent: "center" }}>
      <Box style={{ display: "flex", flexDirection: "column" }}>
        <img
          src={`${logo}?w=40&h=40&fit=crop&auto=format`}
          alt="logo"
          loading="lazy"
          style={{ marginBottom: "10px" }}
        />
        <Typography
          variant="h6"
          component="h6"
          style={{ marginBottom: "40px" }}
        >
          Hello there, Sign In to Continue
        </Typography>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" component="h6" sx={{ color: "grey" }}>
            Email
          </Typography>
          <TextField
            value={userEmail}
            variant="outlined"
            onChange={(e) => setUserEmail(e.target.value)}
            sx={{ width: "400px", color: "grey" }}
          />
          <Typography
            variant="h6"
            component="h6"
            sx={{ marginTop: "20px", color: "grey" }}
          >
            Password
          </Typography>
          <TextField
            value={password}
            type={showPassword ? "text" : "password"}
            variant="outlined"
            onChange={handlePasswordChange}
            sx={{ width: "400px" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box
            sx={{
              width: "400px",
              marginBottom: "40px",
              marginTop: "20px",
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
            }}
          >
            <Checkbox {...label} />
            <Typography
              variant="p"
              component="p"
              sx={{
                lineHeight: "20px",
                color: "grey",
              }}
            >
              By creating or logging into an account, you are agreeing with our{" "}
              <b>Terms & Condition</b>
              and <b>Privacy Policy</b>
            </Typography>
          </Box>

          <Box style={{ marginTop: "20px" }}>
            <Button
              variant="contained"
              type="submit"
              style={{ width: "400px" }}
              sx={{
                backgroundColor: "#aac0e3",
                color: "#f5f0f3",
                padding: "10px",
                fontWeight: 700,
              }}
            >
              Next
            </Button>
          </Box>
        </form>
      </Box>
    </Box>

    // <div>
    //   <div>
    //     <div>
    //       <h3>Hello there, Sign in to continue</h3>

    //       <div>
    //         <form onSubmit={handleSubmit}>
    //           <div>
    //             <label>Username/Email</label>
    //             <input
    //               type="text"
    //               onChange={(e) => setUserEmail(e.target.value)}
    //             />
    //             <div></div>
    //           </div>
    //           <div>
    //             <label>Password</label>
    //             <input
    //               type="password"
    //               onChange={(e) => setPassword(e.target.value)}
    //             />
    //             <div></div>
    //           </div>
    //           <button type="submit">Login</button>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

// render(<App />, document.getElementById('root'));

export default App;
