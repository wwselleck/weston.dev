import axios from "axios";
import type { AxiosInstance } from 'axios'

export async function getMostRecentCommit(api: AxiosInstance, username: string) {
  const result = await api.get(
    `/users/${username}/events`
  );
  const { data: events } = result;

  for (const event of events) {
    if (event.type === "PushEvent") {
      const { data: commit } = await api.get(event.payload.commits[0].url);
      const { data: repo } = await api.get(event.repo.url);

      return {
        repo: {
          name: repo.full_name,
          link: repo.html_url,
        },
        date: new Date(event.created_at),
        link: commit.html_url,
        message: commit.commit.message,
      };
    }
  }
}
