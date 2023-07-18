import { Button } from "@/components/button";
import { useState } from "react";

export default function HOME() {
  const [clicks, setClicks] = useState(0);
  return (
    <div>
      <h1>Hello</h1>
      <p>Clicks: {clicks}</p>
      <Button onClick={() => setClicks(clicks + 1)} />
    </div>
  );
}
