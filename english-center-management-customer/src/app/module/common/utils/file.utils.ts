export function fileToImageUrl(file: File): string {
    if (!file) return '';
    return URL.createObjectURL(file);
}

export function getExtension(file: File): string {
    const fileName = file.name;
    const dot = fileName.lastIndexOf('.');
    return fileName.substring(dot);
}
