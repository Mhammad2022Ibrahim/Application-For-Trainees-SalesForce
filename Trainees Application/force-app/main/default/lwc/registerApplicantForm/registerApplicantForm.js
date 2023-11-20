
import { LightningElement, track } from 'lwc';
import saveTrainee from '@salesforce/apex/registerController.saveRegister';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import NAME_FIELD from '@salesforce/schema/Trainee__c.Name';
import PHONE_FIELD from '@salesforce/schema/Trainee__c.Phone__c';
import EMAIL_FIELD from '@salesforce/schema/Trainee__c.Email__c';
import ADDRESS_FIELD from '@salesforce/schema/Trainee__c.Address__c';
import EDUCATIONAL_FIELD from '@salesforce/schema/Trainee__c.Educational_Background__c';
import CERTIFICATIONS_FIELD from '@salesforce/schema/Trainee__c.Certifications__c';
import SKILLS_FIELD from '@salesforce/schema/Trainee__c.Skills__c';


// const EDUCATIONAL_OPTIONS = [
//     { label: "High School", value: "High School" },
//     { label: "Bachelor's Degree", value: "Bachelor's Degree" },
//     { label: "Master's Degree", value: "Master's Degree" },
//     { label: "Doctorate Degree", value: "Doctorate Degree" }
// ];


export default class RegistrationForm extends LightningElement {
    @track error;
    @track traineeRecord = {
        [NAME_FIELD.fieldApiName]: '',
        [PHONE_FIELD.fieldApiName]: '',
        [EMAIL_FIELD.fieldApiName]: '',
        [ADDRESS_FIELD.fieldApiName]: '',
        [EDUCATIONAL_FIELD.fieldApiName]: '',
        [CERTIFICATIONS_FIELD.fieldApiName]: '',
        [SKILLS_FIELD.fieldApiName]: ''
    };

    handleNameChange(event) {
        this.traineeRecord[NAME_FIELD.fieldApiName] = event.target.value;
    }

    handlePhoneChange(event) {
        this.traineeRecord[PHONE_FIELD.fieldApiName] = event.target.value;
    }

    handleEmailChange(event) {
        this.traineeRecord[EMAIL_FIELD.fieldApiName] = event.target.value;
    }

    handleAddressChange(event) {
        this.traineeRecord[ADDRESS_FIELD.fieldApiName] = event.target.value;
    }

    /*
    educationalOptions = EDUCATIONAL_OPTIONS;
    handleEducationalChange(event) {
        const selectedOptions = event.detail.value || [];
        
        // Ensure that the array is defined and not null
        if (Array.isArray(selectedOptions)) {
            this.traineeRecord[EDUCATIONAL_FIELD.fieldApiName] = selectedOptions;
            
            // Perform any other operations if needed
            // For example, check if the array contains a specific value
            // In handleEducationalChange()

        if (selectedOptions && Array.isArray(selectedOptions)) {

            // Check if Bachelor's Degree is selected
            if (selectedOptions.indexOf('Bachelor\'s Degree') !== -1) {
  
                 // Show a toast message
                const toastEvent = new ShowToastEvent({
                    title: 'Bachelor\'s Selected',
                    message: 'We see you selected Bachelor\'s Degree',
                    variant: 'success'
                });
            this.dispatchEvent(toastEvent);
  
            }
  
        }
  
        } else {
            // If the value is not an array, handle it accordingly
            console.error('Selected options is not an array:', selectedOptions);
        }
    }*/
    
    
    
    
    
    
    handleEducationalChange(event) {
        this.traineeRecord[EDUCATIONAL_FIELD.fieldApiName] = event.detail.value;
    }
    
    handleCertificationsChange(event) {
        this.traineeRecord[CERTIFICATIONS_FIELD.fieldApiName] = event.target.value;
    }

    handleSkillsChange(event) {
        this.traineeRecord[SKILLS_FIELD.fieldApiName] = event.target.value;
    }

    handleSave() {
        saveTrainee({ trainee: this.traineeRecord })
            .then(result => {
                // Clear the user-entered values
                this.traineeRecord = {
                    [NAME_FIELD.fieldApiName]: '',
                    [PHONE_FIELD.fieldApiName]: '',
                    [EMAIL_FIELD.fieldApiName]: '',
                    [ADDRESS_FIELD.fieldApiName]: '',
                    [EDUCATIONAL_FIELD.fieldApiName]: '',
                    [CERTIFICATIONS_FIELD.fieldApiName]: '',
                    [SKILLS_FIELD.fieldApiName]: ''
                };
    
                window.console.log('result ===> ' + result);
                // Show success message
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success!!',
                        message: 'Trainee Created Successfully!!',
                        variant: 'success'
                    })
                );
            })
            .catch(error => {
                this.error = error.message;
            });
    }
    
    
    
    

}















/*
import { LightningElement, track } from 'lwc';

// Importing Apex Class method
import saveTrainee from '@salesforce/apex/registerController.saveRegister';

// importing to show toast notifictions
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

// importing Account fields
import NAME_FIELD from '@salesforce/schema/Trainee__c.Name';
import Phone_FIELD from '@salesforce/schema/Trainee__c.Phone__c';
import Email_FIELD from '@salesforce/schema/Trainee__c.Email__c';
import Educational_FIELD from '@salesforce/schema/Trainee__c.Educational_Background__c';
import Address_FIELD from '@salesforce/schema/Trainee__c.Address__c';
import Certifications_FIELD from '@salesforce/schema/Trainee__c.Certifications__c';
import Skills_FIELD from '@salesforce/schema/Trainee__c.Skills__c';


export default class RegistrationForm extends LightningElement {
    @track error;

    // this object have record information
    @track traineeRecord = {
        Name : NAME_FIELD,
        Email : Email_FIELD,
        Phone : Phone_FIELD,
        Address : Address_FIELD,
        Educational : Educational_FIELD,
        Certifications : Certifications_FIELD,
        Skills : Skills_FIELD
    };


    handleNameChange(event) {
        this.traineeRecord.Name = event.target.value;
        window.console.log('Name ==> '+this.traineeRecord.Name);
    }

    handlePhoneChange(event) {
        this.traineeRecord.Phone = event.target.value;
        window.console.log('Phone ==> '+this.traineeRecord.Phone);
    }

    handleEmailChange(event) {
        this.traineeRecord.Email = event.target.value;
        window.console.log('Email ==> '+this.traineeRecord.Email);
    }

    handleAddressChange(event) {
        this.traineeRecord.Educational = event.target.value;
        window.console.log('Educational ==> '+this.traineeRecord.Educational);
    }

    handleEducationalChange(event) {
        this.traineeRecord.Address = event.target.value;
        window.console.log('Address ==> '+this.traineeRecord.Address);
    }

    handleCertificationsChange(event) {
        this.traineeRecord.Certifications = event.target.value;
        window.console.log('Certifications ==> '+this.traineeRecord.Certifications);
    }

    handleSkillsChange(event) {
        this.traineeRecord.Skills = event.target.value;
        window.console.log('Skills ==> '+this.traineeRecord.Skills);
    }



    handleSave() {
        saveTrainee({trainee: this.traineeRecord})
        .then(result => {
            // Clear the user enter values
            this.traineeRecord = {};

            window.console.log('result ===> '+result);
            // Show success messsage
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success!!',
                message: 'Trainee Created Successfully!!',
                variant: 'success'
            }),);
        })
        .catch(error => {
            this.error = error.message;
        });
    }
}
*/
