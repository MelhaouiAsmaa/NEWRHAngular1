import { TokenStorageService } from './_services/token-storage.service';
import { UserService } from './_services/user.service';
import { FilterPipe } from './filter.pipe';
import { EmployeFonctionId } from './employe-fonction-id';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DepartementListComponent } from './departement-list/departement-list.component';
import { CreateDepartementComponent } from './create-departement/create-departement.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateEquipeComponent } from './create-equipe/create-equipe.component';
import { EquipeListComponent } from './equipe-list/equipe-list.component';
import { EmployeeFonctionComponent } from './employee-fonction/employee-fonction.component';
import { DatePipe } from '@angular/common';
import { CreateFonctionComponent } from './create-fonction/create-fonction.component';
import { FonctionListComponent } from './fonction-list/fonction-list.component';
import { UpdateFonctionComponent } from './update-fonction/update-fonction.component';
import { UpdateEquipeComponent } from './update-equipe/update-equipe.component';
import { UpdateDepartementComponent } from './update-departement/update-departement.component';
import { FonctionDetailsComponent } from './fonction-details/fonction-details.component';
// tslint:disable-next-line: max-line-length
import { ValidateFieldsSubmitFormComponentComponent } from './validate-fields-submit-form-component/validate-fields-submit-form-component.component';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule, MatButtonModule, MatRadioModule, MatInputModule } from '@angular/material';
import { AlertDialogComponent } from './shared/alert-dialog/alert-dialog.component';
import { UpdateEmployeeFonctionComponent } from './update-employee-fonction/update-employee-fonction.component';
import { EmployeeEquipeComponent } from './employee-equipe/employee-equipe.component';
import { EquipeDetailsComponent } from './equipe-details/equipe-details.component';
import { UpdateEmployeeEquipeComponent } from './update-employee-equipe/update-employee-equipe.component';
import { CreateCongeComponent } from './create-conge/create-conge.component';
import { CongeListComponent } from './conge-list/conge-list.component';
import { CongeEmployeeComponent } from './conge-employee/conge-employee.component';
import { EmployeeChargeComponent } from './employee-charge/employee-charge.component';
import { UpdateEmployeeChargeComponent } from './update-employee-charge/update-employee-charge.component';
import { ChargeSalarialeListComponent } from './charge-salariale-list/charge-salariale-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { JourFerieComponent } from './jour-ferie/jour-ferie.component';
import { UpdateTypeContratComponent } from './update-type-contrat/update-type-contrat.component';
import { UpdateContratComponent } from './update-contrat/update-contrat.component';
import { ListeTypecontratComponent } from './liste-typecontrat/liste-typecontrat.component';
import { ListerContratComponent } from './lister-contrat/lister-contrat.component';
import { ListeArchiveTypeContratComponent } from './liste-archive-type-contrat/liste-archive-type-contrat.component';
import { ListeArchiveContratComponent } from './liste-archive-contrat/liste-archive-contrat.component';
import { DetailTypeContratComponent } from './detail-type-contrat/detail-type-contrat.component';
import { DetailsContratemployeeComponent } from './details-contratemployee/details-contratemployee.component';
import { CreateTypecontratComponent } from './create-typecontrat/create-typecontrat.component';
import { CreateContratComponent } from './create-contrat/create-contrat.component';
import { EmployeeArchiveComponent } from './employee-archive/employee-archive.component';
import { EquipeArchiveComponent } from './equipe-archive/equipe-archive.component';
import { FonctionArchiveComponent } from './fonction-archive/fonction-archive.component';
import { DetailDepartementComponent } from './detail-departement/detail-departement.component';
import { ListerDepartementArchiveComponent } from './lister-departement-archive/lister-departement-archive.component';
import { CreatePointageComponent } from './create-pointage/create-pointage.component';
import { ListerPointageComponent } from './lister-pointage/lister-pointage.component';
import { ListerPointageArchiveComponent } from './lister-pointage-archive/lister-pointage-archive.component';
import { UpdatePointageComponent } from './update-pointage/update-pointage.component';
import { ListeChargeComponent } from './liste-charge/liste-charge.component';
import { CreateChargeDepartementComponent } from './create-charge-departement/create-charge-departement.component';
import { ListerChargedepartementComponent } from './lister-chargedepartement/lister-chargedepartement.component';
import { ListerChargedepartementarchiveComponent } from './lister-chargedepartementarchive/lister-chargedepartementarchive.component';
import { UpdateChargedepartementComponent } from './update-chargedepartement/update-chargedepartement.component';
import { CreateChargeComponent } from './create-charge/create-charge.component';
import { ListerChargeArchiveComponent } from './lister-charge-archive/lister-charge-archive.component';
import { UpdateChargeComponent } from './update-charge/update-charge.component';
import { ReportingComponent } from './reporting/reporting.component';
import { CreateSocieteComponent } from './create-societe/create-societe.component';
import { ListerSocieteComponent } from './lister-societe/lister-societe.component';
import { ListerSocieteArchiveComponent } from './lister-societe-archive/lister-societe-archive.component';
import { UpdateSocieteComponent } from './update-societe/update-societe.component';
import { CreateChargesocieteComponent } from './create-chargesociete/create-chargesociete.component';
import { ListerChargesocieteComponent } from './lister-chargesociete/lister-chargesociete.component';
import { ListerChargesocietearchiveComponent } from './lister-chargesocietearchive/lister-chargesocietearchive.component';
import { UpdateChargesocieteComponent } from './update-chargesociete/update-chargesociete.component';
import { CreateChargeSalarialeComponent } from './create-charge-salariale/create-charge-salariale.component';
import { ListeChargeSalarialeComponent } from './liste-charge-salariale/liste-charge-salariale.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateEmployeeComponent,
    EmployeeDetailsComponent,
    EmployeeListComponent,
    UpdateEmployeeComponent,
    SidebarComponent,
    NavbarComponent,
    DepartementListComponent,
    CreateDepartementComponent,
    CreateEquipeComponent,
    EquipeListComponent,
    EmployeeFonctionComponent,
    CreateFonctionComponent,
    FonctionListComponent,
    UpdateFonctionComponent,
    UpdateEquipeComponent,
    UpdateDepartementComponent,
    FonctionDetailsComponent,
    ValidateFieldsSubmitFormComponentComponent,
    ConfirmationDialogComponent,
    AlertDialogComponent,
    UpdateEmployeeFonctionComponent,
    EmployeeEquipeComponent,
    EquipeDetailsComponent,
    UpdateEmployeeEquipeComponent,
    FilterPipe,
    CreateCongeComponent,
    CongeListComponent,
    CongeEmployeeComponent,
    EmployeeChargeComponent,
    UpdateEmployeeChargeComponent,
    ChargeSalarialeListComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    JourFerieComponent,
    UpdateTypeContratComponent,
    UpdateContratComponent,
    ListeTypecontratComponent,
    ListerContratComponent,
    ListeArchiveTypeContratComponent,
    ListeArchiveContratComponent,
    DetailTypeContratComponent,
    DetailsContratemployeeComponent,
    CreateTypecontratComponent,
    CreateContratComponent,
    EmployeeArchiveComponent,
    EquipeArchiveComponent,
    FonctionArchiveComponent,
    DetailDepartementComponent,
    ListerDepartementArchiveComponent,
    CreatePointageComponent,
    ListerPointageComponent,
    ListerPointageArchiveComponent,
    UpdatePointageComponent,
    ListeChargeComponent,
    CreateChargeDepartementComponent,
    ListerChargedepartementComponent,
    ListerChargedepartementarchiveComponent,
    UpdateChargedepartementComponent,
    CreateChargeComponent,
    ListerChargeArchiveComponent,
    UpdateChargeComponent,
    ReportingComponent,
    CreateSocieteComponent,
    ListerSocieteComponent,
    ListerSocieteArchiveComponent,
    UpdateSocieteComponent,
    CreateChargesocieteComponent,
    ListerChargesocieteComponent,
    ListerChargesocietearchiveComponent,
    UpdateChargesocieteComponent,
    CreateChargeSalarialeComponent,
    ListeChargeSalarialeComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatRadioModule,
    MatInputModule
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    AlertDialogComponent
  ],
  providers: [EmployeFonctionId,
    DatePipe,
    UserService,
    TokenStorageService,
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
