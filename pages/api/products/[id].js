import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";



/*const handler = nc();
handler.get(async(req,res) =>{
  const { slug } = req.query
 // console.log(req.query);
    const products= await Product.find({slug});
    res.send(products);
});*/


const api = new WooCommerceRestApi({
	url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
	consumerKey: process.env.WC_CONSUMER_KEY,
	consumerSecret: process.env.WC_CONSUMER_SECRET,
	version: "wc/v3"
});


export default async function handler(req, res) {
	
	const responseData = {
		success: false,
		product: []
	}
	

  const { id } = req.query
	
	try {
		const { data } = await api.get(
    `products/${id}`,
		
		);
		
		responseData.success = true;
		
		responseData.product = [data];
		console.log("backend product",Array.isArray( responseData.product));
		
		res.json( responseData );
		
		
	} catch ( error ) {
		responseData.error = error.message;
		res.status( 500 ).json( responseData  );
	}
}
 
