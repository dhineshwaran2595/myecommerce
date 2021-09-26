import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import Layout from "../components/Layout";
import NextLink from 'next/link';
import axios from 'axios';

import { GET_PRODUCTS_ENDPOINT, HEADER_FOOTER_ENDPOINT } from '../utils/constants/endpoints';


const  Home = ({ products }) => {

	if ( products=="" || !Array.isArray( products ) ) {
		return null;
	}
  
  
  return (
    <Layout>
      <div>
      <h1>Products</h1>
        <Grid container spacing={4}>
          {products.map((product) => {
            const img = product?.images?.[0] ?? {};
         return (   
          <Grid item md={4} key={product.id}>
           
              <Card>
                <NextLink href={`/product/${product.id}`} passHref>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={ img?.src ?? '' }
                    title={product.name}
                  ></CardMedia>
                  <CardContent>
                    <Typography>{product.name}</Typography>
                  </CardContent>
                </CardActionArea>
                </NextLink>
                <CardActions>
                  <Typography>{process.env.NEXT_PUBLIC_CURRENCY_SYMBOL} {product.price} </Typography>
                  <Button size="small" color="primary">
                    Add to cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
         )
           
})}
        </Grid>
      </div>
    </Layout>
  );
}
export default Home;


export async function getStaticProps(){
  //const {data} =await axios.get("http://localhost:3000/api/products");
  const { data } = await axios.get(GET_PRODUCTS_ENDPOINT);
  const { datas } = await axios.get( `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/wp-json/rae/v1/header-footer?header_location_id=hcms-menu-header&footer_location_id=hcms-menu-footer`);
  const menu = datas;
  
  //const products = await product.json();
  const products = data.products;
  //console.log("products",Array.isArray( products.products));
  return{
    props:{
      products
    }
  }
  
}