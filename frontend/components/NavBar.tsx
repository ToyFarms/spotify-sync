import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, User, ChevronLeft } from "lucide-react";
import { MediaQuery } from "react-responsive";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function NavBar() {
  const location = useLocation();
  const links = [
    { name: "Home", url: "/" },
    { name: "Login", url: "/login" },
  ];

  return (
    <nav className="flex justify-between gap-2 m-[1rem]">
      <div className="flex flex-row items-center">
        <MediaQuery maxWidth={500}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Menu />
                <p className="underline text-secondary">
                  {links.find(({ url }) => url === location.pathname)?.name}
                </p>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {links.map(({ name, url }, index) => (
                <DropdownMenuItem key={index} asChild>
                  <Link
                    to={url}
                    className="tab-link flex flex-row justify-between"
                  >
                    {name}
                    {url === location.pathname && (
                      <ChevronLeft className="animate-pulse" />
                    )}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </MediaQuery>
        <MediaQuery minWidth={501}>
          <Tabs value={location.pathname}>
            <TabsList>
              {links.map(({ name, url }, index) => (
                <TabsTrigger value={url} key={index} asChild>
                  <Link to={url} className="tab-link">
                    {name}
                  </Link>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </MediaQuery>
      </div>
      <div className="flex items-center flex-row gap-7">
        <ThemeToggle />
        <div className="flex items-center gap-2">
          <p>User</p>
          <Avatar>
            <AvatarImage />
            <AvatarFallback>
              <User className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
}
