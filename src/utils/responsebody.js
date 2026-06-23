const errorResponseBody ={
    error: {},
    data: {},
    message: 'Something went wrong,Can not process the request ',
    success:false
}

const successResponseBody = {
    error: {},
    data:{},
    message:"Successfully processed the request",
    success:true
}

export default {
    errorResponseBody,
    successResponseBody
}