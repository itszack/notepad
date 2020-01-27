import isEmpty from '../helpers/isEmpty';

const imageValidator = ({ image, errors }) => {
    errors = {};

    const imageSize = 2097152; // 2MB
    const imageName = image ? image.name : '';
    const imageTypes = ['jpeg', 'jpg', 'png', 'gif'];

    if (isEmpty(imageName)) {
        errors.image = 'Image is required';
    } else if (imageTypes.includes(imageName.split('.')[1]) === false) {
        errors.image = 'Please select an image';
    } else if (image.size > imageSize) {
        errors.image = 'Please select image of size less than 2MB';
    }

    return errors;
};

export default imageValidator;
