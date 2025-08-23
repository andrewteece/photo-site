// src/lib/site.ts
export const site = {
  brand: 'Andrew Teece Photography',
  domain: 'www.andrewteecephotography.com',

  nav: [
    { label: 'Portfolio', href: '/portfolio' },
    // { label: "Services", href: "/services" }, // enable when ready
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],

  email: 'andrewteece@gmail.com',

  // Footer + anywhere else we surface social links
  socials: [
    { label: '500px', href: 'https://500px.com/p/AndrewTeece?view=photos' },
    { label: 'Flickr', href: 'https://www.flickr.com/photos/andrewteece/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/andrew-teece/' },
    { label: 'Website', href: 'https://www.andrewteece.com/' },
  ],

  footerNote: 'Fine art landscapes and portrait commissions.',
};
