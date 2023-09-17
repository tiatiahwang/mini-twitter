const footerLinks = [
  ['Terms of Service', 'https://twitter.com/tos'],
  ['Privacy Policy', 'https://twitter.com/privacy'],
  [
    'Cookie Policy',
    'https://support.twitter.com/articles/20170514',
  ],
  [
    'Accessibility',
    'https://help.twitter.com/resources/accessibility',
  ],
  [
    'Ads Info',
    'https://business.twitter.com/en/help/troubleshooting/how-twitter-ads-work.html',
  ],
];

const Footer = () => {
  return (
    <footer className='flex flex-col gap-3 text-center text-sm text-secondary'>
      <nav className='flex flex-wrap justify-center gap-2'>
        {footerLinks.map(([linkName, href]) => (
          <a
            href={href}
            key={href}
            className='hover:underline'
          >
            {linkName}
          </a>
        ))}
      </nav>
      <p>© 2023 X corp.</p>
    </footer>
  );
};

export default Footer;
