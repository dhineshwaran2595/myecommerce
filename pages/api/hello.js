import db from "../../utils/db";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

db();
export default async function handler(req, res) {
 
  res.status(200).json({ name: 'John Doe' });
}
