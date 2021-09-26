import React from "react";
import Head from "next/head";
import {
  AppBar,
  Box,
  Container,
  Link,
  Toolbar,
  Typography,
} from "@material-ui/core";
import axios from 'axios';
import commonstyles from "../styles/Layout.module.css";
import NextLink from "next/link";
export default function Layout(props) {
  const {menu} = props;
  console.log("Menu",menu)
  return (
    <div>
      <Head>
        <title>{props.title ? `${props.title}-My-Ecommerce` : "My-Ecommerce"}</title>
      </Head>
      <AppBar position="static">
        <Toolbar>
          <NextLink href="/" passHref>
            <Link>
              <Typography>My-Ecommerce</Typography>
            </Link>
          </NextLink>
          <Box ml={5} >
            <NextLink href="/" passHref>
              <Link>
                <Typography>About</Typography>
              </Link>
            </NextLink>
          </Box>
          <div className={commonstyles.flexsize}></div>
          <div>
            <NextLink href="/cart" passHref>
              <Link> Cart </Link>
            </NextLink>
            <NextLink href="/login" passHref>
              <Link> Login </Link>
            </NextLink>
          </div>
        </Toolbar>
      </AppBar>
      <Container className={commonstyles.main}>{props.children}</Container>
      <footer className={commonstyles.footer}>
        <Typography>
          Copyright © {new Date().getFullYear()} All Rights Reserved.
        </Typography>
      </footer>
    </div>
  );
}

export async function getStaticProps(){
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
	const { data } = await axios.get( `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/wp-json/rae/v1/header-footer?header_location_id=hcms-menu-header&footer_location_id=hcms-menu-footer`);
  const menu = data;
  console.log("enters");
	return {
		props: {
			data: menu || {},
		},
		revalidate: 1,
	};
}
