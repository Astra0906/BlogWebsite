import React, { useState } from 'react';
import Logo from '../Logo';

const Footer = () => {
  const [email, setEmail] = useState('');

  const subscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed with email: ${email}`);
  };

  return (
    <footer className="min-w-full   text-sm text-white dark:bg-slate-900">
      <div className="flex w-full flex-col items-center justify-start gap-8 border-b border-slate-300 p-4 pb-4 lg:flex-row lg:items-start lg:gap-12 dark:border-slate-700">
        {/* Logo */}
        <Logo/>

        {/* Navigation */}
        <div className="flex lg:mb-4 lg:w-3/12">
          <nav>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">Home</a>
              </li>
              <li>
                <a href="#" className="hover:underline">About</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Services</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Contact</a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Social Icons */}
        <div className="flex flex-col items-center lg:mb-4 lg:w-3/12 lg:items-start">
          <p className="mb-2 font-semibold">Follow Us On:</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-orange-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-brand-facebook"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 10v4h3v7h4v-7h3l1-4h-4v-2a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2h-3" />
              </svg>
            </a>
            <a href="#" className="hover:text-orange-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-brand-x"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 4l11.733 16h4.267l-11.733-16z" />
                <path d="M4 20l6.768-6.768m2.46-2.46l6.772-6.772" />
              </svg>
            </a>
            <a href="#" className="hover:text-orange-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 4m0 4a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-8a4 4 0 0 1-4-4z" />
                <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0" />
                <path d="M16.5 7.5l0 .01" />
              </svg>
            </a>
            <a href="#" className="hover:text-orange-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-brand-linkedin"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 4m0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2z" />
                <path d="M8 11l0 5" />
                <path d="M8 8l0 .01" />
                <path d="M12 16l0-5" />
                <path d="M16 16v-3a2 2 0 0 0-4 0" />
              </svg>
            </a>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="flex flex-col items-center lg:w-4/12 lg:items-start">
          <p className="mb-2 font-semibold">Subscribe To Our Newsletter</p>
          <form onSubmit={subscribe} className="flex items-center gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="rounded border-0 px-2 py-1 ring-1 ring-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-slate-950 dark:ring-slate-600"
            />
            <button
              type="submit"
              className="rounded bg-orange-500 px-2 py-1 text-white hover:bg-orange-600"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 p-4 md:flex-row">
        <div className="text-center md:text-left">&copy; 2024 Your Company</div>
        <div className="flex space-x-4">
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Security</a>
          <a href="#" className="hover:underline">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
