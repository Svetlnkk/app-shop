import SvgIcon from './UI/SvgIcon.vue';
import AppInputPassword from './UI/AppInputPassword.vue';
import AppInputText from './UI/AppInputText.vue';
import AppInputNumber from './UI/AppInputNumber.vue';
import AppButton from './UI/AppButton.vue';
import AppBadge from './UI/AppBadge.vue';
import AppModal from './UI/AppModal.vue';
import AppImage from './UI/AppImage.vue';
import AppSelect from './UI/AppSelect.vue';

export default function (app) {
    app.component('SvgIcon', SvgIcon);
    app.component('AppPassword', AppInputPassword);
    app.component('AppText', AppInputText);
    app.component('AppNumber', AppInputNumber);
    app.component('AppButton', AppButton);
    app.component('AppBadge', AppBadge);
    app.component('AppModal', AppModal);
    app.component('AppImage', AppImage);
    app.component('AppSelect', AppSelect);
}
