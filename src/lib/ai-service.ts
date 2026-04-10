export async function generateText(prompt: string, systemPrompt?: string) {
  const response = await fetch("/api/generate-text", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, systemPrompt }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error || "Failed to generate text");
  }

  return data.text as string;
}

export async function generateImage(prompt: string, editImage?: string) {
  const response = await fetch("/api/generate-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, editImage }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error || "Failed to generate image");
  }

  return data.imageUrl as string;
}
