
    import { label } from './label.js';
    import { isSuccessResp, getStatusMessage } from "./ajax-request.js";

    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    export function sweetToast(msg)
    {
        Toast.fire({
            icon: 'info',
            title: msg,
        })
    }

    export function sweetToastAndCallback(data, callback)
    {
        Swal.fire({
            toast: true,
            position: 'center',
            icon: isSuccessResp(data) ? 'success' : 'error',
            title: getStatusMessage(data),
            showConfirmButton: false,
            timer: 1500
        }).then((result) => {
            if (result.isDismissed)
            {
                if (isSuccessResp(data))
                    callback();
            }
        })
    }

    export function sweetError(msg)
    {
        Swal.fire({
            icon: 'error',
            html : msg
        })
    }

    export function sweetConfirm(msg, callback)
    {
        Swal.fire({
            text: msg,
            showCancelButton: true,
            confirmButtonText: label.confirm,
            cancelButtonText: label.cancel
        }).then((result) => {
            if (result.value)
                callback();
        })
    }

    export function sweetConfirmWithCancelCallback(msg, okCallback, cancelCallback)
    {
        Swal.fire({
            text: msg,
            showCancelButton: true,
            confirmButtonText: label.confirm,
            cancelButtonText: label.cancel
        }).then((result) => {
            if (result.value)
                okCallback();
            else
                cancelCallback();
        })
    }

    export function sweetConfirmWithContent(content, callback)
    {
        Swal.fire({
            html: content,
            showCancelButton: true,
            confirmButtonText: label.confirm,
            cancelButtonText: label.cancel
        }).then((result) => {
            if (result.value)
                callback();
        })
    }