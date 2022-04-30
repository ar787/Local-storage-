export const getImageNameByContentType = contentType => {
    switch (contentType) {
        case 'application/pdf': return 'PDF';
        case 'image/png': return 'PNG';
        case 'image/jpg':
        case 'image/jpeg': return 'JPG';
        case 'text/csv': return 'CSV';
        case 'application/msword':
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': return 'DOC';
        case 'application/vnd.ms-excel':
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': return 'XLS';
        default: return 'PDF'
    }
}

export function stringToColor(string) {
    let i, hash = 0;
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }
    return color;
}