import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { flyInOut, expand } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host : {
    '[@flyInOut]' : 'true',
    'style': 'display: block'
  },
  animations : [
    flyInOut(),
    expand()
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm : FormGroup;
  feedback : Feedback;
  feedbackReturn : Feedback;
  contactType = ContactType;
  sentForSub : boolean = false;
  errMess : string;
  waitFor5Sec : boolean = false;
  @ViewChild('fform') feedbackFormDirective; // this enable us to get access to template form and then completely reset it. 

  formErrors = {
    'firstname' : '',
    'lastname' : '',
    'telnum' : '',
    'email' : ''
  };

  validationMessages = {
    'firstname' : {
      'required' : 'First name is required.',
      'minlength' : 'Atleast 2 characters.',
      'maxlength' : 'Max. 25 characters.'
    },
    'lastname' : {
      'required' : 'Last name is required.', 
      'minlength' : 'Atleast 2 characters.',
      'maxlength' : 'Max. 25 characters.'
    },
    'telnum' : {
      'required' : 'Tel. number is required.',
      'pattern' : 'Input can only be a number.'
    },
    'email' : {
      'required' : 'Email is required.',
      'email' : 'Invalid email format.'
    }
  };

  constructor(private fb: FormBuilder, private feedbackService : FeedbackService ) { 
    this.createForm();
  }

  ngOnInit() {

  }

  createForm(){
    this.feedbackForm = this.fb.group({
      firstname : ["",[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname : ["",[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum : [0,[Validators.required, Validators.pattern]],
      email : ["",Validators.required, Validators.email],
      agree : false,
      contacttype : 'None',
      message : ""
    });

    this.feedbackForm.valueChanges
    .subscribe( data => this.onValueChanged(data));

    this.onValueChanged();  // reset form validation message. 
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value; //since feedback model is same as the form model. 
    this.waitFor5Sec = true;
    this.feedbackService.submitFeedback(this.feedback).subscribe( feedback => {
    this.feedbackReturn = feedback;
    this.sentForSub = true;
    this.waitFor5Sec = false;
    setTimeout(()=>{
        this.sentForSub = false;
        this.feedback = null;
        this.feedbackReturn = null;
        this.feedbackForm.reset({
          firstname: "",
          lastname : "",
          tetnum : 0,
          email : "",
          agree : false,
          contacttype : 'None',
          message : ""
        });
        this.feedbackFormDirective.resetForm();
      }, 5000);
      
    },
    errmess =>{
      this.errMess = errmess,
      this.waitFor5Sec = false;
      this.sentForSub = true;
      setTimeout(()=>{
      this.sentForSub = false;
      this.feedback = null;
      this.feedbackReturn = null;
      this.feedbackForm.reset({
        firstname: "",
        lastname : "",
        tetnum : 0,
        email : "",
        agree : false,
        contacttype : 'None',
        message : ""
      });
      this.errMess = "";
      this.feedbackFormDirective.resetForm();
      }, 5000);
      
    });
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && (control.dirty || control.touched) && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

}
