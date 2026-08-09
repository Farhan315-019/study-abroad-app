import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const cards = [
  {
    to: "/profile",
    title: "Profile",
    desc: "Tell us about your grades, budget and goals to unlock personalized advice.",
  },
  {
    to: "/recommendations",
    title: "Recommendations",
    desc: "Get matched countries and universities with clear reasons behind each pick.",
  },
  {
    to: "/universities",
    title: "Find universities",
    desc: "Search universities with verified requirements, deadlines and fees.",
  },
  {
    to: "/scholarships",
    title: "Scholarships",
    desc: "Browse funded opportunities and apply with confidence.",
  },
  {
    to: "/chat",
    title: "AI consultant",
    desc: "Chat about countries, documents, deadlines and funding.",
  },
];

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
      <p className="mt-1 text-sm text-slate-400">
        Your study abroad journey starts here. Complete your profile to get started.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.title}
            to={c.to}
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-indigo-700"
          >
            <h3 className="font-semibold text-white">{c.title}</h3>
            <p className="mt-1 text-sm text-slate-400">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
