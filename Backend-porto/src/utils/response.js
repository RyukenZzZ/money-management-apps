export const succesResponse = (res, data) => {
    res.status(200).json({
        succes:true,
        data,
    })
}