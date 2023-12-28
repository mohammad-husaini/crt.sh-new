const daysToMilliseconds = (days: number) => {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    return days * millisecondsPerDay;
};

export default daysToMilliseconds