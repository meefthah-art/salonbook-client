const API = process.env.API_URL || "http://localhost:5000";

const nextConfig = {
  async rewrites() {
    return [{ source: "/server-api/:path*", destination: `${API}/api/:path*` }];
  },
};

export default nextConfig;
