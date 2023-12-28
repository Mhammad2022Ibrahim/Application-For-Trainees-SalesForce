import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import COURSE_OBJECT from "@salesforce/schema/Progress_Course__c"; // import object
import COURSE_NAME from "@salesforce/schema/Progress_Course__c.Name"; // import fields
import COURSE from "@salesforce/schema/Progress_Course__c.Course__c";
import TRAINEE from "@salesforce/schema/Progress_Course__c.Trainee__c";
import START_COURSE from "@salesforce/schema/Progress_Course__c.Started_Date__c";
import COMPLETE_COURSE from "@salesforce/schema/Progress_Course__c.Completed_Date__c";

import TASK_OBJECT from "@salesforce/schema/Task_Assignment__c"; // import object
import TASK_NAME from "@salesforce/schema/Task_Assignment__c.Name"; // import fields
import ASSIGNMENT from "@salesforce/schema/Task_Assignment__c.Assignment__c";
import TRAINEE_T from "@salesforce/schema/Task_Assignment__c.Trainee__c";
import STAUTS from "@salesforce/schema/Task_Assignment__c.Status__c";
import TASK_DETAILS from "@salesforce/schema/Task_Assignment__c.Task_Details__c";
import START_TASK from "@salesforce/schema/Task_Assignment__c.Started_Date__c";
import COMPLETE_TASK from "@salesforce/schema/Task_Assignment__c.Completed_Date__c";

import ProgressCourses from 'c/progressCourses';
import TaskAssignment from 'c/taskAssignment';

export default class CourseTaskManagement extends LightningElement {

  courseObject = COURSE_OBJECT; // object type
  courseFields = [
    COURSE_NAME,
    COURSE,
    START_COURSE,
    COMPLETE_COURSE,
    TRAINEE,
  ]; // fields to be showin in form

  taskObject = TASK_OBJECT; // object type
  taskFields = [
    TASK_NAME,
    ASSIGNMENT,
    TRAINEE_T,
    STAUTS,
    TASK_DETAILS,
    START_TASK,
    COMPLETE_TASK,
  ];

  async showCourse() {
    const recordId = await ProgressCourses.open({
      size: "small",
      courseFields: this.courseFields
    });

    if (recordId) {
      await this.showSuccessToast(recordId);
    }
  }

  async showSuccessToast(recordId) {
    const evt = new ShowToastEvent({
      title: "Course created",
      message: "Record ID: " + recordId,
      variant: "success"
    });
    this.dispatchEvent(evt);
  }

  async showTask(){
    const recordId = await TaskAssignment.open({
        size: 'small',
        taskFields: this.taskFields
    });

    if(recordId){
        await this.showSuccessTask(recordId);
    }
  }

  async showSuccessTask(recordId) {
    const evt = new ShowToastEvent({
      title: "Task created",
      message: "Record ID: " + recordId,
      variant: "success"
    });
    this.dispatchEvent(evt);
  }


}