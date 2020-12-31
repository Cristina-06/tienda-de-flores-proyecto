import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { FirebaseServiceService } from '../services/firebase-service.service';

@Component({
  selector: 'operacionescrud-root',
  templateUrl: './operacionescrud.component.html',
  styleUrls: ['./operacionescrud.component.css']
})
export class OperacionescrudComponent implements OnInit {

  closeResult = '';

  florForm: FormGroup;

  idFirabaseActualizar: String;
  actualizar: boolean;

  constructor(private modalService: NgbModal,
    public fb: FormBuilder,
    private firebaseServiceService: FirebaseServiceService
    ) {}


   config: any;
  collection = { count: 20, data: [] }

  ngOnInit(): void {
    this.idFirabaseActualizar="";
    this.actualizar = false;

 this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };

    this.florForm = this.fb.group({

      id: ['', Validators.required],
      tipodeflores: ['', Validators.required],
      cantidad: ['', Validators.required],
      preciototal: ['', Validators.required],

    });
   
    this.firebaseServiceService.getFlores().subscribe(resp => {
      this.collection.data = resp.map((e: any) => {
        return {
          id: e.payload.doc.data().id,
          tipodeflores: e.payload.doc.data().tipodeflores,
          cantidad: e.payload.doc.data().cantidad,
          preciototal: e.payload.doc.data().preciototal,
          idFirebase: e.payload.doc.id
        }
      })
    },
      error => {
        console.error(error);
      }
    );

  }


  pageChanged(event){
    this.config.currentPage = event;
  }
  eliminar(item:any): void{
    this.firebaseServiceService.deleteFlor(item.idFirebase);
  }

  guardarFlor(): void {

    this.firebaseServiceService.createFlor(this.florForm.value).then(resp => {
      this.florForm.reset();
      this.modalService.dismissAll();
    }).catch(error => {
      console.error(error)
    })
  }

  actualizarFlor() {

    if (!isNullOrUndefined(this.idFirabaseActualizar)) {
      this.firebaseServiceService.updateFlor(this.idFirabaseActualizar, this.florForm.value).then(resp => {
        this.florForm.reset();
        this.modalService.dismissAll();
      }).catch(error => {
        console.error(error);
      })
    }


  }

  openEditar(content, item:any) {
    this.florForm.setValue({
      id: item.id,
      tipodeflores: item.tipodeflores,
      cantidad: item.cantidad,
      preciototal: item.preciototal,
    });
    this.idFirabaseActualizar = item.idFirebase;
    this.actualizar = true;

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open(content) {
    this.actualizar = false;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}

