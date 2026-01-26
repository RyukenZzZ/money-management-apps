export const succesResponse = (res, data, message = "Request successful") => {
    res.status(200).json({
        succes:true,
        message,
        data,
    })
}