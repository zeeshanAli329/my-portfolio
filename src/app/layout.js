import './globals.css'
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
export const metadata = {
  title: 'Zeeshan Malik  Frontend Developer Portfolio',
  description: 'Frontend Developer specializing in React, Next.js, and modern web technologies. Check out my projects and experience.',
  keywords: 'frontend developer, react, next.js, javascript, typescript, portfolio, web development',
  author: 'John Doe',
  openGraph: {
    title: 'Zeeshan Malik  Frontend Developer Portfolio',
    description: 'Frontend Developer specializing in React, Next.js, and modern web technologies.',
    type: 'website',
  },
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}