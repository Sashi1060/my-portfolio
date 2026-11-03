"use client";

import { useEffect, useState } from "react";
import { getProfessionalExperience } from "@/lib/experience";

export default function ProfessionalExperience({ compact = false }: { compact?: boolean }) {
  const [experience, setExperience] = useState<ReturnType<typeof getProfessionalExperience> | null>(null);

  useEffect(() => {
    const update = () => setExperience(getProfessionalExperience(new Date()));
    update();
    const interval = window.setInterval(update, 60_000);
    document.addEventListener("visibilitychange", update);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  if (!experience) return <span>Since Dec 2023</span>;

  const { years, months } = experience;
  const full = [
    years > 0 ? `${years} ${years === 1 ? "year" : "years"}` : "",
    months > 0 || years === 0 ? `${months} ${months === 1 ? "month" : "months"}` : "",
  ].filter(Boolean).join(" ");
  const short = [years > 0 ? `${years}y` : "", months > 0 || years === 0 ? `${months}m` : ""].filter(Boolean).join(" ");

  return <span title={`${full} of professional experience since December 2023`} aria-label={`${full}, since December 2023`}>{compact ? short : full}</span>;
}
