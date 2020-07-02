import { ListeChargeComponent } from './liste-charge/liste-charge.component';
import { UpdatePointageComponent } from './update-pointage/update-pointage.component';
import { ListerPointageArchiveComponent } from './lister-pointage-archive/lister-pointage-archive.component';
import { ListerPointageComponent } from './lister-pointage/lister-pointage.component';
import { DetailDepartementComponent } from './detail-departement/detail-departement.component';
import { EquipeArchiveComponent } from './equipe-archive/equipe-archive.component';
import { EmployeeArchiveComponent } from './employee-archive/employee-archive.component';
import { CreateTypecontratComponent } from './create-typecontrat/create-typecontrat.component';
import { JourFerieComponent } from './jour-ferie/jour-ferie.component';
import { ChargeSalarialeListComponent } from './charge-salariale-list/charge-salariale-list.component';
import { UpdateEmployeeChargeComponent } from './update-employee-charge/update-employee-charge.component';
import { EmployeeChargeComponent } from './employee-charge/employee-charge.component';
import { EquipeListComponent } from './equipe-list/equipe-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { DepartementListComponent } from './departement-list/departement-list.component';
import { CreateDepartementComponent } from './create-departement/create-departement.component';
import { CreateEquipeComponent } from './create-equipe/create-equipe.component';
import { EmployeeFonctionComponent } from './employee-fonction/employee-fonction.component';
import { CreateFonctionComponent } from './create-fonction/create-fonction.component';
import { FonctionListComponent } from './fonction-list/fonction-list.component';
import { UpdateFonctionComponent } from './update-fonction/update-fonction.component';
import { UpdateEquipeComponent } from './update-equipe/update-equipe.component';
import { UpdateDepartementComponent } from './update-departement/update-departement.component';
import { FonctionDetailsComponent } from './fonction-details/fonction-details.component';
import { UpdateEmployeeFonctionComponent } from './update-employee-fonction/update-employee-fonction.component';
import { EmployeeEquipeComponent } from './employee-equipe/employee-equipe.component';
import { EquipeDetailsComponent } from './equipe-details/equipe-details.component';
import { UpdateEmployeeEquipeComponent } from './update-employee-equipe/update-employee-equipe.component';
import { CreateCongeComponent } from './create-conge/create-conge.component';
import { CongeListComponent } from './conge-list/conge-list.component';
import { CongeEmployeeComponent } from './conge-employee/conge-employee.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ListeTypecontratComponent } from './liste-typecontrat/liste-typecontrat.component';
import { UpdateTypeContratComponent } from './update-type-contrat/update-type-contrat.component';
import { ListeArchiveTypeContratComponent } from './liste-archive-type-contrat/liste-archive-type-contrat.component';
import { ListerContratComponent } from './lister-contrat/lister-contrat.component';
import { CreateContratComponent } from './create-contrat/create-contrat.component';
import { ListeArchiveContratComponent } from './liste-archive-contrat/liste-archive-contrat.component';
import { UpdateContratComponent } from './update-contrat/update-contrat.component';
import { DetailTypeContratComponent } from './detail-type-contrat/detail-type-contrat.component';
import { DetailsContratemployeeComponent } from './details-contratemployee/details-contratemployee.component';
import { FonctionArchiveComponent } from './fonction-archive/fonction-archive.component';
import { ListerDepartementArchiveComponent } from './lister-departement-archive/lister-departement-archive.component';
import { CreatePointageComponent } from './create-pointage/create-pointage.component';
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

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employees/add', component: CreateEmployeeComponent },
  { path: 'updateEmployee/:id', component: UpdateEmployeeComponent },
  { path: 'details/:id', component: EmployeeDetailsComponent },
  { path: 'departement', component: DepartementListComponent },
  { path: 'departement/add', component: CreateDepartementComponent },
  { path: 'equipe', component: EquipeListComponent },
  { path: 'equipe/add', component: CreateEquipeComponent },
  { path: 'employees/add/function/:id', component: EmployeeFonctionComponent },
  { path: 'updateEmployee/function/:idemp/:idfct/:datedeb', component: UpdateEmployeeFonctionComponent },
  { path: 'updateEmployee/equipe/:idemp/:ideq/:datedeb', component: UpdateEmployeeEquipeComponent },
  { path: 'fonction/add', component: CreateFonctionComponent },
  { path: 'fonction', component: FonctionListComponent },
  { path: 'updateFonction/:id', component: UpdateFonctionComponent },
  { path: 'updateEquipe/:id', component: UpdateEquipeComponent },
  { path: 'updateDepartement/:id', component: UpdateDepartementComponent },
  { path: 'detailsFonction/:id', component: FonctionDetailsComponent },
  { path: 'employees/add/equipe/:id', component: EmployeeEquipeComponent },
  { path: 'detailsEquipe/:id', component: EquipeDetailsComponent },
  { path: 'conge/add/:id', component: CreateCongeComponent },
  { path: 'conge', component: CongeListComponent },
  { path: 'employees/conge/:id', component: CongeEmployeeComponent },
  { path: 'employees/add/salary/:id', component: EmployeeChargeComponent },
  { path: 'updateEmployee/charge/:idemp/:datedeb', component: UpdateEmployeeChargeComponent },
  { path: 'chargesalariale/:id', component: ChargeSalarialeListComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register/:id', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'sidebar', component: SidebarComponent },
  { path: 'jourferie', component: JourFerieComponent },
  { path: 'home', component: HomeComponent },
  { path: 'listertypeContrat', component: ListeTypecontratComponent },
  { path: 'creerTypeContrat', component: CreateTypecontratComponent },
  { path: 'modifierTypeContrat/:id', component: UpdateTypeContratComponent },
  { path: 'listerArchivetypeContrat', component: ListeArchiveTypeContratComponent },
  { path: 'listerContrat', component: ListerContratComponent },
  { path: 'creerContrat', component: CreateContratComponent },
  { path: 'listercontratarchive', component: ListeArchiveContratComponent },
  { path: 'modifierContrat', component: UpdateContratComponent },
  { path: 'detailtypecontrat/:id', component: DetailTypeContratComponent },
  { path: 'detailcontratEmployee/:id', component: DetailsContratemployeeComponent },
  { path: 'archiveremployee', component: EmployeeArchiveComponent },
  { path: 'archivefonction', component: FonctionArchiveComponent },
  { path: 'archiveequipe', component: EquipeArchiveComponent },
  { path: 'listerDepartementArchive', component: ListerDepartementArchiveComponent },
  { path: 'detailDepartement/:id', component: DetailDepartementComponent },
  { path: 'createPointage', component: CreatePointageComponent },
  { path: 'listerpointage', component: ListerPointageComponent },
  { path: 'listerpointagearchive', component: ListerPointageArchiveComponent },
  { path: 'modifierPointage/:id', component: UpdatePointageComponent },
  { path: 'charge', component: ListeChargeComponent },
  { path: 'createchargedepartement', component: CreateChargeDepartementComponent },
  { path: 'listerChargeDepartementcourant', component: ListerChargedepartementComponent },
  { path: 'listerchargedepartementarchive', component: ListerChargedepartementarchiveComponent },
  { path: 'updatechargedepartement', component: UpdateChargedepartementComponent },
  {path:'createCharge',component:CreateChargeComponent},
{path:'listerChargeNonArchive',component:ListeChargeComponent},
{path:'listerChargeArchive',component:ListerChargeArchiveComponent},
{path:'updatecharge/:id',component:UpdateChargeComponent},
{path:'reporting',component:ReportingComponent},
{path:'createsociete',component:CreateSocieteComponent},
{path:'listersociete',component:ListerSocieteComponent},
{path:'listersocietearchive',component:ListerSocieteArchiveComponent},
{path:'modifiersociete/:id',component:UpdateSocieteComponent},
{path:'createchargesociete',component:CreateChargesocieteComponent},
{path:'listerchargesociete',component:ListerChargesocieteComponent},
{path:'listerchargesocietearchive',component:ListerChargesocietearchiveComponent},
{path:'modifierchargesociete',component:UpdateChargesocieteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
