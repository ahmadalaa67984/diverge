import { ref } from "vue";

export function useClipboard() {
  const copied = ref(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      copied.value = true;
      setTimeout(() => (copied.value = false), 2000); // Reset after 2s
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return { copied, copyToClipboard };
}
