import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/uk.svg"
            alt="English"
            height={33}
            width={33}
            className="mr-3 rounded-full"
          />
          <span className="mr-6"> English</span>
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/de.svg"
            alt="German"
            height={33}
            width={33}
            className="mr-3 rounded-full"
          />
          <span className="mr-6"> German</span>
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/hr.svg"
            alt="Croatian"
            height={32}
            width={32}
            className="mr-3 rounded-full"
          />
          <span className="mr-6">Croatian</span>
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/it.svg"
            alt="Italian"
            height={32}
            width={32}
            className="mr-3 rounded-full"
          />
          <span className="mr-6"> Italian</span>
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/es.svg"
            alt="Spanish"
            height={32}
            width={32}
            className="mr-3 rounded-full"
          />
          <span className="mr-6"> Spanish</span>
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/fr.svg"
            alt="French"
            height={32}
            width={32}
            className="mr-3 rounded-full"
          />
          <span className="mr-6"> French</span>
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/jp.svg"
            alt="Japanese"
            height={32}
            width={32}
            className="mr-3 rounded-full"
          />
          <span className="mr-6"> Japanese</span>
        </Button>
      </div>
    </footer>
  );
};
