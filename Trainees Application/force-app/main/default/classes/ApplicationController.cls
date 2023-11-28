public with sharing class ApplicationController {

    @AuraEnabled(cacheable=true)
    public static List<Applicant_Profile__c> getApplicants() {
        return [SELECT Id, Name FROM Applicant_Profile__c];
    }

    @AuraEnabled(cacheable=true)
    public static Applicant_Profile__c getApplicantDetails(String applicantId) {
        return [SELECT Id, Name, Email__c, Phone__c, Address__c, Educational_Background__c,
        Certifications__c, Skills__c, Status__c FROM Applicant_Profile__c WHERE Id = :applicantId LIMIT 1];
    }


}