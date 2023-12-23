// Cmp
import Image from "next/image";
import Link from "next/link";
// Font
import { headingFont } from "@/constant/headingFont";
// Utils
import { cn } from "@/lib/utils";

interface ILogoProps {
  size?: number;
}

const Logo: React.FC<ILogoProps> = ({ size = 30 }) => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image src="/logo.svg" alt="Logo" height={size} width={size} priority />
        <p
          className={cn("text-lg text-neutral-700 pb-1", headingFont.className)}
        >
          Taskify
        </p>
      </div>
    </Link>
  );
};

export default Logo;
