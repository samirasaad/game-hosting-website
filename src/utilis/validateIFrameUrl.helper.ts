// Simple way to check if iframe can be loaded
export async function validateIframeUrl(url: string) {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok; // true if status 200–299
  } catch {
    return false;
  }
}
