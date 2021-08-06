module.exports.writeResult = (status, msg, data) => JSON.stringify({
    status,
    msg,
    data
})