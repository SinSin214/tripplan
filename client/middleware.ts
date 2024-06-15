import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  locales: ['eng', 'vie'],
  defaultLocale: 'eng',
  localePrefix: "always", // nav to default locale if no locale selected
  localeDetection: true,  // send locale to backend in cookie
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(eng|vie)/:path*']
};