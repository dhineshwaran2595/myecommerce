import { Button, Grid, Link, TextField } from "@material-ui/core";
import Layout from "../components/Layout";
import commonstyles from "../styles/Layout.module.css";
import NextLink from "next/link";
import axios from 'axios';
import { useState } from "react";

export default function login() {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:3000/api/users/login', {
        email,
        password,
      });
      
      alert('login success');
    } catch (err) {
      alert(err.response.data ? err.response.data.message : err.message);
    }
}
  return (
    <Layout>
      <h1>Login</h1>
      <form className={commonstyles.mtop} onSubmit={submitHandler}>
        <Grid container spacing={3}>
          <Grid item xs={12} spacing={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  size="small"
                  variant="outlined"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  size="small"
                  type="password"
                  variant="outlined"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" fullWidth type="submit" variant="contained">
              Log in
            </Button>
          </Grid>
          <Grid item xs={12}>
            Don't have a account{" "}
            <NextLink href="/register" passHref>
              <Link>Register</Link>
            </NextLink>{" "}
          </Grid>
        </Grid>
      </form>
    </Layout>
  );
}
