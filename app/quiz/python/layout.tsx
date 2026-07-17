import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Python Quiz",
  description:
    "Test kemampuan Python lo: variables, loops, functions, lists, dan dictionaries.",
  openGraph: {
    title: "Python Quiz | Teguh Widodo",
    description:
      "Test kemampuan Python lo: variables, loops, functions, lists, dan dictionaries.",
    type: "website",
  },
};

export default function PythonQuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
