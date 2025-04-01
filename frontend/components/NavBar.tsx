import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

export default function NavBar() {
  const location = useLocation();
  return (
    <nav className="grid grid-cols-3 grid-rows-1 gap-2 m-[1rem]">
      <div className="justify-self-start"></div>
      <div className="justify-self-center">
        <Tabs value={location.pathname} className="w-full">
          <TabsList>
            <TabsTrigger value="/" asChild>
              <Link to="/">Home</Link>
            </TabsTrigger>
            <TabsTrigger value="/login" asChild>
              <Link to="/login">Login</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="flex items-center flex-row gap-7 justify-self-end">
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
