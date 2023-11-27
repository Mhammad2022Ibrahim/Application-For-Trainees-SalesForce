import { LightningElement, wire, track } from 'lwc';
import getApplicants from '@salesforce/apex/ApplicationController.getApplicants';
import getApplicantDetails from '@salesforce/apex/ApplicationController.getApplicantDetails';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

export default class ApplicationInformation extends LightningElement {
    @track applicants;
    @track selectedApplicant;
    _wiredApplicants;

    @wire(getApplicants)
    wiredApplicants(result) {
        this._wiredApplicants = result;
        const { data, error } = result;
        if (data) {
            this.applicants = [...data];
        } else if (error) {
            console.error('Error fetching applicants:', error);
        }
    }

    handleApplicantClick(event) {
        const applicantId = event.currentTarget.dataset.id;

        getApplicantDetails({ applicantId })
            .then(result => {
                this.selectedApplicant = result;
            })
            .catch(error => {
                console.error('Error fetching applicant details:', error);
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
                message: 'Record updated successfully',
                variant: 'success',
            })
        );

        // Refresh the list of applicants to reflect the changes
        return refreshApex(this._wiredApplicants);
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



