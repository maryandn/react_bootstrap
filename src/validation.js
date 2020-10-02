export default function validationInfo(value) {
    const errors = {}

    if (!value.trim()){
        errors.username='Username required'
    }
    return errors
}
