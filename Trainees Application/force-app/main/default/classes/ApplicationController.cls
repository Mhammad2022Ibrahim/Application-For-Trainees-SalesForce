public with sharing class ApplicationController {

    @AuraEnabled(cacheable=true)
    public static List<Applicant_Profile__c> getApplicants() {
        String query = 'SELECT Id, Name, Email__c, Phone__c, Address__c, Educational_Background__c, Certifications__c, Skills__c, Status__c FROM Applicant_Profile__c';
        return Database.query(query);
    }

    @AuraEnabled(cacheable=true)
    public static Applicant_Profile__c getApplicantDetails(String applicantId, String cacheKey) {
        String query = 'SELECT Id, Name, Email__c, Phone__c, Address__c, Educational_Background__c, Certifications__c, Skills__c, Status__c FROM Applicant_Profile__c WHERE Id = :applicantId LIMIT 1';
        return Database.query(query);
    }


}