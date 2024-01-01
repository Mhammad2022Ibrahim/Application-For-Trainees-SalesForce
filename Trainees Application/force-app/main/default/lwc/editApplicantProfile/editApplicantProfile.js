import { LightningElement, api, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import uploadFile from '@salesforce/apex/UploadFilesController.uploadFile';

export default class EditApplicantProfile extends LightningElement {

    @api applicantData;
    @api recordId;
    @track fileData;

    openfileUpload(event) {
        const file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = () => {
            var base64 = reader.result.split(',')[1];
            this.fileData = {
                'filename': file.name,
                'base64': base64,
                'recordId': this.recordId
            };
            console.log(this.fileData);
        };
        reader.readAsDataURL(file);
    }

    toastFunction(title, variant) {
        const toastEvent = new ShowToastEvent({
            title: title,
            variant: variant
        });
        this.dispatchEvent(toastEvent);
    }


    handleSubmit(event) {
        event.preventDefault();

        if (this.fileData) {
            const { base64, filename, recordId } = this.fileData;

            uploadFile({ base64, filename, recordId })
                .then(result => {
                    const fields = event.detail.fields;

                    fields.Cv_Uploaded__c = filename; // Set the Cv_Uploaded__c field with the file name

                    // Reset the fileData property after successful submission
                    this.fileData = null; // or this.fileData = {};

                    console.log('Fields for Submit: ', fields);
                    console.log('CV ID: ', result);
                    console.log('CV Name: ', filename);

                    this.template.querySelector('lightning-record-edit-form').submit(fields);
                    let title = `${filename} uploaded successfully!!`;
                    this.toastFunction(title);
                })
                .catch(error => {
                    console.error('Error uploading file:', error);
                    this.toastFunction('Error uploading file', 'error');
                });
        } else {
            const fields = event.detail.fields;
            this.template.querySelector('lightning-record-edit-form').submit(fields);
        }
    }


    handleSuccess(event) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Record updated successfully',
                variant: 'success',
            })
        );
        // Emit a custom event upon successful record update
        const successEvent = new CustomEvent('applicantupdated');
        this.dispatchEvent(successEvent);

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

