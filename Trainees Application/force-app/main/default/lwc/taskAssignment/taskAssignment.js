import { api, } from 'lwc';
import LightningModal from "lightning/modal";

export default class TaskAssignment extends LightningModal {
    @api taskFields;

    errors;

    closePopupSuccess(event) {
        this.close(event.detail.id);
    }

    closePopup() {
        this.close();
    }
}