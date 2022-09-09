import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  item = {
    RUN: '',
    LOAD_GRP: '',
    PR_GRP: '',
    VALID_FROM: '',
    VALID_TO: '',
    CHECK: '',
    M_GROUP:'',
    GRUP_TIPE_MOBIL:'',
    PROD_HIERARCHY:'',
    DESCRIPTION: '',
    MATERIAL_NO: '',
    TIPE_PART: '',
    TIPE_MOBIL: '',
    PART: '',
    Q_PACK: '',
    RETAIL_BEFORE_PPN: '',
    RETAIL_AFTER_PPN: '',
  };
  constructor(private nav: NavController) { }

  ngOnInit() {
    this.item = JSON.parse(localStorage.getItem('item'));
  }

  toBack(){
    this.nav.back();
  }

}
