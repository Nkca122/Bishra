import "./App.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Component } from "@/components/test";

const getUserRepos = async ({ queryKey }: any) => {
  const [_key, username] = queryKey;
  const res = await axios.get(
    `${import.meta.env.VITE_GITHUB_API}/users/${username}/repos`
  );
  return res.data;
};

function App() {
  const [username, setUsername] = useState("");
  const [submittedUsername, setSubmittedUsername] = useState("");

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["repos", submittedUsername],
    queryFn: getUserRepos,
    enabled: submittedUsername.length > 0,
  });

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center space-x-2">
        <Label htmlFor="username">GitHub Username</Label>
        <Input
          id="username"
          value={username}
          placeholder="octocat"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button onClick={() => setSubmittedUsername(username)}>Search</Button>
      </div>

      {isPending && submittedUsername.length > 0 && <p>Loading...</p>}
      {isError && <p className="text-red-500">Error: {error.message}</p>}

      {data && (
        <div className="space-y-2">
          <h2 className="text-lg font-bold">Repositories:</h2>
          <ul className="list-disc list-inside">
            {data.map((repo: any) => (
              <li key={repo.id}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
  <Component />
    </div>
  );
}

export default App;
