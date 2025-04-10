import "./App.css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { RepoList } from "./components/repos";
import { GraphHistory } from "@/components/graph";
import { GithubIcon, Search, BarChart2 } from "lucide-react";
import { NavBar } from "@/components/navbar";
import {
  Accordion,
  AccordionTrigger,
  AccordionItem,
  AccordionContent,
} from "@/components/ui/accordion";
import { Footer } from "@/components/footer";

function App() {
  const [username, setUsername] = useState("");
  const [submitUsername, setSubmitUsername] = useState("");

  const handleSubmit = () => {
    if (username.trim()) {
      setSubmitUsername(username);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-slate-50">
      <NavBar />
      <main className="container h-screen overflow-x-hidden overflow-y-scroll mx-auto py-8 px-4">
        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1 space-y-2">
              <Label htmlFor="username" className="text-lg font-medium">
                GitHub Username
              </Label>
              <div className="relative">
                <Input
                  id="username"
                  placeholder="Enter a GitHub username (e.g., octocat)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                />
                <GithubIcon
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                  size={18}
                />
              </div>
            </div>
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 mt-2 md:mt-0 px-6"
            >
              <Search className="mr-2" size={18} />
              Search
            </Button>
          </div>
        </div>

        {/* Repo & Graph Sections */}
        {submitUsername && (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Repo List Accordion */}
            <div className="bg-white rounded-lg shadow-md p-6 w-full lg:w-1/2">
              <Accordion
                type="single"
                collapsible
                defaultValue="repositories"
                className="w-full"
              >
                <AccordionItem value="repositories">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2 text-xl font-semibold">
                      <GithubIcon size={22} />
                      Repositories for {submitUsername}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <RepoList User={submitUsername} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Graph History Accordion */}
            <div className="bg-white rounded-lg shadow-md p-6 w-full lg:w-1/2">
              <Accordion
                type="single"
                collapsible
                defaultValue="graph-history"
                className="w-full"
              >
                <AccordionItem value="graph-history">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2 text-xl font-semibold">
                      <BarChart2 size={22} />
                      Contribution History for {submitUsername}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <GraphHistory User={submitUsername} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
