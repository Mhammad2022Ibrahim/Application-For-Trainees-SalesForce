public with sharing class ApplicationController {

    @AuraEnabled(cacheable=true)
    public static List<Applicant_Profile__c> getApplicants() {
        String query = 'SELECT Id, Name, Email__c, Phone__c, Address__c, Educational_Background__c, Certifications__c, Skills__c, Status__c, Cv_Uploaded__c FROM Applicant_Profile__c';
        return Database.query(query);
    }

    // @AuraEnabled(cacheable=true)
    // public static Applicant_Profile__c getApplicantDetails(String applicantId, String cacheKey) {
    //     String query = 'SELECT Id, Name, Email__c, Phone__c, Address__c, Educational_Background__c, Certifications__c, Skills__c, Status__c, Cv_Uploaded__c FROM Applicant_Profile__c WHERE Id = :applicantId LIMIT 1';
    //     return Database.query(query);
    // }


    @AuraEnabled(cacheable=true)
    public static Applicant_Profile__c getApplicantDetails(String applicantId, String cacheKey) {
        String query = 'SELECT Id, Name, Email__c, Phone__c, Address__c, Educational_Background__c, Certifications__c, Skills__c, Status__c, Cv_Uploaded__c FROM Applicant_Profile__c WHERE Id = :applicantId LIMIT 1';
        Applicant_Profile__c applicant = Database.query(query);

        // Fetch CV details for the applicant
        List<ContentDocumentLink> contentDocumentLinks = [SELECT ContentDocumentId, ContentDocument.Title, ContentDocument.LatestPublishedVersionId
                                                         FROM ContentDocumentLink
                                                         WHERE LinkedEntityId = :applicant.Id
                                                         LIMIT 1];

        if (!contentDocumentLinks.isEmpty()) {
            ContentDocumentLink contentDocumentLink = contentDocumentLinks[0];
            ContentVersion cv = [SELECT Id, Title, VersionData
                                 FROM ContentVersion
                                 WHERE Id = :contentDocumentLink.ContentDocument.LatestPublishedVersionId];

            // Update Cv_Uploaded__c with CV details
            applicant.Cv_Uploaded__c = cv.Title;
        } else {
            // No CV uploaded, set Cv_Uploaded__c to empty
            applicant.Cv_Uploaded__c = '';
        }

        return applicant;
    }


}