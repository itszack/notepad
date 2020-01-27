import isEmpty from '../helpers/isEmpty';

const noteValidator = ({ title, body, errors }) => {
    errors = {};

    if (isEmpty(title)) {
        errors.title = 'Title is required';
    } else if (title.length < 3) {
        errors.title = 'Title must contain atleast be 3 character';
    }

    if (isEmpty(body)) {
        errors.body = 'Body is required';
    } else if (body.length < 3) {
        errors.body = 'Body must contain atleast be 3 character';
    }

    return errors;
};

export default noteValidator;
