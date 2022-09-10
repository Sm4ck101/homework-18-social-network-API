const dayjs = require("dayjs");

const dateFormat = (date) => {
    return dayjs(date).format("MM-DD-YY")
};

module.exports = dateFormat