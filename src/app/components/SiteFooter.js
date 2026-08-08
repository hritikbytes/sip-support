import React from 'react';
import Link from 'next/link';

const SiteFooter = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 mt-auto relative overflow-hidden">
      {/* Decorative backdrop glow */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10 md:gap-8 pb-12 border-b border-slate-900">
          
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity duration-200 w-fit">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="Sip Support" className="h-8 w-auto object-contain" />
              <span
                className="font-bold text-xl md:text-2xl tracking-wide text-white"
                style={{ fontFamily: "var(--font-caveat), cursive" }}
              >
                Sip Support
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Fueling creativity, one sip at a time. Empowering creators to do what they love through direct fan support.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="text-slate-500 hover:text-white transition-colors p-2 bg-slate-900 rounded-lg border border-slate-800" aria-label="Twitter">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </a>
              
              <a href="#" className="text-slate-500 hover:text-red-500 transition-colors p-2 bg-slate-900 rounded-lg border border-slate-800" aria-label="YouTube">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              <a href="#" className="text-slate-500 hover:text-pink-500 transition-colors p-2 bg-slate-900 rounded-lg border border-slate-800" aria-label="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 0 1 1.772 1.153 4.902 4.902 0 0 1 1.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 0 1-1.153 1.772 4.902 4.902 0 0 1-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 0 1-1.772-1.153 4.902 4.902 0 0 1-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 0 1 1.153-1.772A4.902 4.902 0 0 1 5.451 2.535c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 1.802a3.333 3.333 0 1 0 0 6.666 3.333 3.333 0 0 0 0-6.666zm5.338-3.205a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Column 1: Product */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">Product</h3>
            <ul className="flex flex-col gap-2.5 text-sm font-medium text-slate-400">
              <li><Link href="/explore" className="hover:text-white transition-colors">Explore Creators</Link></li>
              <li><Link href="/creators" className="hover:text-white transition-colors">Featured Creators</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Platform</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Start a Page</Link></li>
            </ul>
          </div>

          {/* Links Column 2: Resources */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">Resources</h3>
            <ul className="flex flex-col gap-2.5 text-sm font-medium text-slate-400">
              <li><Link href="/about" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Creator Guide</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Partner Program</Link></li>
            </ul>
          </div>

          {/* Links Column 3: Company */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">Company</h3>
            <ul className="flex flex-col gap-2.5 text-sm font-medium text-slate-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="col-span-1 flex flex-col gap-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">Newsletter</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Get creator stories and platform updates directly in your inbox.
            </p>
            <div className="flex flex-col gap-2 mt-1">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full h-10 px-3 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white outline-none focus:border-indigo-500 transition-colors"
              />
              <button 
                type="button" 
                className="w-full h-10 bg-white text-slate-950 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright & legal */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-xs font-medium text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Sip Support. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
