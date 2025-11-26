"use client";

import { useEffect } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { useTheme } from "../../store/useTheme";
import { Bars3Icon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Games", href: "/", current: true },
  { name: "Favourites", href: "/game/favourite", current: false },
  { name: "Featured", href: "/game/featured", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    // document.getElementsByClassName("modal")[0]?.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Disclosure
      as="nav"
      className=" dark:bg-gray-800 surface-alt border-b border-gray-200 dark:border-gray-700"
    >
      <div className="mx-auto  px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5  focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="w-7 h-7" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link href="/">
                <Image
                  alt="logo"
                  src="/games/game.jpg"
                  className="hidden h-8 w-auto lg:block rounded-full"
                  width={32}
                  height={32}
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={classNames(
                      pathname === item.href
                        ? "bg-gray-900 text-white"
                        : " hover:bg-white/5 ",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <button onClick={toggleTheme} className="cursor-pointer">
                  {theme === "dark" ? "🌙" : "☀️"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={classNames(
                pathname === item.href
                  ? "bg-gray-900 text-white"
                  : " hover:bg-white/5 ",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
          <button onClick={toggleTheme} className="cursor-pointer">
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
