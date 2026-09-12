import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "USELESS.EXE — A Website Where Every Feature Is Broken" },
      {
        name: "description",
        content:
          "A deliberately chaotic joke site: buttons do the opposite, search finds nothing, menus loop forever and the spinner never stops.",
      },
      { property: "og:title", content: "USELESS.EXE — Every Feature Is Broken On Purpose" },
      {
        property: "og:description",
        content:
          "Fake navigation, useless search, infinite dropdowns, endless popups and flashing chaos. 412 features, zero of them working.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    window.location.replace("/chaos/index.html");
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <p className="text-lg font-bold text-foreground">Loading… 99% (forever)</p>
    </div>
  );
}
