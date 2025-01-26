import React from "react";
import {
  IconMail,
  IconBrandEtsy,
  IconBrandInstagram,
  IconBrandFacebook,
} from "@tabler/icons-react";
import Link from "next/link";

const accounts = [
  {
    icon: <IconMail className="text-gray-700" size={24} />,
    text: "semartdoll@gmail.com",
    href: "mailto:semartdoll@gmail.com",
  },
  {
    icon: <IconBrandEtsy className="text-gray-700" size={24} />,
    text: "Visit My Etsy Shop",
    href: "https://www.etsy.com/shop/SemDoll",
  },
  {
    icon: <IconBrandInstagram className="text-gray-700" size={24} />,
    text: "@sem.doll",
    href: "https://www.instagram.com/sem.doll/",
  },
  {
    icon: <IconBrandFacebook className="text-gray-700" size={24} />,
    text: "SemDoll Page",
    href: "https://www.facebook.com/people/Semdoll/100066460481922/",
  },
  {
    icon: <IconBrandFacebook className="text-gray-700" size={24} />,
    text: "SemDoll Account",
    href: "https://www.facebook.com/people/Sem-Doll/pfbid034aLtTz5ow9tCT8WNCyDA1HKWs3p3nPd3RZ5yKDcJyaetdkwZE7nHB9cWER2Wbt9ol/",
  },
];

const Contact = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="container p-6">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Contact Me
        </h1>
        <p className="mb-8 text-center text-gray-600">
          Feel free to reach out to me through any of the platforms below!
        </p>

        <div className="flex flex-col items-center space-y-4 md:space-y-6">
          {accounts.map((account, key) => (
            <div className="flex items-center space-x-3" key={key}>
              {account.icon}
              <div className="text-center">
                {account.href.startsWith("mail") ? (
                  <a
                    href={account.href}
                    className="text-rose-600 hover:underline"
                  >
                    {account.text}
                  </a>
                ) : (
                  <Link
                    href={account.href}
                    className="text-rose-600 hover:underline"
                    target="_blank"
                  >
                    {account.text}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
