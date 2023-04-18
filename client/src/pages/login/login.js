//import mustations and react
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

// need auth file to login users
import Auth from '../../utils/auth';

// User just needs to enter email to be authorized to login
const Login = (props) => {
  const [formState, setFormState] = useState({ email: '' });
  // use LOGIN_USER mutation to find user
  const [login, { error, data }] = useMutation(LOGIN_USER);

  //css styling for login model
  const styles = {
    form: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  }

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
      console.log("successfully logged in!!")
    } catch (e) {
      console.error(e);
    }

    // Clear form values
    setFormState({
      // username: '',
      email: '',
      // password: '',
    });
  };

  // return browser view and functionality
  return (
    <main className="form" style={styles.form}>
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Login</h4>
          <div className="card-body">

            {/* if data is truthy it will return the <p> element */}
            {data ? (
              <p>
                Welcome to our wedding hub{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
              // else user will need to login with this form
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input loginInput"
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                {/* 
                // removed so that users only need their email to login
                <input
                  className="form-input"
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                /> */}
                <button
                  className="btn btn-block btn-info"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}
            {/* error message will display if user not found */}
            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;