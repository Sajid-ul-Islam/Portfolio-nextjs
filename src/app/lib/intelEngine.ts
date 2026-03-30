import { personalInfo, experience, education, skills, projects, metrics, awards, family } from "../data";

/**
 * Intelligent Local Search Engine
 * Attempts to answer user queries using local state before calling external AI.
 */
export function getLocalIntel(query: string): string | null {
  const q = query.toLowerCase();

  // 1. Identify intent
  
  // Skills intent
  if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("know")) {
    const tech = skills.technical.map(s => s.name).join(", ");
    const web = skills.web.map(s => s.name).join(", ");
    const core = skills.core.join(", ");
    return `[LOCAL_INTEL]: Sajid's toolkit includes:
- Technical: ${tech}
- Web: ${web}
- Core: ${core}`;
  }

  // Projects intent
  if (q.includes("project") || q.includes("work") || q.includes("build") || q.includes("portfolio")) {
    const topProjects = projects.slice(0, 5).map(p => `${p.title}: ${p.desc}`).join("\n- ");
    return `[LOCAL_INTEL]: I've located ${projects.length} distinct projects in the archive. Some highlights:
- ${topProjects}
Check the /projects directory for full mission details.`;
  }

  // Experience/Work history intent
  if (q.includes("experience") || q.includes("job") || q.includes("company") || q.includes("career")) {
    const exp = experience.map(e => `${e.role} at ${e.company}`).join("\n- ");
    return `[LOCAL_INTEL]: Operational History:
- ${exp}
He has over 2 years of experience in Marketplace analysis and BI strategy.`;
  }

  // Education intent
  if (q.includes("educat") || q.includes("studi") || q.includes("degree") || q.includes("university")) {
    const edu = education.map(e => `${e.degree} from ${e.institution}`).join("\n- ");
    return `[LOCAL_INTEL]: Academic Background:
- ${edu}`;
  }

  // Bio/General info
  if (q.includes("who") || q.includes("about") || q.includes("sajid") || q.includes("bio")) {
    return `[LOCAL_INTEL]: ${personalInfo.name} is a ${personalInfo.title}. ${personalInfo.bio}`;
  }

  // Metrics
  if (q.includes("metric") || q.includes("stat") || q.includes("number")) {
    const m = metrics.map(n => `${n.label}: ${n.value} (${n.sub})`).join("\n- ");
    return `[LOCAL_INTEL]: Core Metrics:
- ${m}`;
  }

  // Contact
  if (q.includes("contact") || q.includes("hire") || q.includes("email") || q.includes("reach")) {
    return `[LOCAL_INTEL]: You can establish an uplink with Sajid at ${personalInfo.email}. WhatsApp: ${personalInfo.whatsapp}`;
  }

  // Family (He has a family section)
  if (q.includes("family") || q.includes("wife") || q.includes("father")) {
    const f = family.slice(0, 3).map(m => `${m.name} (${m.relation})`).join(", ");
    return `[LOCAL_INTEL]: Family data found: ${f} and others.`;
  }

  return null; // No local match, proceed to AI
}
