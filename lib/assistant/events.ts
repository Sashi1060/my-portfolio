// Lets any page open the floating assistant widget (e.g. the "Chat now" button on /contact).

export const OPEN_ASSISTANT_EVENT = "assistant:open";

export function openAssistant(): void {
  window.dispatchEvent(new Event(OPEN_ASSISTANT_EVENT));
}
