module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
    purge: {
      enabled: true,
      content: [
        // Same content array as before
      ],
      options: {
        safelist: ['html', 'body'], // List classes to always include
      },
    },
    // future: {
    //   purgeLayersBy: [
    //     '@fullwind/webpack-purgecss',
    //     (content) => ({ content, safelist: ['html', 'body'] }),  // Disable Tailwind directives in dev
    //   ],
    // },
  };