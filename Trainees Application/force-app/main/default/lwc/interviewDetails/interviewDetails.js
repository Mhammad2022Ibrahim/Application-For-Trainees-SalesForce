// interviewDetails.js
import { LightningElement, api, } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// import { refreshApex } from '@salesforce/apex';

export default class InterviewDetails extends LightningElement {
    @api interviewData;
    @api recordId;


    handleSubmit(event) {
        event.preventDefault();
        const fields = event.detail.fields;

        this.template.querySelector('lightning-record-edit-form').submit(fields);

    }


    handleSuccess(event) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Interview updated successfully',
                variant: 'success',
            })
        );

    }


    handleError(event) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error',
                message: 'Error updating record',
                variant: 'error',
            })
        );
    }

}