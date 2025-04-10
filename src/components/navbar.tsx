import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Linkedin, Github } from "lucide-react";

export function NavBar() {
  return (
    <nav className="w-full bg-white shadow-sm px-6 py-4 rounded-b-2xl">
      <NavigationMenu>
        <NavigationMenuList className="flex items-center gap-6">
          {/* Profile Dropdown */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
              <Avatar>
                <AvatarImage src="https://avatars.githubusercontent.com/u/116838349?v=4" />
                <AvatarFallback>NC</AvatarFallback>
              </Avatar>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="flex flex-col p-4 w-64">
                <h1 className="text-lg font-semibold mb-1">Myself</h1>
                <p className="text-sm text-muted-foreground">
                  Nikunj Chauhan, sophomore student at NIT Agartala
                </p>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Contact Me Dropdown */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="px-4 py-2 rounded-lg hover:bg-gray-100 transition">
              Contact Me
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="flex flex-col items-start p-4 w-64 gap-2">
                <a
                  href="mailto:nkca122@gmail.com"
                  className="flex items-center gap-2 text-sm hover:underline"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </a>
                <a
                  href="https://www.linkedin.com/in/nikunj-chauhan-9781832b2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:underline"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/Nkca122"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:underline"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
