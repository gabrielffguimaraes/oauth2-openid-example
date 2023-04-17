import { Component, OnInit } from '@angular/core';
import { Loans } from 'src/app/model/loans.model';
import { User } from 'src/app/model/user.model';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import {LoginService} from "../../services/login/login.service";

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {

  user = new User();
  loans = new Array();
  currOutstandingBalance: number = 0;

  constructor(private dashboardService: DashboardService, private loginService:LoginService) { }

  ngOnInit(): void {
    if(localStorage.getItem('userdetails') != null) {
      this.user = JSON.parse(localStorage.getItem('userdetails') || "");
      if(this.user){
        console.log(this.user);
        this.dashboardService.getLoansDetails(this.user.id).subscribe(
          responseData => {
          this.loans = <any> responseData;
          this.loans.forEach(function (this: LoansComponent, loan: Loans) {
            this.currOutstandingBalance = this.currOutstandingBalance+loan.outstandingAmount;
          }.bind(this));
          });
      }
    }
  }
  deleteLoan() {
    this.loginService.deleteLoan().subscribe(value => {
      alert("sucesso");
    } , (error) => {
      alert("negado");
    });
  }
}
