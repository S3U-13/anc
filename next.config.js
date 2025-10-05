/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // ✅ ปิดการตรวจ error ของ TypeScript ตอน build
    ignoreBuildErrors: true,
  },
  eslint: {
    // (ถ้าอยากปิด ESLint ด้วย)
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
