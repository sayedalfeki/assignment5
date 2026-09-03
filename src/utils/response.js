import express from 'express'
export default express.response.globalResponse =
    function ({ message = 'done', data = undefined, status = 200 } = {}) {
        return this.status(status).json({
            message,
            data
        })
    }