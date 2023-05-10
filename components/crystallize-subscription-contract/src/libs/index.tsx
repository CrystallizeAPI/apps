export const formatDate = (date: string) => {
    var formattedDate = new Date(date);

    const month = formattedDate.toLocaleString('default', { month: 'long' });
    const year = formattedDate.toLocaleString('default', { year: 'numeric' });
    const day = formattedDate.toLocaleString('default', { day: 'numeric' });

    return { date: formattedDate, month, day, year };
};
