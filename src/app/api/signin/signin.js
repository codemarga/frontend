import { signIn } from "@/auth";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await signIn("google");
      res.status(200).end();
    } catch (error) {
      console.error("Error during sign-in:", error);
      res.status(500).json({ error: "Sign-in failed" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
