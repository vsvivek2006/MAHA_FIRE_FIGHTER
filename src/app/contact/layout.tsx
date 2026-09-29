import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | MAHA FIREFIGHTERS Delhi NCR',
  description: 'Get in touch with Maha Firefighters for expert fire safety solutions, free audits, and system installations in Delhi NCR.',
  alternates: {
    canonical: 'https://mahafirefighters.com/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
