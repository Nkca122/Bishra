import axios from "axios";
import { useQuery } from "@tanstack/react-query";

type DailyCommitData = {
  date: string;
  commits: number;
};

async function getDailyCommitsFromEvents(
  username: string
): Promise<DailyCommitData[]> {
  const url = `${
    import.meta.env.VITE_GITHUB_API
  }/users/${username}/events?per_page=100`;

  const res = await axios.get(url);
  const events = res.data;
  console.log(events)

  const dailyCommits: Record<string, number> = {};

  events.forEach((event: any) => {
    const date = new Date(event.created_at).toISOString().split("T")[0];
    const commitCount = event.payload.commits?.length || 0;
    dailyCommits[date] = (dailyCommits[date] || 0) + commitCount;
  });

  console.log(dailyCommits);

  return Object.entries(dailyCommits)
    .map(([date, commits]) => ({ date, commits }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function GraphHistory({ User }: { User: string | null }) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["daily-commits", User],
    queryFn: () => getDailyCommitsFromEvents(User!),
    enabled: !!User,
  });

  if (isPending) return <p>Loading graph...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!data || data.length === 0) return <p>No recent commit activity.</p>;

  return (
    <>
      {data.map((dp) => (
        <p key={dp.date}>
          {dp.date}: {dp.commits} commits
        </p>
      ))}
    </>
  );
}
