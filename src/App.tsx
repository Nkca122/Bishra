import "./App.css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { RepoList } from "./components/repos";
import { GraphHistory } from "@/components/graph";

function App() {
  const [username, setUsername] = useState("");
  const [submitUsername, setSubmitUsername] = useState("");
  return (
    <>
    <div className="p-4 space-y-4">
      <div className="flex items-center space-x-2">
        <Label htmlFor="username">GitHub Username</Label>
        <Input
          id="username"
          value={username}
          placeholder="octocat"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <Button onClick={()=>{
          setSubmitUsername(username)
        }}>Submit</Button>
      </div>
    </div>

    <div>
      {!!submitUsername ? <RepoList User={submitUsername}/> : null}
    </div>
    <div>
      {!!submitUsername ? <GraphHistory User={submitUsername}/> : null}
    </div>
    </>
  );
}

export default App;
