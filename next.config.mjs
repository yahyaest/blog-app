/** @type {import('next').NextConfig} */
import { withContentlayer } from 'next-contentlayer'

const nextConfig = {
 output: "standalone",
 env: {
  BASE_URL: process.env.BASE_URL,
  // BASE_URL: "http://localhost:3000",
 },
};
export default withContentlayer({...nextConfig});

