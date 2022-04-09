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