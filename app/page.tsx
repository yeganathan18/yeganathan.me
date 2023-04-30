import Link from "next/link";
import React from "react";
import Particles from "../components/particles";
import { Info } from "../components/info";
import Balancer from "react-wrap-balancer";

const navigation = [
  { name: "Blog", href: "/posts" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <h1 className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
        alpha_
      </h1>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-16 text-center animate-fade-in sm:max-w-xl">
        <Balancer>
          <h2 className="text-sm text-zinc-500 w-full">
            Hi, my name is Yeganathan, I'm a designer and developer living in
            India. Currently building{" "}
            <Link
              target="_blank"
              href="https://gitwonk.com"
              className="underline duration-500 hover:text-zinc-300 hover:decoration-emerald-500"
            >
              gitwonk.com
            </Link>{" "}
            and software engineer intern at{" "}
            <Link
              target="_blank"
              href="https://economize.cloud"
              className="underline duration-500 hover:text-zinc-300 hover:decoration-emerald-500"
            >
              economize.cloud
            </Link>
          </h2>
        </Balancer>
      </div>
      <Info title="Code Attribution 💚">
        <p className="text-xs text-zinc-400">
          This project is an independent fork of{" "}
          <Link
            className="underline hover:decoration-emerald-500"
            href="https://github.com/chronark/chronark.com.git"
          >
            chronark/chronark.com
          </Link>{" "}
        </p>
      </Info>
    </div>
  );
}
