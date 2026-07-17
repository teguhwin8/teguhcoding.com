import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coding Quiz",
  description:
    "Test kemampuan coding lo dengan quiz interaktif. Python, JavaScript, React, dan lainnya.",
  openGraph: {
    title: "Coding Quiz | Teguh Widodo",
    description:
      "Test kemampuan coding lo dengan quiz interaktif. Python, JavaScript, React, dan lainnya.",
    type: "website",
  },
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
