// Utility function to read markdown files
export async function readMarkdownFile(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Error fetching markdown file: ${response.statusText}`);
        }
        const markdownContent = await response.text();
        return markdownContent;
    } catch (error) {
        console.error('Error reading markdown file:', error);
        return '';
    }
}
