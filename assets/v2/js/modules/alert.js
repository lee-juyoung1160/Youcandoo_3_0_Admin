
    import { label } from './label.js';
    import { isSuccessResp, getStatusMessage } from "./request.js";

    export function sweetToast(msg)
    {
        Swal.fire({
            toast: true,
            position: 'center',
            icon: 'warning',
            title: msg,
            showConfirmButton: false,
            timer: 1500
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
            text: msg
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