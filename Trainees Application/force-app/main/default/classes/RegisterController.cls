public with sharing class RegisterController {

    @AuraEnabled
    public static void saveRegister(Applicant_Profile__c applicant) {
        try {
            if (Schema.SObjectType.Applicant_Profile__c.isCreateable()) {
                insert new List<Applicant_Profile__c>{ applicant };
            } else {
                throw new AuraHandledException('We cannot to create Applicant Profile records.');
            }
        } catch (Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }

}

