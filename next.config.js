module.exports = {
  reactStrictMode: false,
  env: {
    DB_LOCAL_URI:
      'mongodb+srv://mh77-1234:mh77-1234@mh77-media.wuupo.mongodb.net/bookit?retryWrites=true&w=majority',
    CLOUDINARY_CLOUD_NAME: 'dmscqygte',
    CLOUDINARY_API_KEY: '938881393821676',
    CLOUDINARY_API_SECRET: 'JjWNA1SrLm9n172TY4FETyU05zA',
    SMTP_HOST: 'smtp.mailtrap.io',
    SMTP_PORT: '2525',
    SMTP_USER: '0b76c4dc5ea898',
    SMTP_PASSWORD: 'c9c383a7d66b18',
    SMTP_FROM_NAME: 'BookIT',
    SMTP_FROM_EMAIL: 'noreply@bookit.com',
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
}
