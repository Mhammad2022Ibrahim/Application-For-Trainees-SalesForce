import { LightningElement, wire, track, api } from 'lwc';
import getApplicants from '@salesforce/apex/ApplicationController.getApplicants';
import getApplicantDetails from '@salesforce/apex/ApplicationController.getApplicantDetails';
import { refreshApex } from '@salesforce/apex';

export default class ApplicationInformation extends LightningElement {
    @track applicants;
    @api selectedApplicant;
    @api _wiredApplicants;


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

        getApplicantDetails({ applicantId, cacheKey: new Date().getTime()}) // Refresh data by changing the cache key
            .then(result => {
                this.selectedApplicant = result;

                const editApplicantProfile = this.template.querySelector('c-edit-applicant-profile');
                if (editApplicantProfile) {
                    editApplicantProfile.applicantData = this.selectedApplicant;
                }
            })
            .catch(error => {
                console.error('Error fetching applicant details:', error);
            });
    }

    handleApplicantUpdated(event) {
        refreshApex(this._wiredApplicants);
        
    }

    closeAction() {
        this.selectedApplicant = null;
    }

}


