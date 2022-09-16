export const fbTimestampToDateString = (fbTs) => {
    if (!fbTs) return null;

    const dateTs = new Date(fbTs.toMillis());
    return dateTs?.toLocaleDateString();
};
