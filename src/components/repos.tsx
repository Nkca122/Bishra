import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { Link as LinkIcon, Star } from "lucide-react";

const getUserRepos = async ({ queryKey }: any) => {
  const [_key, username] = queryKey;
  const res = await axios.get(
    `${import.meta.env.VITE_GITHUB_API}/users/${username}/repos`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    }
  );
  return res.data;
};

export function RepoList({ User }: { User: string | null }) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["repos", User],
    queryFn: getUserRepos,
    enabled: !!User,
  });

  return (
    <>
      {isPending && !!User && (
        <p className="text-muted-foreground">Loading repositories...</p>
      )}
      {isError && (
        <Card className="p-4 border-red-400">
          <CardHeader>
            <CardTitle className="text-red-500">Error loading data</CardTitle>
            <CardDescription>{error.message}</CardDescription>
          </CardHeader>
        </Card>
      )}
      {data && (
        <div className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {data.map((repo: any) => (
              <Card
                key={repo.id}
                className="transition hover:shadow-lg border border-muted"
              >
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-semibold">
                      {repo.name}
                    </CardTitle>
                    {repo.stargazers_count > 0 && (
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-4 h-4" />
                        <span className="text-sm">{repo.stargazers_count}</span>
                      </div>
                    )}
                  </div>
                  <CardDescription className="text-sm text-muted-foreground">
                    Created on: {repo.created_at.split("T")[0]}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {repo.description || "No description provided."}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-primary hover:underline gap-1"
                  >
                    <LinkIcon className="w-4 h-4" />
                    View Repo
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
