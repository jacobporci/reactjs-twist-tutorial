import { AppProps } from "next/app";
import Link from "next/link";

export default function App({ Component }: AppProps) {
  return (
    <div>
      <div style={{ display: "flex", gap: "12px" }}>
        <Link href="/">Home</Link>
        <Link href="/twist">Twist</Link>
        <Link href="/resources">Resources</Link>
      </div>
      <Component />
    </div>
  );
}
