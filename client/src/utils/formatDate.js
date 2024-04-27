const formatDate = ( date ) => {
    const publishedDate = new Date(date);
    const formattedDate = publishedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return formattedDate;
};

export default formatDate;