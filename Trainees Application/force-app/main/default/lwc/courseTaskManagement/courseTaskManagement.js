import { LightningElement, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import getTrainingProgress from '@salesforce/apex/ManagementController.getTrainingProgress';

import { refreshApex } from '@salesforce/apex';

import COURSE_OBJECT from "@salesforce/schema/Progress_Course__c"; // import object
import COURSE_NAME from "@salesforce/schema/Progress_Course__c.Name"; // import fields
import COURSE from "@salesforce/schema/Progress_Course__c.Course__c";
import TRAINEE from "@salesforce/schema/Progress_Course__c.Trainee__c";
import STAUTS1 from "@salesforce/schema/Progress_Course__c.Status__c";
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

  @track trainees;
  wiredtest;
  @wire(getTrainingProgress)
  wiredTrainees(result) {
    this.wiredtest = result;
    if (result.data) {
      this.trainees = [...result.data];
      console.log('Fetched Data:', this.trainees);
      console.log('wiredTrainees: ', result);
    } else if (result.error) {
      console.error('Error fetching Training Progress:', result.error);
    }
  }


  courseObject = COURSE_OBJECT; // object type
  courseFields = [
    COURSE_NAME,
    COURSE,
    STAUTS1,
    TRAINEE,
    START_COURSE,
    COMPLETE_COURSE,
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

  async showTask() {
    const recordId = await TaskAssignment.open({
      size: 'small',
      taskFields: this.taskFields
    });

    if (recordId) {
      await this.showSuccessTask(recordId);
    }
    //refresh the list of training Progress
    refreshApex(this.wiredtest);
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