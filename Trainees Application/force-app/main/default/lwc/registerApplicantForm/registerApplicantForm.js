import { LightningElement, track } from 'lwc';
import saveApplicant from '@salesforce/apex/registerController.saveRegister';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import name from '@salesforce/schema/Applicant_Profile__c.Name';
import phone from '@salesforce/schema/Applicant_Profile__c.Phone__c';
import email from '@salesforce/schema/Applicant_Profile__c.Email__c';
import address from '@salesforce/schema/Applicant_Profile__c.Address__c';
import education from '@salesforce/schema/Applicant_Profile__c.Educational_Background__c';
import certificate from '@salesforce/schema/Applicant_Profile__c.Certifications__c';
import skills from '@salesforce/schema/Applicant_Profile__c.Skills__c';


export default class RegistrationForm extends LightningElement {
    @track error;

    @track applicantRecord = {
        [name.fieldApiName] : '',
        [phone.fieldApiName]: '',
        [email.fieldApiName]: '',
        [address.fieldApiName]: '',
        [education.fieldApiName]: '',
        [certificate.fieldApiName]: '',
        [skills.fieldApiName]: ''
    };

    // Define your education options
    educationOptions = [
        { label: 'High School', value: 'High School' },
        { label: "Bachelor's Degree", value: "Bachelor's Degree" },
        { label: "Master's Degree", value: "Master's Degree" },
        { label: 'Doctorate Degree', value: 'Doctorate Degree' }
    ];

    handleNameChange(event) {
        this.applicantRecord[name.fieldApiName] = event.target.value;
    }

    handlePhoneChange(event) {
        this.applicantRecord[phone.fieldApiName] = event.target.value;
    }

    handleEmailChange(event) {
        this.applicantRecord[email.fieldApiName] = event.target.value;
    }

    handleAddressChange(event) {
        this.applicantRecord[address.fieldApiName] = event.target.value;
    }  
    
    
    handleEducationChange(event) {
        this.applicantRecord[education.fieldApiName] = event.detail.value;
    }
    
    
    handleCertificationsChange(event) {
        this.applicantRecord[certificate.fieldApiName] = event.target.value;
    }

    handleSkillsChange(event) {
        this.applicantRecord[skills.fieldApiName] = event.target.value;
    }


    handleSave() {
        // Check if required fields are filled
        if (!this.applicantRecord[name.fieldApiName] ||
            !this.applicantRecord[email.fieldApiName]||
            !this.applicantRecord[education.fieldApiName]) {
                this.error = 'Please fill in all required fields.';
                return;
            }

        saveApplicant({ applicant: this.applicantRecord })
            .then(result => {
                // Clear all fields in traineeRecord
                this.applicantRecord = {
                    [name.fieldApiName] : '',
                    [phone.fieldApiName]: '',
                    [email.fieldApiName]: '',
                    [address.fieldApiName]: '',
                    [education.fieldApiName]: '',
                    [certificate.fieldApiName]: '',
                    [skills.fieldApiName]: ''
                };

                // Reset error
                this.error = '';

                window.console.log('result ===> ' + JSON.stringify(result));
    
                // Show success message
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success!!',
                        message: 'Applicant Profile Created Successfully!!',
                        variant: 'success'
                    })
                );
            })
            .catch(error => {
                this.error = error.message;
                console.error('Error saving trainee:', error);
            });
    }  
    
    
    

}



