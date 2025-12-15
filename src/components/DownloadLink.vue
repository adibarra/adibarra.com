<script setup lang="ts">
const props = defineProps<{ url: string }>()

async function downloadFile() {
  try {
    const response = await fetch(props.url, { method: 'GET' })
    if (!response.ok) {
      throw new Error('Failed to download file')
    }
    const blob = await response.blob()
    const objectUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')
    const filename = props.url.split('/').pop() || 'download'
    link.href = objectUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(objectUrl)
  }
  catch (error) {
    console.error(error)
  }
};
</script>

<template>
  <button
    class="download-btn"
    @click="downloadFile"
  >
    Download as PDF
    <div class="i-carbon-document-download inline-block align-text-bottom" />
  </button>
</template>

<style scoped>
.download-btn {
  font-weight: inherit;
  text-decoration: none;
  border-bottom: 1px solid rgba(125, 125, 125, 0.3);
  transition: border 0.3s ease-in-out;
}

.download-btn:hover {
  border-bottom: 1px solid var(--fg);
}
</style>
