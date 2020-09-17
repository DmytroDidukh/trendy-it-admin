export default (status) => {
    switch (status) {
        case 'done': {
            return 'success'
        }
        case 'canceled': {
            return 'danger'
        }
        default: {
            return 'secondary'
        }
    }
}
