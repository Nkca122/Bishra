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
import { Link } from "lucide-react";

const getUserRepos = async ({ queryKey }: any) => {
  const [_key, username] = queryKey;
  const res = await axios.get(
    `${import.meta.env.VITE_GITHUB_API}/users/${username}/repos`
  );
  console.log(res.data);
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
      {isPending && !!User && <p>Loading...</p>}
      {isError && <p className="text-red-500">Error: {error.message}</p>}
      {data && (
        <div className="space-y-2">
          <h2 className="text-lg font-bold">Repositories:</h2>
          <ul className="list-disc list-inside">
            {data.map((repo: any) => (
              <Card key={repo.id}>
                <CardHeader>
                  <CardTitle>{repo.name}</CardTitle>
                  <CardDescription>
                    Created At: {repo.created_at.split("T")[0]}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{repo.description}</p>
                </CardContent>
                <CardFooter>
                  <div>
                    <a href={repo.html_url} target="main">
                      <Link />
                    </a>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
