import DropdownMenu from "@/components/dropdown-menu/dropdown-menu";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center p-24 bg-gray-300">
      <DropdownMenu />
    </main>
  );
}

