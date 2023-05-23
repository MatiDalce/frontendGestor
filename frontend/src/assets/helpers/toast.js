import Swal from 'sweetalert2';

// type: STRING | "success" o "error"
// title: STRING | Es el texto
export function toast (type = 'error', title = '') {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    
    return Toast.fire({
        icon: type,
        title: title
    })
} 