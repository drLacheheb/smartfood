import { MainNav } from "@/components/layout/main-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ModeToggle } from "../theme/theme-toggle";

export function SiteHeader() {
  return (
    <header className="fixed top-0 z-50 w-full bg-transparent shadow-sm backdrop-blur  supports-[backdrop-filter]:bg-transparent dark:border-b">
      <div className="container flex h-14 items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="flex space-x-2">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
