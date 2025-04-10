import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  Tooltip,
  YAxis,
  XAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ChartContainer, ChartConfig } from "@/components/ui/chart";

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

  const dailyCommits: Record<string, number> = {};

  events.forEach((event: any) => {
    if (event.type === "PushEvent") {
      const date = new Date(event.created_at).toISOString().split("T")[0];
      const commitCount = event.payload.commits?.length || 0;
      dailyCommits[date] = (dailyCommits[date] || 0) + commitCount;
    }
  });

  return Object.entries(dailyCommits)
    .map(([date, commits]) => ({ date, commits }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

const chartConfig = {
  commits: {
    label: "Number of commits",
    color: "hsl(142, 70%, 45%)", // Tailwind green-500
  },
} satisfies ChartConfig;

export function GraphHistory({ User }: { User: string | null }) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["daily-commits", User],
    queryFn: () => getDailyCommitsFromEvents(User!),
    enabled: !!User,
  });

  if (isPending) {
    return <p className="text-muted-foreground">Loading commits...</p>;
  }

  if (isError) {
    return (
      <Card className="p-4 border-red-400">
        <CardHeader>
          <CardTitle className="text-red-500">Error loading data</CardTitle>
          <CardDescription>{error.message}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card className="p-4">
        <CardHeader>
          <CardTitle>No Commit Activity</CardTitle>
          <CardDescription>This user has no recent commits.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="p-0">
      <CardContent className="p-1 md:p-4">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" aspect={1}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <YAxis />
              <XAxis dataKey="date" className="hidden md:flex"/>
              <Tooltip />
              <Legend verticalAlign="top" align="right" />
              <Bar
                dataKey="commits"
                fill={chartConfig.commits.color}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
