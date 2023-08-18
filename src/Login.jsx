import axios from "axios";
import { useFormik } from "formik";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { config } from "./config";
import UserContext from "./usercontext";

function Login() {
  let contextData = useContext(UserContext);
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      role: "",
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        console.log(values);
        const user = await axios.post(`${config.api}`, values);
        localStorage.setItem("react_app_token", user.data.token);
        alert(user.data.message);
        contextData.setUserName(values.username);
        if (user.data.message === `Successfully Logged In!!`) {
          console.log(values.role);
          if (values.role === "Admin") {
            navigate("/admin-dashboard");
          } else if (values.role === "User") {
            navigate("/dashboard");
          } else {
            alert("Please try Admin/User (Case Sensitive)");
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="container">
      <img className='loginlogo'  src='https://www.pngitem.com/pimgs/m/193-1936701_transparent-bookmyshow-logo-hd-png-download.png'></img>
      <div className="col">
        <div className="row">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4 col-lg-6">
              <label for="username" className="form-label">
                <h4>Enter Role (User/Admin)</h4>
              </label>
              <input
                type="text"
                className="form-control text-capitalize"
                id="role"
                name="role"
                onChange={formik.handleChange}
                value={formik.values.role}
              />
            </div>

            <div className="mb-4 col-lg-6">
              <label for="username" className="form-label">
               <h4> UserName</h4>
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
            </div>
            <div className="mb-4 col-lg-6">
              <label for="exampleInputPassword1" className="form-label">
                <h4>Password</h4>
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <p className="form-label">
                <Link to="/resetpassword"> Forget Password?</Link>
              </p>
            </div>

            <button type="submit" className="btn btn-danger">
              Submit
            </button>

            <div className="mb-3">
              <h5 className="form-label">
                Dont have account,<Link to="/register">Click here</Link> to
                SignUP
              </h5>
            </div>
          </form>
        </div>
                <div style={{fontSize:"20px"}}>
                  For Testing:<br/>
                  Role: User<br/>
                  username: client<br/>
                  password: client2525<br/>
                  Role: Admin<br/>
                  username: admin<br/>
                  password: admin2525<br/>
                  </div>
      </div>
    </div>
  );
}

export default Login;