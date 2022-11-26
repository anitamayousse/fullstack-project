import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

// components
import Navbar from "../components/navbar/navbar";
import Nav from "../components/nav";
import Footer from "../components/footer/Footer";

// css (contact, signup, login, modify have same css from formInput.css in assets/css)
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    setTimeout(() => {
      document.querySelector('.quote').style.opacity= '1';
    }, 1600);

  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailValue = document.getElementById("email").value;
    const passwordValue = document.getElementById("password").value;

    setEmail(emailValue);
    setPassword(passwordValue);

    axios
      .post(
        "http://localhost:8000/login",
        { email, password },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          axios
            .get("http://localhost:8000/dashboard/user", {
              withCredentials: true,
            })
            .then((res) => {
              if (res.data.user.isAdmin) {
                toast.success("Ravi de te revoir, Pauline !");
                navigate("/dashboard/admin");
              } else {
                toast.success(
                  `Ravi de te revoir, ${res.data.user.firstName} !`
                );
                navigate("/dashboard/user");
              }
            });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(" Email et/ou mot de passe incorrect(s)");
      });
  };

  return (
    <LoginFormStyled>
      <Nav />
      <Navbar />
      {/*  LOGIN FORM */}
      <div className="login-page">
        <form
          className="login-form"
          action="http://localhost:8000/login"
          method="POST"
          onSubmit={handleSubmit}
        >
          <h2>Login</h2>
          <div>
            {/* Email */}
            <div className="email">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            {/* Password */}
            <div className="password">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            {/* Button Submit */}
            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="submit btn-dark"
              >
                {" "}
                Submit{" "}
              </button>
            </div>
          </div>
        </form>

        <div class="quotes quotes-block">
          <h2 className="text-center quote-title">Citation du jour</h2>
          <p className="quote">"Il n'y a qu'une façon d'échouer, c'est d'abandonner avant d'avoir réussi."</p>
        </div>
      </div>

      <Footer />
    </LoginFormStyled>
  );
}
export default Login;

const LoginFormStyled = styled.div`
  font-family: "poppins";
  font-size: 1.8rem;
  height: 100vh;

  /* Login form */
  .login-page {
    display: flex;
  }
  .login-form,
  .quotes-block {
    width: 50vw;
    height: 60vh;
    max-height: 60vh;

    border-radius: 5px;

    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .login-form {
    margin: 15% 2% 5% 5%;
    padding: 10% 0% 5% 0%;
    background-color: white;
    color: #4c2a4e;
  }

  label {
    display: block;
    font-size: 1em !important;
  }
  .submit {
    background-color: #4c2a4e;
    color: white;
    padding: 2%;
    width: 30%;
    margin: 5% 25%;
    font-size: 1em !important;
    border-radius: 4px;
  }
  input {
    width: 30vw;
    padding: 2%;
    margin: 1px;
    border: 1px solid #6b0070;
    border-radius: 4px;
  }
  /* Quotes */
  .quotes-block {
    margin: 15% 2% 5% 0%;
    padding: 0% 0% 5% 0%;
    background-color: #4c2a4e;
    color: white;
    display: flex;
  }

  .quote-title {
    margin: 10% auto 6%;
    color: white;
  }

  .quote{
    width:60%;
    line-height:200%;
    margin: auto;
    text-align:center;
    opacity: 0;
    animation:fade-in 7s;
  }
  @keyframes fade-in {
      from { opacity: 0; }
      to   { opacity: 1; }
  }

  /* Safari, Chrome and Opera > 12.1 */
  @-webkit-keyframes fade-in {
      from { opacity: 0; }
      to   { opacity: 1; }
  }
  .carousel-inner {
    padding: 0% 20% 0% 20%;
  }
  /* RESPONSIVE */
  /*  Responsive Laptop */
  @media screen and (min-width: 960px) and (max-width: 1024px) {
    /* font-size: 1.7rem; */
  }

  /* Responsive Tablet */
  @media only screen and (min-width: 768px) and (max-width: 960px) {
    /* font-size: 1.5rem; */
    .login-page {
      display: flex;
      align-items: center;
    }
    .login-form,
    .quotes-block {
      width: 70vw;
      height: 40vh;
      max-width: 40vh;
      font-size: 1.5rem;
    }
    .login-form {
      margin: 5% 5% 5% 15%;
    }
    input {
      width: 30vw;
    }
    .submit {
      margin: 5% 0% 5% 35%;
    }
    .quotes-block {
      margin: 5% 5% 5% 0%;
    }
  }
  /* Responsive Phone */
  @media screen and (max-width: 480px) {
    /* font-size: 1.3rem;
   */
    .login-page {
      display: inline-block;
      align-items: center;
    }
    .login-form {
      width: 100vw;
      height: auto;
      margin: 0;
      float: center;
    }
    input {
      width: 70vw;
    }
    .submit {
      margin: 5% 0% 5% 35%;
    }
    .quotes-block {
      display: none;
    }
  }
`;
