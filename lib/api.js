export async function api(path, { method = "GET", body } = {}) {
  const res = await fetch(`/server-api${path}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
    cache: "no-store",
  });

  let data = null;
  try {
    data = await res.json();
  } catch (err) {}

  if (!res.ok) {
    const error = new Error((data && data.message) || "Something went wrong. Please try again.");
    error.status = res.status;
    throw error;
  }
  return data;
}

export async function uploadImage(file) {
  const form = new FormData();
  form.append("image", file);
  const res = await fetch("/api/upload", { method: "POST", body: form });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Image upload failed. Please try again.");
  return data.url;
}
