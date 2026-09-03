export const errorHandler = (err, req, res, next) => {
    return res.status(Number(err.cause) || 505).json({
        'error': err.message,
        'stack': process.env.NODE_ENV == 'develoment' ? err.stack : undefined
    })
}