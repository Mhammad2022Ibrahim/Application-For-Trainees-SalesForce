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

        getApplicantDetails({ applicantId })
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

    deactivateTabs() {
        // Remove 'active' class from all tabs and contents
        const tabItems = this.template.querySelectorAll('.slds-vertical-tabs__nav-item');
        const tabContent = this.template.querySelectorAll('.slds-vertical-tabs__content');
        tabItems.forEach(tab => tab.classList.remove('active'));
        tabContent.forEach(content => content.classList.remove('active'));
    }

}


