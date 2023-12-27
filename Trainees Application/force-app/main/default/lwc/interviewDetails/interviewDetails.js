// interviewDetails.js
import { LightningElement, api, } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class InterviewDetails extends LightningElement {
    @api interviewData;
    @api recordId;

    @api submittedFields; // Variable to store submitted data

    handleSubmit(event) {
        event.preventDefault();
        const fields = event.detail.fields;
        // console.log('fields:', fields);

        // this.submittedFields = fields; // Store submitted data

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

        // const updatedRecord = event.detail.id;
        // console.log('onsuccess: ', updatedRecord);

        // After successful update, dispatch a custom event
        // const updatedInterviewDetails = this.submittedFields;
        // console.log('update fields: ', updatedInterviewDetails);
        // const successEvent = new CustomEvent('interviewupdated', {
        //     detail: {
        //         updatedInterviewDetails
        //     },
        // });
        // this.dispatchEvent(successEvent);


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