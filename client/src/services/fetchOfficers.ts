import axios from "axios";

// () => fetch(`/api/getofficers`).then((res) => res.json());
// export default async () => {
//   return await axios.get("http://localhost:3125/api/getofficers");
// };

async function fetchPosts() {
  const { data } = await axios.get("/api/getofficers");
  return data;
}
export default fetchPosts;
