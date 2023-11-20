public with sharing class RegisterController {

    @AuraEnabled
    public static void saveRegister(Trainee__c trainee) {
        try {
            if (Schema.SObjectType.Trainee__c.isCreateable()) {
                insert new List<Trainee__c>{ trainee };
            } else {
                throw new AuraHandledException('We cannot to create Trainee records.');
            }
        } catch (Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }

}

