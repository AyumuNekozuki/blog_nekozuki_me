import Link from "next/link";

const PageLink = ({ children, ...props}: any) => {
  return (
    <Link scroll={false} {...props}>
      {children}
    </Link>
  )
}

export default PageLink;