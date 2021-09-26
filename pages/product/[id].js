import Layout from "../../components/Layout";
import commonstyles from "../../styles/Layout.module.css";
import Image from "next/image";
import NextLink from "next/link";
import axios from "axios";
import {
  Button,
  Card,
  Grid,
  Link,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import {
  GET_PRODUCTS_ENDPOINT,
  GET_PRODUCTS_SINGLE_ENDPOINT,
} from "../../utils/constants/endpoints";
export default function ProductScreen(props) {
  const { product } = props;

  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div>
      {product.map((product) => {
        const img = product?.images?.[0] ?? {};
        const categories = product?.categories;

        return (
          <Layout key={product.id} title={product.name}>
            <div className={commonstyles.mtop}>
              <NextLink href="/" passHref>
                <Link>
                  <Typography>back to products</Typography>
                </Link>
              </NextLink>
            </div>
            <Grid container spacing={1}>
              <Grid item md={6} xs={12}>
                <Image
                  src={img?.src ?? ""}
                  alt={product.name}
                  width={640}
                  height={640}
                  layout="responsive"
                ></Image>
              </Grid>
              <Grid item md={3} xs={12}>
                <List>
                  <ListItem>
                    <Typography component="h1">{product.name}</Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>
                      Category: {" "}
                       {categories.map((category, index) => {
                        return (
                          <span key={index}>
                            {(index ? ", " : "") + category.name}{" "}
                          </span>
                        );
                      })}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>
                      {" "}
                      Description:{" "}
                      <span
                        dangerouslySetInnerHTML={{
                          __html: product.description,
                        }}
                      ></span>
                    </Typography>
                  </ListItem>
                </List>
              </Grid>
              <Grid item md={3} xs={12}>
                <Card>
                  <List>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography>Price</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>
                            {process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}
                            {product.price}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography>Status</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>
                            {product.stock_status }
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography>Quantity</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                          >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                          </Select>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Button fullWidth variant="contained" color="primary">
                        Add to cart
                      </Button>
                    </ListItem>
                  </List>
                </Card>
              </Grid>
            </Grid>
          </Layout>
        );
      })}
    </div>
  );
}

/*export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  const {data} = await axios.get(`http://localhost:3000/api/products/${slug}`);
  const product = data;
  return {
    props: {
      product,
    },
  };
}*/

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  const { data } = await axios.get(GET_PRODUCTS_SINGLE_ENDPOINT + "/" + id);

  const product = data.product;
  //console.log("my single",product)
  console.log("siingle product", Array.isArray(product));
  return {
    props: {
      product,
    },
  };
}
