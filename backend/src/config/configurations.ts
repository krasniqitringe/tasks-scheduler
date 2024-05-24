export const config = {
  jwtSecret: process.env.JWT_SECRET || 'Tkeh^72n3bv2',
  jwtExpiration: '1d',
  dbUrl: process.env.DATABASE_URL,
};
