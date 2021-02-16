export const modifKey = (result) => {
    const data_notice = Object.keys(result).map((key) => [Number(key), result[key]]);
    return data_notice;
};
