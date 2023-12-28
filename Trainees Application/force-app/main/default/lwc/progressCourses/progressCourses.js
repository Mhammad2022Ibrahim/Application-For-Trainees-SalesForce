import {api } from 'lwc';
import LightningModal from "lightning/modal";

export default class ProgressCourses extends LightningModal {

    @api courseFields;

    errors;

    closePopupSuccess(event) {
        this.close(event.detail.id);
    }

    closePopup() {
        this.close();
    }

   
}