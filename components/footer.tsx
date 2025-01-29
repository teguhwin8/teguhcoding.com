import Link from "next/link";
import { LuGithub, LuHeart, LuLinkedin, LuTwitter } from "react-icons/lu";

export function Footer() {
  return (
    <footer className="border-t-2 border-black bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/experience" className="hover:underline">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:underline">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:underline">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Contact</h3>
            <ul className="space-y-2">
              <li>hello@example.com</li>
              <li>San Francisco, CA</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Social</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-600"
              >
                <LuGithub size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-600"
              >
                <LuTwitter size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-600"
              >
                <LuLinkedin size={24} />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Newsletter</h3>
            <form className="flex gap-2 flex-wrap">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 p-2 border-2 border-black rounded"
              />
              <button type="submit" className="retro-button px-4 py-2">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="flex items-center justify-center text-sm">
            Made with <LuHeart size={16} className="mx-1 text-red-500" /> using
            Next.js 15
          </p>
        </div>
      </div>
    </footer>
  );
}
