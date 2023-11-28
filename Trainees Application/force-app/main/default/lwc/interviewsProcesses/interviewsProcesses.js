import { LightningElement, wire, track } from 'lwc';
import getAcceptedInterviewApplicants from '@salesforce/apex/InterviewController.getAcceptedInterviewApplicants';
import getInterviewDetails from '@salesforce/apex/InterviewController.getInterviewDetails';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class InterviewsProcesses extends LightningElement {
    @track acceptedInterviewApplicants;

    @track showInterviewDetails;

    @wire(getAcceptedInterviewApplicants)

    wiredAcceptedInterviewApplicants(result) {
        if (result.data) {
            this.acceptedInterviewApplicants = [...result.data];
            console.log('Fetched Data:', this.acceptedInterviewApplicants); // Log fetched data
        } else if (result.error) {
            console.error('Error fetching Accepted Interview Applicants:', result.error);
        }
    }


    handleApplicantClick(event) {
        const applicantId = event.currentTarget.dataset.id;

        // Call Apex method to get interview details
        getInterviewDetails({ applicantId })
            .then(result => {
                this.showInterviewDetails = result;
            })
            .catch(error => {
                console.error('Error fetching interview details:', error);
            });
    }


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








