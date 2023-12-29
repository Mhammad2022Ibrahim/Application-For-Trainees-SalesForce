import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import uploadFile from '@salesforce/apex/UploadFilesController.uploadFile';

export default class EditApplicantProfile extends LightningElement {

    @api applicantData;
    @api recordId;
    fileData

    openfileUpload(event) {
        const file = event.target.files[0]
        var reader = new FileReader()
        reader.onload = () => {
            var base64 = reader.result.split(',')[1]
            this.fileData = {
                'filename': file.name,
                'base64': base64,
                'recordId': this.recordId
            }
            console.log(this.fileData)
        }
        reader.readAsDataURL(file)
    }

    // handleSubmit(event) {
    //     event.preventDefault();
    //     const fields = event.detail.fields;
    //     console.log('fields:', fields);


    //     this.template.querySelector('lightning-record-edit-form').submit(fields);
    // }

    // Define the toast function
    toast(title, variant) {
        const toastEvent = new ShowToastEvent({
            title: title,
            variant: variant
        });
        this.dispatchEvent(toastEvent);
    }


    // handleSubmit(event) {
    //     event.preventDefault();

    //     // Ensure there's fileData available
    //     if (this.fileData) {
    //         const { base64, filename, recordId } = this.fileData;

    //         // Call a function (e.g., uploadFile) to upload the file to Salesforce
    //         uploadFile({ base64, filename, recordId }).then(result => {
    //             // Once file is uploaded successfully, proceed to submit form fields

    //             // Access form fields
    //             const fields = event.detail.fields;
    //             console.log('Fileds for Submit: ', fields);
    //             console.log('CV ID: ', result);

    //             // Submit the form fields
    //             this.template.querySelector('lightning-record-edit-form').submit(fields);

    //             // Display success message
    //             let title = `${filename} uploaded successfully!!`;
    //             this.toast(title);
    //         }).catch(error => {
    //             // Handle any error that might occur during file upload
    //             console.error('Error uploading file:', error);
    //             this.toast('Error uploading file', 'error');
    //         });
    //     } else {
    //         // If there's no fileData available, simply submit the form fields
    //         const fields = event.detail.fields;
    //         this.template.querySelector('lightning-record-edit-form').submit(fields);
    //     }
    // }

    // Inside the handleSubmit method in EditApplicantProfile component
    handleSubmit(event) {
        event.preventDefault();

        if (this.fileData) {
            const { base64, filename, recordId } = this.fileData;

            uploadFile({ base64, filename, recordId })
                .then(result => {
                    const fields = event.detail.fields;
                    // fields.Cv_Uploaded__c = filename; // Set the Cv_Uploaded__c field with the file name
                    console.log('Fileds for Submit: ', fields);
                    console.log('CV ID: ', result);
                    console.log('CV Name: ', filename);

                    this.template.querySelector('lightning-record-edit-form').submit(fields);
                    let title = `${filename} uploaded successfully!!`;
                    this.toast(title);
                })
                .catch(error => {
                    console.error('Error uploading file:', error);
                    this.toast('Error uploading file', 'error');
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



