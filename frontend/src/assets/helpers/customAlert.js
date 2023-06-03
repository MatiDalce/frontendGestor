import Swal from 'sweetalert2';

export function errorAlert(
    title = '',
    msg = '',
) {
    console.log(`${title}: ${msg}`);
    return Swal.fire({
        icon: 'error',
        title: title,
        text: msg,
        confirmButtonColor: 'var(--skyblue-bg)',
    })
}

export function warningEditAlert(
    endpoint = '',
    body,
    title = '',
    msg = '',
    textBtnOne = 'Aceptar',
    textBtnTwo = 'Cancelar',
) {
    return Swal.fire({
        title: title,
        text: msg,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'var(--skyblue-bg)',
        cancelButtonColor: 'var(--red-bg)',
        confirmButtonText: textBtnOne,
        cancelButtonText: textBtnTwo
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(endpoint, { // id = id del turno
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            .then(res => {
                if (!res.ok) {
                    return null
                } else return res.json();
            })
        } else return null
    })
}

// Por ahora no se usa
export function warningDeleteAlert(
    endpoint = '',
    title = '',
    msg = '',
    textBtnOne = 'Aceptar',
    textBtnTwo = 'Cancelar',
) {
    return Swal.fire({
        title: title,
        text: msg,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'var(--skyblue-bg)',
        cancelButtonColor: 'var(--red-bg)',
        confirmButtonText: textBtnOne,
        cancelButtonText: textBtnTwo
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(endpoint, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    return null
                }
            })
        } else return null
    })
}