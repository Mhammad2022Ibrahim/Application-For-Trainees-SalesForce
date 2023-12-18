// feedback.js
import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Feedback extends LightningElement {

    handleSubmit(event) {
        event.preventDefault();
        const fields = event.detail.fields;

        this.template.querySelector('lightning-record-edit-form').submit(fields);

    }


    handleSuccess(event) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Feedback Interview successfully sending',
                variant: 'success',
            })
        );

        // Emit a custom event to notify the parent component (interviewsProcesses) about the new feedback
        const successEvent = new CustomEvent('feedbackadded');
        this.dispatchEvent(successEvent);

    }



    handleError(event) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error',
                message: 'Error send record',
                variant: 'error',
            })
        );
    }


}