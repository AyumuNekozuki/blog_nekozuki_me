import Link from "next/link";
import { BiCategory, BiPurchaseTagAlt } from "react-icons/bi";
import { SiMisskey, SiGithub } from "react-icons/si";
import { FaAddressBook } from "react-icons/fa";

interface LinkButtonProps {
  href: string;
  title: string;
  className?: string;
  target?: string;
  rel?: string;
  icon?: string
}

const LinkButton = (props: LinkButtonProps) => {
  let Icon = null;
  if(props.icon === "category") Icon = <BiCategory className="text-xs" />
  if(props.icon === "tag") Icon = <BiPurchaseTagAlt className="text-xs" />
  if(props.icon === "misskey") Icon = <SiMisskey className="text-xs" />
  if(props.icon === "github") Icon = <SiGithub className="text-xs" />
  if(props.icon === "address") Icon = <FaAddressBook className="text-xs" />

  return (
    <Link
      href={props.href}
      className={`flex gap-1 items-center px-2 py-1 text-xs transition-all border rounded-2xl border-theme_light-current md:text-xs text-theme_light-text-current hover:shadow ${props.className}`}
      target={props.target}
      rel={props.rel}
      >
      {Icon && Icon}
      {props.title}
    </Link>
  );
};

export default LinkButton;
