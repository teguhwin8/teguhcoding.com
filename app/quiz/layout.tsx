import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JavaScript Quiz Interaktif",
  description:
    "Test kemampuan JavaScript lo dengan quiz interaktif. Soal-soal praktis dengan penjelasan lengkap.",
  openGraph: {
    title: "JavaScript Quiz Interaktif | Teguh Widodo",
    description:
      "Test kemampuan JavaScript lo dengan quiz interaktif. Soal-soal praktis dengan penjelasan lengkap.",
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
