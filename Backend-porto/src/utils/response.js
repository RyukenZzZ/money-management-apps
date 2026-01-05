exports.successResponse = (res, data) => {
    res.status(200).json({
        succes:true,
        data,
    })
}