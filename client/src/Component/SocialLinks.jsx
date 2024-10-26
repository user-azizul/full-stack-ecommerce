import React from "react";
import { FaFacebook, FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
const linkData = [
  {
    icon: <FaGithub />,
    href: "https://github.com/user-azizul/",
  },
  {
    icon: <FaYoutube />,
    href: "https://youtube.com/",
  },
  {
    icon: <FaLinkedin />,
    href: "https://www.linkedin.com/in/dev-azizul-haque/",
  },
  {
    icon: <FaFacebook />,
    href: "https://www.facebook.com/profile.php?id=100037711850037",
  },
];

function SocialLinks() {
  return (
    <div className="text-xl text-white/50  flex items-center gap-x-2">
      {linkData?.map((item, index) => (
        <a
          className="border  border-white/20 inline-flex p-2 rounded-full hover:text-white hover:border-white duration-300 hoverEffect"
          target="_blank"
          href={item.href}
          key={index}
        >
          {item?.icon}
        </a>
      ))}
    </div>
  );
}

export default SocialLinks;
