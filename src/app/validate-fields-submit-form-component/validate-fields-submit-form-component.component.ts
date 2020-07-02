import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-validate-fields-submit-form-component',
  templateUrl: './validate-fields-submit-form-component.component.html',
  styleUrls: ['./validate-fields-submit-form-component.component.css']
})
export class ValidateFieldsSubmitFormComponentComponent implements OnInit {

  @Input() errorMsg: string;
  @Input() displayError: boolean;
  error;
  constructor() { }

  ngOnInit(): void {
    console.log(this.errorMsg);
    this.error = this.errorMsg;
  }
}
