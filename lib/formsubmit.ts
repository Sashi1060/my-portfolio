// The original formsubmit.co contact form. Used by the contact page, and by the chat
// assistant as a fallback when the character service is unreachable or unavailable.

export const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/sashankyeturi6@gmail.com";

export async function submitToFormsubmit(fields: Record<string, string>): Promise<boolean> {
  try {
    const response = await fetch(FORMSUBMIT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(fields),
    });
    const data: { success?: boolean | string } = await response.json();
    return data.success === true || data.success === "true";
  } catch {
    return false;
  }
}
