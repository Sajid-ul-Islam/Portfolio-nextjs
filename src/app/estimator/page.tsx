import type { Metadata } from "next";
import ProjectEstimator from "../components/vscode/ProjectEstimator";

export const metadata: Metadata = {
  title: "Project Scope & Architecture Estimator | CybrCraft & Sajid Islam",
  description:
    "Interactive software solution scope calculator. Configure custom web apps, e-commerce platforms, LMS academies, and AI bot workflows with instant timeline estimates.",
};

export default function EstimatorPage() {
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 font-sans">
      <ProjectEstimator />
    </div>
  );
}
