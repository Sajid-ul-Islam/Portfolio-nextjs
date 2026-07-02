import { personalInfo, experiences, education, skillGroups, projects, metrics, family } from "../data/portfolio";

/**
 * Intelligent Local Search Engine
 * Attempts to answer user queries using local state before calling external AI.
 */
export function getLocalIntel(query: string): string | null {
  const q = query.toLowerCase();

  // 1. Identify intent
  
  if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("know")) {
    const techGroup = skillGroups[0]?.skills || [];
    const biGroup = skillGroups[1]?.skills || [];
    const coreGroup = skillGroups[2]?.skills || [];
    const aiGroup = skillGroups[4]?.skills || [];
    
    const tech = techGroup.map(s => s.name).join(", ");
    const bi = biGroup.map(s => s.name).join(", ");
    const core = coreGroup.map(s => s.name).join(", ");
    const ai = aiGroup.map(s => s.name).join(", ");
    return `[LOCAL_INTEL]: Sajid's toolkit includes:
- Machine Learning & Forecasting: ${tech}
- BI & Dashboards: ${bi}
- Core Operations: ${core}
- AI Systems & Source Control: ${ai}`;
  }

  // Projects intent
  if (q.includes("project") || q.includes("work") || q.includes("build") || q.includes("portfolio")) {
    const topProjects = projects.slice(0, 5).map(p => `${p.title}: ${p.description}`).join("\n- ");
    return `[LOCAL_INTEL]: I've located ${projects.length} distinct projects in the archive. Some highlights:
- ${topProjects}
Check the /projects directory for full mission details.`;
  }

  // Experience/Work history intent
  if (q.includes("experience") || q.includes("job") || q.includes("company") || q.includes("career")) {
    const exp = experiences.map(e => `${e.title} at ${e.company}`).join("\n- ");
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
    return `[LOCAL_INTEL]: You can establish connection with Sajid at ${personalInfo.email}. WhatsApp: ${personalInfo.whatsapp}`;
  }

  // Family (He has a family section)
  if (q.includes("family") || q.includes("wife") || q.includes("father")) {
    const f = family.slice(0, 3).map(m => `${m.name} (${m.relation})`).join(", ");
    return `[LOCAL_INTEL]: Family data found: ${f} and others.`;
  }

  return null; // No local match, proceed to AI
}

